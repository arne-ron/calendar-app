import React from "react";

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
    function addElem() {
        let count = 0;
        setData((prevData: data[]) => {
            const newData = [...prevData]; // Shallow copy of root array

            if (position.length == 1 && position[0] == 0) {
                if (count === 0) {
                newData[0].arr = [
                    ...newData[0].arr,
                    { text: 'second layer', color: 'rgba(160,153,255,0.4)', arr: [] }
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
                    arr: [...current[lastPos].arr, { text: 'further layer', color: 'rgba(255,153,153,0.4)', arr: [] }]
                };
                console.log('3 is called');
            }
            console.log('2 is called');

            count++;
            return newData;
        });
        console.log('is called');
    }

    // Find the current element to render
    let arr = data;
    let element;
    for (const pos of position) {
        element = arr[pos];
        arr = element.arr;
    }

    return (
        <div className='flex flex-row gap-3  min-w-16 min-h-10 px-3 py-3 rounded-lg h-min items-center' style={{backgroundColor: element?.color}}>
            <p>{element?.text}</p>
            {arr.map((_, i) => (
                <Recurser key={i} position={[...position, i]} data={data} setData={setData} />
            ))}
            <button className='bg-white rounded-full w-6 h-6' onClick={addElem}>
                +
            </button>
        </div>
    );
}