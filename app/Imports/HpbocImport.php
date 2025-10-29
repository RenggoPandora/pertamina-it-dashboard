<?php

namespace App\Imports;

use App\Models\Hpboc;
use App\Models\Site;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HpbocImport implements ToModel, WithStartRow
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

            Log::info('Processing HPBOC row', ['row' => $row]);

            // A=nama_perangkat, B=jumlah, C=status, D=site_id (allocation/lokasi)
            $namaPeangkat = trim($row[0] ?? '');
            $jumlah = (int)($row[1] ?? 0);
            $status = strtolower(trim($row[2] ?? ''));
            $lokasiText = trim($row[3] ?? '');

            // Validasi field wajib
            if (empty($namaPeangkat)) {
                Log::warning('HPBOC row skipped: nama_perangkat is empty', ['row' => $row]);
                $this->failed++;
                return null;
            }

            // Validasi status harus rusak, baik, atau maintenance
            if (!empty($status) && !in_array($status, ['rusak', 'baik', 'maintenance'])) {
                Log::warning('HPBOC row skipped: invalid status', [
                    'row' => $row,
                    'status' => $status,
                    'expected' => 'rusak, baik, or maintenance'
                ]);
                $this->failed++;
                return null;
            }

            // Cari site_id berdasarkan lokasi text
            $siteId = null;
            if (!empty($lokasiText)) {
                $site = Site::where('lokasi', 'LIKE', '%' . $lokasiText . '%')
                           ->orWhere('lokasi', $lokasiText)
                           ->first();
                
                if ($site) {
                    $siteId = $site->id;
                    Log::info('Site found', ['lokasi' => $lokasiText, 'site_id' => $siteId]);
                } else {
                    Log::warning('HPBOC row skipped: site not found', [
                        'row' => $row,
                        'lokasi' => $lokasiText
                    ]);
                    $this->failed++;
                    return null;
                }
            } else {
                Log::warning('HPBOC row skipped: allocation/site is empty', ['row' => $row]);
                $this->failed++;
                return null;
            }

            // Prepare data untuk insert
            $hpbocData = [
                'nama_perangkat' => $namaPeangkat,
                'jumlah' => $jumlah,
                'status' => $status ?: 'baik',
                'site_id' => $siteId,
                'tanggal_pencatatan' => $this->tanggalPencatatan,
            ];

            // Tambahkan created_by dan updated_by jika user sedang login
            if (Auth::check()) {
                $hpbocData['created_by'] = Auth::id();
                $hpbocData['updated_by'] = Auth::id();
            }

            $hpboc = Hpboc::create($hpbocData);

            Log::info('HPBOC created successfully', [
                'id' => $hpboc->id,
                'nama_perangkat' => $namaPeangkat
            ]);

            $this->imported++;
            return $hpboc;

        } catch (\Exception $e) {
            Log::error('Failed to import HPBOC row', [
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
