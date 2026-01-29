<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    protected $table = 'event';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'content',
        'image',
        'start_date',
        'end_date',
        'location',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
