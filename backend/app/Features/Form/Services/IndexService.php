<?php

namespace App\Features\Form\Services;

use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormField;
use App\Features\Form\Models\FormSubmission;
use App\Features\Form\Models\FormView;
use App\Features\Form\Models\Control;
use App\Features\Admin\Models\Admin;
use App\Features\Form\Constants\Code;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use GeoIp2\Database\Reader;
use GeoIp2\Exception\AddressNotFoundException;

/**
 * IndexService
 *
 * @package App\Features\Form\Services
 */
class IndexService
{
    /**
     * create
     *
     * @param Admin $admin
     * @param string $title
     * @param string $description
     * @param int $enabled
     * @param int $numberingStyle
     * @param array $fields
     * @return array
     */
    public function create(Admin $admin, string $title, string $description, int $enabled, int $numberingStyle, array $fields): array
    {
        // get form data
        $data = [
            'title' => $title,
            'description' => $description,
            'enabled' => $enabled,
            'numbering_style' => $numberingStyle,
            'fields' => $fields,
            'version' => 1,
        ];

        // set admin_id
        $data['admin_id'] = $admin->id;

        // create form
        $form = Form::create($data);

        // create fields
        foreach ($data['fields'] as $k => $field) {
            // set sort
            $field['sort'] = $k;

            // validate uuid
            if (FormField::where('uuid', $field['uuid'])->exists()) {
                throw new BusinessException(Code::FORM_FIELD_UUID_EXISTS->message(), Code::FORM_FIELD_UUID_EXISTS->value);
            }

            // process field config
            $field = $this->processFieldConfig($field);

            $field['form_id'] = $form->id;
            FormField::create($field);
        }

        // get form with fields
        return $form->with('fields')->first()->toArray();
    }

    /**
     * update
     *
     * @param Admin $admin
     * @param int $id
     * @param string $title
     * @param string $description
     * @param int $enabled
     * @param int $numberingStyle
     * @param array $fields
     * @return array
     */
    public function update(Admin $admin, int $id, string $title, string $description, int $enabled, int $numberingStyle, array $fields): array
    {
        // get form
        $form = Form::with('fields')->find($id);

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // check if fields have changed
        $fieldsChanged = $this->hasFieldsChanged($form, $fields);

        // get form data
        $data = [
            'title' => $title,
            'description' => $description,
            'enabled' => $enabled,
            'numbering_style' => $numberingStyle,
            'fields' => $fields,
        ];

        // increment version if fields changed
        if ($fieldsChanged) {
            $data['version'] = $form->version + 1;
        }

        // update form
        $form->update($data);

        // delete fields that are not in the data
        $form->fields()->whereNotIn('uuid', array_column($data['fields'], 'uuid'))->delete();

        // update fields
        foreach ($data['fields'] as $k => $field) {
            // set sort
            $field['sort'] = $k;

            // process field config
            $field = $this->processFieldConfig($field);

            if (isset($field['id'])) {
                // validate uuid
                if (FormField::where('uuid', $field['uuid'])->where('id', '!=', $field['id'])->exists()) {
                    throw new BusinessException(Code::FORM_FIELD_UUID_EXISTS->message(), Code::FORM_FIELD_UUID_EXISTS->value);
                }

                $formField = FormField::find($field['id']);
                $formField->update($field);
            } else {
                // validate uuid
                if (FormField::where('uuid', $field['uuid'])->exists()) {
                    throw new BusinessException(Code::FORM_FIELD_UUID_EXISTS->message(), Code::FORM_FIELD_UUID_EXISTS->value);
                }

                $field['form_id'] = $form->id;
                FormField::create($field);
            }
        }

        // get form with fields
        return $form->with('fields')->first()->toArray();
    }

    /**
     * detail
     *
     * @param Admin $admin
     * @param int $id
     * @return array
     */
    public function detail(Admin $admin, int $id): array
    {
        // get form
        $form = Form::where('id', $id)->with(['fields' => function ($query) {
            $query->orderBy('sort', 'asc');
        }])->first();

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // return form
        return $form->toArray();
    }

