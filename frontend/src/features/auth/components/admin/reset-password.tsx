'use client'

import {Input, Button,Card, CardHeader, CardBody, Divider, PressEvent} from "@heroui/react";
import { Lock } from "lucide-react";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { msg } from "@/features/core/utils/ui";
import { resetPassword } from "@/features/auth/actions/auth-action";
import { resetPasswordValidator } from "@/features/auth/validators/reset-password-validator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {

    const router = useRouter();

    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const resetPasswordToken = searchParams.get('token') || '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPending, setIsPending] = useState(false);


    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // 阻止表单默认提交行为
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }
        
        setIsPending(true);        

        // validate form data
        const result = resetPasswordValidator({newPassword, confirmPassword});
        if (!result.success) {
            msg('reset failed', result.error.issues[0].message, 'warning');
            setIsPending(false);
            return;
        }

        // reset password
        const res = await resetPassword(email, newPassword, confirmPassword, resetPasswordToken);
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
                                    <Lock size={16} className="content-center text-default-400" aria-label="New Password" />
                                }
                                value={newPassword}
                                onValueChange={(e) => setNewPassword(e)}
                                validationBehavior="aria"
                            />
                            <Input
                                type="password"
                                label=""
                                placeholder="Confirm New Password"
                                labelPlacement="outside"
                                startContent={
                                    <Lock size={16} className="content-center text-default-400" aria-label="Confirm New Password" />
                                }
                                value={confirmPassword}
                                onValueChange={(e) => setConfirmPassword(e)}
                                validationBehavior="aria"
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
