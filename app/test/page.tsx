import oauth2Client from "@/app/utils/google-auth";
import Link from "next/link";


/**
 * Exposes an url for WIP and testing purposes
 *
 * @constructor
 */
export default async function Page() {

    const SCOPE = ["https://www.googleapis.com/auth/calendar"]

    const authorizationURL = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPE
    })


    return (
        <div className='flex items-center justify-center h-full'>
            <Link href={authorizationURL}>
                <button>Login to Google</button>
            </Link>
        </div>
    )
}


