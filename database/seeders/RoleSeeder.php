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
        Permission::create(['name' => 'manage-users']);
        Permission::create(['name' => 'approve-leaves']);
        Permission::create(['name' => 'view-announcements']);
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());
        $hr = Role::create(['name' => 'hr']);
        $hr->givePermissionTo(['approve-leaves', 'view-announcements']);
        $employee = Role::create(['name' => 'employee']);
        $employee->givePermissionTo('view-announcements');
    }
}
