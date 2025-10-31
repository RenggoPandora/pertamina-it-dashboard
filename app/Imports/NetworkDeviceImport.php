<?php

namespace App\Imports;

use App\Models\NetworkDevice;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;

class NetworkDeviceImport implements ToCollection, WithStartRow
{
    private $tanggalPencatatan;
    private $jenis;
    private $kepemilikan = 'sewa'; // Default kepemilikan
    private $errors = [];
    private $successCount = 0;
    private $failureCount = 0;
    private $updatedCount = 0;
    private $createdCount = 0;

    /**
     * Validasi header dan ambil tanggal pencatatan + jenis
     */
    public function __construct($filePath)
    {
        try {
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($filePath);
            $sheet = $spreadsheet->getActiveSheet();

            // Baca Cell A3 untuk menentukan jenis
            $cellA3 = $sheet->getCell('A3')->getValue();
            Log::info("Cell A3 content: " . $cellA3);

            // Deteksi jenis berdasarkan kata kunci di A3
            if (stripos($cellA3, 'Switch') !== false) {
                $this->jenis = 'switch';
            } elseif (stripos($cellA3, 'Network') !== false || stripos($cellA3, 'CCTV Network') !== false) {
                $this->jenis = 'network';
            } elseif (stripos($cellA3, 'Access Point') !== false) {
                $this->jenis = 'access point';
            } else {
                throw new \Exception("Invalid category in cell A3. Must contain 'Switch', 'Network', or 'Access Point'");
            }

            Log::info("Detected jenis: " . $this->jenis);

            // Baca Cell A6 untuk tanggal pencatatan
            $cellA6 = $sheet->getCell('A6')->getValue();
            Log::info("Cell A6 content: " . $cellA6);

            // Extract tanggal dari format "End Time: 25 Jul 2025 12:00:00 AM ICT    Showing: All"
            if (preg_match('/End Time:\s*(.+?)\s+\d{1,2}:\d{2}:\d{2}/', $cellA6, $matches)) {
                $dateString = trim($matches[1]); // "25 Jul 2025"
                Log::info("Extracted date string: " . $dateString);
                
                try {
                    $this->tanggalPencatatan = Carbon::createFromFormat('d M Y', $dateString)->format('Y-m-d');
                    Log::info("Parsed tanggal_pencatatan: " . $this->tanggalPencatatan);
                } catch (\Exception $e) {
                    Log::error("Failed to parse date: " . $e->getMessage());
                    $this->tanggalPencatatan = now()->format('Y-m-d');
                }
            } else {
                Log::warning("Could not extract date from A6, using today's date");
                $this->tanggalPencatatan = now()->format('Y-m-d');
            }

        } catch (\Exception $e) {
            Log::error("Error in NetworkDeviceImport constructor: " . $e->getMessage());
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
     * Transform data Excel ke Network Device dengan updateOrCreate
     * Jika nama_perangkat + ip_address + jenis sudah ada, akan di-update
     * Jika belum ada, akan di-create
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
                Log::info("Processing row {$rowNumber}: " . json_encode($row->toArray()));

                // Skip baris kosong
                if (empty($row[0]) && empty($row[1])) {
                    Log::info("Skipping empty row {$rowNumber}");
                    continue;
                }

                // Skip baris yang mengandung NOTE atau ****
                if (stripos($row[0] ?? '', 'NOTE') !== false || stripos($row[0] ?? '', '****') !== false) {
                    Log::info("Skipping NOTE row {$rowNumber}");
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
                    Log::warning("Row {$rowNumber}: Name is required");
                    continue;
                }

                if (empty($ipAddress)) {
                    $this->errors[] = "Row {$rowNumber}: IP Address is required for {$name} (Column B)";
                    $this->failureCount++;
                    Log::warning("Row {$rowNumber}: IP Address is required for {$name}");
                    continue;
                }

                // Validasi format IP Address
                if (!filter_var($ipAddress, FILTER_VALIDATE_IP)) {
                    $this->errors[] = "Row {$rowNumber}: Invalid IP Address format for {$name}: {$ipAddress}";
                    $this->failureCount++;
                    Log::warning("Row {$rowNumber}: Invalid IP Address format: {$ipAddress}");
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

                // Cek apakah data sudah ada
                $existingDevice = NetworkDevice::where([
                    'nama_perangkat' => $name,
                    'ip_address' => $ipAddress,
                    'jenis' => $this->jenis,
                ])->first();

                // Data yang akan di-save
                $dataToSave = [
                    'up' => $up,
                    'down' => $down,
                    'availability' => strval($availability), // Store as string to match existing format
                    'status' => $status,
                    'tanggal_pencatatan' => $this->tanggalPencatatan,
                    'kepemilikan' => $this->kepemilikan,
                    'updated_by' => Auth::id(),
                ];

                // Jika data baru (create), tambahkan created_by
                if (!$existingDevice) {
                    $dataToSave['created_by'] = Auth::id();
                }

                // ✅ updateOrCreate berdasarkan nama_perangkat, ip_address, dan jenis
                $networkDevice = NetworkDevice::updateOrCreate(
                    [
                        'nama_perangkat' => $name,
                        'ip_address' => $ipAddress,
                        'jenis' => $this->jenis,
                    ],
                    $dataToSave
                );

                // Track apakah ini create atau update
                if ($networkDevice->wasRecentlyCreated) {
                    $this->createdCount++;
                    Log::info("✅ Created Network Device: {$name} - {$ipAddress} - {$this->jenis} - Availability: {$availability}%");
                } else {
                    $this->updatedCount++;
                    Log::info("🔄 Updated Network Device: {$name} - {$ipAddress} - {$this->jenis} - Availability: {$availability}%");
                }

                $this->successCount++;

            } catch (\Exception $e) {
                $rowNumber = $index + 10;
                $this->errors[] = "Row {$rowNumber}: " . $e->getMessage();
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
            'jenis' => $this->jenis,
        ];
    }
}
