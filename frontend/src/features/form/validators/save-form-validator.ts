import * as z from "zod"; 

const schema = z.object({ 
    title: z.string().nonempty("title is required").max(255, "title must be less than 255 characters"),
    description: z.string().max(1000, "description must be less than 1000 characters"),
});

export const saveFormValidator = schema.safeParse;