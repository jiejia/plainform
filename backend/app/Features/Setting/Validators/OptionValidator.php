<?php
namespace App\Features\Setting\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class OptionValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'group' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:255',
            'update_group' => 'required|string|max:255',
            'update_name' => 'required|string|max:255',
            'update_data' => 'required|array',
        ];
    }

    protected function messages()
    {
        return [
            'group.string' => '分组必须是字符串',
            'group.max' => '分组不能超过255个字符',
            'name.string' => '名称必须是字符串',
            'name.max' => '名称不能超过255个字符',
            'update_group.required' => '分组不能为空',
            'update_group.string' => '分组必须是字符串',
            'update_group.max' => '分组不能超过255个字符',
            'update_name.required' => '名称不能为空',
            'update_name.string' => '名称必须是字符串',
            'update_name.max' => '名称不能超过255个字符',
            'update_data.required' => '数据不能为空',
            'update_data.array' => '数据必须是数组',
        ];
    }
    
    protected function scenes()
    {
        return [
            'get' => ['group', 'name'],
            'set' => ['update_group', 'update_name', 'update_data'],
        ];
    }
}