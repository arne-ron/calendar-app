import { DayViewSkeleton } from "@/app/ui/timeframes/day-view";
import { DayView } from "@/app/ui/timeframes/day-view";
import {notFound} from "next/navigation";
import { WeekView, WeekViewSkeleton } from "@/app/ui/timeframes/week-view";
import {MonthView, MonthViewSkeleton} from "@/app/ui/timeframes/month-view";
import {YearView, YearViewSkeleton} from "@/app/ui/timeframes/year-view";
import { Suspense } from "react";


/**
 * This component returns the right timeframe view based pn the selected timeframe (day/week/month/year)
 *
 * @param view What view should be shown.
 * @param dateInfo Information about what date(s) should be shown
 */
export async function CalendarView({ view, dateInfo }: {view: string | undefined, dateInfo: {day: number, monthIndex: number, year: number } }) {
    if (view && !['day', 'week', 'month', 'year'].includes(view)) notFound()



    return (
      <div className='flex h-full w-full'>
          {view === 'day' &&
              <Suspense fallback={<DayViewSkeleton/>}>
                  <DayView dateInfo={dateInfo}/>
              </Suspense>
          }
          {(view === 'week' || !view) &&
              <Suspense fallback={<WeekViewSkeleton />} >
                  <WeekView dateInfo={dateInfo}/> {/*TODO put in wrapper  to have async loading work with Suspense*/}
              </Suspense>
          }
          {view === 'month' &&
              <Suspense fallback={<MonthViewSkeleton />} >
                  <MonthView dateInfo={dateInfo}/>
              </Suspense>
          }
          {view === 'year' &&
              <Suspense fallback={<YearViewSkeleton />} >
                  <YearView dateInfo={dateInfo}/>
              </Suspense>
          }

      </div>
    );
}