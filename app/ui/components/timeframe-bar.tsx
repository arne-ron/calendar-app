'use client'


import clsx from 'clsx';
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";


export function TimeframeBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const view = useSearchParams().get('view');


    function createPageURL(view: string) {
        const params = new URLSearchParams(searchParams);
        params.set('view', view);
        return `${pathname}?${params.toString()}`;
    }


    return (
        <div className='flex flex-row gap-1 w-fit rounded-lg bg-gray-200 p-1 m-1'>
            {['day', 'week', 'month', 'year'].map((timeframe) =>
                 <Link key={timeframe}
                     // disabled={timeframe == view}
                     className={clsx(
                         'px-1 rounded-md',
                         {
                             'bg-white': view === timeframe || (!view && timeframe === 'week'),
                             'hover:bg-gray-100': !(view === timeframe || (!view && timeframe === 'week')),
                         }
                     )}
                     href={createPageURL(timeframe)}
                 >
                    {timeframe}
                </Link>
            )}
        </div>
    )
}