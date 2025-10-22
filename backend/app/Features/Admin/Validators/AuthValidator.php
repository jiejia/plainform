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
            'email.required' => 'email_required',
            'email.email' => 'email_invalid',
            'password.required' => 'password_required',
            'password.string' => 'password_string',
            'password.min' => 'password_min',
            'password.max' => 'password_max',
            'password_confirmation.required' => 'password_confirmation_required',
            'password_confirmation.string' => 'password_confirmation_string',
            'password_confirmation.same' => 'password_confirmation_same',
            'reset_password_token.required' => 'reset_password_token_required',
            'reset_password_token.string' => 'reset_password_token_string',
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