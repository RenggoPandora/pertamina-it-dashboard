<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CctvController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HpbocController;
use App\Http\Controllers\NetworkDeviceController;
use App\Http\Controllers\PcDeviceController;
use App\Http\Controllers\RadioController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\TelephoneController;
use App\Http\Controllers\TicketController;

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // IT Dashboard Routes - using controllers with auth
    Route::get('network-device', [NetworkDeviceController::class, 'index'])->name('network-device.index');

    Route::get('pc-device', [PcDeviceController::class, 'index'])->name('pc-device.index');

    Route::get('cctv', [CctvController::class, 'index'])->name('cctv.index');

    Route::get('ticket', function () {
        return Inertia::render('ticket/index');
    })->name('ticket.index');

    // Resource routes with authentication
    Route::resource('site', SiteController::class);
    
    // HPBOC specific routes
    Route::post('hpboc/import', [HpbocController::class, 'import'])->name('hpboc.import');
    Route::get('hpboc/download-template', [HpbocController::class, 'downloadTemplate'])->name('hpboc.download-template');
    Route::resource('hpboc', HpbocController::class);
    
    // Radio specific routes
    Route::post('radio/import', [RadioController::class, 'import'])->name('radio.import');
    Route::get('radio/download-template', [RadioController::class, 'downloadTemplate'])->name('radio.download-template');
    Route::resource('radio', RadioController::class);
    
    // Telephone specific routes
    Route::post('telephone/import', [TelephoneController::class, 'import'])->name('telephone.import');
    Route::get('telephone/download-template', [TelephoneController::class, 'template'])->name('telephone.download-template');
    Route::resource('telephone', TelephoneController::class);
    
    // Network Device resource routes
    Route::resource('networkdevice', NetworkDeviceController::class);
    
    // PC Device resource routes
    Route::resource('pcdevice', PcDeviceController::class);
    
    // CCTV resource routes
    Route::resource('cctv', CctvController::class);

    // Ticket resource routes
    Route::resource('ticket', TicketController::class);
    Route::get('ticket', [TicketController::class, 'index'])->name('ticket.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
