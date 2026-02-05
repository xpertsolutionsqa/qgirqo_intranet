<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE posts MODIFY COLUMN type ENUM('news', 'announcement', 'event', 'promotion', 'health_article') DEFAULT 'news'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE posts MODIFY COLUMN type ENUM('news', 'announcement', 'event') DEFAULT 'news'");
    }
};
