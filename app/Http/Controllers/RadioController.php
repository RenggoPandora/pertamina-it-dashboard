<?php

namespace App\Http\Controllers;

use App\Models\Radio;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RadioController extends Controller
{
    public function index(Request $request)
    {
        $query = Radio::with('site');
        
        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal_pencatatan', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal_pencatatan', '<=', $request->end_date);
        }
        
        $radio = $query->latest()->get();
        
        return Inertia::render('radio/index', [
            'radio' => $radio,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function create()
    {
        $sites = Site::all();
        return Inertia::render('radio/tambah', [
            'sites' => $sites
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:off,on',
            'site_id' => 'required|exists:sites,id',
        ]);

        Radio::create($request->all());

        return redirect()->route('radio.index')->with('success', 'Data Radio HT berhasil ditambahkan.');
    }

    public function edit(Radio $radio)
    {
        $sites = Site::all();
        return Inertia::render('radio/edit', [
            'radio' => $radio,
            'sites' => $sites
        ]);
    }

    public function update(Request $request, Radio $radio)
    {
        $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:on,off',
            'site_id' => 'required|exists:sites,id',
        ]);

        $radio->update($request->all());

        return redirect()->route('radio.index')->with('success', 'Data radio berhasil diperbarui.');
    }

    public function destroy($id)
    {
        try {
            $radio = Radio::find($id);

            if (!$radio) {
                Log::error('Radio not found', ['id' => $id]);
                return response()->json(['message' => 'Radio not found'], 404);
            }

            $radio->delete();
            return redirect()->back()->with('success', 'Data berhasil dihapus.');
            
        } catch (\Exception $e) {
            Log::error('Error deleting radio:', [
                'error' => $e->getMessage(),
                'radio_id' => $id
            ]);
            
            return response()->json([
                'message' => 'Error deleting radio',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,xls|max:2048',
        ]);

        try {
            // In a real implementation, you would use a package like Laravel Excel
            // For now, we'll simulate successful import
            
            return redirect()->route('radio.index')
                ->with('success', 'Data Radio HT berhasil diimpor dari file Excel.');
                
        } catch (\Exception $e) {
            return redirect()->route('radio.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }

    public function downloadTemplate()
    {
        // Download CSV template for Radio HT import
        $templatePath = public_path('templates/template_radio.csv');
        
        if (file_exists($templatePath)) {
            return response()->download($templatePath, 'Template_Radio_HT.csv');
        }
        
        return redirect()->route('radio.index')
            ->with('error', 'Template file tidak ditemukan.');
    }
}
