'use client'
import React, { useState } from "react";
import { TagBlock, data } from "@/app/ui/components/tag-block";
import clsx from "clsx";
import { Calendar } from "@/app/definitions";
import { updateCalendarGroup } from "@/app/actions";


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


    // Describes how data should look like for a calendar with no tags
    const emptyData: data[] = [{ text: 'empty', color: '', arr: [] }]
    let initialData: data[] = JSON.parse(calendar_group.tags)
    if (initialData.length === 0) initialData = emptyData

    const [data, setData] = useState<data[]>(initialData)


    // Save on changes
    React.useEffect(() => {
        async function saveData() {
            console.log('saving data');
            let json = JSON.stringify(data)
            if (json === JSON.stringify(emptyData)) json = '[]'
            await updateCalendarGroup(calendar_group.id, json)
        }
        saveData()
    }, [data, emptyData]
    )


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
            </div>
            {/* Editing tags interface */}
            <div hidden={!active}>
                <TagBlock position={[0]} data={data} setData={setData}/>
            </div>
        </div>
    )
}

