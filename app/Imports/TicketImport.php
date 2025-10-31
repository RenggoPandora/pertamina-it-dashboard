<?php

namespace App\Imports;

use App\Models\Ticket;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TicketImport implements ToCollection, WithStartRow
{
    protected $filePath;
    protected $imported = 0;
    protected $created = 0;
    protected $updated = 0;
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

                Log::info("Processing ticket row {$rowNumber}", ['row' => $row->toArray()]);

                // A=customer_fullname, B=assignee_name, C=summary, D=tanggal_pencatatan, E=status
                $customerFullname = trim($row[0] ?? '');
                $assigneeName = trim($row[1] ?? '');
                $summary = trim($row[2] ?? '');
                $tanggalPencatatan = $row[3] ?? null;
                $status = strtolower(trim($row[4] ?? 'pending'));

                // Validasi field wajib - customer_fullname dan summary harus ada
                if (empty($customerFullname) || empty($summary)) {
                    Log::warning("Row {$rowNumber}: customer_fullname or summary is empty");
                    $this->failed++;
                    continue;
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
                            try {
                                $parsedDate = Carbon::createFromFormat('d M Y h:i:s A', $tanggalPencatatan);
                            } catch (\Exception $e) {
                                // Fallback ke Carbon::parse untuk format lain
                                $parsedDate = Carbon::parse($tanggalPencatatan);
                            }
                        }
                        
                        Log::info("Row {$rowNumber}: Parsed date successfully", [
                            'original' => $tanggalPencatatan,
                            'parsed' => $parsedDate->format('Y-m-d H:i:s')
                        ]);
                    } catch (\Exception $e) {
                        Log::warning("Row {$rowNumber}: Failed to parse date, using current time", [
                            'original' => $tanggalPencatatan,
                            'error' => $e->getMessage()
                        ]);
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

                // Format tanggal untuk comparison (hanya tanggal, tanpa waktu)
                $dateOnly = $parsedDate->format('Y-m-d');

                // Cek apakah data sudah ada berdasarkan customer_fullname + summary + tanggal_pencatatan (date only)
                $existingTicket = Ticket::where('customer_fullname', $customerFullname)
                    ->where('summary', $summary)
                    ->whereDate('tanggal_pencatatan', $dateOnly)
                    ->first();

                // Prepare data untuk save
                $dataToSave = [
                    'assignee_name' => $assigneeName ?: null,
                    'status' => $status,
                    'tanggal_pencatatan' => $parsedDate,
                    'updated_by' => Auth::id(),
                ];

                // Jika data baru (create), tambahkan created_by
                if (!$existingTicket) {
                    $dataToSave['created_by'] = Auth::id();
                }

                // ✅ updateOrCreate berdasarkan customer_fullname, summary, dan tanggal (date only)
                $ticket = Ticket::updateOrCreate(
                    [
                        'customer_fullname' => $customerFullname,
                        'summary' => $summary,
                        // Gunakan whereDate untuk comparison, tapi simpan full datetime
                    ],
                    array_merge($dataToSave, [
                        'customer_fullname' => $customerFullname,
                        'summary' => $summary,
                    ])
                );

                // Untuk lebih akurat, cek berdasarkan tanggal juga
                // Jika ticket dengan customer + summary + date yang sama sudah ada, update
                $duplicateCheck = Ticket::where('customer_fullname', $customerFullname)
                    ->where('summary', $summary)
                    ->whereDate('tanggal_pencatatan', $dateOnly)
                    ->where('id', '!=', $ticket->id)
                    ->first();

                if ($duplicateCheck) {
                    // Ada duplikat dengan tanggal yang sama, update yang existing
                    $duplicateCheck->update($dataToSave);
                    $ticket->delete(); // Hapus yang baru dibuat
                    $ticket = $duplicateCheck;
                    $wasRecentlyCreated = false;
                } else {
                    $wasRecentlyCreated = $ticket->wasRecentlyCreated;
                }

                // Track apakah ini create atau update
                if ($wasRecentlyCreated) {
                    $this->created++;
                    Log::info("✅ Created Ticket: {$customerFullname} - {$summary} - {$dateOnly}");
                } else {
                    $this->updated++;
                    Log::info("🔄 Updated Ticket: {$customerFullname} - {$summary} - {$dateOnly}");
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
