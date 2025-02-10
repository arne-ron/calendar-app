import { DayView } from "@/app/ui/day-view";
import { CreateEventForm } from "@/app/ui/create-event-form";


export default function Page(){
    return (
     <div className={"flex flex-col items-center w-full gap-4"}>
         <div className='flex flex-row'> {/* Multiple days*/}
             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
                 <DayView title={day} key={day}/>
             )}
         </div>
         <DayView title='Test'/>
         <CreateEventForm />
         <div className='h-20' /> {/* allow some whitespace to the bottom TODO remove this eventually */}
     </div>

    )
}
