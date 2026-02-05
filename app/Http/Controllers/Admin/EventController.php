<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $events = Post::where('type', 'event')
            ->with(['author', 'category'])
            ->latest()
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'content' => $event->content,
                    'event_date' => $event->event_date ? $event->event_date->format('Y-m-d') : null,
                    'event_time' => $event->event_time,
                    'event_venue' => $event->event_venue,
                    'is_published' => $event->is_published,
                    'category_id' => $event->category_id,
                    'created_at' => $event->created_at->format('M d, Y'),
                    'author' => ['name' => $event->author->name],
                    'category' => $event->category ? [
                        'title' => $event->category->title,
                        'color' => $event->category->color
                    ] : null,
                    'event_end_time' => $event->event_end_time,
                ];
            });

        return Inertia::render('Events/Events', [
            'events' => $events
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'event_end_time' => 'required',
            'event_venue' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category_id' => 'required',
            'is_published' => 'boolean'
        ]);

        $validated['type'] = 'event';

        $this->postService->createPost($validated, $request->file('featured_image'));

        return redirect()->back()->with('success', 'Event created successfully');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'event_end_time' => 'required',
            'event_venue' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category_id' => 'required',
            'is_published' => 'boolean'
        ]);

        $event = Post::findOrFail($id);
        $this->postService->updatePost($event, $validated, $request->file('featured_image'));

        return redirect()->back()->with('success', 'Event updated successfully');
    }

    public function destroy($id)
    {
        $event = Post::findOrFail($id);
        $this->postService->deletePost($event);
        return redirect()->back()->with('success', 'Event deleted successfully');
    }
}
