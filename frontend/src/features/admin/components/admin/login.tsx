'use client'

import { Input, Button, Checkbox, Card, CardHeader, CardBody, CardFooter, Divider, PressEvent, addToast, cn } from "@heroui/react";
import { Link } from "@heroui/link";
import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { msg } from "@/features/core/utils/ui";
import { login } from "@/features/admin/actions/auth-action";
import { loginValidator } from "@/features/admin/validators/login-validator";
import { useTranslations } from 'next-intl';
import ErrorMessage from "@/features/core/components/shared/error-message";


type loginError = {
    email: string;
    password: string;
}

export default function Login() {
    const t = useTranslations();


    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<loginError>({
        email: '',
        password: ''
    });

    async function handleSubmit(e?: PressEvent | React.FormEvent) {
        // prevent the form's default submission behavior
        if (e && 'preventDefault' in e) {
            e.preventDefault();
        }

        setIsPending(true);

        // validate form data
        const result = loginValidator({ email, password });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors({
                email: fieldErrors.email?.[0] ?? '',
                password: fieldErrors.password?.[0] ?? '',
            });

            setIsPending(false);
            return;
        }

        // login
        const res = await login(email, password);
        if (res.code === 0) {
            router.push('/dashboard');
        } else {
            msg(t('admin.login_failed'), t(res.msg), 'warning');
        }

        setIsPending(false);
    }

    function SubmitButton() {
        return (
            <Button
                type="submit"
                color="primary"
                isLoading={isPending}
                disabled={isPending}
                className="w-full"
                onPress={handleSubmit}
            >
                {isPending ? t('admin.logging_in') : t('admin.login')}
            </Button>
        );
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader className="text-center">
                <h2 className="text-center text-lg font-normal block w-full">{t('admin.login')}</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">
                <form className="w-full flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        label=""
                        placeholder={t('admin.email')}
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Mail size={16} className="content-center" aria-label={t('admin.email')} />
                            </span>
                        }
                        defaultValue={email}
                        onValueChange={(e) => setEmail(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, email: '' })}
                        endContent={
                            errors.email && (
                                <ErrorMessage error={t(errors.email)} />
                            )
                        }
                    />

                    <Input
                        type="password"
                        name="password"
                        label=""
                        placeholder={t('admin.password')}
                        labelPlacement="outside"
                        startContent={
                            <span className="shrink-0">
                                <Lock size={16} className="content-center" aria-label={t('admin.password')} />
                            </span>
                        }
                        defaultValue={password}
                        onValueChange={(e) => setPassword(e)}
                        validationBehavior="aria"
                        onFocus={() => setErrors({ ...errors, password: '' })}
                        endContent={
                            errors.password && (
                                <ErrorMessage error={t(errors.password)} />
                            )
                        }
                    />
                    <div className="text-xs grid grid-flow-col">
                        <Checkbox defaultSelected size="sm">
                            <span className="text-xs">{t('admin.remember_me')}</span>
                        </Checkbox>
                        <Link href="/forget-password" className="content-center justify-self-end text-xs">
                            {t('admin.forget_password')}
                        </Link>
                    </div>
                    <SubmitButton />
                </form>
            </CardBody>
        </Card>
    );
}
