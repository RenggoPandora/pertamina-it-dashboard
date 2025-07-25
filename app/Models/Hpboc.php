<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hpboc extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_perangkat',
        'jumlah',
        'tanggal_pencatatan',
        'status',
        'site_id',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
