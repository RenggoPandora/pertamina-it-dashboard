import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function NetworkDevice() {
    const [devices] = useState([
        // Sample data - replace with real data from your backend
    ]);

    return (
        <>
            <Head title="Network Device - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="Network Device" 
                title="Network Device Management"
                subtitle="Manage and monitor network infrastructure devices"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Devices</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.length}</p>
                        <p className="text-xs text-gray-500">All network devices</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Switches</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {devices.filter(d => d.type === 'switch').length}
                        </p>
                        <p className="text-xs text-gray-500">Network switches</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Routers</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {devices.filter(d => d.type === 'router').length}
                        </p>
                        <p className="text-xs text-gray-500">Network routers</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Access Points</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {devices.filter(d => d.type === 'access_point').length}
                        </p>
                        <p className="text-xs text-gray-500">WiFi access points</p>
                    </div>
                </div>

                {/* Device Inventory */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Network Device Inventory</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add New Device
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <div className="text-6xl mb-4">🌐</div>
                            <p className="text-xl mb-2">No network devices found</p>
                            <p>Add your first network device to get started.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
