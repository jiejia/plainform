<?php

namespace App\Features\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    protected $primaryKey = 'email';

    protected $table = 'password_reset_tokens';

    protected $fillable = [
        'email',
        'token',
        'created_at',
    ];

    public $timestamps = false;
    
}