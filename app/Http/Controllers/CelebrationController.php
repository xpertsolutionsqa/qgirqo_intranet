<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class CelebrationController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->month ?? Carbon::today()->month;
        $year = $request->year ?? Carbon::today()->year;

        // Fetch Birthdays for the selected month
        $birthdays = User::whereHas('profile', function ($query) use ($month) {
            $query->whereMonth('dob', $month);
        })->with(['profile.department', 'profile.designation'])
            ->get()
            ->sortBy(function ($user) {
                return Carbon::parse($user->profile->dob)->format('d');
            });

        // Fetch Anniversaries for the selected month
        $anniversaries = User::whereHas('profile', function ($query) use ($month) {
            $query->whereMonth('joining_date', $month);
        })->with(['profile.department', 'profile.designation'])
            ->get()
            ->sortBy(function ($user) {
                return Carbon::parse($user->profile->joining_date)->format('d');
            });

        return Inertia::render('Celebrations/Index', [
            'birthdays' => UserResource::collection($birthdays),
            'anniversaries' => UserResource::collection($anniversaries),
            'filters' => [
                'month' => (int) $month,
                'year' => (int) $year,
            ],
            'months' => collect(range(1, 12))->map(function ($m) {
                return [
                    'id' => $m,
                    'name' => Carbon::create()->month($m)->format('F')
                ];
            })
        ]);
    }
}
