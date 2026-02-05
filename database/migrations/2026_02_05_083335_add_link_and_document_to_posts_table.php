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
        Schema::table('posts', function (Blueprint $table) {
            $table->enum('link_type', ['none', 'external', 'pdf'])->default('none')->after('type');
            $table->string('external_link')->nullable()->after('link_type');
            $table->string('document_path')->nullable()->after('external_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['link_type', 'external_link', 'document_path']);
        });
    }
};
