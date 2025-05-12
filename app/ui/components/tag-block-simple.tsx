'use client'
import React, {useRef} from "react";
import {data} from "@/app/ui/components/tag-block";
import {Popup} from "@/app/ui/components/popup";
import {HexColorPicker} from "react-colorful";


/**
 * A helper component used to create a simple-type tag. Displays a color swatch and the text.
 *
 * If the text exceeds the boundary, ig can be scrolled without a scrollbar.
 *
 * Clicking on the color opens a popup to change the color
 *
 * @param element the tag to be displayed
 * @param removeSelf the function to be called when the text is clicked to remove the curreent tag
 * @param changeColor the function to change the color in the tag data structure
 */
export function TagBlockSimple(
    {
        element,
        removeSelf,
        changeColor,
    }: {
        element: data,
        removeSelf: () => void,
        changeColor: (color: string) => void,
    }
) {
    const popup = useRef<HTMLDialogElement>(null);



    return (
        <div
            className='flex flex-row gap-1 items-center mr-1 w-full'
        >
            {/* Color swatch */}
            <div className='flex relative'>
                <button
                    className={`h-3 w-3 rounded-full ml-1 shrink-0`}
                    style={{backgroundColor: element.color}}
                    onClick={() => {popup.current?.show()}}
                />
                <Popup className='top-5 -left-1' ref={popup} backdrop={true} simple={false} style={{zIndex: 2}}>
                    <HexColorPicker
                        color={element.color}
                        onChange={changeColor}
                        style={{width: '150px', height: '150px'}}
                    />
                </Popup>
            </div>

            {/* Text display */}
            <button
                className='overflow-x-auto no-scrollbar'
                onClick={removeSelf}
            >{element.text}</button>
        </div>
    )
}