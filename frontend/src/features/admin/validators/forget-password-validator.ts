import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("email_required").email("email_not_valid")
});

export const forgetPasswordValidator = schema.safeParse;