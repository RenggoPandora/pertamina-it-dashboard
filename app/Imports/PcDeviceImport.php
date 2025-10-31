<?php

namespace App\Imports;

use App\Models\PcDevice;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;

class PcDeviceImport implements ToCollection, WithStartRow
{
    protected $filePath;
    protected $imported = 0;
    protected $failed = 0;
    protected $created = 0;
    protected $updated = 0;
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

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            try {
                $rowNumber = $index + 10; // Karena start dari baris 10
                
                // Skip jika baris kosong
                if (empty($row[0]) && empty($row[1]) && empty($row[2])) {
                    continue;
                }

                // Skip jika baris NOTE atau footer
                if (stripos($row[0] ?? '', 'NOTE') !== false || stripos($row[0] ?? '', '****') !== false) {
                    Log::info("Skipping NOTE row {$rowNumber}");
                    continue;
                }

                Log::info("Processing PC Device row {$rowNumber}", ['row' => $row->toArray()]);

                // A=nama_perangkat, B=jenis, C=jumlah, D=alokasi
                $namaPeangkat = trim($row[0] ?? '');
                $jenis = trim($row[1] ?? '');
                $jumlah = (int)($row[2] ?? 0);
                $alokasi = strtoupper(trim($row[3] ?? ''));

                // Validasi field wajib
                if (empty($namaPeangkat)) {
                    Log::warning("Row {$rowNumber}: nama_perangkat is empty", ['row' => $row->toArray()]);
                    $this->failed++;
                    continue;
                }

                // Validasi alokasi harus MPS atau SM5
                if (!empty($alokasi) && !in_array($alokasi, ['MPS', 'SM5'])) {
                    Log::warning("Row {$rowNumber}: invalid alokasi", [
                        'alokasi' => $alokasi,
                        'expected' => 'MPS or SM5'
                    ]);
                    $this->failed++;
                    continue;
                }

                // Validasi jenis harus desktop, notebook, atau printer
                $jenisLower = strtolower($jenis);
                if (!empty($jenis) && !in_array($jenisLower, ['desktop', 'notebook', 'printer'])) {
                    Log::warning("Row {$rowNumber}: invalid jenis", [
                        'jenis' => $jenis,
                        'expected' => 'desktop, notebook, or printer'
                    ]);
                    $this->failed++;
                    continue;
                }

                // Cek apakah data sudah ada berdasarkan nama_perangkat + jenis + alokasi
                $existingDevice = PcDevice::where([
                    'nama_perangkat' => $namaPeangkat,
                    'jenis' => $jenisLower ?: null,
                    'alokasi' => $alokasi ?: null,
                ])->first();

                // Prepare data untuk save
                $dataToSave = [
                    'jumlah' => $jumlah,
                    'tanggal_pencatatan' => $this->tanggalPencatatan,
                    'updated_by' => Auth::id(),
                ];

                // Jika data baru (create), tambahkan created_by
                if (!$existingDevice) {
                    $dataToSave['created_by'] = Auth::id();
                }

                // ✅ updateOrCreate berdasarkan nama_perangkat, jenis, dan alokasi
                $pcDevice = PcDevice::updateOrCreate(
                    [
                        'nama_perangkat' => $namaPeangkat,
                        'jenis' => $jenisLower ?: null,
                        'alokasi' => $alokasi ?: null,
                    ],
                    $dataToSave
                );

                // Track apakah ini create atau update
                if ($pcDevice->wasRecentlyCreated) {
                    $this->created++;
                    Log::info("✅ Created PC Device: {$namaPeangkat} - {$jenisLower} - {$alokasi}");
                } else {
                    $this->updated++;
                    Log::info("🔄 Updated PC Device: {$namaPeangkat} - {$jenisLower} - {$alokasi}");
                }

                $this->imported++;

            } catch (\Exception $e) {
                $rowNumber = $index + 10;
                Log::error("Row {$rowNumber} processing error: " . $e->getMessage());
                $this->failed++;
            }
        }
    }

    public function getStats()
    {
        return [
            'imported' => $this->imported,
            'created' => $this->created,
            'updated' => $this->updated,
            'failed' => $this->failed,
        ];
    }
}
