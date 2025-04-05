// ? Collection of functions that should get run on the server but are to be called from client side forms
'use server'


import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { EditEvent } from './definitions';
import { redirect } from "next/navigation";


// Shortcut to our PostgreSQL database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


/**
 * Represents the state of a form for creating/editing events. <br>
 * Also contains errors to convey whether all necessary fields are filled correctly
 */
export type State = {
    errors?: {
        date?: string[];
        duration?: string[];
    };
    message?: string | null;
}


/**
 * Function call to create a new event entry in the database
 *
 * @param prevState the previous state to comply with `useActionState()`'s signature
 * @param formData the input object as to received by i.e. the `<CreateEventForm\>`
 */
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

    const durationSec = duration * 60;

    // Update the values in the database
    try {
        await sql`
            INSERT INTO "calendar-entries" (title, date, location, duration, notes, link, tags) /* id gets auto-generated */
            VALUES (${title}, ${date}, ${location}, ${durationSec}, ${notes}, ${link}, ${tags}) 
        `;
    } catch (error) {
        console.error(error);
    }

    revalidatePath('/calendar');
    redirect(`/calendar`);
}


/**
 * Function call to create a new event entry in the database
 *
 * @param id the unique reference to the edited event
 * @param prevState the previous state to comply with `useActionState()`'s signature
 * @param formData the input object as to received by i.e. the `<EditEventForm\>`
 */
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
    const durationSec = duration * 60;

    // Update the values in the database
    try {
        await sql`
            UPDATE "calendar-entries"
            SET title=${title}, date=${date}, location=${location}, duration=${durationSec}, notes=${notes}, link=${link}, tags=${tags}
            WHERE id=${id}
        `;
    } catch (error) {
        console.error(error);
    }

    revalidatePath('/calendar');
    redirect('/calendar');
}


/**
 * Deletes an event from the database by its id
 * @param id uniquely references the event to be deleted
 */
export async function deleteEvent(id: number) {
    try {
        await sql`
            DELETE
            FROM "calendar-entries"
            WHERE id=${id}
        `;
    } catch (error) {
        console.log(error);
        return {
            errors: {date: undefined, message: undefined},
            message: `Something went wrong in deleting the event. Please try again. \n ${error}`,
        } as State;
    }
    console.log('events deleted successfully.');

    revalidatePath('/calendar');
    redirect('/calendar');
}


