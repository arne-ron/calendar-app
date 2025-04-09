import {Event} from "@/app/definitions";


export function YearView({ events }: { events: Event[] }) {
    return (
        <p>This is the year view</p>
    )
}


export function YearViewSkeleton() {
    const days: number[] = []
    for (let i = 0; i < 31; i++) {
        days.push(i)
    }
    const months: number[] = []
    for (let i = 0; i < 12; i++) {
        months.push(i)
    }


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
