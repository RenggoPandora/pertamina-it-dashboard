<?php

namespace App\Imports;

use App\Models\Ticket;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TicketImport implements ToModel, WithStartRow
{
    protected $filePath;
    protected $imported = 0;
    protected $failed = 0;

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
            
            // Validasi A3 harus mengandung "Tickets"
            $a3Value = $sheet->getCell('A3')->getValue();
            if (stripos($a3Value, 'Tickets') === false) {
                throw new \Exception('Format file tidak valid. Cell A3 harus mengandung "Tickets"');
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

            Log::info('Processing ticket row', ['row' => $row]);

            // A=customer_fullname, B=assignee_name, C=summary, D=tanggal_pencatatan, E=status
            $customerFullname = trim($row[0] ?? '');
            $assigneeName = trim($row[1] ?? '');
            $summary = trim($row[2] ?? '');
            $tanggalPencatatan = $row[3] ?? null;
            $status = strtolower(trim($row[4] ?? 'pending'));

            // Validasi field wajib - customer_fullname dan summary harus ada
            if (empty($customerFullname) || empty($summary)) {
                $this->failed++;
                return null;
            }

            // Parse tanggal
            $parsedDate = null;
            if ($tanggalPencatatan) {
                try {
                    // Coba parse berbagai format tanggal
                    if (is_numeric($tanggalPencatatan)) {
                        // Excel date serial number
                        $parsedDate = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($tanggalPencatatan);
                    } else {
                        // String date format: "25 Jul 2025 03:29:42 PM"
                        // Gunakan Carbon::createFromFormat untuk parsing yang lebih spesifik
                        try {
                            $parsedDate = Carbon::createFromFormat('d M Y h:i:s A', $tanggalPencatatan);
                        } catch (\Exception $e) {
                            // Fallback ke Carbon::parse untuk format lain
                            $parsedDate = Carbon::parse($tanggalPencatatan);
                        }
                    }
                    
                    Log::info('Parsed date successfully', [
                        'original' => $tanggalPencatatan,
                        'parsed' => $parsedDate->format('Y-m-d H:i:s')
                    ]);
                } catch (\Exception $e) {
                    Log::warning('Failed to parse date, using current time', [
                        'original' => $tanggalPencatatan,
                        'error' => $e->getMessage()
                    ]);
                    // Jika gagal parse, gunakan tanggal hari ini
                    $parsedDate = Carbon::now();
                }
            } else {
                $parsedDate = Carbon::now();
            }

            // Validasi status
            $validStatuses = ['assigned', 'pending', 'resolved', 'completed', 'closed'];
            if (!in_array($status, $validStatuses)) {
                $status = 'pending'; // Default ke pending jika status tidak valid
            }

            // Prepare data untuk insert
            $ticketData = [
                'customer_fullname' => $customerFullname,
                'assignee_name' => $assigneeName ?: null,
                'summary' => $summary, // Summary wajib ada
                'tanggal_pencatatan' => $parsedDate,
                'status' => $status,
            ];

            // Tambahkan created_by dan updated_by jika user sedang login
            if (Auth::check()) {
                $ticketData['created_by'] = Auth::id();
                $ticketData['updated_by'] = Auth::id();
            }

            $ticket = Ticket::create($ticketData);

            Log::info('Ticket created successfully', ['id' => $ticket->id, 'customer' => $customerFullname]);

            $this->imported++;
            return $ticket;

        } catch (\Exception $e) {
            Log::error('Failed to import ticket row', [
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
