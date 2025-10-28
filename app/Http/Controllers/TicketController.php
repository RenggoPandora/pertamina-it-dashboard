<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Imports\TicketImport;
use App\Exports\TicketTemplateExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::all();
        return Inertia::render('ticket/index', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {

        return Inertia::render('ticket/tambah', [
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_fullname' => 'required|string|max:255',
            'assignee_name' => 'nullable|string|max:255',
            'summary' => 'required|string',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:assigned,closed,pending,resolved,completed',
        ]);

        Ticket::create($request->all());

        return redirect()->route('ticket.index')->with('success', 'Ticket created successfully.');
    }

    public function edit(Ticket $ticket)
    {
        return Inertia::render('ticket/edit', [
            'ticket' => $ticket
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $request->validate([
            'customer_fullname' => 'required|string|max:255',
            'assignee_name' => 'nullable|string|max:255',
            'summary' => 'required|string',
            'tanggal_pencatatan' => 'required|date',
            'status' => 'required|in:assigned,closed,pending,resolved,completed',
        ]);

        $ticket->update($request->all());

        return redirect()->route('ticket.index')->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->route('ticket.index')->with('success', 'Ticket deleted successfully.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:5120', // max 5MB
        ]);

        try {
            $file = $request->file('file');
            $filePath = $file->getRealPath();
            
            Log::info('Starting ticket import from file: ' . $file->getClientOriginalName());
            
            $import = new TicketImport($filePath);
            Excel::import($import, $file);
            
            $stats = $import->getStats();
            
            Log::info('Ticket import completed', $stats);
            
            return redirect()->back()->with('success', "Import berhasil! {$stats['imported']} ticket berhasil diimport, {$stats['failed']} gagal.");
        } catch (\Exception $e) {
            Log::error('Ticket import failed: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return redirect()->back()->with('error', 'Import gagal: ' . $e->getMessage());
        }
    }

    public function downloadTemplate()
    {
        return Excel::download(new TicketTemplateExport(), 'template_ticket.xlsx');
    }
}
