<?php
namespace App\Features\Auth\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class AdminAuthValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string|max:255',
        ];
    }

    protected function messages()
    {
        return [
            'email.required' => '邮箱不能为空',
            'email.email' => '邮箱格式不正确',
            'password.required' => '密码不能为空',
            'password.string' => '密码必须是字符串',
        ];
    }
    
    protected function scenes()
    {
        return [
            'login' => ['email', 'password'],
        ];
    }
}