"use client"
import {signInGoogleCalendar} from "@/app/actions";

export default function ConnectCalendar() {
    return (
        <button
            onClick={() => signInGoogleCalendar()}
        >Connect Calendar</button>
    )
}
