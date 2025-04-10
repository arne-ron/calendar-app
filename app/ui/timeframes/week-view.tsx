import { Event } from "@/app/definitions";
import {range} from "@/app/utils";
import { endOfWeek, startOfWeek } from "date-fns";
import { fetchEventsBetween } from "@/app/data";
import { ScrollBlockWeek } from "@/app/ui/components/scroll-block-week";


/**
 * Displays all events in the given week
 *
 * @param events The events of the week to be displayed
 */
export async function WeekView({ dateInfo }: { dateInfo: {day: number, monthIndex: number, year: number } }) {
    // const today = 5 // TODO make today dynamic
    // TODO If I set the page zoom to more than 100% I can zoom out further than 24h
    // TODO consider debouncing the request when switching the week/day
    // TODO Lazy loading of next weeks/days events
    // TODO Caching..?

    const start = startOfWeek(new Date(dateInfo.year,dateInfo. monthIndex, dateInfo.day))
    const end = endOfWeek(new Date(dateInfo.year, dateInfo.monthIndex, dateInfo.day))

    const events: Event[] = await fetchEventsBetween(start, end);

    const events_per_day: Event[][] = range(7).map(() => new Array(0))
    events.forEach((event) => {
        events_per_day[(event.date.getDay() + 6) % 7].push(event)
    })


    return (
        <div className='flex flex-col w-full p-3'> {/* H-Stack */}
            <div className='flex flex-row w-full py-2'> {/* V-Stack Days */}
                <div className='h-2 w-9 shrink-0'></div> {/* Spacer for time numbers */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) =>
                    <div key={day} className='flex flex-col items-center w-full'> {/* H-Stack Individual days */}
                        <p>{day}</p>
                        <p>{i}</p>
                    </div>
                )}
            </div>

            <ScrollBlockWeek events_per_day={events_per_day} height={2400} initialPos={1500-1}/>
        </div>
    )
}


export function WeekViewSkeleton() {
    const arr: number[] = range(4)

    return (
        <div className='flex flex-row gap-1 w-full p-3'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) =>
                <div key={day} className='group flex flex-col w-full gap-1 items-center'>
                    <p>{day}</p>
                    <p className='px-2 group-[:nth-of-type(3)]:bg-red-500 rounded-full group-[:nth-of-type(3)]:text-white '>{index}</p>
                    {arr.map((index) =>
                        <div key={index} className='bg-gray-300 group-even:bg-gray-200 rounded h-20 w-full'></div>
                    )}
                </div>
            )}
        </div>
    )
}
