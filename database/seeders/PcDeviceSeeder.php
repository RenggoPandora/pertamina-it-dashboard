<?php

namespace Database\Seeders;

use App\Models\PcDevice;
use Illuminate\Database\Seeder;

class PcDeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pcDevices = [
            [
                'jenis' => 'desktop',
                'nama_perangkat' => 'Dell OptiPlex 7090',
                'jumlah' => 15,
                'tanggal_pencatatan' => '2024-01-10',
                'alokasi' => 'MPS',
            ],
            [
                'jenis' => 'desktop',
                'nama_perangkat' => 'HP EliteDesk 800 G6',
                'jumlah' => 12,
                'tanggal_pencatatan' => '2024-02-15',
                'alokasi' => 'SM5',
            ],
            [
                'jenis' => 'notebook',
                'nama_perangkat' => 'Lenovo ThinkPad X1 Carbon',
                'jumlah' => 8,
                'tanggal_pencatatan' => '2024-03-20',
                'alokasi' => 'MPS',
            ],
            [
                'jenis' => 'notebook',
                'nama_perangkat' => 'Dell Latitude 5420',
                'jumlah' => 10,
                'tanggal_pencatatan' => '2024-04-05',
                'alokasi' => 'SM5',
            ],
            [
                'jenis' => 'printer',
                'nama_perangkat' => 'HP LaserJet Pro M404dn',
                'jumlah' => 5,
                'tanggal_pencatatan' => '2024-05-12',
                'alokasi' => 'MPS',
            ],
            [
                'jenis' => 'printer',
                'nama_perangkat' => 'Canon imageCLASS MF445dw',
                'jumlah' => 6,
                'tanggal_pencatatan' => '2024-06-18',
                'alokasi' => 'SM5',
            ],
            [
                'jenis' => 'desktop',
                'nama_perangkat' => 'Asus ExpertCenter D5',
                'jumlah' => 20,
                'tanggal_pencatatan' => '2024-07-22',
                'alokasi' => 'MPS',
            ],
            [
                'jenis' => 'notebook',
                'nama_perangkat' => 'HP ProBook 450 G8',
                'jumlah' => 7,
                'tanggal_pencatatan' => '2024-08-15',
                'alokasi' => 'SM5',
            ],
            [
                'jenis' => 'printer',
                'nama_perangkat' => 'Epson EcoTank L3210',
                'jumlah' => 4,
                'tanggal_pencatatan' => '2024-09-10',
                'alokasi' => 'MPS',
            ],
            [
                'jenis' => 'desktop',
                'nama_perangkat' => 'Acer Veriton M',
                'jumlah' => 18,
                'tanggal_pencatatan' => '2024-10-05',
                'alokasi' => 'SM5',
            ],
        ];

        foreach ($pcDevices as $device) {
            PcDevice::create($device);
        }

        $this->command->info('PcDevice seeder completed successfully!');
    }
}
