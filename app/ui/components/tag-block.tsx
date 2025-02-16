import {ReactNode, useEffect, useState} from "react";


export function TagBlock(
    {
        text,
        color = 'bg-green-500',
        children,
    }: {
        text: 'and' | 'or' | string,
        color?: string,
        children?: ReactNode[],
    }
) {
    const [tags, setTags] = useState<ReactNode[]>([]);

    const addTag = (tag: ReactNode) => {
        setTags((prevTags) => [...prevTags, tag]);
    }

    useEffect(() => {
        children?.forEach((child) => {addTag(child)})
    }, [children]);


    // This component is considered simple if it just contains a tag (X name)
    // If it's complex it should be of form (xxxx and xxxxx)
    const simple: boolean = text !== 'and' && text !== 'or';

    const createTag = (
        <button
            className='flex bg-white rounded-full w-20 h-8 justify-center items-center'
            onClick={() => addTag('Hey')}
        >
            <p className='text-gray-200 text-xl' >+</p>
        </button>
    )

    // If it's simple the children stay null,
    // otherwise extract the children from the props and initialise the rest with the createTags
    let child1, child2: ReactNode | null;
    if (!simple) {
        if (children) {
            [child1, child2] = children;
        }
    }


    return (
        <div
            className={'flex flex-wrap flex-row gap-1 rounded-full px-2 py-1 items-center w-fit bg-blue-400/20'}
        >
            {tags.length == 0 && !simple && [
                createTag,
            ]}
            {simple && [
                <div key='simple_color_swadge' className={`h-4 w-4 rounded-full ${color} ml-1`}></div>,
                <p key='simple_text'>{text}</p>
            ]}
            {tags.flatMap((a, i) => [
                i != 0 && <p key={'and_' + i}>{text}</p>,
                <TagBlock key={i} text={"test"} />
            ])}
            {!simple && [ // always have trailing createTag if not complex
                <p key={'trailing_text'}>{text ?? '"empty"'}</p>,
                createTag
            ]}
        </div>
    )
}