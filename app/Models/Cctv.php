<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
        'up',
        'down',
        'availability',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'tanggal_pencatatan' => 'date',
        'up' => 'string',
        'down' => 'string',
        'availability' => 'string',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (Auth::check()) {
                $model->created_by = Auth::id();
                $model->updated_by = Auth::id();
            }
        });

        static::updating(function ($model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
