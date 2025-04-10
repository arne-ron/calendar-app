import {Event} from "@/app/definitions";
import Link from "next/link";


export function EventBlockMonth({ event }: { event: Event }) {
    return (
        <Link
            href={`/calendar/event/${event.id}/edit`}
            className='bg-red-500/10 rounded px-1'
        >
            <p className='truncate'>{event.title}</p>
        </Link>
    )
}