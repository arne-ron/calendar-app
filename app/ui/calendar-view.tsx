import { DayView, DayViewSkeleton } from "@/app/ui/timeframes/day-view";
import { notFound } from "next/navigation";
import { WeekView, WeekViewSkeleton } from "@/app/ui/timeframes/week-view";
import { MonthViewSkeleton } from "@/app/ui/timeframes/month-view";
import { YearViewSkeleton} from "@/app/ui/timeframes/year-view";
import { Suspense } from "react";


export async function CalendarView({ view }: {view: string | undefined}) {

    return (
      <div className='flex h-full w-full'>
          {view === 'day' &&
              <Suspense fallback={<DayViewSkeleton/>}>
                  <DayView />
              </Suspense>
          }
          {(view === 'week' || !view) &&
              <Suspense fallback={<WeekViewSkeleton />} >
                  <WeekView />
              </Suspense>
          }
          {view === 'month' &&
              <Suspense fallback={<MonthViewSkeleton />} >
                  <MonthViewSkeleton />
              </Suspense>
          }
          {view === 'year' &&
              <Suspense fallback={<YearViewSkeleton />} >
                  <YearViewSkeleton />
              </Suspense>
          }

      </div>
    );

    // The old code
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