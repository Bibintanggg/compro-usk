<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Clients::latest()->get();
        return Inertia::render('Admin/Clients/index', [
            'clients' => $clients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Clients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => "required|string|max:200",
            'logo' => 'nullable|image|max:2048|mimes:png,jpg',
            'description' => 'required|string',
            'website' => 'nullable|string',
        ]);

        if($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logo', 'public');
            $validated['logo'] = $path;
        };

        Clients::create($validated);

        return redirect()->route('admin.clients.index')->with('success', 'Clients sucessfully created');

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
    public function edit(Clients $clients)
    {
        return Inertia::render('Admin/Clients/edit', [
            'clients' => $clients
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $clients = Clients::findOrFail($id);

        $validated = $request->validate([
            'name' => "required|string|max:200",
            'logo' => 'nullable|image|max:2048|mimes:png,jpg',
            'description' => 'required|string',
            'website' => 'nullable|string',
        ]);

        if($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logo', 'public');
            $validated['logo'] = $path;
        } else {
            $validated['logo'] = $request->logo;
        };

        $clients->update($validated);

        return redirect()->route("admin.clients.index")->with('success', 'Clients successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $clients = Clients::findOrFail($id);
        $clients->delete();

        return redirect()->route('admin.clients.index')->with('success', 'Clients succesfully deleted');
    }
}
