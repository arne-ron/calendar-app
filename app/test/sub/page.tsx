import {auth} from "@/auth";
import ConnectCalendar from "@/app/ui/components/ConnectCalendar";
import Link from "next/link";


export default async function Page() {
    const session = await auth()
    return (
        <div className={"w-full h-full flex-col content-center"}>
            <ConnectCalendar />
            <p>{JSON.stringify(session, null, " ")}</p>
            <Link href={"/test"}>Back</Link>
        </div>
    )
}