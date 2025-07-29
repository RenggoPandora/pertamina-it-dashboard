import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ activeItem }) {
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

    const monitoringMenuItems = [
        { name: 'CCTV', href: '/cctv', icon: '/icons/cctv.svg' },
    ];

    const layananMenuItems = [
        { name: 'Ticket', href: '/ticket', icon: '/icons/ticket.svg' },
    ];

    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
            {/* Modern Logo Header */}
            <div className="flex h-20 items-center justify-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                    <img src="/images/Pertamina.png" alt="Pertamina" className="p-4" />
                </div>
            </div>
            
            {/* Navigation */}
            <nav className="mt-4 px-3">
                {/* Overview Section */}
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

                {/* Perangkat & Infrastruktur Section */}
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

                {/* Monitoring & Keamanan Section */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Monitoring & Keamanan
                        </p>
                    </div>
                    
                    {monitoringMenuItems.map((item) => (
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

                {/* Layanan & Operasional Section */}
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
