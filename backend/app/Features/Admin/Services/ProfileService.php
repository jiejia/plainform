<?php
namespace App\Features\Admin\Services;

use App\Features\Admin\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use App\Features\Core\Services\MailCodeService;
use Illuminate\Support\Facades\Hash;
use App\Features\Admin\Constants\Code;

class ProfileService
{
    /**
     * Update the avatar for the given admin.
     * 
     * @param Admin $admin
     * @param string $avatar
     * @return array
     */
    public function updateAvatar(Admin $admin, string $avatar): array
    {
        $admin->avatar = $avatar;
        $admin->save();

        return $admin->toArray();
    }

    /**
     * sendEmailResetCode
     * 
     * @param Admin $admin
     * @param string $email
     * @return void
     * @throws BusinessException
     */
    public function sendEmailResetCode(Admin $admin, string $email): void
    {
        // validate email
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(Code::EMAIL_NOT_FOUND->message(), Code::EMAIL_NOT_FOUND->value);
        }

        $mailService = app(MailCodeService::class)->scene('email_reset');
        $mailService->sendCode($email);
    }

    /**
     * updateEmail
     * 
     * @param Admin $admin
     * @param string $email
     * @param string $code
     * @return void
     * @throws BusinessException
     */
    public function updateEmail(Admin $admin, string $email, string $code): void
    {
        // verify code
        $mailService = app(MailCodeService::class)->scene('email_reset');
        if (! $mailService->verifyCode($email, $code)) {
            throw new BusinessException(Code::EMAIL_VERIFY_CODE_ERROR->message(), Code::EMAIL_VERIFY_CODE_ERROR->value);
        }

        // update email
        $admin->email = $email;
        $admin->save();

        // clear cache
        $mailService->clearCache($email);
    }

    /**
     * updatePassword
     * 
     * @param Admin $admin
     * @param string $oldPassword
     * @param string $password
     * @return void
     * @throws BusinessException
     */
    public function updatePassword(Admin $admin, string $oldPassword, string $password): void
    {
        // verify old password
        if (!Hash::check($oldPassword, $admin->password)) {
            throw new BusinessException(Code::PASSWORD_ERROR->message(), Code::PASSWORD_ERROR->value);
        }

        // verify password
        if ($password === $oldPassword) {   
            throw new BusinessException(Code::PASSWORD_SAME->message(), Code::PASSWORD_SAME->value);
        }

        // update password
        $admin->password = Hash::make($password);
        $admin->save();
    }
}