<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class CctvTemplateExport implements FromCollection, WithEvents, WithTitle
{
    /**
     * Return empty collection untuk template
     */
    public function collection()
    {
        // Return 3 contoh data
        return collect([
            [
                'name' => 'Camera Server Room',
                'ip_address' => '192.168.1.101',
                'up' => '23:50:00',
                'down' => '00:10:00',
                'availability' => '99.31',
            ],
            [
                'name' => 'Camera Main Entrance',
                'ip_address' => '192.168.1.102',
                'up' => '24:00:00',
                'down' => '00:00:00',
                'availability' => '100',
            ],
            [
                'name' => 'Camera Parking Area',
                'ip_address' => '192.168.1.103',
                'up' => '20:00:00',
                'down' => '04:00:00',
                'availability' => '83.33',
            ],
        ]);
    }

    /**
     * Sheet title
     */
    public function title(): string
    {
        return 'CCTV Data';
    }

    /**
     * Register events untuk custom formatting
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                // Cell A3: Category dengan format yang benar
                $sheet->setCellValue('A3', 'Category: CCTV Camera    Business View: All Devices');
                $sheet->getStyle('A3')->applyFromArray([
                    'font' => ['bold' => true, 'size' => 12],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'E7E6E6']
                    ]
                ]);

                // Cell A6: End Time dengan format yang benar
                $currentDate = date('d M Y');
                $sheet->setCellValue('A6', "End Time: {$currentDate} 12:00:00 AM ICT    Showing: All");
                $sheet->getStyle('A6')->applyFromArray([
                    'font' => ['size' => 10],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'F2F2F2']
                    ]
                ]);

                // Headers di baris 9 (bukan 8)
                $sheet->setCellValue('A9', 'Name');
                $sheet->setCellValue('B9', 'IP Address');
                $sheet->setCellValue('C9', 'Up');
                $sheet->setCellValue('D9', '');
                $sheet->setCellValue('E9', '');
                $sheet->setCellValue('F9', '');
                $sheet->setCellValue('G9', 'Down');
                $sheet->setCellValue('H9', '');
                $sheet->setCellValue('I9', 'Availability(%)');

                // Style header
                $sheet->getStyle('A9:I9')->applyFromArray([
                    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => '4472C4']
                    ],
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '000000']
                        ]
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER
                    ]
                ]);

                // Data dimulai dari baris 10 (bukan 9)
                $data = [
                    ['Camera Server Room', '192.168.1.101', '23:50:00', '', '', '', '00:10:00', '', '99.31'],
                    ['Camera Main Entrance', '192.168.1.102', '24:00:00', '', '', '', '00:00:00', '', '100'],
                    ['Camera Parking Area', '192.168.1.103', '20:00:00', '', '', '', '04:00:00', '', '83.33'],
                ];

                $row = 10;
                foreach ($data as $rowData) {
                    $col = 'A';
                    foreach ($rowData as $cellValue) {
                        $sheet->setCellValue($col . $row, $cellValue);
                        $col++;
                    }
                    $row++;
                }

                // Style data rows
                $sheet->getStyle('A10:I12')->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => 'CCCCCC']
                        ]
                    ]
                ]);

                // Set column widths
                $sheet->getColumnDimension('A')->setWidth(25);
                $sheet->getColumnDimension('B')->setWidth(15);
                $sheet->getColumnDimension('C')->setWidth(12);
                $sheet->getColumnDimension('D')->setWidth(8);
                $sheet->getColumnDimension('E')->setWidth(8);
                $sheet->getColumnDimension('F')->setWidth(8);
                $sheet->getColumnDimension('G')->setWidth(12);
                $sheet->getColumnDimension('H')->setWidth(8);
                $sheet->getColumnDimension('I')->setWidth(15);

                // Add instructions
                $sheet->setCellValue('K3', 'INSTRUCTIONS:');
                $sheet->setCellValue('K4', '1. Cell A3 must contain "CCTV"');
                $sheet->setCellValue('K5', '2. Cell A6 must contain recording date');
                $sheet->setCellValue('K6', '3. Data starts from row 9');
                $sheet->setCellValue('K7', '4. Required columns:');
                $sheet->setCellValue('K8', '   - Column A: Name');
                $sheet->setCellValue('K9', '   - Column B: IP Address');
                $sheet->setCellValue('K10', '   - Column C: Up');
                $sheet->setCellValue('K11', '   - Column G: Down');
                $sheet->setCellValue('K12', '   - Column I: Availability(%)');

                $sheet->getStyle('K3:K12')->applyFromArray([
                    'font' => ['size' => 9],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'F2F2F2']
                    ]
                ]);
                $sheet->getStyle('K3')->applyFromArray([
                    'font' => ['bold' => true]
                ]);
            },
        ];
    }
}
