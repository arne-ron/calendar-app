import { RefObject} from "react";
import {TagBlockElement} from "@/app/ui/components/tag-block";
import {updateCalendarGroup} from "@/app/actions";


export function SaveCalendarButton(
    { initialTag, id, }: { initialTag: RefObject<TagBlockElement | null>, id: string }
) {

    async function saveToDB() {
        if (!initialTag?.current) return

        const curr: TagBlockElement = initialTag?.current
        const obj = {
            text: curr.getText(),
            color: curr.props.color,
            tags: curr.getTags()
        }
        const json = JSON.stringify(obj)
        await updateCalendarGroup(id, json)
    }



    return (
        <button
            className='text-blue-600 text-xs rounded-full bg-gray-200 px-1 mr-2 outline active:text-blue-700 active:bg-gray-300'
            onClick={saveToDB}
        >
            Save
        </button>
    )
}