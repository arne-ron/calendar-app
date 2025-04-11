'use client'
import React, {createRef, ReactElement, useState} from "react";
import {TagBlock, TagBlockElement, TagBlockProps} from "@/app/ui/components/tag-block";
import clsx from "clsx";
import {Calendar} from "@/app/definitions";
import {updateCalendarGroup} from "@/app/actions";


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
    const initial_tag_obj = JSON.parse(calendar_group.tags)


    // TODO only works for up to one level of getting nested
    async function saveToDB() {
        console.log('Update fn called')
        if (!initialTag?.current) return


        const curr: TagBlockElement = initialTag?.current
        const obj = {
            text: curr.getText(),
            color: curr.props.color,
            tags: curr.getTags()
        }

        const json = JSON.stringify(obj)
        console.log(json)
        await updateCalendarGroup(calendar_group.id, json)
    }



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
            <TagBlock
                hidden={!active}
                ref={initialTag}
                initialText={initial_tag_obj.text}
                color={initial_tag_obj.color}
                initialTags={initial_tag_obj.tags}
                onUpdate={saveToDB}
            />
        </div>
    )
}


const a =
{
    "text": "and",
    "color": "",
    "tags": [
        {
            "text": "and",
            "color": "",
            "tags": []
        },
        {
            "text": "and",
            "color": "",
            "tags": [
                {
                    "text": "and",
                    "color": "",
                    "tags": [
                        {
                            "text": "and",
                            "color": "",
                            "tags": [
                                {
                                    "text": "and",
                                    "color": "",
                                    "tags": [
                                        {
                                            "text": "test",
                                            "color": "",
                                            "tags": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

