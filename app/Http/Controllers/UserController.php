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
            'articles' => Article::latest()->limit(6)->get(),
            'gallery' => Gallery::latest()->limit(4)->get(),
            'events' => Events::all(),
        ]);
    }

    public function detail(Product $product)
    {
        // dd($product);
        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => Product::all()
        ]);
    }

    public function product(Product $product)
    {
        return Inertia::render('Products', [
            'product' => $product
        ]);
    }

    public function article(Article $article)
    {
        return Inertia::render('ArticleDetail', [
            'article' => $article,
            'latestArticles' => Article::latest()->limit(6)->get()
        ]);
    }

    public function viewAllArticle()
    {
        return Inertia::render('ViewAllArticles', [
            'article' => Article::all()
        ]);
    }
}
