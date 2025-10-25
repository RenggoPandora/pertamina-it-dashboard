import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Layout from '@/components/layouts/Layout';
import DateRangeFilter from '@/components/DateRangeFilter';

export default function CCTV({ cctvs = [], filters }) {
    const [cameras, setCameras] = useState(cctvs);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCctv, setSelectedCctv] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Handle date range filter
    const handleDateFilter = ({ startDate, endDate }) => {
        router.get(route('cctv.index'), {
            start_date: startDate,
            end_date: endDate
        }, {
            preserveScroll: true
        });
    };

    const openDeleteModal = (cctv) => {
        setSelectedCctv(cctv);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedCctv(null);
    };

    const handleDelete = () => {
        if (selectedCctv) {
            router.delete(route('cctv.destroy', selectedCctv.id), {
                onSuccess: () => {
                    closeDeleteModal();
                },
            });
        }
    };

    const openUploadModal = () => {
        setShowUploadModal(true);
    };

    const closeUploadModal = () => {
        setShowUploadModal(false);
    };

    return (
        <>
            <Head title="CCTV Availability - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="CCTV Availability" 
                title="CCTV Availability"
                subtitle="Manage and monitor surveillance camera availability"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total CCTV</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{cameras.length}</p>
                        <p className="text-xs text-gray-500">Semua kamera</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Online</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {cameras.filter(c => c.status === 'online').length}
                        </p>
                        <p className="text-xs text-gray-500">Sedang online</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Offline</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {cameras.filter(c => c.status === 'offline').length}
                        </p>
                        <p className="text-xs text-gray-500">Sedang offline</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Kepemilikan</h3>
                        <div className="flex justify-between items-center">
                            {/* Asset Section */}
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">
                                    {cameras.filter(c => c.kepemilikan === 'asset').length}
                                </p>
                                <p className="text-xs text-gray-500">Asset</p>
                            </div>
                            
                            {/* Vertical Border Separator */}
                            <div className="h-12 w-px bg-gray-200 dark:bg-gray-600"></div>
                            
                            {/* Sewa Section */}
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">
                                    {cameras.filter(c => c.kepemilikan === 'sewa').length}
                                </p>
                                <p className="text-xs text-gray-500">Sewa</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Camera List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daftar CCTV</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {filters?.start_date && filters?.end_date 
                                    ? `Menampilkan data dari ${new Date(filters.start_date).toLocaleDateString('id-ID')} - ${new Date(filters.end_date).toLocaleDateString('id-ID')}`
                                    : 'Kelola data kamera CCTV'
                                }
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <DateRangeFilter 
                                onFilter={handleDateFilter}
                                defaultStartDate={filters?.start_date || ''}
                                defaultEndDate={filters?.end_date || ''}
                            />
                            <button
                                onClick={openUploadModal}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Upload Excel
                            </button>
                            <a
                                href={route('cctv.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah CCTV
                            </a>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {cameras.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                <div className="text-6xl mb-4">📹</div>
                                <p className="text-xl mb-2">Tidak ada CCTV ditemukan</p>
                                <p>Tambahkan CCTV pertama Anda untuk memulai.</p>
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
                                                Status
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
                                        {cameras.map((camera) => (
                                            <tr key={camera.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {camera.nama_perangkat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                                                        {camera.ip_address}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        camera.status === 'online' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                                    }`}>
                                                        {camera.status === 'online' ? 'Online' : 'Offline'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        camera.kepemilikan === 'asset' 
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                                                            : 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400'
                                                    }`}>
                                                        {camera.kepemilikan === 'asset' ? 'Asset' : 'Sewa'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(camera.tanggal_pencatatan).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <a 
                                                        href={route('cctv.edit', camera.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                    >
                                                        Ubah
                                                    </a>
                                                    <button
                                                        onClick={() => openDeleteModal(camera)}
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

                {/* Upload Excel Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div 
                                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
                                onClick={closeUploadModal}
                            ></div>

                            {/* Modal panel */}
                            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                                Upload Excel CCTV
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Fitur upload Excel untuk import data CCTV secara massal.
                                                </p>
                                            </div>
                                            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                                            Fitur Belum Tersedia
                                                        </h3>
                                                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                                            <p>Fitur upload Excel untuk CCTV masih dalam pengembangan.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={closeUploadModal}
                                        className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div 
                                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
                                onClick={closeDeleteModal}
                            ></div>

                            {/* Modal panel */}
                            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                                Hapus CCTV
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Apakah Anda yakin ingin menghapus CCTV <span className="font-semibold">{selectedCctv?.nama_perangkat}</span>? 
                                                    Tindakan ini tidak dapat dibatalkan.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Hapus
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeDeleteModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </>
    );
}
