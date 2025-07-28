<?php

namespace App\Imports;

use App\Models\Telephone;
use App\Models\Site;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TelephoneImport implements ToModel, WithHeadingRow, WithValidation
{
    public function model(array $row)
    {
        // Find site by name/location
        $site = Site::where('lokasi', $row['lokasi_site'])->first();
        
        if (!$site) {
            throw new \Exception("Site dengan lokasi '{$row['lokasi_site']}' tidak ditemukan.");
        }

        return new Telephone([
            'nama_pic' => $row['nama_pic'],
            'jumlah' => $row['jumlah'],
            'tanggal_pencatatan' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['tanggal_pencatatan'])->format('Y-m-d'),
            'status' => $row['status'],
            'site_id' => $site->id,
        ]);
    }

    public function rules(): array
    {
        return [
            'nama_pic' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required',
            'status' => 'required|in:on,off',
            'lokasi_site' => 'required|string',
        ];
    }
}
