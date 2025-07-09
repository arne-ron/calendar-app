import {cookies} from "next/headers";
import oauth2Client from "@/app/utils/google-auth";
import {calendar_v3, google} from "googleapis";
import Schema$Event = calendar_v3.Schema$Event;

export default async function Page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('google_access_token')?.value

    oauth2Client.setCredentials({access_token: accessToken})

    let events;

    const calendar = google.calendar('v3')




    try {
        const request = {
            auth: oauth2Client,
            calendarId: 'primary',
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime'
        };

        const res = await calendar.events.list(request)
        events = res.data.items
        console.log(events)
    } catch (error) {
        return <div>{'Failed to fetch events' + error}</div>
    }


    return (
        <div>
            <h1>My calendar entries</h1>
            <div className={'flex-col'}>
                {events?.map((e: Schema$Event, i: number) => <p key={i}>{e.start?.date}</p>)}
            </div>
        </div>
    )
}