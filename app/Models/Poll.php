<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = [
        'user_id',
        'question',
        'starts_at',
        'ends_at',
        'is_active',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function options()
    {
        return $this->hasMany(PollOption::class);
    }

    public function votes()
    {
        return $this->hasMany(PollVote::class);
    }
}
