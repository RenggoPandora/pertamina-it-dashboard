<?php

namespace App\Http\Controllers;

use App\Models\Telephone;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\TelephoneImport;
use App\Exports\TelephoneExport;
use App\Exports\TelephoneTemplateExport;
use Illuminate\Support\Facades\Log;

class TelephoneController extends Controller
{
    public function index(Request $request)
    {
        $query = Telephone::with('site');
        
        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal_pencatatan', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal_pencatatan', '<=', $request->end_date);
        }
        
        $telephones = $query->get();

        return Inertia::render('telephone/index', [
            'telephones' => $telephones,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function create()
    {
        $sites = Site::all();

        return Inertia::render('telephone/tambah', [
            'sites' => $sites
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pic' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:on,off',
            'site_id' => 'required|exists:sites,id',
        ]);

        Telephone::create($validated);

        return redirect()->route('telephone.index')->with('success', 'Data Telephone berhasil ditambahkan.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        try {
            Excel::import(new TelephoneImport, $request->file('excel_file'));
            
            return redirect()->route('telephone.index')->with('success', 'Data Telephone berhasil diimport.');
        } catch (\Exception $e) {
            return redirect()->route('telephone.index')->with('error', 'Gagal mengimport data: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $telephone = Telephone::findOrFail($id);
        $sites = Site::all();

        return Inertia::render('telephone/edit', [
            'telephone' => $telephone,
            'sites' => $sites
        ]);
    }

    public function update(Request $request, $id)
    {
        $telephone = Telephone::findOrFail($id);

        $validated = $request->validate([
            'nama_pic' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:on,off',
            'site_id' => 'required|exists:sites,id',
        ]);

        $telephone->update($validated);

        return redirect()->route('telephone.index')->with('success', 'Data Telephone berhasil diperbarui.');
    }

    public function destroy($id)
    {
        try {
            $telephone = Telephone::find($id);

            if (!$telephone) {
                Log::error('Telephone not found', ['id' => $id]);
                return response()->json(['message' => 'Telephone not found'], 404);
            }

            $telephone->delete();
            return redirect()->back()->with('success', 'Data berhasil dihapus.');
            
        } catch (\Exception $e) {
            Log::error('Error deleting telephone:', [
                'error' => $e->getMessage(),
                'telephone_id' => $id
            ]);
            
            return response()->json([
                'message' => 'Error deleting telephone',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
