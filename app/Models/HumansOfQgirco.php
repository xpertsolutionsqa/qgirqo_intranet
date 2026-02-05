<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HumansOfQgirco extends Model
{
    use HasFactory;

    protected $table = 'humans_of_qgirco';

    protected $fillable = [
        'user_id',
        'quote',
        'story',
        'image_path',
        'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
