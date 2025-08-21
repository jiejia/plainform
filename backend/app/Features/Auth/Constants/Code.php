<?php
namespace App\Features\Auth\Constants;

enum Code: int
{
    case EMAIL_NOT_FOUND = 20001;

    case PASSWORD_INCORRECT = 20002;  
    
    public function message(): string
    {
        $key = match($this) {
            self::EMAIL_NOT_FOUND => 'auth.email_not_found',
            self::PASSWORD_INCORRECT => 'auth.password',
        };

        return __($key);
    }
    
}