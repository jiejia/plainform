<?php
use Illuminate\Support\Facades\Route;
use App\Features\Setting\Controllers\OptionController;

Route::prefix('option')->group(function(){
    Route::get('get', [OptionController::class, 'get'])->name('admin.option.get');
    Route::post('set', [OptionController::class, 'set'])->name('admin.option.set');
});