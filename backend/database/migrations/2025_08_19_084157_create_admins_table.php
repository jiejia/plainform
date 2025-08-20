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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('username', 100)->unique()->comment('username');
            $table->string('email', 255)->unique()->comment('email');
            $table->string('password', 60)->comment('password');
            $table->string('avatar', 255)->nullable()->comment('avatar');
            $table->timestamp('last_logined_at')->nullable()->comment('last logined at');
            $table->string('nickname', 20)->nullable()->comment('nickname');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
