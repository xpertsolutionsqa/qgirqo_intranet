<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChallengeResponse extends Model
{
    protected $fillable = ['challenge_id', 'challenge_option_id', 'user_id'];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }

    public function option()
    {
        return $this->belongsTo(ChallengeOption::class, 'challenge_option_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
