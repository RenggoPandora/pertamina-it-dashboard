<?php

namespace App\Exports;

use App\Models\Site;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TelephoneTemplateExport implements FromArray, WithHeadings
{
    public function array(): array
    {
        // Get first site as example
        $exampleSite = Site::first();
        
        return [
            [
                'John Doe',
                '2',
                '2025-07-28',
                'on',
                $exampleSite ? $exampleSite->lokasi : 'Contoh Lokasi Site'
            ],
            [
                'Jane Smith',
                '1',
                '2025-07-28',
                'off',
                $exampleSite ? $exampleSite->lokasi : 'Contoh Lokasi Site'
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'nama_pic',
            'jumlah',
            'tanggal_pencatatan',
            'status',
            'lokasi_site',
        ];
    }
}
