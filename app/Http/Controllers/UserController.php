<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Clients;
use App\Models\Events;
use App\Models\Gallery;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $order = Order::where('product_id', Auth::id())->where('status', 'success')->latest()->get();
        return Inertia::render('Welcome', [
            'products' => Product::latest()->limit(9)->get(),
            'clients' => Clients::latest()->limit(9)->get(),
            'articles' => Article::latest()->limit(6)->get(),
            'gallery' => Gallery::latest()->limit(4)->get(),
            'events' => Events::latest()->limit(5)->get(),
            'totalCustomer' => Clients::count(),

            'showPaymentDialog' => !!$order,
            'order' => $order
        ]);
    }

    public function detail(Product $product)
    {
        // dd($product);
        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => Product::latest()->limit(5)->get()
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

    public function viewAllProduct()
    {
        return Inertia::render('ViewAllProduct', [
            'products' => Product::all(),
        ]);
    }

    public function viewAllGallery()
    {
        return Inertia::render('ViewAllGallery', [
            'gallery' => Gallery::all(),
        ]);
    }

    public function viewDetailEvent(Events $event)
    {
        return Inertia::render('DetailEvent', [
            'event' => $event
        ]);
    }

    public function viewAllEvent()
    {
        return Inertia::render('ViewAllEvent', [
            'event' => Events::all()
        ]);
    }
}
