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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->char('uuid', 36)->unique();
            $table->string('title', 255);
            $table->string('description', 255);
            $table->boolean('enabled')->default(true);
            $table->integer('numbering_style')->default(0);
            $table->integer('admin_id');
            $table->timestamps();
            $table->softDeletes();
            $table->integer('version')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
