<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmployeeOfTheMonth;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeOfTheMonthController extends Controller
{
    public function index()
    {
        $winners = EmployeeOfTheMonth::with('user.profile')
            ->latest('year')
            ->latest('month')
            ->paginate(10);

        $employees = User::with('profile')->get();

        return Inertia::render('Admin/EmployeeOfTheMonth/Index', [
            'winners' => $winners,
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2100',
            'title' => 'nullable|string|max:255',
            'reason' => 'nullable|string',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('winners', 'public');
        }

        EmployeeOfTheMonth::updateOrCreate(
            [
                'user_id' => $validated['user_id'],
                'month' => $validated['month'],
                'year' => $validated['year'],
            ],
            $validated
        );

        return back()->with('success', 'Employee of the month set successfully.');
    }

    public function destroy(EmployeeOfTheMonth $employeeOfTheMonth)
    {
        $employeeOfTheMonth->delete();
        return back()->with('success', 'Winner removed successfully.');
    }
}
