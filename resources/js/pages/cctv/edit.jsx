import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/components/layouts/Layout';

export default function EditCctv({ cctv }) {
    const [showInfo, setShowInfo] = useState(false);

    // Format date function to convert ISO date to YYYY-MM-DD
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const { data, setData, put, processing, errors } = useForm({
        nama_perangkat: cctv.nama_perangkat,
        ip_address: cctv.ip_address,
        tanggal_pencatatan: formatDateForInput(cctv.tanggal_pencatatan),
        kepemilikan: cctv.kepemilikan,
        status: cctv.status,
        up: cctv.up || '',
        down: cctv.down || '',
        availability: cctv.availability || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('cctv.update', cctv.id));
    };

    return (
        <>
            <Head title="Edit CCTV - Pertamina IT Dashboard" />
            <Layout
                activeMenuItem="CCTV Availability"
                title="Edit CCTV"
                subtitle="Mengubah informasi kamera CCTV"
            >
                {/* Back Button */}
                <div className="mb-6">
                    <a
                        href={route('cctv.index')}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </a>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit CCTV</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Ubah informasi CCTV sesuai kebutuhan</p>
                        </div>
                        
                        {/* Info Button */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowInfo(!showInfo)}
                                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {showInfo && (
                                <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Informasi Penting
                                                </h3>
                                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <ul className="list-disc list-inside space-y-1">
                                                        <li>IP Address harus valid dan unik</li>
                                                        <li>Status menunjukkan kondisi terkini kamera</li>
                                                        <li>Kepemilikan menentukan jenis aset CCTV</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Nama Perangkat */}
                        <div>
                            <label htmlFor="nama_perangkat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nama Perangkat <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nama_perangkat"
                                value={data.nama_perangkat}
                                onChange={e => setData('nama_perangkat', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan nama perangkat"
                                required
                            />
                            {errors.nama_perangkat && (
                                <p className="mt-1 text-sm text-red-600">{errors.nama_perangkat}</p>
                            )}
                        </div>

                        {/* IP Address */}
                        <div>
                            <label htmlFor="ip_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                IP Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="ip_address"
                                value={data.ip_address}
                                onChange={e => setData('ip_address', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan alamat IP"
                                required
                            />
                            {errors.ip_address && (
                                <p className="mt-1 text-sm text-red-600">{errors.ip_address}</p>
                            )}
                        </div>

                        {/* Tanggal Pencatatan */}
                        <div>
                            <label htmlFor="tanggal_pencatatan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tanggal Pencatatan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="tanggal_pencatatan"
                                value={data.tanggal_pencatatan}
                                onChange={e => setData('tanggal_pencatatan', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.tanggal_pencatatan && (
                                <p className="mt-1 text-sm text-red-600">{errors.tanggal_pencatatan}</p>
                            )}
                        </div>

                        {/* Kepemilikan */}
                        <div>
                            <label htmlFor="kepemilikan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kepemilikan <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="kepemilikan"
                                value={data.kepemilikan}
                                onChange={e => setData('kepemilikan', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="asset">Asset</option>
                                <option value="sewa">Sewa</option>
                            </select>
                            {errors.kepemilikan && (
                                <p className="mt-1 text-sm text-red-600">{errors.kepemilikan}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                            )}
                        </div>

                        {/* Up */}
                        <div>
                            <label htmlFor="up" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Up (Waktu Aktif)
                            </label>
                            <input
                                type="text"
                                id="up"
                                value={data.up}
                                onChange={e => setData('up', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan waktu aktif (opsional)"
                            />
                            {errors.up && (
                                <p className="mt-1 text-sm text-red-600">{errors.up}</p>
                            )}
                        </div>

                        {/* Down */}
                        <div>
                            <label htmlFor="down" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Down (Waktu Tidak Aktif)
                            </label>
                            <input
                                type="text"
                                id="down"
                                value={data.down}
                                onChange={e => setData('down', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan waktu tidak aktif (opsional)"
                            />
                            {errors.down && (
                                <p className="mt-1 text-sm text-red-600">{errors.down}</p>
                            )}
                        </div>

                        {/* Availability */}
                        <div>
                            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Availability (Ketersediaan)
                            </label>
                            <input
                                type="text"
                                id="availability"
                                value={data.availability}
                                onChange={e => setData('availability', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan persentase ketersediaan (opsional)"
                            />
                            {errors.availability && (
                                <p className="mt-1 text-sm text-red-600">{errors.availability}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <a
                                href={route('cctv.index')}
                                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Batal
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </div>
                                ) : (
                                    'Simpan Perubahan'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
}