import {DetailedHTMLProps, HTMLAttributes, RefObject, useEffect} from "react";
import clsx from "clsx";


/**
 * Creates a popup at the middle of the screen. <br>
 * The contained `<dialog>` element is hidden by default and can be shown by calling
 * `ref.content?.show()` or `ref.content?.showModal()` if all events to other elements should be blocked.
 * <br>
 * The children get added to an area in contained in the popup.
 * Styling `className` affects the `<div>` containing the children
 *
 * ```
 * const ref = useRef<HTMLDialogElement>(null);
 *
 * <div>
 *   <button action={() => ref.current?.show()}>Show Popup</button>
 *   <Popup ref={ref}>MyPopup</Popup>
 * </div>
 * ```
 *
 * @param ref reference the popup for showing it
 * @param backdrop if `true`, clicking outside the popup closes it
 * @param simple if `false` hides border and close button
 */
export function Popup(
    {
        ref,
        backdrop = true,
        simple = true,
        className,
        children,
        ...props
    }: {
        ref: RefObject<HTMLDialogElement | null>,
        backdrop?: boolean,
        simple?: boolean
    } & DetailedHTMLProps<HTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
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
        <dialog ref={ref} {...props} className={clsx('absolute bg-transparent', className)}>
            {simple &&
                <div className='flex flex-col gap-1 rounded bg-gray-200 p-2'>
                    <div className={'rounded bg-white ' + className}>
                        {children}
                    </div>
                    <button onClick={() => ref.current?.close()} className='rounded bg-gray-100 px-1'>
                        Close
                    </button>

                </div>
            }
            {!simple &&
                children
            }
        </dialog>
    )
}