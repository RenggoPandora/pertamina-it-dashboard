<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class NetworkDeviceTemplateExport implements FromCollection, WithEvents, WithTitle
{
    private $jenis;

    public function __construct($jenis = 'switch')
    {
        $this->jenis = $jenis;
    }

    public function collection()
    {
        return collect([]);
    }

    public function title(): string
    {
        return 'Network Device Template';
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                // Cell A3: Category dengan format yang benar berdasarkan jenis
                $categoryText = $this->getCategoryText();
                $sheet->setCellValue('A3', $categoryText);
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
                $data = $this->getSampleData();

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

                // Auto-size columns
                foreach (range('A', 'I') as $col) {
                    $sheet->getColumnDimension($col)->setAutoSize(true);
                }

                // Informasi tambahan
                $sheet->setCellValue('K2', 'INFORMASI TEMPLATE');
                $sheet->getStyle('K2')->applyFromArray([
                    'font' => ['bold' => true, 'size' => 12, 'color' => ['rgb' => '0066CC']],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'E8F4FF']
                    ]
                ]);

                $infoStart = 3;
                $info = [
                    "Jenis: {$this->jenis}",
                    "Cell A3: Harus mengandung kata kunci:",
                    "  - 'Switch' untuk jenis switch",
                    "  - 'Network' untuk jenis network",
                    "  - 'Access Point' untuk access point",
                    "",
                    "Cell A6: Tanggal pencatatan",
                    "Format: 'End Time: DD MMM YYYY...'",
                    "",
                    "Baris 9: Header kolom",
                    "Baris 10+: Data Network Device",
                    "",
                    "Kolom yang diperlukan:",
                    "  A = Name (wajib)",
                    "  B = IP Address (wajib)",
                    "  C = Up Time",
                    "  G = Down Time",
                    "  I = Availability (%)",
                    "",
                    "Kepemilikan: Otomatis 'Sewa'",
                ];

                foreach ($info as $index => $text) {
                    $sheet->setCellValue('K' . ($infoStart + $index), $text);
                }

                $sheet->getStyle('K' . $infoStart . ':K' . ($infoStart + count($info)))->applyFromArray([
                    'font' => ['size' => 9],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'F9F9F9']
                    ]
                ]);
            }
        ];
    }

    private function getCategoryText()
    {
        switch ($this->jenis) {
            case 'switch':
                return 'Category: Switch IPI    Business View: All Devices';
            case 'network':
                return 'Category: KPP CCTV Network    Business View: All Devices';
            case 'access point':
                return 'Category: Access Point    Business View: All Devices';
            default:
                return 'Category: Switch IPI    Business View: All Devices';
        }
    }

    private function getSampleData()
    {
        switch ($this->jenis) {
            case 'switch':
                return [
                    ['Switch Core Room A', '192.168.1.1', '23:50:00', '', '', '', '00:10:00', '', '99.31'],
                    ['Switch Distribution B', '192.168.1.2', '24:00:00', '', '', '', '00:00:00', '', '100'],
                    ['Switch Access Floor 3', '192.168.1.3', '20:00:00', '', '', '', '04:00:00', '', '83.33'],
                ];
            case 'network':
                return [
                    ['Network Device Main', '192.168.2.1', '23:50:00', '', '', '', '00:10:00', '', '99.31'],
                    ['Network Device Backup', '192.168.2.2', '24:00:00', '', '', '', '00:00:00', '', '100'],
                    ['Network Device Remote', '192.168.2.3', '20:00:00', '', '', '', '04:00:00', '', '83.33'],
                ];
            case 'access point':
                return [
                    ['AP Meeting Room 1', '192.168.3.1', '23:50:00', '', '', '', '00:10:00', '', '99.31'],
                    ['AP Office Floor 2', '192.168.3.2', '24:00:00', '', '', '', '00:00:00', '', '100'],
                    ['AP Lobby Area', '192.168.3.3', '20:00:00', '', '', '', '04:00:00', '', '83.33'],
                ];
            default:
                return [
                    ['Device Example 1', '192.168.1.100', '23:50:00', '', '', '', '00:10:00', '', '99.31'],
                    ['Device Example 2', '192.168.1.101', '24:00:00', '', '', '', '00:00:00', '', '100'],
                    ['Device Example 3', '192.168.1.102', '20:00:00', '', '', '', '04:00:00', '', '83.33'],
                ];
        }
    }
}
