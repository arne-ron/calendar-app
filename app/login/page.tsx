import {Metadata} from "next";
import {LoginForm} from "@/app/ui/forms/login-form";


export const metadata: Metadata = {
    title: 'Login',
};


/**
 * Exposes an interface for the user to login.
 * After a successful login the user should be redirected to the previous page or the calendar homepage
 */
export default function Page() {

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <LoginForm />
            <p className='mt-3'>You need to log in to continue</p>
        </div>
    )
}