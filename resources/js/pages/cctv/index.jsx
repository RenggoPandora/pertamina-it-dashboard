import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function CCTV() {
    const [cameras] = useState([
        // Sample data - replace with real data from your backend
    ]);

    return (
        <>
            <Head title="CCTV - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="CCTV" 
                title="CCTV Management"
                subtitle="Manage and monitor surveillance camera systems"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cameras</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{cameras.length}</p>
                        <p className="text-xs text-gray-500">All CCTV cameras</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Online</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {cameras.filter(c => c.status === 'online').length}
                        </p>
                        <p className="text-xs text-gray-500">Currently online</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Offline</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {cameras.filter(c => c.status === 'offline').length}
                        </p>
                        <p className="text-xs text-gray-500">Currently offline</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Recording</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {cameras.filter(c => c.recording === true).length}
                        </p>
                        <p className="text-xs text-gray-500">Currently recording</p>
                    </div>
                </div>

                {/* Camera List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">CCTV Camera List</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add New Camera
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <div className="text-6xl mb-4">📹</div>
                            <p className="text-xl mb-2">No CCTV cameras found</p>
                            <p>Add your first camera to get started.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
