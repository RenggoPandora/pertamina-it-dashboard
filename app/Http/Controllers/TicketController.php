<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'support_company' => 'required|string|max:255',
            'req_number' => 'required|string|max:255',
            'status' => 'required|in:closed,completed,pending,rejected,resolved',
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
            'support_company' => 'required|string|max:255',
            'req_number' => 'required|string|max:255',
            'status' => 'required|in:closed,completed,pending,rejected,resolved',
        ]);

        $ticket->update($request->all());

        return redirect()->route('ticket.index')->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->route('ticket.index')->with('success', 'Ticket deleted successfully.');
    }
}
