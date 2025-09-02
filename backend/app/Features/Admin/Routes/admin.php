<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Features\Admin\Controllers\Admin\AuthController;
use App\Features\Admin\Controllers\Admin\ProfileController;

// auth
Route::prefix('auth')->group(function(){
    Route::post('logout', [AuthController::class, 'logout'])->name('admin.auth.logout');
});

// profile
Route::prefix('profile')->group(function(){
    Route::get('me', [ProfileController::class, 'me'])->name('admin.profile.me');
    Route::post('upload-avatar', [ProfileController::class, 'uploadAvatar'])->name('admin.profile.upload_avatar');
    Route::post('update-avatar', [ProfileController::class, 'updateAvatar'])->name('admin.profile.update_avatar');
    Route::post('send-email-reset-code', [ProfileController::class, 'sendEmailResetCode'])->name('admin.profile.send_email_reset_code');
    Route::post('update-email', [ProfileController::class, 'updateEmail'])->name('admin.profile.update_email');
    Route::post('update-password', [ProfileController::class, 'updatePassword'])->name('admin.profile.update_password');
});
