<?php

namespace App\Http\Controllers;

use App\Models\GceoMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;

class GceoMessageController extends Controller
{
    public function index()
    {
        $messages = GceoMessage::latest()->paginate(10);
        return Inertia::render('GceoMessages/Index', [
            'messages' => $messages
        ]);
    }

    public function store(Request $request)
    {
        ini_set('memory_limit', '512M');
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'cover_image' => 'nullable|image|max:2048', // 2MB Max
            'video_url' => 'required|file|mimetypes:video/mp4,video/quicktime,video/ogg,video/x-msvideo|max:102400', // 100MB Max
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        // Auto-generate title if missing
        if (empty($validated['title'])) {
            // Use original filename or simple timestamp
            $originalName = $request->file('video_url')->getClientOriginalName();
            $validated['title'] = 'GCEO Message - ' . pathinfo($originalName, PATHINFO_FILENAME);
        }

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (GceoMessage::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        // Use default cover image if missing
        if (!isset($validated['cover_image'])) {
            // You should have a default asset. For now, using the one from the frontend's original hardcoded path or similar.
            // Or leave it null and let frontend handle fallback (which it does: /assets/img/Rectangle-1383.jpg)
            $validated['cover_image'] = null; // Backend is fine with null
        }

        // Ensure defaults for others if coming from simplified form
        if (!isset($validated['is_active'])) $validated['is_active'] = true;
        if (!isset($validated['published_at'])) $validated['published_at'] = now();

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('gceo-messages', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('video_url')) {
            $path = $request->file('video_url')->store('gceo-messages', 'public');
            $validated['video_url'] = '/storage/' . $path;
        }

        $message = GceoMessage::create($validated);

        return to_route('gceo-messages.index')->with('success', 'Message created successfully');
    }

    public function show(GceoMessage $gceoMessage)
    {
        return response()->json($gceoMessage);
    }

    public function update(Request $request, GceoMessage $gceoMessage)
    {
        ini_set('memory_limit', '512M');
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'cover_image' => 'nullable|image|max:2048',
            'video_url' => 'nullable|file|mimetypes:video/mp4,video/quicktime,video/ogg,video/x-msvideo|max:102400',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($request->has('title')) {
            $slug = Str::slug($validated['title']);
            if ($slug !== $gceoMessage->slug) {
                $originalSlug = $slug;
                $count = 1;
                while (GceoMessage::where('slug', $slug)->where('id', '!=', $gceoMessage->id)->exists()) {
                    $slug = $originalSlug . '-' . $count++;
                }
                $validated['slug'] = $slug;
            }
        }

        if ($request->hasFile('cover_image')) {
            // Delete old image
            if ($gceoMessage->cover_image) {
                $oldPath = str_replace('/storage/', '', $gceoMessage->cover_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('cover_image')->store('gceo-messages', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('video_url')) {
            // Delete old video
            if ($gceoMessage->video_url) {
                // Check if it's a local file (starts with /storage/)
                if (Str::startsWith($gceoMessage->video_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $gceoMessage->video_url);
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $path = $request->file('video_url')->store('gceo-messages', 'public');
            $validated['video_url'] = '/storage/' . $path;
        } else {
            // If no new video upload, unset video_url so it doesn't try to update it with null if we didn't send anything
            // However, `validate` returns validated data. If we don't send 'video_url', it's not in $validated unless we used 'nullable' and sent null?
            // Actually, if we send nothing for file input, it doesn't appear in request usually.
            // But we validated 'video_url', so if it's missing it might not be in $validated.
            // Let's ensure we don't overwrite with null unless intended (but we usually don't send null for file update unless deleting?)
            // For now, simple standard logic:
            unset($validated['video_url']);
        }

        // However, we just unset it. If we wanted to clear the video, we'd need a specific 'remove_video' flag, but for now assuming replacement or keep.
        // Actually, $request->hasFile('video_url') is creating the entry in $validated? 
        // No, $validated contains what passed validation. If input was null/empty and rule is nullable, key exists as null.
        // So we must be careful.
        if (!$request->hasFile('video_url')) {
            unset($validated['video_url']);
        }


        $gceoMessage->update($validated);

        return to_route('gceo-messages.index')->with('success', 'Message updated successfully');
    }

    public function destroy(GceoMessage $gceoMessage)
    {
        if ($gceoMessage->cover_image) {
            $oldPath = str_replace('/storage/', '', $gceoMessage->cover_image);
            Storage::disk('public')->delete($oldPath);
        }
        if ($gceoMessage->video_url && Str::startsWith($gceoMessage->video_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $gceoMessage->video_url);
            Storage::disk('public')->delete($oldPath);
        }
        $gceoMessage->delete();
        return to_route('gceo-messages.index')->with('success', 'Message deleted successfully');
    }
}
