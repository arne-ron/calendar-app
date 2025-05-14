import {Metadata} from "next";
import {LoginForm} from "@/app/ui/forms/login-form";
import {GoogleLogin} from "@/app/ui/components/google-login";
import {VLine} from "@/app/ui/components/v-line";


export const metadata: Metadata = {
    title: 'Login',
};


/**
 * Exposes an interface for the user to login.
 * After a successful login the user should be redirected to the previous page or the calendar homepage
 */
export default function Page() {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='flex flex-col gap-1 items-center'>
                <p className='text-xl font-bold mb-2'>Sign In</p>
                <LoginForm />
                <p className=''>You need to log in to continue</p>
                <VLine />
                <p>or</p>
                <GoogleLogin />
            </div>
        </div>
    )
}