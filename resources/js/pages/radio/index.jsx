import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function Radio({ radio }) {
    // Use the data passed from the Laravel controller
    const radios = radio || [];

    return (
        <>
            <Head title="Radio HT - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="Radio HT" 
                title="Radio HT Management"
                subtitle="Manage and monitor radio handheld transceivers"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Radios</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{radios.length}</p>
                        <p className="text-xs text-gray-500">All radio devices</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Online</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {radios.filter(r => r.status === 'on').length}
                        </p>
                        <p className="text-xs text-gray-500">Currently online</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Offline</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {radios.filter(r => r.status === 'off').length}
                        </p>
                        <p className="text-xs text-gray-500">Currently offline</p>
                    </div>
                </div>

                {/* Radio List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Radio HT Device List</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add New Radio
                        </button>
                    </div>
                    <div className="p-6">
                        {radios.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                <div className="text-6xl mb-4">📻</div>
                                <p className="text-xl mb-2">No radio devices found</p>
                                <p>Add your first radio to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Radio Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Frequency
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Battery
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {radios.map((radio) => (
                                            <tr key={radio.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {radio.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        radio.status === 'active' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                                            : radio.status === 'maintenance'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                                    }`}>
                                                        {radio.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {radio.frequency}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {radio.battery}
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
