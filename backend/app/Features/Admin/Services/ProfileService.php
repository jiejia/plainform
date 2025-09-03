<?php
namespace App\Features\Admin\Services;

use App\Features\Admin\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use App\Features\Core\Services\MailCodeService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Features\Admin\Constants\Code;

class ProfileService
{
    /**
     * Upload avatar file and return the URL
     * 
     * @param UploadedFile $avatarFile
     * @return string
     */
    public function uploadAvatar(UploadedFile $avatarFile): string
    {
        // Generate unique filename
        $filename = time() . '_' . uniqid() . '.' . $avatarFile->getClientOriginalExtension();
        
        // Store file to public disk under avatars directory
        $path = $avatarFile->storeAs('avatars', $filename, 'public');
        
        // Return full URL
        return config('app.url') . Storage::url($path);
    }

    /**
     * Update the avatar for the given admin.
     * 
     * @param Admin $admin
     * @param string $avatar
     * @return array
     */
    public function updateAvatar(Admin $admin, string $avatar): array
    {
        // Delete old avatar file if exists
        if ($admin->avatar && $admin->avatar !== $avatar) {
            $this->deleteOldAvatar($admin->avatar);
        }

        $admin->avatar = $avatar;
        $admin->save();

        return $admin->toArray();
    }

    /**
     * Delete old avatar file from storage
     * 
     * @param string $avatarUrl
     * @return void
     */
    private function deleteOldAvatar(string $avatarUrl): void
    {
        // Extract path from URL
        $urlParts = parse_url($avatarUrl);
        if (!isset($urlParts['path'])) {
            return;
        }

        // Remove '/storage/' prefix to get the actual path
        $path = str_replace('/storage/', '', $urlParts['path']);
        
        // Delete file if exists
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
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
        // email can not be the same
        if ($admin->email === $email) {
            throw new BusinessException(Code::EMAIL_SAME->message(), Code::EMAIL_SAME->value);
        }

        // email can not be other's email
        $otherAdmin = Admin::where('email', $email)->where('id', '!=', $admin->id)->first();
        if ($otherAdmin) {
            throw new BusinessException(Code::EMAIL_OTHER_FOUND->message(), Code::EMAIL_OTHER_FOUND->value);
        }

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