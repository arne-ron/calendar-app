'use client'
import React, {useState} from "react";
import {CreateButton} from "@/app/ui/components/create-button";
import {TagBlockSimple} from "@/app/ui/components/tag-block-simple";


/**
 * Describes the form of the data that is used to construct the nested tag tree
 */
export interface data {
    text: string,
    color: string,
    arr: data[]
}


export interface TagBlockProps {
    position: number[],
    data: data[],
    setData:  React.Dispatch<React.SetStateAction<data[]>>
}


/**
 * This element displays the nested structure of data.
 *
 * This component is interactive and clicking on it removes the clicked element from the data structure.
 * Also contains buttons to create new Tags
 *
 * For the initial element the `position` attribute should be `[0]`
 *
 * @param position The position of the current blocks information in `data`.
 *                  the n-th entry resembles the data for this block being the n-th element in its parent's data's `arr` property.
 *                  Equally, the (n-1)-th entry resembles the parent tag's position in its parent's data's `arr` property respectively.
 * @param data The data describing the total tag structure
 * @param setData A setter function for data
 */
export function TagBlock({ position, data, setData }: TagBlockProps) {
    const [type, setType] = useState<'simple' | 'complex' | 'empty'>('empty')

    // Find the current element to render
    let arr = data;
    let element: data = {text: '', color: '', arr: []};
    for (const pos of position) {
        element = arr[pos];
        arr = element.arr;
    }


    // Configure type
    React.useEffect(
        () => setType((element.text === 'empty') ? 'empty' : (element.text === 'and' || element.text === 'or') ? 'complex' : 'simple' ),
        [element.text]
    )


    /** Calling this function adds a new data object (and therefore TagBlock) to the current TagBlock's data object in the `data` array */
    function addElem(name: string) {
        setData((prevData: data[]) => {
            const newData = JSON.parse(JSON.stringify(prevData));

            // Navigate to the correct position
            let current = newData;
            for (let i = 0; i < position.length - 1; i++) {
                current = current[position[i]].arr;
            }

            // Immutably update the specific array
            const lastPos = position[position.length - 1];
            current[lastPos] = {
                ...current[lastPos],
                arr: [...current[lastPos].arr, { text: name, color: 'rgb(154,76,255)', arr: [] }]
            };

            return newData;
        });
    }


    /** Calling this function removes the current TagBlock's data object from the `data` array */
    function removeSelf() {
        setData((prevData: data[]) => {
            const newData: data[] = JSON.parse(JSON.stringify(prevData));

            // Navigate to the correct position
            let parent: data;
            let current: data[] = newData;
            for (let i = 0; i < position.length - 1; i++) {
                parent = current[position[i]]
                current = parent.arr;
            }

            // Immutably update the specific array
            const lastPos = position[position.length - 1];
            parent!.arr = parent!.arr.filter((_, i) => i !== lastPos)

            return newData;
        });
    }


    /** Calling this function changes the color property on the current TagBlock's data object from the `data` */
    function changeColor(color: string) {
        setData((prevData: data[]) => {
            const newData = JSON.parse(JSON.stringify(prevData));

            // Navigate to the correct position
            let current = newData;
            for (let i = 0; i < position.length - 1; i++) {
                current = current[position[i]].arr;
            }

            // Immutably update the specific array
            const lastPos = position[position.length - 1];
            current[lastPos] = {
                ...current[lastPos],
                color: color,
                arr: current[lastPos].arr
            };

            return newData;
        });
    }


    return (
        <div
            className={(element.text === 'empty' && arr.length !== 0) ? 'flex-col' : ' text-xs flex flex-row flex-wrap gap-x-1 gap-y-1.5 p-1 rounded-xl w-fit max-w-full items-center'}
            style={{backgroundColor: (type === 'empty' && arr.length !== 0) ? undefined : (type === 'simple') ? '#f3f3ff' : 'rgba(149,190,255,0.33)'}}
        >
            {type === "empty" && arr.length === 0 &&
                <CreateButton onSubmit={addElem}/>
            }
            {type === 'empty' && arr.map((_, i) => (
                <TagBlock key={i} position={[...position, i]} data={data} setData={setData} />
            ))}

            {type === "simple" &&
                <TagBlockSimple element={element} removeSelf={removeSelf} changeColor={changeColor}/>
            }

            {type === 'complex' && arr.length === 0 &&
                // Leading CreateKey
                <CreateButton key={'leading_createTag'} onSubmit={addElem}/>
            }
            {type === 'complex' && [
                // Mapping all tags, connected by text
                arr.flatMap((tag, i: number) => {
                    return [
                        i !== 0 &&
                            <button key={'combiner' + element.text + '_' + i} onClick={removeSelf}>{element.text}</button>,
                        <TagBlock
                            key={'element' + tag.text + '_' + i}
                            position={[...position, i]}
                            data={data}
                            setData={setData}
                        />
                    ]
                }),

                // always have trailing createTag
                <button key={'trailing_text'} onClick={removeSelf}>{element.text}</button>,
                <CreateButton key={'trailing_createTag'} onSubmit={addElem}/>
            ]}

        </div>
    );
}