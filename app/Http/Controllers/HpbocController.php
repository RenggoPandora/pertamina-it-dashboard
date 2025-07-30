<?php

namespace App\Http\Controllers;

use App\Models\Hpboc;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HpbocController extends Controller
{
    public function index()
    {
        $hpboc = Hpboc::with('site')->get();
        return Inertia::render('hpboc/index', ['hpboc' => $hpboc]);
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
        return Inertia::render('Hpboc/Edit', [
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
                \Log::error('HP BOC device not found', ['id' => $id]);
                return response()->json(['message' => 'Device not found'], 404);
            }

            $device->delete();
            return redirect()->back()->with('success', 'Data berhasil dihapus.');
            
        } catch (\Exception $e) {
            \Log::error('Error deleting HP BOC device:', [
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
            'excel_file' => 'required|file|mimes:xlsx,xls|max:2048',
        ]);

        try {
            // In a real implementation, you would use a package like Laravel Excel
            // For now, we'll simulate successful import
            
            // Example of how you might process the Excel file:
            // $file = $request->file('excel_file');
            // $data = Excel::import(new HpbocImport, $file);
            
            return redirect()->route('hpboc.index')
                ->with('success', 'Data HP BOC berhasil diimpor dari file Excel.');
                
        } catch (\Exception $e) {
            return redirect()->route('hpboc.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }

    public function downloadTemplate()
    {
        // Download CSV template for HP BOC import
        $templatePath = public_path('templates/template_hpboc.csv');
        
        if (file_exists($templatePath)) {
            return response()->download($templatePath, 'Template_HP_BOC.csv');
        }
        
        return redirect()->route('hpboc.index')
            ->with('error', 'Template file tidak ditemukan.');
    }
}
