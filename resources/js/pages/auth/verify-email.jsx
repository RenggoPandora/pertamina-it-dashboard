import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Verify Email - Pertamina IT Dashboard" />
            
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <img 
                            src="/images/Pertamina.png" 
                            alt="Pertamina" 
                            className="h-16 w-auto"
                        />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Verify your email
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please verify your email address by clicking on the link we just emailed to you.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {/* Status Message */}
                        {status === 'verification-link-sent' && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-600 text-center">
                                    A new verification link has been sent to the email address you provided during registration.
                                </p>
                            </div>
                        )}

                        <div className="text-center space-y-6">
                            {/* Email Icon */}
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
                                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    We've sent a verification link to your email address. Click the link to complete your account setup.
                                </p>
                            </div>

                            {/* Resend Button */}
                            <form onSubmit={submit}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing && (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    Resend verification email
                                </button>
                            </form>

                            {/* Logout Link */}
                            <div className="text-sm">
                                <a
                                    href={route('logout')}
                                    method="post"
                                    className="font-medium text-gray-600 hover:text-gray-500"
                                >
                                    Log out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
