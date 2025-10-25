<?php

namespace App\Http\Controllers;

use App\Models\Hpboc;
use App\Models\Radio;
use App\Models\Telephone;
use App\Models\NetworkDevice;
use App\Models\PcDevice;
use App\Models\Cctv;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonInterface;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'week' => 'nullable|integer|min:1|max:5',
            'date' => 'nullable|date_format:Y-m-d',
        ]);

        $filters = $request->only(['week', 'date']);
        $startDate = null;
        $endDate = null;
        $selectedDate = null; // Inisialisasi variabel untuk tanggal yang dipilih

        // Logika filter: Prioritaskan 'date' jika ada
        if ($request->filled('date')) {
            $selectedDate = Carbon::createFromFormat('Y-m-d', $request->input('date'));
            
            // Hitung nomor minggu dari tanggal yang dipilih agar UI bisa update
            $startOfMonth = $selectedDate->copy()->startOfMonth();
            $calculatedWeek = 0;
            for ($w = 1; $w <= 5; $w++) {
                $weekStartDate = $startOfMonth->copy()->addWeeks($w - 1)->startOfWeek(CarbonInterface::SUNDAY);
                $weekEndDate = $weekStartDate->copy()->endOfWeek(CarbonInterface::SATURDAY);
                if ($selectedDate->between($weekStartDate, $weekEndDate)) {
                    $calculatedWeek = $w;
                    break;
                }
            }
            if ($calculatedWeek > 0) {
                // Kirim balik nomor minggu agar tombolnya bisa ikut aktif
                $filters['week'] = $calculatedWeek;
            }

        } elseif ($request->filled('week')) {
            $week = (int) $request->input('week');
            $startOfMonth = Carbon::now()->startOfMonth();
            $startDate = $startOfMonth->copy()->addWeeks($week - 1)->startOfWeek(CarbonInterface::SUNDAY);
            $endDate = $startDate->copy()->endOfWeek(CarbonInterface::SATURDAY);
        }

        // Buat Query Builder dasar untuk setiap model
        $hpbocQuery = Hpboc::query();
        $radioQuery = Radio::query();
        $telephoneQuery = Telephone::query();
        $networkDeviceQuery = NetworkDevice::query();
        $pcDeviceQuery = PcDevice::query();
        $cctvQuery = Cctv::query();
        $ticketQuery = Ticket::query();

        // Terapkan filter berdasarkan kondisi
        if ($selectedDate) { // Jika ada tanggal spesifik yang dipilih
            $hpbocQuery->whereDate('tanggal_pencatatan', $selectedDate);
            $radioQuery->whereDate('tanggal_pencatatan', $selectedDate);
            $telephoneQuery->whereDate('tanggal_pencatatan', $selectedDate);
            $networkDeviceQuery->whereDate('tanggal_pencatatan', $selectedDate);
            $pcDeviceQuery->whereDate('tanggal_pencatatan', $selectedDate);
            $cctvQuery->whereDate('tanggal_pencatatan', $selectedDate);
            $ticketQuery->whereDate('created_at', $selectedDate);
        } elseif ($startDate && $endDate) { // Jika filter minggu yang dipilih
            $hpbocQuery->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
            $radioQuery->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
            $telephoneQuery->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
            $networkDeviceQuery->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
            $pcDeviceQuery->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
            $cctvQuery->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
            $ticketQuery->whereBetween('created_at', [$startDate, $endDate]);
        }

        // Hitung statistik dari query yang sudah difilter
        $hpbocStats = [
            'total' => (clone $hpbocQuery)->sum('jumlah'),
            'available' => (clone $hpbocQuery)->where('status', 'baik')->sum('jumlah'),
            'off' => (clone $hpbocQuery)->where('status', 'rusak')->sum('jumlah'),
            'maintenance' => (clone $hpbocQuery)->where('status', 'maintenance')->sum('jumlah'),
        ];
        
        $radioStats = [
            'total' => (clone $radioQuery)->sum('jumlah'),
            'on' => (clone $radioQuery)->where('status', 'on')->sum('jumlah'),
            'off' => (clone $radioQuery)->where('status', 'off')->sum('jumlah'),
            'maintenance' => (clone $radioQuery)->where('status', 'maintenance')->sum('jumlah'),
        ];

        $telephoneStats = [
            'total' => (clone $telephoneQuery)->sum('jumlah'),
            'on' => (clone $telephoneQuery)->where('status', 'on')->sum('jumlah'),
            'off' => (clone $telephoneQuery)->where('status', 'off')->sum('jumlah'),
            'maintenance' => (clone $telephoneQuery)->where('status', 'maintenance')->sum('jumlah'),
        ];

        $pcDeviceStats = [
            'total' => (clone $pcDeviceQuery)->sum('jumlah'),
            'desktop' => (clone $pcDeviceQuery)->where('jenis', 'desktop')->sum('jumlah'),
            'notebook' => (clone $pcDeviceQuery)->where('jenis', 'notebook')->sum('jumlah'),
            'printer' => (clone $pcDeviceQuery)->where('jenis', 'printer')->sum('jumlah'),
            'mps' => (clone $pcDeviceQuery)->where('alokasi', 'MPS')->sum('jumlah'),
            'sm5' => (clone $pcDeviceQuery)->where('alokasi', 'SM5')->sum('jumlah'),
        ];

        $networkStats = [
            'total' => (clone $networkDeviceQuery)->count(),
            'up' => (clone $networkDeviceQuery)->whereNotNull('up')->count(),
            'down' => (clone $networkDeviceQuery)->whereNotNull('down')->count(),
            'switches' => (clone $networkDeviceQuery)->where('jenis', 'switch')->count(),
            'accessPoints' => (clone $networkDeviceQuery)->where('jenis', 'access point')->count(),
            'network' => (clone $networkDeviceQuery)->where('jenis', 'network')->count(),
        ];

        $cctvStats = [
            'total' => (clone $cctvQuery)->count(),
            'online' => (clone $cctvQuery)->where('status', 'online')->count(),
            'offline' => (clone $cctvQuery)->where('status', 'offline')->count(),
            'asset' => (clone $cctvQuery)->where('kepemilikan', 'asset')->count(),
            'sewa' => (clone $cctvQuery)->where('kepemilikan', 'sewa')->count(),
        ];

        $ticketStats = [
            'total' => (clone $ticketQuery)->count(),
            'closed' => (clone $ticketQuery)->where('status', 'Closed')->count(),
            'completed' => (clone $ticketQuery)->where('status', 'Completed')->count(),
            'pending' => (clone $ticketQuery)->where('status', 'Pending')->count(),
            'rejected' => (clone $ticketQuery)->where('status', 'Rejected')->count(),
            'resolved' => (clone $ticketQuery)->where('status', 'Resolved')->count(),
        ];
        
        return Inertia::render('overview/index', [
            'hpbocStats' => $hpbocStats,
            'radioStats' => $radioStats,
            'telephoneStats' => $telephoneStats,
            'pcDeviceStats' => $pcDeviceStats,
            'networkStats' => $networkStats,
            'cctvStats' => $cctvStats,
            'ticketStats' => $ticketStats,
            'filters' => $filters, // Kirim filter yang sudah disempurnakan
        ]);
    }
}
