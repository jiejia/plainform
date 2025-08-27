<?php
namespace App\Features\Form\Services;

use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormField;
use App\Features\Form\Models\Control;
use App\Features\Admin\Models\Admin;
use App\Features\Form\Constants\Code;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Support\Facades\File;

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
        ];

        // set admin_id
        $data['admin_id'] = $admin->id;

        // create form
        $form = Form::create($data);

        // create fields
        foreach ($data['fields'] as $field) {
            // validate uuid
            if (FormField::where('uuid', $field['uuid'])->exists()) {
                throw new BusinessException(Code::FORM_FIELD_UUID_EXISTS->value, Code::FORM_FIELD_UUID_EXISTS->message());
            }

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

        // get form data
        $data = [
            'title' => $title,
            'description' => $description,
            'enabled' => $enabled,
            'numbering_style' => $numberingStyle,
            'fields' => $fields,
        ];

        // update form
        $form->update($data);

        // delete fields that are not in the data
        $form->fields()->whereNotIn('uuid', array_column($data['fields'], 'uuid'))->delete();

        // update fields
        foreach ($data['fields'] as $field) {
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
        $form = Form::with('fields')->find($id);

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // return form
        return $form->with('fields')->first()->toArray();
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
     * @param array|null $status
     * @param string|null $orderBy
     * @param string|null $orderType
     * @return array
     */
    public function list(Admin $admin, ?string $keyword = null, ?string $createdAtStart = null, ?string $createdAtEnd = null, ?int $submissionsCountStart = null, ?int $submissionsCountEnd = null, ?array $status = null, ?string $orderBy = null, ?string $orderType = null) : array
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

        // where submissions_count >= submissionsCountStart
        if ($submissionsCountStart) {
            $query->where('submissions_count', '>=', $submissionsCountStart);
        }

        // where submissions_count <= submissionsCountEnd
        if ($submissionsCountEnd) {
            $query->where('submissions_count', '<=', $submissionsCountEnd);
        }

        // where status in status
        if ($status) {
            $query->whereIn('status', $status);
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
}