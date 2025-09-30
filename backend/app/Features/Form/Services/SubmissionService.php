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

        // Sorting
        $orderBy = $orderBy ?: 'created_at';
        $orderType = $orderType ?: 'desc';
        $query->orderBy($orderBy, $orderType);

        // Get all results first
        $allSubmissions = $query->get();

        // Dynamic field filter in application layer
        if (!empty($dynamicFields)) {
            $allSubmissions = $allSubmissions->filter(function ($submission) use ($dynamicFields) {
                foreach ($dynamicFields as $field) {
                    $fieldName = $field['field_name'];
                    $whereType = $field['where_type'];
                    $value = $field['value'];

                    // Find the field in data array
                    $dataField = collect($submission->data)->firstWhere('name', $fieldName);
                    if (!$dataField) {
                        return false;
                    }

                    $fieldValue = $dataField['value'] ?? null;

                    switch ($whereType) {
                        case 'like':
                            if (stripos($fieldValue, $value) === false) {
                                return false;
                            }
                            break;
                        case '=':
                            if ($fieldValue != $value) {
                                return false;
                            }
                            break;
                        case 'in':
                            if (!in_array($fieldValue, $value)) {
                                return false;
                            }
                            break;
                        case 'between':
                            $numericValue = floatval($fieldValue);
                            if ($numericValue < $value[0] || $numericValue > $value[1]) {
                                return false;
                            }
                            break;
                    }
                }
                return true;
            })->values();
        }

        // Pagination
        $total = $allSubmissions->count();
        $items = $allSubmissions->forPage($page, $perPage)->values();

        return [
            'data' => $items->toArray(),
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $total,
            'last_page' => ceil($total / $perPage),
        ];
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

        // Extract field names from data array
        $fieldNames = [];
        foreach ($data as $field) {
            if (isset($field['name'])) {
                $fieldNames[] = $field['name'];
            }
        }

        return $fieldNames;
    }

    /**
     * export
     * 
     * @param int $formId
     * @param int $version
     * @param string|null $createdAtStart
     * @param string|null $createdAtEnd
     * @param string|null $ip
     * @param array $dynamicFields
     * @param string|null $orderBy
     * @param string|null $orderType
     * @return array
     */
    public function export(int $formId, int $version, ?string $createdAtStart, ?string $createdAtEnd, ?string $ip, array $dynamicFields, ?string $orderBy = null, ?string $orderType = null): array
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

        // Sorting
        $orderBy = $orderBy ?: 'created_at';
        $orderType = $orderType ?: 'desc';
        $query->orderBy($orderBy, $orderType);

        // Get all submissions
        $submissions = $query->get();

        // Dynamic field filter in application layer
        if (!empty($dynamicFields)) {
            $submissions = $submissions->filter(function ($submission) use ($dynamicFields) {
                foreach ($dynamicFields as $field) {
                    $fieldName = $field['field_name'];
                    $whereType = $field['where_type'];
                    $value = $field['value'];

                    // Find the field in data array
                    $dataField = collect($submission->data)->firstWhere('name', $fieldName);
                    if (!$dataField) {
                        return false;
                    }

                    $fieldValue = $dataField['value'] ?? null;

                    switch ($whereType) {
                        case 'like':
                            if (stripos($fieldValue, $value) === false) {
                                return false;
                            }
                            break;
                        case '=':
                            if ($fieldValue != $value) {
                                return false;
                            }
                            break;
                        case 'in':
                            if (!in_array($fieldValue, $value)) {
                                return false;
                            }
                            break;
                        case 'between':
                            $numericValue = floatval($fieldValue);
                            if ($numericValue < $value[0] || $numericValue > $value[1]) {
                                return false;
                            }
                            break;
                    }
                }
                return true;
            });
        }

        // Build export data
        $exportData = [];
        foreach ($submissions as $submission) {
            $row = [
                'Created At' => $submission->created_at->format('Y-m-d H:i:s'),
                'Version' => $submission->version,
                'IP' => $submission->ipv4,
            ];

            // Add dynamic fields from data array
            if (is_array($submission->data)) {
                foreach ($submission->data as $field) {
                    if (isset($field['name']) && isset($field['value'])) {
                        $row[$field['name']] = $field['value'];
                    }
                }
            }

            $exportData[] = $row;
        }

        return $exportData;
    }
}
