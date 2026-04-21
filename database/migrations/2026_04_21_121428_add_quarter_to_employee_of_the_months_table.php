<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employee_of_the_months', function (Blueprint $table) {
            $table->string('quarter')->nullable()->after('year'); // Q1, Q2, Q3, Q4
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_of_the_months', function (Blueprint $table) {
            $table->dropColumn('quarter');
        });
    }
};
