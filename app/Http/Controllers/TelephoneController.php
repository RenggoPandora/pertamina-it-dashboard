<?php

namespace App\Http\Controllers;

use App\Models\Telephone;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TelephoneController extends Controller
{
    public function index()
    {
        $telephones = Telephone::with('site')->get();

        return Inertia::render('telephone/index', [
            'telephones' => $telephones
        ]);
    }

    public function create()
    {
        $sites = Site::all();

        return Inertia::render('telephone/create', [
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

    public function edit($id)
    {
        $telephone = Telephone::findOrFail($id);
        $sites = Site::all();

        return Inertia::render('Telephone/Edit', [
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
        $telephone = Telephone::findOrFail($id);
        $telephone->delete();

        return redirect()->route('telephone.index')->with('success', 'Data Telephone berhasil dihapus.');
    }
}
