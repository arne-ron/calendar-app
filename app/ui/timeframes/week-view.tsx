import {DayView} from "@/app/ui/day-view";


export function WeekView() {
    const arr: number[] = []
    for (let i = 0; i < 4; i++) {
        arr.push(i)
    }


    return (
        <div className='flex flex-col m-0'>
            <div className='flex flex-row gap-1 w-full'>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) =>
                    <div key={day} className='group flex flex-col w-full gap-1 items-center'>
                        <p>{day}</p>
                        <p className='px-2 group-[:nth-of-type(3)]:bg-red-500 rounded-full group-[:nth-of-type(3)]:text-white '>{index}</p>
                        {arr.map((index) =>
                            <div key={index} className='bg-gray-300 group-even:bg-gray-200 rounded-xl h-20 w-full'></div>
                        )}
                    </div>
                )}
            </div>
            <p>This is the week view</p>
            <div className='flex flex-row h-full'> {/* Multiple days*/}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
                    <DayView title={day} key={day}/>
                )}
            </div>
        </div>
    )
}


export function WeekViewSkeleton() {
    const arr: number[] = []
    for (let i = 1; i <= 4; i++) {
        arr.push(i);
    }


    return (
        <div className='flex flex-row gap-1 w-full p-4'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) =>
                <div key={day} className='group flex flex-col w-full gap-1 items-center'>
                    <p>{day}</p>
                    <p className='px-2 group-[:nth-of-type(3)]:bg-red-500 rounded-full group-[:nth-of-type(3)]:text-white '>{index}</p>
                    {arr.map((index) =>
                        <div key={index} className='bg-gray-300 group-even:bg-gray-200 rounded-xl h-20 w-full'></div>
                    )}
                </div>
            )}
        </div>
    )
}
