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
        Schema::create('hpboc', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perangkat');
            $table->integer('jumlah');
            $table->date('tanggal_pencatatan');
            $table->timestamps();
            $table->enum('status', ['rusak', 'baik'])->default('baik');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');

            $table->foreignId('site_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hpboc');
    }
};
