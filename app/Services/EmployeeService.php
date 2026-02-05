<?php

namespace App\Services;

use App\Models\User;
use App\Models\EmployeeProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class EmployeeService
{
    /**
     * Create a new employee with user and profile inside a transaction.
     */
    public function createEmployee(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Create user
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            // Assign Role (Spatie Permission)
            if (isset($data['role'])) {
                $user->assignRole($data['role']);
            } else {
                $user->assignRole('employee');
            }

            $avatar = null;
            if (isset($data['avatar']) && $data['avatar'] instanceof \Illuminate\Http\UploadedFile) {
                $avatar = $data['avatar']->store('employees', 'public');
            }

            // Create profile
            return EmployeeProfile::create([
                'user_id' => $user->id,
                'department_id' => $data['department_id'],
                'designation_id' => $data['designation_id'],
                'employee_id' => $data['employee_id'],
                'avatar' => $avatar,
                'phone' => $data['phone'] ?? null,
                'dob' => $data['dob'] ?? null,
                'joining_date' => $data['joining_date'] ?? null,
                'emergency_contact' => $data['emergency_contact'] ?? null,
            ]);
        });
    }

    /**
     * Update employee details.
     */
    public function updateEmployee(User $user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {

            // Update user
            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
            ]);

            if (!empty($data['password'])) {
                $user->update(['password' => Hash::make($data['password'])]);
            }

            // Update role if changed
            if (isset($data['role'])) {
                $user->syncRoles($data['role']);
            }

            $avatar = null;
            $image = $data['avatar'] ?? null;
            if ($image instanceof \Illuminate\Http\UploadedFile) {
                // Delete old image if exists
                if ($user->profile && $user->profile->avatar) {
                    Storage::disk('public')->delete($user->profile->avatar);
                }
                $avatar = $image->store('employees', 'public');
            }



            // Update profile
            return $user->profile->update([
                'department_id' => $data['department_id'],
                'designation_id' => $data['designation_id'],
                'employee_id' => $data['employee_id'],
                'phone' => $data['phone'] ?? null,
                'dob' => $data['dob'] ?? null,
                'avatar' => $avatar ?? $user->profile->avatar,
                'joining_date' => $data['joining_date'] ?? null,
                'emergency_contact' => $data['emergency_contact'] ?? null,
            ]);
        });
    }

    /**
     * Delete employee (User and Profile).
     */
    public function deleteEmployee(User $user)
    {
        return DB::transaction(function () use ($user) {
            if ($user->profile) {
                $user->profile->delete();
            }
            return $user->delete();
        });
    }
}
