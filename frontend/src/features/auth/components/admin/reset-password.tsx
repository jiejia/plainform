'use client'

import { Input, Button, Card, CardHeader, CardBody, Divider, PressEvent } from "@heroui/react";
import { Lock } from "lucide-react";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { msg } from "@/features/core/utils/ui";
import { resetPasswordByEmail } from "@/features/auth/actions/auth-action";
import { resetPasswordValidator } from "@/features/auth/validators/reset-password-validator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type resetPasswordError = {
    newPassword: string;
    confirmPassword: string;
}

export default function ResetPassword() {

    const router = useRouter();

    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const resetPasswordToken = searchParams.get('token') || '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState<resetPasswordError>({
        newPassword: '',
        confirmPassword: ''
    });


    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // 阻止表单默认提交行为
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }

        setIsPending(true);

        // validate form data
        const result = resetPasswordValidator({ newPassword, confirmPassword });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                newPassword: fieldErrors.newPassword?.[0] ?? '',
                confirmPassword: fieldErrors.confirmPassword?.[0] ?? '',
            });

            // sleep 1 second
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsPending(false);
            return;
        }

        // reset password
        const res = await resetPasswordByEmail(email, newPassword, confirmPassword, resetPasswordToken);
        if (res === true) {
            msg('reset success', 'Please login', 'success');
            router.push('/login');
        } else {
            msg('reset failed', res, 'warning');
        }

        setIsPending(false);
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader className="text-center">
                <h2 className="text-center text-lg font-normal block w-full">Reset Password</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">

                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <p className="text-xs text-center text-slate-400"> Please enter your new password.</p>
                    </div>
                    <Input
                        type="password"
                        label=""
                        placeholder="New Password"
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Lock size={16} className="content-center text-default-400" aria-label="New Password" />
                            </span>
                        }
                        value={newPassword}
                        onValueChange={(e) => setNewPassword(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, newPassword: '' })}
                        endContent={
                            errors.newPassword && (
                                <span className="text-danger-500 text-xs bg-danger-50 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                                    {errors.newPassword}
                                </span>
                            )
                        }
                    />

                    <Input
                        type="password"
                        label=""
                        placeholder="Confirm New Password"
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Lock size={16} className="content-center text-default-400" aria-label="Confirm New Password" />
                            </span>
                        }
                        value={confirmPassword}
                        onValueChange={(e) => setConfirmPassword(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, confirmPassword: '' })}
                        endContent={
                            errors.confirmPassword && (
                                <span className="text-danger-500 text-xs bg-danger-50 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                                    {errors.confirmPassword}
                                </span>
                            )
                        }
                    />
                    <p className="text-center text-xs"><span>Reset Problem?</span> <Link href="/forget-password" className="content-center justify-self-end text-xs">Resend</Link></p>
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isPending}
                        onPress={handleSubmit}
                    >
                        {isPending ? 'Resetting...' : 'Reset'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
