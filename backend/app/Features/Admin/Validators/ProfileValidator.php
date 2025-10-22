<?php
namespace App\Features\Admin\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class ProfileValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'avatar' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'avatar_url' => 'required|string|max:255|url',
            'email' => 'required|email|max:255',
            'code' => 'required|string|max:255',
            'old_password' => 'required|string|max:100',
            'password' => 'required|string|max:100|min:6',
            'password_confirmation' => 'required|same:password',
        ];
    }

    protected function messages()
    {
        return [
            'avatar.required' => 'avatar_required',
            'avatar.file' => 'avatar_file',
            'avatar.image' => 'avatar_image',
            'avatar.mimes' => 'avatar_mimes',
            'avatar.max' => 'avatar_max',
            'avatar_url.required' => 'avatar_url_required',
            'avatar_url.string' => 'avatar_url_string',
            'avatar_url.max' => 'avatar_url_max',
            'avatar_url.url' => 'avatar_url_url',
            'email.required' => 'email_required',
            'email.email' => 'email_invalid',
            'email.max' => 'email_max',
            'code.required' => 'code_required',
            'code.string' => 'code_string',
            'code.max' => 'code_max',
            'old_password.required' => 'old_password_required',
            'old_password.string' => 'old_password_string',
            'old_password.max' => 'old_password_max',
            'password.required' => 'password_required',
            'password.string' => 'password_string',
            'password.max' => 'password_max',
            'password.min' => 'password_min',
            'password_confirmation.required' => 'password_confirmation_required',
            'password_confirmation.string' => 'password_confirmation_string',
            'password_confirmation.max' => 'password_confirmation_max',
        ];
    }

    protected function scenes()
    {
        return [
            'upload_avatar' => ['avatar'],
            'update_avatar' => ['avatar_url'],
            'send_email_reset_code' => ['email'],
            'update_email' => ['email', 'code'],
            'update_password' => ['old_password', 'password', 'password_confirmation'],
        ];
    }
}

