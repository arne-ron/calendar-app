import { Event } from '@/app/definitions'
import { EventBlock } from "@/app/ui/components/event-block";
import {getTimeInMillis, parseDurationFromString} from "@/app/utils";


/**
 * Shows the given events in a stack with every event at a y-position and height dictated by its time and duration
 *
 * @param events The events to be displayed on that day
 * @param scale How zoomed in the calendar is
 */
export function EventStack({events, scale}: {events: Event[], scale: number}) {
    const SIZE_CORRECTION_FACTOR = 1.65;

    events = events.sort((a,b) => a.date.valueOf() - b.date.valueOf())

    const indents: number[] = Array(events.length).fill(0);
    const reduced_events: boolean[] = Array(events.length).fill(false);
    const times: number[] = Array(events.length).fill(0);

    // Find previous events that are overlapping the current event and calculate indent and reduced based of that
    // This is done for every event and `indents`, `reduced_events`, and `times` are populated
    events.forEach((event1: Event, i: number) => {
        times[i] = getTimeInMillis(event1.date) / (24 * 60 * 60 * 1000)
        events.filter((e) => e != event1).forEach((event2: Event) => {

            const ev_1_start = event1.date.valueOf();
            const ev_1_end = ev_1_start + parseDurationFromString(event1.duration);
            const ev_2_start = event2.date.valueOf();
            const ev_2_end = ev_2_start + parseDurationFromString(event2.duration);
            if (ev_2_start < ev_1_start
                && ev_2_end > ev_1_start) {
                indents[i]++
                reduced_events[i] = true
            } else if (ev_2_start < ev_1_end
                        && ev_2_end > ev_1_end) {
                reduced_events[i] = true
            }
        })
    })

    return (
        <div className={"flex flex-col items-start gap-1 h-full w-full relative"}>
            {events.map((event: Event, i: number) => {
                return (
                        <div // Div that handles y-positioning
                            key={event.id}
                            className='absolute w-full'
                            style={{top: `${times[i] * 100}%`, left: 0}}
                        >
                            <EventBlock
                                event={event}
                                offset={indents[i] * 20}
                                reduced={reduced_events[i]}
                                height={parseDurationFromString(event.duration) / 60000 * scale * SIZE_CORRECTION_FACTOR}
                            />
                        </div>
                    );
                }
            )}
        </div>
    )
}