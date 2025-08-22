<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Features\Admin\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([[
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('123456'),
            'avatar' => null,
            'last_logined_at' => null,
            'nickname' => 'admin',
        ], [
            'username' => 'admin2',
            'email' => 'admin2@example.com',
            'password' => Hash::make('123456'),
            'avatar' => null,
            'last_logined_at' => null,
            'nickname' => 'admin2',
        ]]);
    }
}
