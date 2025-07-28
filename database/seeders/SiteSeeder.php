<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Site;

class SiteSeeder extends Seeder
{
    public function run()
    {
        $sites = [
            ['lokasi' => 'Jakarta Pusat'],
            ['lokasi' => 'Jakarta Selatan'],
            ['lokasi' => 'Jakarta Utara'],
            ['lokasi' => 'Jakarta Barat'],
            ['lokasi' => 'Jakarta Timur'],
            ['lokasi' => 'Tangerang'],
            ['lokasi' => 'Bekasi'],
            ['lokasi' => 'Depok'],
            ['lokasi' => 'Bogor'],
            ['lokasi' => 'Bandung'],
            ['lokasi' => 'Surabaya'],
            ['lokasi' => 'Medan'],
            ['lokasi' => 'Makassar'],
            ['lokasi' => 'Palembang'],
            ['lokasi' => 'Balikpapan'],
        ];

        foreach ($sites as $site) {
            Site::create($site);
        }
    }
}
