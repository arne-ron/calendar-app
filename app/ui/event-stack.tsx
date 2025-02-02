import { Event } from '@/app/data'
import {EventBlock} from "@/app/ui/event-block";


const events: Event[] = [
    {
        id: 0,
        title: 'Fist test event',
        date: Date.parse('2025-02-02 12:30'),
        tags: [],
    },
    {
        id: 1,
        title: 'Second test event',
        date: Date.parse('2025-02-01 14:15'),
        tags: [],
        location: "Royal Commonwealth Pool",
    },
    {
        id: 2,
        title: 'Third test event',
        date: Date.parse('2025-02-01 16:50'),
        tags: [],
    },
]


export function EventStack() {
    return (
        <div className={"flex flex-col items-start"}>
            {events.map((event: Event) =>
                <EventBlock event={event} key={event.id}/>
                // <div key={event.id} className="h-20 w-32 bg-blue-400 rounded-xl mb-1 mt-1 p-1.5">
            )}
        </div>
    )
}