import Link from "next/link";
import {CalendarItem} from "@/app/ui/calendar-item";
import {fetchCalendars} from "@/app/data";

export async function GeneralInformationPage() {
    const calendars = await fetchCalendars();


    return (
        <div className='flex flex-col flex-shrink-0 w-80 h-full bg-gray-200'>
            {/* Tab Bar */}
            <div className='flex flex-row p-1.5 gap-1 items-start'>
                <button
                    className='px-1 rounded-md bg-white hover:bg-gray-100'
                >
                    Calendar
                </button>
                <button className='px-1 rounded-md bg-white hover:bg-gray-100'>Settings</button>
            </div>
            <div className='bg-gray-300 h-0.5'></div>
            {/* Calendars listed */}
            <div className='flex flex-col m-2 gap-1 items-start'>
                <button className='flex text-blue-600 hover:text-blue-800 hover:underline'>Select all</button>
                {calendars.map((calendar_group, index) => {
                    return <CalendarItem key={index} name={calendar_group.name} color={calendar_group.color}/>
                })}
            </div>
            <Link href={'/calendar/calendar/create'}
                  className='flex bg-gray-100 hover:bg-gray-100/60 rounded-full mx-2.5 w-12 text-gray-400 justify-center'>+</Link>
        </div>
    )
}