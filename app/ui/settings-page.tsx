'use client'
import {Settings} from "@/app/definitions";
import {SettingsForm} from "@/app/ui/forms/settings-form";
import {useSettings} from "@/settings-context";


export function SettingsPage(){
    const settings: Settings = useSettings().settings;

    return (
        <div className='flex flex-col gap-3'>
            <SettingsForm settings={settings}/>
        </div>
    )
}