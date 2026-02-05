<?php

namespace database\seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::set(
            'welcome_slogan',
            'Ipsum lorem daily, monthly or seasonal rotating slogan or quote goes here.',
            'text',
            'Welcome Slogan',
            'welcome_page'
        );

        Setting::set(
            'employee_handbook_path',
            null,
            'file',
            'Employee Handbook',
            'documents'
        );

        Setting::set(
            'dress_code_policy_path',
            null,
            'file',
            'Dress Code Policy',
            'documents'
        );
    }
}
