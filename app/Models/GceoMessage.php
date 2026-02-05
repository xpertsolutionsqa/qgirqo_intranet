<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GceoMessage extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'cover_image',
        'video_url',
        'content',
        'is_active',
        'published_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'published_at' => 'datetime',
    ];
}
