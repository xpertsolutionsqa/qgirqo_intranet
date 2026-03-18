<?php

namespace App\Http\Controllers;

use App\Models\AlbumPhoto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicGalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = AlbumPhoto::with('album')
            ->whereHas('album', function ($q) {
                $q->where('is_active', true);
            })
            ->latest();

        if ($request->year) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('album', function ($sq) use ($request) {
                    $sq->whereYear('event_date', $request->year);
                })->orWhere(function ($sq) use ($request) {
                    $sq->whereYear('created_at', $request->year)
                        ->whereDoesntHave('album', function ($ssq) {
                            $ssq->whereNotNull('event_date');
                        });
                });
            });
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('caption', 'like', '%' . $request->search . '%')
                    ->orWhereHas('album', function ($sq) use ($request) {
                        $sq->where('title', 'like', '%' . $request->search . '%');
                    });
            });
        }

        $photos = $query->paginate(24)->withQueryString();

        return Inertia::render('PhotoGallery', [
            'photos' => $photos,
            'filters' => $request->only(['year', 'search']),
        ]);
    }
}
