export function MonthView() {
    return (
        <p>This is the month view</p>
    )
}


export function MonthViewSkeleton() {
    const arr: number[] = []
    for (let i = 0; i < 7; i++) {
        arr.push(i)
    }
    const arr2: number[] = []
    for (let i = 0; i < 4; i++) {
        arr2.push(i)
    }


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