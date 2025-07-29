<?php

namespace App\Http\Controllers;

use App\Models\NetworkDevice;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'jenis' => 'required|in:switch,access point',
            'status' => 'required|in:up,down',
        ]);

        NetworkDevice::create($validated);

        return redirect()->route('networkdevice.index')->with('success', 'Perangkat jaringan berhasil ditambahkan.');
    }

    public function update(Request $request, NetworkDevice $networkDevice)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ipv4',
            'tanggal_pencatatan' => 'required|date',
            'jenis' => 'required|in:switch,access point',
            'status' => 'required|in:up,down',
        ]);

        $networkDevice->update($validated);

        return redirect()->back()->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(NetworkDevice $networkDevice)
    {
        $networkDevice->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus.');
    }
}
