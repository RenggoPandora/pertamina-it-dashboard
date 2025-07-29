<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Site;

class SiteSeeder extends Seeder
{
    public function run()
    {
        $sites = [
            ['lokasi' => 'Area 01'],
            ['lokasi' => 'Area 02'],
            ['lokasi' => 'Area 10'],
            ['lokasi' => 'Area 20'],
            ['lokasi' => 'Area 30'],
            ['lokasi' => 'Area 40'],
            ['lokasi' => 'Area 50'],
            ['lokasi' => 'Area 80'],
            ['lokasi' => 'Area 90'],
            ['lokasi' => 'Area 200'],
        ];

        foreach ($sites as $site) {
            Site::create($site);
        }
    }
}
