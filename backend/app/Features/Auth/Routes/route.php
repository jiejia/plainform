<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin/auth')->group(function(){
    Route::post('login', [App\Features\Auth\Controllers\Admin\IndexController::class, 'login'])->name('admin.login');
    Route::post('send-forget-password-email', [App\Features\Auth\Controllers\Admin\IndexController::class, 'sendForgetPasswordEmail'])->name('admin.sendForgetPasswordEmail');
});
