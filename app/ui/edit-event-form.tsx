// Element that handles and displays inputs for editing a new event
'use client'

import { editEvent, State } from "@/app/actions";
import { Event, EditEvent } from "@/app/definitions";
import { firstToUpper, mapZodToInputValueString, mapEventToDefaultValue } from "@/app/ui/utils";
import { useActionState } from "react";
import Link from "next/link";
import {DeleteEventForm} from "@/app/ui/delete-event-form";


export function EditEventForm({event}: {event: Event}) {
    const initialState: State = { message: null, errors: {} }
    const editEventId = editEvent.bind(null, event.id);
    const [state, formAction] = useActionState(editEventId, initialState)
    return (
        <form action={formAction}>
            <div className='flex flex-col gap-2 rounded bg-gray-100 p-2.5'>
                {Object.entries(EditEvent._def.shape()).map(([field, type]) => {
                    return (
                        <div key={field} className='flex flex-col'>
                            <label
                                className='text-sm font-medium text-gray-700'
                                htmlFor={field}
                            >
                                {firstToUpper(field)}
                            </label>
                            <input
                                id={field}
                                name={field}
                                placeholder={'Enter the ' + field}
                                defaultValue={mapEventToDefaultValue(event, field)}
                                type={mapZodToInputValueString(type)}
                                className='rounded-md border border-gray-200 py-1 pl-2 text-sm'
                                aria-describedby={field + '-error'}
                            />
                            <div id={field + '-error'} aria-live="polite" aria-atomic="true">
                                {/* @ts-expect-error I think state will always be assigned... TODO: Look into this with more depth*/}
                                {state && state.errors?.[field] && state.errors?.[field].map((error: string) => (
                                    <p className="ml-1.5 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })}
                <div className='flex flex-row gap-2'>
                    <button className='text-blue-500 hover:text-blue-700 w-24 rounded-md bg-white hover:bg-white/60' type='submit'>Save</button>
                    <Link className='text-black hover:text-gray-700 w-24 rounded-md bg-white hover:bg-white/60' href='/calendar'>Cancel</Link>
                    <DeleteEventForm id={event.id}/>
                </div>
            </div>
        </form>
    )
}