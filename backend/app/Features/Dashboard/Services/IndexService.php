<?php

namespace App\Features\Dashboard\Services;

use App\Features\Form\Models\Form;
use App\Features\Form\Models\FormSubmission;
use App\Features\Form\Models\FormView;

/**
 * IndexService
 *
 * @package App\Features\Dashboard\Services
 */
class IndexService
{
    /**
     * statistic
     *
     * @param string $periodType
     * @return array
     */
    public function statistic(string $periodType): array
    {
        // calculate period date ranges
        $periods = $this->calculatePeriodRanges($periodType);
        $currentPeriod = $periods['current'];
        $previousPeriod = $periods['previous'];

        // get current period statistics
        $currentStats = $this->getPeriodStatistics($currentPeriod['start'], $currentPeriod['end']);

        // get previous period statistics for growth rate calculation
        $previousStats = $periodType === 'all' 
            ? [] 
            : $this->getPeriodStatistics($previousPeriod['start'], $previousPeriod['end']);

        // build figures array
        $figures = [];
        $metrics = ['form_number', 'submission_number', 'view_number', 'active_form_number', 'independent_ip_number', 'average_finishing_rate'];
        
        foreach ($metrics as $metric) {
            $figures[$metric] = [
                'value' => $currentStats[$metric],
                'growth_rate' => $periodType === 'all' 
                    ? 100.00 
                    : $this->calculateGrowthRate($currentStats[$metric], $previousStats[$metric]),
            ];
        }

        // get form trends
        $formTrends = $this->getFormTrends($periodType, $currentPeriod['start'], $currentPeriod['end']);

        // get submission overview
        $submissionOverview = $this->getSubmissionOverview($periodType, $currentPeriod['start'], $currentPeriod['end']);

        // get active forms
        $activeForms = $periodType === 'all'
            ? $this->getActiveForms($currentPeriod['start'], $currentPeriod['end'])
            : $this->getActiveForms($currentPeriod['start'], $currentPeriod['end'], $previousPeriod['start'], $previousPeriod['end']);

        // get recent activities
        $recentActivities = $this->getRecentActivities($currentPeriod['start'], $currentPeriod['end']);

        // get form distribution
        $formDistribution = $this->getFormDistribution($currentPeriod['start'], $currentPeriod['end']);

        // get submission distribution
        $submissionDistribution = $this->getSubmissionDistribution($currentPeriod['start'], $currentPeriod['end']);

        return [
            'figures' => $figures,
            'form_trends' => $formTrends,
            'submission_overview' => $submissionOverview,
            'active_forms' => $activeForms,
            'recent_activities' => $recentActivities,
            'form_distribution' => $formDistribution,
            'submission_distribution' => $submissionDistribution,
        ];
    }

    /**
     * getActiveForms
     *
     * @param \Carbon\Carbon $currentStart
     * @param \Carbon\Carbon $currentEnd
     * @param \Carbon\Carbon|null $previousStart
     * @param \Carbon\Carbon|null $previousEnd
     * @return array
     */
    private function getActiveForms($currentStart, $currentEnd, $previousStart = null, $previousEnd = null): array
    {
        // get all enabled forms
        $forms = Form::where('enabled', 1)->get(['id', 'title']);

        $formsData = [];
        foreach ($forms as $form) {
            // get current period submissions
            $currentSubmissions = FormSubmission::where('form_id', $form->id)
                ->whereBetween('created_at', [$currentStart, $currentEnd])
                ->count();

            // get current period views
            $currentViews = FormView::where('form_id', $form->id)
                ->whereBetween('created_at', [$currentStart, $currentEnd])
                ->count();

            // calculate conversion rate
            $rate = $currentViews > 0 ? round(($currentSubmissions / $currentViews) * 100, 2) : 0;

            // calculate trend if previous period is provided
            $trend = 0;
            if ($previousStart && $previousEnd) {
                $previousSubmissions = FormSubmission::where('form_id', $form->id)
                    ->whereBetween('created_at', [$previousStart, $previousEnd])
                    ->count();

                $trend = $this->calculateGrowthRate($currentSubmissions, $previousSubmissions);
            }

            $formsData[] = [
                'form_id' => $form->id,
                'title' => $form->title,
                'submissions' => $currentSubmissions,
                'views' => $currentViews,
                'rate' => $rate,
                'trend' => $trend,
            ];
        }

        // sort by submissions count in descending order
        usort($formsData, function ($a, $b) {
            return $b['submissions'] - $a['submissions'];
        });

        // get top 5 and add no field
        $activeForms = [];
        $topForms = array_slice($formsData, 0, 5);
        foreach ($topForms as $index => $formData) {
            $activeForms[] = [
                'no' => $index + 1,
                'form_id' => $formData['form_id'],
                'title' => $formData['title'],
                'submissions' => $formData['submissions'],
                'views' => $formData['views'],
                'rate' => $formData['rate'],
                'trend' => $formData['trend'],
            ];
        }

        return $activeForms;
    }

