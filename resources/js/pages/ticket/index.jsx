import React, { useState, useEffect } from 'react';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import Layout from '@/components/layouts/Layout';
import DateRangeFilter from '@/components/DateRangeFilter';

export default function Index() {
  const { tickets, flash, filters } = usePage().props;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { data, setData, post, processing, reset } = useForm({
    file: null,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Show flash messages
  useEffect(() => {
    if (flash?.success) {
      alert(flash.success);
    }
    if (flash?.error) {
      alert(flash.error);
    }
  }, [flash]);

  const openUploadModal = () => setShowUploadModal(true);
  
  const closeUploadModal = () => {
    setShowUploadModal(false);
    reset();
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setData('file', file);
  };
  
  const handleDragOver = (event) => event.preventDefault();
  
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) setData('file', files[0]);
  };
  
  const handleUploadConfirm = () => {
    if (data.file) {
      post(route('ticket.import'), {
        onSuccess: () => {
          closeUploadModal();
          // Auto-refresh the page
          router.visit(route('ticket.index'), {
            method: 'get',
            preserveState: false,
            preserveScroll: false,
          });
        },
        onError: (errors) => {
          console.error('Upload errors:', errors);
        },
      });
    }
  };

  const downloadTemplate = () => {
    window.location.href = route('ticket.template');
  };

  const openDeleteModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowDeleteModal(true);
  };

  // Fungsi untuk menangani filter date range
  const handleDateFilter = ({ startDate, endDate }) => {
    router.get(route('ticket.index'), {
      start_date: startDate,
      end_date: endDate
    }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <>
      <Head title="Ticket - Pertamina IT Dashboard" />
      <Layout activeMenuItem="Ticket" title="Ticket Management" subtitle="Manage support tickets and service requests">
        
        {/* Stats Grid - 2 Rows */}
        <div className="mb-8 space-y-6">
          {/* Row 1: Total & Completed - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Tickets Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tickets</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{tickets.length}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Semua ticket yang terdaftar</p>
                </div>
              </div>
            </div>

            {/* Completed Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{tickets.filter(t => t.status === 'completed').length}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ticket yang selesai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Assigned, Pending, Resolved, Closed - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Assigned Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Assigned</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{tickets.filter(t => t.status === 'assigned').length}</p>
                </div>
              </div>
            </div>

            {/* Pending Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{tickets.filter(t => t.status === 'pending').length}</p>
                </div>
              </div>
            </div>

            {/* Resolved Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Resolved</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{tickets.filter(t => t.status === 'resolved').length}</p>
                </div>
              </div>
            </div>

            {/* Closed Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Closed</h3>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{tickets.filter(t => t.status === 'closed').length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div 
                className="fixed inset-0"
                onClick={closeUploadModal}
              ></div>

              {/* Modal panel */}
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Upload Excel Ticket
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Upload file Excel untuk import data ticket secara batch.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeUploadModal}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Download Template Button */}
                  <div className="mt-4">
                    <button
                      onClick={downloadTemplate}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Template Excel
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div className="mt-4">
                    <div 
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      {data.file ? (
                        <div className="space-y-2">
                          <div className="text-green-500">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {data.file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(data.file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-gray-400">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                              Click to upload
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400"> or drag and drop</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Excel files only (.xlsx, .xls) - Max 5MB
                          </p>
                        </div>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Format Info */}
                  <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Format Requirements:</h4>
                    <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
                      <li>Cell A3: Must contain "Tickets"</li>
                      <li>Row 9: Column headers (Name, Assignee, Summary, Date, Status)</li>
                      <li>Row 10+: Data rows</li>
                      <li>Columns: A=Name, B=Assignee, C=Summary, D=Date, E=Status</li>
                      <li>Valid status: assigned, pending, resolved, completed, closed</li>
                    </ul>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleUploadConfirm}
                    disabled={!data.file || processing}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Uploading...' : 'Upload'}
                  </button>
                  <button
                    type="button"
                    onClick={closeUploadModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ticket List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Tickets</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filters?.start_date && filters?.end_date 
                  ? `Menampilkan data dari ${new Date(filters.start_date).toLocaleDateString('id-ID')} - ${new Date(filters.end_date).toLocaleDateString('id-ID')}`
                  : 'Kelola data support tickets dan service requests'
                }
              </p>
            </div>
            <div className="flex space-x-3">
              <DateRangeFilter 
                onFilter={handleDateFilter}
                defaultStartDate={filters?.start_date || ''}
                defaultEndDate={filters?.end_date || ''}
              />
              <button onClick={openUploadModal} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Excel
              </button>
              <a href={route('ticket.create')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Ticket
              </a>
            </div>
          </div>

          {/* Search Box */}
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berdasarkan customer, assignee, summary, atau status..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Menampilkan {tickets.filter(ticket => {
                    const query = searchQuery.toLowerCase();
                    return (
                      ticket.customer_fullname?.toLowerCase().includes(query) ||
                      ticket.assignee_name?.toLowerCase().includes(query) ||
                      ticket.summary?.toLowerCase().includes(query) ||
                      ticket.status?.toLowerCase().includes(query)
                    );
                  }).length} dari {tickets.length} ticket
                </p>
              )}
            </div>
          </div>

          {/* Tabel Ticket */}
          <div className="p-6">
            {tickets.filter(ticket => {
              if (!searchQuery) return true;
              const query = searchQuery.toLowerCase();
              return (
                ticket.customer_fullname?.toLowerCase().includes(query) ||
                ticket.assignee_name?.toLowerCase().includes(query) ||
                ticket.summary?.toLowerCase().includes(query) ||
                ticket.status?.toLowerCase().includes(query)
              );
            }).length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <div className="text-6xl mb-4">🎫</div>
                <p className="text-xl mb-2">
                  {searchQuery ? 'Tidak ada data yang cocok dengan pencarian' : 'No tickets found'}
                </p>
                <p>{searchQuery ? `Pencarian: "${searchQuery}"` : 'Create your first ticket to get started.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <Th>ID Ticket</Th>
                      <Th>Customer Fullname</Th>
                      <Th>Assignee Name</Th>
                      <Th>Summary</Th>
                      <Th>Tanggal Pencatatan</Th>
                      <Th>Status</Th>
                      <Th>Aksi</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {tickets.filter(ticket => {
                      if (!searchQuery) return true;
                      const query = searchQuery.toLowerCase();
                      return (
                        ticket.customer_fullname?.toLowerCase().includes(query) ||
                        ticket.assignee_name?.toLowerCase().includes(query) ||
                        ticket.summary?.toLowerCase().includes(query) ||
                        ticket.status?.toLowerCase().includes(query)
                      );
                    }).map((ticket) => (
                      <tr key={ticket.id}>
                        <Td>{ticket.id}</Td>
                        <Td>{ticket.customer_fullname}</Td>
                        <Td>{ticket.assignee_name || '-'}</Td>
                        <Td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="max-w-xs truncate" title={ticket.summary}>
                            {ticket.summary}
                          </div>
                        </Td>
                        <Td>{ticket.tanggal_pencatatan ? new Date(ticket.tanggal_pencatatan).toLocaleDateString() : '-'}</Td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={ticket.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href={route('ticket.edit', ticket.id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                          >
                            Ubah
                          </a>
                          <button
                            onClick={() => openDeleteModal(ticket)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowDeleteModal(false)}></div>
            <div className="bg-white rounded-lg shadow-lg z-50 max-w-md w-full p-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Hapus Ticket</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Apakah Anda yakin ingin menghapus ticket dari <strong>{selectedTicket.customer_fullname}</strong>? Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Batal
                </button>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  router.delete(route('ticket.destroy', selectedTicket.id), {
                    onSuccess: () => {
                      setShowDeleteModal(false);
                      setSelectedTicket(null);
                    }
                  });
                }}>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </Layout>
    </>
  );
}

// Komponen bantu
function Th({ children }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
      {children}
    </td>
  );
}

function StatusBadge({ status }) {
  const classes = {
    assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
    resolved: 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400',
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${classes[status] || classes.pending}`}>
      {label}
    </span>
  );
}
