<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Features\Setting\Models\Option;
use Illuminate\Support\Facades\Hash;

class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Option::insert([[
            'name' => 'app_name',
            'data' => '{"value":"plainform"}',
            'group' => 'general',
        ], [
            'name' => 'app_description',
            'data' => '{"value":"a simple form builder"}',
            'group' => 'general',
        ], [
            'name' => 'default_language',
            'data' => '{"value":"en"}',
            'group' => 'general',
        ], [
            'name' => 'maintenance_mode',
            'data' => '{"value":0}',
            'group' => 'general',
        ], [
            'name' => 'theme',
            'data' => '{"value":"light"}',
            'group' => 'appearances',
        ], [
            'name' => 'theme_options',
            'data' => '["light","dark","system","blue","purple","green","yellow","red"]',
            'group' => 'options',
        ], [
            'name' => 'languages',
            'data' => '["en","zh-CN"]',
            'group' => 'options',
        ]]);
    }
}
