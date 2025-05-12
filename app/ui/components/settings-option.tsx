import {SettingOption} from "@/app/definitions";
import {firstToUpper} from "@/app/utils";
import {SettingsOptionButton} from "@/app/ui/components/settings-option-button";


export function SettingsOption({option}: {option: SettingOption}) {
    return (
        <div className='flex flex-row gap-2 justify-end'>
            <p className=''>{firstToUpper(option.name.replaceAll('_', ' '))}</p>
            <div className='grow min-w-4' />
            <SettingsOptionButton option={option} />
        </div>
    )
}