import {getDaysFromMonth, range} from "@/app/utils";
import { Event } from "@/app/definitions";
import {VLine} from "@/app/ui/components/v-line";
import {EventBlockMonth} from "@/app/ui/components/event-block-month";


export function MonthView({ events }: { events: Event[] }) {
    const month = 5;
    const offset = 3;
    const nr_days = getDaysFromMonth(month); // TODO leap years
    const days = range(nr_days);

    // Can optimise this because/if events come sorted by day
    const events_per_day: Event [][] = Array(nr_days).fill(null).map(() => new Array(0))

    events.forEach((event) => {
        events_per_day[event.date.getDate()].push(event);
    })
    // Sort events by start time ascending
    events_per_day.forEach((events) => {events.sort((a: Event, b: Event) => b.date.valueOf() - a.date.valueOf())})

    return (
        <div className='grid grid-cols-7 gap-x-2 gap-y-4 h-full w-full p-4'>
            {Array(offset).fill(null).map((_, i) =>
                <div key={'offset_' + i}/>, {/* Fill first x grid cells to have the right start day */}
            )}
            {days.map((day) =>
                    <div key={day} className='flex flex-col gap-1'>
                        <p className='self-center'>{day}</p>
                        <VLine />
                        {events_per_day[day].slice(0, 3).map((event, i) =>
                            <EventBlockMonth event={event} key={`event_${day}_${i}`}/>,
                        )}
                        {events_per_day[day].length > 3 &&
                            <p className='bg-red-500/10 rounded px-1 w-min'>...</p>
                        }
                    </div>
            )

            }
        </div>
    )
}


export function MonthViewSkeleton() {
    const arr: number[] = range(7)
    const arr2: number[] = range(4)


    return (
        <div className='grid grid-cols-7 gap-x-2 gap-y-4 h-full w-full p-4'>
            {arr2.flatMap((index2) => {
                return arr.map((index) =>
                    <div key={index2 + '.' + index} className='flex flex-col items-center gap-1'>
                        <p>{index2*7+ index}</p>
                        <div className={'bg-gray-200 rounded-2xl p-2 w-full grow'}>
                        </div>
                    </div>
                )
            })

            }
        </div>
    )
}