<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';

    protected $fillable = [
        'order_id',
        'gateway',
        'method',
        'amount',
        'status',
        'transaction_id',
        'customer_name',
        'customer_email',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
