<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Designation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class FakeEmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $departments = Department::all();
        $designations = Designation::all();

        if ($departments->isEmpty() || $designations->isEmpty()) {
            return;
        }

        // 1. Create employees with birthdays Today
        for ($i = 0; $i < 2; $i++) {
            $this->createEmployee($faker, $departments, $designations, [
                'dob' => Carbon::now()->setYear(rand(1985, 2000)), // Birthday Today
            ]);
        }

        // 2. Create employees with work anniversary Today
        for ($i = 0; $i < 2; $i++) {
            $this->createEmployee($faker, $departments, $designations, [
                'joining_date' => Carbon::now()->subYears(rand(1, 10)), // Anniversary Today
            ]);
        }

        // 3. Create employees with upcoming birthdays (next 10 days)
        for ($i = 1; $i <= 3; $i++) {
            $this->createEmployee($faker, $departments, $designations, [
                'dob' => Carbon::now()->addDays($i)->setYear(rand(1985, 2000)),
            ]);
        }

        // 4. Create random employees
        for ($i = 0; $i < 10; $i++) {
            $this->createEmployee($faker, $departments, $designations);
        }
    }

    private function createEmployee($faker, $departments, $designations, $overrides = [])
    {
        $user = User::create([
            'name' => $faker->name,
            'email' => $faker->unique()->safeEmail,
            'password' => Hash::make('password'),
        ]);

        $user->assignRole('employee');

        $user->profile()->create([
            'employee_id' => 'EMP-' . strtoupper($faker->bothify('??###')),
            'department_id' => $departments->random()->id,
            'designation_id' => $designations->random()->id,
            'joining_date' => $overrides['joining_date'] ?? $faker->date('Y-m-d', '-10 years'),
            'dob' => $overrides['dob'] ?? $faker->date('Y-m-d', '-20 years'),
            'phone' => $faker->phoneNumber,
            'emergency_contact' => $faker->phoneNumber,
        ]);
    }
}
