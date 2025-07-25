<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'ticket'; // sesuai dengan nama tabel di migration

    protected $fillable = [
        'support_company',
        'req_number',
        'status',
    ];
}
