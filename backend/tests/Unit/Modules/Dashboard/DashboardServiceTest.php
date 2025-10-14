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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(6, $result['submission_overview']); // 6 time points for today

        // verify structure of submission_overview
        foreach ($result['submission_overview'] as $overview) {
            $this->assertArrayHasKey('point', $overview);
            $this->assertArrayHasKey('total', $overview);
            $this->assertArrayHasKey('unique', $overview);
        }
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(7, $result['submission_overview']); // 7 time points for week (Monday to Sunday)

        // verify structure of submission_overview
        foreach ($result['submission_overview'] as $overview) {
            $this->assertArrayHasKey('point', $overview);
            $this->assertArrayHasKey('total', $overview);
            $this->assertArrayHasKey('unique', $overview);
        }
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertGreaterThan(0, count($result['submission_overview'])); // month has multiple time points

        // verify structure of submission_overview
        foreach ($result['submission_overview'] as $overview) {
            $this->assertArrayHasKey('point', $overview);
            $this->assertArrayHasKey('total', $overview);
            $this->assertArrayHasKey('unique', $overview);
        }
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertLessThanOrEqual(10, count($result['submission_overview'])); // max 10 time points

        // verify structure of submission_overview
        foreach ($result['submission_overview'] as $overview) {
            $this->assertArrayHasKey('point', $overview);
            $this->assertArrayHasKey('total', $overview);
            $this->assertArrayHasKey('unique', $overview);
        }
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(6, $result['submission_overview']); // 6 time points for today

        // verify all submission_overview values are 0
        foreach ($result['submission_overview'] as $overview) {
            $this->assertEquals(0, $overview['total']);
            $this->assertEquals(0, $overview['unique']);
        }
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(6, $result['submission_overview']); // 6 time points for today
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(6, $result['submission_overview']); // 6 time points for today
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

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(6, $result['submission_overview']); // 6 time points for today
    }

    /**
     * test form trends with today period
     *
     * @return void
     */
    public function testFormTrendsWithTodayPeriod(): void
    {
        // create forms at different hours of today
        $today = now()->startOfDay();
        
        // create forms in first time slot (0-4 hours)
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => $today->copy()->addHours(2),
        ]);

        // create forms in third time slot (8-12 hours)
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => $today->copy()->addHours(10),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => false,
            'created_at' => $today->copy()->addHours(11),
        ]);

        // create submissions at different hours
        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => $today->copy()->addHours(2),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => $today->copy()->addHours(10),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // assert result has form_trends
        $this->assertArrayHasKey('form_trends', $result);
        
        // assert form_trends has 6 time points (24 hours / 4 = 6)
        $this->assertCount(6, $result['form_trends']);

        // verify first time point has data
        $firstPoint = $result['form_trends'][0];
        $this->assertArrayHasKey('point', $firstPoint);
        $this->assertArrayHasKey('created', $firstPoint);
        $this->assertArrayHasKey('active', $firstPoint);
        $this->assertArrayHasKey('submissions', $firstPoint);

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(6, $result['submission_overview']); // 6 time points for today
    }

    /**
     * test form trends with week period
     *
     * @return void
     */
    public function testFormTrendsWithWeekPeriod(): void
    {
        // create forms on different days of the week
        $weekStart = now()->startOfWeek();
        
        // create forms on Monday
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => $weekStart->copy(),
        ]);

        // create forms on Wednesday
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => false,
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        // create submissions on different days
        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => $weekStart->copy(),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        FormSubmission::create([
            'form_id' => 1,
            'version' => 1,
            'data' => [],
            'ipv4' => 333333,
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => $weekStart->copy()->addDays(2),
        ]);

        // execute statistic
        $result = $this->service->statistic('week');

        // assert result has form_trends
        $this->assertArrayHasKey('form_trends', $result);
        
        // assert form_trends has 7 time points (Monday to Sunday)
        $this->assertCount(7, $result['form_trends']);

        // verify structure of each point
        foreach ($result['form_trends'] as $point) {
            $this->assertArrayHasKey('point', $point);
            $this->assertArrayHasKey('created', $point);
            $this->assertArrayHasKey('active', $point);
            $this->assertArrayHasKey('submissions', $point);
        }

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(7, $result['submission_overview']); // 7 time points for week
    }

    /**
     * test form trends with month period
     *
     * @return void
     */
    public function testFormTrendsWithMonthPeriod(): void
    {
        // create forms at different times of the month
        $monthStart = now()->startOfMonth();
        
        // create forms on day 1
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => $monthStart->copy(),
        ]);

        // create forms on day 5
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => $monthStart->copy()->addDays(4),
        ]);

        // execute statistic
        $result = $this->service->statistic('month');

        // assert result has form_trends
        $this->assertArrayHasKey('form_trends', $result);
        
        // assert form_trends has multiple time points (approximately 10 for a 30-day month)
        $this->assertGreaterThan(0, count($result['form_trends']));
        
        // verify structure of each point
        foreach ($result['form_trends'] as $point) {
            $this->assertArrayHasKey('point', $point);
            $this->assertArrayHasKey('created', $point);
            $this->assertArrayHasKey('active', $point);
            $this->assertArrayHasKey('submissions', $point);
        }

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertGreaterThan(0, count($result['submission_overview']));
    }

    /**
     * test form trends with all period (less than 10 days)
     *
     * @return void
     */
    public function testFormTrendsWithAllPeriodLessThan10Days(): void
    {
        // create forms across 5 days
        $baseDate = now()->subDays(4);
        
        for ($i = 0; $i < 5; $i++) {
            Form::factory()->create([
                'admin_id' => $this->admin->id,
                'enabled' => true,
                'created_at' => $baseDate->copy()->addDays($i),
            ]);
        }

        // execute statistic
        $result = $this->service->statistic('all');

        // assert result has form_trends
        $this->assertArrayHasKey('form_trends', $result);
        
        // assert form_trends has at most 10 time points (should be around 5-6 due to date range calculation)
        $this->assertLessThanOrEqual(10, count($result['form_trends']));
        $this->assertGreaterThan(0, count($result['form_trends']));
        
        // verify structure of each point
        foreach ($result['form_trends'] as $point) {
            $this->assertArrayHasKey('point', $point);
            $this->assertArrayHasKey('created', $point);
            $this->assertArrayHasKey('active', $point);
            $this->assertArrayHasKey('submissions', $point);
        }

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertLessThanOrEqual(10, count($result['submission_overview']));
        $this->assertGreaterThan(0, count($result['submission_overview']));
    }

    /**
     * test form trends with all period (more than 10 days)
     *
     * @return void
     */
    public function testFormTrendsWithAllPeriodMoreThan10Days(): void
    {
        // create forms across 30 days
        $baseDate = now()->subDays(29);
        
        for ($i = 0; $i < 30; $i += 3) {
            Form::factory()->create([
                'admin_id' => $this->admin->id,
                'enabled' => true,
                'created_at' => $baseDate->copy()->addDays($i),
            ]);
        }

        // execute statistic
        $result = $this->service->statistic('all');

        // assert result has form_trends
        $this->assertArrayHasKey('form_trends', $result);
        
        // assert form_trends has 10 time points (max)
        $this->assertCount(10, $result['form_trends']);
        
        // verify structure of each point
        foreach ($result['form_trends'] as $point) {
            $this->assertArrayHasKey('point', $point);
            $this->assertArrayHasKey('created', $point);
            $this->assertArrayHasKey('active', $point);
            $this->assertArrayHasKey('submissions', $point);
        }

        // assert submission_overview structure
        $this->assertArrayHasKey('submission_overview', $result);
        $this->assertCount(10, $result['submission_overview']); // max 10 time points
    }

    /**
     * test recent activities
     *
     * @return void
     */
    public function testRecentActivities(): void
    {
        // create test forms
        $form1 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'title' => 'Contact Form',
            'created_at' => now()->subHours(5),
        ]);

        $form2 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'title' => 'Survey Form',
            'created_at' => now()->subHours(4),
        ]);

        // create submissions with geographic information
        FormSubmission::create([
            'form_id' => $form1->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'country' => 'United States',
            'city' => 'New York',
            'created_at' => now()->subHours(3),
        ]);

        FormSubmission::create([
            'form_id' => $form2->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'country' => 'United Kingdom',
            'city' => 'London',
            'created_at' => now()->subHours(2),
        ]);

        // create views with geographic information
        FormView::create([
            'form_id' => $form1->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv4' => 333333,
            'ipv6' => '192.168.2.1',
            'country' => 'Canada',
            'city' => 'Toronto',
            'created_at' => now()->subHours(1),
        ]);

        FormView::create([
            'form_id' => $form2->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv4' => 444444,
            'ipv6' => '192.168.2.2',
            'country' => 'Australia',
            'city' => 'Sydney',
            'created_at' => now()->subMinutes(30),
        ]);

        FormView::create([
            'form_id' => $form1->id,
            'form_version' => 1,
            'visitor_id' => 'viewer3',
            'ipv4' => 555555,
            'ipv6' => '192.168.2.3',
            'country' => 'Japan',
            'city' => 'Tokyo',
            'created_at' => now()->subMinutes(10),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // assert result has recent_activities
        $this->assertArrayHasKey('recent_activities', $result);

        // assert recent_activities has at most 5 items
        $this->assertLessThanOrEqual(5, count($result['recent_activities']));
        $this->assertEquals(5, count($result['recent_activities']));

        // verify structure of each activity
        foreach ($result['recent_activities'] as $activity) {
            $this->assertArrayHasKey('id', $activity);
            $this->assertArrayHasKey('form_title', $activity);
            $this->assertArrayHasKey('visitor_region', $activity);
            $this->assertArrayHasKey('time', $activity);
            $this->assertArrayHasKey('status', $activity);

            // verify status is either 'viewed' or 'completed'
            $this->assertContains($activity['status'], ['viewed', 'completed']);
        }

        // verify the most recent activity is the last view (10 minutes ago)
        $mostRecent = $result['recent_activities'][0];
        $this->assertEquals($form1->id, $mostRecent['id']);
        $this->assertEquals('Contact Form', $mostRecent['form_title']);
        $this->assertEquals('Japan Tokyo', $mostRecent['visitor_region']);
        $this->assertEquals('viewed', $mostRecent['status']);

        // verify visitor_region format (country + ' ' + city)
        $this->assertStringContainsString('Japan Tokyo', $result['recent_activities'][0]['visitor_region']);
        $this->assertStringContainsString('Australia Sydney', $result['recent_activities'][1]['visitor_region']);
    }

    /**
     * test recent activities with no data
     *
     * @return void
     */
    public function testRecentActivitiesWithNoData(): void
    {
        // execute statistic with no submissions or views
        $result = $this->service->statistic('today');

        // assert result has recent_activities
        $this->assertArrayHasKey('recent_activities', $result);

        // assert recent_activities is empty
        $this->assertEmpty($result['recent_activities']);
    }

    /**
     * test recent activities with partial geographic data
     *
     * @return void
     */
    public function testRecentActivitiesWithPartialGeographicData(): void
    {
        // create test form
        $form = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'title' => 'Test Form',
            'created_at' => now(),
        ]);

        // create submission with only country
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'country' => 'France',
            'city' => null,
            'created_at' => now()->subHours(2),
        ]);

        // create view with only city
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer1',
            'ipv4' => 222222,
            'ipv6' => '192.168.2.1',
            'country' => null,
            'city' => 'Berlin',
            'created_at' => now()->subHours(1),
        ]);

        // create view with no geographic data
        FormView::create([
            'form_id' => $form->id,
            'form_version' => 1,
            'visitor_id' => 'viewer2',
            'ipv4' => 333333,
            'ipv6' => '192.168.2.2',
            'country' => null,
            'city' => null,
            'created_at' => now()->subMinutes(30),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // assert result has recent_activities
        $this->assertArrayHasKey('recent_activities', $result);
        $this->assertEquals(3, count($result['recent_activities']));

        // verify visitor_region is properly trimmed
        $this->assertEquals('', $result['recent_activities'][0]['visitor_region']);
        $this->assertEquals('Berlin', $result['recent_activities'][1]['visitor_region']);
        $this->assertEquals('France', $result['recent_activities'][2]['visitor_region']);
    }

    /**
     * test form distribution
     *
     * @return void
     */
    public function testFormDistribution(): void
    {
        // create test forms with different statuses
        $form1 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        $form2 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        $form3 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => false,
            'created_at' => now(),
        ]);

        // create submissions for form1 to make it active
        FormSubmission::create([
            'form_id' => $form1->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // assert result has form_distribution
        $this->assertArrayHasKey('form_distribution', $result);

        // get form_distribution
        $distribution = $result['form_distribution'];

        // verify structure
        $this->assertArrayHasKey('active', $distribution);
        $this->assertArrayHasKey('closed', $distribution);
        $this->assertArrayHasKey('enabled', $distribution);

        // assert values
        $this->assertEquals(1, $distribution['active']); // form1 is enabled with submissions
        $this->assertEquals(1, $distribution['closed']); // form3 is disabled
        $this->assertEquals(2, $distribution['enabled']); // form1 and form2 are enabled
    }

    /**
     * test form distribution with no active forms
     *
     * @return void
     */
    public function testFormDistributionWithNoActiveForms(): void
    {
        // create enabled forms without submissions
        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => false,
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // get form_distribution
        $distribution = $result['form_distribution'];

        // assert values
        $this->assertEquals(0, $distribution['active']); // no forms have submissions
        $this->assertEquals(1, $distribution['closed']); // 1 disabled form
        $this->assertEquals(1, $distribution['enabled']); // 1 enabled form
    }

    /**
     * test form distribution with all active forms
     *
     * @return void
     */
    public function testFormDistributionWithAllActiveForms(): void
    {
        // create enabled forms with submissions
        $form1 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        $form2 = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        // create submissions for both forms
        FormSubmission::create([
            'form_id' => $form1->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now(),
        ]);

        FormSubmission::create([
            'form_id' => $form2->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now(),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // get form_distribution
        $distribution = $result['form_distribution'];

        // assert values
        $this->assertEquals(2, $distribution['active']); // both forms have submissions
        $this->assertEquals(0, $distribution['closed']); // no disabled forms
        $this->assertEquals(2, $distribution['enabled']); // both forms are enabled
    }

    /**
     * test form distribution across different periods
     *
     * @return void
     */
    public function testFormDistributionAcrossDifferentPeriods(): void
    {
        // create forms from yesterday
        $formOld = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now()->subDay(),
        ]);

        // create forms from today
        $formToday = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        // create submission for today's form
        FormSubmission::create([
            'form_id' => $formToday->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now(),
        ]);

        // execute statistic for today
        $result = $this->service->statistic('today');

        // get form_distribution
        $distribution = $result['form_distribution'];

        // assert values (only count today's forms)
        $this->assertEquals(1, $distribution['active']); // only formToday
        $this->assertEquals(0, $distribution['closed']); // no disabled forms today
        $this->assertEquals(1, $distribution['enabled']); // only formToday
    }

    /**
     * test submission distribution
     *
     * @return void
     */
    public function testSubmissionDistribution(): void
    {
        // create test forms
        $form = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        // create submissions at different hours of the day
        // 00-06 凌晨 period (2 submissions)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->setHour(2)->setMinute(30),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->setHour(5)->setMinute(0),
        ]);

        // 06-09 早晨 period (1 submission)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 333333,
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now()->setHour(7)->setMinute(30),
        ]);

        // 09-12 上午 period (2 submissions)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 444444,
            'ipv6' => '192.168.1.4',
            'visitor_id' => 'visitor4',
            'created_at' => now()->setHour(10)->setMinute(0),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 555555,
            'ipv6' => '192.168.1.5',
            'visitor_id' => 'visitor5',
            'created_at' => now()->setHour(11)->setMinute(30),
        ]);

        // 12-15 中午 period (2 submissions)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 666666,
            'ipv6' => '192.168.1.6',
            'visitor_id' => 'visitor6',
            'created_at' => now()->setHour(13)->setMinute(0),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 777777,
            'ipv6' => '192.168.1.7',
            'visitor_id' => 'visitor7',
            'created_at' => now()->setHour(14)->setMinute(30),
        ]);

        // 15-18 下午 period (1 submission)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 888888,
            'ipv6' => '192.168.1.8',
            'visitor_id' => 'visitor8',
            'created_at' => now()->setHour(16)->setMinute(0),
        ]);

        // 18-24 晚上 period (4 submissions)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 999999,
            'ipv6' => '192.168.1.9',
            'visitor_id' => 'visitor9',
            'created_at' => now()->setHour(19)->setMinute(0),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 1010101,
            'ipv6' => '192.168.1.10',
            'visitor_id' => 'visitor10',
            'created_at' => now()->setHour(20)->setMinute(30),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 1111111,
            'ipv6' => '192.168.1.11',
            'visitor_id' => 'visitor11',
            'created_at' => now()->setHour(22)->setMinute(0),
        ]);

        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 1212121,
            'ipv6' => '192.168.1.12',
            'visitor_id' => 'visitor12',
            'created_at' => now()->setHour(23)->setMinute(30),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // assert result has submission_distribution
        $this->assertArrayHasKey('submission_distribution', $result);

        // get submission_distribution
        $distribution = $result['submission_distribution'];

        // assert distribution has 6 time periods
        $this->assertCount(6, $distribution);

        // verify structure of each period
        foreach ($distribution as $period) {
            $this->assertArrayHasKey('period', $period);
            $this->assertArrayHasKey('count', $period);
            $this->assertArrayHasKey('percentage', $period);
            $this->assertArrayHasKey('label', $period);
        }

        // verify counts (total = 12)
        $this->assertEquals(2, $distribution[0]['count']); // 00-06 凌晨
        $this->assertEquals(1, $distribution[1]['count']); // 06-09 早晨
        $this->assertEquals(2, $distribution[2]['count']); // 09-12 上午
        $this->assertEquals(2, $distribution[3]['count']); // 12-15 中午
        $this->assertEquals(1, $distribution[4]['count']); // 15-18 下午
        $this->assertEquals(4, $distribution[5]['count']); // 18-24 晚上

        // verify percentages
        $this->assertEquals(16.67, $distribution[0]['percentage']); // 2/12 = 16.67%
        $this->assertEquals(8.33, $distribution[1]['percentage']); // 1/12 = 8.33%
        $this->assertEquals(16.67, $distribution[2]['percentage']); // 2/12 = 16.67%
        $this->assertEquals(16.67, $distribution[3]['percentage']); // 2/12 = 16.67%
        $this->assertEquals(8.33, $distribution[4]['percentage']); // 1/12 = 8.33%
        $this->assertEquals(33.33, $distribution[5]['percentage']); // 4/12 = 33.33%

        // verify labels
        $this->assertEquals('凌晨', $distribution[0]['label']);
        $this->assertEquals('早晨', $distribution[1]['label']);
        $this->assertEquals('上午', $distribution[2]['label']);
        $this->assertEquals('中午', $distribution[3]['label']);
        $this->assertEquals('下午', $distribution[4]['label']);
        $this->assertEquals('晚上', $distribution[5]['label']);

        // verify periods
        $this->assertEquals('0-6', $distribution[0]['period']);
        $this->assertEquals('6-9', $distribution[1]['period']);
        $this->assertEquals('9-12', $distribution[2]['period']);
        $this->assertEquals('12-15', $distribution[3]['period']);
        $this->assertEquals('15-18', $distribution[4]['period']);
        $this->assertEquals('18-24', $distribution[5]['period']);
    }

    /**
     * test submission distribution with no data
     *
     * @return void
     */
    public function testSubmissionDistributionWithNoData(): void
    {
        // execute statistic with no submissions
        $result = $this->service->statistic('today');

        // assert result has submission_distribution
        $this->assertArrayHasKey('submission_distribution', $result);

        // get submission_distribution
        $distribution = $result['submission_distribution'];

        // assert distribution has 6 time periods
        $this->assertCount(6, $distribution);

        // verify all counts are 0
        foreach ($distribution as $period) {
            $this->assertEquals(0, $period['count']);
            $this->assertEquals(0, $period['percentage']);
        }
    }

    /**
     * test submission distribution with edge case hours
     *
     * @return void
     */
    public function testSubmissionDistributionWithEdgeCaseHours(): void
    {
        // create test form
        $form = Form::factory()->create([
            'admin_id' => $this->admin->id,
            'enabled' => true,
            'created_at' => now(),
        ]);

        // create submissions at boundary hours
        // Hour 0 should go to 0-6 period (凌晨)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 111111,
            'ipv6' => '192.168.1.1',
            'visitor_id' => 'visitor1',
            'created_at' => now()->setHour(0)->setMinute(0),
        ]);

        // Hour 6 should go to 6-9 period (早晨)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 222222,
            'ipv6' => '192.168.1.2',
            'visitor_id' => 'visitor2',
            'created_at' => now()->setHour(6)->setMinute(0),
        ]);

        // Hour 9 should go to 9-12 period (上午)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 333333,
            'ipv6' => '192.168.1.3',
            'visitor_id' => 'visitor3',
            'created_at' => now()->setHour(9)->setMinute(0),
        ]);

        // Hour 12 should go to 12-15 period (中午)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 444444,
            'ipv6' => '192.168.1.4',
            'visitor_id' => 'visitor4',
            'created_at' => now()->setHour(12)->setMinute(0),
        ]);

        // Hour 15 should go to 15-18 period (下午)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 555555,
            'ipv6' => '192.168.1.5',
            'visitor_id' => 'visitor5',
            'created_at' => now()->setHour(15)->setMinute(0),
        ]);

        // Hour 18 should go to 18-24 period (晚上)
        FormSubmission::create([
            'form_id' => $form->id,
            'version' => 1,
            'data' => [],
            'ipv4' => 666666,
            'ipv6' => '192.168.1.6',
            'visitor_id' => 'visitor6',
            'created_at' => now()->setHour(18)->setMinute(0),
        ]);

        // execute statistic
        $result = $this->service->statistic('today');

        // get submission_distribution
        $distribution = $result['submission_distribution'];

        // verify each period has exactly 1 submission
        $this->assertEquals(1, $distribution[0]['count']); // 00-06 凌晨
        $this->assertEquals(1, $distribution[1]['count']); // 06-09 早晨
        $this->assertEquals(1, $distribution[2]['count']); // 09-12 上午
        $this->assertEquals(1, $distribution[3]['count']); // 12-15 中午
        $this->assertEquals(1, $distribution[4]['count']); // 15-18 下午
        $this->assertEquals(1, $distribution[5]['count']); // 18-24 晚上

        // verify percentages (each 16.67%)
        $this->assertEquals(16.67, $distribution[0]['percentage']);
        $this->assertEquals(16.67, $distribution[1]['percentage']);
        $this->assertEquals(16.67, $distribution[2]['percentage']);
        $this->assertEquals(16.67, $distribution[3]['percentage']);
        $this->assertEquals(16.67, $distribution[4]['percentage']);
        $this->assertEquals(16.67, $distribution[5]['percentage']);
    }
}

