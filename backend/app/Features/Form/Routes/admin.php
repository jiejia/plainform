<?php

use App\Features\Form\Controllers\Admin\IndexController;
use App\Features\Form\Controllers\Admin\SubmissionController;
use Illuminate\Support\Facades\Route;

Route::prefix('form')->group(function () {  
    Route::post('/list', [IndexController::class, 'list'])->name('admin.form.list');
    Route::get('/controls', [IndexController::class, 'controls'])->name('admin.form.controls');
    Route::get('/{id}', [IndexController::class, 'detail'])->name('admin.form.detail');
    Route::post('/', [IndexController::class, 'create'])->name('admin.form.create');
    Route::put('/{id}', [IndexController::class, 'update'])->name('admin.form.update');
    Route::delete('/', [IndexController::class, 'delete'])->name('admin.form.delete');
    Route::patch('/batch-update-enabled', [IndexController::class, 'batchUpdateEnabled'])->name('admin.form.batch_update_enabled');

    // Submission routes
    Route::prefix('{formId}/submission')->group(function () {
        Route::post('/', [SubmissionController::class, 'list'])->name('admin.form.submission.list');
        Route::get('/versions', [SubmissionController::class, 'versions'])->name('admin.form.submission.versions');
        Route::get('/fields', [SubmissionController::class, 'fields'])->name('admin.form.submission.fields');
        Route::get('/{id}', [SubmissionController::class, 'detail'])->name('admin.form.submission.detail');
        Route::delete('/', [SubmissionController::class, 'delete'])->name('admin.form.submission.delete');
    });
});