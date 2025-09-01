import * as z from "zod"; 

const schema = z.object({ 
    oldPassword: z.string().nonempty("旧密码不能为空").min(6, "旧密码不能少于6位").max(100, "旧密码不能超过100位"),
    Password: z.string().nonempty("新密码不能为空").min(6, "新密码不能少于6位").max(100, "新密码不能超过100位"),
    confirmPassword: z.string().nonempty("确认密码不能为空")
}).refine((data) => data.Password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
});

export const resetPasswordValidator = schema.safeParse;