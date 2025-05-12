'use client';
import { createContext, useContext, useState } from 'react';
import {Settings} from "@/app/definitions";


type SettingsContextType = {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children, initialSettings }: { children: React.ReactNode, initialSettings: Settings }) {
    const [settings, setSettings] = useState(initialSettings);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within a SettingsProvider');
    return context;
}