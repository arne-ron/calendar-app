'use server'

import postgres from 'postgres';
import { Event } from "@/app/definitions";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function getEvents() {
    const result = await sql<Event[]>`
        SELECT *
        FROM "calendar-entries"
    `;
    console.log("Function has been called");
    console.log(result);
    return result;
}