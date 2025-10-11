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
    public function create(Admin $admin, string $title, string $description, int $enabled, int $numberingStyle, array $fields) : array
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
    public function update(Admin $admin, int $id, string $title, string $description, int $enabled, int $numberingStyle, array $fields) : array
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
    public function detail(Admin $admin, int $id) : array
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
    public function list(Admin $admin, ?string $keyword = null, ?string $createdAtStart = null, ?string $createdAtEnd = null, ?int $submissionsCountStart = null, ?int $submissionsCountEnd = null, ?int $status = null, ?string $orderBy = null, ?string $orderType = null) : array
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
    public function delete(Admin $admin, array $ids) : void
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
    public function batchUpdateEnabled(Admin $admin, array $items) : void
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
    public function controls() : array
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
    public function scanAndImportControls() : void
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
    public function frontDetail(string $uuid) : array
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
    public function submit(string $uuid, array $data, int $version, string $ipv4, string $ipv6, string $visitorId, string $userAgent) : void
    {
        // get form
        $form = Form::where('uuid', $uuid)->where('enabled', 1)->first();

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
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

        // create form submission
        FormSubmission::create([
            'form_id' => $form->id,
            'data' => $data,
            'version' => $version,
            'ipv4' => $ipv4,
            'created_at' => now(),
            'ipv6' => $ipv6,
            'visitor_id' => $visitorId,
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * validateFormFieldsData
     *
     * @param Form $form
     * @param array $data
     * @return void
     */
    private function validateFormFieldsData(Form $form, array $data) : void
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
    private function validateConfigRegex(FormField $field, $value) : void
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
    private function validateValueAgainstRegex($value, string $regex) : bool
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
    private function hasFieldsChanged(Form $form, array $newFields) : bool
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
    private function processFieldConfig(array $field) : array
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
    private function processOptionsFieldConfig(array $field) : array
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

        // check if already recorded in 24 hours (same visitor_id + ip combination)
        $exists = FormView::where('form_id', $form->id)
            ->where('form_version', $version)
            ->where('visitor_id', $visitorId)
            ->where('ipv4', ip2long($ipv4))
            ->where('ipv6', $ipv6)
            ->where('created_at', '>=', now()->subHours(24))
            ->exists();

        if (!$exists) {
            // create form view record
            FormView::create([
                'form_id' => $form->id,
                'form_version' => $version,
                'visitor_id' => $visitorId,
                'ipv4' => $ipv4,
                'ipv6' => $ipv6,
                'user_agent' => $userAgent,
                'created_at' => now(),
            ]);
        }
    }
}
