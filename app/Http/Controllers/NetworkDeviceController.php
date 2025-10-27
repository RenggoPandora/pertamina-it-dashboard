<?php

namespace App\Http\Controllers;

use App\Models\NetworkDevice;
use App\Imports\NetworkDeviceImport;
use App\Exports\NetworkDeviceTemplateExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class NetworkDeviceController extends Controller
{
    public function index(Request $request)
    {
        $query = NetworkDevice::query();
        
        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal_pencatatan', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal_pencatatan', '<=', $request->end_date);
        }
        
        $networkDevices = $query->get();
        
        return Inertia::render('network-device/index', [
            'networkDevices' => $networkDevices,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('network-device/tambah');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_perangkat' => 'required|string|max:255',
            'ip_address' => 'required|ipv4',
            'tanggal_pencatatan' => 'required|date',
            'jenis' => 'required|in:switch,access point,network',
            'up' => 'required|string|max:255',
            'down' => 'required|string|max:255',
            'availability' => 'required|string|max:255',
        ]);

        NetworkDevice::create($validated);

        return redirect()->route('networkdevice.index')->with('success', 'Perangkat jaringan berhasil ditambahkan.');
    }

    public function edit($id)
    {
        try {
            $networkDevice = NetworkDevice::find($id);
            
            if (!$networkDevice) {
                return redirect()->route('networkdevice.index')
                    ->with('error', 'Network Device tidak ditemukan.');
            }

            return Inertia::render('network-device/edit', [
                'networkDevice' => $networkDevice
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error loading Network Device edit page:', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            
            return redirect()->route('networkdevice.index')
                ->with('error', 'Terjadi kesalahan saat memuat data.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            Log::info('Update Network Device request:', [
                'id' => $id,
                'request_data' => $request->all()
            ]);

            $networkDevice = NetworkDevice::find($id);
            
            if (!$networkDevice) {
                Log::error('Network Device not found:', ['id' => $id]);
                return redirect()->back()->with('error', 'Network Device tidak ditemukan.');
            }

            $validated = $request->validate([
                'nama_perangkat' => 'required|string|max:255',
                'ip_address' => 'required|ipv4',
                'tanggal_pencatatan' => 'required|date',
                'jenis' => 'required|in:switch,access point,network',
                'up' => 'required|string|max:255',
                'down' => 'required|string|max:255',
                'availability' => 'required|string|max:255',
            ]);

            $networkDevice->update($validated);

            Log::info('Network Device updated successfully:', [
                'id' => $networkDevice->id,
                'updated_data' => $validated
            ]);

            return redirect()->route('networkdevice.index')->with('success', 'Data berhasil diperbarui.');
            
        } catch (\Exception $e) {
            Log::error('Error updating Network Device:', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $networkDevice = NetworkDevice::find($id);

        if (!$networkDevice) {
            Log::error('Network device not found', ['id' => $id]);
            return response()->json(['message' => 'Device not found'], 404);
        }

        $networkDevice->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus.');
    }

    /**
     * Import Network Device dari Excel
     */
    public function import(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,xls|max:5120', // Max 5MB
        ]);

        try {
            $file = $request->file('excel_file');
            $filePath = $file->getRealPath();

            // Create import instance
            $import = new NetworkDeviceImport($filePath);
            
            // Import data
            Excel::import($import, $file);
            
            // Get statistics
            $stats = $import->getStats();
            
            if ($stats['failed'] > 0) {
                $errorMessage = "Import selesai dengan {$stats['success']} sukses dan {$stats['failed']} gagal. ";
                $errorMessage .= "Errors: " . implode(', ', array_slice($stats['errors'], 0, 3));
                
                return redirect()->back()->with('error', $errorMessage);
            }
            
            $successMessage = "Berhasil mengimport {$stats['success']} Network Device ({$stats['jenis']})";
            return redirect()->back()->with('success', $successMessage);
            
        } catch (\Exception $e) {
            Log::error('Network Device import error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    /**
     * Download template Excel untuk Network Device
     */
    public function downloadTemplate(Request $request)
    {
        // Default jenis adalah switch, bisa di-customize dari query parameter
        $jenis = $request->get('jenis', 'switch');
        
        // Validasi jenis
        if (!in_array($jenis, ['switch', 'network', 'access point'])) {
            $jenis = 'switch';
        }

        $fileName = 'network_device_template_' . str_replace(' ', '_', $jenis) . '_' . date('Y-m-d') . '.xlsx';
        
        return Excel::download(new NetworkDeviceTemplateExport($jenis), $fileName);
    }
}

