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
        Schema::create('telephone', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pic');
            $table->integer('jumlah');
            $table->date('tanggal_pencatatan');
            $table->enum('status', ['on', 'off'])->default('on');
            $table->timestamps();

            $table->foreignId('site_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telephone');
    }
};
