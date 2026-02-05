<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostCategory;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $posts = Post::where('type', 'promotion')
            ->with(['author', 'category'])
            ->latest()
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'summary' => $post->summary,
                    'link_type' => $post->link_type,
                    'external_link' => $post->external_link,
                    'document_path' => $post->document_path,
                    'category_id' => $post->category_id,
                    'is_published' => $post->is_published,
                    'created_at' => $post->created_at->format('M d, Y'),
                    'category' => $post->category ? [
                        'title' => $post->category->title,
                        'color' => $post->category->color
                    ] : null,
                ];
            });

        return Inertia::render('Promotions/Promotions', [
            'posts' => $posts,
            'categories' => PostCategory::all(['id', 'title'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'category_id' => 'required|exists:post_categories,id',
            'link_type' => 'required|in:none,external,pdf',
            'external_link' => 'required_if:link_type,external|nullable|url',
            'document' => 'required_if:link_type,pdf|nullable|mimes:pdf|max:10000',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        $validated['type'] = 'promotion';

        $this->postService->createPost(
            $validated,
            $request->file('featured_image'),
            $request->file('document')
        );

        return redirect()->back()->with('success', 'Promotion created successfully');
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'category_id' => 'required|exists:post_categories,id',
            'link_type' => 'required|in:none,external,pdf',
            'external_link' => 'required_if:link_type,external|nullable|url',
            'document' => 'nullable|mimes:pdf|max:10000',
            'featured_image' => 'nullable|image|max:2048',
            'is_published' => 'boolean'
        ]);

        $this->postService->updatePost(
            $post,
            $validated,
            $request->file('featured_image'),
            $request->file('document')
        );

        return redirect()->back()->with('success', 'Promotion updated successfully');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $this->postService->deletePost($post);
        return redirect()->back()->with('success', 'Promotion deleted successfully');
    }
}
