<?php

namespace Database\Factories;

use App\Models\Clients;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientsFactory extends Factory
{
    protected $model = Clients::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'logo' => $this->faker->imageUrl(200, 200, 'business', true),
            'website' => $this->faker->url(), 
            'description' => $this->faker->sentence(15, true), // deskripsi singkat
        ];
    }
}
