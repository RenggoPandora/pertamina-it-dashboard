<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class TicketTemplateExport implements WithEvents
{
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                
                // A3: Category
                $sheet->setCellValue('A3', 'Category: Tickets    Business View: All Data');
                $sheet->getStyle('A3')->getFont()->setBold(true)->setSize(12);
                
                // Row 9: Headers
                $headers = [
                    'A9' => 'Name',
                    'B9' => 'Assignee',
                    'C9' => 'Summary',
                    'D9' => 'Date',
                    'E9' => 'Status',
                ];
                
                foreach ($headers as $cell => $value) {
                    $sheet->setCellValue($cell, $value);
                }
                
                // Style header row
                $sheet->getStyle('A9:E9')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 11,
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'E2EFDA']
                    ],
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                        ],
                    ],
                ]);
                
                // Sample data (row 10)
                $sampleData = [
                    ['John Doe', 'Jane Smith', 'Network connectivity issue', now()->format('Y-m-d'), 'assigned'],
                    ['Alice Brown', 'Bob Wilson', 'Software installation request', now()->subDays(1)->format('Y-m-d'), 'pending'],
                    ['Charlie Davis', 'Jane Smith', 'Hardware malfunction', now()->subDays(2)->format('Y-m-d'), 'resolved'],
                ];
                
                $row = 10;
                foreach ($sampleData as $data) {
                    $sheet->fromArray($data, null, 'A' . $row);
                    $row++;
                }
                
                // Style data rows
                $lastRow = $row - 1;
                $sheet->getStyle('A10:E' . $lastRow)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                        ],
                    ],
                ]);
                
                // Set column widths
                $sheet->getColumnDimension('A')->setWidth(25);
                $sheet->getColumnDimension('B')->setWidth(25);
                $sheet->getColumnDimension('C')->setWidth(40);
                $sheet->getColumnDimension('D')->setWidth(15);
                $sheet->getColumnDimension('E')->setWidth(15);
                
                // Center align for Date and Status columns
                $sheet->getStyle('D10:E' . $lastRow)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            },
        ];
    }
}
