<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'cover_image',
        'event_date',
        'is_active',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_active' => 'boolean',
    ];


    public function photos()
    {
        return $this->hasMany(AlbumPhoto::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
