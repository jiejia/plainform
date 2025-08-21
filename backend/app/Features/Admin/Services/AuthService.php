<?php
namespace App\Features\Admin\Services;

use App\Features\Admin\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\Hash;
use App\Features\Admin\Constants\Code;

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

}
