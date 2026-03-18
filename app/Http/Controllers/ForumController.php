<?php

namespace App\Http\Controllers;

use App\Models\ForumTopic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->route('type') ?? 'discussion';

        $topics = ForumTopic::where('type', $type)
            ->with(['author.profile', 'replies'])
            ->withCount('replies')
            ->latest()
            ->paginate(10);

        $viewName = $type === 'voice' ? 'Forum/DigitalVoicesIndex' : 'Forum/Index';

        return Inertia::render($viewName, [
            'topics' => $topics
        ]);
    }

    public function show(ForumTopic $topic)
    {
        $topic->load(['author.profile', 'replies.author.profile']);
        $topic->increment('view_count');

        return Inertia::render('Forum/Show', [
            'topic' => $topic
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'forum_category_id' => 'nullable|exists:forum_categories,id',
        ]);

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (ForumTopic::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $topic = ForumTopic::create([
            'user_id' => auth()->id(),
            'type' => $request->type ?? 'discussion',
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'forum_category_id' => $validated['forum_category_id'] ?? null,
            'view_count' => 0,
            'is_locked' => false,
        ]);

        return Inertia::back()->with('success', 'Topic created successfully'); //to_route('forum.show', $topic)->with('success', 'Topic created successfully');
    }

    public function storeReply(Request $request, ForumTopic $topic)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:20480', // 20MB max
        ]);

        $mediaPath = null;
        $mediaType = null;

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mediaPath = $file->store('forum_media', 'public');
            $mediaType = str_starts_with($file->getMimeType(), 'video/') ? 'video' : 'image';
        }

        $topic->replies()->create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'media_path' => $mediaPath,
            'media_type' => $mediaType,
        ]);

        return back()->with('success', 'Reply posted successfully');
    }

    public function toggleLike(ForumTopic $topic)
    {
        $like = \App\Models\ForumTopicLike::where('user_id', auth()->id())
            ->where('forum_topic_id', $topic->id)
            ->first();

        if ($like) {
            $like->delete();
        } else {
            \App\Models\ForumTopicLike::create([
                'user_id' => auth()->id(),
                'forum_topic_id' => $topic->id,
            ]);
        }

        return back();
    }

    public function incrementView(ForumTopic $topic)
    {
        if (auth()->check()) {
            $viewExists = \App\Models\ForumTopicView::where('user_id', auth()->id())
                ->where('forum_topic_id', $topic->id)
                ->exists();

            if (!$viewExists) {
                \App\Models\ForumTopicView::create([
                    'user_id' => auth()->id(),
                    'forum_topic_id' => $topic->id,
                ]);

                $topic->increment('view_count');
            }
        }

        return back();
    }

    public function destroy(ForumTopic $topic)
    {
        if ($topic->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            abort(403);
        }

        $topic->delete();
        return Inertia::back()->with('success', 'Topic deleted successfully'); //to_route('forum.index')->with('success', 'Topic deleted successfully');
    }
}
