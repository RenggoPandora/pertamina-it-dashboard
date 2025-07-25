import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, activeMenuItem, title, subtitle }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar activeItem={activeMenuItem} />
            
            {/* Main Content */}
            <div className="ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <span>Dashboards</span>
                                <span>›</span>
                                <span>{activeMenuItem}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <img 
                                    src="/icons/notification.svg" 
                                    alt="Notification" 
                                    className="h-6 w-6"
                                />
                            </button>
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Halo, Admin!</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
