import { Event } from "@/app/definitions";
import Link from "next/link";
import React from "react";
import clsx, {ClassValue} from "clsx";


/**
 * Displays the given event as a block.
 * Clicking the block opens the events editing page.
 *
 * The tags get shown in the header if `height > 20`
 *
 * @param event The event to display
 * @param reduced Disables additional information on the event
 * @param height The height this block should be
 * @param offset The offset this has to the left
 * @param className Additional tailwind-css parameters that get applied to the outermost `<div>`
 */
export function EventBlock(
    {
        event,
        reduced = false,
        height = 80,
        offset = 0,
        className,
    }: {
        event: Event,
        reduced?: boolean
        height?: number,
        offset?: number,
        className?: ClassValue,
    }
)  {
    const colors = ['#aaa0a0', '#a5ffa5', '#bbdb3b'] // TODO Gather colors from tags


    return (
        <Link
            className={clsx(className, 'w-full flex flex-col bg-red-100 rounded text-black')}
            style={{height, width: `calc(100% - ${offset}px)`, marginLeft: offset}}
            href={`/calendar/event/${event.id}/edit`}
        >
            {height > 20 && // Header with tags
                <div className={`rounded-t p-1 flex flex-row gap-0.5 bg-red-500/20 overflow-x-auto overflow-y-hidden no-scrollbar`}> {/* H-Stack */}
                    {colors.map((col, i) =>
                        <div // Color swatch
                            key={i}
                            className={'h-2 rounded-sm flex grow min-w-2 max-w-5'}
                            style={{backgroundColor: col}}
                        />
                    )}
                </div>
            }
            <div className='overflow-x-hidden overflow-y-auto h-full rounded-b-lg p-1 pt-0 no-scrollbar'> {/* Scrollable H-stack for Content */}
                <p className='text-sm truncate'>{event.title}</p>
                {!reduced && event.location ? <p className='text-xs truncate'>{event.location}</p> : null}
                {!reduced && event.date ?
                    <p className='text-xs truncate'>{new Date(event.date).toLocaleString('en-GB', {
                        hour: 'numeric',
                        minute: 'numeric',
                    })}</p> : null}
            </div>
        </Link>
    );
}