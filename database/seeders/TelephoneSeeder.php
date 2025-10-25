<?php

namespace Database\Seeders;

use App\Models\Telephone;
use App\Models\Site;
use Illuminate\Database\Seeder;

class TelephoneSeeder extends Seeder
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

        $telephones = [
            [
                'nama_pic' => 'Budi Santoso',
                'jumlah' => 5,
                'tanggal_pencatatan' => '2024-01-15',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Siti Rahmawati',
                'jumlah' => 3,
                'tanggal_pencatatan' => '2024-02-20',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Ahmad Fauzi',
                'jumlah' => 8,
                'tanggal_pencatatan' => '2024-03-10',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Dewi Lestari',
                'jumlah' => 2,
                'tanggal_pencatatan' => '2024-04-05',
                'status' => 'off',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Rudi Hermawan',
                'jumlah' => 6,
                'tanggal_pencatatan' => '2024-05-18',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Maya Sari',
                'jumlah' => 4,
                'tanggal_pencatatan' => '2024-06-22',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Andi Pratama',
                'jumlah' => 7,
                'tanggal_pencatatan' => '2024-07-30',
                'status' => 'on',
                'site_id' => $sites->random()->id,
            ],
            [
                'nama_pic' => 'Linda Wijaya',
                'jumlah' => 1,
                'tanggal_pencatatan' => '2024-08-14',
                'status' => 'maintenance',
                'site_id' => $sites->random()->id,
            ],
        ];

        foreach ($telephones as $telephone) {
            Telephone::create($telephone);
        }

        $this->command->info('Telephone seeder completed successfully!');
    }
}
