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

        return [
            'figures' => $figures,
            'form_trends' => $formTrends,
            'submission_overview' => $submissionOverview,
        ];
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
}

