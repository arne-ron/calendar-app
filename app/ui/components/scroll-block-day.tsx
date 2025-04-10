'use client'
import { useEffect, useRef, useState } from "react";
import { clamp } from "@/app/utils";
import { EventStack } from "@/app/ui/event-stack";
import { TimeLines } from "@/app/ui/components/time-lines";
import { Event } from "@/app/definitions";


/**
 * Creates a seamlessly scrolling component for the day view with no visible scrollbar where one can zoom in and out with cmd scroll or the trackpad
 *
 * @param events The events to be dislpayed
 * @param height The height of the scrollable content
 * @param initialPos The position in pixel where the element should be scrolled to immedeatly
 * @param zoomSpeed How quickly the user can zom in and out
 * @param minZoom The minimum amount the user needs to see
 * @param maxZoom The maximum amount the user can see at once
 * @constructor
 */
export function ScrollBlockDay(
    {
        events,
        height,
        initialPos,
        zoomSpeed = 0.06,
        minZoom = 2.5,
        maxZoom = 0.34,
    }: {
        events: Event[]
        height: number,
        initialPos: number,
        zoomSpeed?: number,
        minZoom?: number,
        maxZoom?: number,
    }
) {
    const [scale, setScale] = useState<number>(1.5); // Determines how much of the day gets shown
    const [ready, setReady] = useState<boolean>(false); // Gets flagged once the content has been scrolled into view to toggle visibility

    // Ref to topmost div to attach listeners to
    const ref = useRef<HTMLDivElement>(null);


    // Override zoom behaviour to zoom into timeline
    useEffect(() => {
            const node = ref.current;

            const handleZoom = (e: WheelEvent) => {
                if (!e.ctrlKey) return;
                e.preventDefault();
                setScale((old: number) => {return clamp(old - e.deltaY * zoomSpeed, maxZoom, minZoom)});
            }

            node?.addEventListener('wheel', handleZoom, {passive: false})
            if (ref.current) {
                ref.current.scrollTop = initialPos;
                setReady(true);
            }
            return () => node?.removeEventListener('wheel', handleZoom);
        }, []
    )



    return (
        <div ref={ref} className={'overflow-y-scroll no-scrollbar'}> {/* Scroll and clip container */}
            <div className={`w-full  ${!ready ? 'overflow-hidden invisible' : ' '}`} style={{height: `${height * scale}px`}}> {/* Scrolling base canvas and */}
                <div
                    className='relative h-full flex flex-row gap-0.5 z-[1]'> {/* H-Stack Multiple days, positioning base*/}
                    <div className='h-2 w-9 shrink-0'></div>
                    {/* Spacer for time numbers */}
                    {['Mon'].map((day) =>
                        <EventStack key={day} scale={scale} events={events}/>
                    )}
                </div>
                <div className='-translate-y-[100%] h-full'>
                    <TimeLines/>
                </div>
            </div>
        </div>
    )
}