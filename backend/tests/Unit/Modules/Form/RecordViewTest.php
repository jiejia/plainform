<?php

namespace Tests\Unit\Modules\Form;

use Tests\TestCase;
use App\Features\Form\Services\IndexService;
use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormView;
use App\Features\Admin\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * RecordViewTest
 * 
 * @package Tests\Unit\Modules\Form
 */
class RecordViewTest extends TestCase
{
    use RefreshDatabase;

    private IndexService $service;
    private Admin $admin;
    private Form $form;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->service = app(IndexService::class);
        
        // Create test admin
        $this->admin = Admin::factory()->create();
        
        // Create test form
        $this->form = Form::create([
            'title' => 'Test Form',
            'description' => 'Test Description',
            'enabled' => true,
            'numbering_style' => 0,
            'admin_id' => $this->admin->id,
            'version' => 1,
        ]);
    }

    /**
     * Test record view successfully
     *
     * @return void
     */
    public function test_record_view_successfully(): void
    {
        $visitorId = 'test-visitor-123';
        $ip = '192.168.1.1';
        $userAgent = 'Mozilla/5.0 Test Browser';

        // Record view
        $this->service->recordView($this->form->uuid, $visitorId, $ip, $userAgent);

        // Assert record exists
        $this->assertDatabaseHas('form_views', [
            'form_id' => $this->form->id,
            'visitor_id' => $visitorId,
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * Test record view prevents duplicates within 24 hours
     *
     * @return void
     */
    public function test_record_view_prevents_duplicates_within_24_hours(): void
    {
        $visitorId = 'test-visitor-456';
        $ip = '192.168.1.2';
        $userAgent = 'Mozilla/5.0 Test Browser';

        // Record view first time
        $this->service->recordView($this->form->uuid, $visitorId, $ip, $userAgent);

        // Try to record again immediately
        $this->service->recordView($this->form->uuid, $visitorId, $ip, $userAgent);

        // Assert only one record exists
        $count = FormView::where('form_id', $this->form->id)
            ->where('visitor_id', $visitorId)
            ->count();

        $this->assertEquals(1, $count);
    }

    /**
     * Test record view for disabled form throws exception
     *
     * @return void
     */
    public function test_record_view_for_disabled_form_throws_exception(): void
    {
        // Disable form
        $this->form->update(['enabled' => false]);

        $visitorId = 'test-visitor-789';
        $ip = '192.168.1.3';

        // Expect exception
        $this->expectException(\App\Features\Core\Exceptions\BusinessException::class);

        // Try to record view
        $this->service->recordView($this->form->uuid, $visitorId, $ip);
    }

    /**
     * Test record view for non-existent form throws exception
     *
     * @return void
     */
    public function test_record_view_for_non_existent_form_throws_exception(): void
    {
        $invalidUuid = '00000000-0000-0000-0000-000000000000';
        $visitorId = 'test-visitor-000';
        $ip = '192.168.1.4';

        // Expect exception
        $this->expectException(\App\Features\Core\Exceptions\BusinessException::class);

        // Try to record view
        $this->service->recordView($invalidUuid, $visitorId, $ip);
    }

    /**
     * Test record view with different IPs are recorded separately
     *
     * @return void
     */
    public function test_record_view_with_different_ips_recorded_separately(): void
    {
        $visitorId = 'test-visitor-same';
        $ip1 = '192.168.1.10';
        $ip2 = '192.168.1.20';
        $userAgent = 'Mozilla/5.0 Test Browser';

        // Record view from first IP
        $this->service->recordView($this->form->uuid, $visitorId, $ip1, $userAgent);

        // Record view from second IP
        $this->service->recordView($this->form->uuid, $visitorId, $ip2, $userAgent);

        // Assert two records exist
        $count = FormView::where('form_id', $this->form->id)
            ->where('visitor_id', $visitorId)
            ->count();

        $this->assertEquals(2, $count);
    }
}

