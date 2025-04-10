// TODO look at automatically getting these from an ORM

import { z } from "zod";


/** Describes an event as mirrored in the database */
export type Event = {
    id: string;
    title: string;
    date: Date;
    location?: string;
    duration: string;
    notes?: string;
    link?: string;
    tags: string[];
}


/** The Schema describing an event object */
export const EventSchema = z.object({
    id: z.string().uuid().nonempty(),
    title: z.string().trim().nonempty({
        message: "Title is required",
    }),
    date: z.coerce.date({
        required_error: "Date is required",
        invalid_type_error: "Date must be a of format ...", //  TODO check that all those messages get displayed correctly
    }), // use 'z.string().datetime()' (ISO 8601) od 'z.string.date()' as a possible alternative
    location: z.string().nullable(),
    duration: z.coerce.number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
    }).gt(0, { message: "Duration must be greater than 0" }), // use 'z.string.duration()' (ISO 8601) as a possible alternative
    notes: z.string().nullable(),
    link: z
        .string()
        .trim()
        .transform((val) => {
            if (val === '') return null;
            if (!val.startsWith('http') && val.match(/.*?\w\.\w+.*/)) { // Account for links like "pokémon.com"
                return `https://${val}`;
            } else {
                return val;
            }
        })
        .nullable()
        .refine((val) => {
            return (
                val === null ||
                z.string().url().safeParse(val).success)}, {message: "Invalid URL"}
            ),
    tags: z.string()
        .nonempty()
        .transform((string) => string.split(','))
        .pipe(z.array(z.string()))
        .catch([])
        ,

        // TODO: empty string get parsed into [''] instead of []
    user_id: z.string().nonempty({message: 'There needs to be (at least one) user associated to this event'}),
})


/** A dependent schema of EventSchema that omits the id */
export const EditEvent = EventSchema.omit({ id: true, user_id: true })


/** Describes a calendar entry as mirrored in the database (without the user) */ // TODO look at uuids here
export type Calendar = {
    id: number;
    name: string;
    color: string;
    tags: string;
}


/** The Schema describing a calendar object */
export const CalendarSchema = z.object({
    id: z.number(),
    name: z.string().nonempty({
        message: "Name is required",
    }),
    color: z.string().default('#3dee3d'),
    tags: z.string()
        .nonempty()
        .transform((string) => string.split(','))
        .pipe(z.array(z.string()))
        .catch([])
    ,

    // TODO: empty string get parsed into [''] instead of []
    user_id: z.string().nonempty({message: 'There needs to be (at least one) user associated to this calendar'}),
})


/** A dependent schema of CalendarSchema that omits the id */
export const EditCalendar = CalendarSchema.omit({ id: true, user_id: true })


/** Describes a user as mirrored in the database */
export type User = {
    id: string,
    name: string;
    email: string;
    password: string;
}


/** The Schema describing a user */
export const UserSchema = z.object({
    id: z.string().uuid().nonempty(),
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
})


/** A dependent schema of UserSchema that omits id and password */
export const EditUser = UserSchema.omit({id: true}).extend({repeat_password: z.string().min(6).nonempty()})