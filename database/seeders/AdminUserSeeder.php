<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = \App\Models\User::create([
            'name' => 'System Admin',
            'email' => 'admin@qgirco.com',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('admin');

        $user->profile()->create([
            'employee_id' => 'ADMIN-001',
            'department_id' => \App\Models\Department::where('slug', 'it_department')->first()->id,
            'designation_id' => \App\Models\Designation::where('slug', 'manager')->first()->id,
            'joining_date' => now(),
        ]);
    }
}
