import React, {useRef} from "react";
import {data} from "@/app/ui/components/tag-block";
import {Popup} from "@/app/ui/components/popup";
import {HexColorPicker} from "react-colorful";


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
            <div className='flex relative'>
                <button // Color swatch
                    className={`h-3 w-3 rounded-full ml-1 shrink-0`}
                    style={{backgroundColor: element.color}}
                    onClick={() => {popup.current?.show()}}
                />
                <Popup className='top-5 -left-1' ref={popup} backdrop={true} simple={false} style={{zIndex: 3}}>
                    <HexColorPicker
                        color={element.color}
                        onChange={changeColor}
                        style={{width: '150px', height: '150px'}}
                    />
                </Popup>
            </div>
            <button // Text display
                className='overflow-x-auto no-scrollbar'
                onClick={removeSelf}
            >
                {element.text}
            </button>
        </div>
    )
}