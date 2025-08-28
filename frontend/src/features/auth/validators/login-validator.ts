import * as z from "zod"; 

const schema = z.object({ 
    email: z.string().nonempty("邮箱不能为空").email("邮箱格式不正确"),
    password: z.string().nonempty("密码不能为空").min(6, "密码长度不能小于6位").max(100, "密码长度不能大于100位")
});

export const loginValidator = schema.safeParse;