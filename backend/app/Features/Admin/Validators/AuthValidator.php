<?php
namespace App\Features\Admin\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class AuthValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:100',
            'password_confirmation' => 'required|string|same:password',
            'reset_password_token' => 'required|string|max:255',
        ];
    }

    protected function messages()
    {
        return [
            'email.required' => 'admin.email_required',
            'email.email' => 'admin.email_invalid',
            'password.required' => 'admin.password_required',
            'password.string' => 'admin.password_string',
            'password.min' => 'admin.password_min',
            'password.max' => 'admin.password_max',
            'password_confirmation.required' => 'admin.password_confirmation_required',
            'password_confirmation.string' => 'admin.password_confirmation_string',
            'password_confirmation.same' => 'admin.password_confirmation_same',
            'reset_password_token.required' => 'admin.reset_password_token_required',
            'reset_password_token.string' => 'admin.reset_password_token_string',
        ];
    }
    
    protected function scenes()
    {
        return [
            'login' => ['email', 'password'],
            'send_forget_password_email' => ['email'],
            'reset_password' => ['email', 'password', 'password_confirmation', 'reset_password_token'],
        ];
    }
}