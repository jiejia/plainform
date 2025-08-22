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
            'email.required' => '邮箱不能为空',
            'email.email' => '邮箱格式不正确',
            'password.required' => '密码不能为空',
            'password.string' => '密码必须是字符串',
            'password.min' => '密码长度不能小于6位',
            'password.max' => '密码长度不能大于100位',
            'password_confirmation.required' => '确认密码不能为空',
            'password_confirmation.string' => '确认密码必须是字符串',
            'password_confirmation.same' => '确认密码与密码不一致',
            'reset_password_token.required' => '重置密码token不能为空',
            'reset_password_token.string' => '重置密码token必须是字符串',
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