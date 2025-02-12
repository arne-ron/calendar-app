'use client'


import {useSearchParams} from "next/navigation";


export function DayView() {
    const params = useSearchParams()

    return (
        <p>{`This is the day view with query '${params.get('query')}'`}</p>
    )
}


export function DayViewSkeleton() {
    return (
        <div className='flex flex-col w-full h-full p-4 gap-1'>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
            <div className='bg-gray-200 rounded-2xl h-20'></div>
        </div>
    )
}