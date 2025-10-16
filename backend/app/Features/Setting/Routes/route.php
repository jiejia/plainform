<?php
use Illuminate\Support\Facades\Route;
use App\Features\Setting\Controllers\OptionController;

Route::prefix('option')->group(function(){
    Route::post('get', [OptionController::class, 'get'])->name('option.get');
});