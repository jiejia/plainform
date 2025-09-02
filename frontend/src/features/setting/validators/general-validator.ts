import * as z from "zod"; 

const schema = z.object({
    app_name: z.string().nonempty("应用名称不能为空").max(100, "应用名称不能超过100个字符"),
    app_description: z.string().nonempty("应用描述不能为空").max(255, "应用描述不能超过255个字符"),
    default_language: z.string().nonempty("语言不能为空"),
    maintenance_mode: z.boolean(),
});

export const appNameValidator = schema.pick({ app_name: true }).safeParse;
export const appDescriptionValidator = schema.pick({ app_description: true }).safeParse;
export const defaultLanguageValidator = schema.pick({ default_language: true }).safeParse;
export const maintenanceModeValidator = schema.pick({ maintenance_mode: true }).safeParse;