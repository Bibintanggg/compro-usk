<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(6, true);
        return [
            'title' => $title,
            'content' => $this->faker->sentences(3, true),
            'thumbnail' => $this->faker->imageUrl(640, 480, 'nature', true),
            'author' => $this->faker->name(),
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1, 1000),
        ];
    }
}
