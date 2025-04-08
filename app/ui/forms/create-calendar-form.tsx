'use client'

import Link from "next/link";
import {CalendarFormState, createCalendar } from "@/app/actions";
import { useActionState } from "react";


export function CreateCalendarForm() {
    const initialState: CalendarFormState = { message: null, errors: {} }
    // this will be used later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction] = useActionState(createCalendar, initialState)

    return (
        <form action={formAction} className='flex flex-col gap-1 bg-gray-200 p-3 rounded-xl'>
                <label>Name</label>
                <input />
                <label>Tags</label>
                <input />
                <label>Share with</label>
                <input />
                <div className='flex flex-row gap-1 mt-1'>
                    <button type='submit' className='bg-white hover:bg-white/60 w-fit px-1 rounded-full text-blue-600'>Create</button>
                    <Link href='/calendar' className='bg-white hover:bg-white/60 rounded-full px-1'>Cancel</Link>
                </div>


                {/* Currently state is not used to show mistakes to the user but might be needed if
                there's stuff that we need to enforce for calendar.
                 Then get inspiration from [create-event-form.tsx] */}

        </form>
    )
}