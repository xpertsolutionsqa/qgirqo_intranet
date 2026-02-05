<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PublicEventController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::where('type', 'event')
            ->where('is_published', true);

        // Search logic
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Category logic
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Date filter
        $selectedDate = $request->date ? Carbon::parse($request->date) : null;
        if ($selectedDate) {
            $query->whereDate('event_date', $selectedDate->format('Y-m-d'));
        }

        $events = $query->orderBy('event_date', 'asc')->get();

        // If category is "Birthdays" or "Anniversaries" specifically (special handling for legacy compatibility)
        // Note: In our system, these aren't "Posts" usually, but the legacy page shows them.
        // For now, we'll stick to Posts unless the user wants them merged.

        return Inertia::render('Events/Index', [
            'events' => $events,
            'categories' => PostCategory::all(['id', 'title']),
            'filters' => $request->only(['search', 'category', 'date']),
        ]);
    }
}
