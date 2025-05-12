// ? Collection of functions that should get run on the server but are to be called from client side forms
'use server'
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import {EditEvent, EditCalendar, EditUser, User, Settings} from './definitions';
import { redirect } from "next/navigation";
import { signIn} from "@/app/auth";
import { AuthError } from "next-auth";
import {getCurrentUserID, getSettings} from "@/app/data";
import { hash } from "bcrypt";


/** Shortcut to our PostgreSQL database */
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


/**
 * Represents the state of a form for creating/editing events. <br>
 * Also contains errors to convey whether all necessary fields are filled correctly
 */
export type EventFormState = {
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
export async function createEvent(prevState: EventFormState, formData: FormData): Promise<EventFormState> {
    const user_id = await  getCurrentUserID()

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
            INSERT INTO "calendar-entries" (title, date, location, duration, notes, link, tags, user_id) /* id gets auto-generated */
            VALUES (${title}, ${date}, ${location}, ${durationSec}, ${notes}, ${link}, ${tags}, ${user_id}) 
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
export async function editEvent(id: string, prevState: EventFormState, formData: FormData) {
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
export async function deleteEvent(id: string) {
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
        } as EventFormState;
    }
    console.log('events deleted successfully.');

    revalidatePath('/calendar');
    redirect('/calendar');
}


/**
 * Represents the state of a form for creating/editing calendars. <br>
 * Also contains errors to convey whether all necessary fields are filled correctly
 */
export type CalendarFormState = {
    errors?: object;
    message?: string | null;
}


/**
 * Function call to create a new calendar in the database
 *
 * @param prevState the previous state to comply with `useActionState()`'s signature
 * @param formData the input object as to received by i.e. the `<CreateCalendarForm\>`
 */
export async function createCalendar(prevState: EventFormState, formData: FormData): Promise<CalendarFormState> {
    const user_id = await getCurrentUserID()

    // Validates and parses the inputs given via the form, and states the success of the parsing in the 'success' field
    const validatedFields = EditCalendar.safeParse({
        name: formData.get('name'),
        color: formData.get('color'),
        tags: formData.get('tags'),
    })
    // Alternative: EditEvent.safePArse(Object.fromEntries(formData.entries()));

    // Transmit the missing/incomplete fields up to the calling method over an object containing the errors and a message
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Calendar.',
        };
    }

    // extract fields to variables
    const { name, color, tags } = validatedFields.data;


    // Update the values in the database
    try {
        await sql`
            INSERT INTO "calendar-groups" (name, color, tags, user_id) /* id gets auto-generated */
            VALUES (${name}, ${color}, ${tags}, ${user_id}) 
        `;
    } catch (error) {
        console.error(error);
    }

    revalidatePath('/calendar');
    redirect(`/calendar`);
}


/**
 * Updates the tags of the given calendar group
 *
 * @param id The id identifying the calendar group
 * @param tags The new tags
 */
export async function updateCalendarGroup(id: string, tags: string) {
    const user_id = await getCurrentUserID()

    try {
        await sql`
            UPDATE "calendar-groups"
            SET tags = ${tags}
            WHERE id = ${id} AND user_id = ${user_id}
        `;
    } catch (error) {
        console.error(error);
    }
}


/**
 * Represents the state of a form for creating/editing events.
 *
 * Also contains errors to convey whether all necessary fields are filled correctly
 */
export type UserFormState = {
    errors?: {
        email?: string[];
        password?: string[];
        repeated_password?: string[];
    };
    message?: string | null;
}


/**
 * Creates a new user with the given parameters
 *
 * @param prevState The previous state of the form
 * @param formData The data to be used
 */
export async function createUser(prevState: UserFormState, formData: FormData): Promise<UserFormState> {
    const validatedFields = EditUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        repeat_password: formData.get('repeat_password'),
    })


    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create User.',
        };
    }


    const { name, email, password, repeat_password } = validatedFields.data

    if (password !== repeat_password) {
        return {
            errors: {repeated_password: ['Passwords don\'t match up.']},
            message: 'Passwords don\'t match up.',
        };
    }

    const password_hashed: string = await hash(password, 13)

    try {
        const users = await sql<User[]>`
            SELECT *
            FROM users
            WHERE email = ${email}
        `
        if (users.length !== 0) {
            return {
                errors: {email: ['This email already exists. Please log in or choose a different email']},
                message: 'This email already exists. Please log in or choose a different email'
            }
        }
        await sql`
            INSERT INTO "users" (name, email, password) /* id gets auto-generated */
            VALUES (${name}, ${email}, ${password_hashed})
        `
    } catch (error) {
        console.error(error)
    }


    const credentials = {
        email: email,
        password: password,
        redirect: true,
        redirectTo: '/calendar',
    }

    return await signIn('credentials', credentials)
}


/**
 * Updates settings in db
 */
export async function updateSettings(settings: Settings) {
    const user_id = await getCurrentUserID()
    const settings_json = JSON.stringify(settings)

    try {
        await sql`
            UPDATE users
            SET settings = ${settings_json}
            WHERE id = ${user_id}
        `
    } catch (e) {
        console.error(e)
        throw e
    }
}




/**
 * Authenticates the user login request
 *
 * @param prevState The previous state (unused – only to comply with function signature)
 * @param formData The form data
 */
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}