<?php
namespace App\Features\Admin\Constants;

enum Code: int
{
    case EMAIL_NOT_FOUND = 20001;

    case PASSWORD_INCORRECT = 20002;

    case PASSWORD_RESET_TOKEN_NOT_FOUND = 20003;

    case PASSWORD_RESET_TOKEN_EXPIRED = 20004;

    public function message(): string
    {
        $key = match($this) {
            self::EMAIL_NOT_FOUND => __('auth.email_not_found'),
            self::PASSWORD_INCORRECT => __('auth.password'),
            self::PASSWORD_RESET_TOKEN_NOT_FOUND => __('auth.password_reset_token_not_found'),
            self::PASSWORD_RESET_TOKEN_EXPIRED => __('auth.password_reset_token_expired'),
        };

        return __($key);
    }

}
