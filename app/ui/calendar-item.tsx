'use client'


import {useState} from "react";
import {TagBlock} from "@/app/ui/components/tag-block";
import clsx from "clsx";


/**
 * The display item of one of the calendars.
 *
 * Clicking the color swatch enables the calendar, while clicking the name exposes the tag editing interface.
 */
export function CalendarItem(
    {
        name = 'New Calendar',
        color = '#22bb22'
    }: {
        name?: string;
        color?: string;
    }
) {
    const [selected, setSelected] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    return (
        <div
            className={clsx(
                'flex flex-col px-2 py-1 rounded-2xl w-full',
                {'bg-gray-300/60': active},
            )}
        >
            {/* H-Stack */}
            <div className='flex items-center gap-1'>
                {/* Colored selection rectangle */}
                <button
                    className={clsx(
                        'w-4 h-4 rounded-md border-2',
                        {'bg-transparent border-gray-400': !selected},
                        {'bg-[color] border-blue-400': selected},
                    )}
                    style={selected ? { backgroundColor: color, borderColor: color } : { borderColor: color }}
                    onClick={() => setSelected(!selected)}
                />
                {/* Calendar name */}
                <button
                    className={clsx('group flex flex-row items-center gap-1', {'text-gray-600': !selected})}
                    onClick={(e) => {
                        e.currentTarget.focus();
                        setActive(!active);
                    }}
                >
                    {name}
                </button>
            </div>
            {/* Editing tags interface */}
            {active &&
                <TagBlock initial_text='empty' />
            }
        </div>
    )
}