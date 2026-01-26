<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/articles', [ArticleController::class, 'index'])->name('admin.articles.index');
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('admin.articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('admin.articles.store');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('admin.articles.edit');
    Route::put('/articles/{id}', [ArticleController::class, 'update'])->name('admin.articles.update');
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');

    Route::get('/products', [ProductsController::class, 'index'])->name('admin.products.index');
    Route::get('/products/create', [ProductsController::class, 'create'])->name('admin.products.create');
    Route::post('/products', [ProductsController::class, 'store'])->name('admin.products.store');

    Route::get('/events', [EventController::class, 'index'])->name('admin.events.index');
    Route::get('/events/create', [EventController::class, 'create'])->name('admin.events.create');
    Route::post('/events/create', [EventController::class, 'store'])->name('admin.events.store');

    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('admin.events.edit');
});

require __DIR__ . '/auth.php';
