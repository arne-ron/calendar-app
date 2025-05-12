'use client'
import {settingsDefault} from "@/settings-default";
import {Settings} from "@/app/definitions";
import {updateSettings} from "@/app/actions";


export function SettingsResetButton() {
    async function resetSettings() {
        const settings: Settings = settingsDefault

        await updateSettings(settings)
     // await setSettingsToCookies(settings)

    //     await Promise.all([
    //         updateSettings(settings),
    //         setSettingsToCookies(settings)
    //     ])

    }


    return (
        <button onClick={resetSettings}>
            Reset
        </button>
    )
}