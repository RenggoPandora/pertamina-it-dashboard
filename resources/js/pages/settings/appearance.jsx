import { Head } from '@inertiajs/react';
import Layout from '@/components/Layouts/Layout';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance Settings - Pertamina IT Dashboard" />
            
            <Layout 
                activeMenuItem="Settings" 
                title="Appearance Settings"
                subtitle="Customize your dashboard appearance and theme preferences"
            >
                <div className="space-y-6">
                    {/* Page Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Appearance Settings
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Update your account's appearance settings and theme preferences.
                        </p>
                    </div>

                    {/* Theme Selection */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                            Theme Preference
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Light Theme */}
                            <div className="relative">
                                <input
                                    type="radio"
                                    id="light"
                                    name="theme"
                                    className="sr-only peer"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="light"
                                    className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 transition-all duration-200"
                                >
                                    <div className="w-16 h-12 bg-white border border-gray-300 rounded-md mb-3 flex items-center justify-center">
                                        <div className="w-8 h-6 bg-gray-100 rounded-sm"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Default theme</span>
                                </label>
                            </div>

                            {/* Dark Theme */}
                            <div className="relative">
                                <input
                                    type="radio"
                                    id="dark"
                                    name="theme"
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor="dark"
                                    className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 transition-all duration-200"
                                >
                                    <div className="w-16 h-12 bg-gray-800 border border-gray-600 rounded-md mb-3 flex items-center justify-center">
                                        <div className="w-8 h-6 bg-gray-700 rounded-sm"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Dark theme</span>
                                </label>
                            </div>

                            {/* System Theme */}
                            <div className="relative">
                                <input
                                    type="radio"
                                    id="system"
                                    name="theme"
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor="system"
                                    className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 transition-all duration-200"
                                >
                                    <div className="w-16 h-12 bg-gradient-to-r from-white to-gray-800 border border-gray-300 rounded-md mb-3 flex items-center justify-center">
                                        <div className="w-8 h-6 bg-gradient-to-r from-gray-100 to-gray-700 rounded-sm"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Auto detect</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Color Scheme */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                            Accent Color
                        </h4>
                        
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                            {[
                                { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
                                { name: 'Green', value: 'green', color: 'bg-green-500' },
                                { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
                                { name: 'Red', value: 'red', color: 'bg-red-500' },
                                { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
                                { name: 'Yellow', value: 'yellow', color: 'bg-yellow-500' },
                                { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
                                { name: 'Indigo', value: 'indigo', color: 'bg-indigo-500' },
                            ].map((color) => (
                                <div key={color.value} className="relative">
                                    <input
                                        type="radio"
                                        id={color.value}
                                        name="accent"
                                        className="sr-only peer"
                                        defaultChecked={color.value === 'blue'}
                                    />
                                    <label
                                        htmlFor={color.value}
                                        className="flex flex-col items-center p-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 peer-checked:border-gray-900 dark:peer-checked:border-white transition-all duration-200"
                                    >
                                        <div className={`w-8 h-8 ${color.color} rounded-full mb-1`}></div>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">{color.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Display Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                            Display Settings
                        </h4>
                        
                        <div className="space-y-4">
                            {/* Sidebar Setting */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                        Sidebar Collapsed by Default
                                    </label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Start with a collapsed sidebar for more content space
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Animation Setting */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                        Reduce Animations
                                    </label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Minimize motion effects for better performance
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Dense Mode */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                        Dense Mode
                                    </label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Compact layout with reduced spacing
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    );
}