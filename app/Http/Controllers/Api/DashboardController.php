<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $days = $request->days ?? 30;
        return response()->json([

            'news' => PostResource::collection(
                Post::where('type', 'news')->where('is_published', true)->with(['author', 'category'])->latest()->take(5)->get()
            ),

            'events' => PostResource::collection(
                Post::where('type', 'event')->where('is_published', true)->where('event_date', '>=', now())->with(['author', 'category'])->orderBy('event_date', 'asc')->take(3)->get()
            ),

            'today' => [
                'birthdays' => UserResource::collection(User::whereHas('profile', fn($q) => $q->birthdayToday())->get()),
                'anniversaries' => UserResource::collection(User::whereHas('profile', fn($q) => $q->anniversaryToday())->get()),
            ],

            'upcoming' => [
                'birthdays' => UserResource::collection(User::whereHas('profile', fn($q) => $q->upcomingBirthdays($days))->get()),
                'anniversaries' => UserResource::collection(User::whereHas('profile', fn($q) => $q->upcomingAnniversaries($days))->get()),
            ]
        ]);
    }
}
