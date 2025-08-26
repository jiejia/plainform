<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Features\Form\Models\Control;

class ControlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Control::insert([[
            'type' => 'text',
            'name' => 'Input Text',
            'config' => json_encode([
                'regex' => '',
                'title' => '请输入标题',
                'length' => 255,
                'required' => false,
                'length' => [0, 255],
                'placeholder' => '',
                'defaultValue' => '',
            ]),
            'icon' => '',
        ], [
            'type' => 'textarea',
            'name' => 'Textarea',
            'config' => json_encode([
                'regex' => '',
                'cols' => 20,
                'rows' => 3,
                'title' => '请输入标题',
                'length' => [0, 255],
                'required' => false,
                'placeholder' => '',
                'defaultValue' => '',
            ]),
            'icon' => '',
        ]]);
    }
}
