<?php

namespace App\Imports;

use App\Models\PcDevice;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PcDeviceImport implements ToModel, WithStartRow
{
    protected $filePath;
    protected $imported = 0;
    protected $failed = 0;
    protected $tanggalPencatatan;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
        $this->validateFormat();
    }

    protected function validateFormat()
    {
        try {
            $spreadsheet = IOFactory::load($this->filePath);
            $sheet = $spreadsheet->getActiveSheet();
            
            // Validasi A3 harus mengandung "PC Device"
            $a3Value = $sheet->getCell('A3')->getValue();
            if (stripos($a3Value, 'PC Device') === false) {
                throw new \Exception('Format file tidak valid. Cell A3 harus mengandung "PC Device"');
            }
            
            // Ambil tanggal dari A6
            $a6Value = $sheet->getCell('A6')->getValue();
            if (preg_match('/End Time:\s*(.+?)\s+\d{1,2}:\d{2}:\d{2}/', $a6Value, $matches)) {
                $dateString = trim($matches[1]);
                try {
                    $this->tanggalPencatatan = Carbon::createFromFormat('d M Y', $dateString);
                    Log::info('Parsed tanggal_pencatatan from A6', [
                        'original' => $a6Value,
                        'extracted' => $dateString,
                        'parsed' => $this->tanggalPencatatan->format('Y-m-d')
                    ]);
                } catch (\Exception $e) {
                    Log::warning('Failed to parse date from A6, using current date', [
                        'a6Value' => $a6Value,
                        'error' => $e->getMessage()
                    ]);
                    $this->tanggalPencatatan = Carbon::now();
                }
            } else {
                $this->tanggalPencatatan = Carbon::now();
            }
            
        } catch (\Exception $e) {
            throw new \Exception('Error validating Excel format: ' . $e->getMessage());
        }
    }

    public function startRow(): int
    {
        return 10; // Data dimulai dari baris 10
    }

    public function model(array $row)
    {
        try {
            // Skip jika baris kosong
            if (empty($row[0]) && empty($row[1]) && empty($row[2])) {
                return null;
            }

            // Skip jika baris NOTE atau footer
            if (stripos($row[0], 'NOTE') !== false || stripos($row[0], '****') !== false) {
                return null;
            }

            Log::info('Processing PC Device row', ['row' => $row]);

            // A=nama_perangkat, B=jenis, C=jumlah, D=alokasi
            $namaPeangkat = trim($row[0] ?? '');
            $jenis = trim($row[1] ?? '');
            $jumlah = (int)($row[2] ?? 0);
            $alokasi = strtoupper(trim($row[3] ?? ''));

            // Validasi field wajib
            if (empty($namaPeangkat)) {
                Log::warning('PC Device row skipped: nama_perangkat is empty', ['row' => $row]);
                $this->failed++;
                return null;
            }

            // Validasi alokasi harus MPS atau SM5
            if (!empty($alokasi) && !in_array($alokasi, ['MPS', 'SM5'])) {
                Log::warning('PC Device row skipped: invalid alokasi', [
                    'row' => $row,
                    'alokasi' => $alokasi,
                    'expected' => 'MPS or SM5'
                ]);
                $this->failed++;
                return null;
            }

            // Validasi jenis harus desktop, notebook, atau printer
            $jenisLower = strtolower($jenis);
            if (!empty($jenis) && !in_array($jenisLower, ['desktop', 'notebook', 'printer'])) {
                Log::warning('PC Device row skipped: invalid jenis', [
                    'row' => $row,
                    'jenis' => $jenis,
                    'expected' => 'desktop, notebook, or printer'
                ]);
                $this->failed++;
                return null;
            }

            // Prepare data untuk insert
            $pcDeviceData = [
                'nama_perangkat' => $namaPeangkat,
                'jenis' => $jenisLower ?: null,
                'jumlah' => $jumlah,
                'alokasi' => $alokasi ?: null,
                'tanggal_pencatatan' => $this->tanggalPencatatan,
            ];

            // Tambahkan created_by dan updated_by jika user sedang login
            if (Auth::check()) {
                $pcDeviceData['created_by'] = Auth::id();
                $pcDeviceData['updated_by'] = Auth::id();
            }

            $pcDevice = PcDevice::create($pcDeviceData);

            Log::info('PC Device created successfully', [
                'id' => $pcDevice->id,
                'nama_perangkat' => $namaPeangkat
            ]);

            $this->imported++;
            return $pcDevice;

        } catch (\Exception $e) {
            Log::error('Failed to import PC Device row', [
                'error' => $e->getMessage(),
                'row' => $row ?? []
            ]);
            $this->failed++;
            return null;
        }
    }

    public function getStats()
    {
        return [
            'imported' => $this->imported,
            'failed' => $this->failed,
        ];
    }
}
