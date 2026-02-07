<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Department;
use App\Models\Designation;
use App\Models\EmployeeProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ServicePeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Charles Kikano', 'dept' => 'Project & Engineering-GRECO', 'period' => '16 Years'],
            ['name' => 'Saidnagar Hawari Danial', 'dept' => 'ICT', 'period' => '15 Years'],
            ['name' => 'Feras A. K. Abujahel', 'dept' => 'Branches - Al Murra', 'period' => '15 Years'],
            ['name' => 'Mohammad Hefzi Abdelrahman Abualouf', 'dept' => 'Litigation', 'period' => '11 Years'],
            ['name' => 'Jayakrishnan Vijayakrishna Vijayakirhna', 'dept' => 'Business Development and Customer Service', 'period' => '11 Years'],
            ['name' => 'Swajeet Rai', 'dept' => 'Business Development and Customer Service', 'period' => '11 Years'],
            ['name' => 'Kumar Vivek Rai', 'dept' => 'Reinsurance', 'period' => '10 Years'],
            ['name' => 'Hossam Galal Seddek Elrefaei', 'dept' => 'Group Administration Department', 'period' => '8 Years'],
            ['name' => 'Wanigasekara Rajit Collin Perera', 'dept' => 'Business Development and Customer Service', 'period' => '8 Years'],
            ['name' => 'Rizni Muhajireen', 'dept' => 'ICT', 'period' => '5 Years'],
            ['name' => 'Bashayer Hasan M H Alkaabi', 'dept' => 'Group Human Resources Department', 'period' => '5 Years'],
            ['name' => 'Noora Saeed Ibrahim Sirriyah', 'dept' => 'Group Human Resources Department', 'period' => '5 Years'],
            ['name' => 'Samir Munir Abdallah A Abdalla', 'dept' => 'Maintenance-GRECO', 'period' => '5 Years'],
            ['name' => 'Noel Dhammika Ethaudage Perera', 'dept' => 'Finance', 'period' => '4 Years'],
            ['name' => 'Shaikah Jaza T A Alshammari', 'dept' => 'Underwriting - General Lines', 'period' => '4 Years'],
            ['name' => 'Khandaker Reqza Rayhan', 'dept' => 'Underwriting - General Lines', 'period' => '4 Years'],
            ['name' => 'Abdulelah Basheer J A Alsaud', 'dept' => 'Group Administration Department', 'period' => '3 Years'],
            ['name' => 'Princes Lubert Serrano Campos', 'dept' => 'Group Administration Department', 'period' => '2 Years'],
            ['name' => 'Roger Kopty', 'dept' => 'Internal Audit', 'period' => '2 Years'],
            ['name' => 'Samah Ghassan Jaafar', 'dept' => 'Internal Audit', 'period' => '1 Year'],
        ];

        $defaultDesignation = Designation::first() ?? Designation::create(['title' => 'Staff', 'slug' => 'staff']);

        foreach ($data as $item) {
            // 1. Match Department
            $department = Department::firstOrCreate(
                ['name' => trim($item['dept'])],
                ['slug' => Str::slug($item['dept'])]
            );

            // 2. Parse Years
            preg_match('/(\d+)/', $item['period'], $matches);
            $years = isset($matches[1]) ? intval($matches[1]) : 0;

            // Calculate Joining Date: Current date - X years
            // We set it to today's month/day so they appear in upcoming anniversaries
            $joiningDate = Carbon::now()->subYears($years)->format('Y-m-d');

            // 3. Find Employee by Name
            $user = User::where('name', trim($item['name']))->first();

            if (!$user) {
                // Auto-gen for new
                $firstName = strtolower(explode(' ', trim($item['name']))[0]);
                $email = $firstName . rand(1000, 9999) . '@qgirco.com';

                while (User::where('email', $email)->exists()) {
                    $email = $firstName . rand(1000, 9999) . '@qgirco.com';
                }

                $user = User::create([
                    'name' => trim($item['name']),
                    'email' => $email,
                    'password' => Hash::make($firstName),
                ]);
                $user->assignRole('employee');
            }

            // 4. Update or Create Profile
            $profile = EmployeeProfile::where('user_id', $user->id)->first();

            if ($profile) {
                $profile->update([
                    'joining_date' => $joiningDate,
                    'department_id' => $department->id,
                ]);
            } else {
                EmployeeProfile::create([
                    'user_id' => $user->id,
                    'department_id' => $department->id,
                    'designation_id' => $defaultDesignation->id,
                    'employee_id' => 'S-' . rand(10000, 99999),
                    'joining_date' => $joiningDate,
                    'dob' => '2000-01-01', // Default DOB
                ]);
            }
        }
    }
}
