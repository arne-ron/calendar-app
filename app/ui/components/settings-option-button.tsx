'use client'
import {SettingOption} from "@/app/definitions";


export function SettingsOptionButton(
{
    option,
    onChangeAction
}: {
    option: SettingOption,
    onChangeAction: (value: string) => void
}) {
    let button;
    switch (option.type) {
        case 'boolean':
            button = <input onChange={(e) => onChangeAction(e.target.checked.toString())} type='checkbox' defaultChecked={option.value === 'true'} />; break;
        case 'number':
            button = <input className='text-right h-min w-24  rounded' onChange={(e) => onChangeAction(e.target.value)} type='number' defaultValue={option.value}/>; break;
        default:
            button = <p>{option.value}</p>
    }


    return button;
}