    /**
     * list
     *
     * @param Admin $admin
     * @param string|null $keyword
     * @param string|null $createdAtStart
     * @param string|null $createdAtEnd
     * @param int|null $submissionsCountStart
     * @param int|null $submissionsCountEnd
     * @param int|null $status
     * @param string|null $orderBy
     * @param string|null $orderType
     * @return array
     */
    public function list(Admin $admin, ?string $keyword = null, ?string $createdAtStart = null, ?string $createdAtEnd = null, ?int $submissionsCountStart = null, ?int $submissionsCountEnd = null, ?int $status = null, ?string $orderBy = null, ?string $orderType = null): array
    {
        $query = Form::select('id', 'uuid', 'title', 'enabled', 'created_at')->withCount('submissions');

        // where title or description like keyword
        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', '%' . $keyword . '%')
                    ->orWhere('description', 'like', '%' . $keyword . '%');
            });
        }

        // where created_at >= createdAtStart
        if ($createdAtStart) {
            $query->where('created_at', '>=', $createdAtStart);
        }

        // where created_at <= createdAtEnd
        if ($createdAtEnd) {
            $query->where('created_at', '<=', $createdAtEnd);
        }

        // filter by submissions count range
        $submissionsCountSubquery = '(SELECT COUNT(*) FROM form_submissions WHERE forms.id = form_submissions.form_id AND form_submissions.deleted_at IS NULL)';

        if ($submissionsCountStart !== null) {
            $query->whereRaw($submissionsCountSubquery . ' >= ?', [$submissionsCountStart]);
        }

        if ($submissionsCountEnd !== null) {
            $query->whereRaw($submissionsCountSubquery . ' <= ?', [$submissionsCountEnd]);
        }

        // where status equals status
        if ($status !== null) {
            $query->where('enabled', $status);
        }

        // order by
        if ($orderBy) {
            $query->orderBy($orderBy, $orderType ?? 'desc');
        } else {
            $query->orderBy('id', 'desc');
        }

        // get forms
        $pagination = $query->paginate(getPageLimit());

        // return forms
        return $pagination->toArray();
    }

    /**
     * delete
     *
     * @param Admin $admin
     * @param array $ids
     */
    public function delete(Admin $admin, array $ids): void
    {
        foreach ($ids as $id) {
            // get form
            $form = Form::withCount('submissions')->find($id);

            // check form
            if (!$form) {
                throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
            }

            // check form if has submissions
            if ($form->submissions_count > 0) {
                throw new BusinessException(Code::FORM_HAS_SUBMISSIONS->message(), Code::FORM_HAS_SUBMISSIONS->value);
            }

            // delete form
            $form->delete();

            // delete form fields
            $form->fields()->delete();
        }
    }

    /**
     * batchUpdateEnabled
     *
     * @param Admin $admin
     * @param array $items
     * @return void
     */
    public function batchUpdateEnabled(Admin $admin, array $items): void
    {
        foreach ($items as $item) {
            // get form
            $form = Form::find($item['id']);

            // check form exists
            if (!$form) {
                throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
            }

            // update enabled status
            $form->update(['enabled' => $item['enabled']]);
        }
    }

    /**
     * controls
     *
     * @return array
     */
    public function controls(): array
    {
        // check if controls table has data
        $controlsCount = Control::count();

        if ($controlsCount === 0) {
            // scan frontend control config files and import to database
            $this->scanAndImportControls();
        }

        // get all controls
        $controls = Control::select('id', 'type', 'name', 'config', 'icon', 'group')->get();

        return $controls->toArray();
    }

    /**
     * scanAndImportControls
     *
     * @return void
     */
    public function scanAndImportControls(): void
    {
        $frontendControlsPath = base_path('../frontend/src/plugins/controls');

        if (!File::exists($frontendControlsPath)) {
            throw new BusinessException(Code::FILE_NOT_FOUND->message(), Code::FILE_NOT_FOUND->value);
        }

        $controlDirectories = File::directories($frontendControlsPath);

        foreach ($controlDirectories as $controlDir) {
            $configFile = $controlDir . '/config.json';

            if (File::exists($configFile)) {
                $configContent = File::get($configFile);
                $config = json_decode($configContent, true);

                if ($config && isset($config['type'], $config['name'], $config['config'], $config['icon'])) {
                    Control::create([
                        'type' => $config['type'],
                        'name' => $config['name'],
                        'config' => $config['config'],
                        'icon' => $config['icon'],
                        'group' => $config['group'] ?? 'general',
                    ]);
                }
            }
        }
    }

    /**
     * frontDetail
     *
     * @param string $uuid
     * @return array
     */
    public function frontDetail(string $uuid): array
    {
        // get form with fields
        $form = Form::with(['fields' => function ($query) {
            $query->orderBy('sort', 'asc');
        }])->where('uuid', $uuid)->where('enabled', 1)->first();

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // return form
        return $form->toArray();
    }

    /**
     * submit
     *
     * @param string $uuid
     * @param array $data
     * @param int $version
     * @param string $ipv4
     * @param string $ipv6
     * @param string $visitorId
     * @param string $userAgent
     * @return void
     */
    public function submit(string $uuid, array $data, int $version, string $ipv4, string $ipv6, string $visitorId, string $userAgent): void
    {
        // get form
        $form = Form::where('uuid', $uuid)->where('enabled', 1)->first();

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // check if visitor has submitted 
        $exists = FormSubmission::where('form_id', $form->id)
            ->where('version', $version)
            ->where('visitor_id', $visitorId)
            ->exists();
        if ($exists) {
            throw new BusinessException(Code::FORM_ALREADY_SUBMITTED->message(), Code::FORM_ALREADY_SUBMITTED->value);
        }

        // validate form fields data
        $this->validateFormFieldsData($form, $data);

        // convert data array to associative array for storage using field UUID
        $storageData = [];
        $formFields = $form->fields()->get();

        // create lookup by title for storage conversion
        $fieldsByTitle = [];
        foreach ($formFields as $field) {
            $fieldsByTitle[$field->title] = $field;
        }

        // foreach ($data as $item) {
        //     // find the field by title and use its UUID for storage
        //     if (isset($fieldsByTitle[$item['name']])) {
        //         $field = $fieldsByTitle[$item['name']];
        //         $storageData[$field->title] = $item['value'];
        //     }
        // }

        // get country and city
        $country = $this->getCountry($ipv4);
        $city = $this->getCity($ipv4, $country);

        // create form submission
        FormSubmission::create([
            'form_id' => $form->id,
            'data' => $data,
            'version' => $version,
            'ipv4' => $ipv4,
            'country' => $country,
            'city' => $city,
            'created_at' => now(),
            'ipv6' => $ipv6,
            'visitor_id' => $visitorId,
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * getCountry
     *
     * @param string $ipv4
     * @return string
     */
    private function getCountry(string $ipv4): string
    {
        $reader = new Reader(base_path('database/geoip/GeoIP2-Country-Test.mmdb'));
        try {
            $record = $reader->country($ipv4);
            return $record->country->name;
        } catch (AddressNotFoundException $e) {
            return $ipv4;
        }
    }   
    

    /**
     * getCity
     *
     * @param string $ipv4
     * @return string
     */
    private function getCity(string $ipv4): string
    {
        $reader = new Reader(base_path('database/geoip/GeoIP2-City-Test.mmdb'));
        try {
            $record = $reader->city($ipv4);
            return $record->city->name;
        } catch (AddressNotFoundException $e) {
            return $ipv4;
        }
    }

    /**
     * validateFormFieldsData
     *
     * @param Form $form
     * @param array $data
     * @return void
     */
    private function validateFormFieldsData(Form $form, array $data): void
    {
        // get form fields
        $formFields = $form->fields()->get();

        // convert data array to associative array for easier lookup by name
        $dataByName = [];
        foreach ($data as $item) {
            $dataByName[$item['name']] = $item['value'];
        }

        // create field lookup by title (name)
        $fieldsByTitle = [];
        foreach ($formFields as $field) {
            $fieldsByTitle[$field->title] = $field;
        }

        // check required fields and config regex validation
        foreach ($formFields as $field) {
            $fieldValue = $dataByName[$field->title] ?? null;

            // check required fields
            if ($field->required && empty($fieldValue)) {
                throw new BusinessException($field->title . ':' . Code::FORM_FIELD_REQUIRED->message(), Code::FORM_FIELD_REQUIRED->value);
            }

            // validate config regex if field has value
            if (!is_null($fieldValue) && $fieldValue !== '') {
                $this->validateConfigRegex($field, $fieldValue);
            }
        }
    }

    /**
     * validateConfigRegex
     *
     * @param FormField $field
     * @param mixed $value
     * @return void
     */
    private function validateConfigRegex(FormField $field, $value): void
    {
        // get config regex and warning message
        $configRegex = $field->config['regex']['value'] ?? '';
        $regexWarningMessage = $field->config['regex']['warning_message'] ?? '';

        // skip validation if no regex pattern is defined
        if (empty($configRegex)) {
            return;
        }

        // validate config regex
        // var_dump($configRegex, $value, $field->title);
        $configRegex = "/" . $configRegex . "/";
        $isValid = $this->validateValueAgainstRegex($value, $configRegex);

        if (!$isValid) {
            $errorMessage = $field->title . ' validation failed';
            if (!empty($regexWarningMessage)) {
                $errorMessage .= ': ' . $regexWarningMessage;
            }
            throw new BusinessException($errorMessage, Code::FORM_FIELD_CONFIG_REGEX_FAILED->value);
        }
    }

    /**
     * validateValueAgainstRegex
     *
     * @param mixed $value
     * @param string $regex
     * @return bool
     */
    private function validateValueAgainstRegex($value, string $regex): bool
    {
        // if value is array, validate each element
        if (is_array($value)) {
            foreach ($value as $item) {
                if (!$this->validateValueAgainstRegex($item, $regex)) {
                    return false;
                }
            }
            return true;
        }

        if (is_bool($value)) {
            $value = $value ? 'true' : 'false';
        }

        // validate against regex pattern
        return preg_match($regex, $value) === 1;
    }

    /**
     * hasFieldsChanged
     *
     * @param Form $form
     * @param array $newFields
     * @return bool
     */
    private function hasFieldsChanged(Form $form, array $newFields): bool
    {
        $existingFields = $form->fields->sortBy('sort')->values()->toArray();

        // check if number of fields changed
        if (count($existingFields) !== count($newFields)) {
            return true;
        }

        // create lookup arrays for comparison
        $existingFieldsLookup = [];
        foreach ($existingFields as $field) {
            $existingFieldsLookup[$field['uuid']] = $field;
        }

        $newFieldsLookup = [];
        foreach ($newFields as $field) {
            $newFieldsLookup[$field['uuid']] = $field;
        }

        // check if any field was removed or added
        $existingUuids = array_keys($existingFieldsLookup);
        $newUuids = array_keys($newFieldsLookup);

        if (array_diff($existingUuids, $newUuids) || array_diff($newUuids, $existingUuids)) {
            return true;
        }

        // check if field order changed by comparing the UUID sequence
        $existingUuidSequence = array_column($existingFields, 'uuid');
        $newUuidSequence = array_column($newFields, 'uuid');

        if ($existingUuidSequence !== $newUuidSequence) {
            return true;
        }

        // check if any field properties changed
        foreach ($newFields as $index => $newField) {
            $uuid = $newField['uuid'];

            if (!isset($existingFieldsLookup[$uuid])) {
                return true; // new field
            }

            $existingField = $existingFieldsLookup[$uuid];

            // compare important field properties (excluding id, form_id, timestamps, sort)
            $fieldsToCompare = ['type', 'title', 'required', 'config'];

            foreach ($fieldsToCompare as $fieldName) {
                $existingValue = $existingField[$fieldName] ?? null;
                $newValue = $newField[$fieldName] ?? null;

                // for arrays (like config), compare as JSON strings
                if (is_array($existingValue) || is_array($newValue)) {
                    if (json_encode($existingValue) !== json_encode($newValue)) {
                        return true;
                    }
                } else {
                    if ($existingValue !== $newValue) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * processFieldConfig
     *
     * @param array $field
     * @return array
     */
    private function processFieldConfig(array $field): array
    {
        // check if config exists
        if (!isset($field['config']) || !is_array($field['config'])) {
            return $field;
        }

        // check if default_value exists
        if (!isset($field['config']['default_value']) || !is_array($field['config']['default_value'])) {
            return $field;
        }

        $defaultValueType = $field['config']['default_value']['type'] ?? '';

        // ensure regex structure exists
        if (!isset($field['config']['regex'])) {
            $field['config']['regex'] = [
                'value' => '',
                'warning_message' => ''
            ];
        }

        switch ($defaultValueType) {
            case 'options':
                // for options type, set regex to match any of the option values
                $field = $this->processOptionsFieldConfig($field);
                break;

            case 'boolean':
                // for boolean type, set regex to match true or false
                $field['config']['regex']['value'] = '^(true|false)$';
                break;

            case 'string':
                // for string type, keep regex unchanged
                break;
        }

        return $field;
    }

    /**
     * processOptionsFieldConfig
     *
     * @param array $field
     * @return array
     */
    private function processOptionsFieldConfig(array $field): array
    {
        // check if options exist
        if (!isset($field['config']['options']['default_options']) || !is_array($field['config']['options']['default_options'])) {
            return $field;
        }

        $optionValues = [];
        $selectedValues = [];

        foreach ($field['config']['options']['default_options'] as $option) {
            if (isset($option['val'])) {
                $optionValues[] = preg_quote($option['val'], '/');

                // collect selected values for default_value
                if (isset($option['selected']) && $option['selected'] === true) {
                    $selectedValues[] = $option['val'];
                }
            }
        }

        // if there are option values, create regex pattern
        if (!empty($optionValues)) {
            $field['config']['regex']['value'] = '^(' . implode('|', $optionValues) . ')$';
        }

        // set default_value.value to selected options
        // for radio type, use string (first selected value), for others use array
        $defaultValue = $selectedValues;
        if (isset($field['control_type']) && $field['control_type'] === 'radio') {
            $defaultValue = !empty($selectedValues) ? $selectedValues[0] : '';
        }

        if (!isset($field['config']['default_value'])) {
            $field['config']['default_value'] = [
                'type' => 'options',
                'value' => $defaultValue
            ];
        } else {
            $field['config']['default_value']['value'] = $defaultValue;
        }

        return $field;
    }

    /**
     * recordView
     *
     * @param string $uuid
     * @param int $version
     * @param string $visitorId
     * @param string $ipv4
     * @param string $ipv6
     * @param string|null $userAgent
     * @return void
     */
    public function recordView(string $uuid, int $version, string $visitorId, string $ipv4, string $ipv6, ?string $userAgent = null): void
    {
        // get form
        $form = Form::where('uuid', $uuid)->where('enabled', 1)->first();

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // get country and city
        $country = $this->getCountry($ipv4);
        $city = $this->getCity($ipv4, $country);

        // create form view record
        FormView::create([
            'form_id' => $form->id,
            'form_version' => $version,
            'visitor_id' => $visitorId,
            'ipv4' => $ipv4,
            'country' => $country,
            'city' => $city,
            'ipv6' => $ipv6,
            'user_agent' => $userAgent,
            'created_at' => now(),
        ]);
    }

    /**
     * statistics
     *
     * @param int $formId
     * @param int $version
     * @param string $periodType
     * @return array
     */
    public function statistics(int $formId, int $version, string $periodType): array
    {
        // check form exists
        $form = Form::find($formId);
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // calculate period date ranges
        $periods = $this->calculatePeriodRanges($periodType, $formId, $version);
        $currentPeriod = $periods['current'];
        $previousPeriod = $periods['previous'];
        $daysInPeriod = $periods['days'];

        // get current period statistics
        $currentStats = $this->getPeriodStatistics($formId, $version, $currentPeriod['start'], $currentPeriod['end'], $daysInPeriod);

        // for 'all' period type, growth rate is always 100
        if ($periodType === 'all') {
            $figures = [
                'total_submission_number' => [
                    'value' => $currentStats['total_submissions'],
                    'growth_rate' => 100.00,
                ],
                'average_submission_number' => [
                    'value' => $currentStats['average_submissions_per_day'],
                    'growth_rate' => 100.00,
                ],
                'average_finishing_rate' => [
                    'value' => $currentStats['finishing_rate'],
                    'growth_rate' => 100.00,
                ],
                'independent_ip_number' => [
                    'value' => $currentStats['independent_ips'],
                    'growth_rate' => 100.00,
                ],
            ];
        } else {
            // get previous period statistics
            $previousStats = $this->getPeriodStatistics($formId, $version, $previousPeriod['start'], $previousPeriod['end'], $periods['previous_days']);

            // calculate figures with growth rates
            $figures = [
                'total_submission_number' => [
                    'value' => $currentStats['total_submissions'],
                    'growth_rate' => $this->calculateGrowthRate($currentStats['total_submissions'], $previousStats['total_submissions']),
                ],
                'average_submission_number' => [
                    'value' => $currentStats['average_submissions_per_day'],
                    'growth_rate' => $this->calculateGrowthRate($currentStats['average_submissions_per_day'], $previousStats['average_submissions_per_day']),
                ],
                'average_finishing_rate' => [
                    'value' => $currentStats['finishing_rate'],
                    'growth_rate' => $this->calculateGrowthRate($currentStats['finishing_rate'], $previousStats['finishing_rate']),
                ],
                'independent_ip_number' => [
                    'value' => $currentStats['independent_ips'],
                    'growth_rate' => $this->calculateGrowthRate($currentStats['independent_ips'], $previousStats['independent_ips']),
                ],
            ];
        }

        // get trends data
        $trends = $this->getTrends($formId, $version, $periodType, $currentPeriod['start'], $currentPeriod['end']);

        // get time heat map data
        $timeHeatMap = $this->getTimeHeatMap($formId, $version, $periodType, $currentPeriod['start'], $currentPeriod['end']);

        // get geo location distribution
        $geoLocationDistribution = $this->getGeoLocationDistribution($formId, $version, $currentPeriod['start'], $currentPeriod['end']);

        return [
            'figures' => $figures,
            'trends' => $trends,
            'time_heat_map' => $timeHeatMap,
            'geo_location_distribution' => $geoLocationDistribution,
        ];
    }

    /**
     * calculatePeriodRanges
     *
     * @param string $periodType
     * @param int $formId
     * @param int $version
     * @return array
     */
    private function calculatePeriodRanges(string $periodType, int $formId, int $version): array
    {
        $now = now();

        switch ($periodType) {
            case 'today':
                $currentStart = $now->copy()->startOfDay();
                $currentEnd = $now->copy()->endOfDay();
                $previousStart = $now->copy()->subDay()->startOfDay();
                $previousEnd = $now->copy()->subDay()->endOfDay();
                $days = 1;
                $previousDays = 1;
                break;

            case 'week':
                $currentStart = $now->copy()->startOfWeek();
                $currentEnd = $now->copy()->endOfWeek();
                $previousStart = $now->copy()->subWeek()->startOfWeek();
                $previousEnd = $now->copy()->subWeek()->endOfWeek();
                $days = 7;
                $previousDays = 7;
                break;

            case 'month':
                $currentStart = $now->copy()->startOfMonth();
                $currentEnd = $now->copy()->endOfMonth();
                $previousStart = $now->copy()->subMonth()->startOfMonth();
                $previousEnd = $now->copy()->subMonth()->endOfMonth();
                $days = $currentStart->daysInMonth;
                $previousDays = $previousStart->daysInMonth;
                break;

            case 'all':
                // for all time, get earliest and latest records from form_views
                $earliestView = FormView::where('form_id', $formId)
                    ->where('form_version', $version)
                    ->orderBy('created_at', 'asc')
                    ->first();

                $latestView = FormView::where('form_id', $formId)
                    ->where('form_version', $version)
                    ->orderBy('created_at', 'desc')
                    ->first();

                if ($earliestView && $latestView) {
                    $currentStart = $earliestView->created_at->copy()->startOfDay();
                    $currentEnd = $latestView->created_at->copy()->endOfDay();
                } else {
                    // if no views, use current day
                    $currentStart = $now->copy()->startOfDay();
                    $currentEnd = $now->copy()->endOfDay();
                }

                // previous period not used for 'all' type
                $previousStart = $currentStart->copy();
                $previousEnd = $currentStart->copy();
                // calculate actual days from earliest to latest record
                $days = $currentStart->diffInDays($currentEnd) + 1;
                $previousDays = 1;
                break;

            default:
                $currentStart = $now->copy()->startOfDay();
                $currentEnd = $now->copy()->endOfDay();
                $previousStart = $now->copy()->subDay()->startOfDay();
                $previousEnd = $now->copy()->subDay()->endOfDay();
                $days = 1;
                $previousDays = 1;
                break;
        }

        return [
            'current' => [
                'start' => $currentStart,
                'end' => $currentEnd,
            ],
            'previous' => [
                'start' => $previousStart,
                'end' => $previousEnd,
            ],
            'days' => $days,
            'previous_days' => $previousDays,
        ];
    }

    /**
     * getPeriodStatistics
     *
     * @param int $formId
     * @param int $version
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @param int $daysInPeriod
     * @return array
     */
    private function getPeriodStatistics(int $formId, int $version, $startDate, $endDate, int $daysInPeriod): array
    {
        // get total submissions count
        $totalSubmissions = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // get total views count
        $totalViews = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // get independent IPs count from both submissions and views
        $submissionIps = $this->getIpsFromSubmissions($formId, $version, $startDate, $endDate);
        $viewIps = $this->getIpsFromViews($formId, $version, $startDate, $endDate);
        
        // merge and count unique IPs
        $allIps = array_filter(array_merge($submissionIps, $viewIps));
        $independentIps = count(array_unique($allIps));

        // calculate average submissions per day
        $averageSubmissionsPerDay = $daysInPeriod > 0 ? round($totalSubmissions / $daysInPeriod, 2) : 0;

        // calculate finishing rate (submission / view)
        $finishingRate = $totalViews > 0 ? round(($totalSubmissions / $totalViews) * 100, 2) : 0;

        return [
            'total_submissions' => $totalSubmissions,
            'total_views' => $totalViews,
            'independent_ips' => $independentIps,
            'average_submissions_per_day' => $averageSubmissionsPerDay,
            'finishing_rate' => $finishingRate,
        ];
    }

    /**
     * calculateGrowthRate
     *
     * @param float $currentValue
     * @param float $previousValue
     * @return float
     */
    private function calculateGrowthRate(float $currentValue, float $previousValue): float
    {
        if ($previousValue == 0) {
            return $currentValue > 0 ? 100.00 : 0.00;
        }

        return round((($currentValue - $previousValue) / $previousValue) * 100, 2);
    }

    /**
     * getIpsFromSubmissions
     *
     * @param int $formId
     * @param int $version
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getIpsFromSubmissions(int $formId, int $version, $startDate, $endDate): array
    {
        $ipv4s = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('ipv4')
            ->pluck('ipv4')
            ->map(fn($ip) => (string)$ip)
            ->toArray();

        $ipv6s = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('ipv6')
            ->pluck('ipv6')
            ->toArray();

        return array_merge($ipv4s, $ipv6s);
    }

    /**
     * getIpsFromViews
     *
     * @param int $formId
     * @param int $version
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getIpsFromViews(int $formId, int $version, $startDate, $endDate): array
    {
        $ipv4s = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('ipv4')
            ->pluck('ipv4')
            ->map(fn($ip) => (string)$ip)
            ->toArray();

        $ipv6s = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('ipv6')
            ->pluck('ipv6')
            ->toArray();

        return array_merge($ipv4s, $ipv6s);
    }

    /**
     * getTrends
     *
     * @param int $formId
     * @param int $version
     * @param string $periodType
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getTrends(int $formId, int $version, string $periodType, $startDate, $endDate): array
    {
        $trends = [];

        if ($periodType === 'today') {
            // for today, group by hour (24 hours)
            $trends = $this->getTrendsByHour($formId, $version, $startDate, $endDate);
        } else {
            // for all, week, month, group by day
            $trends = $this->getTrendsByDay($formId, $version, $startDate, $endDate, $periodType);
        }

        return $trends;
    }

    /**
     * getTrendsByHour
     *
     * @param int $formId
     * @param int $version
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getTrendsByHour(int $formId, int $version, $startDate, $endDate): array
    {
        $trends = [];

        // determine database driver
        $driver = config('database.default');
        $hourExpression = $driver === 'sqlite' 
            ? "CAST(strftime('%H', created_at) as INTEGER) as hour"
            : 'EXTRACT(HOUR FROM created_at) as hour';

        // get submissions grouped by hour
        $submissions = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw("$hourExpression, COUNT(*) as count")
            ->groupBy('hour')
            ->pluck('count', 'hour')
            ->toArray();

        // get views grouped by hour
        $views = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw("$hourExpression, COUNT(*) as count")
            ->groupBy('hour')
            ->pluck('count', 'hour')
            ->toArray();

        // generate all 24 hours
        for ($hour = 0; $hour < 24; $hour++) {
            $trends[] = [
                'point' => sprintf('%02d:00', $hour),
                'views_count' => (int)($views[$hour] ?? 0),
                'submissions_count' => (int)($submissions[$hour] ?? 0),
            ];
        }

        return $trends;
    }

    /**
     * getTrendsByDay
     *
     * @param int $formId
     * @param int $version
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @param string $periodType
     * @return array
     */
    private function getTrendsByDay(int $formId, int $version, $startDate, $endDate, string $periodType): array
    {
        $trends = [];

        // determine database driver
        $driver = config('database.default');
        $dateExpression = $driver === 'sqlite' 
            ? "date(created_at) as date"
            : 'DATE(created_at) as date';

        // get submissions grouped by date
        $submissions = FormSubmission::where('form_id', $formId)
            ->where('version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw("$dateExpression, COUNT(*) as count")
            ->groupBy('date')
            ->pluck('count', 'date')
            ->toArray();

        // get views grouped by date
        $views = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw("$dateExpression, COUNT(*) as count")
            ->groupBy('date')
            ->pluck('count', 'date')
            ->toArray();

        // generate all dates in the period
        $currentDate = $startDate->copy();
        while ($currentDate->lte($endDate)) {
            $dateKey = $currentDate->format('Y-m-d');
            $trends[] = [
                'point' => $currentDate->format('m/d'),
                'views_count' => (int)($views[$dateKey] ?? 0),
                'submissions_count' => (int)($submissions[$dateKey] ?? 0),
            ];
            $currentDate->addDay();
        }

        return $trends;
    }

    /**
     * getTimeHeatMap
     *
     * @param int $formId
     * @param int $version
     * @param string $periodType
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getTimeHeatMap(int $formId, int $version, string $periodType, $startDate, $endDate): array
    {
        // initialize heat map array (7 days x 24 hours)
        $heatMap = array_fill(0, 7, array_fill(0, 24, 0));

        // determine database driver
        $driver = config('database.default');
        
        if ($periodType === 'today') {
            // for today, only return data for current day of week
            $dayOfWeek = now()->dayOfWeek; // 0=Sunday, 1=Monday, ..., 6=Saturday
            // convert to Monday=0, ..., Sunday=6
            $dayIndex = $dayOfWeek == 0 ? 6 : $dayOfWeek - 1;

            // get hourly data for today
            $hourExpression = $driver === 'sqlite' 
                ? "CAST(strftime('%H', created_at) as INTEGER) as hour"
                : 'EXTRACT(HOUR FROM created_at) as hour';

            $submissions = FormSubmission::where('form_id', $formId)
                ->where('version', $version)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw("$hourExpression, COUNT(*) as count")
                ->groupBy('hour')
                ->pluck('count', 'hour')
                ->toArray();

            // fill today's data
            foreach ($submissions as $hour => $count) {
                $heatMap[$dayIndex][(int)$hour] = (int)$count;
            }
        } else {
            // for week, month, all: calculate average by day of week and hour
            $dayExpression = $driver === 'sqlite' 
                ? "CAST(strftime('%w', created_at) as INTEGER) as day_of_week"
                : 'EXTRACT(DOW FROM created_at) as day_of_week';
            
            $hourExpression = $driver === 'sqlite' 
                ? "CAST(strftime('%H', created_at) as INTEGER) as hour"
                : 'EXTRACT(HOUR FROM created_at) as hour';

            // get submissions grouped by day of week and hour
            $submissions = FormSubmission::where('form_id', $formId)
                ->where('version', $version)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw("$dayExpression, $hourExpression, COUNT(*) as count")
                ->groupBy('day_of_week', 'hour')
                ->get();

            // count occurrences of each day of week for averaging
            $dayOccurrences = $this->countDayOccurrences($startDate, $endDate);

            // aggregate data
            $aggregatedData = [];
            foreach ($submissions as $submission) {
                $dayOfWeek = (int)$submission->day_of_week; // 0=Sunday, 1=Monday, ..., 6=Saturday
                $hour = (int)$submission->hour;
                $count = (int)$submission->count;
                
                // convert to Monday=0, ..., Sunday=6
                $dayIndex = $dayOfWeek == 0 ? 6 : $dayOfWeek - 1;
                
                if (!isset($aggregatedData[$dayIndex])) {
                    $aggregatedData[$dayIndex] = [];
                }
                // SQL groupBy already returns total count for each (day_of_week, hour) combination
                $aggregatedData[$dayIndex][$hour] = $count;
            }

            // calculate averages
            foreach ($aggregatedData as $dayIndex => $hours) {
                $originalDayOfWeek = $dayIndex == 6 ? 0 : $dayIndex + 1;
                $occurrences = $dayOccurrences[$originalDayOfWeek] ?? 1;
                
                foreach ($hours as $hour => $totalCount) {
                    $heatMap[$dayIndex][$hour] = round($totalCount / $occurrences, 2);
                }
            }
        }

        return $heatMap;
    }

    /**
     * countDayOccurrences
     *
     * Count how many times each day of week occurs in the period
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function countDayOccurrences($startDate, $endDate): array
    {
        $occurrences = array_fill(0, 7, 0); // 0=Sunday, 1=Monday, ..., 6=Saturday
        
        $currentDate = $startDate->copy();
        while ($currentDate->lte($endDate)) {
            $dayOfWeek = $currentDate->dayOfWeek;
            $occurrences[$dayOfWeek]++;
            $currentDate->addDay();
        }
        
        return $occurrences;
    }

    /**
     * getGeoLocationDistribution
     *
     * @param int $formId
     * @param int $version
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getGeoLocationDistribution(int $formId, int $version, $startDate, $endDate): array
    {
        // get total count for percentage calculation
        $totalCount = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // get location distribution grouped by country and city
        $locations = FormView::where('form_id', $formId)
            ->where('form_version', $version)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->select('country', 'city', DB::raw('COUNT(*) as count'))
            ->groupBy('country', 'city')
            ->orderByDesc('count')
            ->get();

        // format result with percentage
        $result = [];
        foreach ($locations as $location) {
            $city = trim($location->country . ' ' . $location->city);
            $count = (int)$location->count;
            $percentage = $totalCount > 0 ? round(($count / $totalCount) * 100, 1) : 0;
            
            $result[] = [
                'city' => $city,
                'count' => $count,
                'percentage' => $percentage,
            ];
        }

        return $result;
    }
}
