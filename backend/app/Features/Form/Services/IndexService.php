<?php
namespace App\Features\Form\Services;

use App\Features\Form\Data\Form;

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
     * @param Form $form
     * @return Form
     */
    public function create(Form $form)
    {
        return $form;
    }
}