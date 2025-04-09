import {Event} from "@/app/definitions";


export function EventBlockMonth({ event }: { event: Event }) {
    return (
        <div
            className='bg-red-500/10 rounded px-1'
        >
            <p className='truncate'>{event.title}</p>
        </div>
    )
}