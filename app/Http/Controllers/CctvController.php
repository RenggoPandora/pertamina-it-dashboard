<?php

namespace App\Http\Controllers;

use App\Models\Cctv;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CctvController extends Controller
{
    public function index()
    {
        $cctvs = Cctv::all();
        
        return Inertia::render('cctv/index', [
            'cctvs' => $cctvs,
        ]);
    }

    public function create()
    {
<<<<<<< HEAD
        return Inertia::render('Cctv/Create');
=======
        return Inertia::render('cctv/tambah');
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
<<<<<<< HEAD
            'nama_perangkat'     => 'required|string|max:255',
            'ip_address'         => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan'        => 'required|in:asset,sewa',
            'status'             => 'required|in:online,offline',
=======
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan' => 'required|in:asset,sewa',
            'status' => 'required|in:online,offline',
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
        ]);

        Cctv::create($validated);

<<<<<<< HEAD
        return redirect()->route('cctv.index')->with('success', 'Data CCTV berhasil ditambahkan.');
=======
        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil ditambahkan.');
    }

    public function show(Cctv $cctv)
    {
        return Inertia::render('cctv/show', [
            'cctv' => $cctv,
        ]);
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }

    public function edit(Cctv $cctv)
    {
<<<<<<< HEAD
        return Inertia::render('Cctv/Edit', [
=======
        return Inertia::render('cctv/edit', [
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
            'cctv' => $cctv,
        ]);
    }

    public function update(Request $request, Cctv $cctv)
    {
        $validated = $request->validate([
<<<<<<< HEAD
            'nama_perangkat'     => 'required|string|max:255',
            'ip_address'         => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan'        => 'required|in:asset,sewa',
            'status'             => 'required|in:online,offline',
=======
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan' => 'required|in:asset,sewa',
            'status' => 'required|in:online,offline',
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
        ]);

        $cctv->update($validated);

<<<<<<< HEAD
        return redirect()->route('cctv.index')->with('success', 'Data CCTV berhasil diperbarui.');
=======
        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil diperbarui.');
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }

    public function destroy(Cctv $cctv)
    {
        $cctv->delete();

<<<<<<< HEAD
        return redirect()->route('cctv.index')->with('success', 'Data CCTV berhasil dihapus.');
=======
        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil dihapus.');
>>>>>>> 0d161fb3331874f22af1f6c09c13b666ae7ba9f9
    }
}
