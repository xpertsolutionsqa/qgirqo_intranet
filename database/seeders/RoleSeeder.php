<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::firstOrCreate(['name' => 'manage-users']);
        Permission::firstOrCreate(['name' => 'approve-leaves']);
        Permission::firstOrCreate(['name' => 'view-announcements']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());
        $hr = Role::firstOrCreate(['name' => 'hr']);
        $hr->givePermissionTo(['approve-leaves', 'view-announcements']);
        $employee = Role::firstOrCreate(['name' => 'employee']);
        $employee->givePermissionTo('view-announcements');

        Role::firstOrCreate(['name' => 'risk-management']);
    }
}
