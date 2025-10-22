import * as z from "zod"; 

const schema = z.object({ 
    title: z.string().nonempty("form.title_required").max(255, "form.title_max_255"),
    description: z.string().max(1000, "form.description_max_1000"),
});

export const saveFormValidator = schema.safeParse;