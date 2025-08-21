<?php
namespace App\Features\Admin\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class ProfileValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'name' => 'required|string|max:255',
        ];
    }

    protected function messages()
    {
        return [
            'name.required' => '名称不能为空',
        ];
    }

    protected function scenes()
    {
        return [
            'update' => ['name'],
        ];
    }
}

