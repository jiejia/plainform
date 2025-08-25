<?php

use App\Features\Form\Controllers\IndexController;
use Illuminate\Support\Facades\Route;

Route::prefix('form')->group(function () {  
    Route::get('/', [IndexController::class, 'list'])->name('admin.form.list');
    Route::get('/{id}', [IndexController::class, 'detail'])->name('admin.form.detail');
    Route::post('/', [IndexController::class, 'create'])->name('admin.form.create');
    Route::put('/{id}', [IndexController::class, 'update'])->name('admin.form.update');
    Route::delete('/', [IndexController::class, 'delete'])->name('admin.form.delete');
});