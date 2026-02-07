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

class EmployeeBulkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'emp_id' => '31821',
                'name' => 'Abdulrazaq Ali A S Mohamed',
                'department' => 'Group Administration Department',
                'designation' => 'Public Relations Officer',
                'anniversary' => '1-Feb'
            ],
            [
                'emp_id' => '31296',
                'name' => 'Masoud Mohammed J. J Al-Jallab',
                'department' => 'Branches - Al Murra',
                'designation' => 'Sr. Client Support Administrator',
                'anniversary' => '3-Feb'
            ],
            [
                'emp_id' => '35116',
                'name' => 'Maged Abdou Mahmoud Eid',
                'department' => 'Call Center',
                'designation' => 'Customer Experience Agent',
                'anniversary' => '6-Feb'
            ],
            [
                'emp_id' => '31242',
                'name' => 'Fazal Rehman S. Khan',
                'department' => 'ICT',
                'designation' => 'Business Application Administrator',
                'anniversary' => '7-Feb'
            ],
            [
                'emp_id' => '39009',
                'name' => 'Sudath Anuruddha Costa Narahenpitage',
                'department' => 'Ceylinco',
                'designation' => 'Office Assistant',
                'anniversary' => '11-Feb'
            ],
            [
                'emp_id' => '31469',
                'name' => 'Fares Albunni',
                'department' => 'Compliance',
                'designation' => 'Money Laundry Reporting Officer/Compliance Officer',
                'anniversary' => '12-Feb'
            ],
            [
                'emp_id' => '31470',
                'name' => 'Anis Nalakath',
                'department' => 'Underwriting - General Lines',
                'designation' => 'Senior Underwriter-General Lines',
                'anniversary' => '12-Feb'
            ],
            [
                'emp_id' => '35092',
                'name' => 'Dalia Rakib Kaddoura',
                'department' => 'Group Human Resources Department',
                'designation' => 'Senior Talent Management Officer',
                'anniversary' => '15-Feb'
            ],
            [
                'emp_id' => '35115',
                'name' => 'Sheryl Canonigo Prajes',
                'department' => 'Finance',
                'designation' => 'Credit Control Officer',
                'anniversary' => '15-Feb'
            ],
            [
                'emp_id' => '31304',
                'name' => 'Tamer Ahmed M. Ismail',
                'department' => 'Motor Claims',
                'designation' => 'Motor Claims Manager',
                'anniversary' => '24-Feb'
            ],
            [
                'emp_id' => '31501',
                'name' => 'Bayan Mousa Ismail Bader',
                'department' => 'Management Support',
                'designation' => 'Executive Secretary',
                'anniversary' => '26-Feb'
            ],
            [
                'emp_id' => '31869',
                'name' => 'Mahaboob Batcha Nannajan',
                'department' => 'Procurement Department',
                'designation' => 'Procurement Specialist',
                'anniversary' => '26-Feb'
            ],
            [
                'emp_id' => '31639',
                'name' => 'Abdelfattah Said Abdelfattah Amro',
                'department' => 'Medical & Life',
                'designation' => 'Manager - Medical & Life',
                'anniversary' => '28-Feb'
            ],
        ];

        foreach ($employees as $empData) {
            // 1. Get or Create Department
            $department = Department::firstOrCreate(
                ['name' => $empData['department']],
                ['slug' => Str::slug($empData['department'])]
            );

            // 2. Get or Create Designation
            $designation = Designation::firstOrCreate(
                ['title' => $empData['designation']],
                ['slug' => Str::slug($empData['designation'])]
            );

            // 3. Find or Create User & Profile
            // We search by employee_id first to avoid unique constraint issues
            $existingProfile = EmployeeProfile::where('employee_id', $empData['emp_id'])->first();

            if ($existingProfile) {
                $user = $existingProfile->user;
                // Update name if it changed
                $user->update(['name' => $empData['name']]);
            } else {
                // Prepare Email & Password (only for new users)
                $firstName = strtolower(explode(' ', $empData['name'])[0]);
                $baseEmail = $firstName . '@qgirco.com';
                $email = $baseEmail;

                // Check for duplicate email across ALL users
                $count = 1;
                while (User::where('email', $email)->exists()) {
                    $email = $firstName . $count . '@qgirco.com';
                    $count++;
                }

                $user = User::create([
                    'name' => $empData['name'],
                    'email' => $email,
                    'password' => Hash::make($firstName),
                ]);
            }

            $user->assignRole('employee');

            // 4. Parse Anniversary to Joining Date (Default Year 2020)
            try {
                $joiningDate = Carbon::createFromFormat('j-M-Y', $empData['anniversary'] . '-2020')->format('Y-m-d');
            } catch (\Exception $e) {
                $joiningDate = Carbon::now()->subYears(5)->format('Y-m-d');
            }

            // 5. Update or Create Profile
            EmployeeProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'department_id' => $department->id,
                    'designation_id' => $designation->id,
                    'employee_id' => $empData['emp_id'],
                    'joining_date' => $joiningDate,
                ]
            );
        }
    }
}
