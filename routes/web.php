<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\PollController;
use App\Http\Controllers\GceoMessageController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ForumController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'getWelcomeData'])->name('dashboard');
Route::get('/exclusive-offers', [App\Http\Controllers\PublicPromotionController::class, 'index'])->name('offers.index');
Route::get('/celebrations', [App\Http\Controllers\CelebrationController::class, 'index'])->name('celebrations.index');
Route::get('/company-events', [App\Http\Controllers\PublicEventController::class, 'index'])->name('events.public');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('news', NewsController::class);
    Route::resource('events', EventController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('polls', PollController::class);
    Route::patch('polls/{id}/toggle', [PollController::class, 'toggleStatus'])->name('polls.toggle');
    Route::resource('gceo-messages', GceoMessageController::class);
    Route::resource('employee-of-the-month', \App\Http\Controllers\Admin\EmployeeOfTheMonthController::class);
    Route::resource('promotions', \App\Http\Controllers\Admin\PromotionController::class);
    Route::resource('humans-of-qgirco', \App\Http\Controllers\Admin\HumansOfQgircoController::class);

    // New modules placeholders
    // Gallery routes
    Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
    Route::post('/gallery', [GalleryController::class, 'store'])->name('gallery.store');
    Route::delete('/gallery/{albumPhoto}', [GalleryController::class, 'destroy'])->name('gallery.destroy');
    Route::get('/forum/discussion', [ForumController::class, 'index'])->defaults('type', 'discussion')->name('forum.discussion');
    Route::post('/forum/discussion', [ForumController::class, 'store'])->name('forum.discussion.store');
    Route::delete('/forum/discussion/{topic}', [ForumController::class, 'destroy'])->name('forum.discussion.destroy');
    Route::get('/forum/digital-voices', [ForumController::class, 'index'])->defaults('type', 'voice')->name('forum.digital_voices');
    Route::get('/forum/topic/{topic}', [ForumController::class, 'show'])->name('forum.show');
    Route::get('/challenges', function () {
        return Inertia::render('Challenges/Index');
    })->name('challenges.index');

    // Settings
    Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
