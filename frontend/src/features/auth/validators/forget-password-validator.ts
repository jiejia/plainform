import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("邮箱不能为空").email("邮箱格式不正确")
});

export const forgetPasswordValidator = schema.safeParse;