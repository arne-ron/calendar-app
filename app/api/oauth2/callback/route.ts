import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import googleClient from "@/app/utils/google-auth";
import {auth} from "@/auth";
import {storeRefreshToken} from "@/app/actions";


// TODO i think this is unused
export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = searchParams.get('scope')

    if (error) {
        return NextResponse.json({error: 'Google OAuth Error: ' + error})
    }

    if (!code) {
        return NextResponse.json({error: 'Authorization code not found'})
    }

    try {
        const {tokens} = await googleClient.getToken(code);
        const user = await auth()
        console.log("tokesn")
        console.log(tokens)
        console.log(user)

        if (tokens.refresh_token && user?.user?.email)
            await storeRefreshToken(tokens.refresh_token, user?.user?.email);

        (await cookies()).set({
            name: 'google_access_token',
            value: tokens.access_token || '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

        return NextResponse.redirect(new URL('/test', req.url))
    } catch (error) {
        return NextResponse.json({error: 'Google OAuth failed to exchange code: ' + error})
    }
}