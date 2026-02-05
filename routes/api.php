<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmployeeController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);



Route::get('/news/latest', [PostController::class, 'latestNews']);
Route::get('/dashboard/stats', [EmployeeController::class, 'dashboardStats']);
Route::get('/dashboard', [DashboardController::class, 'index']);
