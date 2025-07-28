<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cctv extends Model
{
    use HasFactory;

    protected $table = 'cctv';

    protected $fillable = [
        'nama_perangkat',
        'ip_address',
        'tanggal_pencatatan',
        'kepemilikan',
        'status',
    ];

    protected $casts = [
        'tanggal_pencatatan' => 'date',
    ];
}
