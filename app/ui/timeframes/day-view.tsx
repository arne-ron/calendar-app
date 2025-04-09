'use client'
import { TimeLines } from "@/app/ui/components/time-lines";
import { EventStack } from "@/app/ui/event-stack";
import { useEffect, useRef, useState } from "react";
import { Event } from "@/app/definitions";
import {clamp} from "@/app/utils";


/**
 * Displays all events in the given day
 *
 * @param events The events of the day to be displayed
 */
export function DayView({ events }: { events: Event[] }) {
    const [scale, setScale] = useState<number>(1.5); // Determines how much of the day gets shown
    const [ready, setReady] = useState<boolean>(false); // Gets flagged once the content has been scrolled into view to toggle visibility

    // Ref to topmost div to attach listeners to
    const ref = useRef<HTMLDivElement>(null);

    const zoomSpeed: number = 0.006
    const initialPos: number = 1500 - 1;


    // Override zoom behaviour to zoom into timeline
    useEffect(() => {
            const node = ref.current;

            const handleZoom = (e: WheelEvent) => {
                if (!e.ctrlKey) return;
                e.preventDefault();
                setScale((old) => {return clamp(old - e.deltaY * zoomSpeed, 0.34, 2.5)});
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
        <div className='flex flex-col w-full p-3'> {/* H-Stack */}
            <div className='h-2 w-9 shrink-0'></div> {/* Spacer for time numbers */}
            {['Mon'].map((day, i) =>
                <div key={day} className='flex flex-col items-center w-full'> {/* H-Stack Individual days */}
                    <p>{day}</p>
                    <p>{i}</p>
                </div>
            )}

            <div ref={ref} className='overflow-y-scroll no-scrollbar'> {/* Scroll and clip container */}
                <div className={`w-full  ${!ready ? 'overflow-hidden invisible' : ' '}`} style={{height: `${2400 * scale}px`}}> {/* Scrolling base canvas and */}
                    <div className='relative h-full flex flex-row gap-0.5 z-[1]'> {/* H-Stack Multiple days, positioning base*/}
                        <div className='h-2 w-9 shrink-0'></div> {/* Spacer for time numbers */}
                        {['Mon'].map((day) =>
                            <EventStack key={day} scale={scale} events={events}/>
                        )}
                    </div>
                    <div className='-translate-y-[100%] h-full'>
                        <TimeLines/>
                    </div>
                </div>
            </div>
        </div>
    )

}


export function DayViewSkeleton() {
    const arr = []
    for (let i = 0; i < 9; i++) {
        arr.push(i)
    }

    return (
        <div className='flex flex-col w-full h-full p-4 gap-1'>
            {arr.map((index) =>
                <div key={index} className='bg-gray-200 rounded-2xl h-20'></div>
            )}
        </div>
    )
}