<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Clients;
use App\Models\Events;
use App\Models\Gallery;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'email' => 'admin@example.com',
        ]);

        // Article::factory(15)->create();
        // Product::factory(15)->create();
        // Clients::factory(15)->create();
        // Gallery::factory(15)->create();
        // Events::factory(15)->create();
    }
}
