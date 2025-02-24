import React, { ReactElement, useState } from "react";


// maybe wants to 'extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>' in the future
export interface TagBlockProps {
    text: string | 'or' | 'and',
    color?: string,
    children?: ReactElement<TagBlockProps>[] | ReactElement<TagBlockProps>,
}


/**
 * A nestable component to show a selection of tags.
 *
 * Simple tags consist of a colored swatch and the text, while complex tags of `or` or `and` create a list of sub-tags.
 * These contain two `CreateTag` buttons if empty, or one trailing `CreateTag` button otherwise.
 *
 * @param text defines the type of tag block. `or` or `and` create a complex block whereas any `string` denotes the tags name.
 * @param color Denotes the color of the swatch as tailwind-style `bg-[]-[]`. Only applicable to simple tags. Defaults to `bg-green-500`.
 * @param children
 *
 *
 * @constructor
 */
export function TagBlock(
    {
        text,
        color = 'bg-green-500',
        children
    }: TagBlockProps
) {

    const simple: boolean = text !== 'and' && text !== 'or';
    const [tags, setTags] = useState<{text: string, color: string | undefined, tags: object[] }[]>([]);

    const addTag = (text: string, color: string | undefined, tags: object[]) => {
        setTags((prevTags) => [...prevTags, {text: text, color: color, tags: tags}]);
    }

    /**
     * Converts a `<TagBlock>` element into a suitable format for `setTags`.
     *
     * This also recursively happens to all children and throws a
     *
     * @param block the `<TagBlock>` to be converted
     *
     * @throws Error Throws an error if a child of `block` is not extending {@link TagBlockProps}
     */
    function tagBlockToObject(block: ReactElement<TagBlockProps>): {text: string, color: string | undefined, tags: object[]} {

        if (!block.props.text) {
            throw new Error(`A <TagBlock/> may only contain other <TagBlock/>. Found <${block.type}> instead.`);
        }

        const children = React.Children.toArray(block.props?.children ?? []) as ReactElement<TagBlockProps>[]

        // Recursively create object for each child and populate tags array
        const tags = (children.length != 0) ? children.map((e) => tagBlockToObject(e)) : []

        return {
            text: block.props.text,
            color: block.props.color,
            tags: tags,

        }
    }


    const childrenArr = React.Children.toArray(children);
    // Add all children to tags to be rendered by the internal logic
    // Maybe this wil need to be covered in React.useEffect() in the future?
    childrenArr.forEach((child) => {

        if (React.isValidElement<TagBlockProps>(child)) {
                // Check that the tag is not already in tags
                if (!tags.some((e) => e.text === child.props.text)) {
                    const asTag = tagBlockToObject(child);
                    addTag(asTag.text, asTag.color, asTag.tags);
                }
        } else {
            console.error("A <TagBlock/> element should only ever have other <TagBlock/> elements as it's children");
        }
    });


    return (
        <div
            className={'flex flex-wrap flex-row gap-1 rounded-3xl px-2 py-1 items-center w-fit bg-blue-400/20'}
        >
            {simple && [ // simple: color swatch and text
                <div key='simple_color_swadge' className={`h-4 w-4 rounded-full ${color} ml-1`}></div>,
                <p key='simple_text'>{text}</p>
            ]}
            {tags.length == 0 && !simple && [ // complex: Leading CreateKey
                <CreateTag key={'leading_createTag'} addTag={() =>
                    addTag('Heyy', 'bg-green-500', [])}
                />,
            ]}
            {tags.flatMap((tag, i: number) => { // Mapping all tags, connected by text
                console.log(tag, i)
                console.log(tags)
                const new_text: string = tag.text
                return [
                    i != 0 && <p key={'and_' + i}>{text}</p>,
                    <TagBlock key={i} text={new_text}/>
                    //<TagBlock key={i} text={tag.text ?? 'Heyy'} color={tag.color ?? 'bg-green-500'}/>
                ]
            })}
            {!simple && [ // always have trailing createTag if not complex
                <p key={'trailing_text'}>{text ?? '"empty"'}</p>,
                <CreateTag key={'leading_createTag'} addTag={() =>
                    addTag('Heyy', 'bg-green-500', [])}
                />
            ]}
        </div>
    )
}



function CreateTag(
    {
        addTag
    }: {
        addTag: () => void
    }
) {
    return (
        // <form
        //     onSubmit={addTag}
        //     className='flex bg-white rounded-full w-20 h-8 justify-center items-center'
        // >
        //     <input placeholder={'Name'}/>
            <button
                onClick={addTag}
                className='flex bg-white rounded-full w-20 h-8 justify-center items-center'
                // typeof='submit'
            >
                <p className='text-gray-200 text-xl' >+</p>
            </button>
        // </form>
    )
}