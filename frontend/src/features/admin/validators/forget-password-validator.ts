import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("admin.email_required").email("admin.email_not_valid")
});

export const forgetPasswordValidator = schema.safeParse;