<?php

namespace Database\Seeders;

use App\Models\Radio;
use App\Models\Site;
use Illuminate\Database\Seeder;

class RadioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sites = Site::all();

        if ($sites->isEmpty()) {
            $this->command->warn('No sites found. Please run SiteSeeder first.');
            return;
        }

        $radios = [
            [
                'nama_perangkat' => 'Motorola GP328',
                'jumlah' => 5,
                'tanggal_pencatatan' => '2024-01-10',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Kenwood TK-3207',
                'jumlah' => 8,
                'tanggal_pencatatan' => '2024-02-15',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Icom IC-F4003',
                'jumlah' => 3,
                'tanggal_pencatatan' => '2024-03-20',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Vertex Standard VX-451',
                'jumlah' => 2,
                'tanggal_pencatatan' => '2024-04-12',
                'status' => 'off',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Motorola CP1660',
                'jumlah' => 10,
                'tanggal_pencatatan' => '2024-05-25',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Hytera PD705',
                'jumlah' => 6,
                'tanggal_pencatatan' => '2024-06-18',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Kenwood TK-2207',
                'jumlah' => 7,
                'tanggal_pencatatan' => '2024-07-22',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Icom IC-F3003',
                'jumlah' => 4,
                'tanggal_pencatatan' => '2024-08-30',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Motorola GP338',
                'jumlah' => 9,
                'tanggal_pencatatan' => '2024-09-05',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Vertex Standard VX-261',
                'jumlah' => 12,
                'tanggal_pencatatan' => '2024-10-15',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
        ];

        foreach ($radios as $radio) {
            Radio::create($radio);
        }

        $this->command->info('Radio seeder completed successfully!');
    }
}
