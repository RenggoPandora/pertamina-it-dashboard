import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react'; // Tambahkan router
import Layout from '@/components/layouts/Layout';

export default function PCDevice({ pcDevices = [] }) {
    const [devices, setDevices] = useState(pcDevices);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const openUploadModal = () => {
        setShowUploadModal(true);
    };

    const handleUploadCancel = () => {
        setShowUploadModal(false);
        setUploadedFile(null);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            setUploadedFile(files[0]);
        }
    };

    const handleUploadConfirm = () => {
        if (uploadedFile) {
            setProcessing(true);
            // Mock processing
            setTimeout(() => {
                setProcessing(false);
                setShowUploadModal(false);
                setUploadedFile(null);
                alert('Import belum tersedia untuk PC Device');
            }, 2000);
        }
    };

    const openDeleteModal = (device) => {
        setSelectedDevice(device);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (!selectedDevice) return;

        router.delete(route('pcdevice.destroy', selectedDevice.id), {
            onSuccess: () => {
                // Refresh halaman setelah hapus berhasil
                router.visit(route('pcdevice.index'), {
                    preserveScroll: true,
                });
                setShowDeleteModal(false);
                setSelectedDevice(null);
            },
            onError: (errors) => {
                console.error('Delete failed:', errors);
                alert('Gagal menghapus data');
            }
        });
    };

    return (
        <>
            <Head title="PC Device - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="PC Device" 
                title="PC Device Management"
                subtitle="Manage and monitor computer systems and workstations"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total PC Device</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.reduce((sum, d) => sum + (d.jumlah || 0), 0)}</p>
                        <p className="text-xs text-gray-500">Semua perangkat</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Desktop</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {devices.filter(d => d.jenis === 'desktop').reduce((sum, d) => sum + (d.jumlah || 0), 0)}
                        </p>
                        <p className="text-xs text-gray-500">Komputer desktop</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Notebook</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {devices.filter(d => d.jenis === 'notebook').reduce((sum, d) => sum + (d.jumlah || 0), 0)}
                        </p>
                        <p className="text-xs text-gray-500">Laptop/notebook</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Printer</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {devices.filter(d => d.jenis === 'printer').reduce((sum, d) => sum + (d.jumlah || 0), 0)}
                        </p>
                        <p className="text-xs text-gray-500">Perangkat printer</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Alokasi</h3>
                        <div className="flex justify-between items-center">
                            {/* MPS Section */}
                            <div className="text-center">
                                <p className="text-2xl font-bold text-indigo-600">
                                    {devices.filter(d => d.alokasi === 'MPS').reduce((sum, d) => sum + (d.jumlah || 0), 0)}
                                </p>
                                <p className="text-xs text-gray-500">MPS</p>
                            </div>
                            
                            {/* Vertical Border Separator */}
                            <div className="h-12 w-px bg-gray-200 dark:bg-gray-600"></div>
                            
                            {/* SM5 Section */}
                            <div className="text-center">
                                <p className="text-2xl font-bold text-orange-600">
                                    {devices.filter(d => d.alokasi === 'SM5').reduce((sum, d) => sum + (d.jumlah || 0), 0)}
                                </p>
                                <p className="text-xs text-gray-500">SM5</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Device Inventory */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daftar PC Device</h3>
                        <div className="flex space-x-3">
                            {/* Upload Excel Button (Mock) */}
                            <button
                                onClick={openUploadModal}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Upload Excel
                            </button>
                            
                            {/* Add New Device Button */}
                            <a
                                href={route('pcdevice.create')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Perangkat
                            </a>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {devices.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                <div className="text-6xl mb-4">💻</div>
                                <p className="text-xl mb-2">Tidak ada PC Device ditemukan</p>
                                <p>Tambahkan device pertama Anda untuk memulai.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Nama Perangkat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Jenis
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Alokasi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Tanggal Pencatatan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {devices.map((device) => (
                                            <tr key={device.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {device.nama_perangkat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        device.jenis === 'desktop' 
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                                                            : device.jenis === 'notebook'
                                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400'
                                                            : 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                                    }`}>
                                                        {device.jenis === 'desktop' ? 'Desktop' : device.jenis === 'notebook' ? 'Notebook' : 'Printer'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    <span className="font-medium text-lg text-gray-900 dark:text-white">
                                                        {device.jumlah}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        device.alokasi === 'MPS' 
                                                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/20 dark:text-indigo-400'
                                                            : 'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400'
                                                    }`}>
                                                        {device.alokasi}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(device.tanggal_pencatatan).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <a 
                                                        href={route('pcdevice.edit', device.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                    >
                                                        Ubah
                                                    </a>
                                                    <button
                                                        onClick={() => openDeleteModal(device)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload Excel Modal (Mock - No Import Function) */}
                {showUploadModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                        <div className="relative bg-white dark:bg-gray-800 p-6 border w-96 shadow-lg rounded-lg">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Upload File PC Device
                                </h3>
                                <button
                                    onClick={handleUploadCancel}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Upload Area */}
                            <div 
                                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-400 transition-colors"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                {uploadedFile ? (
                                    <div className="space-y-2">
                                        <div className="text-green-500">
                                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {uploadedFile.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {(uploadedFile.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="text-gray-400">
                                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <label className="cursor-pointer">
                                                <span className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                    Click to upload
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400"> or drag and drop</span>
                                                <input
                                                    type="file"
                                                    accept=".xlsx,.xls"
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            .xlsx (max. 500MB)
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleUploadCancel}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUploadConfirm}
                                    disabled={!uploadedFile || processing}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {processing ? 'Processing...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedDevice && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowDeleteModal(false)}></div>
                        <div className="bg-white rounded-lg shadow-lg z-50 max-w-md w-full p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Hapus PC Device</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Apakah Anda yakin ingin menghapus {selectedDevice.nama_perangkat}? 
                                        <br />
                                        Jenis: <span className="font-medium">{selectedDevice.jenis}</span>
                                        <br />
                                        Jumlah: <span className="font-medium">{selectedDevice.jumlah}</span>
                                        <br />
                                        Tindakan ini tidak dapat dibatalkan.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedDevice(null);
                                    }}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
            </Layout>
        </>
    );
}
