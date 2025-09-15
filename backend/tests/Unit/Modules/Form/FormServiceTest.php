<?php

namespace Tests\Unit\Modules\Form;

use Tests\TestCase;
use App\Features\Form\Services\IndexService;
use App\Features\Form\Models\Form;
use App\Features\Admin\Models\Admin;
use App\Features\Form\Constants\Code;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * FormServiceTest
 *
 * @package Tests\Unit\Modules\Form
 */
class FormServiceTest extends TestCase
{
    use RefreshDatabase;

    private IndexService $service;
    private Admin $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new IndexService();
        $this->admin = Admin::factory()->create();
    }

    /**
     * test batchUpdateEnabled with valid data
     *
     * @return void
     */
    public function testBatchUpdateEnabledWithValidData(): void
    {
        // create test forms
        $form1 = Form::factory()->create(['enabled' => false, 'admin_id' => $this->admin->id]);
        $form2 = Form::factory()->create(['enabled' => false, 'admin_id' => $this->admin->id]);

        // prepare batch update data
        $items = [
            ['id' => $form1->id, 'enabled' => true],
            ['id' => $form2->id, 'enabled' => true],
        ];

        // execute batch update
        $this->service->batchUpdateEnabled($this->admin, $items);

        // assert forms are updated
        $this->assertTrue(Form::find($form1->id)->enabled);
        $this->assertTrue(Form::find($form2->id)->enabled);
    }

    /**
     * test batchUpdateEnabled with invalid form id
     *
     * @return void
     */
    public function testBatchUpdateEnabledWithInvalidFormId(): void
    {
        // prepare batch update data with invalid id
        $items = [
            ['id' => 999999, 'enabled' => true],
        ];

        // expect exception
        $this->expectException(BusinessException::class);
        $this->expectExceptionCode(Code::FORM_NOT_FOUND->value);

        // execute batch update
        $this->service->batchUpdateEnabled($this->admin, $items);
    }

    /**
     * test batchUpdateEnabled with mixed valid and invalid ids
     *
     * @return void
     */
    public function testBatchUpdateEnabledWithMixedIds(): void
    {
        // create test form
        $form = Form::factory()->create(['enabled' => false, 'admin_id' => $this->admin->id]);

        // prepare batch update data with valid and invalid ids
        $items = [
            ['id' => $form->id, 'enabled' => true],
            ['id' => 999999, 'enabled' => true],
        ];

        // expect exception
        $this->expectException(BusinessException::class);
        $this->expectExceptionCode(Code::FORM_NOT_FOUND->value);

        // execute batch update
        $this->service->batchUpdateEnabled($this->admin, $items);

        // form should remain unchanged due to transaction rollback
        $this->assertFalse(Form::find($form->id)->enabled);
    }

    /**
     * test batchUpdateEnabled with toggle enabled status
     *
     * @return void
     */
    public function testBatchUpdateEnabledToggleStatus(): void
    {
        // create test forms with different enabled status
        $form1 = Form::factory()->create(['enabled' => true, 'admin_id' => $this->admin->id]);
        $form2 = Form::factory()->create(['enabled' => false, 'admin_id' => $this->admin->id]);

        // prepare batch update data to toggle status
        $items = [
            ['id' => $form1->id, 'enabled' => false],
            ['id' => $form2->id, 'enabled' => true],
        ];

        // execute batch update
        $this->service->batchUpdateEnabled($this->admin, $items);

        // assert forms are toggled
        $this->assertFalse(Form::find($form1->id)->enabled);
        $this->assertTrue(Form::find($form2->id)->enabled);
    }
}
