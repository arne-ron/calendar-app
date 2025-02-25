// ? Collection of functions that get run on other server side components


import postgres from "postgres";
import { Event, Calendar } from "@/app/definitions";


// Shortcut to our PostgreSQL database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


/**
 * Returns all events in the database
 */
export async function fetchEvents() {
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
export async function fetchEventById(id: string) {
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
            duration: totalSeconds
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch event.');
    }
}


export async function fetchCalendars() {
    try {
        return await sql<Calendar[]>`
            SELECT *
            FROM "calendar-groups"
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch calendar groups.');
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