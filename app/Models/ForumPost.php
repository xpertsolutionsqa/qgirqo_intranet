<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForumPost extends Model
{
    protected $fillable = [
        'forum_topic_id',
        'user_id',
        'content'
    ];

    public function topic()
    {
        return $this->belongsTo(ForumTopic::class, 'forum_topic_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
