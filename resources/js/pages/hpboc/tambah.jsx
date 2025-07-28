import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function TambahHPBOC({ sites }) {
    const [showInfo, setShowInfo] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_perangkat: '',
        jumlah: '',
        tanggal_pencatatan: '',
        status: 'baik',
        site_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('hpboc.store'), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                // Error handling is done automatically by Inertia
            },
        });
    };

    return (
        <>
            <Head title="Tambah HP BOC - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="HPBOC" 
                title="Tambah HP BOC"
                subtitle="Menambahkan perangkat HP BOC baru"
            >
                {/* Back Button */}
                <div className="mb-6">
                    <a
                        href={route('hpboc.index')}
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
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Formulir Tambah HP BOC</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Isi semua informasi yang diperlukan untuk menambahkan perangkat HP BOC baru</p>
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
                            
                            {/* Information Tooltip */}
                            {showInfo && (
                                <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transform animate-in slide-in-from-right-2">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Informasi Penting
                                                    </h3>
                                                    <button
                                                        onClick={() => setShowInfo(false)}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                                    <ul className="list-disc list-inside space-y-1">
                                                        <li>Pastikan semua data yang diisi sudah benar sebelum menyimpan</li>
                                                        <li>Nama perangkat harus unik dan mudah diidentifikasi</li>
                                                        <li>Pilih lokasi site sesuai dengan penempatan perangkat</li>
                                                        <li>Status perangkat dapat diubah sewaktu-waktu setelah disimpan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Arrow pointing to button */}
                                    <div className="absolute top-2 -right-2 w-4 h-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform rotate-45 border-l-0 border-b-0"></div>
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
                                id="nama_perangkat"
                                type="text"
                                value={data.nama_perangkat}
                                onChange={(e) => setData('nama_perangkat', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan nama perangkat HP BOC"
                                required
                            />
                            {errors.nama_perangkat && (
                                <p className="mt-1 text-sm text-red-600">{errors.nama_perangkat}</p>
                            )}
                        </div>

                        {/* Jumlah */}
                        <div>
                            <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Jumlah Unit <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="jumlah"
                                type="number"
                                min="1"
                                value={data.jumlah}
                                onChange={(e) => setData('jumlah', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Masukkan jumlah unit"
                                required
                            />
                            {errors.jumlah && (
                                <p className="mt-1 text-sm text-red-600">{errors.jumlah}</p>
                            )}
                        </div>

                        {/* Tanggal Pencatatan */}
                        <div>
                            <label htmlFor="tanggal_pencatatan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tanggal Pencatatan <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="tanggal_pencatatan"
                                type="date"
                                value={data.tanggal_pencatatan}
                                onChange={(e) => setData('tanggal_pencatatan', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.tanggal_pencatatan && (
                                <p className="mt-1 text-sm text-red-600">{errors.tanggal_pencatatan}</p>
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
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="baik">Baik</option>
                                <option value="rusak">Rusak</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                            )}
                        </div>

                        {/* Site Location */}
                        <div>
                            <label htmlFor="site_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Lokasi Site <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="site_id"
                                value={data.site_id}
                                onChange={(e) => setData('site_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Pilih Lokasi Site</option>
                                {sites && sites.map((site) => (
                                    <option key={site.id} value={site.id}>
                                        {site.lokasi}
                                    </option>
                                ))}
                            </select>
                            {errors.site_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.site_id}</p>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <a
                                href={route('hpboc.index')}
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
                                    'Simpan HP BOC'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
}
