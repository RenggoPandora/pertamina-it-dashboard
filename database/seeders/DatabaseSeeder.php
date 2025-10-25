<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed users first
        $this->call([
            UserSeeder::class,
        ]);

        // Seed sites for location selection
        $this->call([
            SiteSeeder::class,
            TelephoneSeeder::class,
            RadioSeeder::class,
            HpbocSeeder::class,
            PcDeviceSeeder::class,
            NetworkDeviceSeeder::class,
            CctvSeeder::class,
            TicketSeeder::class,
        ]);
    }
}
