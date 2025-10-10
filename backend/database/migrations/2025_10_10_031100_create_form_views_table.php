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
        Schema::create('form_views', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('form_id');
            $table->integer('form_version');
            $table->string('visitor_id', 255);
            $table->integer('ipv4')->nullable();
            $table->ipAddress('ipv6')->nullable();
            $table->string('region', 255)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_views');
    }
};
