<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\ChallengeOption;
use App\Models\ChallengeResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ChallengeController extends Controller
{
    public function index()
    {
        $challenges = Challenge::with('options')->latest()->get();

        return Inertia::render('Challenges/Index', [
            'challenges' => $challenges
        ]);
    }

    public function show(Challenge $challenge)
    {
        $challenge->load(['options', 'responses.user.profile.department', 'responses.user.profile.designation', 'responses.option']);

        $totalResponses = $challenge->responses->count();

        // Per-option breakdown with count + percentage
        $optionStats = $challenge->options->map(function ($option) use ($challenge, $totalResponses) {
            $count = $challenge->responses->where('challenge_option_id', $option->id)->count();
            return [
                'id' => $option->id,
                'option_text' => $option->option_text,
                'count' => $count,
                'percentage' => $totalResponses > 0 ? round(($count / $totalResponses) * 100) : 0,
            ];
        });

        // Employee response list
        $responses = $challenge->responses->map(function ($response) {
            $profile = $response->user?->profile;
            return [
                'id' => $response->id,
                'submitted_at' => $response->created_at->format('d M Y, h:i A'),
                'user' => [
                    'id' => $response->user?->id,
                    'name' => $response->user?->name,
                    'avatar' => $profile?->avatar ? '/storage/' . $profile->avatar : null,
                    'employee_id' => $profile?->employee_id,
                    'department' => $profile?->department?->name,
                    'designation' => $profile?->designation?->name,
                ],
                'chosen_option' => $response->option?->option_text,
            ];
        })->values();

        return Inertia::render('Challenges/Show', [
            'challenge' => $challenge->only(['id', 'question', 'image_path', 'scheduled_at', 'is_active']),
            'totalResponses' => $totalResponses,
            'optionStats' => $optionStats,
            'responses' => $responses,
        ]);
    }

    public function store(Request $request)
    {
        $options = array_filter($request->options ?: [], function ($val) {
            return !is_null($val) && trim($val) !== '';
        });
        $request->merge(['options' => array_values($options)]);

        $request->validate([
            'question' => 'required|string|max:255',
            'scheduled_at' => 'nullable|date',
            'image' => 'nullable|image|max:2048',
            'options' => 'required|array|min:3|max:4',
            'options.*' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($request) {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('challenges', 'public');
            }

            $challenge = Challenge::create([
                'question' => $request->question,
                'scheduled_at' => $request->scheduled_at,
                'image_path' => $imagePath,
                'is_active' => false,
            ]);

            foreach ($request->options as $optionText) {
                $challenge->options()->create([
                    'option_text' => $optionText,
                ]);
            }
        });

        return back()->with('success', 'Challenge created successfully!');
    }

    public function update(Request $request, Challenge $challenge)
    {
        // Filter out empty options before validation
        $options = array_filter($request->options ?: [], function ($val) {
            return !is_null($val) && trim($val) !== '';
        });
        $request->merge(['options' => array_values($options)]);

        $request->validate([
            'question' => 'required|string|max:255',
            'scheduled_at' => 'nullable|date',
            'image' => 'nullable|image|max:2048',
            'options' => 'required|array|min:3|max:4',
            'options.*' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($request, $challenge) {
            $data = [
                'question' => $request->question,
                'scheduled_at' => $request->scheduled_at,
            ];

            if ($request->hasFile('image')) {
                if ($challenge->image_path) {
                    Storage::disk('public')->delete($challenge->image_path);
                }
                $data['image_path'] = $request->file('image')->store('challenges', 'public');
            }

            $challenge->update($data);

            // Sync options: Delete old and create new
            $challenge->options()->delete();
            foreach ($request->options as $optionText) {
                $challenge->options()->create([
                    'option_text' => $optionText,
                ]);
            }
        });

        return back()->with('success', 'Challenge updated successfully!');
    }

    public function destroy(Challenge $challenge)
    {
        if ($challenge->image_path) {
            Storage::disk('public')->delete($challenge->image_path);
        }
        $challenge->delete();
        return back()->with('success', 'Challenge deleted successfully!');
    }

    public function toggle(Challenge $challenge)
    {
        $challenge->update([
            'is_active' => !$challenge->is_active
        ]);

        return back()->with('success', 'Challenge status updated!');
    }
}
