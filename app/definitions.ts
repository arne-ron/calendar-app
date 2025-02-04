// The definition of an event object (can this be replaced with the zod thing?)
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