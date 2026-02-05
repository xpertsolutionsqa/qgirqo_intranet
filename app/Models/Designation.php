<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    protected $fillable = [
        'title',
        'slug'
    ];

    public function employees()
    {
        return $this->hasMany(EmployeeProfile::class);
    }
}
