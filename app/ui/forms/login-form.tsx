'use client'
import {useSearchParams} from "next/navigation";
import {useActionState} from "react";
import {authenticate} from "@/app/actions";


export function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/calendar';


    return (
        <form action={formAction} className='flex flex-col gap-2 bg-gray-100 shrink p-7 items-center rounded-xl w-min'>
            <div className='w-20 h-20 rounded-full bg-gray-400 overflow-hidden'>
                <div className='w-10 h-10 rounded-full bg-gray-600 translate-x-5 translate-y-2' />
                <div className='w-20 h-20 rounded-full bg-gray-600 translate-y-4' />
            </div>
            <input
                id={'email'}
                name={'email'}
                placeholder={'E-mail'}
                type={'email'}
                className='rounded-md border border-gray-200 py-1 pl-2 text-sm mt-3'
                // aria-describedby={field + '-error'}
            />
            <input
                id={'password'}
                name={'password'}
                placeholder={'Password'}
                type={'password'}
                className='rounded-md border border-gray-200 py-1 pl-2 text-sm'
                // aria-describedby={field + '-error'}
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <button className='bg-blue-500 text-white rounded-lg px-1 text-md mt-2' aria-disabled={isPending}>
                Submit
            </button>

            {errorMessage &&
                <div
                    className="flex items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                        <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
            }
        </form>
    )
}