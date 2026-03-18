<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\AlbumPhoto;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        if (!$user)
            return;

        $albums = [
            [
                'title' => 'Annual Gala 2025',
                'event_date' => '2025-11-12',
                'description' => 'Highlights from our 2025 Annual Gala event.',
                'photos' => [
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
                ]
            ],
            [
                'title' => 'Team Building Trip',
                'event_date' => '2025-10-05',
                'description' => 'Memories from our team building escape to the mountains.',
                'photos' => [
                    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
                    'https://images.unsplash.com/photo-1528605248644-14dd04cb21c7?q=80&w=800',
                ]
            ],
            [
                'title' => 'Innovation Workshop',
                'event_date' => '2025-07-02',
                'description' => 'Brainstorming session for the Q3 product roadmap.',
                'photos' => [
                    'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
                    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800',
                ]
            ],
            [
                'title' => 'Eid Celebration',
                'event_date' => '2025-06-28',
                'description' => 'Celebrating Eid-ul-Adha together at the office.',
                'photos' => [
                    'https://images.unsplash.com/photo-1564121211835-e88c852648fb?q=80&w=800',
                    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800',
                ]
            ],
        ];

        foreach ($albums as $albumData) {
            $photos = $albumData['photos'];
            unset($albumData['photos']);

            $albumData['user_id'] = $user->id;
            $albumData['slug'] = Str::slug($albumData['title']);
            $albumData['cover_image'] = $photos[0]; // Using external URL for now, controller should handle it
            $albumData['is_active'] = true;

            $album = Album::create($albumData);

            foreach ($photos as $photoUrl) {
                AlbumPhoto::create([
                    'album_id' => $album->id,
                    'file_path' => $photoUrl,
                    'caption' => 'Photo from ' . $album->title,
                ]);
            }
        }
    }
}
