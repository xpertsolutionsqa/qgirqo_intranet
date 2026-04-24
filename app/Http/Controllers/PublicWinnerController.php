<?php

namespace App\Http\Controllers;

use App\Models\EmployeeOfTheMonth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicWinnerController extends Controller
{
    public function index(Request $request)
    {
        $query = EmployeeOfTheMonth::with(['user.profile.department', 'user.profile.designation']);

        if ($request->year) {
            $query->where('year', $request->year);
        }

        if ($request->quarter) {
            $query->where('quarter', $request->quarter);
        }

        // Group by Year and Quarter for the archive view
        $winners = $query->latest('year')->latest('quarter')->get()
            ->groupBy(['year', 'quarter']);

        return Inertia::render('WinnerArchive', [
            'winnersGrouped' => $winners,
            'years' => EmployeeOfTheMonth::distinct()->pluck('year')->sortDesc(),
            'filters' => $request->only(['year', 'quarter']),
        ]);
    }
}
