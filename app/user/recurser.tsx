import React, {useState} from "react";
import {CreateTag} from "@/app/ui/components/create-tag";


export interface data {
    text: string,
    color: string,
    arr: data[]
}



export interface RecurserProps {
    position: number[],
    data: data[],
    setData:  React.Dispatch<React.SetStateAction<data[]>>
}

// export type RecurserElement = ReactElement<RecurserProps> // & {function: () => void}


export function Recurser({ position, data, setData }: RecurserProps) {
    const [simple, setSimple] = useState<boolean>(true)

    // Find the current element to render
    let arr = data;
    let element: data = {text: '', color: '', arr: []};
    for (const pos of position) {
        element = arr[pos];
        arr = element.arr;
    }


    React.useEffect(
        () => setSimple(element.text !== 'and' && element.text !== 'or' && element.text !== 'empty'),
        [element.text]
    )



    function addElem(name: string) {
        let count = 0;
        setData((prevData: data[]) => {
            const newData = [...prevData]; // Shallow copy of root array

            if (position.length == 1 && position[0] == 0) {
                if (count === 0) {
                newData[0].arr = [
                    ...newData[0].arr,
                    { text: name, color: 'rgba(160,153,255,0.4)', arr: [] }
                ]
                }
                count++;
                return newData;
            }

            // Navigate to the correct position
            let current = newData;
            for (let i = 0; i < position.length - 1; i++) {
                current = current[position[i]].arr;
            }

            // Immutably update the specific array
            const lastPos = position[position.length - 1];
            if (count == 0) {
                current[lastPos] = {
                    ...current[lastPos],
                    arr: [...current[lastPos].arr, { text: name, color: 'rgba(255,153,153,0.4)', arr: [] }]
                };
                console.log('3 is called');
            }
            console.log('2 is called');

            count++;
            return newData;
        });
        console.log('is called');
    }



    return (
        <div className={(element.text === 'empty' && arr.length !== 0) ? 'flex-col' :'flex flex-row gap-3  min-w-16 min-h-10 px-3 py-3 rounded-lg h-min items-center'} style={{backgroundColor: (element.text === 'empty' && arr.length !== 0) ? undefined :  element?.color}}>
            {element.text === 'empty' && arr.length === 0 &&
                <CreateTag onSubmit={addElem}/>
            }
            {simple &&
                <button
                    key='simplbe_button'
                    className={'flex flex-row gap-1 items-center'}
                    onClick={() => console.log('remove the simple block (not yet implemented)')}
                >
                    <div key='simple_color_swadge' className={`h-3 w-3 rounded-full ml-1`} style={{backgroundColor: element.color}}></div>
                    <p key='simple_text'>{element.text}</p>
                </button>
            }
            {!simple && element.text !== 'empty' && arr.length === 0 &&
                // Leading CreateKey
                <CreateTag key={'leading_createTag'} onSubmit={addElem}/>
            }
            {!simple && element.text !== 'empty' && [
                // Mapping all tags, connected by text
                arr.flatMap((tag, i: number) => {
                    console.log("+", JSON.stringify(tag))
                    return [
                        i !== 0 &&
                            <button key={'combiner' + element.text + '_' + i} onClick={() => console.log('remove the simple block (not yet implemented)')}>{element.text + 1 + "_" + i.toString()}</button>,
                        <Recurser
                            key={'element' + tag.text + '_' + i}
                            position={[...position, i]}
                            data={data}
                            setData={setData}
                        />
                    ]
                }),

                // always have trailing createTag
                <button key={'trailing_text'} onClick={() => console.log('remove the complex block (not yet implemented)')}>{element.text + 2}</button>,
                <CreateTag key={'trailing_createTag'} onSubmit={addElem}/>
            ]}
            {simple || element.text === 'empty' && arr.map((_, i) => (
                <Recurser key={i} position={[...position, i]} data={data} setData={setData} />
            ))}
        </div>
    );
}