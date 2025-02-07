// This file contains utility functions
import {ZodTypeAny} from "zod";
import {Event} from "@/app/definitions";


export function firstToUpper(text: string) {
    if (text.length <= 1) return text.toUpperCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}


/**
 * Maps zodTypes to a string corresponding to a viable `<input type'...'/>` parameter
 *
 * @param zodType the type to be mapped
 */
export function mapZodToInputValueString(zodType: ZodTypeAny) {
    const typeMap: Record<string, string> = {
        ZodString: "text",
        ZodNumber: "number",
        ZodBoolean: "checkbox",
        ZodDate: "date",
        ZodArray: "text",
    };

    return typeMap[zodType._def.typeName] || "unknown";
}


/**
 * Performs input parsing to transform from event: Event (i.e. received from SQL) to values
 *  compatible with the <input defaultValue='...' /> field \br
 *
 * @param event the event to source the values from
 * @param field var needs to be a field of event
 */
export function mapEventToDefaultValue(event: Event, field: string) {
    const val = event[field as keyof Event];
    switch (field) {
        case 'date':
            return new Date(val as number).toISOString().slice(0, 10);
        default:
            return val?.toString();
    }
}