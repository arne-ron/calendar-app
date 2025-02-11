import {DayView} from "@/app/ui/day-view";


export function WeekView() {
    return (
        <div>
            <p>This is the week view</p>
            <div className='flex flex-row h-full'> {/* Multiple days*/}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
                    <DayView title={day} key={day}/>
                )}
            </div>
        </div>
    )
}
