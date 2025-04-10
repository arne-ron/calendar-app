import { fetchCalendars } from "@/app/data";
import { CalendarItem } from "@/app/ui/calendar-item";
import Link from "next/link";
import { range } from "@/app/utils";
import React from "react";
import {Calendar} from "@/app/definitions";


export async function CalendarStack() {

    const calendars = await fetchCalendars()
    calendars.sort((a: Calendar, b: Calendar) => (a.name > b.name) ? 1 : -1 )

    return (
        <div className='flex flex-col m-2 gap-1 items-start'>
            <button className='text-blue-600 hover:text-blue-800 hover:underline'>Select all</button>
            {calendars.map((calendar_group, index) => {
                return <CalendarItem key={index} calendar_group={calendar_group} />
            })}
            <Link href={'/calendar/calendar/create'}
                  className='flex bg-gray-100 hover:bg-gray-100/60 rounded-full w-12 text-gray-400 justify-center'
            >
                +
            </Link>
        </div>
    )

}


export function CalendarStackSkeleton() {
    return (
        <div className='flex flex-col m-2 gap-1 items-start'>
            <p className='text-blue-600'>Select all</p>
            {range(3).map((i) =>
                <div key={i} className='flex flex-col px-2 py-1 rounded-2xl w-full'>
                    {/* H-Stack */}
                    <div className='flex items-center gap-1 w-full'>
                        {/* Colored selection rectangle */}
                        <div
                            className={'w-4 h-4 rounded-md border-2 bg-gray-300 border-gray-300'}
                        />
                        <div
                            className={'items-center gap-1 grow bg-gray-300/40 rounded-lg'}
                        >
                            <p className='text-transparent'>test</p>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex bg-gray-100 rounded-full w-12 text-gray-400 justify-center'>
                +
            </div>
        </div>
    )
}