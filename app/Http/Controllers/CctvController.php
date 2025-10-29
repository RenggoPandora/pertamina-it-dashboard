<?php

namespace App\Http\Controllers;

use App\Models\Cctv;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CctvImport;
use App\Exports\CctvTemplateExport;
use Illuminate\Support\Facades\Log;

class CctvController extends Controller
{
    public function index(Request $request)
    {
        $query = Cctv::query();
        
        // Log untuk debug
        Log::info('CCTV Filter', [
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        
        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal_pencatatan', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal_pencatatan', '<=', $request->end_date);
        }
        
        $cctvs = $query->get();
        
        Log::info('CCTV Count', ['count' => $cctvs->count()]);
        
        return Inertia::render('cctv/index', [
            'cctvs' => $cctvs,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function readiness(Request $request)
    {
        $query = Cctv::query();
        
        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal_pencatatan', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal_pencatatan', '<=', $request->end_date);
        }
        
        $cctvs = $query->get();
        
        return Inertia::render('cctv/readiness', [
            'cctvs' => $cctvs,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('cctv/tambah');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan' => 'required|in:asset,sewa',
            'status' => 'required|in:online,offline',
            'up' => 'nullable|string',
            'down' => 'nullable|string',
            'availability' => 'nullable|string',
        ]);

        // Jika availability = 0, maka status harus offline
        if (isset($validated['availability']) && $validated['availability'] == '0') {
            $validated['status'] = 'offline';
        }

        Cctv::create($validated);

        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil ditambahkan.');
    }

    public function show(Cctv $cctv)
    {
        return Inertia::render('cctv/show', [
            'cctv' => $cctv,
        ]);
    }

    public function edit(Cctv $cctv)
    {
        return Inertia::render('cctv/edit', [
            'cctv' => $cctv,
        ]);
    }

    public function update(Request $request, Cctv $cctv)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan' => 'required|in:asset,sewa',
            'status' => 'required|in:online,offline',
            'up' => 'nullable|string',
            'down' => 'nullable|string',
            'availability' => 'nullable|string',
        ]);

        // Jika availability = 0, maka status harus offline
        if (isset($validated['availability']) && $validated['availability'] == '0') {
            $validated['status'] = 'offline';
        }

        $cctv->update($validated);

        return redirect()->route('cctv.index')->with('success', 'Data CCTV berhasil diperbarui.');
    }

    public function destroy(Cctv $cctv)
    {
        $cctv->delete();

        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil dihapus.');
    }

    /**
     * Import CCTV data from Excel file
     * 
     * Expected Excel format:
     * - Cell A3: "CCTV" (category validation)
     * - Cell A6: Tanggal Pencatatan (recording date)
     * - Data starts from row 9:
     *   A: Name
     *   B: IP Address
     *   C: Up
     *   G: Down
     *   I: Availability(%)
     */
    public function import(Request $request)
    {
        try {
            // Validasi file upload
            $request->validate([
                'excel_file' => 'required|file|mimes:xlsx,xls|max:5120', // Max 5MB
            ]);

            Log::info('Starting CCTV Excel import');

            $file = $request->file('excel_file');
            $filePath = $file->getRealPath();

            // Buat instance import dengan validasi header
            $import = new CctvImport($filePath);

            // Import data ke database
            Excel::import($import, $file);

            // Ambil statistik import
            $stats = $import->getStats();

            Log::info('CCTV import completed', $stats);

            // Jika ada error tapi juga ada sukses
            if ($stats['failed'] > 0 && $stats['success'] > 0) {
                return redirect()
                    ->route('cctv.index')
                    ->with('success', "Import selesai: {$stats['success']} berhasil, {$stats['failed']} gagal. Errors: " . implode(', ', array_slice($stats['errors'], 0, 3)));
            }

            // Jika semua gagal
            if ($stats['failed'] > 0 && $stats['success'] == 0) {
                return redirect()
                    ->route('cctv.index')
                    ->with('error', 'Import gagal: ' . implode(', ', $stats['errors']));
            }

            // Jika semua berhasil
            return redirect()
                ->route('cctv.index')
                ->with('success', "Berhasil import {$stats['success']} data CCTV");

        } catch (\Exception $e) {
            Log::error('CCTV import error: ' . $e->getMessage());
            
            return redirect()
                ->route('cctv.index')
                ->with('error', 'Import gagal: ' . $e->getMessage());
        }
    }

    /**
     * Download template Excel untuk CCTV import
     */
    public function downloadTemplate()
    {
        return Excel::download(new CctvTemplateExport(), 'template_cctv_import.xlsx');
    }
}
