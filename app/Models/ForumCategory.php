<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForumCategory extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'color'];


    public function topics()
    {
        return $this->hasMany(ForumTopic::class);
    }
}
