'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input, PressEvent} from "@heroui/react";
import { Lock, SquarePen } from "lucide-react";
import { useState } from "react";
import { resetPasswordValidator } from "@/features/setting/validators/reset-password-validator";
import { msg } from "@/features/core/utils/ui";
import { resetPassword } from "@/features/auth/actions/auth-action";


export default function ResetPassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // prevent default
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }
        
        setIsPending(true);

        // validate form data
        const result = resetPasswordValidator({oldPassword, Password, confirmPassword});
        if (!result.success) {
            msg('修改密码失败', result.error.issues[0].message, 'warning');

            // sleep 1 second
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsPending(false);
            return;
        }

        // reset password
        const res = await resetPassword(oldPassword, Password, confirmPassword);
        if (res === true) {
            msg('修改密码成功', '修改密码成功', 'success');

            // clear form
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');

            setIsPending(false);
            return 

        } else {
            msg('修改密码失败', res, 'warning');
        }

        setIsPending(false);
    }   

    return (
        <FormModal title="修改密码" button={
            <Button
                startContent={<SquarePen size={16}/>}
                size="sm"
                color="primary"
                variant="flat"
            >修改</Button>
            }
            footer={
                <>
                    <Button
                        type="submit"
                        size="sm"
                        color="primary"
                        variant="solid"
                        isLoading={isPending}
                        disabled={isPending}
                        onPress={handleSubmit}
                    >{isPending ? '提交中...' : '提交'}</Button>
                </>
            }
        >
            <Input 
                type="password" 
                placeholder="请输入旧密码" 
                label="" 
                labelPlacement="inside"
                startContent={<Lock size={16} className="content-center text-default-400" />}
                value={oldPassword}
                onValueChange={(e) => setOldPassword(e)}
                size="sm"
            />
            <Input 
                type="password" 
                placeholder="请输入新密码" 
                label="" 
                labelPlacement="inside"
                startContent={<Lock size={16} className="content-center text-default-400" />}
                value={Password}
                onValueChange={(e) => setPassword(e)}
                size="sm"
            />
            <Input 
                type="password" 
                placeholder="请输入确认密码" 
                label="" 
                labelPlacement="inside"
                startContent={<Lock size={16} className="content-center text-default-400" />}
                value={confirmPassword}
                onValueChange={(e) => setConfirmPassword(e)}
                size="sm"
            />
        </FormModal>
    );
}