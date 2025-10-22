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
            'group.string' => 'group_string',
            'group.max' => 'group_max',
            'name.string' => 'name_string',
            'name.max' => 'name_max',
            'update_group.required' => 'update_group_required',
            'update_group.string' => 'update_group_string',
            'update_group.max' => 'update_group_max',
            'update_name.required' => 'update_name_required',
            'update_name.string' => 'update_name_string',
            'update_name.max' => 'update_name_max',
            'update_data.required' => 'update_data_required',
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