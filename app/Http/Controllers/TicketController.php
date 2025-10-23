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
}
