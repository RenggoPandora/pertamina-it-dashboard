import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ activeItem }) {
    const [isMonitoringOpen, setMonitoringOpen] = useState(
        activeItem === 'CCTV Readiness' || activeItem === 'CCTV Availability'
    );

    const overviewMenuItem = [
        { name: 'Overview', href: '/dashboard', icon: '/icons/overview.svg' },
    ];

    const perangkatMenuItems = [
        { name: 'HPBOC', href: '/hpboc', icon: '/icons/hpboc.svg' },
        { name: 'Radio HT', href: '/radio', icon: '/icons/radioht.svg' },
        { name: 'Telephone', href: '/telephone', icon: '/icons/telephone.svg' },
        { name: 'Network Device', href: '/network-device', icon: '/icons/network.svg' },
        { name: 'PC Device', href: '/pc-device', icon: '/icons/pcdevice.svg' },
    ];

    const layananMenuItems = [
        { name: 'Ticket', href: '/ticket', icon: '/icons/ticket.svg' },
    ];

    const cctvSubmenu = [
        { name: 'CCTV Readiness', href: '/cctv' },
        { name: 'CCTV Availability', href: '/cctv' },
    ];

    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
            {/* Logo */}
            <div className="flex h-20 items-center justify-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <img src="/images/Pertamina.png" alt="Pertamina" className="p-4" />
            </div>

            {/* Navigation */}
            <nav className="mt-4 px-3">

                {/* Overview */}
                <div className="space-y-1 mb-6">
                    {overviewMenuItem.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                activeItem === item.name
                                    ? 'bg-red-50 text-red-700 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-400'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}
                        >
                            <img 
                                src={item.icon} 
                                alt={item.name}
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                    activeItem === item.name 
                                        ? 'opacity-100' 
                                        : 'opacity-70 group-hover:opacity-100'
                                }`}
                            />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Perangkat */}
                <div className="space-y-1">
                    <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Perangkat & Infrastruktur
                        </p>
                    </div>
                    {perangkatMenuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeItem === item.name
                                    ? 'bg-red-100 text-red-700 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-400'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}
                        >
                            <img 
                                src={item.icon} 
                                alt={item.name}
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                    activeItem === item.name 
                                        ? 'opacity-100' 
                                        : 'opacity-60 group-hover:opacity-100'
                                }`}
                            />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Monitoring & Keamanan - Dropdown CCTV */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Monitoring & Keamanan
                        </p>
                    </div>

                    {/* CCTV Parent */}
                    <button
                        onClick={() => setMonitoringOpen(!isMonitoringOpen)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            activeItem.includes('CCTV')
                                ? 'bg-red-100 text-red-700 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-400'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`}
                    >
                        <div className="flex items-center">
                            <img 
                                src="/icons/cctv.svg" 
                                alt="CCTV"
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                    activeItem.includes('CCTV')
                                        ? 'opacity-100'
                                        : 'opacity-60 group-hover:opacity-100'
                                }`}
                            />
                            CCTV
                        </div>
                        <svg
                            className={`h-4 w-4 transform transition-transform duration-200 ${
                                isMonitoringOpen ? 'rotate-90' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Submenu CCTV */}
                    {isMonitoringOpen && (
                        <div className="ml-10 mt-1 space-y-1">
                            {cctvSubmenu.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block text-sm rounded-md px-2 py-1 transition ${
                                        activeItem === item.name
                                            ? 'text-red-600 font-semibold'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Layanan */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Layanan & Operasional
                        </p>
                    </div>
                    {layananMenuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeItem === item.name
                                    ? 'bg-red-100 text-red-700 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-400'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}
                        >
                            <img 
                                src={item.icon} 
                                alt={item.name}
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                    activeItem === item.name 
                                        ? 'opacity-100' 
                                        : 'opacity-60 group-hover:opacity-100'
                                }`}
                            />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
