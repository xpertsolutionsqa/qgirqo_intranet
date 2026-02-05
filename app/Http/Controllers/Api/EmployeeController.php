<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function dashboardStats(Request $request)
    {
        $days = $request->days ?? 30;
        $birthdaysToday = User::whereHas('profile', fn($q) => $q->birthdayToday())->get();
        $anniversariesToday = User::whereHas('profile', fn($q) => $q->anniversaryToday())->get();
        $upcomingBirthdays = User::whereHas('profile', fn($q) => $q->upcomingBirthdays($days))->get();
        $upcomingAnniversaries = User::whereHas('profile', fn($q) => $q->upcomingAnniversaries($days))->get();
        return response()->json([
            'today' => [
                'birthdays' => UserResource::collection($birthdaysToday),
                'anniversaries' => UserResource::collection($anniversariesToday),
            ],
            'upcoming' => [
                'birthdays' => UserResource::collection($upcomingBirthdays),
                'anniversaries' => UserResource::collection($upcomingAnniversaries),
            ]
        ]);
    }
}
