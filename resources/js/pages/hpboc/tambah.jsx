import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function TambahHPBOC({ sites }) {
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
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Formulir Tambah HP BOC</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Isi semua informasi yang diperlukan untuk menambahkan perangkat HP BOC baru</p>
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

                {/* Information Card */}
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Informasi Penting
                            </h3>
                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
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
            </Layout>
        </>
    );
}
