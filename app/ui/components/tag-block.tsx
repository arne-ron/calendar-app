import React, {
    DetailedHTMLProps,
    HTMLAttributes,
    ReactElement,
    useEffect,
    useState
} from "react";


export interface TagBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string,
    color?: string,
    children?: ReactElement<TagBlockProps>[] | ReactElement<TagBlockProps>,
}


export function TagBlock(
    {
        text,
        color = 'bg-green-500',
        children
    }: TagBlockProps
) {

    const [tags, setTags] = useState<{text: string, color: string, tags: object}[]>([]);

    const addTag = (text: string, color: string, tags: object) => {
        setTags((prevTags) => [...prevTags, {text, color, tags}]);
    }

    const childrenArr = React.Children.toArray(children);


    function tagBlockToObject(block: ReactElement<TagBlockProps>, depth: number): {text: string, color: string, tags: object} {

        console.log('Entering function at depth ' + depth);
        if (!block.props) return {text, color, tags: {}}
        const children = React.Children.toArray(block.props?.children ?? []) as ReactElement<TagBlockProps>[]


        const tags = (children.length != 0) ? children.map((e) => tagBlockToObject(e, depth + 1)) : {}

        return {
            text: block.props.text as string,
            color: block.props.color as string,
            tags: tags,

        }
    }


    useEffect(() => {
        childrenArr.forEach((child) => {
            // @ts-expect-error type of props is unknown
            if (React.isValidElement(child) && "text" in child.props) {
                if (child.type === TagBlock) {
                // @ts-expect-error type of props is unknown
                    if (!tags.some((e) => e.text === child.props.text)) {
                        // @ts-expect-error grrr errors leave me TODO there shouldn't be as many ts-ignores here
                        addTag(tagBlockToObject(child, 0));
                    }
                }
            } else {
                console.error("A <TagBlock/> element should only ever have other <TagBlock/> elements as it's children");
            }
        });
    }, [children]);


    const simple: boolean = text !== 'and' && text !== 'or';


    return (
        <div
            className={'flex flex-wrap flex-row gap-1 rounded-full px-2 py-1 items-center w-fit bg-blue-400/20'}
        >
            {simple && [ // simple: color swadge and text
                <div key='simple_color_swadge' className={`h-4 w-4 rounded-full ${color} ml-1`}></div>,
                <p key='simple_text'>{text}</p>
            ]}
            {tags.length == 0 && !simple && [ // complex: Leading CreateKey
                <CreateTag key={'leading_createTag'} onClick={() =>
                    addTag('Heyy', 'bg-green-500', {})}
                />,
            ]}
            {tags.flatMap((tag, i: number) => { // Mapping all tags, connected by text
                console.log(tag, i)
                return [
                    i != 0 && <p key={'and_' + i}>{text}</p>,
                    <TagBlock key={i} text={tag.text ?? 'Heyy'} color={tag.color ?? 'bg-green-500'}/>
                ]
            })}
            {!simple && [ // always have trailing createTag if not complex
                <p key={'trailing_text'}>{text ?? '"empty"'}</p>,
                <CreateTag key={'leading_createTag'} onClick={() =>
                    addTag('Heyy', 'bg-green-500', {})}
                />
            ]}
        </div>
    )
}



function CreateTag(
    {
        onClick
    }: {
        onClick: () => void
    }
) {
    return (
        <button
            className='flex bg-white rounded-full w-20 h-8 justify-center items-center'
            onClick={onClick}
        >
            <p className='text-gray-200 text-xl' >+</p>
        </button>
    )
}