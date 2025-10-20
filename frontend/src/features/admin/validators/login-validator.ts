import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("email_required").email("email_not_valid"),
    password: z.string().nonempty("password_required").min(6, "password_min").max(100, "password_max")
});

export const loginValidator = schema.safeParse;