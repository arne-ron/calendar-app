import { Event } from "@/app/definitions";
import Link from "next/link";

export function EventBlock({event} : {event: Event}) {
    const colors = ['#aaa0a0', '#a5ffa5', '#bbdb3b']


    return (
        <Link
            href={`/calendar/event/${event.id}/edit`}
            className='w-full flex flex-col bg-blue-300 rounded h-20'
        >
            <div className='rounded-t p-1 flex flex-row gap-0.5 grow bg-white/30'>
                {colors.map((col, i) =>
                    <div key={i} className={'h-2 rounded-sm flex grow min-w-2 max-w-5'} style={{ backgroundColor: col}}/>
                )}
            </div>
            <div className={'p-1.5 pt-0'}>
                <p className='text-sm'>{event.title}</p>
                {event.location ? <p className='text-xs'>{(event.location.length > 18) ? event.location.substring(0,18) + '...' : event.location}</p> : null}
                {event.date ? <p className='text-xs'>{new Date(event.date).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric',})}</p> : null}
            </div>
        </Link>
    )
}