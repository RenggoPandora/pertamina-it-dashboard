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
            'total' => $hpbocs->sum('jumlah'), 
            'available' => $hpbocs->where('status', 'baik')->sum('jumlah'),
            'off' => $hpbocs->where('status', 'rusak')->sum('jumlah'),
        ];

        // Calculate statistics for Radio HT
        $radioStats = [
            'total' => $radios->sum('jumlah'),
            'on' => $radios->where('status', 'on')->sum('jumlah'),
            'off' => $radios->where('status', 'off')->sum('jumlah'),
            'maintenance' => $radios->where('status', 'maintenance')->sum('jumlah'),
        ];

        // Calculate statistics for Telephone
        $telephoneStats = [
            'total' => $telephones->sum('jumlah'),
            'on' => $telephones->where('status', 'on')->sum('jumlah'),
            'off' => $telephones->where('status', 'off')->sum('jumlah'),
            'maintenance' => $telephones->where('status', 'maintenance')->count(),
        ];

        // Calculate statistics for PC Device
        $pcDeviceStats = [
            'total' => $pcDevices->sum('jumlah'),
            'desktop' => $pcDevices->where('jenis', 'desktop')->sum('jumlah'),
            'notebook' => $pcDevices->where('jenis', 'notebook')->sum('jumlah'),
            'printer' => $pcDevices->where('jenis', 'printer')->sum('jumlah'),
            'mps' => $pcDevices->where('alokasi', 'MPS')->sum('jumlah'),
            'sm5' => $pcDevices->where('alokasi', 'SM5')->sum('jumlah'),
        ];

        // Calculate statistics for Network Device
        $networkStats = [
            'total' => $networkDevices->count(),
            'up' => $networkDevices->where('status', 'up')->count(),
            'down' => $networkDevices->where('status', 'down')->count(),
            'switches' => $networkDevices->where('jenis', 'switch')->count(),
            'accessPoints' => $networkDevices->where('jenis', 'access point')->count(),
            'network' => $networkDevices->where('jenis', 'network')->count(),
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
