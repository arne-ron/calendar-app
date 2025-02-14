import { Event } from '@/app/definitions'
import { EventBlock } from "@/app/ui/components/event-block";
import { fetchEvents } from "@/app/data";


export async function EventStack() {
    const events = await fetchEvents();

    return (
        <div className={"flex flex-col items-start"}>
            {events?.sort((a,b) => b.date - a.date).map((event: Event) => {
                    return <EventBlock event={event} key={event.id}/>;
                }
            )}
        </div>
    )
}