<?php
namespace App\Features\Core\Constants;

enum Code: int
{
    case BUSINESS_LOGIC_ERROR = 10000;
    case INVALID_TOKEN = 10001;
    case VALIDATION_ERROR = 10002;
    case SUCCESS = 0;
    case EMAIL_VERIFY_CODE_ERROR = 10003;

    public function message(): string
    {
        $key = match($this) {
            self::BUSINESS_LOGIC_ERROR => __('core.business_logic_error'),
            self::INVALID_TOKEN => 'core.invalid_token',
            self::VALIDATION_ERROR => 'core.validation_error',
            self::SUCCESS => 'core.success',
            self::EMAIL_VERIFY_CODE_ERROR => __('core.email_verify_code_error'),
        };

        return __($key);
    }
}