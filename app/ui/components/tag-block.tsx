import React, { ReactElement, useState} from "react";


// maybe wants to 'extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>' in the future
export interface TagBlockProps {
    initial_text: string | 'or' | 'and' | 'empty',
    color?: string,
    children?: ReactElement<TagBlockProps>[] | ReactElement<TagBlockProps>,
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
 */
export function TagBlock(
    {
        initial_text,
        color = 'bg-green-500',
        children
    }: TagBlockProps
) {
    const [simple, setSimple] = useState<boolean>(false)
    const [text, setText] = useState(initial_text)

    React.useEffect(
        () => {
            initialize()
        }
        )
    function initialize() {
        if (text === '') setText('New Tag')
        setSimple(text !== 'and' && text !== 'or' && text !== 'empty');
        console.log('Initialising...', text)
    }


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

        if (!block.props.initial_text) {
            throw new Error(`A <TagBlock/> may only contain other <TagBlock/>. Found <${block.type}> instead.`);
        }

        const children = React.Children.toArray(block.props?.children ?? []) as ReactElement<TagBlockProps>[]

        // Recursively create object for each child and populate tags array
        const tags = (children.length != 0) ? children.map((e) => tagBlockToObject(e)) : []

        return {
            text: block.props.initial_text,
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
                if (!tags.some((e) => e.text === child.props.initial_text)) {
                    const asTag = tagBlockToObject(child);
                    addTag(asTag.text, asTag.color, asTag.tags);
                }
        } else {
            console.error("A <TagBlock/> element should only ever have other <TagBlock/> elements as it's children");
        }
    });


    return (
        <div
            className={'flex flex-wrap flex-row gap-1 gap-y-1.5 rounded-2xl px-1.5 py-1 items-center w-fit bg-blue-400/20 text-sm'}
        >
            {simple && [ // simple: color swatch and text
                <div key='simple_color_swadge' className={`h-3 w-3 rounded-full ${color} ml-1`}></div>,
                <p key='simple_text'>{text}</p>
            ]}
            {tags.length == 0 && !simple && text !== 'empty' && [ // complex: Leading CreateKey
                <CreateTag key={'leading_createTag'} onSubmit={(name: string) =>
                    addTag(name, 'bg-green-500', [])}
                />,
            ]}
            {text !== 'empty' && tags.flatMap((tag, i: number) => { // Mapping all tags, connected by text
                console.log(tag, i)
                console.log(tags)
                const new_text: string = tag.text
                return [
                    i != 0 && <p key={'and_' + i}>{text}</p>,
                    <TagBlock key={i} initial_text={new_text}/>
                ]
            })}
            {!simple && text !== 'empty' && [ // always have trailing createTag if not complex
                <p key={'trailing_text'}>{text ?? '"empty"'}</p>,
                <CreateTag key={'leading_createTag'} onSubmit={(name: string) =>
                    addTag(name, 'bg-green-500', [])}
                />
            ]}
            {text === 'empty' &&
                <CreateTag onSubmit={(e) => {
                    setText(e);
                    initialize();
                    console.log(simple)
                }}/>
            }
        </div>
    )
}


/**
 * The CreateTag form for a `<TagBlock/>`
 *
 * First exposes a (+) button and on click shows an input field.
 * Pressing the button again submits the form without a reload
 *
 * @param onSubmit the function called when submitting
 */
function CreateTag(
    {
        onSubmit
    }: {
        onSubmit: (name: string) => void
    }
) {

    const [opened, setOpened] = useState<boolean>(false)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget); // Get form data
                const tagName = formData.get("name") as string; // Extract input value
                onSubmit(tagName);
                setOpened(false);
                e.currentTarget.reset()
            }}
            className='flex bg-white rounded-full min-w-20 h-7 justify-center items-center'
        >
            {opened && [
                <input
                    key='input'
                    placeholder={'Name'}
                    className='px-2 w-32 bg-transparent h-full rounded-full'
                    hidden={!opened}
                    name={'name'}
                    autoFocus
                />,
                <button
                    key='submit'
                    type='submit'
                    hidden={!opened}
                    className='mx-2'
                >
                    <p className='text-gray-200 text-xl' >+</p>
                </button>
            ]}
            {!opened &&
                <button
                    className='flex grow justify-center rounded-full'
                    onClick={setOpened.bind(null, true)}
                    type='button'
                >
                    <p className='text-gray-200 text-xl'>+</p>
                </button>
            }
        </form>
    )
}