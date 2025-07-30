import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layouts/Layout';
import MUIDonutChart from '@/components/charts/MUIDonutChart';
import MUIBarChart from '@/components/charts/MUIBarChart';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Overview({ 
    hpbocStats, 
    radioStats, 
    telephoneStats, 
    pcDeviceStats, 
    networkStats, 
    cctvStats, 
    ticketStats 
}) {
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
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
                                <p className="text-3xl font-bold mt-2">{hpbocStats?.total || 0}</p>
                                <p className="text-sm opacity-90">Total Available</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs opacity-75">Available: {hpbocStats?.available || 0}</div>
                            </div>
                        </div>
                    </div>

                    {/* PC Device Card */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">PC Device</h3>
                                <p className="text-3xl font-bold mt-2">{pcDeviceStats?.total || 0}</p>
                                <p className="text-sm opacity-90">Total Devices</p>
                            </div>
                            <div className="text-right text-xs opacity-75">
                                <div>Desktop: {pcDeviceStats?.desktop || 0}</div>
                                <div>Notebook: {pcDeviceStats?.notebook || 0}</div>
                                <div>Printer: {pcDeviceStats?.printer || 0}</div>
                            </div>
                        </div>
                    </div>

                    {/* Radio HT Card */}
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">Radio HT</h3>
                                <p className="text-3xl font-bold mt-2">{radioStats?.total || 0}</p>
                                <div className="flex items-center mt-1">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm opacity-90">Active: {radioStats?.on || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Request Card */}
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium opacity-90">Ticket Request</h3>
                                <p className="text-3xl font-bold mt-2">{ticketStats?.total || 0}</p>
                                <p className="text-sm opacity-90">Total Tickets</p>
                            </div>
                            <div className="text-right text-xs opacity-75">
                                <div>Pending: {ticketStats?.pending || 0}</div>
                                <div>Completed: {ticketStats?.completed || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map(week => (
                    <button
                        key={week}
                        onClick={() => setSelectedWeek(week)}
                        className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                        selectedWeek === week
                            ? 'bg-blue-600 text-white border-blue-600 shadow'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                        }`}
                    >
                        Minggu ke-{week}
                    </button>
                    ))}
                </div>
                    <div className="flex items-center space-x-4">
                        <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow">
                        <span>Export</span>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        </button>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ticket Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ticket Status</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Total: {ticketStats?.total || 0}</span>
                        </div>
                        <div className="flex justify-center">
                            <MUIBarChart
                                data={[
                                    { label: 'Pending', value: ticketStats?.pending || 0, color: '#3b82f6' },
                                    { label: 'Completed', value: ticketStats?.completed || 0, color: '#10b981' },
                                    { label: 'Closed', value: ticketStats?.closed || 0, color: '#8b5cf6' },
                                    { label: 'Rejected', value: ticketStats?.rejected || 0, color: '#f97316' },
                                    { label: 'Resolved', value: ticketStats?.resolved || 0, color: '#06b6d4' },
                                ]}
                                height={200}
                                width={350}
                            />
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-xs">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                                <span>Pending ({ticketStats?.pending || 0})</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                                <span>Completed ({ticketStats?.completed || 0})</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
                                <span>Closed ({ticketStats?.closed || 0})</span>
                            </div>
                        </div>
                    </div>

                    {/* Telephone Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Telephone Status</h3>
                        <div className="flex items-center justify-center h-48">
                            <MUIDonutChart
                                data={[
                                    { label: 'Online', value: telephoneStats?.on || 0, color: '#10b981' },
                                    { label: 'Offline', value: telephoneStats?.off || 0, color: '#ef4444' },
                                    { label: 'Maintenance', value: telephoneStats?.maintenance || 0, color: '#f59e0b' },
                                ]}
                                centerText={{
                                    value: telephoneStats?.total || 0,
                                    label: 'Total'
                                }}
                                size={200}
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Online</span>
                                </div>
                                <span>{telephoneStats?.on || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Offline</span>
                                </div>
                                <span>{telephoneStats?.off || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Maintenance</span>
                                </div>
                                <span>{telephoneStats?.maintenance || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Radio HT Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Radio HT Status</h3>
                        <div className="flex items-center justify-center h-48">
                            <MUIDonutChart
                                data={[
                                    { label: 'Online', value: radioStats?.on || 0, color: '#10b981' },
                                    { label: 'Offline', value: radioStats?.off || 0, color: '#ef4444' },
                                    { label: 'Maintenance', value: radioStats?.maintenance || 0, color: '#f59e0b' },
                                ]}
                                centerText={{
                                    value: radioStats?.total || 0,
                                    label: 'Total'
                                }}
                                size={200}
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Online</span>
                                </div>
                                <span>{radioStats?.on || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Offline</span>
                                </div>
                                <span>{radioStats?.off || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Maintenance</span>
                                </div>
                                <span>{radioStats?.maintenance || 0}</span>
                            </div>
                            <div className="flex items-center justify-between font-medium border-t pt-2 mt-2">
                                <span>🔌 Available</span>
                                <span>{radioStats?.on || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PC Device & HPBOC Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* PC Device Distribution Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">PC Device Distribution</h3>
                        <div className="flex items-center justify-center h-48">
                            <MUIDonutChart
                                data={[
                                    { label: 'Desktop', value: pcDeviceStats?.desktop || 0, color: '#3b82f6' },
                                    { label: 'Notebook', value: pcDeviceStats?.notebook || 0, color: '#10b981' },
                                    { label: 'Printer', value: pcDeviceStats?.printer || 0, color: '#f59e0b' },
                                ]}
                                centerText={{
                                    value: pcDeviceStats?.total || 0,
                                    label: 'Total'
                                }}
                                size={200}
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                    <span>Desktop</span>
                                </div>
                                <span>{pcDeviceStats?.desktop || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Notebook</span>
                                </div>
                                <span>{pcDeviceStats?.notebook || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Printer</span>
                                </div>
                                <span>{pcDeviceStats?.printer || 0}</span>
                            </div>
                            <div className="flex items-center justify-between border-t pt-2 mt-2">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                                    <span>MPS Allocation</span>
                                </div>
                                <span>{pcDeviceStats?.mps || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-pink-500 rounded mr-2"></div>
                                    <span>SM5 Allocation</span>
                                </div>
                                <span>{pcDeviceStats?.sm5 || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* HPBOC Status Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">HPBOC Status</h3>
                        <div className="flex items-center justify-center h-48">
                            <MUIDonutChart
                                data={[
                                    { label: 'Available', value: hpbocStats?.available || 0, color: '#10b981' },
                                    { label: 'Off', value: hpbocStats?.off || 0, color: '#ef4444' },
                                    { label: 'Maintenance', value: hpbocStats?.maintenance || 0, color: '#f59e0b' },
                                ]}
                                centerText={{
                                    value: hpbocStats?.total || 0,
                                    label: 'Total'
                                }}
                                size={200}
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Available</span>
                                </div>
                                <span>{hpbocStats?.available || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Off</span>
                                </div>
                                <span>{hpbocStats?.off || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Maintenance</span>
                                </div>
                                <span>{hpbocStats?.maintenance || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Network Device Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Network Device Status</h3>
                        <div className="flex items-center justify-center h-48">
                            <MUIDonutChart
                                data={[
                                    { label: 'Up', value: networkStats?.up || 0, color: '#10b981' },
                                    { label: 'Down', value: networkStats?.down || 0, color: '#ef4444' },
                                ]}
                                centerText={{
                                    value: networkStats?.total || 0,
                                    label: 'Total'
                                }}
                                size={200}
                            />
                            <MUIBarChart
                            data={[
                                { label: 'Switches', value: networkStats?.switches || 0, color: '#3b82f6' },
                                { label: 'Access Points', value: networkStats?.accessPoints || 0, color: '#10b981' },
                                { label: 'Network', value: networkStats?.network || 0, color: '#8b5cf6' },
                            ]}
                            height={200}
                            width={320}
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Up</span>
                                </div>
                                <span>{networkStats?.up || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Down</span>
                                </div>
                                <span>{networkStats?.down || 0}</span>
                            </div>
                            <div className="flex items-center justify-between border-t pt-2 mt-2">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                    <span>Switches</span>
                                </div>
                                <span>{networkStats?.switches || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                                    <span>Access Points</span>
                                </div>
                                <span>{networkStats?.accessPoints || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                                    <span>Network</span>
                                </div>
                                <span>{networkStats?.network || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* CCTV Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">CCTV Status</h3>
                        <div className="flex items-center justify-center h-48">
                            <MUIDonutChart
                                data={[
                                    { label: 'Online', value: cctvStats?.online || 0, color: '#10b981' },
                                    { label: 'Offline', value: cctvStats?.offline || 0, color: '#ef4444' },
                                ]}
                                centerText={{
                                    value: cctvStats?.total || 0,
                                    label: 'Total'
                                }}
                                size={200}
                            />
                            <MUIBarChart
                                data={[
                                    { label: 'Asset', value: cctvStats?.asset || 0 || 0, color: '#3b82f6' },
                                    { label: 'Sewa', value: cctvStats?.sewa || 0, color: '#10b981' },
                                ]}
                                height={200}
                                width={320}
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Online</span>
                                </div>
                                <span>{cctvStats?.online || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Offline</span>
                                </div>
                                <span>{cctvStats?.offline || 0}</span>
                            </div>
                            <div className="flex items-center justify-between border-t pt-2 mt-2">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                    <span>Asset</span>
                                </div>
                                <span>{cctvStats?.asset || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                                    <span>Sewa</span>
                                </div>
                                <span>{cctvStats?.sewa || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
