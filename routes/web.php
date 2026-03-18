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
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'getWelcomeData'])->name('welcome');
Route::get('/exclusive-offers', [App\Http\Controllers\PublicPromotionController::class, 'index'])->name('offers.index');
Route::get('/celebrations', [App\Http\Controllers\CelebrationController::class, 'index'])->name('celebrations.index');
Route::get('/company-events', [App\Http\Controllers\PublicEventController::class, 'index'])->name('events.public');
Route::get('/photo-gallery', [App\Http\Controllers\PublicGalleryController::class, 'index'])->name('photo-gallery');


Route::middleware(['auth', 'verified', 'is_admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('news', NewsController::class);
    Route::resource('events', EventController::class);
    Route::post('employees/import', [EmployeeController::class, 'import'])->name('employees.import');
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
    Route::delete('/forum/discussion/{topic}', [ForumController::class, 'destroy'])->name('forum.discussion.destroy');


    // Settings
    Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');

    // Challenges
    Route::resource('challenges', \App\Http\Controllers\ChallengeController::class);
    Route::patch('challenges/{challenge}/toggle', [\App\Http\Controllers\ChallengeController::class, 'toggle'])->name('challenges.toggle');

    // Admin Users
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['show', 'edit', 'update']);
    });
});

Route::get('/forum/discussion', [ForumController::class, 'index'])->defaults('type', 'discussion')->name('forum.discussion');
Route::get('/forum/digital-voices', [ForumController::class, 'index'])->defaults('type', 'voice')->name('forum.digital_voices');
Route::get('/forum/topic/{topic}', [ForumController::class, 'show'])->name('forum.show');
Route::post('/forum/topic/{topic}/increment-view', [ForumController::class, 'incrementView'])->name('forum.increment-view');

Route::middleware('auth')->group(function () {
    Route::post('/forum/topic', [ForumController::class, 'store'])->name('forum.topic.store');
    Route::post('/forum/topic/{topic}/reply', [ForumController::class, 'storeReply'])->name('forum.replies.store');
    Route::post('/forum/topic/{topic}/toggle-like', [ForumController::class, 'toggleLike'])->name('forum.toggle-like');
    Route::post('polls/{poll}/vote', [DashboardController::class, 'votePoll'])->name('polls.vote');
    Route::post('/challenges/{challenge}/respond', [DashboardController::class, 'respondToChallenge'])->name('challenges.respond');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Notifications & Wishes
    Route::get('/api/notifications/today', [\App\Http\Controllers\Api\NotificationController::class, 'getTodayNotifications'])->name('api.notifications.today');
    Route::post('/api/notifications/mark-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead'])->name('api.notifications.mark-read');
    Route::post('/api/wishes', [\App\Http\Controllers\Api\NotificationController::class, 'storeWish'])->name('api.wishes.store');
    Route::get('/api/wishes/check', [\App\Http\Controllers\Api\NotificationController::class, 'checkWishStatus'])->name('api.wishes.check');
});

Route::get('/api/search', [\App\Http\Controllers\Api\SearchController::class, 'search'])->name('api.search');



Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    return redirect()->back()->with('success', 'Cache cleared successfully!');
})->name('clear-cache');


require __DIR__ . '/auth.php';
