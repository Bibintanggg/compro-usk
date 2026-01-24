<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();
        return Inertia::render('Admin/Products/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'description' => 'required|string',
            'content' => 'required|string|max:5000',
            'image' => 'nullable|image|mimes:jpg,png|max:2048',
            'price' => 'required|numeric|min:0',
            'order' => 'required|integer',
            'is_active' => 'sometimes|boolean'
        ]);

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
            $validated['image'] = $path;
        };

        $validated['slug'] = Str::slug($validated['name'], '-');

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Products created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
