<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeOfTheMonth extends Model
{
    protected $fillable = [
        'user_id',
        'month',
        'year',
        'title',
        'reason',
        'featured_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
