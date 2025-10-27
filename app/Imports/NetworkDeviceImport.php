<?php

namespace App\Imports;

use App\Models\NetworkDevice;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class NetworkDeviceImport implements ToModel, WithStartRow
{
    private $tanggalPencatatan;
    private $jenis;
    private $kepemilikan = 'sewa'; // Default kepemilikan
    private $errors = [];
    private $successCount = 0;
    private $failureCount = 0;

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
     * Transform data Excel ke model Network Device
     * 
     * Format Excel:
     * A: Name
     * B: IP Address
     * C: Up
     * G: Down (kolom ke-7, index 6)
     * I: Availability (kolom ke-9, index 8)
     */
    public function model(array $row)
    {
        try {
            // Log raw data untuk debugging
            Log::info("Processing row: " . json_encode($row));

            // Skip baris kosong
            if (empty($row[0]) && empty($row[1])) {
                Log::info("Skipping empty row");
                return null;
            }

            // ✅ Validasi kolom wajib diisi
            $name = trim($row[0] ?? '');
            $ipAddress = trim($row[1] ?? '');
            $up = trim($row[2] ?? ''); // Kolom C
            $down = trim($row[6] ?? ''); // Kolom G (index 6)
            $availability = trim($row[8] ?? ''); // Kolom I (index 8)

            // Validasi field wajib
            if (empty($name)) {
                $this->errors[] = "Name is required (Column A)";
                $this->failureCount++;
                return null;
            }

            if (empty($ipAddress)) {
                $this->errors[] = "IP Address is required for {$name} (Column B)";
                $this->failureCount++;
                return null;
            }

            // Validasi format IP Address
            if (!filter_var($ipAddress, FILTER_VALIDATE_IP)) {
                $this->errors[] = "Invalid IP Address format for {$name}: {$ipAddress}";
                $this->failureCount++;
                return null;
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

            Log::info("✅ Valid Network Device data: {$name} - {$ipAddress} - Jenis: {$this->jenis} - Availability: {$availability}%");

            $this->successCount++;

            return new NetworkDevice([
                'nama_perangkat' => $name,
                'ip_address' => $ipAddress,
                'up' => $up,
                'down' => $down,
                'availability' => strval($availability), // Store as string to match existing format
                'status' => $status,
                'jenis' => $this->jenis,
                'tanggal_pencatatan' => $this->tanggalPencatatan,
                'kepemilikan' => $this->kepemilikan,
            ]);

        } catch (\Exception $e) {
            $this->errors[] = "Error processing row: " . $e->getMessage();
            $this->failureCount++;
            Log::error("Row processing error: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Get import statistics
     */
    public function getStats()
    {
        return [
            'success' => $this->successCount,
            'failed' => $this->failureCount,
            'errors' => $this->errors,
            'jenis' => $this->jenis,
        ];
    }
}
