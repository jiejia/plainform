import * as z from "zod"; 

const schema = z.object({ 
    title: z.string().nonempty("title_required").max(255, "title_max_255"),
    description: z.string().max(1000, "description_max_1000"),
    regex: z.string().max(255, "regex_max_255"),
    // config: z.object({
    //     options: z.object({
    //         default_options: z.array(z.object({
    //             val: z.string().nonempty("val is required"),
    //             selected: z.boolean(),
    //         })),
    //     }),
    // }),
});

export const saveFormFieldValidator = schema.safeParse;