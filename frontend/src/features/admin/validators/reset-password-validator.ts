import * as z from "zod"; 

const schema = z.object({ 
    newPassword: z.string().nonempty("admin.new_password_required").min(6, "admin.new_password_min").max(100, "admin.new_password_max"),
    confirmPassword: z.string().nonempty("admin.confirm_password_required").min(6, "admin.confirm_password_min").max(100, "admin.confirm_password_max")
});

export const resetPasswordValidator = schema.safeParse;