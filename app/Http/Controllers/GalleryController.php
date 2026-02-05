<?php

namespace App\Http\Controllers;

use App\Models\AlbumPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $photos = AlbumPhoto::latest()->paginate(20);
        return Inertia::render('Gallery/Index', [
            'photos' => $photos
        ]);
    }

    public function store(Request $request)
    {
        ini_set('memory_limit', '512M');
        $validated = $request->validate([
            'caption' => 'nullable|string|max:255',
            'image' => 'required|image|max:10240', // 10MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');

            AlbumPhoto::create([
                'album_id' => 1, // Default album
                'file_path' => '/storage/' . $path,
                'caption' => $validated['caption'] ?? null,
            ]);
        }

        return to_route('gallery.index')->with('success', 'Photo uploaded successfully');
    }

    public function destroy(AlbumPhoto $albumPhoto)
    {
        if ($albumPhoto->file_path) {
            $oldPath = str_replace('/storage/', '', $albumPhoto->file_path);
            Storage::disk('public')->delete($oldPath);
        }

        $albumPhoto->delete();
        return to_route('gallery.index')->with('success', 'Photo deleted successfully');
    }
}
