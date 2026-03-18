<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = ['question', 'scheduled_at', 'image_path', 'is_active'];

    public function options()
    {
        return $this->hasMany(ChallengeOption::class);
    }

    public function responses()
    {
        return $this->hasMany(ChallengeResponse::class);
    }
}
