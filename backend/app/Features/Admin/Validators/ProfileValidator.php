<?php
namespace App\Features\Admin\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class ProfileValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'avatar' => 'required|string|max:255|url',
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
            'avatar.required' => '头像不能为空',
            'avatar.string' => '头像必须是字符串',
            'avatar.max' => '头像不能超过255个字符',
            'avatar.url' => '头像必须是有效的URL',
            'email.required' => '邮箱不能为空',
            'email.email' => '邮箱格式不正确',
            'email.max' => '邮箱不能超过255个字符',
            'code.required' => '验证码不能为空',
            'code.string' => '验证码必须是字符串',
            'code.max' => '验证码不能超过255个字符',
            'old_password.required' => '旧密码不能为空',
            'old_password.string' => '旧密码必须是字符串',
            'old_password.max' => '旧密码不能超过255个字符',
            'password.required' => '密码不能为空',
            'password.string' => '密码必须是字符串',
            'password.max' => '密码不能超过255个字符',
            'password.min' => '密码不能少于6个字符',
            'password_confirmation.required' => '确认密码不能为空',
            'password_confirmation.string' => '确认密码必须是字符串',
            'password_confirmation.max' => '确认密码不能超过255个字符',
        ];
    }

    protected function scenes()
    {
        return [
            'update_avatar' => ['avatar'],
            'send_email_reset_code' => ['email'],
            'update_email' => ['email', 'code'],
            'update_password' => ['old_password', 'password', 'password_confirmation'],
        ];
    }
}

