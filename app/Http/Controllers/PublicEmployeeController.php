<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicEmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with(['profile.department', 'profile.designation']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%')
                    ->orWhereHas('profile.department', function ($sq) use ($request) {
                        $sq->where('name', 'like', '%' . $request->search . '%');
                    })
                    ->orWhereHas('profile.designation', function ($sq) use ($request) {
                        $sq->where('title', 'like', '%' . $request->search . '%');
                    });
            });
        }

        if ($request->department) {
            $query->whereHas('profile.department', function ($q) use ($request) {
                $q->where('id', $request->department);
            });
        }

        $employees = $query->paginate(20)->withQueryString();

        return Inertia::render('EmployeeDirectory', [
            'employees' => $employees,
            'departments' => Department::all(),
            'filters' => $request->only(['search', 'department']),
        ]);
    }
}
