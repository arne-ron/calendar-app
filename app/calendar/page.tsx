import {DayView} from "@/app/ui/day-view";

export default function Page(){
    return (
     <div className={"flex flex-col items-center w-full"}>
         <div className='flex flex-row'> {/* Multiple days*/}
             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
                 <DayView title={day} key={day}/>
             )}
         </div>
        <DayView title='Test'/>
     </div>

    )
}
