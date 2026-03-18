<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChallengeOption extends Model
{
    protected $fillable = ['challenge_id', 'option_text'];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }

    public function responses()
    {
        return $this->hasMany(ChallengeResponse::class);
    }
}
