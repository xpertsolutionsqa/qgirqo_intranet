<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GalleryCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery/Categories', [
            'categories' => GalleryCategory::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:gallery_categories,name',
        ]);

        GalleryCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, GalleryCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:gallery_categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Category updated successfully.');
    }

    public function destroy(GalleryCategory $category)
    {
        if ($category->albums()->count() > 0) {
            return back()->with('error', 'Category cannot be deleted as it has albums.');
        }

        $category->delete();
        return back()->with('success', 'Category deleted successfully.');
    }
}
