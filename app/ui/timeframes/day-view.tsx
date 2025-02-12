'use client'


import {useSearchParams} from "next/navigation";


export function DayView() {
    const params = useSearchParams()
    const arr = []
    for (let i = 0; i < 9; i++) {
        arr.push(i)
    }


    return (
        <div className='flex flex-col w-full h-full p-4 gap-1'>
            <p>{`This is the day view with query '${params.get('query')}'`}</p>
            {arr.map((index) =>
                <div key={index} className='bg-gray-200 rounded-2xl h-20'></div>
            )}
        </div>
    )

}


export function DayViewSkeleton() {
    const arr = []
    for (let i = 0; i < 9; i++) {
        arr.push(i)
    }

    return (
        <div className='flex flex-col w-full h-full p-4 gap-1'>
            {arr.map((index) =>
                <div key={index} className='bg-gray-200 rounded-2xl h-20'></div>
            )}
        </div>
    )
}