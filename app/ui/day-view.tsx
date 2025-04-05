import {EventStack} from "@/app/ui/event-stack";
import { Event } from '@/app/definitions'


export function DayView({
    title,
    events
}: {
    title: string;
    className?: string;
    events: Event[]
}) {
    return (
        <div className={"flex flex-col items-center w-full gap-1"}>
        {/* H-Stack */}
            <p>{title}</p>
            {/*Title*/}
            <p className='px-3'>3</p>
            {/*Day*/}
            <EventStack events={events} scale={1}/>
        </div>
    )
}