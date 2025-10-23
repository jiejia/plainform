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
            'title.required' => 'form.title_required',
            'title.string' => 'form.title_string',
            'title.max' => 'form.title_max',
            'description.string' => 'form.description_string',
            'description.max' => 'form.description_max',
            'enabled.required' => 'form.enabled_required',
            'enabled.boolean' => 'form.enabled_boolean',
            'numbering_style.required' => 'form.numbering_style_required',
            'numbering_style.in' => 'form.numbering_style_in',
            'fields.required' => 'form.fields_required',
            'fields.array' => 'form.fields_array',
            'fields.*.uuid.required' => 'form.field_uuid_required',
            'fields.*.uuid.string' => 'form.field_uuid_string',
            'fields.*.uuid.size' => 'form.field_uuid_size',
            'fields.*.title.required' => 'form.field_title_required',
            'fields.*.title.string' => 'form.field_title_string',
            'fields.*.title.max' => 'form.field_title_max',
            'fields.*.description.required' => 'form.field_description_required',
            'fields.*.description.string' => 'form.field_description_string',
            'fields.*.description.max' => 'form.field_description_max',
            'fields.*.regex.required' => 'form.field_regex_required',
            'fields.*.regex.string' => 'form.field_regex_string',
            'fields.*.regex.max' => 'form.field_regex_max',
            'fields.*.required.boolean' => 'form.field_required_boolean',
            'fields.*.config.required' => 'form.field_config_required',
            'fields.*.config.array' => 'form.field_config_array',
            'fields.*.control_id.required' => 'form.field_control_id_required',
            'fields.*.control_id.string' => 'form.field_control_id_string',
            'fields.*.control_id.size' => 'form.field_control_id_size',
            'fields.*.control_type.required' => 'form.field_control_type_required',
            'fields.*.control_type.string' => 'form.field_control_type_string',
            'fields.*.control_type.in' => 'form.field_control_type_in',
            'fields.*.control_name.required' => 'form.field_control_name_required',
            'fields.*.control_name.string' => 'form.field_control_name_string',
            'fields.*.control_name.max' => 'form.field_control_name_max',
            'fields.*.sort.required' => 'form.field_sort_required',
            'fields.*.sort.integer' => 'form.field_sort_integer',
            'id.required' => 'form.id_required',
            'id.integer' => 'form.id_integer',
            'keyword.string' => 'form.keyword_string',
            'keyword.max' => 'form.keyword_max',
            'created_at_start.date_format' => 'form.created_at_start_date_format',
            'created_at_end.date_format' => 'form.created_at_end_date_format',
            'submissions_count_start.integer' => 'form.submissions_count_start_integer',
            'submissions_count_end.integer' => 'form.submissions_count_end_integer',
            'status.integer' => 'form.status_integer',
            'status.in' => 'form.status_in',
            'order_by.in' => 'form.order_by_in',
            'order_type.in' => 'form.order_type_in',
            'ids.required' => 'form.ids_required',
            'ids.array' => 'form.ids_array',
            'ids.*.required' => 'form.ids_item_required',
            'ids.*.integer' => 'form.ids_item_integer',
            'items.required' => 'form.items_required',
            'items.array' => 'form.items_array',
            'items.min' => 'form.items_min',
            'items.*.id.required' => 'form.items_id_required',
            'items.*.id.integer' => 'form.items_id_integer',
            'items.*.id.exists' => 'form.items_id_exists',
            'items.*.enabled.required' => 'form.items_enabled_required',
            'items.*.enabled.boolean' => 'form.items_enabled_boolean',
            'data.required' => 'form.data_required',
            'data.array' => 'form.data_array',
            'data.*.name.required' => 'form.data_name_required',
            'data.*.name.string' => 'form.data_name_string',
            'data.*.value.present' => 'form.data_value_present',
            'version.integer' => 'form.version_integer',
            'version.min' => 'form.version_min',
            'visitor_id.required' => 'form.visitor_id_required',
            'visitor_id.string' => 'form.visitor_id_string',
            'user_agent.string' => 'form.user_agent_string',
            'user_agent.max' => 'form.user_agent_max',
            'period_type.required' => 'form.period_type_required',
            'period_type.in' => 'form.period_type_in',
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
