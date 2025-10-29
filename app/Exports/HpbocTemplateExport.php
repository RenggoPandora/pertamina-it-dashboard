<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class HpbocTemplateExport implements WithEvents
{
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                
                // A3: Category
                $sheet->setCellValue('A3', 'Category: HPBOC    Business View: All Data');
                $sheet->getStyle('A3')->getFont()->setBold(true)->setSize(12);
                
                // A6: End Time
                $now = now()->format('d M Y H:i:s');
                $sheet->setCellValue('A6', 'End Time: ' . $now . ' ICT    Showing: All');
                $sheet->getStyle('A6')->getFont()->setSize(10);
                
                // Row 9: Headers
                $headers = [
                    'A9' => 'Name',
                    'B9' => 'Amount',
                    'C9' => 'Status',
                    'D9' => 'Allocation',
                ];
                
                foreach ($headers as $cell => $value) {
                    $sheet->setCellValue($cell, $value);
                }
                
                // Style header row
                $sheet->getStyle('A9:D9')->applyFromArray([
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
                
                // Sample data (row 10-12)
                $sampleData = [
                    ['HP LaserJet Pro', 10, 'Baik', 'Area 10 – Fuel Oil Complex I'],
                    ['HP Deskjet 2700', 5, 'Maintenance', 'Area 20 – Lube Oil Complex I'],
                    ['Canon Pixma G3000', 8, 'Rusak', 'Area 30 – Area Tangki BBM'],
                ];
                
                $row = 10;
                foreach ($sampleData as $data) {
                    $sheet->fromArray($data, null, 'A' . $row);
                    $row++;
                }
                
                // Style data rows
                $lastRow = $row - 1;
                $sheet->getStyle('A10:D' . $lastRow)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                        ],
                    ],
                ]);
                
                // Set column widths
                $sheet->getColumnDimension('A')->setWidth(30);
                $sheet->getColumnDimension('B')->setWidth(15);
                $sheet->getColumnDimension('C')->setWidth(15);
                $sheet->getColumnDimension('D')->setWidth(40);
                
                // Center align for Amount column
                $sheet->getStyle('B10:B' . $lastRow)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                
                // Add note about available sites
                $noteRow = $lastRow + 2;
                $sheet->setCellValue('A' . $noteRow, 'NOTE: Available Allocations (Site):');
                $sheet->getStyle('A' . $noteRow)->getFont()->setBold(true);
                
                $sites = [
                    'Area 10 – Fuel Oil Complex I',
                    'Area 01 – Fuel Oil Complex II',
                    'Area 20 – Lube Oil Complex I',
                    'Area 02 – Lube Oil Complex II',
                    'Area 30 – Area Tangki BBM',
                    'Area 40 – Area Tangki Non-BBM',
                    'Area 50 – Utilities Complex I',
                    'Area 05 – Utilities Complex II',
                    'Area 60 – Oil Movement & Pipelines Area',
                    'Area 70 – Terminal Minyak Mentah dan Produk',
                    'Area 80 – Kilang Paraxylene (KPC)',
                    'Area 90 – Kilang LPG & Sulfur Recovery Unit',
                    'Area 100 – Residual Fluid Catalytic Cracking (RFCC)',
                    'Area 200 – Lube Oil Complex III',
                    'Area 500 – Utilities Complex IIA',
                ];
                
                $currentRow = $noteRow + 1;
                foreach ($sites as $site) {
                    $sheet->setCellValue('A' . $currentRow, '- ' . $site);
                    $sheet->getStyle('A' . $currentRow)->getFont()->setSize(9)->getColor()->setRGB('666666');
                    $currentRow++;
                }
                
                $statusNoteRow = $currentRow + 1;
                $sheet->setCellValue('A' . $statusNoteRow, 'NOTE: Available Status: Baik, Rusak, Maintenance');
                $sheet->getStyle('A' . $statusNoteRow)->getFont()->setBold(true);
            },
        ];
    }
}
