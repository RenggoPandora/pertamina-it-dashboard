import { Head, useForm } from '@inertiajs/react';
import Layout from '@/components/Layouts/Layout';

export default function Profile({ user }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                // Handle success
            },
            onError: () => {
                // Handle error
            }
        });
    };

    return (
        <>
            <Head title="Profile Settings - Pertamina IT Dashboard" />
            
            <Layout 
                activeMenuItem="Settings" 
                title="Profile Settings"
                subtitle="Manage your account information and preferences"
            >
                <div className="space-y-6">
                    {/* Page Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Profile Information
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Update your account's profile information and email address.
                        </p>
                    </div>

                    {/* Profile Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center space-x-6">
                                <div className="shrink-0">
                                    <img
                                        className="h-16 w-16 object-cover rounded-full bg-gray-100 dark:bg-gray-700"
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&color=3B82F6&background=EFF6FF`}
                                        alt="Profile"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                    >
                                        Change Avatar
                                    </button>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        JPG, GIF or PNG. 1MB max.
                                    </p>
                                </div>
                            </div>

                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter your email address"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Department Field */}
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Department
                                </label>
                                <select
                                    id="department"
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select Department</option>
                                    <option value="it">Information Technology</option>
                                    <option value="finance">Finance</option>
                                    <option value="hr">Human Resources</option>
                                    <option value="operations">Operations</option>
                                    <option value="security">Security</option>
                                </select>
                            </div>

                            {/* Position Field */}
                            <div>
                                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Position
                                </label>
                                <input
                                    id="position"
                                    type="text"
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter your position"
                                />
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Account Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                            Account Actions
                        </h4>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Download Account Data
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Export all your account data and activity
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Download
                                </button>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                                <div>
                                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                        Delete Account
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Permanently delete your account and all data
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}