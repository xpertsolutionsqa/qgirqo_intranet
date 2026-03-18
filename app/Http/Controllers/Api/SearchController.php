<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
use App\Models\EmployeeOfTheMonth;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('q');
        $type = $request->get('type', 'all');

        if (empty($query) || strlen($query) < 2) {
            return response()->json([]);
        }

        $results = [];

        // 1. Search Employees
        if ($type === 'all' || $type === 'employee') {
            $employees = User::where('name', 'like', "%{$query}%")
                ->with(['profile.designation', 'profile.department'])
                ->take(10)
                ->get();

            foreach ($employees as $emp) {
                // Check if birthday/anniversary today or upcoming
                $subtitle = $emp->profile?->designation?->name ?? 'Employee';
                if ($emp->profile?->department) {
                    $subtitle .= ' - ' . $emp->profile->department->name;
                }

                $results[] = [
                    'id' => $emp->id,
                    'type' => 'employee',
                    'title' => $emp->name,
                    'subtitle' => $subtitle,
                    'image' => $emp->profile?->avatar ? asset('storage/' . $emp->profile->avatar) : ($emp->profile?->image ?? null),
                    'meta' => [
                        'user' => $emp,
                        'canWish' => true, // Simplified for search
                    ]
                ];
            }
        }

        // 2. Search Awards (Employee of the Month/Quarter)
        if ($type === 'all' || $type === 'eom') {
            $eoms = EmployeeOfTheMonth::whereHas('user', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
                ->orWhere('title', 'like', "%{$query}%")
                ->with(['user.profile.designation'])
                ->latest()
                ->take(5)
                ->get();

            foreach ($eoms as $eom) {
                $results[] = [
                    'id' => 'eom_' . $eom->id,
                    'type' => 'eom',
                    'title' => $eom->user->name,
                    'subtitle' => "{$eom->title} ({$eom->month} {$eom->year})",
                    'image' => $eom->featured_image ? asset('storage/' . $eom->featured_image) : ($eom->user->profile?->avatar ? asset('storage/' . $eom->user->profile->avatar) : null),
                    'meta' => [
                        'user' => $eom->user,
                        'title' => $eom->title,
                        'canCongratulate' => true
                    ]
                ];
            }
        }

        // 3. Search Posts (Events & Promotions)
        if ($type === 'all' || $type === 'event' || $type === 'promotion') {
            $postTypes = [];
            if ($type === 'all')
                $postTypes = ['event', 'promotion'];
            else
                $postTypes = [$type];

            $posts = Post::whereIn('type', $postTypes)
                ->where('is_published', true)
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('summary', 'like', "%{$query}%");
                })
                ->latest()
                ->take(10)
                ->get();

            foreach ($posts as $post) {
                $results[] = [
                    'id' => 'post_' . $post->id,
                    'type' => $post->type,
                    'title' => $post->title,
                    'subtitle' => $post->type === 'event' ? ($post->event_venue ?? 'Event') : 'Promotion Announcement',
                    'image' => $post->featured_image ? asset('storage/' . $post->featured_image) : null,
                    'date' => $post->event_date ? $post->event_date->toDateString() : null,
                    'meta' => [
                        'post' => $post,
                        'canAddCalendar' => $post->type === 'event',
                        'canCongratulate' => $post->type === 'promotion',
                        'user' => $post->author // For promotions
                    ]
                ];
            }
        }

        return response()->json($results);
    }
}
