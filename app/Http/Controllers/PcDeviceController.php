<?php

namespace App\Http\Controllers;

use App\Models\PcDevice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PcDeviceController extends Controller
{
    public function index()
    {
        $pcDevices = PcDevice::all();
        
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

        PcDevice::create($validated);

        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil ditambahkan.');
    }

    public function show(PcDevice $pcDevice)
    {
        return Inertia::render('pc-device/show', [
            'pcDevice' => $pcDevice,
        ]);
    }

    public function edit(PcDevice $pcDevice)
    {
        return Inertia::render('pc-device/edit', [
            'pcDevice' => $pcDevice,
        ]);
    }

    public function update(Request $request, PcDevice $pcDevice)
    {
        $validated = $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'alokasi' => 'required|in:MPS,SM5',
        ]);

        $pcDevice->update($validated);

        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil diperbarui.');
    }

    public function destroy(PcDevice $pcDevice)
    {
        $pcDevice->delete();

        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil dihapus.');
    }
}
