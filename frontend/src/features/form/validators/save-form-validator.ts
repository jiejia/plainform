import * as z from "zod"; 

const schema = z.object({ 
    title: z.string().nonempty("title_required").max(255, "title_max_255"),
    description: z.string().max(1000, "description_max_1000"),
});

export const saveFormValidator = schema.safeParse;