import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/components/Layouts/Layout';

export default function NetworkDevice({ networkDevices, flash }) {
    // Use the data passed from the Laravel controller
    const devices = networkDevices || [];
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        excel_file: null,
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            setData('excel_file', file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && (file.type.includes('excel') || file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            setUploadedFile(file);
            setData('excel_file', file);
        }
    };

    const openUploadModal = () => {
        setShowUploadModal(true);
    };

    const handleUploadConfirm = () => {
        // Mock function - tidak ada implementasi import
        alert('Fitur import belum tersedia');
        setShowUploadModal(false);
        setUploadedFile(null);
        reset();
    };

    const handleUploadCancel = () => {
        setShowUploadModal(false);
        setUploadedFile(null);
        reset();
    };

    return (
        <>
            <Head title="Network Device - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="Network Device" 
                title="Manajemen Network Device"
                subtitle="Kelola dan pantau perangkat infrastruktur jaringan"
            >
                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                    {flash.success}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {flash?.error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                    {flash.error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Grid - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Devices Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-32">
                        <div className="flex items-center h-full">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Devices</h3>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{devices.length}</p>
                                <p className="text-xs text-gray-500 mt-1">Semua perangkat jaringan</p>
                            </div>
                        </div>
                    </div>

                    {/* Device Types Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-32">
                        <div className="flex items-center mb-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l2 2-2 2M5 13l-2-2 2-2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Jenis Perangkat</h3>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                            {/* Switch */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                                    <span className="text-xs text-gray-700 dark:text-gray-300">Switches</span>
                                </div>
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                    {devices.filter(d => d.jenis === 'switch').length}
                                </span>
                            </div>

                            {/* Access Points */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-1">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                                    <span className="text-xs text-gray-700 dark:text-gray-300">Access Point</span>
                                </div>
                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                    {devices.filter(d => d.jenis === 'access point').length}
                                </span>
                            </div>

                            {/* Network */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-1">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-1"></div>
                                    <span className="text-xs text-gray-700 dark:text-gray-300">Network</span>
                                </div>
                                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                    {devices.filter(d => d.jenis === 'network').length}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-32">
                        <div className="flex items-center mb-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Status Perangkat</h3>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {/* Status Up */}
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <img src="/icons/up.png" className="w-6 h-6 mr-1" alt="Up" />
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {devices.filter(d => d.status === 'up').length}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">Online</p>
                            </div>
                            
                            {/* Status Down */}
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <img src="/icons/down.png" className="w-6 h-6 mr-1" alt="Down" />
                                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                                        {devices.filter(d => d.status === 'down').length}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">Offline</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Device Inventory */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daftar Perangkat Network Device</h3>
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
                                href={route('networkdevice.create')}
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
                                <div className="text-6xl mb-4">🌐</div>
                                <p className="text-xl mb-2">Tidak ada perangkat Network Device ditemukan</p>
                                <p>Tambahkan perangkat pertama Anda untuk memulai.</p>
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
                                                IP Address
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Jenis
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {device.ip_address}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {(() => {
                                                        let label = 'Network';
                                                        let colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400';

                                                        if (device.jenis === 'switch') {
                                                            label = 'Switch';
                                                            colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
                                                        } else if (device.jenis === 'access point') {
                                                            label = 'Access Point';
                                                        }

                                                        return (
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                                                                {label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        device.status === 'up' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                                    }`}>
                                                        {device.status === 'up' ? 'Up' : 'Down'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(device.tanggal_pencatatan).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                                                        Ubah
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
                                    Upload File Network Device
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
            </Layout>
        </>
    );
}
