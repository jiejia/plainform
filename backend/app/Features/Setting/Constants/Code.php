<?php
namespace App\Features\Setting\Constants;

enum Code: int
{
    case OPTION_NOT_FOUND = 30001;

    public function message(): string
    {
        $key = match($this) {
            self::OPTION_NOT_FOUND => __('setting.option_not_found'),
        };

        return __($key);
    }

}
