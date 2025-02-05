// ? Collection of functions that should get run on the server but are to be called from client side forms
'use server'


import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { EditEvent } from './definitions';
import {redirect} from "next/navigation";


// Shortcut to our PostgreSQL database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// Represents the state of a form for creating/editing events
// also contains errors to convey whether all necessary fields are filled correctly
export type State = {
    errors?: {
        date?: string[];
        duration?: string[];
    };
    message?: string | null;
}


// Function call to create a new event entry in the database
export async function createEvent(prevState: State, formData: FormData) {
    // Validates and parses the inputs given via the form, and states the success of the parsing in the 'success' field
    const validatedFields = EditEvent.safeParse({
        title: formData.get('title'),
        date: formData.get('date'),
        location: formData.get('location'),
        duration: formData.get('duration'),
        notes: formData.get('notes'),
        link: formData.get('link'),
        tags: formData.get('tags'),
    })
    // Alternative: EditEvent.safePArse(Object.fromEntries(formData.entries()));


    // Transmit the missing/incomplete fields up to the calling method over an object containing the errors and a message
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Event.',
        };
    }

    // extract fields to variables
    const { title, date, location, duration, notes, link, tags } = validatedFields.data;

    // Update the values in the database
    try {
        await sql`
            INSERT INTO "calendar-entries" (title, date, location, duration, notes, link, tags) /* id gets auto-generated */
            VALUES (${title}, ${date}, ${location}, ${duration}, ${notes}, ${link}, ${tags}) 
        `;
    } catch (error) {
        console.error(error);
    }

    revalidatePath('/calendar');
    redirect(`/calendar`);
}


// Function call to create a new event entry in the database
export async function editEvent(id: number, prevState: State, formData: FormData) {
    // Validates and parses the inputs given via the form, and states the success of the parsing in the 'success' field
    const validatedFields = EditEvent.safeParse({
        title: formData.get('title'),
        date: formData.get('date'),
        location: formData.get('location'),
        duration: formData.get('duration'),
        notes: formData.get('notes'),
        link: formData.get('link'),
        tags: formData.get('tags'),
    })
    // Alternative: EditEvent.safePArse(Object.fromEntries(formData.entries()));


    // Transmit the missing/incomplete fields up to the calling method over an object containing the errors and a message
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Event.',
        };
    }

    // extract fields to variables
    const { title, date, location, duration, notes, link, tags } = validatedFields.data;

    // Update the values in the database
    try {
        await sql`
            UPDATE "calendar-entries"
            SET title=${title}, date=${date}, location=${location}, duration=${duration}, notes=${notes}, link=${link}, tags=${tags}
            WHERE id=${id}
        `;
    } catch (error) {
        console.error(error);
    }

    revalidatePath('/calendar');
    redirect('/calendar');
}