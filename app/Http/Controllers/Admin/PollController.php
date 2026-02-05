<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Services\PollService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PollController extends Controller
{
    protected $pollService;

    public function __construct(PollService $pollService)
    {
        $this->pollService = $pollService;
    }

    public function index()
    {
        $polls = Poll::with(['options' => function ($query) {
            $query->withCount('votes');
        }])
            ->withCount('votes')
            ->latest()
            ->get()
            ->map(function ($poll) {
                return [
                    'id' => $poll->id,
                    'question' => $poll->question,
                    'is_active' => $poll->is_active,
                    'total_votes' => $poll->votes_count,
                    'ends_at' => $poll->ends_at ? $poll->ends_at : null,
                    'options' => $poll->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'text' => $option->option_text,
                            'votes' => $option->votes_count,
                        ];
                    }),
                ];
            });

        return Inertia::render('Polls/AdminPolls', [
            'polls' => $polls
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|max:255',
            'ends_at' => 'nullable|date|after:today',
            'is_active' => 'boolean'
        ]);

        $this->pollService->createPoll($validated);

        return redirect()->back()->with('success', 'Poll created successfully');
    }

    public function toggleStatus($id)
    {
        $poll = Poll::findOrFail($id);
        $poll->update(['is_active' => !$poll->is_active]);

        return redirect()->back()->with('success', 'Poll status updated');
    }

    public function destroy($id)
    {
        $poll = Poll::findOrFail($id);
        $this->pollService->deletePoll($poll);

        return redirect()->back()->with('success', 'Poll deleted successfully');
    }
}
