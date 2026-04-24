<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery/Albums', [
            'albums' => Album::with('category')->withCount('photos')->latest()->get(),
            'categories' => GalleryCategory::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:gallery_categories,id',
            'event_date' => 'nullable|date',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('albums', 'public');
        }

        Album::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . rand(100, 999),
            'category_id' => $validated['category_id'],
            'event_date' => $validated['event_date'],
            'description' => $validated['description'],
            'cover_image' => $validated['cover_image'] ?? null,
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', 'Album created successfully.');
    }

    public function show(Album $album)
    {
        return Inertia::render('Admin/Gallery/AlbumShow', [
            'album' => $album->load(['category', 'photos']),
        ]);
    }

    public function update(Request $request, Album $album)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:gallery_categories,id',
            'event_date' => 'nullable|date',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('albums', 'public');
        }

        $album->update($validated);

        return back()->with('success', 'Album updated successfully.');
    }

    public function destroy(Album $album)
    {
        $album->delete();
        return back()->with('success', 'Album deleted successfully.');
    }
}
