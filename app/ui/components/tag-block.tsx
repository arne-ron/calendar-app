import React, {forwardRef, ReactElement, useImperativeHandle, useState} from "react";
import {CreateTag} from "@/app/ui/components/create-tag";
import {SimpleTagBlock} from "@/app/ui/components/simple-tag-block";
import {ComplexTagBlock} from "@/app/ui/components/complex-tag-block";


// maybe wants to 'extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>' in the future
export interface TagBlockProps {
    hidden?: boolean
    initialText: string | 'or' | 'and' | 'empty',
    initialTags: {text: string, color: string | undefined, tags: object[] }[],
    color: string,
    children?: ReactElement<TagBlockProps>[] | ReactElement<TagBlockProps>,
    deleteFunc?: () => void,
    onUpdate: () => void,
}

export type TagBlockElement = ReactElement<TagBlockProps> & {
    getText: () => string,
    getTags: () => {text: string, color?: string, tags: object[]}[],
}

/**
 * A nestable component to show a selection of tags.
 *
 * Simple tags consist of a colored swatch and the text, while complex tags of `or` or `and` create a list of sub-tags.
 * These contain two `CreateTag` buttons if empty, or one trailing `CreateTag` button otherwise.
 *
 * @param initial_text defines the type of tag block. `or` or `and` create a complex block whereas any `string` denotes the tags name.
 * @param color Denotes the color of the swatch as tailwind-style `bg-[]-[]`. Only applicable to simple tags. Defaults to `bg-green-500`.
 * @param children the children of the
 * @param delete_func cleanup function being called upon removal by the user. Should be `undefined` if this is the highest level element
 */
export const TagBlock = forwardRef<TagBlockElement, TagBlockProps>(function TagBlock(
    {
        hidden = false,
        initialText,
        color,
        initialTags,
        children,
        deleteFunc,
        onUpdate,
    }: TagBlockProps,
    ref
) {
    const [text, setText] = useState<string>(initialText)
    const [simple, setSimple] = useState<boolean>(true)
    const [tags, setTags] = useState<{text: string, color: string | undefined, tags: object[] }[]>(initialTags);


    // @ts-expect-error I dont know how to make this happy with `key` and `type`
    useImperativeHandle(ref, () => ({
        getText: () => text,
        getTags: () => tags,
        props: {
            hidden,
            initialText,
            initialTags,
            color,
            children,
            deleteFunc,
            onUpdate,
        }
    }));




    function initialize() {
        if (text === '') setText('New Tag')
        setSimple(text !== 'and' && text !== 'or' && text !== 'empty');
    }
    React.useEffect(initialize)


    // Respond to initial_text being changed from i.e. the parent
    React.useEffect(() => {
        setText(initialText);
        initialize();
    }, [initialText]);


    React.useEffect(
        () => onUpdate,
        [tags, text, color, children]
    )

    const addTag = (text: string, color: string | undefined, tags: object[]) => {
        setTags((prevTags) => [...prevTags, {text: text, color: color, tags: tags}]);
    }

    // TODO still unsure whether duplicate elements are allowed.
    // TODO Inconsistencies on handling of duplicate elements
    const removeTag = (text: string) => {
        setTags((prevTags) => prevTags.filter((current) => current.text !== text));
    }


    /**
     * Converts a `<TagBlock>` element into a suitable format for `setTags`.
     * This also recursively happens to all children and throws an exception if a child is not a tag-block
     *
     * @param block the `<TagBlock>` to be converted
     *
     * @throws Error Throws an error if a child of `block` is not extending {@link TagBlockProps}
     */
    function tagBlockToObject(block: ReactElement<TagBlockProps>): {text: string, color: string | undefined, tags: object[]} {
        if (!block.props.initialText) {
            throw new Error(`A <TagBlock/> may only contain other <TagBlock/>. Found <${block.type}> instead.`);
        }

        const children = React.Children.toArray(block.props?.children ?? []) as ReactElement<TagBlockProps>[]

        // Recursively create object for each child and populate tags array
        const tags = (children.length == 0) ? [] : children.map(tagBlockToObject)

        return {
            text: block.props.initialText,
            color: block.props.color,
            tags: tags,
        }
    }


    const childrenArr = React.Children.toArray(children);
    // Add all children to tags to be rendered by the internal logic
    childrenArr.forEach((child) => {
        if (React.isValidElement<TagBlockProps>(child)) {
                // Check that the tag is not already in tags
                if (!tags.some((e) => e.text === child.props.initialText)) {
                    const asTag = tagBlockToObject(child);
                    addTag(asTag.text, asTag.color, asTag.tags);
                }
        } else {
            console.error("A <TagBlock/> element should only ever have other <TagBlock/> elements as it's children");
        }
    });


    // Resets this to the state of 'empty'
    function reset() {
        setText('empty');
        initialize();
    }


    // This function gets called when this tag should be removed by the user
    function removeChildTag() {
        // If the parent provides a cleanup function
        if (deleteFunc) {
            deleteFunc()
        // Else reset to default
        } else {
            reset();
        }
    }


    return (
        <div
            style={hidden ? {display: 'none'} : {}}
            className={'flex flex-wrap flex-row gap-1 gap-y-1.5 rounded-2xl px-1.5 py-1 items-center w-fit bg-blue-400/20 text-sm'}
        >
            {text === 'empty' &&
                <CreateTag onSubmit={(name) => {setText(name); addTag(name, '#ff00bb', [])}}/>
            }
            {simple &&
                <SimpleTagBlock text={text} color={color} onClick={removeChildTag} onUpdate={onUpdate}/>
            }
            {!simple && text !== 'empty' &&
                <ComplexTagBlock
                    text={text}
                    tags={tags}
                    onClick={removeChildTag}
                    add_func={(name: string) => {addTag(name, '#33ff33', [])}}
                    remove_func={removeTag}
                    onUpdate={onUpdate}
                />
            }
        </div>

    )
})