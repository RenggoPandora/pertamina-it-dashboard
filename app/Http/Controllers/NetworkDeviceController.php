<?php

namespace App\Http\Controllers;

use App\Models\NetworkDevice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class NetworkDeviceController extends Controller
{
    public function index()
    {
        $networkDevices = NetworkDevice::all();
        
        return Inertia::render('network-device/index', [
            'networkDevices' => $networkDevices,
        ]);
    }

    public function create()
    {
        return Inertia::render('network-device/tambah');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ipv4',
            'tanggal_pencatatan' => 'required|date',
            'jenis' => 'required|in:switch,access point,network',
            'status' => 'required|in:up,down',
        ]);

        NetworkDevice::create($validated);

        return redirect()->route('networkdevice.index')->with('success', 'Perangkat jaringan berhasil ditambahkan.');
    }

    public function edit($id)
    {
        try {
            $networkDevice = NetworkDevice::find($id);
            
            if (!$networkDevice) {
                return redirect()->route('networkdevice.index')
                    ->with('error', 'Network Device tidak ditemukan.');
            }

            return Inertia::render('network-device/edit', [
                'networkDevice' => $networkDevice
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error loading Network Device edit page:', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            
            return redirect()->route('networkdevice.index')
                ->with('error', 'Terjadi kesalahan saat memuat data.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            Log::info('Update Network Device request:', [
                'id' => $id,
                'request_data' => $request->all()
            ]);

            $networkDevice = NetworkDevice::find($id);
            
            if (!$networkDevice) {
                Log::error('Network Device not found:', ['id' => $id]);
                return redirect()->back()->with('error', 'Network Device tidak ditemukan.');
            }

            $validated = $request->validate([
                'nama_perangkat' => 'required|string|max:255',
                'ip_address' => 'required|ipv4',
                'tanggal_pencatatan' => 'required|date',
                'jenis' => 'required|in:switch,access point,network',
                'status' => 'required|in:up,down',
            ]);

            $networkDevice->update($validated);

            Log::info('Network Device updated successfully:', [
                'id' => $networkDevice->id,
                'updated_data' => $validated
            ]);

            return redirect()->route('networkdevice.index')->with('success', 'Data berhasil diperbarui.');
            
        } catch (\Exception $e) {
            Log::error('Error updating Network Device:', [
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
    $networkDevice = NetworkDevice::find($id);

    if (!$networkDevice) {
        Log::error('Network device not found', ['id' => $id]);
        return response()->json(['message' => 'Device not found'], 404);
    }

    $networkDevice->delete();
    return redirect()->back()->with('success', 'Data berhasil dihapus.');
}
}
