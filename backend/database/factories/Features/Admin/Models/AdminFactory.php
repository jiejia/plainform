<?php

namespace Database\Factories\Features\Admin\Models;

use App\Features\Admin\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * AdminFactory
 *
 * @extends Factory<Admin>
 * @package Database\Factories\Features\Admin\Models
 */
class AdminFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Admin::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'avatar' => fake()->imageUrl(200, 200, 'people'),
            'nickname' => fake()->name(),
            'last_logined_at' => now(),
        ];
    }
}
