<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();
        if (!$admin)
            return;

        // Ensure categories exist
        $newsCat = PostCategory::updateOrCreate(['slug' => 'company-news'], ['title' => 'Company News', 'color' => '#3b82f6']);
        $eventsCat = PostCategory::updateOrCreate(['slug' => 'events'], ['title' => 'Events', 'color' => '#ef4444']);
        $promoCat = PostCategory::updateOrCreate(['slug' => 'promotions'], ['title' => 'Promotions', 'color' => '#f59e0b']);
        $healthCat = PostCategory::updateOrCreate(['slug' => 'health-wellness'], ['title' => 'Health & Wellness', 'color' => '#10b981']);

        // 1. Seed News
        for ($i = 1; $i <= 5; $i++) {
            $title = "News Item " . $i . ": QGIRCO Milestone Achievement";
            Post::updateOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'user_id' => $admin->id,
                    'category_id' => $newsCat->id,
                    'type' => 'news',
                    'title' => $title,
                    'summary' => "Brief summary for news " . $i,
                    'content' => "Full content for news " . $i,
                    'is_published' => true,
                    'created_at' => now()->subDays($i),
                ]
            );
        }

        // 2. Seed Events
        for ($i = 1; $i <= 5; $i++) {
            $title = "Upcoming Event " . $i . ": Team Building Workshop";
            Post::updateOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'user_id' => $admin->id,
                    'category_id' => $eventsCat->id,
                    'type' => 'event',
                    'title' => $title,
                    'summary' => "Event summary " . $i,
                    'content' => "Event details " . $i,
                    'event_date' => now()->addDays($i * 2),
                    'event_time' => now()->addDays($i * 2)->setHour(9)->setMinute(0),
                    'event_end_time' => now()->addDays($i * 2)->setHour(17)->setMinute(0),
                    'event_venue' => "Conference Room " . $i,
                    'is_published' => true,
                ]
            );
        }

        // 3. Seed Promotions
        $promotionsData = [
            [
                'title' => '20% Off at Marriott Hotel',
                'summary' => 'Use code QGIRCO20',
                'link_type' => 'external',
                'external_link' => 'https://www.marriott.com',
            ],
            [
                'title' => 'Exclusive Gym Membership',
                'summary' => 'Valid until June 2026',
                'link_type' => 'pdf',
                'external_link' => null,
            ],
            [
                'title' => 'Special Car Rental Rates',
                'summary' => 'Hertz Discount for Employees',
                'link_type' => 'external',
                'external_link' => 'https://www.hertz.com',
            ],
        ];

        foreach ($promotionsData as $i => $item) {
            Post::updateOrCreate(
                ['slug' => Str::slug($item['title'])],
                [
                    'user_id' => $admin->id,
                    'category_id' => $promoCat->id,
                    'type' => 'promotion',
                    'title' => $item['title'],
                    'summary' => $item['summary'],
                    'content' => "Get exclusive discounts at " . $item['title'],
                    'is_published' => true,
                    'link_type' => $item['link_type'],
                    'external_link' => $item['external_link'],
                ]
            );
        }

        // 4. Seed Health Articles
        for ($i = 1; $i <= 2; $i++) {
            $title = "Health Tip " . $i . ": 5-minute Desk Yoga";
            Post::updateOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'user_id' => $admin->id,
                    'category_id' => $healthCat->id,
                    'type' => 'health_article',
                    'title' => $title,
                    'summary' => "Quick exercises for a refreshed soul.",
                    'content' => "Detailed guide for desk yoga...",
                    'is_published' => true,
                    'created_at' => now()->subDays($i),
                ]
            );
        }
    }
}
