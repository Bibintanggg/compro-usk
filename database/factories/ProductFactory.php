<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1, 1000),
            'description' => $this->faker->sentence(10, true),
            'content' => $this->faker->sentence(3, true),
            'image' => $this->faker->imageUrl(640, 480, 'technics', true),
            'price' => $this->faker->randomFloat(2, 10, 500), // Price between 10.00 and 500.00
            'is_active' => $this->faker->boolean(80), // 80% chance to be true
            'order' => $this->faker->numberBetween(1, 50),
        ];
    }
}
