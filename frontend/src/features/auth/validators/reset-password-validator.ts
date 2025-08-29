import * as z from "zod"; 

const schema = z.object({ 
    newPassword: z.string().nonempty("新密码不能为空").min(6, "新密码不能少于6位").max(100, "新密码不能超过100位"),
    confirmPassword: z.string().nonempty("确认密码不能为空").min(6, "确认密码不能少于6位").max(100, "确认密码不能超过100位")
});

export const resetPasswordValidator = schema.safeParse;