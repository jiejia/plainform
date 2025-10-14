<?php

namespace Tests\Unit\Modules\Dashboard;

use Tests\TestCase;
use App\Features\Dashboard\Services\IndexService;
use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormSubmission;
use App\Features\Form\Models\FormView;
use App\Features\Admin\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * DashboardServiceTest
 *
 * @package Tests\Unit\Modules\Dashboard
 */
class DashboardServiceTest extends TestCase
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
     * test statistic with today period
     *
     * @return void
     */
    public function testStatisticWithTodayPeriod(): void
    {
        // create test forms
        $form1 = Form::factory()->create(['admin_id' => $this->admin->id, 'enabled' => true, 'created_at' => now()]);
        $form2 = Form::factory()->create(['admin_id' => $this->admin->id, 'enabled' => false, 'created_at' => now()]);

        // create today's submissions
        FormSubmission::create([
            'form_id' => $form1->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 123456,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => $form1->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 234567,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now(),
        ]);

        // create today's views
        FormView::create([
            'form_id' => $form1->id,
            'form_version' => 1,
            'visitor_id' => 'visitor1',
            'ipv4' => 123456,
            'ipv6' => '192.168.1.1',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => $form1->id,
            'form_version' => 1,
            'visitor_id' => 'visitor3',
            'ipv4' => 345678,
            'ipv6' => '192.168.1.3',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => $form1->id,
            'form_version' => 1,
            'visitor_id' => 'visitor4',
            'ipv4' => 456789,
            'ipv6' => '192.168.1.4',
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(6, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert form_number (2 forms created today)
        $this->assertEquals(2, $figures['form_number']['value']);

        // assert active_form_number (1 enabled form created today)
        $this->assertEquals(1, $figures['active_form_number']['value']);

        // assert submission_number (2 submissions today)
        $this->assertEquals(2, $figures['submission_number']['value']);

        // assert view_number (3 views today)
        $this->assertEquals(3, $figures['view_number']['value']);

        // assert average_finishing_rate (2 submissions / 3 views = 66.67%)
        $this->assertEquals(66.67, $figures['average_finishing_rate']['value']);

        // assert independent_ip_number (4 unique IPs from both submissions and views)
        $this->assertEquals(4, $figures['independent_ip_number']['value']);
    }

    /**
     * test statistic with week period
     *
     * @return void
     */
    public function testStatisticWithWeekPeriod(): void
    {
        // create test forms this week
        $thisWeekStart = now()->startOfWeek();
        
        for ($i = 0; $i < 3; $i++) {
            Form::factory()->create([
                'admin_id' => $this->admin->id,
                'enabled' => true,
                'created_at' => $thisWeekStart->copy()->addDays($i),
            ]);
        }

        // create this week's submissions
        for ($i = 0; $i < 7; $i++) {
            FormSubmission::create([
                'form_id' => 1,
                'version' => 1,
                'data' => [],
                'ipv4' => 100000 + $i,
                'ipv6' => '192.168.1.' . ($i + 1),
                'visitor_id' => 'visitor' . ($i + 1),
                'created_at' => $thisWeekStart->copy()->addDays($i),
            ]);
        }

        // create this week's views
        for ($i = 0; $i < 14; $i++) {
            FormView::create([
                'form_id' => 1,
                'form_version' => 1,
                'visitor_id' => 'viewer' . ($i + 1),
                'ipv4' => 200000 + $i,
                'ipv6' => '192.168.2.' . ($i + 1),
                'created_at' => $thisWeekStart->copy()->addDays($i % 7),
            ]);
        }

        // execute statistic
        $result = $this->service->statistic('week');

        // get figures
        $figures = $result['figures'];

        // assert form_number
        $this->assertEquals(3, $figures['form_number']['value']);

        // assert submission_number
        $this->assertEquals(7, $figures['submission_number']['value']);

        // assert view_number
        $this->assertEquals(14, $figures['view_number']['value']);

        // assert average_finishing_rate (7 / 14 = 50%)
        $this->assertEquals(50.00, $figures['average_finishing_rate']['value']);
    }

    /**
     * test statistic with month period
     *
     * @return void
     */
    public function testStatisticWithMonthPeriod(): void
    {
        // create test forms this month
        $thisMonthStart = now()->startOfMonth();
        
        for ($i = 0; $i < 5; $i++) {
            Form::factory()->create([
                'admin_id' => $this->admin->id,
                'enabled' => $i % 2 == 0, // alternating enabled/disabled
                'created_at' => $thisMonthStart->copy()->addDays($i),
            ]);
        }

        // create this month's submissions
        for ($i = 0; $i < 10; $i++) {
            FormSubmission::create([
                'form_id' => 1,
                'version' => 1,
                'data' => [],
                'ipv4' => 100000 + $i,
                'ipv6' => '192.168.1.' . ($i + 1),
                'visitor_id' => 'visitor' . ($i + 1),
                'created_at' => $thisMonthStart->copy()->addDays($i),
            ]);
        }

        // create this month's views
        for ($i = 0; $i < 20; $i++) {
            FormView::create([
                'form_id' => 1,
                'form_version' => 1,
                'visitor_id' => 'viewer' . ($i + 1),
                'ipv4' => 200000 + $i,
                'ipv6' => '192.168.2.' . ($i + 1),
                'created_at' => $thisMonthStart->copy()->addDays($i % 10),
            ]);
        }

        // execute statistic
        $result = $this->service->statistic('month');

        // get figures
        $figures = $result['figures'];

        // assert form_number (5 forms created this month)
        $this->assertEquals(5, $figures['form_number']['value']);

        // assert active_form_number (3 enabled forms)
        $this->assertEquals(3, $figures['active_form_number']['value']);

        // assert submission_number (10 submissions)
        $this->assertEquals(10, $figures['submission_number']['value']);

        // assert view_number (20 views)
        $this->assertEquals(20, $figures['view_number']['value']);

        // assert average_finishing_rate (10 / 20 = 50%)
        $this->assertEquals(50.00, $figures['average_finishing_rate']['value']);
    }

    /**
     * test statistic with all period
     *
     * @return void
     */
    public function testStatisticWithAllPeriod(): void
    {
        // create forms across different times
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now()->subDays(30),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now()->subDays(15),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => false,
            'created_at' => now(),
        ]);

        // create submissions across different times
        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->subDays(30),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->subDays(15),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 333333,
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now(),
        ]);

        // create views across different times
        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv4' => 444444,
            'ipv6' => '192.168.2.1',
            'created_at' => now()->subDays(30),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv4' => 555555,
            'ipv6' => '192.168.2.2',
            'created_at' => now(),
        ]);

        // execute statistic with 'all' period
        $result = $this->service->statistic('all');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(6, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert growth rate is always 100 for 'all' period
        $this->assertEquals(100.00, $figures['form_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['view_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['active_form_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['independent_ip_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['average_finishing_rate']['growth_rate']);
    }

    /**
     * test statistic with no data
     *
     * @return void
     */
    public function testStatisticWithNoData(): void
    {
        // execute statistic with no forms, submissions or views
        $result = $this->service->statistic('today');

        // assert result structure
        $this->assertArrayHasKey('figures', $result);
        $this->assertCount(6, $result['figures']);

        // get figures
        $figures = $result['figures'];

        // assert all values are 0
        $this->assertEquals(0, $figures['form_number']['value']);
        $this->assertEquals(0, $figures['submission_number']['value']);
        $this->assertEquals(0, $figures['view_number']['value']);
        $this->assertEquals(0, $figures['active_form_number']['value']);
        $this->assertEquals(0, $figures['independent_ip_number']['value']);
        $this->assertEquals(0, $figures['average_finishing_rate']['value']);
    }

    /**
     * test statistic growth rate calculation
     *
     * @return void
     */
    public function testStatisticGrowthRateCalculation(): void
    {
        // create yesterday's data
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now()->subDay(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->subDay(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv4' => 222222,
            'ipv6' => '192.168.2.1',
            'created_at' => now()->subDay(),
        ]);

        // create today's data (2x yesterday's data)
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 333333,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 444444,
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv4' => 555555,
            'ipv6' => '192.168.2.2',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv4' => 666666,
            'ipv6' => '192.168.2.3',
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // get figures
        $figures = $result['figures'];

        // assert growth rate is 100% (from 1 to 2 = 100% increase)
        $this->assertEquals(100.00, $figures['form_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['view_number']['growth_rate']);
    }

    /**
     * test statistic with zero previous value
     *
     * @return void
     */
    public function testStatisticWithZeroPreviousValue(): void
    {
        // create only today's data (no yesterday's data)
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv4' => 222222,
            'ipv6' => '192.168.2.1',
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // get figures
        $figures = $result['figures'];

        // when previous value is 0 and current value > 0, growth rate should be 100%
        $this->assertEquals(100.00, $figures['form_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['submission_number']['growth_rate']);
        $this->assertEquals(100.00, $figures['view_number']['growth_rate']);
    }

    /**
     * test statistic with negative growth
     *
     * @return void
     */
    public function testStatisticWithNegativeGrowth(): void
    {
        // create yesterday's data (2 forms, 2 submissions, 2 views)
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now()->subDay(),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now()->subDay(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->subDay(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->subDay(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv4' => 333333,
            'ipv6' => '192.168.2.1',
            'created_at' => now()->subDay(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv4' => 444444,
            'ipv6' => '192.168.2.2',
            'created_at' => now()->subDay(),
        ]);

        // create today's data (1 form, 1 submission, 1 view - half of yesterday)
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 555555,
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now(),
        ]);

        FormView::create([
            'form_id' => 1,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv4' => 666666,
            'ipv6' => '192.168.2.3',
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // get figures
        $figures = $result['figures'];

        // assert growth rate is -50% (from 2 to 1 = -50% decrease)
        $this->assertEquals(-50.00, $figures['form_number']['growth_rate']);
        $this->assertEquals(-50.00, $figures['submission_number']['growth_rate']);
        $this->assertEquals(-50.00, $figures['view_number']['growth_rate']);
    }
}

