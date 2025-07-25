import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function Telephone({ telephones }) {
    // Use the data passed from the Laravel controller
    const phones = telephones || [];

    return (
        <>
            <Head title="Telephone - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="Telephone" 
                title="Telephone Management"
                subtitle="Manage and monitor telephone systems"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Phones</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{phones.length}</p>
                        <p className="text-xs text-gray-500">All telephone lines</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Lines</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {phones.filter(p => p.status === 'active').length}
                        </p>
                        <p className="text-xs text-gray-500">Currently active</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Out of Service</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {phones.filter(p => p.status === 'inactive').length}
                        </p>
                        <p className="text-xs text-gray-500">Currently inactive</p>
                    </div>
                </div>

                {/* Phone Directory */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Telephone Directory</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add New Phone
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <div className="text-6xl mb-4">📞</div>
                            <p className="text-xl mb-2">No telephone records found</p>
                            <p>Add your first telephone to get started.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
