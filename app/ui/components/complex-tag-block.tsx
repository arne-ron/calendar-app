import {CreateTag} from "@/app/ui/components/create-tag";
import React from "react";
import {TagBlock} from "@/app/ui/components/tag-block";



export function ComplexTagBlock(
    {
        tags,
        text,
        onClick,
        add_func,
        remove_func,
        onUpdate,
    }: {
        text: string,
        tags: {text: string, color: string | undefined, tags: object[] }[],
        onClick: () => void,
        add_func: (name: string) => void,
        remove_func: (name: string) => void,
        onUpdate: () => void
    }
) {
    React.useEffect(
        () => onUpdate,
        [text, tags, onClick]
    )



    console.log("++", tags)
    return (<>
        {// Leading CreateKey
        tags.length == 0 && [
            <CreateTag key={'leading_createTag'} onSubmit={add_func}
            />,
        ]}

        {// Mapping all tags, connected by text
        tags.flatMap((tag, i: number) => {
            console.log("+", JSON.stringify(tag))
            return [
                i != 0 && <button key={text + '_' + i} onClick={onClick}>{text}</button>,
                <TagBlock
                    key={tag.text + '_' + i}
                    initialText={tag.text}
                    color={tag.color ?? ''}
                    initialTags={tag.tags as unknown as {text: string, color: string | undefined, tags: object[] }[]}
                    deleteFunc={remove_func.bind(null, tag.text)}
                    onUpdate={onUpdate}
                />
            ]
        })}

        {/* always have trailing createTag */}
        <button key={'trailing_text'} onClick={onClick}>{text ?? '"empty"'}</button>
        <CreateTag key={'leading_createTag'} onSubmit={add_func}/>
    </>)
}