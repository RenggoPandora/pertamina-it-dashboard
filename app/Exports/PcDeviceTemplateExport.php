<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class PcDeviceTemplateExport implements WithEvents
{
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                
                // A3: Category
                $sheet->setCellValue('A3', 'Category: PC Device    Business View: All Data');
                $sheet->getStyle('A3')->getFont()->setBold(true)->setSize(12);
                
                // A6: End Time
                $now = now()->format('d M Y H:i:s');
                $sheet->setCellValue('A6', 'End Time: ' . $now . ' ICT    Showing: All');
                $sheet->getStyle('A6')->getFont()->setSize(10);
                
                // Row 9: Headers
                $headers = [
                    'A9' => 'Name',
                    'B9' => 'Type',
                    'C9' => 'Amount',
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
                    ['Dell Optiplex 7090', 'Desktop', 15, 'MPS'],
                    ['HP Pavilion 15', 'Notebook', 25, 'SM5'],
                    ['Canon Printer G2000', 'Printer', 10, 'MPS'],
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
                $sheet->getColumnDimension('B')->setWidth(20);
                $sheet->getColumnDimension('C')->setWidth(15);
                $sheet->getColumnDimension('D')->setWidth(25);
                
                // Center align for Amount column
                $sheet->getStyle('C10:C' . $lastRow)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            },
        ];
    }
}
