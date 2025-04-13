import { LogoutButton } from "@/app/ui/components/logout-button";
import { ShowUser } from "@/app/ui/components/show-user";
import { CalendarStack, CalendarStackSkeleton } from "@/app/ui/calendar-stack";
import { Suspense } from "react";


export function GeneralInformationPage() {
    return (
        <div className='flex flex-col flex-shrink-0 w-80 h-full bg-gray-200'>
            {/* Tab Bar */}
            <div className='flex flex-row p-1.5 gap-1 items-start'>
                <button
                    className='px-1 rounded-md bg-white hover:bg-gray-100'
                >
                    Calendar
                </button>
                <button className='px-1 rounded-md bg-white hover:bg-gray-100'>Settings</button>
            </div>
            <div className='bg-gray-300 h-0.5'></div>
            {/* Calendars listed */}
            <Suspense fallback={<CalendarStackSkeleton/>}>
                <CalendarStack />
            </Suspense>
            <div className='flex flex-col gap-1 mt-3 ml-2'>
                <LogoutButton />
                <ShowUser />
            </div>
        </div>
    )
}