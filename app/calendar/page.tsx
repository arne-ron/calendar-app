import {CalendarView} from "@/app/ui/calendar-view";
import {TimeframeBar} from "@/app/ui/timeframe-bar";
import {Searchbar} from "@/app/ui/searchbar";
import Link from "next/link";


export default async function Page(
    props: {
        searchParams?: Promise<{
            view?: string
        }>
    }
) {
    const searchParams = await props.searchParams
    const view = searchParams?.view

    return (
        <div className='flex flex-row h-full bg-gray-100'>
            <aside className='flex flex-col flex-shrink-0 w-60 h-full bg-gray-200'>
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
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <button key={index} className='group flex flex-row items-center gap-1' value={item}>
                            <div
                                className='w-4 h-4 rounded-md group-even:bg-blue-400 group-odd:bg-blue-600 border-gray-400 group-[:nth-of-type(3)]:bg-transparent group-[:nth-of-type(3)]:border-2'></div>
                            <p className='group-[:nth-of-type(3)]:text-gray-500'>{'Calendar ' + item}</p>
                        </button>
                    ))}
                </div>
                <Link href={'/calendar/calendar/create'} className='flex bg-gray-100 hover:bg-gray-100/60 rounded-full mx-2.5 w-12 text-gray-400 justify-center'>+</Link>
            </aside>
            <main className='flex flex-col grow shrink-0 items-center'>
                <header className='flex flex-row justify-between items-center px-6 w-full'>
                    {/* Spacer */}
                    <div className='w-36'></div> {/* TODO: This might not be the optimal solution */}
                    <TimeframeBar />
                    <div className='flex flex-row gap-1'>
                        <Link href='/calendar/event/create' className='flex  bg-white rounded-full justify-center items-center w-7'>
                            <p className='text-gray-400'>+</p>
                        </Link>
                        <Searchbar />
                    </div>
                </header>
                <CalendarView view={view}/>
            </main>
            <aside className='flex flex-col shrink-0 bg-gray-200 p-2 w-60 h-full'>
                {/* Top Button Bar */}
                <div className='self-end flex mt-1 flex-row gap-1'>
                    <button className='text-sm text-blue-600 bg-gray-300 rounded-full px-1.5 select-none'>Edit</button>
                    <button className='text-xs bg-gray-300 rounded-full px-1.5 select-none'>x</button>
                    {/* TODO: replace with icon */}
                </div>
                <h1 className='text-lg mb-2'>My Event</h1>
                <div className='grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 odd:*:text-gray-500'>
                    <p>From</p>
                    <div className='bg-white rounded w-full px-1.5'>
                        <p>13:00</p>
                    </div>
                    <p>To</p>
                    <div className='bg-white rounded w-full px-1.5'>
                        <p>17:00</p>
                    </div>
                    <p>Duration</p>
                    <div className='bg-white rounded w-full px-1.5'>
                        <p>60min</p>
                    </div>
                    <p>Link</p>
                    <div className='bg-white rounded w-full px-1.5'>
                        <p>www.wikipedia.org</p>
                    </div>
                    <p>Notes</p>
                    <div className='bg-white rounded min-h-20 w-full px-1.5'>
                        <p>Just some test Notes</p>
                    </div>
                    <p className='self-center'>Tags</p>
                    <div className='flex flex-row gap-2 w-full p-1'>
                        {["Private", "Work"].map((text) => (
                            <div
                                key={text}
                                className='group flex flex-row gap-1 grow-0 items-center rounded-full bg-gray-100 w-fit py-1 px-2'
                            >
                                <div className='rounded-full bg-red-400 group-even:bg-blue-400 w-3 h-3'></div>
                                <p className='text-sm text-gray-600'>{text}</p>
                            </div>
                        ))
                        }
                    </div>

                </div>
            </aside>
        </div>
    )
}