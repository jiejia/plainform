<?php

use App\Features\Dashboard\Controllers\Admin\IndexController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->group(function () {  
    Route::post('/statistic', [IndexController::class, 'statistic'])->name('admin.dashboard.statistic');
});

