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
            'description' => 'required|string|max:255',
            'enabled' => 'required|in:0,1',
            'numbering_style' => 'required|in:1,2,3',
            'fields' => 'required|array|min:1',
            'fields.*.uuid' => 'required|string|size:36',
            'fields.*.title' => 'required|string|max:255',
            'fields.*.description' => 'present|nullable|max:255',
            'fields.*.regex' => 'present|nullable|string|max:255',
            'fields.*.required' => 'required|in:0,1',
            'fields.*.config' => 'present|nullable|array',
            'fields.*.control_id' => 'required|integer',
            'fields.*.control_type' => 'required|string|in:text,textarea,select,radio,checkbox,date,time,datetime,number,email,url,file,image,video,audio',
            'fields.*.control_name' => 'required|string|max:255',
            'fields.*.sort' => 'required|integer',

            'keyword' => 'nullable|string|max:100',
            'created_at_start' => 'nullable|date_format:Y-m-d H:i:s',
            'created_at_end' => 'nullable|date_format:Y-m-d H:i:s',
            'submissions_count_start' => 'nullable|integer',
            'submissions_count_end' => 'nullable|integer',
            'status' => 'nullable|array',
            'status.*' => 'in:0,1,3',
            'order_by' => 'nullable|in:id,submissions_count,title,status',
            'order_type' => 'nullable|in:asc,desc',

            'ids' => 'required|array',
            'ids.*' => 'required|integer',
        ];
    }

    protected function messages()
    {
        return [
            'title.required' => '标题不能为空',
            'title.string' => '标题必须是字符串',
            'title.max' => '标题不能超过255个字符',
            'description.required' => '描述不能为空',
            'description.string' => '描述必须是字符串',
            'description.max' => '描述不能超过255个字符',
            'enabled.required' => '是否启用不能为空',
            'enabled.in' => '是否启用必须是0或1',
            'numbering_style.required' => '编号样式不能为空',
            'numbering_style.in' => '编号样式必须是1、2、3',
            'fields.required' => '字段不能为空',
            'fields.array' => '字段必须是数组',
            'fields.*.uuid.required' => '字段UUID不能为空',
            'fields.*.uuid.string' => '字段UUID必须是字符串',
            'fields.*.uuid.size' => '字段UUID必须是36个字符',
            'fields.*.title.required' => '字段标题不能为空',
            'fields.*.title.string' => '字段标题必须是字符串',
            'fields.*.title.max' => '字段标题不能超过255个字符',
            'fields.*.description.required' => '字段描述不能为空',
            'fields.*.description.string' => '字段描述必须是字符串',
            'fields.*.description.max' => '字段描述不能超过255个字符',
            'fields.*.regex.required' => '字段正则不能为空',
            'fields.*.regex.string' => '字段正则必须是字符串',
            'fields.*.regex.max' => '字段正则不能超过255个字符',
            'fields.*.required.required' => '字段是否必填不能为空',
            'fields.*.required.in' => '字段是否必填必须是0或1',
            'fields.*.config.required' => '字段配置不能为空',
            'fields.*.config.array' => '字段配置必须是数组',
            'fields.*.control_id.required' => '字段ID不能为空',
            'fields.*.control_id.string' => '字段ID必须是字符串',
            'fields.*.control_id.size' => '字段ID必须是36个字符',
            'fields.*.control_type.required' => '字段类型不能为空',
            'fields.*.control_type.string' => '字段类型必须是字符串',
            'fields.*.control_type.in' => '字段类型必须是text、textarea、select、radio、checkbox、date、time、datetime、number、email、url、file、image、video、audio',
            'fields.*.control_name.required' => '字段名称不能为空',
            'fields.*.control_name.string' => '字段名称必须是字符串',
            'fields.*.control_name.max' => '字段名称不能超过255个字符',
            'fields.*.sort.required' => '字段排序不能为空',
            'fields.*.sort.integer' => '字段排序必须是整数',
            'id.required' => 'ID不能为空',
            'id.integer' => 'ID必须是整数',
            'keyword.string' => '关键词必须是字符串',
            'keyword.max' => '关键词不能超过100个字符',
            'created_at_start.date_format' => '创建时间开始必须是Y-m-d H:i:s格式',
            'created_at_end.date_format' => '创建时间结束必须是Y-m-d H:i:s格式',
            'submissions_count_start.integer' => '提交数量开始必须是整数',
            'submissions_count_end.integer' => '提交数量结束必须是整数',
            'status.array' => '状态必须是数组',
            'status.*.in' => '状态必须是0、1、3',
            'order_by.in' => '排序必须是id、submissions_count、title、status',
            'order_type.in' => '排序类型必须是asc、desc',
            'ids.required' => 'ID不能为空',
            'ids.array' => 'ID必须是数组',
            'ids.*.required' => 'ID不能为空',
            'ids.*.integer' => 'ID必须是整数',
        ];
    }

    protected function scenes()
    {
        return [
            'create' => ['title', 'description', 'enabled', 'numbering_style', 'fields','fields.*.uuid','fields.*.title','fields.*.description','fields.*.regex','fields.*.required','fields.*.config','fields.*.control_id','fields.*.control_type','fields.*.control_name','fields.*.sort'],
            'update' => ['title', 'description', 'enabled', 'numbering_style', 'fields','fields.*.uuid','fields.*.title','fields.*.description','fields.*.regex','fields.*.required','fields.*.config','fields.*.control_id','fields.*.control_type','fields.*.control_name','fields.*.sort'],
            'list' => ['keyword', 'created_at_start', 'created_at_end', 'submissions_count_start', 'submissions_count_end', 'status', 'order_by', 'order_type'],
            'delete' => ['ids'],
        ];
    }
}
