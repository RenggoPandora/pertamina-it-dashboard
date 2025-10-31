<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Imports\TicketImport;
use App\Exports\TicketTemplateExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $query = Ticket::query();

        // Filter berdasarkan tanggal jika ada
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $startDate = Carbon::parse($request->start_date)->startOfDay();
            $endDate = Carbon::parse($request->end_date)->endOfDay();
            $query->whereBetween('tanggal_pencatatan', [$startDate, $endDate]);
        }

        $tickets = $query->orderBy('tanggal_pencatatan', 'desc')->get();

        return Inertia::render('ticket/index', [
            'tickets' => $tickets,
            'filters' => $request->only(['start_date', 'end_date']),
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
            
            if ($stats['failed'] > 0) {
                return redirect()->back()->with('warning', "Import selesai: {$stats['created']} data baru, {$stats['updated']} data diupdate, {$stats['failed']} gagal.");
            }
            
            return redirect()->back()->with('success', "Import berhasil! {$stats['imported']} ticket diproses: {$stats['created']} data baru, {$stats['updated']} data diupdate.");
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
