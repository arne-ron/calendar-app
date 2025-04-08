// ? Collection of functions that get run on other server side components
import postgres, {RowList} from "postgres";
import {Event, Calendar, User} from "@/app/definitions";
import {auth} from "@/app/auth";


/** Shortcut to our PostgreSQL database */
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


/**
 * Returns all events in the database that belong to the user currently logged in
 */
export async function fetchEvents(): Promise<RowList<Event[]>> {
    try {
        return await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
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
    try {
        const res = await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
            WHERE id = ${id}
        `;

        const parts = (res[0].duration as unknown as string).split(':').map(Number);
        const totalSeconds = parts[0] * 60 + parts[1] + parts[2] / 60;

        return {
            ...res[0],
            duration: totalSeconds.toString()
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch event.');
    }
}


/**
 * Returns all calendars in the database that belong to the user currently logged in
 */
export async function fetchCalendars(): Promise<RowList<Calendar[]>> {
    const user_id = await getCurrentUser().then((user) => user.id)

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
export async function fetchUserID(email: string) {
    try {
        return await sql<User[]>`
            SELECT *
            FROM "users"
            WHERE email = ${email}
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user id.');
    }
}


/**
 * Returns the user currently logged in
 *
 * This should only be called if in login-protected areas.
 * If this needs to be called in unprotected sites in the future, this needs to be rewritten
 */
export async function getCurrentUser(): Promise<User> {
    const session = await auth()
    if (!(session?.user)) throw new Error("The user should be logged in at this point")
    if (!(session.user.email)) throw new Error("The user should be have an email attached")
    const user = await fetchUserID(session.user.email)
    return user[0]
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