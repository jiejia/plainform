<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function(){
    Route::post('logout', [App\Features\Auth\Controllers\Admin\IndexController::class, 'logout'])->name('admin.logout');
});
