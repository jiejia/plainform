'use client'

import LoginLayout from '@/app/login/layout';
import ForgetPasswordComonent from '@/features/auth/components/admin/forget-password';

export default function ForgetPassword() {
    return (        
        <LoginLayout>
            <ForgetPasswordComonent />
        </LoginLayout>
    );
}
