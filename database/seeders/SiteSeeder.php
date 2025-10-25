<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Site;

class SiteSeeder extends Seeder
{
    public function run()
    {
        $sites = [
            ['lokasi' => 'Area 10 – Fuel Oil Complex I'],
            ['lokasi' => 'Area 01 – Fuel Oil Complex II'],
            ['lokasi' => 'Area 20 – Lube Oil Complex I'],
            ['lokasi' => 'Area 02 – Lube Oil Complex II'],
            ['lokasi' => 'Area 30 – Area Tangki BBM'],
            ['lokasi' => 'Area 40 – Area Tangki Non-BBM'],
            ['lokasi' => 'Area 50 – Utilities Complex I'],
            ['lokasi' => 'Area 05 – Utilities Complex II'],
            ['lokasi' => 'Area 60 – Oil Movement & Pipelines Area'],
            ['lokasi' => 'Area 70 – Terminal Minyak Mentah dan Produk'],
            ['lokasi' => 'Area 80 – Kilang Paraxylene (KPC)'],
            ['lokasi' => 'Area 90 – Kilang LPG & Sulfur Recovery Unit'],
            ['lokasi' => 'Area 100 – Residual Fluid Catalytic Cracking (RFCC)'],
            ['lokasi' => 'Area 200 – Lube Oil Complex III'],
            ['lokasi' => 'Area 500 – Utilities Complex IIA'],
        ];

        foreach ($sites as $site) {
            Site::create($site);
        }
    }
}
