import {useState} from "react";

/**
 * The CreateTag form for a `<TagBlock/>`
 *
 * First exposes a (+) button and on click shows an input field.
 * Pressing the button again submits the form without a reload
 *
 * @param onSubmit the function called when submitting
 */
export function CreateTag(
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
            className='flex bg-white rounded-full min-w-20 h-7 justify-center items-center'
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
                    <p className='text-gray-200 text-xl' >+</p>
                </button>
            ]}
            {!opened &&
                <button
                    className='flex grow justify-center rounded-full'
                    onClick={setOpened.bind(null, true)}
                    type='button'
                >
                    <p className='text-gray-200 text-xl'>+</p>
                </button>
            }
        </form>
    )
}