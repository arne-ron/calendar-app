/**
 * Displays 24 vertical lines labeled with the hours 0:00 to 23:00
 */
export function TimeLines() {
    const times: string[] = Array(25).fill(1).map((_, i) => i.toString() + ':00')

    return (
        <div className='flex flex-col justify-between h-full pt-0.5'>
            {
            times.map((text: string, i: number) =>
                <div className='flex flex-row items-start text-xs text-gray-500 gap-1' key={i}>
                    <p className='relative w-9 text-right -translate-y-1'>{(i != times.length - 1) ? text : null}</p>
                    <div className='w-full bg-gray-500/20' style={{height: '1px'}}/>
                </div>
            )}
        </div>
    )
}