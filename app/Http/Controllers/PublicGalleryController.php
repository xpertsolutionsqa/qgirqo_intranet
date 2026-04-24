<?php

namespace App\Http\Controllers;

use App\Models\AlbumPhoto;
use App\Models\GalleryCategory;
use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicGalleryController extends Controller
{
    public function index(Request $request)
    {
        $categories = GalleryCategory::all();

        $query = Album::with(['category', 'photos'])
            ->where('is_active', true);

        if ($request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->year) {
            $query->whereYear('event_date', $request->year);
        }

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $albums = $query->latest('event_date')->get()
            ->groupBy(function ($album) {
                return $album->event_date ? $album->event_date->format('Y') : $album->created_at->format('Y');
            });

        return Inertia::render('PhotoGallery', [
            'categories' => $categories,
            'albumsGrouped' => $albums,
            'filters' => $request->only(['year', 'search', 'category']),
        ]);
    }
}
