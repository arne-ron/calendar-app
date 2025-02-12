import {DayView, DayViewSkeleton } from "@/app/ui/timeframes/day-view";
import { notFound } from "next/navigation";
import { WeekView, WeekViewSkeleton } from "@/app/ui/timeframes/week-view";
import { MonthViewSkeleton } from "@/app/ui/timeframes/month-view";
import { YearViewSkeleton} from "@/app/ui/timeframes/year-view";
import { Suspense } from "react";


export function CalendarView({ view }: {view: string | undefined}) {
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
            return (
                <Suspense fallback={<MonthViewSkeleton />} >
                    <MonthViewSkeleton />
                </Suspense>
            )
        case 'year':
            return (
                <Suspense fallback={<YearViewSkeleton />} >
                    <YearViewSkeleton />
                </Suspense>
            )
    }

    notFound()
}