'use client'
import {setSettingsToCookies} from "@/app/cookies";


export function TestComponent() {
    return <button onClick={() => setSettingsToCookies()} >COOKIES</button>
}