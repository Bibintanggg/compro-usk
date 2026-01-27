<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [UserController::class, 'index'])->name('home');
Route::get('/products/detail/{product}', [UserController::class, 'detail'])->name('product.detail');
Route::get('/products/checkout/{product}', [UserController::class, 'product'])->name('product.checkout');

Route::get('/articles/detail/{article}', [UserController::class, 'article'])->name('product.checkout');

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

    Route::resource('user', UserController::class);

    Route::get('/products', [ProductsController::class, 'index'])->name('admin.products.index');
    Route::get('/products/create', [ProductsController::class, 'create'])->name('admin.products.create');
    Route::get('/products/{products}/edit', [ProductsController::class, 'edit'])->name('admin.products.edit');
    Route::post('/products', [ProductsController::class, 'store'])->name('admin.products.store');
    Route::put('/products/{id}', [ProductsController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{id}', [ProductsController::class, 'destroy'])->name('admin.products.destroy');

    Route::get('/events', [EventController::class, 'index'])->name('admin.events.index');
    Route::get('/events/create', [EventController::class, 'create'])->name('admin.events.create');
    Route::post('/events/create', [EventController::class, 'store'])->name('admin.events.store');
    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('admin.events.edit');
    Route::put('/events/{id}', [EventController::class, 'update'])->name('admin.events.update');
    Route::delete('/events/{id}', [EventController::class, 'destroy'])->name('admin.events.destroy');

    Route::get('/clients', [ClientController::class, 'index'])->name('admin.clients.index');
    Route::get('/clients/create', [ClientController::class, 'create'])->name('admin.clients.create');
    Route::get('/clients/{clients}/edit', [ClientController::class, 'edit'])->name('admin.clients.edit');
    Route::post('/clients/create', [ClientController::class, 'store'])->name('admin.clients.store');
    Route::put('/clients/{id}', [ClientController::class, 'update'])->name('admin.clients.update');
    Route::delete('/clients/{id}', [ClientController::class, 'destroy'])->name('admin.clients.destroy');

    Route::get('/gallery', [GalleryController::class, 'index'])->name('admin.gallery.index');
    Route::get('/gallery/create', [GalleryController::class, 'create'])->name('admin.gallery.create');
    Route::post('/gallery/create', [GalleryController::class, 'store'])->name('admin.gallery.store');
    Route::get('/gallery/{gallery}/edit', [GalleryController::class, 'edit'])->name('admin.gallery.edit');
    Route::put('/gallery/{id}', [GalleryController::class, 'update'])->name('admin.gallery.update');
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy'])->name('admin.gallery.destroy');
});

require __DIR__ . '/auth.php';
