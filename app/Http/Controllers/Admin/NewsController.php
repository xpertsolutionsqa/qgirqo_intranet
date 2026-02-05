<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $posts = Post::where('type', 'news')
            ->with(['author', 'category'])
            ->latest()
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'category_id' => $post->category_id,
                    'is_published' => $post->is_published,
                    'created_at' => $post->created_at->format('M d, Y'),
                    'author' => ['name' => $post->author->name],
                    'category' => $post->category ? [
                        'title' => $post->category->title,
                        'color' => $post->category->color
                    ] : null,
                ];
            });

        return Inertia::render('News/News', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category_id' => 'required'
        ]);

        $this->postService->createPost($validated, $request->file('featured_image'));

        return redirect()->back()->with('success', 'News created successfully');
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category_id' => 'required',
            'is_published' => 'boolean'
        ]);

        $post = Post::findOrFail($id);
        $this->postService->updatePost($post, $validated, $request->file('featured_image'));

        return redirect()->back()->with('success', 'News updated successfully');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $this->postService->deletePost($post);
        return redirect()->back()->with('success', 'News deleted successfully');
    }
}
