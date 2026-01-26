<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $article = Article::latest()->get();
        return Inertia::render('Admin/Articles/index', [
            'articles' => $article,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Articles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048|mimes:png,jpg',
            'author' => 'required|string|max:100',
            // 'slug' => 'required|string|max:200|unique:articles,slug',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
            // dd($path);
        }


        $validated['slug'] = Str::slug($validated['title'], "-");

        Article::create($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Article created succesfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        // dd($article);
        return Inertia::render('Admin/Articles/edit', [
            'article' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048|mimes:png,jpg',
            'author' => 'required|string|max:100',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        } else {
            $validated['thumbnail'] = $article->thumbnail;
        }

        $validated['slug'] = Str::slug($validated['title'], "-");

        $article->update($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Article Updated Succesfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Article deleted succesfully');
    }
}
