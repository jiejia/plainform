<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Features\Admin\Controllers\Admin\AuthController;

// admin auth
Route::prefix('admin/auth')->group(function(){
    Route::post('login', [AuthController::class, 'login'])->name('admin.auth.login');
    Route::post('send-forget-password-email', [AuthController::class, 'sendForgetPasswordEmail'])->name('admin.auth.sendForgetPasswordEmail');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('admin.auth.resetPassword');
});
