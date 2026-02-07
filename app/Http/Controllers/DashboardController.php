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
                    User::whereHas('profile', fn($q) => $q->upcomingBirthdays($days))->with('profile')->get()
                ),
                'anniversaries' => UserResource::collection(
                    User::whereHas('profile', fn($q) => $q->upcomingAnniversaries($days))->with('profile')->get()
                ),
            ],
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
            'birthdays' => UserResource::collection(
                User::whereHas('profile', fn($q) => $q->whereNotNull('dob')->upcomingBirthdays($days))->with('profile')->get()
            ),
            'anniversaries' => UserResource::collection(
                User::whereHas('profile', fn($q) => $q->whereNotNull('joining_date')->upcomingAnniversaries($days))->with('profile')->get()
            ),
            'gceo_message' => GceoMessage::where('is_active', true)->latest('published_at')->first(),
            'recent_photos' => \App\Models\Album::with('photos')
                ->where('is_active', true)
                ->latest()
                ->take(2)
                ->get()
                ->pluck('photos')
                ->flatten()
                ->take(8),
            'discussion_topics' => ForumTopic::where('type', 'discussion')
                ->with(['author.profile', 'replies'])
                ->withCount('replies')
                ->latest()
                ->take(4)
                ->get(),
            'digital_voices' => ForumTopic::where('type', 'voice')
                ->with(['author.profile', 'replies'])
                ->withCount('replies')
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
}
