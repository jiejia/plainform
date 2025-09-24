<?php

namespace Database\Factories\Features\Form\Models;

use App\Features\Form\Models\Form;
use App\Features\Admin\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * FormFactory
 *
 * @extends Factory<Form>
 * @package Database\Factories\Features\Form\Models
 */
class FormFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Form::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(10),
            'enabled' => fake()->boolean(),
            'numbering_style' => fake()->numberBetween(0, 2),
            'admin_id' => Admin::factory(),
            'version' => 1,
        ];
    }

    /**
     * Indicate that the form is enabled.
     */
    public function enabled(): static
    {
        return $this->state(fn (array $attributes) => [
            'enabled' => true,
        ]);
    }

    /**
     * Indicate that the form is disabled.
     */
    public function disabled(): static
    {
        return $this->state(fn (array $attributes) => [
            'enabled' => false,
        ]);
    }
}
