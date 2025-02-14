import { DayView, DayViewSkeleton } from "@/app/ui/timeframes/day-view";
import { notFound } from "next/navigation";
import { WeekView, WeekViewSkeleton } from "@/app/ui/timeframes/week-view";
import { MonthViewSkeleton } from "@/app/ui/timeframes/month-view";
import { YearViewSkeleton} from "@/app/ui/timeframes/year-view";
import { Suspense } from "react";


export async function CalendarView({ view }: {view: string | undefined}) {
    if (view && view !== 'day' && view !== 'week' && view !== 'month' && view !== 'year') notFound()


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
}