    /**
     * getFormTrends
     *
     * @param string $periodType
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getFormTrends(string $periodType, $startDate, $endDate): array
    {
        $trends = [];
        $timePoints = $this->calculateTimePoints($periodType, $startDate, $endDate);

        foreach ($timePoints as $index => $timePoint) {
            $pointStart = $timePoint['start'];
            $pointEnd = $timePoint['end'];

            // get created forms count in this time point
            $created = Form::whereBetween('created_at', [$pointStart, $pointEnd])->count();

            // get active forms count in this time point
            $active = Form::where('enabled', 1)
                ->whereBetween('created_at', [$pointStart, $pointEnd])
                ->count();

            // get submissions count in this time point
            $submissions = FormSubmission::whereBetween('created_at', [$pointStart, $pointEnd])->count();

            $trends[] = [
                'point' => $timePoint['label'],
                'created' => $created,
                'active' => $active,
                'submissions' => $submissions,
            ];
        }

        return $trends;
    }

    /**
     * getSubmissionOverview
     *
     * @param string $periodType
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getSubmissionOverview(string $periodType, $startDate, $endDate): array
    {
        $overview = [];
        $timePoints = $this->calculateTimePoints($periodType, $startDate, $endDate);

        foreach ($timePoints as $timePoint) {
            $pointStart = $timePoint['start'];
            $pointEnd = $timePoint['end'];

            // get total submissions count in this time point
            $total = FormSubmission::whereBetween('created_at', [$pointStart, $pointEnd])->count();

            // get unique IPs count in this time point
            $submissionIps = $this->getIpsFromSubmissions($pointStart, $pointEnd);
            $viewIps = $this->getIpsFromViews($pointStart, $pointEnd);
            
            // merge and count unique IPs
            $allIps = array_filter(array_merge($submissionIps, $viewIps));
            $unique = count(array_unique($allIps));

            $overview[] = [
                'point' => $timePoint['label'],
                'total' => $total,
                'unique' => $unique,
            ];
        }

        return $overview;
    }

    /**
     * calculateTimePoints
     *
     * @param string $periodType
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function calculateTimePoints(string $periodType, $startDate, $endDate): array
    {
        $timePoints = [];

        switch ($periodType) {
            case 'today':
                // 24 hours divided into 6 parts (every 4 hours)
                for ($i = 0; $i < 6; $i++) {
                    $pointStart = $startDate->copy()->addHours($i * 4);
                    $pointEnd = $startDate->copy()->addHours(($i + 1) * 4)->subSecond();
                    
                    $timePoints[] = [
                        'start' => $pointStart,
                        'end' => $pointEnd,
                        'label' => $pointStart->format('H:i') . '-' . $pointEnd->copy()->addSecond()->format('H:i'),
                    ];
                }
                break;

            case 'week':
                // Monday to Sunday (7 points)
                for ($i = 0; $i < 7; $i++) {
                    $pointStart = $startDate->copy()->addDays($i)->startOfDay();
                    $pointEnd = $startDate->copy()->addDays($i)->endOfDay();
                    
                    $timePoints[] = [
                        'start' => $pointStart,
                        'end' => $pointEnd,
                        'label' => $pointStart->format('m/d'),
                    ];
                }
                break;

            case 'month':
                // 3 days per point (approximately 10 points)
                $totalDays = $startDate->diffInDays($endDate) + 1;
                $pointsCount = (int)ceil($totalDays / 3);
                
                for ($i = 0; $i < $pointsCount; $i++) {
                    $pointStart = $startDate->copy()->addDays($i * 3)->startOfDay();
                    $pointEnd = $startDate->copy()->addDays(min(($i + 1) * 3 - 1, $totalDays - 1))->endOfDay();
                    
                    // make sure pointEnd doesn't exceed endDate
                    if ($pointEnd->greaterThan($endDate)) {
                        $pointEnd = $endDate->copy();
                    }
                    
                    $timePoints[] = [
                        'start' => $pointStart,
                        'end' => $pointEnd,
                        'label' => $pointStart->format('m/d'),
                    ];
                }
                break;

            case 'all':
                $totalDays = $startDate->diffInDays($endDate) + 1;
                
                if ($totalDays <= 10) {
                    // if less than 10 days, divide by day
                    for ($i = 0; $i < $totalDays; $i++) {
                        $pointStart = $startDate->copy()->addDays($i)->startOfDay();
                        $pointEnd = $startDate->copy()->addDays($i)->endOfDay();
                        
                        $timePoints[] = [
                            'start' => $pointStart,
                            'end' => $pointEnd,
                            'label' => $pointStart->format('m/d'),
                        ];
                    }
                } else {
                    // if more than 10 days, divide into max 10 points
                    $pointsCount = 10;
                    $daysPerPoint = $totalDays / $pointsCount;
                    
                    for ($i = 0; $i < $pointsCount; $i++) {
                        $startDayOffset = (int)floor($i * $daysPerPoint);
                        $endDayOffset = (int)floor(($i + 1) * $daysPerPoint) - 1;
                        
                        // for the last point, make sure it reaches endDate
                        if ($i === $pointsCount - 1) {
                            $endDayOffset = $totalDays - 1;
                        }
                        
                        $pointStart = $startDate->copy()->addDays($startDayOffset)->startOfDay();
                        $pointEnd = $startDate->copy()->addDays($endDayOffset)->endOfDay();
                        
                        $timePoints[] = [
                            'start' => $pointStart,
                            'end' => $pointEnd,
                            'label' => $pointStart->format('m/d'),
                        ];
                    }
                }
                break;

            default:
                break;
        }

        return $timePoints;
    }

    /**
     * calculatePeriodRanges
     *
     * @param string $periodType
     * @return array
     */
    private function calculatePeriodRanges(string $periodType): array
    {
        $now = now();

        switch ($periodType) {
            case 'today':
                $currentStart = $now->copy()->startOfDay();
                $currentEnd = $now->copy()->endOfDay();
                $previousStart = $now->copy()->subDay()->startOfDay();
                $previousEnd = $now->copy()->subDay()->endOfDay();
                break;

            case 'week':
                $currentStart = $now->copy()->startOfWeek();
                $currentEnd = $now->copy()->endOfWeek();
                $previousStart = $now->copy()->subWeek()->startOfWeek();
                $previousEnd = $now->copy()->subWeek()->endOfWeek();
                break;

            case 'month':
                $currentStart = $now->copy()->startOfMonth();
                $currentEnd = $now->copy()->endOfMonth();
                $previousStart = $now->copy()->subMonth()->startOfMonth();
                $previousEnd = $now->copy()->subMonth()->endOfMonth();
                break;

            case 'all':
                // for all time, get earliest and latest records from Form, FormView and FormSubmission
                $earliestForm = Form::orderBy('created_at', 'asc')->first();
                $latestForm = Form::orderBy('created_at', 'desc')->first();
                $earliestView = FormView::orderBy('created_at', 'asc')->first();
                $latestView = FormView::orderBy('created_at', 'desc')->first();
                $earliestSubmission = FormSubmission::orderBy('created_at', 'asc')->first();
                $latestSubmission = FormSubmission::orderBy('created_at', 'desc')->first();

                // collect all dates to find the absolute earliest and latest
                $dates = [];
                if ($earliestForm) $dates[] = $earliestForm->created_at;
                if ($latestForm) $dates[] = $latestForm->created_at;
                if ($earliestView) $dates[] = $earliestView->created_at;
                if ($latestView) $dates[] = $latestView->created_at;
                if ($earliestSubmission) $dates[] = $earliestSubmission->created_at;
                if ($latestSubmission) $dates[] = $latestSubmission->created_at;

                if (!empty($dates)) {
                    $currentStart = min($dates)->copy()->startOfDay();
                    $currentEnd = max($dates)->copy()->endOfDay();
                } else {
                    // if no records, use current day
                    $currentStart = $now->copy()->startOfDay();
                    $currentEnd = $now->copy()->endOfDay();
                }

                // previous period not used for 'all' type
                $previousStart = $currentStart->copy();
                $previousEnd = $currentStart->copy();
                break;

            default:
                $currentStart = $now->copy()->startOfDay();
                $currentEnd = $now->copy()->endOfDay();
                $previousStart = $now->copy()->subDay()->startOfDay();
                $previousEnd = $now->copy()->subDay()->endOfDay();
                break;
        }

        return [
            'current' => [
                'start' => $currentStart,
                'end' => $currentEnd,
            ],
            'previous' => [
                'start' => $previousStart,
                'end' => $previousEnd,
            ],
        ];
    }

