<?php
namespace App\Features\Auth\Services;

use App\Features\Auth\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminAuthService
{
    public function login(string $username, string $password)
    {
        $admin = Admin::where('username', $username)->first();
        if (!$admin) {
            throw new \Exception('Admin not found');
        }
    }

    public function logout()
    {

    }
}