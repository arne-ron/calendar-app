import { Event } from "@/app/definitions";
import { getDaysFromMonth, range } from "@/app/utils";
import Link from "next/link";
import clsx from "clsx";


export function YearView({ events }: { events: Event[]}) {
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const offsets: number[] = [1, 2, 2, 5, 1, 4, 6, 2, 5, 0, 3, 5]
    const is_occupied: boolean[][] = range(12).map((month) => new Array(getDaysFromMonth(month+1)).fill(false))

    events.forEach((event) => {
        is_occupied[event.date.getMonth()][event.date.getDate() - 1] = true
    })


    return (
        <div className='flex flex-col w-full p-4'>
            <p className='text-xl font-bold'>
                2025
            </p>
            <div className='grid grid-cols-4 gap-x-3 gap-y-3 h-full w-full mt-2'>
                {months.flatMap((month, index) => {
                    return (
                        <Link href={`/calendar?view=month&month=${month}`} key={`month_${month}`} className='bg-gray-50/80 p-2 rounded-lg'>
                            <p className='mb-1'>{month}</p>
                            <div className='grid grid-cols-7 gap-1'>
                                {...range(offsets[index]).map((_, i) =>
                                    <div key={`offset_${i}`} />
                                )}
                                {range(getDaysFromMonth(index + 1)).map((day) =>
                                    <div
                                        key={`month_${month}_${day}`}
                                        className='flex flex-col bg-gray-200/50 rounded-lg items-center justify-center'
                                    >
                                        <p className='text-sm pt-[1px]'>{day + 1}</p>
                                        <div className={clsx('rounded-full h-1.5 w-1.5 mb-1', (is_occupied[index][day]) ? 'bg-gray-400' : '')} />
                                    </div>
                                )}
                            </div>
                        </Link>
                    )})
                }
            </div>
        </div>
    )
}


export function YearViewSkeleton() {
    const days: number[] = range(31)
    const months: number[] = range(12)


    return (
        <div className='grid grid-cols-4 gap-x-6 gap-y-4 h-full w-full p-4'>
            {months.flatMap((index2) => {
                return <div key={index2}>
                    <p className='font-bold'>{index2 + 1}</p>
                    <div className='grid grid-cols-7 gap-1'>

                        {days.map((index) =>
                            <div key={index} className='flex bg-gray-200 rounded-lg items-center justify-center'>
                                <p>{index + 1}</p>
                            </div>
                        )}
                    </div>
                </div>
            })

            }
        </div>
    )
}
