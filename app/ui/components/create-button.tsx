import {useState} from "react";


/**
 * The CreateButton form (i.e. for a `<TagBlock/>`)
 *
 * First exposes a (+) button and on click shows an input field.
 * Pressing the button again submits the form without a reload
 *
 * @param onSubmit the function called when submitting
 */
export function CreateButton(
    {
        onSubmit
    }: {
        onSubmit: (name: string) => void
    }
) {

    const [opened, setOpened] = useState<boolean>(false)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget); // Get form data
                const tagName = formData.get("name") as string; // Extract input value
                onSubmit(tagName);
                setOpened(false);
                e.currentTarget.reset()
            }}
            className='flex bg-white/95 rounded-xl min-w-10 h-6 justify-center items-center'
        >
            {opened && [
                <input
                    key='input'
                    placeholder={'Name'}
                    className='px-2 w-32 bg-transparent h-full rounded-full'
                    hidden={!opened}
                    name={'name'}
                    autoFocus
                />,
                <button
                    key='submit'
                    type='submit'
                    hidden={!opened}
                    className='mx-2'
                >
                    <p className='text-gray-400 text-xl' >+</p>
                </button>
            ]}
            {!opened &&
                <button
                    className='flex grow justify-center rounded-xl'
                    onClick={setOpened.bind(null, true)}
                    type='button'
                >
                    <p className='text-gray-400 text-lg'>+</p>
                </button>
            }
        </form>
    )
}