    /**
     * getPeriodStatistics
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getPeriodStatistics($startDate, $endDate): array
    {
        // get total forms count created in period
        $formNumber = Form::whereBetween('created_at', [$startDate, $endDate])->count();

        // get active forms count (enabled = 1) created in period
        $activeFormNumber = Form::where('enabled', 1)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // get total submissions count in period
        $submissionNumber = FormSubmission::whereBetween('created_at', [$startDate, $endDate])->count();

        // get total views count in period
        $viewNumber = FormView::whereBetween('created_at', [$startDate, $endDate])->count();

        // get independent IPs count from both submissions and views
        $submissionIps = $this->getIpsFromSubmissions($startDate, $endDate);
        $viewIps = $this->getIpsFromViews($startDate, $endDate);
        
        // merge and count unique IPs
        $allIps = array_filter(array_merge($submissionIps, $viewIps));
        $independentIpNumber = count(array_unique($allIps));

        // calculate average finishing rate (submission / view)
        $averageFinishingRate = $viewNumber > 0 ? round(($submissionNumber / $viewNumber) * 100, 2) : 0;

        return [
            'form_number' => $formNumber,
            'submission_number' => $submissionNumber,
            'view_number' => $viewNumber,
            'active_form_number' => $activeFormNumber,
            'independent_ip_number' => $independentIpNumber,
            'average_finishing_rate' => $averageFinishingRate,
        ];
    }

    /**
     * calculateGrowthRate
     *
     * @param float $currentValue
     * @param float $previousValue
     * @return float
     */
    private function calculateGrowthRate(float $currentValue, float $previousValue): float
    {
        if ($previousValue == 0) {
            return $currentValue > 0 ? 100.00 : 0.00;
        }

        return round((($currentValue - $previousValue) / $previousValue) * 100, 2);
    }

