/**
 * Displays additional infos for the selected event.
 *
 * This includes all fields, options for closing the tab, and deleting or editing the event.
 */
export function EventInfoSidebar() {
    return (
        <div className='flex flex-col shrink-0 bg-gray-200 p-2 w-60 h-full'>
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
        </div>
    )
}