import React from "react";

export function SimpleTagBlock(
    {text, color, onClick, onUpdate }:
    {text: string, color: string, onClick: () => void, onUpdate: () => void }
) {
    React.useEffect(
        () => onUpdate,
        [text, color, onClick]
    )

    return (
        <button
            key='simplbe_button'
            className={'flex flex-row gap-1 items-center'}
            onClick={onClick}
        >
            <div key='simple_color_swadge' className={`h-3 w-3 rounded-full ml-1`} style={{backgroundColor: color}}></div>
            <p key='simple_text'>{text}</p>
        </button>
    )

}