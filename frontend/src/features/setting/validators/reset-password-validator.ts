import * as z from "zod"; 

const schema = z.object({ 
    oldPassword: z.string().nonempty("old_password_required").min(6, "old_password_min").max(100, "old_password_max"),
    Password: z.string().nonempty("new_password_required").min(6, "new_password_min").max(100, "new_password_max"),
    confirmPassword: z.string().nonempty("confirm_password_required")
}).refine((data) => data.Password === data.confirmPassword, {
    message: "confirm_password_not_match",
    path: ["confirm_password_not_match"],
});

export const resetPasswordValidator = schema.safeParse;