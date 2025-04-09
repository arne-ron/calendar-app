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


export function parseDurationFromString(value: string): number {
    // TODO Implement this for durations longer than a day
    let ret_val = 0
    const arr = value.split(":").map(Number).reverse()
    arr.forEach((val: number, i: number) => {
        ret_val += val * (60)**i * 1000
    })
    return ret_val
}


export function getTimeInMillis(date: Date): number {
    return date.getHours() * 3600000
        + date.getMinutes() * 60000
        + date.getSeconds() * 1000
        + date.getMilliseconds();
}


/**
 * Clamps the value of x between min and max and returns the result
 *
 * @param x the value to be clamped
 * @param min Minimum value x can take
 * @param max Maximum value x can take
 */
export function clamp(x: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, x));
}


export function getDaysFromMonth(month: number): number {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 2:
            return 28 // TODO Leap years...
        case 4: case 6: case 9: case 11:
            return 30
        default:
            throw new Error(`0 < month <= 12 but is ${month}`)
    }

}