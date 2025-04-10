import {CalendarView} from "@/app/ui/calendar-view";
import {TimeframeBar} from "@/app/ui/components/timeframe-bar";
import {Searchbar} from "@/app/ui/components/searchbar";
import Link from "next/link";
import {EventInfoSidebar} from "@/app/ui/event-info-sidebar";
import {GeneralInformationPage} from "@/app/ui/general-information-page";


export default async function Page(
    props: {
        searchParams?: Promise<{
            view?: string
            day?: string
            month?: string
            year?: string
        }>
    }
) {
    const searchParams = await props.searchParams
    const view = searchParams?.view
    const dateInfo = {
        day: parseInt(searchParams?.day ?? new Date(Date.now()).getDate().toString()),
        monthIndex: parseInt(searchParams?.month ?? new Date(Date.now()).getMonth().toString()),
        year: parseInt(searchParams?.year ?? new Date(Date.now()).getFullYear().toString())
    }

    return (
        <div className='flex flex-row h-full bg-gray-100'>
            <GeneralInformationPage />
            <main className='flex flex-col grow items-center'>
                <header className='flex flex-row justify-between items-center px-6 w-full'>
                    {/* Spacer */}
                    <div className='w-36'></div> {/* TODO: This might not be the optimal solution */}
                    <TimeframeBar />
                    <div className='flex flex-row gap-1'>
                        <Link href='/calendar/event/create' className='flex  bg-white rounded-full justify-center items-center w-7'>
                            <p className='text-gray-400'>+</p>
                        </Link>
                        <Searchbar />
                    </div>
                </header>
                <CalendarView view={view} dateInfo={dateInfo}/>
            </main>
            <EventInfoSidebar />
        </div>
    )
}