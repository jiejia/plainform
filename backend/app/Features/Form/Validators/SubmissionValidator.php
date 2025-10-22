<?php
namespace App\Features\Form\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

/**
 * SubmissionValidator
 *
 * @package App\Features\Form\Validators
 */
class SubmissionValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            // list scene
            'version' => 'required|integer|min:1',
            'created_at_start' => 'nullable|date_format:Y-m-d H:i:s',
            'created_at_end' => 'nullable|date_format:Y-m-d H:i:s',
            'ip' => 'nullable|string|max:100',
            'dynamic_fields' => 'nullable|array',
            'dynamic_fields.*.field_name' => 'required|string|max:255',
            'dynamic_fields.*.where_type' => 'required|in:like,=,in,between',
            'dynamic_fields.*.value' => 'required',
            'dynamic_fields.*.control_type' => 'nullable|string|max:50',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
            'order_by' => 'nullable|in:id,created_at,ipv4,version',
            'order_type' => 'nullable|in:asc,desc',

            // delete scene
            'ids' => 'required|array|min:1',
            'ids.*' => 'required|integer|min:1',

            // fields scene  
            'version' => 'required|integer|min:0',

        ];
    }

    protected function messages()
    {
        return [
            'version.required' => 'version_required',
            'version.integer' => 'version_integer',
            'version.min' => 'version_min',
            'created_at_start.date_format' => 'created_at_start_date_format',
            'created_at_end.date_format' => 'created_at_end_date_format',
            'ip.string' => 'ip_string',
            'ip.max' => 'ip_max',
            'dynamic_fields.array' => 'dynamic_fields_array',
            'dynamic_fields.*.field_name.required' => 'dynamic_field_name_required',
            'dynamic_fields.*.field_name.string' => 'dynamic_field_name_string',
            'dynamic_fields.*.field_name.max' => 'dynamic_field_name_max',
            'dynamic_fields.*.where_type.required' => 'dynamic_where_type_required',
            'dynamic_fields.*.where_type.in' => 'dynamic_where_type_in',
            'dynamic_fields.*.where_type.between' => 'dynamic_where_type_between',
            'dynamic_fields.*.value.required' => 'dynamic_value_required',
            'dynamic_fields.*.control_type.string' => 'dynamic_control_type_string',
            'dynamic_fields.*.control_type.max' => 'dynamic_control_type_max',
            'page.integer' => 'page_integer',
            'page.min' => 'page_min',
            'per_page.integer' => 'per_page_integer',
            'per_page.min' => 'per_page_min',
            'per_page.max' => 'per_page_max',
            'order_by.in' => 'submission_order_by_in',
            'order_type.in' => 'submission_order_type_in',
            'ids.required' => 'submission_ids_required',
            'ids.array' => 'submission_ids_array',
            'ids.min' => 'submission_ids_min',
            'ids.*.required' => 'submission_ids_item_required',
            'ids.*.integer' => 'submission_ids_item_integer',
            'ids.*.min' => 'submission_ids_item_min',
            'version_for_fields.required' => 'version_for_fields_required',
            'version_for_fields.integer' => 'version_for_fields_integer',
            'version_for_fields.min' => 'version_for_fields_min',
        ];
    }

    protected function scenes()
    {
        return [
            'list' => ['version', 'created_at_start', 'created_at_end', 'ip', 'dynamic_fields', 'page', 'per_page', 'order_by', 'order_type'],
            'delete' => ['ids'],
            'fields' => ['version'],
            'export' => ['version', 'created_at_start', 'created_at_end', 'ip', 'dynamic_fields', 'order_by', 'order_type'],
        ];
    }
}
