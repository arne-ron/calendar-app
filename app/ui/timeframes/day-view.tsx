import { Event } from "@/app/definitions";
import { range } from "@/app/utils";
import { fetchEventsBetween } from "@/app/data";
import {ScrollBlockDay} from "@/app/ui/components/scroll-block-day";



/**
 * Displays all events in the given day
 *
 * @param events The events of the day to be displayed
 */
export async function DayView({ dateInfo }: { dateInfo: {day: number, monthIndex: number, year: number } }) {
    const start = new Date(dateInfo.year, dateInfo.monthIndex, dateInfo.day)
    const end = new Date(dateInfo.year, dateInfo.monthIndex, dateInfo.day + 1)

    const events: Event[] = await fetchEventsBetween(start, end);


    return (
        <div className='flex flex-col w-full p-3'> {/* H-Stack */}
            <div className='flex flex-col items-center w-full py-2'> {/* H-Stack Individual days */}

                <p>
                    {start.toLocaleString('en-GB', {weekday: 'long'})} {/* TODO take user preference for this */}
                </p>
                <p>{dateInfo.day}</p>
            </div>

            <ScrollBlockDay
                events={events}
                height={2400}
                initialPos={1500-1}
            />
        </div>
    )

}


export function DayViewSkeleton() {
    const arr = range(9)

    return (
        <div className='flex flex-col w-full h-full p-4 gap-1'>
            {arr.map((index) =>
                <div key={index} className='bg-gray-200 rounded-2xl h-20'></div>
            )}
        </div>
    )
}