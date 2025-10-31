<?php

namespace App\Imports;

use App\Models\Cctv;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CctvImport implements ToCollection, WithStartRow
{
    private $tanggalPencatatan;
    private $kepemilikan = 'sewa'; // Default kepemilikan
    private $errors = [];
    private $successCount = 0;
    private $createdCount = 0;
    private $updatedCount = 0;
    private $failureCount = 0;

    /**
     * Validasi header dan ambil tanggal pencatatan
     */
    public function __construct($filePath)
    {
        try {
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();

            // ✅ Validasi Cell A3 harus mengandung "CCTV"
            $categoryCell = $worksheet->getCell('A3')->getValue();
            if (empty($categoryCell) || stripos($categoryCell, 'CCTV') === false) {
                throw new \Exception("Invalid file format. Cell A3 must contain 'CCTV', found: " . $categoryCell);
            }
            Log::info("✅ Category validation passed: {$categoryCell}");

            // ✅ Ambil tanggal dari Cell A6 yang formatnya "End Time: 25 Jul 2025 12:00:00 AM ICT    Showing: All"
            $endTimeCell = $worksheet->getCell('A6')->getValue();
            if (empty($endTimeCell)) {
                throw new \Exception("Cell A6 (End Time) is empty");
            }

            // Extract tanggal dari format "End Time: 25 Jul 2025 12:00:00 AM ICT    Showing: All"
            if (preg_match('/End Time:\s*(.+?)\s+\d{1,2}:\d{2}:\d{2}/', $endTimeCell, $matches)) {
                $dateString = trim($matches[1]); // "25 Jul 2025"
                $this->tanggalPencatatan = Carbon::parse($dateString)->format('Y-m-d');
                Log::info("✅ Tanggal Pencatatan extracted: {$this->tanggalPencatatan} from: {$endTimeCell}");
            } else {
                // Fallback: coba parse langsung
                try {
                    $this->tanggalPencatatan = Carbon::parse($endTimeCell)->format('Y-m-d');
                    Log::info("✅ Tanggal Pencatatan (fallback): {$this->tanggalPencatatan}");
                } catch (\Exception $e) {
                    throw new \Exception("Cannot parse date from Cell A6: {$endTimeCell}");
                }
            }

            // Ambil kepemilikan dari Cell B3 atau default ke 'asset'
            $kepemilikanCell = $worksheet->getCell('B3')->getValue();
            if (!empty($kepemilikanCell) && in_array(strtolower($kepemilikanCell), ['asset', 'sewa'])) {
                $this->kepemilikan = strtolower($kepemilikanCell);
                Log::info("✅ Kepemilikan: {$this->kepemilikan}");
            } else {
                Log::info("Kepemilikan not specified, using default: {$this->kepemilikan}");
            }

        } catch (\Exception $e) {
            Log::error("Excel validation error: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Data dimulai dari baris 10 (setelah header di baris 9)
     */
    public function startRow(): int
    {
        return 10;
    }

    /**
     * Transform data Excel ke model CCTV
     * 
     * Format Excel:
     * A: Name
     * B: IP Address
     * C: Up
     * G: Down (kolom ke-7, index 6)
     * I: Availability (kolom ke-9, index 8)
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            try {
                $rowNumber = $index + 10; // Karena start dari baris 10
                
                // Log raw data untuk debugging
                Log::info("Processing CCTV row {$rowNumber}: " . json_encode($row->toArray()));

                // Skip baris kosong
                if (empty($row[0]) && empty($row[1])) {
                    Log::info("Skipping empty row {$rowNumber}");
                    continue;
                }

                // ✅ Validasi kolom wajib diisi
                $name = trim($row[0] ?? '');
                $ipAddress = trim($row[1] ?? '');
                $up = trim($row[2] ?? ''); // Kolom C
                $down = trim($row[6] ?? ''); // Kolom G (index 6)
                $availability = trim($row[8] ?? ''); // Kolom I (index 8)

                // Validasi field wajib
                if (empty($name)) {
                    $this->errors[] = "Row {$rowNumber}: Name is required (Column A)";
                    $this->failureCount++;
                    continue;
                }

                if (empty($ipAddress)) {
                    $this->errors[] = "Row {$rowNumber}: IP Address is required for {$name} (Column B)";
                    $this->failureCount++;
                    continue;
                }

                // Validasi format IP Address
                if (!filter_var($ipAddress, FILTER_VALIDATE_IP)) {
                    $this->errors[] = "Row {$rowNumber}: Invalid IP Address format for {$name}: {$ipAddress}";
                    $this->failureCount++;
                    continue;
                }

                // Clean availability (hapus %, convert to number)
                $availability = str_replace(['%', ' '], '', $availability);
                $availability = is_numeric($availability) ? floatval($availability) : 0;

                // Tentukan status berdasarkan availability
                $status = 'online';
                if ($availability == 0) {
                    $status = 'offline';
                }

                // Format up dan down
                $up = !empty($up) ? $up : '0';
                $down = !empty($down) ? $down : '0';

                // Cek apakah data sudah ada berdasarkan nama_perangkat + ip_address + kepemilikan
                $existingCctv = Cctv::where([
                    'nama_perangkat' => $name,
                    'ip_address' => $ipAddress,
                    'kepemilikan' => $this->kepemilikan,
                ])->first();

                // Prepare data untuk save
                $dataToSave = [
                    'up' => $up,
                    'down' => $down,
                    'availability' => strval($availability), // Store as string to match existing format
                    'status' => $status,
                    'tanggal_pencatatan' => $this->tanggalPencatatan,
                    'updated_by' => Auth::id(),
                ];

                // Jika data baru (create), tambahkan created_by
                if (!$existingCctv) {
                    $dataToSave['created_by'] = Auth::id();
                }

                // ✅ updateOrCreate berdasarkan nama_perangkat, ip_address, dan kepemilikan
                $cctv = Cctv::updateOrCreate(
                    [
                        'nama_perangkat' => $name,
                        'ip_address' => $ipAddress,
                        'kepemilikan' => $this->kepemilikan,
                    ],
                    $dataToSave
                );

                // Track apakah ini create atau update
                if ($cctv->wasRecentlyCreated) {
                    $this->createdCount++;
                    Log::info("✅ Created CCTV: {$name} - {$ipAddress} - {$this->kepemilikan} - Availability: {$availability}%");
                } else {
                    $this->updatedCount++;
                    Log::info("🔄 Updated CCTV: {$name} - {$ipAddress} - {$this->kepemilikan} - Availability: {$availability}%");
                }

                $this->successCount++;

            } catch (\Exception $e) {
                $rowNumber = $index + 10;
                $this->errors[] = "Row {$rowNumber}: Error processing row - " . $e->getMessage();
                $this->failureCount++;
                Log::error("Row {$rowNumber} processing error: " . $e->getMessage());
            }
        }
    }

    /**
     * Get import statistics
     */
    public function getStats()
    {
        return [
            'success' => $this->successCount,
            'created' => $this->createdCount,
            'updated' => $this->updatedCount,
            'failed' => $this->failureCount,
            'errors' => $this->errors,
        ];
    }
}
