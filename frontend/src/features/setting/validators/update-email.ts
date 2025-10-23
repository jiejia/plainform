import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("setting.email_required").email("setting.email_not_valid"),
    code: z.string().nonempty("setting.code_required").length(6, "setting.code_length_6"),
})

export const updateEmailValidator = schema.safeParse;

export const sendEmailResetCodeValidator = schema.pick({email: true}).safeParse;