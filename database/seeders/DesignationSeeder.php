<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DesignationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $designations = [
            ['title' => 'Manager', 'slug' => 'manager'],
            ['title' => 'Software Engineer', 'slug' => 'software-engineer'],
            ['title' => 'Senior Developer', 'slug' => 'senior-developer'],
            ['title' => 'Junior Engineer', 'slug' => 'junior-engineer'],
            ['title' => 'HR Specialist', 'slug' => 'hr-specialist'],
            ['title' => 'Accountant', 'slug' => 'accountant'],
        ];

        foreach ($designations as $designation) {
            \App\Models\Designation::create($designation);
        }
    }
}
