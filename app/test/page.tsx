'use client'
import {Recurser, data} from "@/app/user/recurser";
import React, {useState} from "react";

/**
 * Exposes an url for WIP and testing purposes
 *
 * @constructor
 */
export default function Page() {
    const [data, setData] = useState<data[]>([
            {
                text: 'empty',
                color: '',
                arr: []
            }
        ])


    return (
        <div className='flex items-center justify-center h-full'>
            <Recurser position={[0]} data={data} setData={setData}/>
            <button onClick={() => {
                console.log(JSON.stringify(data));
                console.log(data)
            }}>
                Submit
            </button>
            <button
                onClick={() => {
                    setData((prev) => {
                        const [first] = prev;
                        return [{
                            ...first,
                            arr: first.arr.filter((_, i) => i !== 0)
                        }];
                    })
                }}
            >
                |remove first layer
            </button>
        </div>
    )
}


