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
            'avatar.required' => '头像文件不能为空',
            'avatar.file' => '头像必须是文件',
            'avatar.image' => '头像必须是图片文件',
            'avatar.mimes' => '头像文件格式必须是: jpeg, png, jpg, gif, svg',
            'avatar.max' => '头像文件大小不能超过2MB',
            'avatar_url.required' => '头像URL不能为空',
            'avatar_url.string' => '头像URL必须是字符串',
            'avatar_url.max' => '头像URL不能超过255个字符',
            'avatar_url.url' => '头像URL必须是有效的URL',
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
            'upload_avatar' => ['avatar'],
            'update_avatar' => ['avatar_url'],
            'send_email_reset_code' => ['email'],
            'update_email' => ['email', 'code'],
            'update_password' => ['old_password', 'password', 'password_confirmation'],
        ];
    }
}

