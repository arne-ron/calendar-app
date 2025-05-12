// ? Collection of functions that get run on other server side components
import postgres, {RowList} from "postgres";
import {Calendar, Event, Settings} from "@/app/definitions";
import {auth} from "@/app/auth";


/** Shortcut to our PostgreSQL database */
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


/**
 * Returns all events in the database that belong to the user currently logged in
 */
export async function fetchAllEvents(): Promise<RowList<Event[]>> {
    const user_id = await getCurrentUserID()

    try {
        return await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
            WHERE user_id = ${user_id}
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch events.');
    }
}


/**
 * Returns the event assigned the given id from the database
 *
 * @param id the unique identifier for the event
 */
export async function fetchEventById(id: string): Promise<Event> {
    const user_id = await getCurrentUserID()

    try {
        const res = await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
            WHERE id = ${id} AND user_id = ${user_id}
        `;

        const parts = (res[0].duration as unknown as string).split(':').map(Number);
        const totalSeconds = parts[0] * 60 + parts[1] + parts[2] / 60;

        return {
            ...res[0],
            duration: totalSeconds.toString() // TODO make this uniform with other fetch calls
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch event.');
    }
}


/**
 * Returns all events belonging to the user in the given timeframe
 *
 * @param start The start date
 * @param end The end date
 */
export async function fetchEventsBetween(start: Date, end: Date): Promise<RowList<Event[]>> {
    const user_id = await getCurrentUserID()

    try {
        return await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
            WHERE user_id = ${user_id}
            AND date BETWEEN ${start.toISOString()} AND ${end.toISOString()} 
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch events.');
    }
}


/**
 * Returns all calendars in the database that belong to the user currently logged in
 */
export async function fetchCalendars(): Promise<RowList<Calendar[]>> {
    const user_id = await getCurrentUserID()

    try {
        return await sql<Calendar[]>`
            SELECT *
            FROM "calendar-groups"
            WHERE user_id = ${user_id}
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch calendar groups.');
    }
}


/**
 * Returns the user id associated with the given email
 *
 * @param email the email associated with that user
 */
export async function fetchUserID(email: string): Promise<string> {
    try {
        const [{id}] = await sql< {id: string}[]>`
            SELECT "id"
            FROM "users"
            WHERE email = ${email}
        `;
        return id
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user id.');
    }
}


/**
 * Returns the id of the user currently logged in
 *
 * This should only be called if in login-protected areas.
 * If this needs to be called in unprotected sites in the future, this needs to be rewritten
 */
export async function getCurrentUserID(): Promise<string> {
    const session = await auth()
    if (!(session?.user)) throw new Error("The user should be logged in at this point")
    if (!(session.user.email)) throw new Error("The user should be have an email attached")
    return await fetchUserID(session.user.email)
}


export async function getSettings(): Promise<Settings> {
    try {
        const user_id = await getCurrentUserID()
        const [{settings}] = await  sql<{settings: string}[]>`
            SELECT settings
            FROM users
            WHERE id = ${user_id}
        `
        const res: Settings = JSON.parse(settings)
        console.log(`Sucessfully fetched settings: ${settings}`)
        return res
    } catch (error) {

        console.log(`Unsucessfully fetched settings`)
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user settings.');
    }
}


/**
 * Artificially delays the caller <br>
 * i.e. used to test <Suspense> and Skeletons
 *
 * @param time delay in ms
 */
export async function delay(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}