<?php
namespace App\Features\Admin\Services;

use App\Features\Admin\Models\Admin;
use App\Features\Core\Exceptions\BusinessException;
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
}