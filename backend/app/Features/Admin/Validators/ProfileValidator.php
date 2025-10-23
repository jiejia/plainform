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
            'avatar.required' => 'admin.avatar_required',
            'avatar.file' => 'admin.avatar_file',
            'avatar.image' => 'admin.avatar_image',
            'avatar.mimes' => 'admin.avatar_mimes',
            'avatar.max' => 'admin.avatar_max',
            'avatar_url.required' => 'admin.avatar_url_required',
            'avatar_url.string' => 'admin.avatar_url_string',
            'avatar_url.max' => 'admin.avatar_url_max',
            'avatar_url.url' => 'admin.avatar_url_url',
            'email.required' => 'admin.email_required',
            'email.email' => 'admin.email_invalid',
            'email.max' => 'admin.email_max',
            'code.required' => 'admin.code_required',
            'code.string' => 'admin.code_string',
            'code.max' => 'admin.code_max',
            'old_password.required' => 'admin.old_password_required',
            'old_password.string' => 'admin.old_password_string',
            'old_password.max' => 'admin.old_password_max',
            'password.required' => 'admin.password_required',
            'password.string' => 'admin.password_string',
            'password.max' => 'admin.password_max',
            'password.min' => 'admin.password_min',
            'password_confirmation.required' => 'admin.password_confirmation_required',
            'password_confirmation.string' => 'admin.password_confirmation_string',
            'password_confirmation.max' => 'admin.password_confirmation_max',
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

