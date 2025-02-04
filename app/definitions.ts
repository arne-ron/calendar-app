// The definition of an event object (can this be replaced with the zod thing?)
import { z } from "zod";

export type Event = {
    id: number;
    title: string;
    date: number;
    location?: string;
    duration?: bigint;
    notes?: string;
    link?: string;
    tags: string[];
}

// The Schema describing an event object
export const EventSchema = z.object({
    id: z.number(),
    title: z.string().trim().nonempty({
        message: "Title is required",
    }),
    date: z.coerce.date({
        required_error: "Date is required",
        invalid_type_error: "Date must be a of format ...", //  TODO insert right date formating
    }), // use 'z.string().datetime()' (ISO 8601) od 'z.string.date()' as a possible alternative
    location: z.string().nonempty().nullable().catch(null),
    duration: z.coerce.number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
    }).gt(0, { message: "Duration must be greater than 0" }), // use 'z.string.duration()' (ISO 8601) as a possible alternative
    notes: z.string().nonempty().nullable().catch(null),
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
})

// A dependent schema of EventSchema that omits the id
export const EditEvent = EventSchema.omit({ id: true})