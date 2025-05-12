import {Settings} from "@/app/definitions";
import {firstToUpper} from "@/app/utils";
import {SettingsOption} from "@/app/ui/components/settings-option";


export function SettingsForm({settings}: {settings: Settings}) {
    return (
        <form>
            {settings.map((category) => {
                return (
                    <div key={category.section_name}>
                        <h1 className='text-lg font-bold italic'>{firstToUpper(category.section_name)}</h1>
                        <div className='flex flex-col gap-1'>
                            {category.options.map((option) => <SettingsOption key={option.name} option={option}/>)}
                        </div>
                    </div>
                )
            })}
        </form>
    )
}