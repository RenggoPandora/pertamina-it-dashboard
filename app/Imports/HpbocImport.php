<?php

namespace App\Imports;

use App\Models\Hpboc;
use App\Models\Site;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HpbocImport implements ToCollection, WithStartRow
{
    protected $filePath;
    protected $imported = 0;
    protected $created = 0;
    protected $updated = 0;
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
            
            // Validasi A3 harus mengandung "HPBOC"
            $a3Value = $sheet->getCell('A3')->getValue();
            if (stripos($a3Value, 'HPBOC') === false) {
                throw new \Exception('Format file tidak valid. Cell A3 harus mengandung "HPBOC"');
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

                Log::info("Processing HPBOC row {$rowNumber}", ['row' => $row->toArray()]);

                // A=nama_perangkat, B=jumlah, C=status, D=site_id (allocation/lokasi)
                $namaPeangkat = trim($row[0] ?? '');
                $jumlah = (int)($row[1] ?? 0);
                $status = strtolower(trim($row[2] ?? ''));
                $lokasiText = trim($row[3] ?? '');

                // Validasi field wajib
                if (empty($namaPeangkat)) {
                    Log::warning("Row {$rowNumber}: nama_perangkat is empty", ['row' => $row->toArray()]);
                    $this->failed++;
                    continue;
                }

                // Validasi status harus rusak, baik, atau maintenance
                if (!empty($status) && !in_array($status, ['rusak', 'baik', 'maintenance'])) {
                    Log::warning("Row {$rowNumber}: invalid status", [
                        'status' => $status,
                        'expected' => 'rusak, baik, or maintenance'
                    ]);
                    $this->failed++;
                    continue;
                }

                // Cari site_id berdasarkan lokasi text
                $siteId = null;
                if (!empty($lokasiText)) {
                    $site = Site::where('lokasi', 'LIKE', '%' . $lokasiText . '%')
                               ->orWhere('lokasi', $lokasiText)
                               ->first();
                    
                    if ($site) {
                        $siteId = $site->id;
                        Log::info("Site found for row {$rowNumber}", ['lokasi' => $lokasiText, 'site_id' => $siteId]);
                    } else {
                        Log::warning("Row {$rowNumber}: site not found", ['lokasi' => $lokasiText]);
                        $this->failed++;
                        continue;
                    }
                } else {
                    Log::warning("Row {$rowNumber}: allocation/site is empty");
                    $this->failed++;
                    continue;
                }

                // Set default status jika kosong
                $status = $status ?: 'baik';

                // Cek apakah data sudah ada berdasarkan nama_perangkat + site_id + status
                $existingHpboc = Hpboc::where([
                    'nama_perangkat' => $namaPeangkat,
                    'site_id' => $siteId,
                    'status' => $status,
                ])->first();

                // Prepare data untuk save
                $dataToSave = [
                    'jumlah' => $jumlah,
                    'tanggal_pencatatan' => $this->tanggalPencatatan,
                    'updated_by' => Auth::id(),
                ];

                // Jika data baru (create), tambahkan created_by
                if (!$existingHpboc) {
                    $dataToSave['created_by'] = Auth::id();
                }

                // ✅ updateOrCreate berdasarkan nama_perangkat, site_id, dan status
                $hpboc = Hpboc::updateOrCreate(
                    [
                        'nama_perangkat' => $namaPeangkat,
                        'site_id' => $siteId,
                        'status' => $status,
                    ],
                    $dataToSave
                );

                // Track apakah ini create atau update
                if ($hpboc->wasRecentlyCreated) {
                    $this->created++;
                    Log::info("✅ Created HPBOC: {$namaPeangkat} - Site ID {$siteId} - {$status}");
                } else {
                    $this->updated++;
                    Log::info("🔄 Updated HPBOC: {$namaPeangkat} - Site ID {$siteId} - {$status}");
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
