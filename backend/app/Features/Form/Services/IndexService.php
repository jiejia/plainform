<?php
namespace App\Features\Form\Services;

use App\Features\Form\Data\Form as FormData;
use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormField;
use App\Features\Admin\Models\Admin;
use App\Features\Form\Constants\Code;
use App\Features\Core\Exceptions\BusinessException;

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
     * @param FormData $formData
     * @return array
     */
    public function create(Admin $admin, FormData $formData) : array
    {
        // get form data
        $data = $formData->toArray();

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
     * @param FormData $formData
     * @return array
     */
    public function update(Admin $admin, int $id, FormData $formData) : array
    {
        // get form
        $form = Form::with('fields')->find($id);

        // check form
        if (!$form) {
            throw new BusinessException(Code::FORM_NOT_FOUND->message(), Code::FORM_NOT_FOUND->value);
        }

        // get form data
        $data = $formData->toArray();

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
}