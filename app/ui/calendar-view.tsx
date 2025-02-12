import {DayView, DayViewSkeleton} from "@/app/ui/timeframes/day-view";
import { notFound } from "next/navigation";
import {WeekView, WeekViewSkeleton} from "@/app/ui/timeframes/week-view";
import { MonthView } from "@/app/ui/timeframes/month-view";
import { YearView } from "@/app/ui/timeframes/year-view";
import {Suspense} from "react";


export function CalendarView({ view }: {view: string | undefined; query: string}) {
    switch (view) {
        case 'day':
            return (
                <Suspense fallback={<DayViewSkeleton/>}>
                    <DayView />
                </Suspense>
            )
        case undefined:
        case 'week':
            return (
                <Suspense fallback={<WeekViewSkeleton />} >
                    <WeekView />
                </Suspense>
            )
        case 'month':
            return (<MonthView />)
        case 'year':
            return (<YearView />)
    }

    notFound()
}