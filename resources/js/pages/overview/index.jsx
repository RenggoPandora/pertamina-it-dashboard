import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function Overview() {
    return (
        <>
            <Head title="Overview - Pertamina IT Dashboard" />
            <Layout 
                activeMenuItem="Overview" 
                title="Overview"
            >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* HP BOC Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">HP BOC</h3>
                                <p className="text-3xl font-bold mt-2">161</p>
                                <p className="text-sm opacity-90">Available</p>
                            </div>
                        </div>
                    </div>

                    {/* PC Device Card */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">PC Device</h3>
                                <p className="text-3xl font-bold mt-2">2,000</p>
                                <p className="text-sm opacity-90">Deployment</p>
                            </div>
                        </div>
                    </div>

                    {/* Radio HT Card */}
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">Radio HT</h3>
                                <p className="text-3xl font-bold mt-2">1,179</p>
                                <div className="flex items-center mt-1">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Request Card */}
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">Ticket Request</h3>
                                <p className="text-3xl font-bold mt-2">162</p>
                                <p className="text-sm opacity-90">/week</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Minggu ke-1</span>
                        <span className="text-sm text-gray-600">Minggu ke-2</span>
                        <span className="text-sm text-gray-600">Minggu ke-3</span>
                        <span className="text-sm text-gray-600">Minggu ke-4</span>
                        <span className="text-sm text-gray-600">Minggu ke-5</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <span className="text-sm">Export</span>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            </svg>
                        </button>
                        <span className="text-sm text-gray-600">15/07/2025</span>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ticket Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Ticket</h3>
                            <span className="text-sm text-gray-500">Total Ticket: 72</span>
                        </div>
                        <div className="h-48 flex items-end justify-center space-x-2">
                            <div className="bg-purple-200 w-8 h-8 rounded-t"></div>
                            <div className="bg-red-300 w-8 h-24 rounded-t"></div>
                            <div className="bg-blue-400 w-8 h-32 rounded-t"></div>
                            <div className="bg-orange-300 w-8 h-4 rounded-t"></div>
                            <div className="bg-blue-500 w-8 h-16 rounded-t"></div>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-xs">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-200 rounded mr-1"></div>
                                <span>Closed</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-300 rounded mr-1"></div>
                                <span>Completed</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
                                <span>Pending</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-300 rounded mr-1"></div>
                                <span>Rejected</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                                <span>Resolved</span>
                            </div>
                        </div>
                    </div>

                    {/* Telephone Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Telephone</h3>
                        <div className="flex items-center justify-center h-48">
                            <div className="relative w-32 h-32">
                                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                                    <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="8" fill="none" 
                                            strokeDasharray="351.86" strokeDashoffset="0" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">
                                    100%
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                    <span>On</span>
                                </div>
                                <span>100%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Off</span>
                                </div>
                                <span>0%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Maintenance</span>
                                </div>
                                <span>0%</span>
                            </div>
                        </div>
                    </div>

                    {/* Radio HT Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Radio HT</h3>
                        <div className="flex items-center justify-center h-48">
                            <div className="relative w-32 h-32">
                                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="8" fill="none" 
                                            strokeDasharray="351.86" strokeDashoffset="35" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">
                                    1170
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>On</span>
                                </div>
                                <span>1110</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Off</span>
                                </div>
                                <span>10</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Maintenance</span>
                                </div>
                                <span>50</span>
                            </div>
                            <div className="flex items-center justify-between font-medium">
                                <span>🔌 Available</span>
                                <span>1170</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
