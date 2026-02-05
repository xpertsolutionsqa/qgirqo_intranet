<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'content' => $this->content,
            'image' => $this->featured_image ? asset('storage/' . $this->featured_image) : null,
            'category' => $this->category->title ?? null,
            'author' => $this->author->name,
            'event_date' => $this->event_date,
            'venue' => $this->event_venue,
            'created_at' => $this->created_at->diffForHumans(), // e.g. "2 hours ago"
        ];
    }
}
