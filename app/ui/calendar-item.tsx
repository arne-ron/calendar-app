'use client'


import React, {createRef, useState} from "react";
import {TagBlock, TagBlockElement} from "@/app/ui/components/tag-block";
import clsx from "clsx";
import {SaveCalendarButton} from "@/app/ui/components/save-calendar-button";
import {Calendar} from "@/app/definitions";


/**
 * The display item of one of the calendars.
 *
 * Clicking the color swatch enables the calendar, while clicking the name exposes the tag editing interface.
 */
export function CalendarItem(
    {
        calendar_group
    }: {
        calendar_group: Calendar;
    }
) {
    const [selected, setSelected] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    const initialTag = createRef<TagBlockElement>();


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
                    className={'w-4 h-4 rounded-md border-2'}
                    style={selected ? { backgroundColor: calendar_group.color, borderColor: calendar_group.color } : { borderColor: calendar_group.color }}
                    onClick={() => setSelected(!selected)}
                />
                {/* Calendar name */}
                <button
                    className={clsx('group flex flex-row items-center gap-1 grow', {'text-gray-600': !selected})}
                    onClick={(e) => {
                        e.currentTarget.focus();
                        setActive(!active);
                    }}
                >
                    {calendar_group.name}
                </button>
                {active && <SaveCalendarButton initialTag={initialTag} id={calendar_group.id}/>}
            </div>
            {/* Editing tags interface */}
            {active &&
                <TagBlock ref={initialTag} initialText='empty'/>
            }
        </div>
    )
}