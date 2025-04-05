import { RefObject} from "react";
import {TagBlockElement} from "@/app/ui/components/tag-block";


export function SaveCalendarButton(
    {initialTag}: {initialTag: RefObject<TagBlockElement | null>}
) {

    function textify() {
        console.log("textify started")
        console.log("initialTag?.current: ", initialTag?.current)
    }



    return (
        <button
            className='text-blue-600 text-xs rounded-full bg-gray-200 px-1 mr-2 outline active:text-blue-700 active:bg-gray-300'
            onClick={textify}
        >
            Save
        </button>
    )
}