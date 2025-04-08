import {signOut} from "@/app/auth";
import {ButtonHTMLAttributes} from "react";
import clsx from "clsx";

export function LogoutButton({className, ...rest}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <form action={async () => {
            "use server"
            await signOut()
        }}>
            <button className={clsx('bg-blue-500 text-white rounded-lg px-1 text-md mt-2', className)} {...rest}>
                Sign out
            </button>
        </form>
    )
}