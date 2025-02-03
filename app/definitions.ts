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