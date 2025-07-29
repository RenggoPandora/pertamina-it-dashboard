<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Site extends Model
{
     use HasFactory;

    protected $fillable = ['lokasi'];

    public function hpboc()
    {
        return $this->hasMany(Hpboc::class);
    }

    public function radios()
    {
        return $this->hasMany(Radio::class);
    }

    public function telephones()
    {
        return $this->hasMany(Telephone::class);
    }
}
