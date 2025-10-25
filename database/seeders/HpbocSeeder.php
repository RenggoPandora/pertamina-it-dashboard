<?php

namespace Database\Seeders;

use App\Models\Hpboc;
use App\Models\Site;
use Illuminate\Database\Seeder;

class HpbocSeeder extends Seeder
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

        $hpbocs = [
            [
                'nama_perangkat' => 'Samsung Galaxy A52',
                'jumlah' => 10,
                'tanggal_pencatatan' => '2024-01-15',
                'status' => 'baik',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Xiaomi Redmi Note 11',
                'jumlah' => 8,
                'tanggal_pencatatan' => '2024-02-20',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Oppo A76',
                'jumlah' => 6,
                'tanggal_pencatatan' => '2024-03-10',
                'status' => 'baik',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Vivo Y21',
                'jumlah' => 5,
                'tanggal_pencatatan' => '2024-04-05',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Realme 9',
                'jumlah' => 12,
                'tanggal_pencatatan' => '2024-05-18',
                'status' => 'baik',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Samsung Galaxy M32',
                'jumlah' => 7,
                'tanggal_pencatatan' => '2024-06-22',
                'status' => 'baik',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Xiaomi Poco X4 Pro',
                'jumlah' => 9,
                'tanggal_pencatatan' => '2024-07-30',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Oppo Reno 8',
                'jumlah' => 4,
                'tanggal_pencatatan' => '2024-08-14',
                'status' => 'rusak',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Vivo V25',
                'jumlah' => 11,
                'tanggal_pencatatan' => '2024-09-05',
                'status' => 'baik',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_perangkat' => 'Realme GT Neo 3',
                'jumlah' => 6,
                'tanggal_pencatatan' => '2024-10-10',
                'status' => 'baik',
                'site_id' => $sites->random()->id,
            ],
        ];

        foreach ($hpbocs as $hpboc) {
            Hpboc::create($hpboc);
        }

        $this->command->info('Hpboc seeder completed successfully!');
    }
}
