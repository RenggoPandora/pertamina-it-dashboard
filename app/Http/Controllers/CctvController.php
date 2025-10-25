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

    public function readiness()
    {
        $cctvs = Cctv::all();
        
        return Inertia::render('cctv/readiness', [
            'cctvs' => $cctvs,
        ]);
    }

    public function create()
    {
        return Inertia::render('cctv/tambah');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan' => 'required|in:asset,sewa',
            'status' => 'required|in:online,offline',
            'up' => 'nullable|string',
            'down' => 'nullable|string',
            'availability' => 'nullable|string',
        ]);

        // Jika availability = 0, maka status harus offline
        if (isset($validated['availability']) && $validated['availability'] == '0') {
            $validated['status'] = 'offline';
        }

        Cctv::create($validated);

        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil ditambahkan.');
    }

    public function show(Cctv $cctv)
    {
        return Inertia::render('cctv/show', [
            'cctv' => $cctv,
        ]);
    }

    public function edit(Cctv $cctv)
    {
        return Inertia::render('cctv/edit', [
            'cctv' => $cctv,
        ]);
    }

    public function update(Request $request, Cctv $cctv)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'tanggal_pencatatan' => 'required|date',
            'kepemilikan' => 'required|in:asset,sewa',
            'status' => 'required|in:online,offline',
            'up' => 'nullable|string',
            'down' => 'nullable|string',
            'availability' => 'nullable|string',
        ]);

        // Jika availability = 0, maka status harus offline
        if (isset($validated['availability']) && $validated['availability'] == '0') {
            $validated['status'] = 'offline';
        }

        $cctv->update($validated);

        return redirect()->route('cctv.index')->with('success', 'Data CCTV berhasil diperbarui.');
    }

    public function destroy(Cctv $cctv)
    {
        $cctv->delete();

        return redirect()->route('cctv.index')->with('success', 'CCTV berhasil dihapus.');
    }
}
