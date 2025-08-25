<?php
namespace App\Features\Form\Constants;

enum Code: int
{
    case FORM_NOT_FOUND = 40001;
    case FORM_FIELD_UUID_EXISTS = 40002;
    
    public function message(): string
    {
        $key = match($this) {
            self::FORM_NOT_FOUND => __('form.form_not_found'),
            self::FORM_FIELD_UUID_EXISTS => __('form.form_field_uuid_exists'),
        };

        return __($key);
    }

}
