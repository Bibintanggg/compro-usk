<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event = Events::latest()->get();
        return Inertia::render('Admin/Events/index', [
            'events' => $event
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'description' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:png,jpg|max:2048',
            'location' => "required|string",
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = $path;
        };

        $validated['slug'] = Str::slug($validated['name'], '-'); 

        Events::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Events succesfully created');
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
    public function edit(Events $event)
    {
        return Inertia::render('Admin/Events/edit', [
            'events' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = Events::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'description' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:png,jpg|max:2048',
            'location' => "required|string",
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'sometimes|boolean'
        ]);

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = $path;
        } else {
            $validated['image'] = $event->image;
        }

        $validated['slug'] = Str::slug($validated['name'], '-');

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('succes', 'Event succesfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Events::findOrFail($id);
        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Event succesfully deleted');
    }
}
