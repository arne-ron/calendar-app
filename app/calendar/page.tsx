import {DayView} from "@/app/ui/day-view";


export default function Page() {
    return (
        <div className='flex flex-row h-full' >
            <aside className='flex flex-col gap-1 w-60 h-full bg-gray-300 rounded-r-3xl'>
                {/* Tab Bar */}
                <div className='flex flex-row p-1.5 gap-1 items-start bg-gray-400'>
                    <button
                        className='px-1 rounded-md bg-white hover:bg-gray-100'
                    >
                        Calendar
                    </button>
                    <button className='px-1 rounded-md bg-white hover:bg-gray-100'>Settings</button>
                </div>
                <div className='flex flex-col m-1 gap-1 h-full items-start'>
                    <button className='flex text-blue-600 hover:text-blue-800 hover:underline'>Select all</button>
                    <p>Sample text</p>
                    {[1,2,3,4,5].map((item, index) => (
                        <button key={index} className='group flex flex-row items-center gap-1' value={item}>
                            <div className='w-4 h-4 rounded-md group-even:bg-blue-400 group-even:border-blue-400 group-odd:bg-blue-600 group-odd:border-blue-600 group-[:nth-of-type(3)]:bg-transparent group-[:nth-of-type(3)]:border-2'></div>
                            <p className='group-[:nth-of-type(3)]:text-gray-500'>{'Calendar ' + item}</p>
                        </button>
                    ))}
                </div>
            </aside>
            <main className='w-full h-full'>
                <div className='flex flex-row h-full bg-gray-200'> {/* Multiple days*/}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
                        <DayView title={day} key={day}/>
                    )}
                </div>
            </main>
            <aside>
                <div className='flex flex-col bg-gray-300 p-1 w-40 h-full'>
                    <h1>Name</h1>
                    <p>Start</p>
                    <p>End</p>
                    <p>Duration</p>
                </div>

            </aside>
        </div>
    )
}