import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("email is required").email("email is not valid")
});

export const forgetPasswordValidator = schema.safeParse;