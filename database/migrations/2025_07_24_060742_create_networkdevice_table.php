<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('networkdevice', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perangkat');
            $table->string('ip_address');
            $table->date('tanggal_pencatatan');
            $table->enum('jenis', ['switch', 'access point','network']);
            $table->string('up')->nullable();
            $table->string('down')->nullable();
            $table->string('availability')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('networkdevice');
    }
};
