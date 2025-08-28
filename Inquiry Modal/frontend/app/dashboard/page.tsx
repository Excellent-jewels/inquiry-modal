'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusBadge from '@/components/StatusBadge';
import { useNotification } from "@/context/NotificationContext";

const API_URL = 'http://localhost:8000/inquiries'; // Replace with your FastAPI endpoint

// ✅ Inquiry Type Definition
type Inquiry = {
  sale_team_status: string;
  inquiry_id?: string;
  id?: number;
  stock_id?: string;
  stockId?: string;
  shape?: string;
  type?: string;
  status?: string;
  created_by?: string;
  createdBy?: string;
  sales?: string;
};

const statusTabs = [
  'All',
  'Pending',
  'Hold',
  'Confirmed',
  'Not Available',
  'Released',
  'Dispatched',
];

export default function DashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
 const { notifications } = useNotification((prev) => prev);

  const visibleNotifications = notifications.filter(
    (note) => !(note.dismissed_by?.length > 0)
  );

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInquiries(response.data);
      } catch (error) {
        console.error('Failed to fetch inquiries:', error);
      }
    };

    fetchInquiries();
  }, []);

  // ✅ Dynamic Stats
  const totalInquiries = inquiries.length;

  const holdCount = inquiries.filter(
    (inq) =>
      inq.sale_team_status?.toLowerCase() === 'hold' ||
      inq.sale_team_status?.toLowerCase() === 'hold - toh'
  ).length;

  const notAvailableCount = inquiries.filter(
    (inq) =>
      inq.sale_team_status?.toLowerCase() === 'not available' ||
      inq.sale_team_status?.toLowerCase() === 'on memo'
  ).length;

  const releasedCount = inquiries.filter(
    (inq) =>
      inq.sale_team_status?.toLowerCase() === 'release' ||
      inq.sale_team_status?.toLowerCase() === 'released'
  ).length;

  const dispatchedCount = inquiries.filter(
    (inq) =>
      inq.sale_team_status?.toLowerCase() === 'dispatch' ||
      inq.sale_team_status?.toLowerCase() === 'dispatched'
  ).length;


  // ✅ Filtered Inquiries by Tab
  const getStatusMatch = (tab: string, status: string | undefined): boolean => {
    if (!status) return false;
    const s = status.toLowerCase();

    switch (tab.toLowerCase()) {
      case 'pending':
        return s === 'pending';
      case 'hold':
        return s === 'hold' || s === 'hold - toh';
      case 'confirmed':
        return s === 'confirmed' || s === 'confirmed - toh';
      case 'not available':
        return s === 'not available' || s === 'on memo';
      case 'released':
        return s === 'release' || s === 'released';
      case 'dispatched':
        return s === 'dispatch' || s === 'dispatched';
      default:
        return true;
    }
  };

  const filteredInquiries =
    selectedStatus.toLowerCase() === 'all'
      ? inquiries
      : inquiries.filter((inq) =>
        getStatusMatch(selectedStatus, inq.sale_team_status)
      );

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User</h1>
      </div>

      {/* Dynamic Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-200 text-blue-900 rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-lg">Total Inquiries</span>
          <span className="text-3xl font-bold mt-2">{totalInquiries}</span>
        </div>
        <div className="bg-green-100 text-green-900 rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-lg">Hold Inquiries</span>
          <span className="text-3xl font-bold mt-2">{holdCount}</span>
        </div>
        <div className="bg-red-100 text-red-900 rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-lg">Not Available</span>
          <span className="text-3xl font-bold mt-2">{notAvailableCount}</span>
        </div>
        <div className="bg-yellow-100 text-yellow-900 rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-lg">Released Items</span>
          <span className="text-3xl font-bold mt-2">{releasedCount}</span>
        </div>
        <div className="bg-purple-200 text-purple-900 rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-lg">Dispatched Items</span>
          <span className="text-3xl font-bold mt-2">{dispatchedCount}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Table + Logs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-lg border border-gray-100 max-h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Inquiry Status Overview</h2>

            {/* Status Tabs */}
            <div className="flex gap-4 mb-4 overflow-x-auto whitespace-nowrap">
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  className={
                    selectedStatus.toLowerCase() === tab.toLowerCase()
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                      : "text-gray-500 hover:text-blue-600"
                  }
                  onClick={() => setSelectedStatus(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Inquiry Table */}
            <div className="overflow-x-auto w-full h-[400px] max-h-[400px]">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className='sticky top-0 bg-gray-200'>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-2 px-3 border border-gray-300">Inquiry ID</th>
                    <th className="py-2 px-3 border border-gray-300">Stock ID</th>
                    <th className="py-2 px-3 border border-gray-300">Shape</th>
                    <th className="py-2 px-3 border border-gray-300">Type</th>
                    <th className="py-2 px-3 border border-gray-300">Status</th>
                    <th className="py-2 px-3 border border-gray-300">Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq, index) => (
                    <tr key={`${inq.inquiry_id || inq.id}-${index}`} className="border-t">
                      <td className="py-2 px-3 border border-gray-300">{inq.id}</td>
                      <td className="py-2 px-3 border border-gray-300">{inq.stock_id || inq.stockId}</td>
                      <td className="py-2 px-3 border border-gray-300">{inq.shape}</td>
                      <td className="py-2 px-3 border border-gray-300">{inq.type}</td>
                      <td className="py-2 px-3 border border-gray-300">
                        <StatusBadge status={inq.sale_team_status || "None"} />
                      </td>
                      <td className="py-2 px-3 border border-gray-300">{inq.sales || 'N/A'}</td>
                    </tr>
                  ))}
                  {filteredInquiries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-400">
                        No inquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">💎 DiamondFlow: How It Works</h2>
            <p className="text-sm text-gray-800">
              👉 Start by logging in based on your role (Admin, Sales, Backend, Account), then add or update inquiries, upload invoices, and manage status.<br />
              🚀 Use the tabs to view inquiries by status (Hold, Confirmed, Dispatch, etc.), and track updates through live notifications.
            </p>

          </div>
        </div>

        {/* Right: Recent Activity */}
        <div>
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 mb-6 h-full max-h-[100vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            {visibleNotifications.length === 0 ? (
              <p className="text-sm text-gray-500 h-[600px] max-h-[600px]">No recent activity</p>
            ) : (
              <ul className="space-y-2 overflow-y-auto h-[600px] max-h-[600px]">
                {visibleNotifications.map((note) => (
                  <li
                    key={note.id}
                    className="border-l-4 border-blue-500 pl-3 text-sm text-gray-800 bg-blue-50 rounded p-2"
                  >
                    <p>{note.message}</p>
                    <p className="text-xs text-gray-500">{note.timestamp}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile Comment Section */}
          <div className="bg-white rounded-lg p-6 shadow block lg:hidden">
            <h2 className="text-lg font-semibold mb-4">💎 DiamondFlow: How It Works</h2>
            <p className="text-sm text-gray-700">
              👉 Start by logging in based on your role (Admin, Sales, Backend, Account), then add or update inquiries, upload invoices, and manage status.
              🚀 Use the tabs to view inquiries by status (Hold, Confirmed, Dispatch, etc.), and track updates through live notifications.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
