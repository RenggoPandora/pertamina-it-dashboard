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
        return Inertia::render('Hpboc/Create', ['sites' => $sites]);
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

        return redirect()->route('hpboc.index')->with('success', 'Data HPBOC berhasil ditambahkan.');
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

        return redirect()->route('hpboc.index')->with('success', 'Data HPBOC berhasil diperbarui.');
    }

    public function destroy(Hpboc $hpboc)
    {
        $hpboc->delete();
        return redirect()->route('hpboc.index')->with('success', 'Data HPBOC berhasil dihapus.');
    }
}
