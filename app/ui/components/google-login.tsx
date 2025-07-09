'use client'
import {signInGoogle} from "@/app/actions";
import Image from "next/image";


export function GoogleLogin() {

    return (
        <form action={() => signInGoogle({redirectTo: "/calendar"})}>
            <button className='flex flex-row justify-between items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded px-2 py-1'>
                <p>Continue with Google</p>
                <Image
                    src='/google-logo.png'
                    alt="Google logo"
                    width={30}
                    height={30}
                    priority
                />
            </button>
        </form>
    )
}