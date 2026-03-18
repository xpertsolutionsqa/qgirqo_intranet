<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
use App\Models\Wish;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getTodayNotifications(Request $request)
    {
        $today = Carbon::today();
        $notifications = [];
        $user = auth()->user();

        // 1. Fetch Birthdays
        $birthdays = User::whereHas('profile', function ($query) use ($today) {
            $query->whereMonth('dob', $today->month)
                ->whereDay('dob', $today->day);
        })->with('profile')->get();

        foreach ($birthdays as $bUser) {
            $notifications[] = [
                'id' => 'birthday_' . $bUser->id,
                'type' => 'birthday',
                'title' => 'Happy Birthday!',
                'message' => "It's {$bUser->name}'s birthday today.",
                'image' => $bUser->profile?->avatar ? asset('storage/' . $bUser->profile->avatar) : null,
                'link' => '#',
                'timestamp' => $today->copy()->startOfDay()->toDateTimeString(),
                'meta' => [
                    'target_user' => [
                        'id' => $bUser->id,
                        'name' => $bUser->name
                    ]
                ]
            ];
        }

        // 2. Fetch Work Anniversaries
        $anniversaries = User::whereHas('profile', function ($query) use ($today) {
            $query->whereMonth('joining_date', $today->month)
                ->whereDay('joining_date', $today->day)
                ->whereYear('joining_date', '<', $today->year);
        })->with('profile')->get();

        foreach ($anniversaries as $aUser) {
            $years = $today->year - Carbon::parse($aUser->profile->joining_date)->year;
            $notifications[] = [
                'id' => 'anniversary_' . $aUser->id,
                'type' => 'anniversary',
                'title' => 'Work Anniversary!',
                'message' => "{$aUser->name} is celebrating {$years} " . ($years > 1 ? 'years' : 'year') . " with us.",
                'image' => $aUser->profile?->avatar ? asset('storage/' . $aUser->profile->avatar) : null,
                'link' => '#',
                'timestamp' => $today->copy()->startOfDay()->toDateTimeString(),
                'meta' => [
                    'target_user' => [
                        'id' => $aUser->id,
                        'name' => $aUser->name
                    ]
                ]
            ];
        }

        // 3. Fetch Events
        $events = Post::where('type', 'event')
            ->whereDate('event_date', $today)
            ->where('is_published', true)
            ->get();

        foreach ($events as $event) {
            $notifications[] = [
                'id' => 'event_' . $event->id,
                'type' => 'event',
                'title' => 'Today\'s Event',
                'message' => $event->title,
                'image' => $event->featured_image ? asset('storage/' . $event->featured_image) : null,
                'link' => route('events.public', ['search' => $event->title]),
                'timestamp' => $event->created_at->toDateTimeString(),
            ];
        }

        // 4. Fetch Personal Wishes for the logged in user (Show last 5 including read)
        if ($user) {
            $wishes = Wish::where('to_user_id', $user->id)
                ->with('fromUser.profile')
                ->latest()
                ->limit(5)
                ->get();

            foreach ($wishes as $wish) {
                $notifications[] = [
                    'id' => 'wish_' . $wish->id,
                    'type' => 'wish',
                    'title' => "New Wish from {$wish->fromUser->name}",
                    'message' => $wish->message,
                    'image' => $wish->fromUser->profile?->avatar ? asset('storage/' . $wish->fromUser->profile->avatar) : null,
                    'link' => '#',
                    'is_read' => $wish->read_at !== null,
                    'timestamp' => $wish->created_at->toDateTimeString(),
                    'meta' => [
                        'wish_id' => $wish->id,
                        'from_name' => $wish->fromUser->name,
                        'wish_type' => $wish->type
                    ]
                ];
            }
        }

        // Sort by timestamp descending
        $notifications = collect($notifications)->sortByDesc('timestamp')->values()->all();

        return response()->json([
            'notifications' => $notifications,
            'general_count' => count(array_filter($notifications, fn($n) => $n['type'] !== 'wish')),
            'personal_count' => count(array_filter($notifications, fn($n) => $n['type'] === 'wish')),
            'debug_user_id' => $user->id ?? null,
        ]);
    }

    public function storeWish(Request $request)
    {
        $request->validate([
            'to_user_id' => 'required|exists:users,id',
            'type' => 'required|string',
            'message' => 'required|string|max:500',
        ]);

        $wish = Wish::create([
            'from_user_id' => auth()->id(),
            'to_user_id' => (int) $request->to_user_id,
            'type' => $request->type,
            'message' => $request->message,
        ]);

        return redirect()->back()->with('success', 'Your wish has been sent!');
    }

    public function markAsRead(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            Wish::where('to_user_id', $user->id)
                ->whereNull('read_at')
                ->update(['read_at' => now()]);
        }

        return response()->json(['success' => true]);
    }

    public function checkWishStatus(Request $request)
    {
        $request->validate([
            'to_user_id' => 'required|exists:users,id',
            'type' => 'required|string',
        ]);

        $exists = Wish::where('from_user_id', auth()->id())
            ->where('to_user_id', $request->to_user_id)
            ->where('type', $request->type)
            ->whereDate('created_at', Carbon::today())
            ->exists();

        return response()->json(['already_wished' => $exists]);
    }
}
