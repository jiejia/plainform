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

    /**
     * test create with options field config processing
     *
     * @return void
     */
    public function testCreateWithOptionsFieldConfig(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'select',
            'name' => 'Select',
            'config' => [],
            'icon' => 'ChevronDown',
            'group' => 'general'
        ]);

        // prepare test data with options field
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-1',
                'type' => 'select',
                'title' => 'Test Select',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'option1'],
                            ['val' => 'option2'],
                            ['val' => 'option3']
                        ]
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert field config regex is set correctly
        $expectedRegex = '^(option1|option2|option3)$';
        $this->assertEquals($expectedRegex, $result['fields'][0]['config']['regex']['value']);
    }

    /**
     * test create with boolean field config processing
     *
     * @return void
     */
    public function testCreateWithBooleanFieldConfig(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'switch',
            'name' => 'Switch',
            'config' => [],
            'icon' => 'ToggleLeft',
            'group' => 'general'
        ]);

        // prepare test data with boolean field
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-2',
                'type' => 'switch',
                'title' => 'Test Switch',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'boolean'
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert field config regex is set correctly
        $expectedRegex = '^(true|false)$';
        $this->assertEquals($expectedRegex, $result['fields'][0]['config']['regex']['value']);
    }

    /**
     * test create with string field config processing
     *
     * @return void
     */
    public function testCreateWithStringFieldConfig(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'text',
            'name' => 'Text',
            'config' => [],
            'icon' => 'Type',
            'group' => 'general'
        ]);

        // prepare test data with string field
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-3',
                'type' => 'text',
                'title' => 'Test Text',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'string'
                    ],
                    'regex' => [
                        'value' => '^[a-zA-Z]+$',
                        'warning_message' => 'Only letters allowed'
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert field config regex is unchanged
        $expectedRegex = '^[a-zA-Z]+$';
        $this->assertEquals($expectedRegex, $result['fields'][0]['config']['regex']['value']);
    }

    /**
     * test update with options field config processing
     *
     * @return void
     */
    public function testUpdateWithOptionsFieldConfig(): void
    {
        // create test form first
        $form = Form::factory()->create(['admin_id' => $this->admin->id]);

        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'select',
            'name' => 'Select',
            'config' => [],
            'icon' => 'ChevronDown',
            'group' => 'general'
        ]);

        // prepare test data with options field
        $title = 'Updated Form';
        $description = 'Updated Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-4',
                'type' => 'select',
                'title' => 'Updated Select',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'new_option1'],
                            ['val' => 'new_option2']
                        ]
                    ]
                ]
            ]
        ];

        // execute update
        $result = $this->service->update($this->admin, $form->id, $title, $description, $enabled, $numberingStyle, $fields);

        // assert field config regex is set correctly
        $expectedRegex = '^(new_option1|new_option2)$';
        $this->assertEquals($expectedRegex, $result['fields'][0]['config']['regex']['value']);
    }

    /**
     * test create with options field default value processing
     *
     * @return void
     */
    public function testCreateWithOptionsFieldDefaultValue(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'select',
            'name' => 'Select',
            'config' => [],
            'icon' => 'ChevronDown',
            'group' => 'general'
        ]);

        // prepare test data with options field and selected options
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-default-1',
                'type' => 'select',
                'title' => 'Test Select with Default',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'option1', 'selected' => true],
                            ['val' => 'option2', 'selected' => false],
                            ['val' => 'option3', 'selected' => true]
                        ]
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert default_value.value contains selected options
        $expectedDefaultValue = ['option1', 'option3'];
        $this->assertEquals($expectedDefaultValue, $result['fields'][0]['config']['default_value']['value']);
    }

    /**
     * test update with options field default value processing
     *
     * @return void
     */
    public function testUpdateWithOptionsFieldDefaultValue(): void
    {
        // create test form first
        $form = Form::factory()->create(['admin_id' => $this->admin->id]);

        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'checkbox',
            'name' => 'Checkbox',
            'config' => [],
            'icon' => 'CheckSquare',
            'group' => 'general'
        ]);

        // prepare test data with checkbox field and selected options
        $title = 'Updated Form';
        $description = 'Updated Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-default-2',
                'type' => 'checkbox',
                'title' => 'Test Checkbox with Default',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'check1', 'selected' => false],
                            ['val' => 'check2', 'selected' => true],
                            ['val' => 'check3', 'selected' => true],
                            ['val' => 'check4', 'selected' => false]
                        ]
                    ]
                ]
            ]
        ];

        // execute update
        $result = $this->service->update($this->admin, $form->id, $title, $description, $enabled, $numberingStyle, $fields);

        // assert default_value.value contains selected options
        $expectedDefaultValue = ['check2', 'check3'];
        $this->assertEquals($expectedDefaultValue, $result['fields'][0]['config']['default_value']['value']);
    }

    /**
     * test create with radio field default value processing
     *
     * @return void
     */
    public function testCreateWithRadioFieldDefaultValue(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'radio',
            'name' => 'Radio',
            'config' => [],
            'icon' => 'Circle',
            'group' => 'general'
        ]);

        // prepare test data with radio field and one selected option
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-default-3',
                'type' => 'radio',
                'title' => 'Test Radio with Default',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'radio1', 'selected' => false],
                            ['val' => 'radio2', 'selected' => true],
                            ['val' => 'radio3', 'selected' => false]
                        ]
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert default_value.value contains selected option as string for radio
        $expectedDefaultValue = 'radio2';
        $this->assertEquals($expectedDefaultValue, $result['fields'][0]['config']['default_value']['value']);
    }

    /**
     * test create with options field no selected options
     *
     * @return void
     */
    public function testCreateWithOptionsFieldNoSelectedOptions(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'select',
            'name' => 'Select',
            'config' => [],
            'icon' => 'ChevronDown',
            'group' => 'general'
        ]);

        // prepare test data with options field but no selected options
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-default-4',
                'type' => 'select',
                'title' => 'Test Select No Default',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'option1', 'selected' => false],
                            ['val' => 'option2', 'selected' => false],
                            ['val' => 'option3', 'selected' => false]
                        ]
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert default_value.value is empty array when no options are selected
        $expectedDefaultValue = [];
        $this->assertEquals($expectedDefaultValue, $result['fields'][0]['config']['default_value']['value']);
    }

    /**
     * test create with radio field no selected options
     *
     * @return void
     */
    public function testCreateWithRadioFieldNoSelectedOptions(): void
    {
        // create a test control first
        $control = \App\Features\Form\Models\Control::create([
            'type' => 'radio',
            'name' => 'Radio',
            'config' => [],
            'icon' => 'Circle',
            'group' => 'general'
        ]);

        // prepare test data with radio field but no selected options
        $title = 'Test Form';
        $description = 'Test Description';
        $enabled = 1;
        $numberingStyle = 1;
        $fields = [
            [
                'uuid' => 'test-uuid-radio-no-default',
                'type' => 'radio',
                'title' => 'Test Radio No Default',
                'required' => false,
                'control_id' => $control->id,
                'control_type' => $control->type,
                'control_name' => $control->name,
                'config' => [
                    'default_value' => [
                        'type' => 'options'
                    ],
                    'options' => [
                        'default_options' => [
                            ['val' => 'radio1', 'selected' => false],
                            ['val' => 'radio2', 'selected' => false],
                            ['val' => 'radio3', 'selected' => false]
                        ]
                    ]
                ]
            ]
        ];

        // execute create
        $result = $this->service->create($this->admin, $title, $description, $enabled, $numberingStyle, $fields);

        // assert default_value.value is empty string when no radio option is selected
        $expectedDefaultValue = '';
        $this->assertEquals($expectedDefaultValue, $result['fields'][0]['config']['default_value']['value']);
    }
}
