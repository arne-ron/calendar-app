"use server"
import {cookies} from "next/headers";
import {auth} from "@/auth";
import googleClient from "@/app/utils/google-auth";
import {redirect} from "next/navigation";
import {getCurrentUser} from "@/app/data";

export async function getToken() {
    // 1. check cookies for valid access token
    const access_token = (await cookies()).get("google_accecc_token")
    if (access_token) {
        return access_token.value;
    }

    // TODO encrypt refresh token

    // 2. check for refresh token
    const user = (await auth())?.user
    if (user) {
        // get refresh token
        const {refresh_token} = (await getCurrentUser()).google_data

        if (refresh_token) {
            // get new access token
            googleClient.setCredentials({refresh_token})
            const token = await googleClient.getAccessToken()
        }
    }


    // 3. prompt new sign-in with Google

}


export async function requestCalendarPermissionFromGoogle() {
    const SCOPE = ["https://www.googleapis.com/auth/calendar"]

    const authorizationURL = googleClient.generateAuthUrl({
        access_type: "offline",
        // prompt: 'consent', // Force refresh token on every login
        scope: SCOPE,
    })

    redirect(authorizationURL)
}
