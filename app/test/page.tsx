import {Metadata} from "next";
import {LoginForm} from "@/app/ui/forms/login-form";
import {GoogleLogin} from "@/app/ui/components/google-login";
import {VLine} from "@/app/ui/components/v-line";
import {Suspense} from "react";
import {auth, signOut} from "@/auth";
import {LogoutButton} from "@/app/ui/components/logout-button";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Login',
};


/**
 * Exposes an interface for the user to login.
 * After a successful login the user should be redirected to the previous page or the calendar homepage
 */
export default async function Page() {
    const session = await auth()

    if (session?.user) {
        return (
            <div className={"w-full h-full flex-col justify-items-center content-center"}>
                <p>Signed in as {session.user.name}</p>
                <LogoutButton />
                <div>
                    <Link href={"/test/sub"} className={""}>Next</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='flex flex-col gap-1 items-center'>
                <p className='text-xl font-bold mb-2'>Sign In</p>
                <Suspense>
                    <LoginForm redirectTo={"/test"}/>
                </Suspense>
                <p className=''>You need to log in to continue</p>
                <VLine />
                <p>or</p>
                <GoogleLogin redirectTo={"/test"} />
            </div>
        </div>
    )
}