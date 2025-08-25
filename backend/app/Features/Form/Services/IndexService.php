<?php
namespace App\Features\Form\Services;

use App\Features\Form\Data\Form as FormData;
use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormField;
use App\Features\Admin\Models\Admin;
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
            $field['form_id'] = $form->id;  
            FormField::create($field);
        }

        // get form with fields
        return $form->with('fields')->first()->toArray();
    }   
}