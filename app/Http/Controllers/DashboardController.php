<?php

namespace App\Http\Controllers;

use App\Models\EmployeeOfTheMonth;
use App\Models\User;
use App\Models\Post;
use App\Models\Poll;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\UserResource;
use App\Models\Department;
use App\Models\GceoMessage;
use App\Models\ForumTopic;
use App\Models\Challenge;
use App\Models\ChallengeResponse;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $days = $request->days ?? 30;

        return Inertia::render('Dashboard', [
            'today' => [
                'birthdays' => UserResource::collection(
                    User::whereHas('profile', fn($q) => $q->birthdayToday())->with('profile')->get()
                ),
                'anniversaries' => UserResource::collection(
                    User::whereHas('profile', fn($q) => $q->anniversaryToday())->with('profile')->get()
                ),
            ],
            'upcoming' => [
                'birthdays' => UserResource::collection(
                    User::whereHas('profile', fn($q) => $q->upcomingBirthdays($days))
                        ->with('profile')
                        ->get()
                        ->sortBy(function ($user) {
                            $dob = \Carbon\Carbon::parse($user->profile->dob);
                            $next = $dob->copy()->year(now()->year);
                            if ($next->isPast() && !$next->isToday()) {
                                $next->addYear();
                            }
                            return $next->timestamp;
                        })
                        ->values()
                ),
                'anniversaries' => UserResource::collection(
                    User::whereHas('profile', fn($q) => $q->upcomingAnniversaries($days))
                        ->with('profile')
                        ->get()
                        ->sortBy(function ($user) {
                            $joinDate = \Carbon\Carbon::parse($user->profile->joining_date);
                            $next = $joinDate->copy()->year(now()->year);
                            if ($next->isPast() && !$next->isToday()) {
                                $next->addYear();
                            }
                            return $next->timestamp;
                        })
                        ->values()
                ),
            ],
            'challenge' => (function () {
                $challenge = Challenge::where('is_active', true)->with('options')->latest()->first();
                if (!$challenge)
                    return null;

                return [
                    'data' => $challenge,
                    'has_responded' => ChallengeResponse::where('user_id', auth()->id())
                        ->where('challenge_id', $challenge->id)
                        ->exists()
                ];
            })(),
            'stats' => [
                'total_events' => Post::where('type', 'event')->count(),
                'active_polls' => Poll::count(),
                'total_news' => Post::where('type', 'news')->count(),
            ],
            'charts' => [
                'departments' => Department::withCount('employees')->get()->map(fn($dept) => [
                    'name' => $dept->name,
                    'count' => $dept->employees_count
                ]),
                'activity' => $this->getMonthlyActivity(),
            ]
        ]);
    }




    private function getMonthlyActivity()
    {
        $months = [];
        $data = [
            'news' => [],
            'events' => [],
            'polls' => []
        ];

        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $months[] = $date->format('M');

            $data['news'][] = Post::where('type', 'news')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $data['events'][] = Post::where('type', 'event')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $data['polls'][] = Poll::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
        }

        return [
            'labels' => $months,
            'news' => $data['news'],
            'events' => $data['events'],
            'polls' => $data['polls'],
        ];
    }


    public function getWelcomeData(Request $request)
    {
        $days = $request->days ?? 30;

        return Inertia::render('Welcome', [
            // 'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'news' => Post::where('type', 'news')->where('is_published', true)->latest()->take(2)->get(),
            'events' => Post::where('type', 'event')->where('is_published', true)->latest()->take(6)->get(),
            'polls' => Poll::latest()->take(1)->with(['options.votes', 'votes', 'creator'])->first(),
            'challenge' => (function () {
                // Try to find a challenge for today first
                $today = now()->toDateString();
                $challenge = Challenge::where('scheduled_at', $today)
                    ->where('is_active', true)
                    ->with('options')
                    ->first();

                // If not found, fall back to latest active challenge without date (or any active)
                if (!$challenge) {
                    $challenge = Challenge::where('is_active', true)
                        ->where(function ($q) {
                            $q->whereNull('scheduled_at')
                                ->orWhere('scheduled_at', '<=', now()->toDateString());
                        })
                        ->with('options')
                        ->latest()
                        ->first();
                }

                if (!$challenge)
                    return null;

                return [
                    'data' => $challenge,
                    'has_responded' => auth()->check() ? ChallengeResponse::where('user_id', auth()->id())
                        ->where('challenge_id', $challenge->id)
                        ->exists() : false
                ];
            })(),
            'birthdays' => UserResource::collection(
                User::whereHas('profile', fn($q) => $q->whereNotNull('dob')->upcomingBirthdays($days))
                    ->with('profile')
                    ->get()
                    ->sortBy(function ($user) {
                        $dob = \Carbon\Carbon::parse($user->profile->dob);
                        $next = $dob->copy()->year(now()->year);
                        if ($next->isPast() && !$next->isToday()) {
                            $next->addYear();
                        }
                        return $next->timestamp;
                    })
                    ->values()
            ),
            'anniversaries' => UserResource::collection(
                User::whereHas('profile', fn($q) => $q->whereNotNull('joining_date')->upcomingAnniversaries($days))
                    ->with('profile')
                    ->get()
                    ->sortBy(function ($user) {
                        $joinDate = \Carbon\Carbon::parse($user->profile->joining_date);
                        $next = $joinDate->copy()->year(now()->year);
                        if ($next->isPast() && !$next->isToday()) {
                            $next->addYear();
                        }
                        return $next->timestamp;
                    })
                    ->values()
            ),
            'gceo_message' => GceoMessage::where('is_active', true)->latest('published_at')->first(),
            'recent_photos' => \App\Models\AlbumPhoto::whereHas('album', function ($q) {
                $q->where('is_active', true);
            })
                ->latest()
                ->take(8)
                ->get(),
            'discussion_topics' => ForumTopic::where('type', 'discussion')
                ->with(['author.profile', 'replies.author.profile'])
                ->withCount(['replies', 'likes'])
                ->withExists(['likes as is_liked' => fn($q) => $q->where('user_id', auth()->id())])
                ->latest()
                ->take(4)
                ->get(),
            'digital_voices' => ForumTopic::where('type', 'voice')
                ->with(['author.profile', 'replies.author.profile'])
                ->withCount(['replies', 'likes'])
                ->withExists(['likes as is_liked' => fn($q) => $q->where('user_id', auth()->id())])
                ->latest()
                ->take(3)
                ->get(),
            'emp_of_the_month' => EmployeeOfTheMonth::with(['user.profile', 'user.profile.department'])
                ->latest('year')
                ->latest('month')
                ->take(5)
                ->get(),
            'promotions' => Post::where('type', 'promotion')->where('is_published', true)->latest()->take(5)->get(),
            'health_articles' => Post::where('type', 'health_article')->where('is_published', true)->latest()->take(2)->get(),
            'humans_wall' => \App\Models\HumansOfQgirco::with('user.profile.department')->where('is_active', true)->latest()->first(),
            'welcome_slogan' => \App\Models\Setting::get('welcome_slogan'),
        ]);
    }


    public function respondToChallenge(Request $request, Challenge $challenge)
    {
        $request->validate([
            'challenge_option_id' => 'required|exists:challenge_options,id',
        ]);

        // Check if already responded
        $exists = ChallengeResponse::where('user_id', auth()->id())
            ->where('challenge_id', $challenge->id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'You have already responded to this challenge.');
        }

        ChallengeResponse::create([
            'challenge_id' => $challenge->id,
            'challenge_option_id' => $request->challenge_option_id,
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', 'Response submitted successfully!');
    }

    public function votePoll(Request $request, Poll $poll)
    {
        $request->validate([
            'option_id' => 'required|exists:poll_options,id',
        ]);

        // Check if already voted
        $exists = \App\Models\PollVote::where('user_id', auth()->id())
            ->where('poll_id', $poll->id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'You have already participated in this poll.');
        }

        \App\Models\PollVote::create([
            'poll_id' => $poll->id,
            'poll_option_id' => $request->option_id,
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', 'Your vote has been submitted successfully!');
    }
}
