import { notFound } from "next/navigation";
import { fetchEventById } from "@/app/data";
import { EditEventForm } from "@/app/ui/forms/edit-event-form";
import { Event } from "@/app/definitions";


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const event: Event = await fetchEventById(id);


    if (!event) notFound();

    return (
        <main>
            <div className='p-2.5'>
                <EditEventForm event={event} />
            </div>
        </main>
    );
}