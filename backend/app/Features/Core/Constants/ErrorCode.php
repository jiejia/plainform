<?php
namespace App\Features\Core\Constants;

enum ErrorCode: int
{
    case BUSINESS_LOGIC_ERROR = 10000;
    case INVALID_TOKEN = 10001;

    public function message(): string
    {
        $key = match($this) {
            self::BUSINESS_LOGIC_ERROR => 'core.business_logic_error',
            self::INVALID_TOKEN => 'core.invalid_token',
        };

        return __($key);
    }
}