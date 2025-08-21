<?php

namespace App\Features\Admin\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

/**
 * Admin
 *
 * @package App\Features\Admin\Models
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string $avatar
 * @property string $last_logined_at
 * @property string $nickname
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 */
class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'admins';

    protected $fillable = [
        'username',
        'email',
        'password',
        'avatar',
        'last_logined_at',
        'nickname',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime:Y-m-d H:i:s',
            'password' => 'hashed',
            'last_logined_at' => 'datetime:Y-m-d H:i:s',
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
            'deleted_at' => 'datetime:Y-m-d H:i:s',
        ];
    }
}
