<?php

namespace Tests\Unit\Modules\Form;

use Tests\TestCase;
use App\Features\Form\Services\IndexService;
use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormSubmission;
use App\Features\Form\Models\FormView;
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

    /**
     * test statistics with today period
     *
     * @return void
     */
    public function testStatisticsWithTodayPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create today's submissions
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now(),
        ]);

        // create today's views
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'visitor1',
            'ipv6' => '192.168.1.1',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'visitor3',
            'ipv6' => '192.168.1.3',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'visitor4',
            'ipv6' => '192.168.1.4',
            'created_at' => now(),
        ]);

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'today');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(4, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert total_submission_number
        $this->assertEquals(2, $figures['total_submission_number']['value']);

        // assert average_submission_number (2 submissions / 1 day = 2)
        $this->assertEquals(2, $figures['average_submission_number']['value']);

        // assert average_finishing_rate (2 submissions / 3 views = 66.67%)
        $this->assertEquals(66.67, $figures['average_finishing_rate']['value']);

        // assert independent_ip_number (4 unique IPs from both submissions and views: 1.1, 1.2, 1.3, 1.4)
        $this->assertEquals(4, $figures['independent_ip_number']['value']);
    }

    /**
     * test statistics with week period
     *
     * @return void
     */
    public function testStatisticsWithWeekPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create this week's submissions
        $thisWeekStart = now()->startOfWeek();
        
        for ($i = 0; $i < 7; $i++) {
            FormSubmission::create([
                'form_id' => $form->id,
                'version' => 1,
                'data' => [],
                'ipv6' => '192.168.1.' . ($i + 1),
                'visitor_id' => 'visitor' . ($i + 1),
                'created_at' => $thisWeekStart->copy()->addDays($i),
            ]);
        }

        // create this week's views
        for ($i = 0; $i < 14; $i++) {
            FormView::create([
                'form_id' => $form->id,
                'form_version' => 1,
                'visitor_id' => 'visitor' . ($i + 1),
                'ipv6' => '192.168.1.' . ($i + 1),
                'created_at' => $thisWeekStart->copy()->addDays($i % 7),
            ]);
        }

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'week');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(4, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert total_submission_number
        $this->assertEquals(7, $figures['total_submission_number']['value']);

        // assert average_submission_number (7 submissions / 7 days = 1)
        $this->assertEquals(1, $figures['average_submission_number']['value']);
    }

    /**
     * test statistics with month period
     *
     * @return void
     */
    public function testStatisticsWithMonthPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create this month's submissions
        $thisMonthStart = now()->startOfMonth();
        
        for ($i = 0; $i < 10; $i++) {
            FormSubmission::create([
                'form_id' => $form->id,
                'version' => 1,
                'data' => [],
                'ipv6' => '192.168.1.' . ($i + 1),
                'visitor_id' => 'visitor' . ($i + 1),
                'created_at' => $thisMonthStart->copy()->addDays($i),
            ]);
        }

        // create this month's views
        for ($i = 0; $i < 20; $i++) {
            FormView::create([
                'form_id' => $form->id,
                'form_version' => 1,
                'visitor_id' => 'viewer' . ($i + 1),
                'ipv6' => '192.168.2.' . ($i + 1),
                'created_at' => $thisMonthStart->copy()->addDays($i % 10),
            ]);
        }

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'month');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(4, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert total_submission_number
        $this->assertEquals(10, $figures['total_submission_number']['value']);
    }

    /**
     * test statistics with non-existent form
     *
     * @return void
     */
    public function testStatisticsWithNonExistentForm(): void
    {
        // expect exception
        $this->expectException(BusinessException::class);
        $this->expectExceptionCode(Code::FORM_NOT_FOUND->value);

        // execute statistics with invalid form id
        $this->service->statistics(999999, 1, 'today');
    }

    /**
     * test statistics with no data
     *
     * @return void
     */
    public function testStatisticsWithNoData(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // execute statistics with no submissions or views
        $result = $this->service->statistics($form->id, 1, 'today');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(4, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert all values are 0
        $this->assertEquals(0, $figures['total_submission_number']['value']);
        $this->assertEquals(0, $figures['average_submission_number']['value']);
        $this->assertEquals(0, $figures['average_finishing_rate']['value']);
        $this->assertEquals(0, $figures['independent_ip_number']['value']);
    }

    /**
     * test statistics growth rate calculation
     *
     * @return void
     */
    public function testStatisticsGrowthRateCalculation(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create yesterday's submission
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->subDay(),
        ]);

        // create today's submissions (2 submissions)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now(),
        ]);

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'today');

        // get figures
        $figures = $result['figures'];

        // assert growth rate is 100% (from 1 to 2 = 100% increase)
        $this->assertEquals(100.00, $figures['total_submission_number']['growth_rate']);
    }

    /**
     * test statistics with all period
     *
     * @return void
     */
    public function testStatisticsWithAllPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create submissions across different times
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->subDays(30),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->subDays(15),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now(),
        ]);

        // create views across different times, covering the full range of submissions
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer0',
            'ipv6' => '192.168.2.1',
            'created_at' => now()->subDays(30),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv6' => '192.168.2.2',
            'created_at' => now()->subDays(25),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv6' => '192.168.2.3',
            'created_at' => now()->subDays(15),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv6' => '192.168.2.4',
            'created_at' => now()->subDays(5),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer4',
            'ipv6' => '192.168.2.5',
            'created_at' => now(),
        ]);

        // execute statistics with 'all' period
        $result = $this->service->statistics($form->id, 1, 'all');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(4, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert total_submission_number is 3
        $this->assertEquals(3, $figures['total_submission_number']['value']);

        // assert growth rate is always 100 for 'all' period
        $this->assertEquals(100.00, $figures['total_submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['average_submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['average_finishing_rate']['growth_rate']);
        $this->assertEquals(100.00, $figures['independent_ip_number']['growth_rate']);
    }

    /**
     * test statistics with all period and no data
     *
     * @return void
     */
    public function testStatisticsWithAllPeriodNoData(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // execute statistics with 'all' period and no data
        $result = $this->service->statistics($form->id, 1, 'all');

        // get figures
        $figures = $result['figures'];

        // assert all values are 0
        $this->assertEquals(0, $figures['total_submission_number']['value']);
        $this->assertEquals(0, $figures['average_submission_number']['value']);
        $this->assertEquals(0, $figures['average_finishing_rate']['value']);
        $this->assertEquals(0, $figures['independent_ip_number']['value']);

        // assert growth rate is always 100 for 'all' period even with no data
        $this->assertEquals(100.00, $figures['total_submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['average_submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['average_finishing_rate']['growth_rate']);
        $this->assertEquals(100.00, $figures['independent_ip_number']['growth_rate']);
    }

    /**
     * test statistics trends with today period
     *
     * @return void
     */
    public function testStatisticsTrendsWithTodayPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create submissions at different hours of today
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->startOfDay()->addHours(8),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->startOfDay()->addHours(8)->addMinutes(30),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now()->startOfDay()->addHours(14),
        ]);

        // create views at different hours of today
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv6' => '192.168.1.4',
            'created_at' => now()->startOfDay()->addHours(8),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv6' => '192.168.1.5',
            'created_at' => now()->startOfDay()->addHours(14),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv6' => '192.168.1.6',
            'created_at' => now()->startOfDay()->addHours(14),
        ]);

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'today');

        // assert trends structure
        $this->assertArrayHasKey('trends', $result);
        $this->assertIsArray($result['trends']);
        $this->assertCount(24, $result['trends']);

        // assert trends data structure for hour 8
        $hour8Trend = $result['trends'][8];
        $this->assertEquals('08:00', $hour8Trend['point']);
        $this->assertEquals(2, $hour8Trend['submissions_count']);
        $this->assertEquals(1, $hour8Trend['views_count']);

        // assert trends data structure for hour 14
        $hour14Trend = $result['trends'][14];
        $this->assertEquals('14:00', $hour14Trend['point']);
        $this->assertEquals(1, $hour14Trend['submissions_count']);
        $this->assertEquals(2, $hour14Trend['views_count']);

        // assert trends data structure for hour 0 (no data)
        $hour0Trend = $result['trends'][0];
        $this->assertEquals('00:00', $hour0Trend['point']);
        $this->assertEquals(0, $hour0Trend['submissions_count']);
        $this->assertEquals(0, $hour0Trend['views_count']);
    }

    /**
     * test statistics trends with week period
     *
     * @return void
     */
    public function testStatisticsTrendsWithWeekPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        $weekStart = now()->startOfWeek();

        // create submissions on different days of the week
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => $weekStart->copy()->addDays(0),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        // create views on different days of the week
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv6' => '192.168.1.4',
            'created_at' => $weekStart->copy()->addDays(0),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv6' => '192.168.1.5',
            'created_at' => $weekStart->copy()->addDays(0),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv6' => '192.168.1.6',
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'week');

        // assert trends structure
        $this->assertArrayHasKey('trends', $result);
        $this->assertIsArray($result['trends']);
        $this->assertCount(7, $result['trends']);

        // assert first day of week
        $firstDayTrend = $result['trends'][0];
        $this->assertEquals($weekStart->format('m/d'), $firstDayTrend['point']);
        $this->assertEquals(1, $firstDayTrend['submissions_count']);
        $this->assertEquals(2, $firstDayTrend['views_count']);

        // assert third day of week
        $thirdDayTrend = $result['trends'][2];
        $this->assertEquals($weekStart->copy()->addDays(2)->format('m/d'), $thirdDayTrend['point']);
        $this->assertEquals(2, $thirdDayTrend['submissions_count']);
        $this->assertEquals(1, $thirdDayTrend['views_count']);

        // assert day with no data
        $fourthDayTrend = $result['trends'][3];
        $this->assertEquals(0, $fourthDayTrend['submissions_count']);
        $this->assertEquals(0, $fourthDayTrend['views_count']);
    }

    /**
     * test statistics trends with month period
     *
     * @return void
     */
    public function testStatisticsTrendsWithMonthPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        $monthStart = now()->startOfMonth();
        $daysInMonth = $monthStart->daysInMonth;

        // create submissions on specific days
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => $monthStart->copy()->addDays(0),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => $monthStart->copy()->addDays(5),
        ]);

        // create views on specific days
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv6' => '192.168.1.3',
            'created_at' => $monthStart->copy()->addDays(0),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv6' => '192.168.1.4',
            'created_at' => $monthStart->copy()->addDays(5),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv6' => '192.168.1.5',
            'created_at' => $monthStart->copy()->addDays(5),
        ]);

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'month');

        // assert trends structure
        $this->assertArrayHasKey('trends', $result);
        $this->assertIsArray($result['trends']);
        $this->assertCount($daysInMonth, $result['trends']);

        // assert first day of month
        $firstDayTrend = $result['trends'][0];
        $this->assertEquals($monthStart->format('m/d'), $firstDayTrend['point']);
        $this->assertEquals(1, $firstDayTrend['submissions_count']);
        $this->assertEquals(1, $firstDayTrend['views_count']);

        // assert sixth day of month
        $sixthDayTrend = $result['trends'][5];
        $this->assertEquals($monthStart->copy()->addDays(5)->format('m/d'), $sixthDayTrend['point']);
        $this->assertEquals(1, $sixthDayTrend['submissions_count']);
        $this->assertEquals(2, $sixthDayTrend['views_count']);
    }

    /**
     * test statistics trends with all period
     *
     * @return void
     */
    public function testStatisticsTrendsWithAllPeriod(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // create submissions across multiple days
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->subDays(5),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->subDays(2),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now(),
        ]);

        // create views across multiple days
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv6' => '192.168.1.4',
            'created_at' => now()->subDays(5),
        ]);

        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv6' => '192.168.1.5',
            'created_at' => now(),
        ]);

        // execute statistics
        $result = $this->service->statistics($form->id, 1, 'all');

        // assert trends structure
        $this->assertArrayHasKey('trends', $result);
        $this->assertIsArray($result['trends']);
        
        // for 'all' period, trends should cover all days from first record to now
        // we have records spanning from 5 days ago to now, so should be at least 6 days
        $this->assertGreaterThanOrEqual(6, count($result['trends']));

        // verify trend structure
        foreach ($result['trends'] as $trend) {
            $this->assertArrayHasKey('point', $trend);
            $this->assertArrayHasKey('views_count', $trend);
            $this->assertArrayHasKey('submissions_count', $trend);
            $this->assertIsString($trend['point']);
            $this->assertIsInt($trend['views_count']);
            $this->assertIsInt($trend['submissions_count']);
        }
    }

    /**
     * test statistics trends with no data
     *
     * @return void
     */
    public function testStatisticsTrendsWithNoData(): void
    {
        // create test form
        $form = Form::factory()->create(['admin_id' => $this->admin->id, 'version' => 1]);

        // execute statistics with today period and no data
        $result = $this->service->statistics($form->id, 1, 'today');

        // assert trends structure
        $this->assertArrayHasKey('trends', $result);
        $this->assertIsArray($result['trends']);
        $this->assertCount(24, $result['trends']);

        // verify all hours have 0 counts
        foreach ($result['trends'] as $trend) {
            $this->assertEquals(0, $trend['views_count']);
            $this->assertEquals(0, $trend['submissions_count']);
        }
    }
}
