<?php
namespace App\Features\Form\Services;

use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormSubmission;
use App\Features\Form\Constants\Code;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * SubmissionService
 * 
 * @package App\Features\Form\Services
 */
class SubmissionService
{
    /**
     * list
     * 
     * @param int $formId
     * @param int $version
     * @param string|null $createdAtStart
     * @param string|null $createdAtEnd
     * @param string|null $ip
     * @param array $dynamicFields
     * @param int $page
     * @param int $perPage
     * @param string|null $orderBy
     * @param string|null $orderType
     * @return array
     */
    public function list(int $formId, int $version, ?string $createdAtStart, ?string $createdAtEnd, ?string $ip, array $dynamicFields, int $page, int $perPage, ?string $orderBy = null, ?string $orderType = null): array
    {
        // Check if form exists
        $form = Form::find($formId);
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // Build query
        $query = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->select(['id', 'data', 'version', 'ipv4', 'created_at']);

        // Created time range search
        if ($createdAtStart) {
            $query->where('created_at', '>=', $createdAtStart);
        }
        if ($createdAtEnd) {
            $query->where('created_at', '<=', $createdAtEnd);
        }

        // IP search
        if ($ip) {
            $ipv4 = ip2long($ip);
            if ($ipv4 !== false) {
                $query->where('ipv4', $ipv4);
            }
        }

        // Dynamic field search
        foreach ($dynamicFields as $field) {
            $fieldName = $field['field_name'];
            $whereType = $field['where_type'];
            $value = $field['value'];

            switch ($whereType) {
                case 'like':
                    $query->whereRaw("data->>? LIKE ?", [$fieldName, "%{$value}%"]);
                    break;
                case '=':
                    $query->whereRaw("data->>? = ?", [$fieldName, $value]);
                    break;
                case 'in':
                    if (is_array($value) && !empty($value)) {
                        $placeholders = str_repeat('?,', count($value) - 1) . '?';
                        $query->whereRaw("data->>? IN ({$placeholders})", array_merge([$fieldName], $value));
                    }
                    break;
                case 'between':
                    $query->whereRaw("(data->>?)::numeric BETWEEN ? AND ?", [$fieldName, $value[0], $value[1]]);
                    break;
            }
        }

        // Sorting
        $orderBy = $orderBy ?: 'created_at';
        $orderType = $orderType ?: 'desc';
        $query->orderBy($orderBy, $orderType);

        // Pagination
        return $query->paginate(getPageLimit(), ['id', 'data', 'version', 'ipv4', 'created_at'])->toArray();
    }

    /**
     * detail
     * 
     * @param int $formId
     * @param int $id
     * @return array
     */
    public function detail(int $formId, int $id): array
    {
        // Check if form exists
        $form = Form::find($formId);
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // Query submission record
        $submission = FormSubmission::where('form_id', $formId)
            ->where('id', $id)
            ->select(['id', 'data', 'version', 'ipv4', 'created_at'])
            ->first();

        if (!$submission) {
            throw new BusinessException(Code::SUBMISSION_NOT_FOUND->message(), Code::SUBMISSION_NOT_FOUND->value);
        }

        return [
            'id' => $submission->id,
            'data' => $submission->data,
            'version' => $submission->version,
            'ip' => $submission->ipv4,
            'created_at' => $submission->created_at,
        ];
    }

    /**
     * delete
     * 
     * @param int $formId
     * @param array $ids
     * @return void
     */
    public function delete(int $formId, array $ids): void
    {
        // Check if form exists
        $form = Form::find($formId);
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        foreach ($ids as $id) {
            $submission = FormSubmission::where('form_id', $formId)
                ->where('id', $id)
                ->first();
            if (!$submission) {
                throw new BusinessException(Code::SUBMISSION_NOT_FOUND->message(), Code::SUBMISSION_NOT_FOUND->value);
            }
            $submission->delete();
        }
    }

    /**
     * getVersions
     * 
     * @param int $formId
     * @return array
     */
    public function getVersions(int $formId): array
    {
        // Check if form exists
        $form = Form::find($formId);
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // Get all version numbers
        $versions = FormSubmission::where('form_id', $formId)
            ->distinct()
            ->pluck('version')
            ->sort()
            ->values()
            ->toArray();

        return $versions;
    }

    /**
     * getFields
     * 
     * @param int $formId
     * @param int $version
     * @return array
     */
    public function getFields(int $formId, int $version): array
    {
        // Check if form exists
        $form = Form::find($formId);
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // Query one submission record for the specified version
        $submission = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->select(['data'])
            ->first();

        if (!$submission) {
            return [];
        }

        // Get all form field names from data field
        $data = $submission->data;
        if (!is_array($data)) {
            return [];
        }

        return array_keys($data);
    }
}
