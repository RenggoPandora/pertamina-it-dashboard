import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Layout from '@/components/Layouts/Layout';

export default function NetworkDevice({ networkDevices, flash }) {
    // Use the data passed from the Laravel controller
    const devices = networkDevices || [];
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const openDeleteModal = (device) => {
        setSelectedDevice(device);
        setShowDeleteModal(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setIsDeleting(true);
        setDeleteError(null);

        if (!selectedDevice?.id) {
            setDeleteError('Invalid device ID');
            setIsDeleting(false);
            return;
        }

        // Debug logs
        console.log('Delete request details:', {
            deviceId: selectedDevice.id,
            url: route('networkdevice.destroy', selectedDevice.id)
        });

        router.delete(route('networkdevice.destroy', selectedDevice.id), {
            onSuccess: () => {
                console.log('Delete success');
                setShowDeleteModal(false);
                setSelectedDevice(null);
                setIsDeleting(false);
            },
            onError: (error) => {
                console.error('Delete failed:', error);
                const errorMessage = error?.response?.data?.message || 'Failed to delete device';
                setDeleteError(errorMessage);
                setIsDeleting(false);
            },
            preserveScroll: true
        });
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
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Devices</h3>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{devices.length}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Semua perangkat jaringan</p>
                            </div>
                        </div>
                    </div>

                    {/* Average Uptime Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Rata-rata Uptime</h3>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                                    {devices.length > 0 
                                        ? (devices.reduce((sum, d) => sum + (parseFloat(d.availability) || 0), 0) / devices.length).toFixed(2)
                                        : '0.00'}%
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Availability perangkat</p>
                            </div>
                        </div>
                    </div>

                    {/* Devices Down Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Devices Down</h3>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                                    {devices.filter(d => d.availability === '0' || d.availability === 0).length}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Perangkat offline</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Device Types Grid - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Switch */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Switch</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                                    {devices.filter(d => d.jenis === 'switch').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Access Point */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Access Point</p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                                    {devices.filter(d => d.jenis === 'access point').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Network */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Network</p>
                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                                    {devices.filter(d => d.jenis === 'network').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
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
                                                Up Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Down Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Availability (%)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Kepemilikan
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {device.up || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {device.down || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {(() => {
                                                        const availability = parseFloat(device.availability);
                                                        let availabilityColor = 'text-gray-500';
                                                        let availabilityBgColor = 'bg-gray-100 dark:bg-gray-700';
                                                        
                                                        if (!isNaN(availability)) {
                                                            if (availability >= 95) {
                                                                availabilityColor = 'text-green-800 dark:text-green-400';
                                                                availabilityBgColor = 'bg-green-100 dark:bg-green-800/20';
                                                            } else if (availability >= 80) {
                                                                availabilityColor = 'text-yellow-800 dark:text-yellow-400';
                                                                availabilityBgColor = 'bg-yellow-100 dark:bg-yellow-800/20';
                                                            } else {
                                                                availabilityColor = 'text-red-800 dark:text-red-400';
                                                                availabilityBgColor = 'bg-red-100 dark:bg-red-800/20';
                                                            }
                                                        }

                                                        return (
                                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${availabilityBgColor} ${availabilityColor}`}>
                                                                {device.availability ? `${device.availability}%` : '-'}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        device.kepemilikan === 'asset' 
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                                                            : 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400'
                                                    }`}>
                                                        {device.kepemilikan === 'asset' ? 'Asset' : 'Sewa'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(device.tanggal_pencatatan).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <a
                                                        href={route('networkdevice.edit', device.id)}
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

                {/* Konfirmasi Hapus Modal */}
                {showDeleteModal && selectedDevice && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowDeleteModal(false)}></div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 max-w-md w-full p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Hapus Network Device</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Apakah Anda yakin ingin menghapus perangkat <strong>{selectedDevice.nama_perangkat}</strong>?
                                        <br />
                                        IP Address: <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">{selectedDevice.ip_address}</code>
                                        <br />
                                        Jenis: <span className="font-medium">{selectedDevice.jenis}</span>
                                        <br />
                                        Tindakan ini tidak dapat dibatalkan.
                                    </p>
                                </div>
                            </div>

                            {deleteError && (
                                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                                    <p className="text-sm text-red-600 dark:text-red-400">{deleteError}</p>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    disabled={isDeleting}
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center"
                                >
                                    {isDeleting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menghapus...
                                        </>
                                    ) : (
                                        'Hapus'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </>
    );
}
