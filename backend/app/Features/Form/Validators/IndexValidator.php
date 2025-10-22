<?php
namespace App\Features\Form\Validators;

use App\Features\Core\Abstracts\AbstractValidator;
/**
 * IndexValidator
 *
 * @package App\Features\Form\Validators
 */
class IndexValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'string|max:1000',
            'enabled' => 'required|boolean',
            'numbering_style' => 'required|in:0,1',
            'fields' => 'required|array|min:1',
            'fields.*.uuid' => 'required|string|size:36',
            'fields.*.title' => 'required|string|max:255',
            'fields.*.description' => 'present|nullable|max:255',
            'fields.*.regex' => 'present|nullable|string|max:255',
            'fields.*.required' => 'boolean',
            'fields.*.config' => 'present|nullable|array',
            'fields.*.control_id' => 'required|integer',
            'fields.*.control_type' => 'required|string|in:text,textarea,select,radio,checkbox,date,time,datetime,number,email,url,file,image,video,audio,switch',
            'fields.*.control_name' => 'required|string|max:255',
            'fields.*.sort' => 'required|integer',

            'keyword' => 'nullable|string|max:100',
            'created_at_start' => 'nullable|date_format:Y-m-d',
            'created_at_end' => 'nullable|date_format:Y-m-d',
            'submissions_count_start' => 'nullable|integer',
            'submissions_count_end' => 'nullable|integer',
            'status' => 'nullable|integer|in:0,1',
            'order_by' => 'nullable|in:id,submissions_count,title,enabled',
            'order_type' => 'nullable|in:asc,desc',

            'ids' => 'required|array',
            'ids.*' => 'required|integer',

            'items' => 'required|array|min:1',
            'items.*.id' => 'required|integer|exists:forms,id',
            'items.*.enabled' => 'required|boolean',

            'data' => 'present|nullable|array',
            'data.*.name' => 'required|string',
            'data.*.value' => 'present',
            'version' => 'nullable|integer|min:1',
            'visitor_id' => 'required|string',
            'user_agent' => 'nullable|string|max:500',

            'period_type' => 'required|in:today,week,month,all',
        ];
    }

    protected function messages()
    {
        return [
            'title.required' => 'title_required',
            'title.string' => 'title_string',
            'title.max' => 'title_max',
            'description.string' => 'description_string',
            'description.max' => 'description_max',
            'enabled.required' => 'enabled_required',
            'enabled.boolean' => 'enabled_boolean',
            'numbering_style.required' => 'numbering_style_required',
            'numbering_style.in' => 'numbering_style_in',
            'fields.required' => 'fields_required',
            'fields.array' => 'fields_array',
            'fields.*.uuid.required' => 'field_uuid_required',
            'fields.*.uuid.string' => 'field_uuid_string',
            'fields.*.uuid.size' => 'field_uuid_size',
            'fields.*.title.required' => 'field_title_required',
            'fields.*.title.string' => 'field_title_string',
            'fields.*.title.max' => 'field_title_max',
            'fields.*.description.required' => 'field_description_required',
            'fields.*.description.string' => 'field_description_string',
            'fields.*.description.max' => 'field_description_max',
            'fields.*.regex.required' => 'field_regex_required',
            'fields.*.regex.string' => 'field_regex_string',
            'fields.*.regex.max' => 'field_regex_max',
            'fields.*.required.boolean' => 'field_required_boolean',
            'fields.*.config.required' => 'field_config_required',
            'fields.*.config.array' => 'field_config_array',
            'fields.*.control_id.required' => 'field_control_id_required',
            'fields.*.control_id.string' => 'field_control_id_string',
            'fields.*.control_id.size' => 'field_control_id_size',
            'fields.*.control_type.required' => 'field_control_type_required',
            'fields.*.control_type.string' => 'field_control_type_string',
            'fields.*.control_type.in' => 'field_control_type_in',
            'fields.*.control_name.required' => 'field_control_name_required',
            'fields.*.control_name.string' => 'field_control_name_string',
            'fields.*.control_name.max' => 'field_control_name_max',
            'fields.*.sort.required' => 'field_sort_required',
            'fields.*.sort.integer' => 'field_sort_integer',
            'id.required' => 'id_required',
            'id.integer' => 'id_integer',
            'keyword.string' => 'keyword_string',
            'keyword.max' => 'keyword_max',
            'created_at_start.date_format' => 'created_at_start_date_format',
            'created_at_end.date_format' => 'created_at_end_date_format',
            'submissions_count_start.integer' => 'submissions_count_start_integer',
            'submissions_count_end.integer' => 'submissions_count_end_integer',
            'status.integer' => 'status_integer',
            'status.in' => 'status_in',
            'order_by.in' => 'order_by_in',
            'order_type.in' => 'order_type_in',
            'ids.required' => 'ids_required',
            'ids.array' => 'ids_array',
            'ids.*.required' => 'ids_item_required',
            'ids.*.integer' => 'ids_item_integer',
            'items.required' => 'items_required',
            'items.array' => 'items_array',
            'items.min' => 'items_min',
            'items.*.id.required' => 'items_id_required',
            'items.*.id.integer' => 'items_id_integer',
            'items.*.id.exists' => 'items_id_exists',
            'items.*.enabled.required' => 'items_enabled_required',
            'items.*.enabled.boolean' => 'items_enabled_boolean',
            'data.required' => 'data_required',
            'data.array' => 'data_array',
            'data.*.name.required' => 'data_name_required',
            'data.*.name.string' => 'data_name_string',
            'data.*.value.present' => 'data_value_present',
            'version.integer' => 'version_integer',
            'version.min' => 'version_min',
            'visitor_id.required' => 'visitor_id_required',
            'visitor_id.string' => 'visitor_id_string',
            'user_agent.string' => 'user_agent_string',
            'user_agent.max' => 'user_agent_max',
            'period_type.required' => 'period_type_required',
            'period_type.in' => 'period_type_in',
        ];
    }

    protected function scenes()
    {
        return [
            'create' => ['title', 'description', 'enabled', 'numbering_style', 'fields','fields.*.uuid','fields.*.title','fields.*.description','fields.*.regex','fields.*.required','fields.*.config','fields.*.control_id','fields.*.control_type','fields.*.control_name','fields.*.sort'],
            'update' => ['title', 'description', 'enabled', 'numbering_style', 'fields','fields.*.uuid','fields.*.title','fields.*.description','fields.*.regex','fields.*.required','fields.*.config','fields.*.control_id','fields.*.control_type','fields.*.control_name','fields.*.sort'],
            'list' => ['keyword', 'created_at_start', 'created_at_end', 'submissions_count_start', 'submissions_count_end', 'status', 'order_by', 'order_type'],
            'delete' => ['ids'],
            'batch_update_enabled' => ['items', 'items.*.id', 'items.*.enabled'],
            'submit' => ['data', 'data.*.name', 'data.*.value', 'version', 'visitor_id', 'user_agent'],
            'view' => ['version', 'visitor_id', 'user_agent'],
            'statistics' => ['version', 'period_type'],
        ];
    }
}
