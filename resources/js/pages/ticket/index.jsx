import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function Ticket() {
    const [tickets] = useState([
        // Sample data - replace with real data from your backend
    ]);

    return (
        <>
            <Head title="Ticket - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="Ticket" 
                title="Ticket Management"
                subtitle="Manage support tickets and service requests"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tickets</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{tickets.length}</p>
                        <p className="text-xs text-gray-500">All support tickets</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Open</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {tickets.filter(t => t.status === 'open').length}
                        </p>
                        <p className="text-xs text-gray-500">Open tickets</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {tickets.filter(t => t.status === 'in_progress').length}
                        </p>
                        <p className="text-xs text-gray-500">Being worked on</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {tickets.filter(t => t.status === 'resolved').length}
                        </p>
                        <p className="text-xs text-gray-500">Completed tickets</p>
                    </div>
                </div>

                {/* Ticket List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Tickets</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Create New Ticket
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <div className="text-6xl mb-4">🎫</div>
                            <p className="text-xl mb-2">No tickets found</p>
                            <p>Create your first ticket to get started.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
