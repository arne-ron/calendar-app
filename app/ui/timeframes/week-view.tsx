"use client"
import { TimeLines } from "@/app/ui/components/time-lines";
import { EventStack } from "@/app/ui/event-stack";
import { useEffect, useRef, useState } from "react";
import { Event } from "@/app/definitions";
import {clamp, range} from "@/app/utils";


/**
 * Displays all events in the given week
 *
 * @param events The events of the week to be displayed
 */
export function WeekView({events}: {events: Event[]}) {
    // const today = 5 // TODO make today dynamic
    // TODO If I set the page zoom to more than 100% I can zoom out further than 24h

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
            <div className='flex flex-row w-full py-2'> {/* V-Stack Days */}
                <div className='h-2 w-9 shrink-0'></div> {/* Spacer for time numbers */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) =>
                    <div key={day} className='flex flex-col items-center w-full'> {/* H-Stack Individual days */}
                        <p>{day}</p>
                        <p>{i}</p>
                    </div>
                )}
            </div>

            <div ref={ref} className='overflow-y-scroll no-scrollbar'> {/* Scroll and clip container */}
                <div className={`w-full  ${!ready ? 'overflow-hidden invisible' : ' '}`} style={{height: `${2400 * scale}px`}}> {/* Scrolling base canvas and */}
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
        </div>
    )
}


export function WeekViewSkeleton() {
    const arr: number[] = range(4)


    return (
        <div className='flex flex-row gap-1 w-full p-3'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) =>
                <div key={day} className='group flex flex-col w-full gap-1 items-center'>
                    <p>{day}</p>
                    <p className='px-2 group-[:nth-of-type(3)]:bg-red-500 rounded-full group-[:nth-of-type(3)]:text-white '>{index}</p>
                    {arr.map((index) =>
                        <div key={index} className='bg-gray-300 group-even:bg-gray-200 rounded h-20 w-full'></div>
                    )}
                </div>
            )}
        </div>
    )
}
