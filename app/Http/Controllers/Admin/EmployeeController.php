<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Department;
use App\Models\Designation;
use App\Services\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index()
    {
        $employees = User::with(['profile.department', 'profile.designation', 'roles'])
            ->whereHas('roles', function ($q) {
                // You can filter by role if needed, or show all
            })
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles->first()?->name ?? 'employee',
                    'department' => $user->profile?->department?->name ?? 'N/A',
                    'designation' => $user->profile?->designation?->title ?? 'N/A',
                    'employee_id' => $user->profile?->employee_id ?? 'N/A',
                    'joining_date' => $user->profile?->joining_date,
                    'phone' => $user->profile?->phone,
                    'dob' => $user->profile?->dob,
                    'emergency_contact' => $user->profile?->emergency_contact,
                    'department_id' => $user->profile?->department_id,
                    'designation_id' => $user->profile?->designation_id,
                ];
            });

        return Inertia::render('Employees/Employees', [
            'employees' => $employees,
            'departments' => Department::all(['id', 'name']),
            'designations' => Designation::all(['id', 'title']),
            'roles' => Role::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'password' => 'nullable|string|min:8',
            'role' => 'required|string|exists:roles,name',
            'department_id' => 'required|exists:departments,id',
            'designation_id' => 'required|exists:designations,id',
            'employee_id' => 'nullable|string|unique:employee_profiles,employee_id',
            'phone' => 'nullable|string',
            'dob' => 'nullable|date',
            'joining_date' => 'nullable|date',
            'emergency_contact' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if (empty($validated['email'])) {
            $firstName = strtolower(explode(' ', $validated['name'])[0]);
            $baseEmail = $firstName . '@qgirco.com';
            $email = $baseEmail;
            $count = 1;
            while (User::where('email', $email)->exists()) {
                $email = $firstName . $count . '@qgirco.com';
                $count++;
            }
            $validated['email'] = $email;
        }

        if (empty($validated['password'])) {
            $firstName = strtolower(explode(' ', $validated['name'])[0]);
            $validated['password'] = $firstName;
        }

        if (empty($validated['employee_id'])) {
            $lastProfile = \App\Models\EmployeeProfile::orderBy('id', 'desc')->first();
            $nextId = $lastProfile ? intval($lastProfile->id) + 1 : 1;
            $validated['employee_id'] = 'QG-' . str_pad($nextId, 5, '0', STR_PAD_LEFT);
        }

        $this->employeeService->createEmployee($validated);

        return redirect()->back()->with('success', 'Employee created successfully');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string|exists:roles,name',
            'department_id' => 'required|exists:departments,id',
            'designation_id' => 'required|exists:designations,id',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'employee_id' => 'required|string|unique:employee_profiles,employee_id,' . ($user->profile->id ?? 0),
            'phone' => 'nullable|string',
            'dob' => 'nullable|date',
            'joining_date' => 'nullable|date',
            'emergency_contact' => 'nullable|string',
        ]);

        $this->employeeService->updateEmployee($user, $validated);

        return redirect()->back()->with('success', 'Employee updated successfully');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $this->employeeService->deleteEmployee($user);

        return redirect()->back()->with('success', 'Employee deleted successfully');
    }
}
