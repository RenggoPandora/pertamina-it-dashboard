<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PcDevice extends Model
{
    use HasFactory;

    protected $table = 'pcdevice';

    protected $fillable = [
        'jenis',
        'nama_perangkat',
        'jumlah',
        'tanggal_pencatatan',
        'alokasi',
    ];

    protected $casts = [
        'tanggal_pencatatan' => 'date',
        'jumlah' => 'integer',
    ];
}
