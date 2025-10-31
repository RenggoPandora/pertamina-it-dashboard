<?php

namespace App\Http\Controllers;

use App\Models\Hpboc;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\HpbocImport;
use App\Exports\HpbocTemplateExport;

class HpbocController extends Controller
{
     
    public function index(Request $request)
    {
        $query = Hpboc::with('site');

        // Apply date range filter if provided
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal_pencatatan', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal_pencatatan', '<=', $request->end_date);
        }

        $hpboc = $query->get();
        
        return Inertia::render('hpboc/index', [
            'hpboc' => $hpboc,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]
        ]);
    }

    public function create()
    {
        $sites = Site::all();
        return Inertia::render('hpboc/tambah', ['sites' => $sites]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:baik,rusak',
            'site_id' => 'required|exists:sites,id',
        ]);

        Hpboc::create($request->all());

        return redirect()->route('hpboc.index')->with('success', 'Data HP BOC berhasil ditambahkan.');
    }

    public function edit(Hpboc $hpboc)
    {
        $sites = Site::all();
        return Inertia::render('hpboc/edit', [
            'hpboc' => $hpboc,
            'sites' => $sites
        ]);
    }

    public function update(Request $request, Hpboc $hpboc)
    {
        $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:baik,rusak',
            'site_id' => 'required|exists:sites,id',
        ]);

        $hpboc->update($request->all());

        return redirect()->route('hpboc.index')->with('success', 'Data HP BOC berhasil diperbarui.');
    }

    public function destroy($id)
    {
        try {
            $device = Hpboc::find($id);

            if (!$device) {
                Log::error('HP BOC device not found', ['id' => $id]);
                return response()->json(['message' => 'Device not found'], 404);
            }

            $device->delete();
            return redirect()->back()->with('success', 'Data berhasil dihapus.');
            
        } catch (\Exception $e) {
            Log::error('Error deleting HP BOC device:', [
                'error' => $e->getMessage(),
                'device_id' => $id
            ]);
            
            return response()->json([
                'message' => 'Error deleting device',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:5120', // max 5MB
        ]);

        try {
            $file = $request->file('file');
            $filePath = $file->getRealPath();
            
            Log::info('Starting HPBOC import from file: ' . $file->getClientOriginalName());
            
            $import = new HpbocImport($filePath);
            Excel::import($import, $file);
            
            $stats = $import->getStats();
            
            Log::info('HPBOC import completed', $stats);
            
            if ($stats['failed'] > 0) {
                return redirect()->back()->with('warning', "Import selesai: {$stats['created']} data baru, {$stats['updated']} data diupdate, {$stats['failed']} baris dilewati. Pastikan Status (Baik/Rusak/Maintenance) dan Allocation (nama site) sudah benar.");
            }
            
            return redirect()->back()->with('success', "Import berhasil! {$stats['imported']} HPBOC diproses: {$stats['created']} data baru, {$stats['updated']} data diupdate.");
        } catch (\Exception $e) {
            Log::error('HPBOC import failed: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return redirect()->back()->with('error', 'Import gagal: ' . $e->getMessage());
        }
    }

    public function downloadTemplate()
    {
        return Excel::download(new HpbocTemplateExport(), 'template_hpboc.xlsx');
    }
}
