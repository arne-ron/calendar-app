'use client'


import { useDebouncedCallback } from "use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


export function Searchbar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter();

    // Debounced callback means the function only gets called after it didn't get called for the set time
    // this is used to reduce server requests while the user is still typing
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <div>
            <input
                className='bg-white rounded-xl content-center px-3 py-1 h-fit w-36 text-sm'
                placeholder='Search'
                onChange={(e) => handleSearch(e.target.value)}
                id='search'
            />
            <label htmlFor='search' className='sr-only'>
                Search
            </label>
        </div>
    )
}

