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