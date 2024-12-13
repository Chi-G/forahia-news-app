<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PreferencesController;
use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// API routes
Route::prefix('api')->group(function () {
    Route::get('/news/search', [NewsController::class, 'search']);
    Route::get('/news/sources', [NewsController::class, 'getSources']);
    Route::get('/news/authors', [NewsController::class, 'getAuthors']);
    Route::get('/news/everything', [NewsController::class, 'getEverything']);
});

// Web routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/preferences', [PreferencesController::class, 'edit'])->name('preferences');
    Route::post('/preferences', [PreferencesController::class, 'update'])->name('preferences.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
