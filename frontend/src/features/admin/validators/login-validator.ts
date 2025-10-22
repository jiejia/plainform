import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("admin.email_required").email("admin.email_not_valid"),
    password: z.string().nonempty("admin.password_required").min(6, "admin.password_min").max(100, "admin.password_max")
});

export const loginValidator = schema.safeParse;