<?php

namespace App\Features\Auth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasApiTokens, SoftDeletes;

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
        'password'
    ];
}
