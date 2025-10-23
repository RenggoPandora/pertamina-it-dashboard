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
        Schema::table('cctv', function (Blueprint $table) {
            $table->string('down')->nullable()->after('up');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cctv', function (Blueprint $table) {
            $table->dropColumn('down');
        });
    }
};
