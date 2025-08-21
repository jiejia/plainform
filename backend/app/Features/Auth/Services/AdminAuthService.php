<?php
namespace App\Features\Auth\Services;

use App\Features\Auth\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\Hash;

class AdminAuthService
{
    public function login(string $email, string $password)
    {
        $admin = Admin::where('email', $email)->first();
        if (!$admin) {
            throw new BusinessException('邮箱不存在');
        }
        if (!Hash::check($password, $admin->password)) {
            throw new BusinessException('密码错误');
        }

        return $admin->createToken('admin_api')->plainTextToken;
    }

    public function logout()
    {

    }
}