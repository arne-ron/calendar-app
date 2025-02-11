import { DayView } from "@/app/ui/timeframes/day-view";
import { notFound } from "next/navigation";
import { WeekView } from "@/app/ui/timeframes/week-view";
import { MonthView } from "@/app/ui/timeframes/month-view";
import { YearView } from "@/app/ui/timeframes/year-view";


export function CalendarView({ view, query }: {view: string | undefined; query: string}) {
    switch (view) {
        case 'day':
            return (<DayView query={query}/>)
        case undefined:

        case 'week':
            return (<WeekView />)
        case 'month':
            return (<MonthView />)
        case 'year':
            return (<YearView />)
    }

    notFound()
}