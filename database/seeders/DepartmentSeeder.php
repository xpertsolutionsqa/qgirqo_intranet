<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $depts = [
            ['name' => "Information Department", "slug" => 'it_department'],
            ['name' => "Human Resources", "slug" => 'hr'],
            ['name' => "Finance", "slug" => 'finance'],
            ['name' => "Underwriting", "slug" => 'underwriting'],
            ['name' => "Claims", "slug" => 'claims'],
        ];

        foreach ($depts as $dept) {
            \App\Models\Department::create($dept);
        }
    }
}
