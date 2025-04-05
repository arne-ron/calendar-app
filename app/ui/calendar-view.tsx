import { DayViewSkeleton } from "@/app/ui/timeframes/day-view";
import { DayView } from "@/app/ui/day-view";
import { notFound } from "next/navigation";
import { WeekView, WeekViewSkeleton } from "@/app/ui/timeframes/week-view";
import { MonthViewSkeleton } from "@/app/ui/timeframes/month-view";
import { YearViewSkeleton} from "@/app/ui/timeframes/year-view";
import { Suspense } from "react";
import { fetchEvents } from "@/app/data";
import { Event } from "@/app/definitions";


/**
 * This component returns the right timeframe view based pn the selected timeframe (day/week/month/year)
 *
 * @param view What view should be shown.
 */
export async function CalendarView({ view }: {view: string | undefined}) {
    if (view && !['day', 'week', 'month', 'year'].includes(view)) notFound()

    const events: Event[] = await fetchEvents();

    return (
      <div className='flex h-full w-full'>
          {view === 'day' &&
              <Suspense fallback={<DayViewSkeleton/>}>
                  <DayView title={"Tues"} events={[]}/>
              </Suspense>
          }
          {(view === 'week' || !view) &&
              <Suspense fallback={<WeekViewSkeleton />} >
                  <WeekView events={events}/> {/*TODO put in wrapper  to have async loading work with Suspense*/}
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