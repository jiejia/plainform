import * as z from "zod"; 

const schema = z.object({ 
    newPassword: z.string().nonempty("new password is required").min(6, "new password must be at least 6 characters").max(100, "new password must be less than 100 characters"),
    confirmPassword: z.string().nonempty("confirm password is required").min(6, "confirm password must be at least 6 characters").max(100, "confirm password must be less than 100 characters")
});

export const resetPasswordValidator = schema.safeParse;