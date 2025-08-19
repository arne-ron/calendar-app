'use client'
import {updateGoogleCalendar} from "@/app/utils/google-calendar";


export function UpdateCalendarsButton() {
    return (
        <button onClick={updateGoogleCalendar}>
            Update calendars
        </button>
    )
}