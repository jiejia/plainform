import * as z from "zod"; 

const schema = z.object({
    app_name: z.string().nonempty("app_name_required").max(100, "app_name_max"),
    app_description: z.string().nonempty("app_description_required").max(255, "app_description_max"),
    default_language: z.string().nonempty("default_language_required"),
    maintenance_mode: z.boolean(),
});

export const appNameValidator = schema.pick({ app_name: true }).safeParse;
export const appDescriptionValidator = schema.pick({ app_description: true }).safeParse;
export const defaultLanguageValidator = schema.pick({ default_language: true }).safeParse;
export const maintenanceModeValidator = schema.pick({ maintenance_mode: true }).safeParse;