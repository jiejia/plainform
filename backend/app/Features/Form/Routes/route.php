<?php

use Illuminate\Support\Facades\Route;
use App\Features\Form\Controllers\Front\IndexController;

Route::group(['prefix' => 'form'], function () {
    Route::get('{uuid}', [IndexController::class, 'detail']);
    Route::post('{uuid}/submit', [IndexController::class, 'submit']);
});
