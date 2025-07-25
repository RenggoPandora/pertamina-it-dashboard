import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function PCDevice() {
    const [devices] = useState([
        // Sample data - replace with real data from your backend
    ]);

    return (
        <>
            <Head title="PC Device - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="PC Device" 
                title="PC Device Management"
                subtitle="Manage and monitor computer systems and workstations"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total PCs</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{devices.length}</p>
                        <p className="text-xs text-gray-500">All computers</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Desktops</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {devices.filter(d => d.type === 'desktop').length}
                        </p>
                        <p className="text-xs text-gray-500">Desktop computers</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Laptops</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {devices.filter(d => d.type === 'laptop').length}
                        </p>
                        <p className="text-xs text-gray-500">Laptop computers</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Under Maintenance</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {devices.filter(d => d.status === 'maintenance').length}
                        </p>
                        <p className="text-xs text-gray-500">Being serviced</p>
                    </div>
                </div>

                {/* PC Inventory */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">PC Device Inventory</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add New PC
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <div className="text-6xl mb-4">💻</div>
                            <p className="text-xl mb-2">No PC devices found</p>
                            <p>Add your first computer to get started.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
