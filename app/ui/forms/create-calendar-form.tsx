import Link from "next/link";

export function CreateCalendarForm() {
    return (
        <form>
            <div className='flex flex-col gap-1 bg-gray-200 p-3 rounded-xl'>
                <label>Name</label>
                <input />
                <label>Tags</label>
                <input />
                <label>Share with</label>
                <input />
                <div className='flex flex-row gap-1 mt-1'>
                    <button type='submit' className='bg-white hover:bg-white/60 w-fit px-1 rounded-full text-blue-600'>Create</button>
                    <Link href='/calendar' className='bg-white hover:bg-white/60 rounded-full px-1'>Cancel</Link>
                </div>
            </div>
        </form> // TODO: Research and maybe replace all (html's) <form> with next.js' <Form>
    )
}