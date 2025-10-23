<?php
namespace App\Features\Form\Constants;

enum Code: int
{
    case FORM_NOT_FOUND = 40001;
    case FORM_FIELD_UUID_EXISTS = 40002;
    case FORM_HAS_SUBMISSIONS = 40003;
    case SUBMISSION_NOT_FOUND = 40004;
    case FILE_NOT_FOUND = 40005;
    case FORM_FIELD_REQUIRED = 40006;
    case FORM_FIELD_INVALID_EMAIL = 40007;
    case FORM_FIELD_INVALID_URL = 40008;
    case FORM_FIELD_INVALID_NUMBER = 40009;
    case FORM_FIELD_INVALID_DATE = 40010;
    case FORM_FIELD_INVALID_REGEX = 40011;
    case FORM_FIELD_CONFIG_REGEX_FAILED = 40012;
    case FORM_ALREADY_SUBMITTED = 40013;
    
    public function message(): string
    {
        return match($this) {
            self::FORM_NOT_FOUND => 'form.form_not_found',
            self::FORM_FIELD_UUID_EXISTS => 'form.form_field_uuid_exists',
            self::FORM_HAS_SUBMISSIONS => 'form.form_has_submissions',
            self::SUBMISSION_NOT_FOUND => 'form.submission_not_found',
            self::FILE_NOT_FOUND => 'form.file_not_found',
            self::FORM_FIELD_REQUIRED => 'form.form_field_required',
            self::FORM_FIELD_INVALID_EMAIL => 'form.form_field_invalid_email',
            self::FORM_FIELD_INVALID_URL => 'form.form_field_invalid_url',
            self::FORM_FIELD_INVALID_NUMBER => 'form.form_field_invalid_number',
            self::FORM_FIELD_INVALID_DATE => 'form.form_field_invalid_date',
            self::FORM_FIELD_INVALID_REGEX => 'form.form_field_invalid_regex',
            self::FORM_FIELD_CONFIG_REGEX_FAILED => 'form.form_field_config_regex_failed',
            self::FORM_ALREADY_SUBMITTED => 'form.form_already_submitted',
        };
    }

}
