import { Event } from '@/app/definitions'
import { EventBlock } from "@/app/ui/event-block";
import { fetchEvents } from "@/app/data";


export async function EventStack() {
    const events = await fetchEvents();

    return (
        <div className={"flex flex-col items-start"}>
            {events?.map((event: Event) => {
                    console.log(event);
                    return <EventBlock event={event} key={event.id}/>;
                }
            )}
        </div>
    )
}