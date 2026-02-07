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

class BirthdaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $birthdays = [
            ['name' => 'Jeffy John Mathew', 'dept' => 'Motor Underwriting', 'dob' => '01-Jan'],
            ['name' => 'Mustafa Adam Mahamoud', 'dept' => 'Motor Claims', 'dob' => '01-Jan'],
            ['name' => 'Ayman Z H Salameh', 'dept' => 'Underwriting - General Lines', 'dob' => '01-Jan'],
            ['name' => 'Esam Musa Kuwa Garoufa', 'dept' => 'Motor Claims', 'dob' => '01-Jan'],
            ['name' => 'Hiba Ali Mohamed Elnour', 'dept' => 'Motor Underwriting', 'dob' => '01-Jan'],
            ['name' => 'Muhammed Arif Ghani Khan', 'dept' => 'Group Administration Department', 'dob' => '01-Jan'],
            ['name' => 'Hiba Ali Ayoub', 'dept' => 'Management Support', 'dob' => '01-Jan'],
            ['name' => 'Mahmoud Marwan Suhail Abu Lughod', 'dept' => 'Reinsurance', 'dob' => '01-Jan'],
            ['name' => 'Muhammad Qaid', 'dept' => 'Maintenance-GRECO', 'dob' => '01-Jan'],
            ['name' => 'Salman Riaz Khan', 'dept' => 'Group Administration Department', 'dob' => '02-Jan'],
            ['name' => 'Samar Ali Musallam Talahmeh', 'dept' => 'Compliance', 'dob' => '03-Jan'],
            ['name' => 'Fritzie Espina Caringal', 'dept' => 'Medical & Life', 'dob' => '04-Jan'],
            ['name' => 'Fazal Rehman S. Khan', 'dept' => 'ICT', 'dob' => '04-Jan'],
            ['name' => 'Bashayer Hasan M H Alkaabi', 'dept' => 'Group Human Resources Department', 'dob' => '06-Jan'],
            ['name' => 'Elsir Abdelasim Srelkhatim Osman', 'dept' => 'General Claims & Loss Control Department', 'dob' => '07-Jan'],
            ['name' => 'Abdul Rahuf Pulikkal', 'dept' => 'ICT', 'dob' => '09-Jan'],
            ['name' => 'Shajahan Karamkottil', 'dept' => 'Group Administration Department', 'dob' => '10-Jan'],
            ['name' => 'Munsif Muhammad', 'dept' => 'Motor Claims', 'dob' => '11-Jan'],
            ['name' => 'Abdullah Niaz Omar Abdullah', 'dept' => 'Motor Claims', 'dob' => '12-Jan'],
            ['name' => 'Manal Adnan Nemer Alnamri', 'dept' => 'Group Corporate Communications', 'dob' => '13-Jan'],
            ['name' => 'Khalil Wael Khalil Ahmad Elagha', 'dept' => 'Call Center', 'dob' => '15-Jan'],
            ['name' => 'Preetham Kumar Babu Thilakan', 'dept' => 'ICT', 'dob' => '16-Jan'],
            ['name' => 'Mohamed Bacha', 'dept' => 'Motor Claims', 'dob' => '17-Jan'],
            ['name' => 'Maryann Adele Hendricks', 'dept' => 'Underwriting - General Lines', 'dob' => '19-Jan'],
            ['name' => 'Mahmoud Abedalaziz Mohammad Abedalqader', 'dept' => 'Motor Underwriting', 'dob' => '19-Jan'],
            ['name' => 'Ruba Abdeen', 'dept' => 'Internal Audit', 'dob' => '20-Jan'],
            ['name' => 'Almaha Rashid A S Al-Kaabi', 'dept' => 'Group Human Resources Department', 'dob' => '20-Jan'],
            ['name' => 'Abdelfattah Said Abdelfattah Amro', 'dept' => 'Medical & Life', 'dob' => '23-Jan'],
            ['name' => 'Khadija Nasser G G Abu-Alfain', 'dept' => 'Procurement Department', 'dob' => '23-Jan'],
            ['name' => 'Hesa Khaled A A Buhusain', 'dept' => 'Litigation', 'dob' => '23-Jan'],
            ['name' => 'Sana Khalid Dadarkar', 'dept' => 'Business Development and Customer Service', 'dob' => '23-Jan'],
            ['name' => 'Shanavas Kalathin Imbichimuhammed', 'dept' => 'ICT', 'dob' => '24-Jan'],
            ['name' => 'Sheryl Canonigo Prajes', 'dept' => 'Finance', 'dob' => '24-Jan'],
            ['name' => 'Mohamed Affas M R Al-Marri', 'dept' => 'Branches - Al Murra', 'dob' => '29-Jan'],
            ['name' => 'Maria Visitacion Feliciano Catral', 'dept' => 'ICT', 'dob' => '29-Jan'],
            ['name' => 'Ekaterina Ryzhkouskaya', 'dept' => 'Project & Engineering-GRECO', 'dob' => '02-Feb'],
            ['name' => 'Noora Saeed Ibrahim Sirriyah', 'dept' => 'Group Human Resources Department', 'dob' => '06-Feb'],
            ['name' => 'Ansar Koomullyparambath', 'dept' => 'Group Administration Department', 'dob' => '07-Feb'],
            ['name' => 'Jaber Ali A Ismail', 'dept' => 'Insurance Operations', 'dob' => '18-Feb'],
            ['name' => 'Shaikah Jaza T A Alshammari', 'dept' => 'Underwriting - General Lines', 'dob' => '21-Feb'],
            ['name' => 'Jude Tenasas Tan', 'dept' => 'ICT', 'dob' => '24-Feb'],
            ['name' => 'Mahaboob Batcha Nannajan', 'dept' => 'Procurement Department', 'dob' => '29-Feb'],
        ];

        // Get a default designation ID (first one or create a generic one)
        $defaultDesignation = Designation::first() ?? Designation::create(['title' => 'Staff', 'slug' => 'staff']);

        foreach ($birthdays as $data) {
            // 1. Match Department
            $department = Department::firstOrCreate(
                ['name' => $data['dept']],
                ['slug' => Str::slug($data['dept'])]
            );

            // 2. Format Birthday (Year 2000)
            try {
                // Handle 29-Feb edge case for year 2000 (leap year)
                $dob = Carbon::createFromFormat('j-M-Y', $data['dob'] . '-2000')->format('Y-m-d');
            } catch (\Exception $e) {
                $dob = '2000-01-01'; // Fallback
            }

            // 3. Find existing user by name
            $user = User::where('name', $data['name'])->first();

            if (!$user) {
                // Auto-gen credentials for new users
                $firstName = strtolower(explode(' ', $data['name'])[0]);
                $email = $firstName . rand(100, 999) . '@qgirco.com';

                // Ensure unique email
                while (User::where('email', $email)->exists()) {
                    $email = $firstName . rand(100, 999) . '@qgirco.com';
                }

                $user = User::create([
                    'name' => $data['name'],
                    'email' => $email,
                    'password' => Hash::make($firstName),
                ]);
                $user->assignRole('employee');
            }

            // 4. Update or Create Profile
            $profile = EmployeeProfile::where('user_id', $user->id)->first();

            if ($profile) {
                $profile->update(['dob' => $dob]);
            } else {
                EmployeeProfile::create([
                    'user_id' => $user->id,
                    'department_id' => $department->id,
                    'designation_id' => $defaultDesignation->id,
                    'employee_id' => 'B-' . rand(10000, 99999),
                    'dob' => $dob,
                    'joining_date' => '2020-01-01', // Default joining date
                ]);
            }
        }
    }
}
