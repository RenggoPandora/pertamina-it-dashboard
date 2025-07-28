<?php

namespace App\Exports;

use App\Models\Telephone;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TelephoneExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Telephone::with('site')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama PIC',
            'Jumlah',
            'Tanggal Pencatatan',
            'Status',
            'Lokasi Site',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }

    public function map($telephone): array
    {
        return [
            $telephone->id,
            $telephone->nama_pic,
            $telephone->jumlah,
            $telephone->tanggal_pencatatan,
            $telephone->status,
            $telephone->site->lokasi ?? 'N/A',
            $telephone->created_at,
            $telephone->updated_at,
        ];
    }
}
