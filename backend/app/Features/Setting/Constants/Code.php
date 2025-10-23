<?php
namespace App\Features\Setting\Constants;

enum Code: int
{
    case OPTION_NOT_FOUND = 30001;

    public function message(): string
    {
        return match($this) {
            self::OPTION_NOT_FOUND => 'setting.option_not_found',
        };
    }

}
