<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NetworkDevice extends Model
{
    use HasFactory;

    protected $table = 'networkdevice';

    protected $fillable = [
        'nama_perangkat',
        'ip_address',
        'tanggal_pencatatan',
        'jenis',
        'up',
        'down',
        'availability',
    ];

    protected $casts = [
        'tanggal_pencatatan' => 'date',
    ];
}