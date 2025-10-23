import * as z from "zod"; 

const schema = z.object({ 
    oldPassword: z.string().nonempty("setting.old_password_required").min(6, "setting.old_password_min").max(100, "setting.old_password_max"),
    Password: z.string().nonempty("setting.new_password_required").min(6, "setting.new_password_min").max(100, "setting.new_password_max"),
    confirmPassword: z.string().nonempty("setting.confirm_password_required")
}).refine((data) => data.Password === data.confirmPassword, {
    message: "setting.confirm_password_not_match",
    path: ["setting.confirm_password_not_match"],
});

export const resetPasswordValidator = schema.safeParse;