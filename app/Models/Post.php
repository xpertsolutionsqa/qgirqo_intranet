<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'type',
        'link_type',
        'external_link',
        'document_path',
        'title',
        'slug',
        'summary',
        'content',
        'featured_image',
        'event_date',
        'event_time',
        'event_end_time',
        'event_venue',
        'is_published',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'event_time' => 'datetime',
        'event_end_time' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'category_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
