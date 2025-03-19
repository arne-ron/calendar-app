import React from "react";

export function SimpleTagBlock(
    {text, color, onClick}:
    {text: string, color: string, onClick: () => void}
) {
    return (
        <button
            key='simplbe_button'
            className={'flex flex-row gap-1 items-center'}
            onClick={onClick}
        >
            <div key='simple_color_swadge' className={`h-3 w-3 rounded-full ${color} ml-1`}></div>
            <p key='simple_text'>{text}</p>
        </button>
    )

}