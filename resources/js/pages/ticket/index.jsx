import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Layout from '@/components/shared/Layout';

export default function Index() {
  const { tickets } = usePage().props;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const openUploadModal = () => setShowUploadModal(true);
  const handleUploadCancel = () => {
    setShowUploadModal(false);
    setUploadedFile(null);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setUploadedFile(file);
  };
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) setUploadedFile(files[0]);
  };
  const handleUploadConfirm = () => {
    if (uploadedFile) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setShowUploadModal(false);
        setUploadedFile(null);
        alert('Import belum tersedia untuk Ticket');
      }, 2000);
    }
  };

  const openDeleteModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Head title="Ticket - Pertamina IT Dashboard" />
      <Layout activeMenuItem="Ticket" title="Ticket Management" subtitle="Manage support tickets and service requests">
        
        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Tickets" count={tickets.length} color="gray" />
          <StatCard label="Pending" count={tickets.filter(t => t.status === 'pending').length} color="yellow" />
          <StatCard label="Completed" count={tickets.filter(t => t.status === 'completed').length} color="green" />
          <StatCard label="Resolved" count={tickets.filter(t => t.status === 'resolved').length} color="blue" />
          <StatCard label="Closed" count={tickets.filter(t => t.status === 'closed').length} color="pink" />
          <StatCard label="Rejected" count={tickets.filter(t => t.status === 'rejected').length} color="red" />
        </div>

        {/* Ticket List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Tickets</h3>
            <div className="flex gap-3">
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

          {/* Tabel Ticket */}
          <div className="p-6">
            {tickets.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <div className="text-6xl mb-4">🎫</div>
                <p className="text-xl mb-2">No tickets found</p>
                <p>Create your first ticket to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <Th>Support Company</Th>
                      <Th>Nomor Request</Th>
                      <Th>Status</Th>
                      <Th>Dibuat Pada</Th>
                      <Th>Aksi</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <Td>{ticket.support_company}</Td>
                        <Td>{ticket.req_number}</Td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={ticket.status} />
                        </td>
                        <Td>{ticket.created_at ? new Date(ticket.created_at).toLocaleString() : '-'}</Td>
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
                    Apakah Anda yakin ingin menghapus ticket <strong>{selectedTicket.req_number}</strong>? Tindakan ini tidak dapat dibatalkan.
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
function StatCard({ label, count, color }) {
  const colors = {
    gray: 'text-gray-900',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    pink: 'text-pink-600',
    red: 'text-red-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</h3>
      <p className={`text-3xl font-bold mt-2 ${colors[color]}`}>{count}</p>
      <p className="text-xs text-gray-500">Tickets {label.toLowerCase()}</p>
    </div>
  );
}

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
    closed: 'bg-pink-200 text-pink-800 dark:bg-pink-700 dark:text-pink-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400',
    resolved: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400',
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${classes[status]}`}>
      {label}
    </span>
  );
}
