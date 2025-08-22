<?php
namespace App\Features\Admin\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class ProfileValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'avatar' => 'required|string|max:255|url',
            'old_password' => 'required|string|max:255',
            'new_password' => 'required|string|max:255',
            'new_password_confirmation' => 'required|string|max:255',
        ];
    }

    protected function messages()
    {
        return [
            'avatar.required' => '头像不能为空',
            'avatar.string' => '头像必须是字符串',
            'avatar.max' => '头像不能超过255个字符',
            'avatar.url' => '头像必须是有效的URL',
        ];
    }

    protected function scenes()
    {
        return [
            'update_avatar' => ['avatar'],
        ];
    }
}

