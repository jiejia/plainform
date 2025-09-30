<?php

namespace Tests\Unit\Modules\Form;

use Tests\TestCase;
use App\Features\Form\Services\SubmissionService;
use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormSubmission;
use App\Features\Admin\Models\Admin;
use App\Features\Form\Constants\Code;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * SubmissionServiceTest
 *
 * @package Tests\Unit\Modules\Form
 */
class SubmissionServiceTest extends TestCase
{
    use RefreshDatabase;

    private SubmissionService $service;
    private Admin $admin;
    private Form $form;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new SubmissionService();
        $this->admin = Admin::factory()->create();
        $this->form = Form::factory()->create(['admin_id' => $this->admin->id]);
    }

    /**
     * test export with valid data
     *
     * @return void
     */
    public function testExportWithValidData(): void
    {
        // Create test submissions
        $submissions = [
            FormSubmission::create([
                'form_id' => $this->form->id,
                'data' => [
                    [
                        'uuid' => 'uuid-1',
                        'name' => '姓名',
                        'value' => 'John Doe'
                    ],
                    [
                        'uuid' => 'uuid-2',
                        'name' => '邮箱',
                        'value' => 'john@example.com'
                    ],
                    [
                        'uuid' => 'uuid-3',
                        'name' => '年龄',
                        'value' => '30'
                    ]
                ],
                'version' => 1,
                'ipv4' => '192.168.1.1',
                'created_at' => '2025-01-01 10:00:00'
            ]),
            FormSubmission::create([
                'form_id' => $this->form->id,
                'data' => [
                    [
                        'uuid' => 'uuid-1',
                        'name' => '姓名',
                        'value' => 'Jane Smith'
                    ],
                    [
                        'uuid' => 'uuid-2',
                        'name' => '邮箱',
                        'value' => 'jane@example.com'
                    ],
                    [
                        'uuid' => 'uuid-3',
                        'name' => '年龄',
                        'value' => '25'
                    ]
                ],
                'version' => 1,
                'ipv4' => '192.168.1.2',
                'created_at' => '2025-01-01 11:00:00'
            ])
        ];

        // Execute export with ascending order
        $result = $this->service->export(
            $this->form->id,
            1,
            null,
            null,
            null,
            [],
            'created_at',
            'asc'
        );

        // Assert result structure
        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        
        // Assert first row data
        $this->assertEquals('2025-01-01 10:00:00', $result[0]['Created At']);
        $this->assertEquals(1, $result[0]['Version']);
        $this->assertEquals('192.168.1.1', $result[0]['IP']);
        $this->assertEquals('John Doe', $result[0]['姓名']);
        $this->assertEquals('john@example.com', $result[0]['邮箱']);
        $this->assertEquals('30', $result[0]['年龄']);
    }

    /**
     * test export with time range filter
     *
     * @return void
     */
    public function testExportWithTimeRangeFilter(): void
    {
        // Create test submissions with different times
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'User 1'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.1',
            'created_at' => '2025-01-01 10:00:00'
        ]);
        
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'User 2'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.2',
            'created_at' => '2025-01-02 10:00:00'
        ]);

        // Export with time filter
        $result = $this->service->export(
            $this->form->id,
            1,
            '2025-01-02 00:00:00',
            '2025-01-02 23:59:59',
            null,
            [],
            null,
            null
        );

        // Assert only one record is returned
        $this->assertCount(1, $result);
        $this->assertEquals('User 2', $result[0]['姓名']);
    }

    /**
     * test export with IP filter
     *
     * @return void
     */
    public function testExportWithIpFilter(): void
    {
        // Create test submissions with different IPs
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'User 1'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.1',
            'created_at' => '2025-01-01 10:00:00'
        ]);
        
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'User 2'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.2',
            'created_at' => '2025-01-01 11:00:00'
        ]);

        // Export with IP filter
        $result = $this->service->export(
            $this->form->id,
            1,
            null,
            null,
            '192.168.1.2',
            [],
            null,
            null
        );

        // Assert only one record is returned
        $this->assertCount(1, $result);
        $this->assertEquals('User 2', $result[0]['姓名']);
        $this->assertEquals('192.168.1.2', $result[0]['IP']);
    }

    /**
     * test export with dynamic field filter
     *
     * @return void
     */
    public function testExportWithDynamicFieldFilter(): void
    {
        // Create test submissions
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'John Doe'
                ],
                [
                    'uuid' => 'uuid-2',
                    'name' => '年龄',
                    'value' => '30'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.1',
            'created_at' => '2025-01-01 10:00:00'
        ]);
        
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'Jane Smith'
                ],
                [
                    'uuid' => 'uuid-2',
                    'name' => '年龄',
                    'value' => '25'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.2',
            'created_at' => '2025-01-01 11:00:00'
        ]);

        // Export with dynamic field filter
        $result = $this->service->export(
            $this->form->id,
            1,
            null,
            null,
            null,
            [
                [
                    'field_name' => '姓名',
                    'where_type' => 'like',
                    'value' => 'John'
                ]
            ],
            null,
            null
        );

        // Assert only one record is returned
        $this->assertCount(1, $result);
        $this->assertEquals('John Doe', $result[0]['姓名']);
    }

    /**
     * test export with custom sorting
     *
     * @return void
     */
    public function testExportWithCustomSorting(): void
    {
        // Create test submissions
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'User 1'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.1',
            'created_at' => '2025-01-01 10:00:00'
        ]);
        
        FormSubmission::create([
            'form_id' => $this->form->id,
            'data' => [
                [
                    'uuid' => 'uuid-1',
                    'name' => '姓名',
                    'value' => 'User 2'
                ]
            ],
            'version' => 1,
            'ipv4' => '192.168.1.2',
            'created_at' => '2025-01-02 10:00:00'
        ]);

        // Export with ascending order
        $result = $this->service->export(
            $this->form->id,
            1,
            null,
            null,
            null,
            [],
            'created_at',
            'asc'
        );

        // Assert order is correct
        $this->assertEquals('User 1', $result[0]['姓名']);
        $this->assertEquals('User 2', $result[1]['姓名']);
    }

    /**
     * test export with non-existent form
     *
     * @return void
     */
    public function testExportWithNonExistentForm(): void
    {
        $this->expectException(BusinessException::class);
        $this->expectExceptionCode(Code::FORM_NOT_FOUND->value);

        $this->service->export(
            999999,
            1,
            null,
            null,
            null,
            [],
            null,
            null
        );
    }

    /**
     * test export with empty results
     *
     * @return void
     */
    public function testExportWithEmptyResults(): void
    {
        // Export when no submissions exist
        $result = $this->service->export(
            $this->form->id,
            1,
            null,
            null,
            null,
            [],
            null,
            null
        );

        // Assert empty array is returned
        $this->assertIsArray($result);
        $this->assertCount(0, $result);
    }
}
