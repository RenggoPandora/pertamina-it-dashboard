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
<<<<<<< HEAD
        return Inertia::render('PcDevices/Create');
=======
        return Inertia::render('pc-device/tambah');
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }

    public function store(Request $request)
    {
<<<<<<< HEAD
        $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string',
=======
        $validated = $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string|max:255',
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'alokasi' => 'required|in:MPS,SM5',
        ]);

<<<<<<< HEAD
        PcDevice::create($request->all());

        return redirect()->route('pcdevices.index')->with('success', 'Perangkat berhasil ditambahkan.');
=======
        PcDevice::create($validated);

        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil ditambahkan.');
    }

    public function show(PcDevice $pcDevice)
    {
        return Inertia::render('pc-device/show', [
            'pcDevice' => $pcDevice,
        ]);
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }

    public function edit(PcDevice $pcDevice)
    {
<<<<<<< HEAD
        return Inertia::render('PcDevices/Edit', [
            'pcDevice' => $pcDevice
=======
        return Inertia::render('pc-device/edit', [
            'pcDevice' => $pcDevice,
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
        ]);
    }

    public function update(Request $request, PcDevice $pcDevice)
    {
<<<<<<< HEAD
        $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string',
=======
        $validated = $request->validate([
            'jenis' => 'required|in:desktop,notebook,printer',
            'nama_perangkat' => 'required|string|max:255',
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
            'jumlah' => 'required|integer|min:1',
            'tanggal_pencatatan' => 'required|date',
            'alokasi' => 'required|in:MPS,SM5',
        ]);

<<<<<<< HEAD
        $pcDevice->update($request->all());

        return redirect()->route('pcdevices.index')->with('success', 'Perangkat berhasil diperbarui.');
=======
        $pcDevice->update($validated);

        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil diperbarui.');
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }

    public function destroy(PcDevice $pcDevice)
    {
        $pcDevice->delete();

<<<<<<< HEAD
        return redirect()->route('pcdevices.index')->with('success', 'Perangkat berhasil dihapus.');
=======
        return redirect()->route('pcdevice.index')->with('success', 'PC Device berhasil dihapus.');
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }
}
