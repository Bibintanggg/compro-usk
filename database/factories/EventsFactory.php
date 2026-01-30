<?php

namespace Database\Factories;

use App\Models\Events;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EventsFactory extends Factory
{
    protected $model = Events::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $name = $this->faker->sentence(3, true);
        $start = $this->faker->dateTimeBetween('-1 month', '+1 month'); // tanggal mulai
        $end = (clone $start)->modify('+'.rand(1,3).' days'); // tanggal selesai 1-3 hari setelah start

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1, 1000),
            'description' => $this->faker->sentence(15, true),
            'content' => $this->faker->sentences(3, true),
            'image' => $this->faker->imageUrl(640, 480, 'events', true),
            'start_date' => $start,
            'end_date' => $end,
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'is_active' => $this->faker->boolean(80),
        ];
    }
}
