<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


use App\Models\Traits\EmployeeScopes;

class EmployeeProfile extends Model
{
    use EmployeeScopes;

    protected $fillable = [
        'user_id',
        'department_id',
        'designation_id',
        'employee_id',
        'joining_date',
        'dob',
        'avatar',
        'phone',
        'emergency_contact',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function designation()
    {
        return $this->belongsTo(Designation::class);
    }
}
