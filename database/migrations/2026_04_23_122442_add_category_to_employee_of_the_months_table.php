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
            $table->string('category')->nullable()->after('title'); // excellence, leadership, etc.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_of_the_months', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
