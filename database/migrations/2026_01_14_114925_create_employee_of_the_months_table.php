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
        Schema::create('employee_of_the_months', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('month'); // 1 to 12
            $table->integer('year');  // e.g., 2024
            $table->string('title')->nullable(); // e.g., "Star Performer"
            $table->text('reason')->nullable(); // Achievement details
            $table->string('featured_image')->nullable(); // Certificate ya photo
            $table->timestamps();

            // Unique constraint: Taake aik maheenay mein aik bande ka aik hi record ho
            $table->unique(['user_id', 'month', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_of_the_months');
    }
};
