import {EventStack} from "@/app/ui/event-stack";


export function DayView({
    title,
}: {
    title: string;
    className?: string;
}) {
    return (
        <div className={"flex flex-col items-center"}>
        {/* H-Stack */}
            <p>{title}</p>
            {/*Title*/}
            <p>3</p>
            {/*Day*/}
            <EventStack />
        </div>
    )
}