import postgres from "postgres";
import {Event} from "@/app/definitions";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function fetchEvents() {
    try {
        const data = await sql<Event[]>`
            SELECT *
            FROM "calendar-entries"
        `;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch events.');
    }
}