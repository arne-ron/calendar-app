import React from "react";

export interface data {
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

            // Navigate to the correct position
            let current = newData;
            for (let i = 0; i < position.length - 1; i++) {
                current = current[position[i]].arr;
            }

            // Immutably update the specific array
            const lastPos = position[position.length - 1];
            if (count == 0) {
                current[lastPos] = {
                    arr: [...current[lastPos].arr, { arr: [] }]
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
    let current = data;
    for (const pos of position) {
        current = current[pos].arr;
    }

    return (
        <div className='flex flex-row gap-3 bg-blue-400/10 min-w-16 min-h-10 px-3 py-3 rounded-lg h-min items-center'>
            {current.map((_, i) => (
                <Recurser key={i} position={[...position, i]} data={data} setData={setData} />
            ))}
            <button className='bg-white rounded-full w-6 h-6' onClick={addElem}>
                +
            </button>
        </div>
    );
}