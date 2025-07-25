import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function HPBOC({ hpboc }) {
    // Use the data passed from the Laravel controller
    const devices = hpboc || [];

    return (
        <>
            <Head title="HPBOC - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="HPBOC" 
                title="HPBOC Management"
                subtitle="Manage and monitor HPBOC devices"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Devices</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.length}</p>
                        <p className="text-xs text-gray-500">All HPBOC devices</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Good Condition</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {devices.filter(d => d.status === 'baik').length}
                        </p>
                        <p className="text-xs text-gray-500">Working properly</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Damaged</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {devices.filter(d => d.status === 'rusak').length}
                        </p>
                        <p className="text-xs text-gray-500">Need repair</p>
                    </div>
                </div>

                {/* Device List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">HPBOC Device List</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add New Device
                        </button>
                    </div>
                    <div className="p-6">
                        {devices.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                <div className="text-6xl mb-4">📊</div>
                                <p className="text-xl mb-2">No HPBOC devices found</p>
                                <p>Add your first device to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Device Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Site Location
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Recording Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
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
                                                    {device.jumlah}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        device.status === 'baik' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                                    }`}>
                                                        {device.status === 'baik' ? 'Good' : 'Damaged'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {device.site?.lokasi || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(device.tanggal_pencatatan).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                                                        Edit
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                        Delete
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
            </Layout>
        </>
    );
}
