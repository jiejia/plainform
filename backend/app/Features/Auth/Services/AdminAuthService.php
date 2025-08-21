<?php
namespace App\Features\Auth\Services;

use App\Features\Auth\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\Hash;
use App\Features\Auth\Constants\Code;

/**
 * AdminAuthService
 * 
 * @package App\Features\Auth\Services
 */
class AdminAuthService
{
    /**
     * login
     * 
     * @param string $email
     * @param string $password
     * @return string
     * @throws BusinessException
     */
    public function login(string $email, string $password)
    {
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(Code::EMAIL_NOT_FOUND->message(), Code::EMAIL_NOT_FOUND->value);
        }
        if (!Hash::check($password, $admin->password)) {
            throw new BusinessException(Code::PASSWORD_INCORRECT->message(),  Code::PASSWORD_INCORRECT->value);
        }

        return $admin->createToken('admin_api')->plainTextToken;
    }

}