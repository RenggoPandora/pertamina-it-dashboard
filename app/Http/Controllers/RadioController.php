<?php

namespace App\Http\Controllers;

use App\Models\Radio;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RadioController extends Controller
{
    public function index()
    {
        $radio = Radio::with('site')->latest()->get();
        return Inertia::render('Radio/Index', [
            'radio' => $radio
        ]);
    }

    public function create()
    {
        $sites = Site::all();
        return Inertia::render('Radio/Create', [
            'sites' => $sites
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:on,off',
            'site_id' => 'required|exists:sites,id',
        ]);

        Radio::create($request->all());

        return redirect()->route('radio.index')->with('success', 'Data radio berhasil ditambahkan.');
    }

    public function edit(Radio $radio)
    {
        $sites = Site::all();
        return Inertia::render('Radio/Edit', [
            'radio' => $radio,
            'sites' => $sites
        ]);
    }

    public function update(Request $request, Radio $radio)
    {
        $request->validate([
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:on,off',
            'site_id' => 'required|exists:sites,id',
        ]);

        $radio->update($request->all());

        return redirect()->route('radio.index')->with('success', 'Data radio berhasil diperbarui.');
    }

    public function destroy(Radio $radio)
    {
        $radio->delete();

        return redirect()->route('radio.index')->with('success', 'Data radio berhasil dihapus.');
    }
}
