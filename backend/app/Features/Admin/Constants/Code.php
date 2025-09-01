<?php
namespace App\Features\Admin\Constants;

enum Code: int
{
    case EMAIL_NOT_FOUND = 20001;

    case PASSWORD_INCORRECT = 20002;

    case PASSWORD_RESET_TOKEN_NOT_FOUND = 20003;

    case PASSWORD_RESET_TOKEN_EXPIRED = 20004;

    case EMAIL_VERIFY_CODE_ERROR = 20005;

    case PASSWORD_ERROR = 20006;

    case PASSWORD_SAME = 20007;

    case TOKEN_GENERATION_TOO_FREQUENT = 20008;

    case EMAIL_SAME = 20009;

    case EMAIL_OTHER_FOUND = 20010;

    public function message(): string
    {
        $key = match($this) {
            self::EMAIL_NOT_FOUND => __('auth.email_not_found'),
            self::PASSWORD_INCORRECT => __('auth.password'),
            self::PASSWORD_RESET_TOKEN_NOT_FOUND => __('auth.password_reset_token_not_found'),
            self::PASSWORD_RESET_TOKEN_EXPIRED => __('auth.password_reset_token_expired'),
            self::EMAIL_VERIFY_CODE_ERROR => __('auth.email_verify_code_error'),
            self::PASSWORD_ERROR => __('auth.password_error'),
            self::PASSWORD_SAME => __('auth.password_same'),
            self::TOKEN_GENERATION_TOO_FREQUENT => __('auth.token_generation_too_frequent'),
            self::EMAIL_SAME => __('auth.email_same'),
            self::EMAIL_OTHER_FOUND => __('auth.email_other_found'),
        };

        return __($key);
    }

}