    /**
     * getIpsFromSubmissions
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getIpsFromSubmissions($startDate, $endDate): array
    {
        return $this->getIpsFromModel(FormSubmission::class, $startDate, $endDate);
    }

    /**
     * getIpsFromViews
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getIpsFromViews($startDate, $endDate): array
    {
        return $this->getIpsFromModel(FormView::class, $startDate, $endDate);
    }

    /**
     * getIpsFromModel
     *
     * @param string $modelClass
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getIpsFromModel(string $modelClass, $startDate, $endDate): array
    {
        $ipv4s = $modelClass::whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('ipv4')
            ->pluck('ipv4')
            ->map(fn($ip) => (string)$ip)
            ->toArray();

        $ipv6s = $modelClass::whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('ipv6')
            ->pluck('ipv6')
            ->toArray();

        return array_merge($ipv4s, $ipv6s);
    }

    /**
     * getRecentActivities
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getRecentActivities($startDate, $endDate): array
    {
        // get recent submissions
        $submissions = FormSubmission::with('form:id,title')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get(['id', 'form_id', 'country', 'city', 'created_at'])
            ->map(function ($submission) {
                return [
                    'id' => $submission->form_id,
                    'form_title' => $submission->form->title ?? '',
                    'visitor_region' => trim(($submission->country ?? '') . ' ' . ($submission->city ?? '')),
                    'time' => $submission->created_at->diffForHumans(),
                    'status' => 'completed',
                    'created_at' => $submission->created_at,
                ];
            })->toArray();

        // get recent views
        $views = FormView::with('form:id,title')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get(['id', 'form_id', 'country', 'city', 'created_at'])
            ->map(function ($view) {
                return [
                    'id' => $view->form_id,
                    'form_title' => $view->form->title ?? '',
                    'visitor_region' => trim(($view->country ?? '') . ' ' . ($view->city ?? '')),
                    'time' => $view->created_at->diffForHumans(),
                    'status' => 'viewed',
                    'created_at' => $view->created_at,
                ];
            })->toArray();

        // merge and sort by created_at
        $activities = array_merge($submissions, $views);
        usort($activities, function ($a, $b) {
            return $b['created_at']->timestamp - $a['created_at']->timestamp;
        });

        // get top 5 and remove created_at field
        $recentActivities = array_slice($activities, 0, 5);
        $recentActivities = array_map(function ($activity) {
            unset($activity['created_at']);
            return $activity;
        }, $recentActivities);

        return $recentActivities;
    }

    /**
     * getFormDistribution
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getFormDistribution($startDate, $endDate): array
    {
        // get forms created in the period
        $forms = Form::whereBetween('created_at', [$startDate, $endDate])->get(['id', 'enabled']);

        // count enabled forms (enabled = 1)
        $enabled = $forms->where('enabled', 1)->count();

        // count closed forms (enabled = 0)
        $closed = $forms->where('enabled', 0)->count();

        // count active forms (enabled = 1 and has submissions in the period)
        $formIdsWithSubmissions = FormSubmission::whereBetween('created_at', [$startDate, $endDate])
            ->distinct()
            ->pluck('form_id')
            ->toArray();

        $active = $forms->filter(function ($form) use ($formIdsWithSubmissions) {
            return $form->enabled == 1 && in_array($form->id, $formIdsWithSubmissions);
        })->count();

        return [
            'active' => $active,
            'closed' => $closed,
            'enabled' => $enabled,
        ];
    }

    /**
     * getSubmissionDistribution
     *
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return array
     */
    private function getSubmissionDistribution($startDate, $endDate): array
    {
        // define time periods
        $periods = [
            ['start' => 0, 'end' => 6, 'label' => '凌晨'],
            ['start' => 6, 'end' => 9, 'label' => '早晨'],
            ['start' => 9, 'end' => 12, 'label' => '上午'],
            ['start' => 12, 'end' => 15, 'label' => '中午'],
            ['start' => 15, 'end' => 18, 'label' => '下午'],
            ['start' => 18, 'end' => 24, 'label' => '晚上'],
        ];

        // get all submissions in the date range
        $submissions = FormSubmission::whereBetween('created_at', [$startDate, $endDate])
            ->get(['created_at']);

        // initialize distribution data
        $distribution = [];
        foreach ($periods as $period) {
            $distribution[] = [
                'period' => $period['start'] . '-' . $period['end'],
                'count' => 0,
                'percentage' => 0,
                'label' => $period['label'],
            ];
        }

        // count total submissions
        $totalSubmissions = $submissions->count();

        if ($totalSubmissions > 0) {
            // count submissions for each period
            foreach ($submissions as $submission) {
                $hour = (int)$submission->created_at->format('H');
                
                foreach ($periods as $index => $period) {
                    if ($hour >= $period['start'] && $hour < $period['end']) {
                        $distribution[$index]['count']++;
                        break;
                    }
                }
            }

            // calculate percentage
            foreach ($distribution as &$item) {
                $item['percentage'] = round(($item['count'] / $totalSubmissions) * 100, 2);
            }
        }

        return $distribution;
    }
}

