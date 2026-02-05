<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForumTopic extends Model
{
    protected $fillable = [
        'forum_category_id',
        'user_id',
        'type',
        'title',
        'slug',
        'content',
        'view_count',
        'is_locked'
    ];

    public function category()
    {
        return $this->belongsTo(ForumCategory::class, 'forum_category_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function replies()
    {
        return $this->hasMany(ForumPost::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
