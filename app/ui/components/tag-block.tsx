import React, {ReactNode, useEffect, useState} from "react";


export function TagBlock(
    {
        text,
        color = 'bg-green-500',
        children,
    }: {
        text: 'and' | 'or' | string,
        color?: string,
        children?: ReactNode,
    }
) {
    const [tags, setTags] = useState<ReactNode[]>([]);
    const [tagsNew, setTagsNew] = useState<{text: string, color: string, tags: object}[]>([]);


    const addTag = (tag: ReactNode) => {
        setTags((prevTags) => [...prevTags, tag]);
        console.log('test' + text)
    }
    const addTagNew = (text: string, color: string, tags: object) => {
        setTagsNew((prevTags) => [...prevTags, {text, color, tags}]);
        console.log('test' + text)
    }


    const childrenArr = React.Children.toArray(children);

    // Only calls this method when children variable is updated.
    // This prevents infinite recursion through: render -> change tags -> causes rerender -> change tags -> causes rerender...
    useEffect(() => {
        childrenArr.forEach((child) => {
            // Ensure child is a React element and has a unique key
            if (React.isValidElement(child)) {
                if (!tags.some((e) => React.isValidElement(e) && e.text === child.text)) {
                    addTag(child);
                }
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
                    addTag(<TagBlock text='Heyy' key={'Heyy' + tags.length}/>)}
                />,
            ]}
            {tags.flatMap((tag: ReactNode, i: number) => { // Mapping all tags, connected by text
                console.log(tag);
                return [
                    i != 0 && <p key={'and_' + i}>{text}</p>,
                    tag
                ]
            })}
            {!simple && [ // always have trailing createTag if not complex
                <p key={'trailing_text'}>{text ?? '"empty"'}</p>,
                <CreateTag key={'leading_createTag'} onClick={() =>
                    addTag(<TagBlock text='Heyy' key={'Heyy' + tags.length}/>)}
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