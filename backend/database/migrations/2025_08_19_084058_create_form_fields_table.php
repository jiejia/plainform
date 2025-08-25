<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->char('uuid', 36)->unique();
            $table->string('title', 255);
            $table->string('description', 255)->nullable();
            $table->string('regex', 255)->nullable();
            $table->boolean('required')->default(false);
            $table->json('config');
            $table->unsignedBigInteger('form_id');
            $table->unsignedBigInteger('control_id');
            $table->string('control_type', 36);
            $table->string('control_name', 36);
            $table->integer('sort')->default(0);
            $table->timestamps();
            $table->softDeletes();
            $table->index('form_id');
            $table->index('control_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_fields');
    }
};
