<?php

namespace Database\Seeders;

use App\Models\Challenge;
use App\Models\ChallengeOption;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $challenge = Challenge::create([
            'question' => 'How many steps did you manage to complete today?',
            'is_active' => true,
        ]);

        ChallengeOption::create([
            'challenge_id' => $challenge->id,
            'option_text' => 'Less than 5000',
        ]);

        ChallengeOption::create([
            'challenge_id' => $challenge->id,
            'option_text' => '5000 - 10000',
        ]);

        ChallengeOption::create([
            'challenge_id' => $challenge->id,
            'option_text' => 'More than 10000',
        ]);
    }
}
