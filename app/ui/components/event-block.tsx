import { Event } from "@/app/definitions";
import Link from "next/link";

export function EventBlock({event} : {event: Event}) {
    return (
        <Link href={`/calendar/event/${event.id}/edit`} className='w-full'>
            <div className='flex flex-col bg-blue-500 rounded h-20 p-1.5'> {/* w-full || flex-1 || flex-grow */}
                <p>{event.title}</p>
                {event.location ? <p className='text-xs'>{(event.location.length > 18) ? event.location.substring(0,18) + '...' : event.location}</p> : null}
                {event.date ? <p className='text-xs'>{new Date(event.date).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric',})}</p> : null}
            </div>
        </Link>
    )
}