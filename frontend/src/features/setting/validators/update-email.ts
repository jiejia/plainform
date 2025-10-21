import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("email_required").email("email_not_valid"),
    code: z.string().nonempty("code_required").length(6, "code_length_6"),
})

export const updateEmailValidator = schema.safeParse;

export const sendEmailResetCodeValidator = schema.pick({email: true}).safeParse;