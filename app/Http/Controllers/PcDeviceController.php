<?php

namespace App\Http\Controllers;

use App\Models\PcDevice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PcDeviceController extends Controller
{
    public function index()
    {
        $pcDevices = PcDevice::orderBy('created_at', 'desc')->get();

        return Inertia::render('PcDevices/Index', [
            'pcDevices' => $pcDevices
        ]);
    }

    public function create()
    {
        return Inertia::render('PcDevices/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'alokasi' => 'required|in:MPS,SM5',
        ]);

        PcDevice::create($request->all());

        return redirect()->route('pcdevices.index')->with('success', 'Perangkat berhasil ditambahkan.');
    }

    public function edit(PcDevice $pcDevice)
    {
        return Inertia::render('PcDevices/Edit', [
            'pcDevice' => $pcDevice
        ]);
    }

    public function update(Request $request, PcDevice $pcDevice)
    {
        $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'alokasi' => 'required|in:MPS,SM5',
        ]);

        $pcDevice->update($request->all());

        return redirect()->route('pcdevices.index')->with('success', 'Perangkat berhasil diperbarui.');
    }

    public function destroy(PcDevice $pcDevice)
    {
        $pcDevice->delete();

        return redirect()->route('pcdevices.index')->with('success', 'Perangkat berhasil dihapus.');
    }
}
