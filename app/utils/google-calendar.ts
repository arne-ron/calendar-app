'use server'
import postgres from "postgres";
import {calendar_v3, google} from "googleapis";
import googleClient from "@/app/utils/google-auth";
import {cookies} from "next/headers";
import {getLastLoginTime} from "@/app/data";
import {createEvent, updateLastLoginTime} from "@/app/actions";
import {Event} from "@/app/definitions";
// import {date} from "zod";
import {parseDurationToString} from "@/app/utils";


/** Shortcut to our PostgreSQL database */
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const calendar = google.calendar('v3')

export async function updateGoogleCalendar() {
    // Fetch last changed
    // Fetch event changes in google calendar
    // Push changes to db
    // update last changed

    const lastChanged = await getLastLoginTime()


    const cookieStore = await cookies();
    const accessToken = cookieStore.get('google_access_token')?.value

    googleClient.setCredentials({access_token: accessToken})
    google.options({auth: googleClient})

    const request: calendar_v3.Params$Resource$Events$List = {
        auth: googleClient,
        calendarId: 'primary',
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
    };
    if (lastChanged) request.updatedMin = lastChanged.toISOString()


    const res = await calendar.events.list(request)
    const events = res.data.items
    events?.forEach(async (googleEvent) => {

        const event = await eventGoogleToCustom(googleEvent)

        const alreadyInDB = await sql`
            SELECT id
            FROM "calendar-entries"
            WHERE EXISTS
            (SELECT id FROM "calendar-entries" WHERE id=${event.id})
        `

        if (alreadyInDB) { // TODO
            await sql`
                UPDATE "calendar-entries"
                SET id=${event.id} {/** <-- this prob isnt right*/}
                WHERE id=${event.id}
            `
        } else {
            createEvent(event)
        }



    })

    await updateLastLoginTime(new Date())

}


export async function eventGoogleToCustom(googleEvent: calendar_v3.Schema$Event): Promise<Event> {
    const event: Event = {
        date: new Date(),
        duration: "",
        id: googleEvent.id!,
        link: undefined, // TODO filter link with regex?
        location: googleEvent.location ?? undefined,
        notes: googleEvent.description ?? undefined,
        tags: ["google"],
        title: googleEvent.summary!,
    }

    const start = googleEvent.start!
    if (start.date) {
        event.date = new Date(Date.parse(start.date))
        event.duration = parseDurationToString(Date.parse(start.date) - Date.parse(googleEvent.end!.date!))
    } else {
        event.date = new Date(Date.parse(start.dateTime!))
        event.duration = parseDurationToString(Date.parse(start.dateTime!) - Date.parse(googleEvent.end!.dateTime!))
    }

    return event
}