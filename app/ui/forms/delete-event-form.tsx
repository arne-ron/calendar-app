'use-client'


import { deleteEvent } from "@/app/actions";


export function DeleteEventForm({ id }: { id: string }) {
    const deleteEventId = deleteEvent.bind(null, id);

    return (
            <button type='submit' onClick={deleteEventId}>Delete</button>
    )
}