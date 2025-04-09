'use client'
import {useActionState} from "react";
import {createUser} from "@/app/actions";


export function CreateUserForm() {
    const initialState = { message: null, errors: {} }
    const [state, formAction] = useActionState(createUser, initialState)

    return (
        <form action={formAction} className='flex flex-col bg-gray-100 rounded-xl p-7 gap-2 items-center'>
            <div className='w-20 h-20 rounded-full bg-gray-400 overflow-hidden'>
                <div className='w-10 h-10 rounded-full bg-gray-600 translate-x-5 translate-y-2' />
                <div className='w-20 h-20 rounded-full bg-gray-600 translate-y-4' />
            </div>
            <p className='text-xl'>Create Account</p>
            <div className='flex flex-col rounded-xl gap-2 pt-2 w-72 pb-4 px-4 bg-white'>
                <label
                    className='text-sm font-medium text-gray-700 mt-1'
                    htmlFor={'name'}
                >
                    Username
                </label>
                <input
                    id='name'
                    name='name'
                    placeholder={'user123'}
                    type={'text'}
                    className='rounded-md border border-gray-200 py-1 pl-2 text-sm'
                    aria-describedby={'name-error'}
                />
                <label
                    className='text-sm font-medium text-gray-700 mt-1'
                    htmlFor={'email'}
                >
                    E-Mail
                </label>
                <input
                    id='email'
                    name='email'
                    placeholder='test@myapp.com'
                    type='email'
                    className='rounded-md border border-gray-200 py-1 pl-2 text-sm'
                />
                <label
                    className='text-sm font-medium text-gray-700 mt-1'
                    htmlFor={'password'}
                >
                    Password
                </label>
                <input
                    id='password'
                    name='password'
                    placeholder='Password'
                    type='password'
                    className='rounded-md border border-gray-200 py-1 pl-2 text-sm'
                />
                <label
                    className='hidden text-sm font-medium text-gray-700 mt-1'
                    htmlFor='repeat_password'
                >
                    Repeat Password
                </label>
                <input
                    id='repeat_password'
                    name='repeat_password'
                    placeholder='Repeat Password'
                    type='password'
                    className='rounded-md border border-gray-200 py-1 pl-2 text-sm'
                />
                <button type='submit' className='text-blue-500 hover:text-blue-700 rounded-full bg-gray-100/60 hover:bg-gray-100/80 px-1'>
                    Sign up
                </button>
                <p className='text-red-500'>{state.message}</p> {/*TODO this can be done way better */}
                <p className='text-red-500'>{Object.entries(state.errors ?? {}).map(([key, vals]) => `${key}: ${vals} || `)}</p>
            </div> {/* TODO make those forms a generic template with aria errors */}
        </form>
    )
}