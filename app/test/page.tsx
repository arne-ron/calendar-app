import {SettingsPage} from "@/app/ui/settings-page";
import {SettingsProvider} from "@/settings-context";
import {settingsDefault} from "@/settings-default";


/**
 * Exposes an url for WIP and testing purposes
 *
 * @constructor
 */
export default function Page() {
    return (
        <SettingsProvider initialSettings={settingsDefault}>

            <div className='flex flex-col items-center justify-center h-full'>
                <SettingsPage />
            </div>
        </SettingsProvider>
    )
}


