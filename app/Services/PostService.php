<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostService
{
    /**
     * Create a new news/event post.
     */
    public function createPost(array $data, $image = null, $document = null)
    {

        $data['slug'] = Str::slug($data['title']) . '-' . uniqid();
        $data['user_id'] = auth()->id();
        $data['type'] = $data['type'] ?? 'news';
        $data['is_published'] = $data['is_published'] ?? true;

        if ($image) {
            $data['featured_image'] = $image->store('posts', 'public');
        }

        if ($document) {
            $data['document_path'] = $document->store('documents', 'public');
        }

        return Post::create($data);
    }

    /**
     * Update an existing post.
     */
    public function updatePost(Post $post, array $data, $image = null, $document = null)
    {
        if ($image) {
            // Purani image delete karein agar maujood hai
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $data['featured_image'] = $image->store('posts', 'public');
        }

        if ($document) {
            // Purana document delete karein agar maujood hai
            if ($post->document_path) {
                Storage::disk('public')->delete($post->document_path);
            }
            $data['document_path'] = $document->store('documents', 'public');
        }

        $post->update($data);
        return $post;
    }

    /**
     * Delete a post and its image.
     */
    public function deletePost(Post $post)
    {
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }
        if ($post->document_path) {
            Storage::disk('public')->delete($post->document_path);
        }
        return $post->delete();
    }
}
