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
});
