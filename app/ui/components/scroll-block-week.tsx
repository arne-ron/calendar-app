'use client'
import {EventStack} from "@/app/ui/event-stack";
import {TimeLines} from "@/app/ui/components/time-lines";
import {useEffect, useRef, useState} from "react";
import {clamp} from "@/app/utils";
import {Event} from "@/app/definitions";


export function ScrollBlockWeek(
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
                setScale((old) => {return clamp(old - e.deltaY * zoomSpeed, maxZoom, minZoom)});
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
        <div ref={ref} className='overflow-y-scroll no-scrollbar'> {/* Scroll and clip container */}
            <div className={`w-full  ${!ready ? 'overflow-hidden invisible' : ' '}`} style={{height: `${height * scale}px`}}> {/* Scrolling base canvas and */}
                <div className='relative h-full flex flex-row gap-0.5 z-[1]'> {/* H-Stack Multiple days, positioning base*/}
                    <div className='h-2 w-9 shrink-0'></div> {/* Spacer for time numbers */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
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