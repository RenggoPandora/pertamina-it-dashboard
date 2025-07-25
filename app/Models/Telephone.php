<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telephone extends Model
{
    use HasFactory;

    protected $table = 'telephone';

    protected $fillable = [
        'nama_pic',
        'jumlah',
        'tanggal_pencatatan',
        'status',
        'site_id',
    ];

    // Relasi ke Site
    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
