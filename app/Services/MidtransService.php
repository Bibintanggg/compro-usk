<?php

namespace App\Services;

use Midtrans\Config;;

use Midtrans\Snap;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$clientKey = config('midtrans.client_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createSnapToken(array $params)
    {
        $enabledPayments = [];

        switch ($params['payment_method']) {
            case 'qris':
                $enabledPayments = [
                    'qris',
                    'gopay',
                    'shopeepay',
                ];
                break;

            case 'bank':
                $enabledPayments = [
                    'bca_va',
                    'bni_va',
                    'bri_va',
                ];
                break;

            case 'gopay':
                $enabledPayments = ['gopay'];
                break;

            default:
                $enabledPayments = [
                    'credit_card',
                    'qris',
                    'gopay',
                    'shopeepay',
                    'bca_va',
                    'bni_va',
                    'bri_va',
                    'permata_va',
                    'echannel',
                    'cstore'
                ];
        }

        $payload = [
            'transaction_details' => [
                'order_id' => $params['order_id'],
                'gross_amount' => (int) $params['amount'],
            ],
            'customer_details' => [
                'first_name' => $params['customer_name'] ?? 'Customer',
                'email' => $params['customer_email'] ?? 'customer@mail.com',
            ],
            'enabled_payments' => $enabledPayments,
            'callbacks' => [
                'finish' => route('home'),
            ],
        ];

        return Snap::getSnapToken($payload);
    }
}
