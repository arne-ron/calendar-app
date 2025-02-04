// This file contains utility functions


import { ZodTypeAny } from "zod";

export function firstToUpper(text: string) {
    if (text.length <= 1) return text.toUpperCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}


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