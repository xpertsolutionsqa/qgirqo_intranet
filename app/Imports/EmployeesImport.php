<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Department;
use App\Models\Designation;
use App\Models\EmployeeProfile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;

class EmployeesImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Check if required data is present
            if (!isset($row['emp_id']) || !isset($row['name']) || !isset($row['department']) || !isset($row['designation'])) {
                continue;
            }

            // 1. Get or Create Department
            $department = Department::firstOrCreate(
                ['name' => $row['department']],
                ['slug' => Str::slug($row['department'])]
            );

            // 2. Get or Create Designation
            $designation = Designation::firstOrCreate(
                ['title' => $row['designation']],
                ['slug' => Str::slug($row['designation'])]
            );

            // 3. Find or Create User & Profile
            $existingProfile = EmployeeProfile::where('employee_id', $row['emp_id'])->first();

            if ($existingProfile) {
                $user = $existingProfile->user;
                if ($user) {
                    $user->update(['name' => $row['name']]);
                } else {
                    $user = $this->createNewUser($row);
                }
            } else {
                $user = $this->createNewUser($row);
            }

            if ($user && !$user->hasRole('employee')) {
                $user->assignRole('employee');
            }

            // 4. Parse Anniversary to Joining Date (Default Year 2020)
            try {
                $anniversary = $row['anniversary'] ?? '';
                if ($anniversary) {
                    $joiningDate = Carbon::createFromFormat('j-M-Y', $anniversary . '-2020')->format('Y-m-d');
                } else {
                    $joiningDate = Carbon::now()->subYears(5)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $joiningDate = Carbon::now()->subYears(5)->format('Y-m-d');
            }

            // 5. Update or Create Profile
            if ($user) {
                EmployeeProfile::updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'department_id' => $department->id,
                        'designation_id' => $designation->id,
                        'employee_id' => $row['emp_id'],
                        'joining_date' => $joiningDate,
                    ]
                );
            }
        }
    }

    private function createNewUser($row)
    {
        // Prepare Email & Password (only for new users)
        $firstName = strtolower(explode(' ', trim($row['name']))[0]);
        $baseEmail = $firstName . '@qgirco.com';
        $email = $baseEmail;

        // Check for duplicate email across ALL users
        $count = 1;
        while (User::where('email', $email)->exists()) {
            $email = $firstName . $count . '@qgirco.com';
            $count++;
        }

        return User::create([
            'name' => $row['name'],
            'email' => $email,
            'password' => Hash::make($firstName),
        ]);
    }
}
