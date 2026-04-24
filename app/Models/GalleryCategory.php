<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    public function albums()
    {
        return $this->hasMany(Album::class, 'category_id');
    }
}
