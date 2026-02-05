<?php

namespace App\Services;

use App\Models\Poll;
use App\Models\PollOption;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PollService
{
    public function createPoll(array $data)
    {
        return DB::transaction(function () use ($data) {
            $poll = Poll::create([
                'user_id' => Auth::id(),
                'question' => $data['question'],
                'starts_at' => $data['starts_at'] ?? now(),
                'ends_at' => $data['ends_at'] ?? null,
                'is_active' => $data['is_active'] ?? true,
            ]);

            foreach ($data['options'] as $optionText) {
                if (!empty($optionText)) {
                    PollOption::create([
                        'poll_id' => $poll->id,
                        'option_text' => $optionText,
                    ]);
                }
            }

            return $poll;
        });
    }

    public function deletePoll(Poll $poll)
    {
        return DB::transaction(function () use ($poll) {
            // Delete votes and options first if not handled by cascade
            $poll->votes()->delete();
            $poll->options()->delete();
            return $poll->delete();
        });
    }
}
