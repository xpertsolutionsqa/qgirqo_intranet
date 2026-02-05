<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PostCategory;
use Illuminate\Support\Str;

class PostCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['title' => 'Company News', 'color' => '#3b82f6'],
            ['title' => 'Events', 'color' => '#ef4444'],
            ['title' => 'Announcements', 'color' => '#10b981'],
            ['title' => 'HR Updates', 'color' => '#f59e0b'],
        ];

        foreach ($categories as $cat) {
            PostCategory::updateOrCreate(
                ['slug' => Str::slug($cat['title'])],
                ['title' => $cat['title'], 'color' => $cat['color']]
            );
        }
    }
}
