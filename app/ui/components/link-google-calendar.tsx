// 'use client'
// import {redirect} from "next/navigation";
// import oauth2Client from "@/app/utils/google-auth";
// import {isSignedInWithGoogle} from "@/app/actions";

export function LinkGoogleCalendar() {

    // const SCOPE = ["https://www.googleapis.com/auth/calendar"]
    // const authorizationURL = oauth2Client.generateAuthUrl({
    //     access_type: "offline",
    //     // prompt: 'consent', // Force refresh token on every login
    //     scope: SCOPE,
    // })



    function onClick() {
        console.log("Link calendar clicked")
        // if (await isSignedInWithGoogle()) {
            console.log("is signed in")
            // redirect("/link")
        // } else {
            console.log("not singes in, prompting")
            // redirect(authorizationURL)
        // }
    }

    return (<button>
        Link Google calendar
    </button>)
}