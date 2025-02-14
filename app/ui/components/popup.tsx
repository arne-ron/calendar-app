import {ReactNode, RefObject, useEffect} from "react";


/**
 * Creates a popup at the middle of the screen. <br>
 * The contained `<dialog>` element is hidden by default and can be shown by calling
 * `ref.content?.show()` or `ref.content?.showModal()` if all events to other elements should be blocked.
 * <br>
 * The children get added to an area in contained in the popup.
 * Styling `className` affects the `<div>` containing the children
 *
 * @param ref reference the popup for showing it
 * @param backdrop if `true`, clicking outside the popup closes it
 * @param className tailwind styling for the `<div>` containing the children
 * @param children the content of the popup
 * @constructor
 */
export function Popup(
    {
        ref,
        backdrop = true,
        className,
        children
    }: {
        ref: RefObject<HTMLDialogElement | null>,
        backdrop?: boolean,
        className: string | undefined,
        children?: ReactNode[]
    }
) {
    // Adds event handler to detect clicks and closes the popup when clicked outside and backdrop is true
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                ref.current.close();
            }
        };

        if (backdrop) {
            document.addEventListener("mousedown", handleOutsideClick);
            return () => document.removeEventListener("mousedown", handleOutsideClick);
        }
    });

    return (
        <dialog ref={ref}>
            <div className='flex flex-col gap-1 rounded bg-gray-200 p-2'>
                <div className={'rounded bg-white ' + className}>
                    {children}
                </div>
                <button onClick={() => ref.current?.close()} className='rounded bg-gray-100 px-1'>Close</button>

            </div>
        </dialog>
    )
}