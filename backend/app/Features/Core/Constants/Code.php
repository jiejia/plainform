<?php
namespace App\Features\Core\Constants;

enum Code: int
{
    case BUSINESS_LOGIC_ERROR = 10000;
    case INVALID_TOKEN = 10001;
    case VALIDATION_ERROR = 10002;
    case SUCCESS = 0;

    public function message(): string
    {
        $key = match($this) {
            self::BUSINESS_LOGIC_ERROR => __('core.business_logic_error'),
            self::INVALID_TOKEN => 'core.invalid_token',
            self::VALIDATION_ERROR => 'core.validation_error',
            self::SUCCESS => 'core.success',
        };

        return __($key);
    }
}