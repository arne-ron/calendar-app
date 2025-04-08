import {auth} from "@/app/auth";
import {fetchCalendars, fetchUserID} from "@/app/data";
import {CalendarItem} from "@/app/ui/calendar-item";
import Link from "next/link";
import {LogoutButton} from "@/app/ui/components/logout-button";
import {ShowUser} from "@/app/ui/components/show-user";


export async function CalendarStack() {
    const session = await auth()
    const user = await fetchUserID(session?.user?.email ?? '')
    const calendars = await fetchCalendars(user[0].id)

    return (
        <div className='flex flex-col m-2 gap-1 items-start'>
            <button className='flex text-blue-600 hover:text-blue-800 hover:underline'>Select all</button>
            {calendars.map((calendar_group, index) => {
                return <CalendarItem key={index} name={calendar_group.name} color={calendar_group.color}/>
            })}
            <Link href={'/calendar/calendar/create'}
                  className='flex bg-gray-100 hover:bg-gray-100/60 rounded-full w-12 text-gray-400 justify-center'
            >
                +
            </Link>
        </div>
    )

}