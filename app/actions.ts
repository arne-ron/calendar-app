// ? Collection of functions that should get run on the server but are to be called from client side forms
'use server'



import { z } from 'zod';
import postgres from 'postgres';
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';


// Shortcut to our PostgreSQL database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// The Schema describing an event object
const EventSchema = z.object({
    id: z.number(),
    title: z.string({
        required_error: "Title is required",
        // invalid_type_error: "Name must be a string",
    }),
    date: z.coerce.date({
        required_error: "Date is required",
        invalid_type_error: "Date must be a of format ...", //  TODO insert right date formating
    }), // use 'z.string().datetime()' (ISO 8601) od 'z.string.date()' as a possible alternative
    location: z.string().optional(),
    duration: z.coerce.number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
    }).gt(0, { message: "Duration must be greater than 0" }), // use 'z.string.duration()' (ISO 8601) as a possible alternative
    notes: z.string().optional(),
    link: z.string().url({ message: "Invalid url" }).optional(),
    tags: z.array(z.string()),
})


// A dependent schema of EventSchema that omits the id
const EditEvent = EventSchema.omit({ id: true})


// Represents the state of a form for creating/editing events
// also contains errors to convey whether all necessary fields are filled correctly
export type State = {
    errors?: {
        name?: string[];
    };
    messages?: string | null;
}


// Function call to create a new event entry in the database
export async function createEvent(prevState: State, formData: FormData) {
    // safeParse returns { success: true; data: "tuna" } or { success: false; error: ZodError } on parsing
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

    // Transmit the missing/incomplete fields up to the calling method over an object containing the errors and a message
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Event.',
        };
    }


    const { title, date, location, duration, notes, link, tags } = validatedFields.data;

    // Update the values in the database
    try {
        // @ts-expect-error sql is weird TODO: Check this
        await sql`
            INSERT INTO "calendar-entries" (title, date, location, duration, notes, links, tags)
            VALUES (${title}, ${date}, ${location}, ${duration}, ${notes}, ${link}, ${tags}) 
        `;
    } catch (error) {
        console.error(error);
    }
}