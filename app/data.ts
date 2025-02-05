// ? Collection of functions that get run on other server side components


import postgres from "postgres";
import {Event} from "@/app/definitions";


// Shortcut to our PostgreSQL database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// Returns all events in the database
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


// Returns the event assigned the given id from the database
export async function fetchEventById(id: string) {
    try {
        return (await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
            WHERE id = ${id}
        `)[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch event.');
    }
}