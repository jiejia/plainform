'use client'

import FormModal from "@/features/core/components/admin/form-modal";
import { Button, Input, PressEvent} from "@heroui/react";
import { ShieldCheck, Mail, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { updateEmailValidator ,  sendEmailResetCodeValidator} from "@/features/setting/validators/update-email";
import { msg } from "@/features/core/utils/ui";
import { updateEmail, sendEmailResetCode } from "@/features/auth/actions/auth-action";

export default function EditEmail() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [isCodePending, setIsCodePending] = useState(false);

    const [countdown, setCountdown] = useState(0);

    // Countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [countdown]);    

    async function handleSendEmailResetCode() {
        if (countdown > 0) {
            return;
        }

        setIsCodePending(true);

        // validate form data
        const result = sendEmailResetCodeValidator({email: email});
        if (!result.success) {
            msg('发送验证码失败', result.error.issues[0].message, 'warning');
            
             // sleep 0.5 second
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsCodePending(false);
            return;
        }
        
        const res = await sendEmailResetCode(email);
        if (res === true) {
            msg('发送验证码成功', '发送验证码成功', 'success');
            
            setCountdown(60); // Start 60 seconds countdown

        } else {
            msg('发送验证码失败', res, 'warning');
        }

        setIsCodePending(false);
    }

    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // prevent default
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }
        
        setIsPending(true);

        // validate form data
        const result = updateEmailValidator({email, code});
        if (!result.success) {
            msg('修改密码失败', result.error.issues[0].message, 'warning');

            // sleep 1 second
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsPending(false);
            return;
        }

        // reset password
        const res = await updateEmail(email, code);
        if (res === true) {
            msg('修改邮箱成功', '修改邮箱成功', 'success');

            // clear form
            setEmail('');
            setCode('');

            setIsPending(false);
            return 

        } else {
            msg('修改邮箱失败', res, 'warning');
        }

        setIsPending(false);
    }   

    return (
        <FormModal title="修改邮箱" button={
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
            <div className="grid grid-cols-[3fr_1fr] gap-2">
                <Input 
                    type="email" 
                    placeholder="请输入邮箱" 
                    label="" 
                    labelPlacement="inside"
                    startContent={<Mail size={16} className="content-center text-default-400" />}
                    value={email}
                    onValueChange={(e) => setEmail(e)}
                    size="sm"
                />
                <Button
                    type="button"
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => handleSendEmailResetCode()}
                    isLoading={isCodePending}
                    disabled={isCodePending || countdown > 0}
                >{isCodePending ? '发送中...' : countdown > 0 ? `重新发送(${countdown}s)` : '发送验证码'}</Button>    
            </div>

            <Input 
                type="text" 
                placeholder="请输入验证码" 
                label="" 
                labelPlacement="inside"
                startContent={<ShieldCheck size={16} className="content-center text-default-400" />}
                value={code}
                onValueChange={(e) => setCode(e)}
                size="sm"
            />
        </FormModal>
    );
}