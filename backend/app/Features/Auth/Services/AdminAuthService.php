<?php
namespace App\Features\Auth\Services;

use App\Features\Auth\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\Hash;
use App\Features\Auth\Constants\ErrorCode;

class AdminAuthService
{
    public function login(string $email, string $password)
    {
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException(ErrorCode::EMAIL_NOT_FOUND->message(), ErrorCode::EMAIL_NOT_FOUND->value);
        }
        if (!Hash::check($password, $admin->password)) {
            throw new BusinessException(ErrorCode::PASSWORD_INCORRECT->message(),  ErrorCode::PASSWORD_INCORRECT->value);
        }

        return $admin->createToken('admin_api')->plainTextToken;
    }

    public function logout()
    {

    }
}