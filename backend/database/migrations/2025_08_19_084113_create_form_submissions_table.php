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
            // 仅需要 created_at（不需要 updated_at）
            $table->timestamp('created_at')->useCurrent();
            $table->softDeletes();
            $table->integer('version')->default(1);

            $table->index('form_id');
            if (Schema::hasTable('forms')) {
                $table->foreign('form_id')->references('id')->on('forms')->onDelete('cascade');
            }
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
