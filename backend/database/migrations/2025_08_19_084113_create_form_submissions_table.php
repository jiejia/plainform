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
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('form_id');
            // 使用 json 以兼容 sqlite / mysql; 若迁移到 PostgreSQL 可改为 jsonb
            $table->json('data');
            $table->timestamp('created_at')->useCurrent();
            $table->softDeletes();
            $table->integer('version')->default(1);
            $table->integer('ipv4')->nullable();
            $table->index('form_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};
