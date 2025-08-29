'use client'

import LoginLayout from '@/app/login/layout';
import ResetPasswordComponent from '@/features/auth/components/admin/reset-password';

export default function ResetPassword() {
    return (        
        <LoginLayout>
            <ResetPasswordComponent />
        </LoginLayout>
    );
}
