<?php
namespace App\Features\Admin\Services;

use App\Features\Admin\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\Hash;
use App\Features\Admin\Constants\Code;
use Illuminate\Support\Facades\Mail;
use App\Features\Admin\Mail\PasswordReset;
use Illuminate\Support\Str;
use App\Features\Admin\Models\PasswordResetToken;

/**
 * AdminAuthService
 *
 * @package App\Features\Auth\Services
 */
class AuthService
{
    /**
     * login
     *
     * @param string $email
     * @param string $password
     * @return string
     * @throws BusinessException
     */
    public function login(string $email, string $password): string
    {
        // validate email
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(Code::EMAIL_NOT_FOUND->message(), Code::EMAIL_NOT_FOUND->value);
        }

        // validate password
        if (! Hash::check($password, $admin->password)) {
            throw new BusinessException(Code::PASSWORD_INCORRECT->message(),  Code::PASSWORD_INCORRECT->value);
        }

        // update last_login_at
        $admin->last_logined_at = now();
        $admin->save();

        // create token
        return $admin->createToken('admin_api')->plainTextToken;
    }

    /**
     * sendForgetPasswordEmail
     * 
     * @param string $email
     * @return void
     * @throws BusinessException
     */
    public function sendForgetPasswordEmail(string $email): void
    {
        // validate email
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(Code::EMAIL_NOT_FOUND->message(), Code::EMAIL_NOT_FOUND->value);
        }

        // generate token
        $token = $this->generatePasswordResetToken($email);

        // generate url 
        $url = $this->generatePasswordResetUrl($email, $token);

        // send email
        Mail::to($email)->send(new PasswordReset($url, $admin->email));
    
    }

    /**
     * generatePasswordResetToken
     * 
     * @param string $email
     * @return string
     * @throws BusinessException
     */
    public function generatePasswordResetToken(string $email): string
    {
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(Code::EMAIL_NOT_FOUND->message(), Code::EMAIL_NOT_FOUND->value);
        }

        // generate token
        $token = Str::random(60);

        // get reset
        $resetToken = PasswordResetToken::where('email', $email)->first();
        if ($resetToken) {
            $resetToken->update([
                'token' => $token,
                'created_at' => now(),
            ]);
        } else {
            PasswordResetToken::create([
                'email' => $email,
                'token' => $token,
                'created_at' => now(),
            ]);
        }


        return $token;
    }

    /**
     * generatePasswordResetUrl
     * 
     * @param string $email
     * @param string $token
     * @return string
     */
    public function generatePasswordResetUrl(string $email, string $token): string
    {
        return config('app.url') . '/admin/password-reset?email=' . $email . '&token=' . $token;
    }

    /**
     * resetPassword
     * 
     * @param string $email
     * @param string $password
     * @param string $resetPasswordToken
     * @return void
     * @throws BusinessException
     */
    public function resetPassword(string $email, string $password, string $resetPasswordToken): void
    {
        // validate email
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(Code::EMAIL_NOT_FOUND->message(), Code::EMAIL_NOT_FOUND->value);
        }
        
        // query password reset
        $passwordReset = PasswordResetToken::where('email', $email)->where('token', $resetPasswordToken)->first();
        if (!$passwordReset) {
            throw new BusinessException(Code::PASSWORD_RESET_TOKEN_NOT_FOUND->message(), Code::PASSWORD_RESET_TOKEN_NOT_FOUND->value);
        }

        // validate token expired
        if ($passwordReset->created_at < now()->subMinutes(60)) {
            throw new BusinessException(Code::PASSWORD_RESET_TOKEN_EXPIRED->message(), Code::PASSWORD_RESET_TOKEN_EXPIRED->value);
        }

        // update password
        $admin->password = Hash::make($password);
        $admin->save();

        // delete password reset token
        $passwordReset->delete();
    }
 
}
