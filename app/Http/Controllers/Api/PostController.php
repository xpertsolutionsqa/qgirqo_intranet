<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function latestNews()
    {
        $news = Post::where('type', 'news')
            ->where('is_published', true)
            ->with(['author', 'category'])
            ->latest()
            ->take(5) // Apne 5 kaha tha
            ->get();
        return PostResource::collection($news);
    }
}
