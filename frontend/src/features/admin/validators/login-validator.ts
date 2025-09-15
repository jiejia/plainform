import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("email is required").email("email is not valid"),
    password: z.string().nonempty("password is required").min(6, "password must be at least 6 characters").max(100, "password must be less than 100 characters")
});

export const loginValidator = schema.safeParse;