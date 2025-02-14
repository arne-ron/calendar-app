'use client'


import { createEvent, State} from "@/app/actions";
import { useActionState } from "react";
import { EditEvent } from "@/app/definitions";
import {firstToUpper, mapZodToInputValueString} from "@/app/ui/utils";
import Link from "next/link";


// Element that handles and displays inputs for creating a new event
export function CreateEventForm() {
    const initialState: State = { message: null, errors: {} }
    const [state, formAction] = useActionState(createEvent, initialState)
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
                <div className='flex flex-row gap-1'>
                    <button className='text-blue-500 hover:text-blue-700 rounded-full bg-white hover:bg-white/60 px-1' type='submit'>Create</button>
                    <Link href='/calendar' className='bg-white hover:bg-white/60 rounded-full px-1'>Cancel</Link>
                </div>
            </div>
        </form>
    )
}