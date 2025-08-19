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
            $table->text('title');
            $table->text('description')->nullable();
            $table->text('regex');
            $table->boolean('required')->default(false);
            $table->boolean('published')->default(false);
            // 使用 json (兼容 sqlite / mysql); 若后续改用 PG 可切换为 jsonb
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
            // 参考: 假设存在 forms 与 controls/其它表; 这里只添加外键到 forms，
            // 另一外键按需在知道目标表后再补充
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
        Schema::dropIfExists('form_fields');
    }
};
