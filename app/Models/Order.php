<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = [
        'product_id',
        'price',
        'order_code',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status); // scope filter status
    }

     public function getLatestPaymentAttribute()
    {
        return $this->payments()->latest()->first(); // ambil latest payment
    }
}
