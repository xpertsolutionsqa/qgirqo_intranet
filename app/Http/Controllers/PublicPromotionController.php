<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicPromotionController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::where('type', 'promotion')
            ->where('is_published', true);

        // Search logic
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Category logic
        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
        }

        $promotions = $query->latest()->get();

        return Inertia::render('Offers/Index', [
            'promotions' => $promotions,
            'categories' => PostCategory::all(['id', 'title']),
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
