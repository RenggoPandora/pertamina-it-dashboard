<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@pertamina.com',
            'password' => Hash::make('Admin123.'),
        ]);

        User::create([
            'name' => 'Admin2',
            'email' => 'admin2@pertamina.com',
            'password' => Hash::make('Admin123.'),
        ]);

        User::create([
            'name' => 'Admin3',
            'email' => 'admin3@pertamina.com',
            'password' => Hash::make('Admin123.'),
        ]);

        $this->command->info('User seeder completed successfully! Created 3 admin users.');
    }
}
