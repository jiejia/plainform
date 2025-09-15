import * as z from "zod"; 

const schema = z.object({ 
    title: z.string().nonempty("title is required").max(255, "title must be less than 255 characters"),
    description: z.string().max(1000, "description must be less than 1000 characters"),
    regex: z.string().max(255, "regex must be less than 255 characters"),
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