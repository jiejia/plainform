<?php
namespace App\Features\Dashboard\Validators;

use App\Features\Core\Abstracts\AbstractValidator;

/**
 * IndexValidator
 *
 * @package App\Features\Dashboard\Validators
 */
class IndexValidator extends AbstractValidator
{
    protected function rules()
    {
        return [
            'period_type' => 'required|in:today,week,month,all',
        ];
    }

    protected function messages()
    {
        return [
            'period_type.required' => __('dashboard.period_type_required'),
            'period_type.in' => __('dashboard.period_type_in'),
        ];
    }

    protected function scenes()
    {
        return [
            'statistic' => ['period_type'],
        ];
    }
}

