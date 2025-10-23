<?php
namespace App\Features\Setting\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

class OptionValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'group' => 'nullable|array',
            'name' => 'nullable|array',
            'update_group' => 'required|string|max:255',
            'update_name' => 'required|string|max:255',
            'update_data' => 'required',
        ];
    }

    protected function messages()
    {
        return [
            'group.string' => 'setting.group_string',
            'group.max' => 'setting.group_max',
            'name.string' => 'setting.name_string',
            'name.max' => 'setting.name_max',
            'update_group.required' => 'setting.update_group_required',
            'update_group.string' => 'setting.update_group_string',
            'update_group.max' => 'setting.update_group_max',
            'update_name.required' => 'setting.update_name_required',
            'update_name.string' => 'setting.update_name_string',
            'update_name.max' => 'setting.update_name_max',
            'update_data.required' => 'setting.update_data_required',
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