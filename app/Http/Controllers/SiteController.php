<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function index()
    {
        $sites = Site::all();
        return Inertia::render('Site/Index', ['sites' => $sites]);
    }

    public function create()
    {
        return Inertia::render('Site/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'lokasi' => 'required|string|max:255',
        ]);

        Site::create($request->all());

        return redirect()->route('site.index')->with('success', 'Site berhasil ditambahkan.');
    }

    public function edit(Site $site)
    {
        return Inertia::render('Site/Edit', ['site' => $site]);
    }

    public function update(Request $request, Site $site)
    {
        $request->validate([
            'lokasi' => 'required|string|max:255',
        ]);

        $site->update($request->all());

        return redirect()->route('site.index')->with('success', 'Site berhasil diperbarui.');
    }

    public function destroy(Site $site)
    {
        $site->delete();
        return redirect()->route('site.index')->with('success', 'Site berhasil dihapus.');
    }
}
