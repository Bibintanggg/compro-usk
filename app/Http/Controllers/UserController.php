<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Clients;
use App\Models\Events;
use App\Models\Gallery;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'products' => Product::all(),
            'clients' => Clients::all(),
            'articles' => Article::all(),
            'gallery' => Gallery::all(),
            'events' => Events::all(),
        ]);
    }
}
