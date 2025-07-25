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
        Schema::create('pcdevice', function (Blueprint $table) {
            $table->id();
            $table->enum('jenis', ['desktop', 'notebook', 'printer']);
            $table->string('nama_perangkat');
            $table->integer('jumlah');
            $table->date('tanggal_pencatatan');
            $table->enum('alokasi', ['MPS', 'SM5']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pcdevice');
    }
};
