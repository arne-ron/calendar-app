'use client'


import { useRef } from "react";
import { Popup } from "@/app/ui/components/popup";


/**
 * Exposes an url for WIP and testing purposes
 *
 * @constructor
 */
export default function Page() {
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <div>
            <button onClick={() => ref.current?.show()}>
                Show Pop-Up
            </button>
            <Popup ref={ref} className='p-1'>
                <p>Heyy</p>
                <p>This is a test popup</p>
            </Popup>
            <p>
                Just some sample text
            </p>
        </div>
    )
}