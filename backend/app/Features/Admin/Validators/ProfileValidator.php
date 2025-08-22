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
        ];
    }

    protected function scenes()
    {
        return [
            'update_avatar' => ['avatar'],
            'send_email_reset_code' => ['email'],
            'update_email' => ['email', 'code'],
        ];
    }
}

