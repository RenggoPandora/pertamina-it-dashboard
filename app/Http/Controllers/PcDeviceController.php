<?php

namespace App\Http\Controllers;

use App\Models\PCDevice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PCDeviceController extends Controller
{
    public function index()
    {
        $pcDevices = PCDevice::all();
        
        return Inertia::render('pc-device/index', [
            'pcDevices' => $pcDevices,
        ]);
    }

    public function create()
    {
        return Inertia::render('pc-device/tambah');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'alokasi' => 'required|in:MPS,SM5',
        ]);

        PCDevice::create($validated);

        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil ditambahkan.');
    }

    public function show(PCDevice $pcDevice)
    {
        return Inertia::render('pc-device/show', [
            'pcDevice' => $pcDevice,
        ]);
    }

    public function edit($id)
    {
        try {
            $pcDevice = PCDevice::find($id);
            
            if (!$pcDevice) {
                return redirect()->route('pcdevice.index')
                    ->with('error', 'PC Device tidak ditemukan.');
            }

            return Inertia::render('pc-device/edit', [
                'pcDevice' => $pcDevice
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error loading PC Device edit page:', [
            'id' => $id,
                'error' => $e->getMessage()
            ]);
            
            return redirect()->route('pcdevice.index')
                ->with('error', 'Terjadi kesalahan saat memuat data.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            Log::info('Update PC Device request:', [
                'id' => $id,
                'request_data' => $request->all()
            ]);

            $pcDevice = PCDevice::find($id);
            
            if (!$pcDevice) {
                Log::error('PC Device not found:', ['id' => $id]);
                return redirect()->back()->with('error', 'PC Device tidak ditemukan.');
            }

            // Log data sebelum update
            Log::info('Data sebelum update:', [
                'id' => $id,
                'old_data' => $pcDevice->toArray()
            ]);

            $validated = $request->validate([
                'nama_perangkat' => 'required|string|max:255',
                'jenis' => 'required|in:desktop,notebook,printer',
                'jumlah' => 'required|integer|min:1',
                'alokasi' => 'required|in:MPS,SM5',
                'tanggal_pencatatan' => 'required|date',
            ]);

            Log::info('Data yang divalidasi:', $validated);

            $pcDevice->update($validated);

            // Log data setelah update
            Log::info('Update berhasil:', [
                'id' => $id,
                'new_data' => $pcDevice->fresh()->toArray()
            ]);

            return redirect()->route('pcdevice.index')->with('success', 'Data berhasil diperbarui.');
            
        } catch (\Exception $e) {
            Log::error('Error updating PC Device:', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $pcDevice = PCDevice::find($id);

        if (!$pcDevice) {
            Log::error('PC device not found', ['id' => $id]);
            return response()->json(['message' => 'PC Device not found'], 404);
        }

        $pcDevice->delete();
        return redirect()->back()->with('success', 'PC Device berhasil dihapus.');
    }
}




