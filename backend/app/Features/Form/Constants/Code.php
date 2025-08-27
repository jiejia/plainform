<?php
namespace App\Features\Form\Constants;

enum Code: int
{
    case FORM_NOT_FOUND = 40001;
    case FORM_FIELD_UUID_EXISTS = 40002;
    case FORM_HAS_SUBMISSIONS = 40003;
    case SUBMISSION_NOT_FOUND = 40004;
    case FILE_NOT_FOUND = 40005;
    
    public function message(): string
    {
        $key = match($this) {
            self::FORM_NOT_FOUND => __('form.form_not_found'),
            self::FORM_FIELD_UUID_EXISTS => __('form.form_field_uuid_exists'),
            self::FORM_HAS_SUBMISSIONS => __('form.form_has_submissions'),
            self::SUBMISSION_NOT_FOUND => __('form.submission_not_found'),
            self::FILE_NOT_FOUND => __('form.file_not_found'),
        };

        return __($key);
    }

}
