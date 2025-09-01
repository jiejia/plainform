import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("邮箱不能为空").email("邮箱格式不正确"),
    code: z.string().nonempty("验证码不能为空").length(6, "验证码长度6位"),
})

export const updateEmailValidator = schema.safeParse;

export const sendEmailResetCodeValidator = schema.pick({email: true}).safeParse;