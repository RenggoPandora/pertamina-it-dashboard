<?php

namespace App\Http\Controllers;

use App\Models\Hpboc;
use App\Models\Radio;
use App\Models\Telephone;
use App\Models\NetworkDevice;
use App\Models\PcDevice;
use App\Models\Cctv;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get data from all models
        $hpbocs = Hpboc::all();
        $radios = Radio::all();
        $telephones = Telephone::all();
        $networkDevices = NetworkDevice::all();
        $pcDevices = PcDevice::all();
        $cctvs = Cctv::all();

        // Calculate statistics for HPBOC
        $hpbocStats = [
            'total' => $hpbocs->count(),
            'available' => $hpbocs->where('status', 'on')->count(),
            'maintenance' => $hpbocs->where('status', 'maintenance')->count(),
            'off' => $hpbocs->where('status', 'off')->count(),
        ];

        // Calculate statistics for Radio HT
        $radioStats = [
            'total' => $radios->count(),
            'on' => $radios->where('status', 'on')->count(),
            'off' => $radios->where('status', 'off')->count(),
            'maintenance' => $radios->where('status', 'maintenance')->count(),
        ];

        // Calculate statistics for Telephone
        $telephoneStats = [
            'total' => $telephones->count(),
            'on' => $telephones->where('status', 'on')->count(),
            'off' => $telephones->where('status', 'off')->count(),
            'maintenance' => $telephones->where('status', 'maintenance')->count(),
        ];

        // Calculate statistics for PC Device
        $pcDeviceStats = [
            'total' => $pcDevices->count(),
            'desktop' => $pcDevices->where('jenis', 'desktop')->count(),
            'notebook' => $pcDevices->where('jenis', 'notebook')->count(),
            'printer' => $pcDevices->where('jenis', 'printer')->count(),
            'mps' => $pcDevices->where('alokasi', 'MPS')->count(),
            'sm5' => $pcDevices->where('alokasi', 'SM5')->count(),
        ];

        // Calculate statistics for Network Device
        $networkStats = [
            'total' => $networkDevices->count(),
            'up' => $networkDevices->where('status', 'up')->count(),
            'down' => $networkDevices->where('status', 'down')->count(),
            'switches' => $networkDevices->where('jenis', 'switch')->count(),
            'accessPoints' => $networkDevices->where('jenis', 'access point')->count(),
        ];

        // Calculate statistics for CCTV
        $cctvStats = [
            'total' => $cctvs->count(),
            'online' => $cctvs->where('status', 'online')->count(),
            'offline' => $cctvs->where('status', 'offline')->count(),
            'asset' => $cctvs->where('kepemilikan', 'asset')->count(),
            'sewa' => $cctvs->where('kepemilikan', 'sewa')->count(),
        ];

        // Mock ticket data (since we don't have ticket model yet)
        $ticketStats = [
            'total' => 72,
            'closed' => 15,
            'completed' => 25,
            'pending' => 20,
            'rejected' => 5,
            'resolved' => 7,
        ];

        return Inertia::render('overview/index', [
            'hpbocStats' => $hpbocStats,
            'radioStats' => $radioStats,
            'telephoneStats' => $telephoneStats,
            'pcDeviceStats' => $pcDeviceStats,
            'networkStats' => $networkStats,
            'cctvStats' => $cctvStats,
            'ticketStats' => $ticketStats,
        ]);
    }
}
