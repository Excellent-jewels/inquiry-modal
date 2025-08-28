'use client';

import { useEffect, useState } from 'react';
import InquiryTable from '@/components/InquiryTable';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserRole } from '@/utils/auth';
import axios from 'axios';
import { useNotification } from "@/context/NotificationContext";


const API_URL = "http://localhost:8000/inquiries";

const columns = [
  { key: 'inqDate', label: 'INQ Date' },
  { key: 'todayDate', label: 'Today Date' },
  { key: 'period', label: 'Period' },
  { key: 'sales', label: 'SALES' },
  { key: 'buyer', label: 'Buyer' },
  { key: 'stockId', label: 'STOCK ID' },
  { key: 'shape', label: 'Shape' },
  { key: 'ct', label: 'Ct' },
  { key: 'color', label: 'Color' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'cut', label: 'Cut' },
  { key: 'po', label: 'PO' },
  { key: 'sym', label: 'SYM' },
  { key: 'lab', label: 'LAB' },
  { key: 'report', label: 'REPORT' },
  { key: 'disPpc', label: 'DIS/PPC' },
  { key: 'ppc', label: 'PPC' },
  { key: 'amt', label: 'AMT' },
  { key: 'type', label: 'Type' },
  { key: 'availability', label: 'Sale Team Status' },
  { key: 'payment', label: 'Payment' },
  { key: 'remark', label: 'Remark/ Request' },
  { key: 'location', label: 'Location' },
  { key: 'otRemark', label: 'Backend Status' },
  { key: 'time', label: 'Time' },
  { key: 'statusOfStone', label: 'Status Of Stone' },
  { key: 'qcRemark', label: 'QC REMARK' },
  { key: 'stoneConfirmationRemark', label: 'Stone Confirmation Remark' },
  { key: 'entryStatus', label: 'ENTRY STATUS' },
  { key: 'locationRemark', label: 'Location Remark' },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<any[]>([]);
  const [inputInquiryNo, setInputInquiryNo] = useState('');
  const [inputReport, setInputReport] = useState('');
  const [inputAvailability, setInputAvailability] = useState('');
  const [inputFrom, setInputFrom] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [generatedId, setGeneratedId] = useState('');


  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const newlyAddedId = searchParams.get('newlyAddedId');

  useEffect(() => {
    const r = getUserRole();
    if (!r) {
      router.push('/login');
    } else if (!['admin', 'sales', 'backend'].includes(r)) {
      router.push('/dashboard/inquiries');
    } else {
      setRole(r);
      fetchInquiries();
    }
    setLoading(false);
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to fetch inquiries');
      }

      const raw = await res.json();
      const data = Array.isArray(raw) ? raw : raw.data;

      if (!Array.isArray(data)) {
        console.error("❌ API did not return an array:", raw);
        return;
      }
      const transformed = data.map((item: any) => ({
        ...item,
        inqDate: item.inquiry_date,
        todayDate: item.today_date,
        stockId: item.stock_id,
        disPpc: item.dis_ppc,
        availability: item.sale_team_status,
        remark: item.remark_request,
        otRemark: item.backend_status,
        statusOfStone: item.status_of_stone,
        qcRemark: item.qc_remark,
        stoneConfirmationRemark: item.stone_confirmation_remark,
        entryStatus: item.entry_status,
        locationRemark: item.location_remark,
      }));
      const sorted = [...transformed].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      const pendingOnly = sorted.filter((inq) => inq.availability === "Pending");
      setInquiries(pendingOnly);
      setFilteredInquiries(pendingOnly);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    }
  };

  const handleAutoSaveDropdown = async (id: number | string, key: string, value: string | boolean) => {
    try {
      const token = localStorage.getItem("token") || "";
      const role = localStorage.getItem("role") || "";
      const userName = localStorage.getItem("userName") || "";
      const userKey = `${role}_${userName}`;

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const fieldMap: { [key: string]: string } = {
        disPpc: "dis_ppc",
        availability: "sale_team_status",
        otRemark: "backend_status",
        remark: "remark_request",
        stockId: "stock_id",
        statusOfStone: "status_of_stone",
        qcRemark: "qc_remark",
        stoneConfirmationRemark: "stone_confirmation_remark",
        entryStatus: "entry_status",
        locationRemark: "location_remark",
      };

      const backendKey = fieldMap[key] || key;

      const response = await axios.patch(`http://localhost:8000/inquiries/${id}`, {
        [backendKey]: value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const updated = response.data;

      const updatedItem = {
        ...updated,
        updated_at: new Date().toISOString(),
        inqDate: updated.inquiry_date,
        todayDate: updated.today_date,
        stockId: updated.stock_id,
        disPpc: updated.dis_ppc,
        availability: updated.sale_team_status,
        remark: updated.remark_request,
        otRemark: updated.backend_status,
        statusOfStone: updated.status_of_stone,
        qcRemark: updated.qc_remark,
        stoneConfirmationRemark: updated.stone_confirmation_remark,
        entryStatus: updated.entry_status,
        locationRemark: updated.location_remark,
      };

      const updatedList = [
        updatedItem,
        ...inquiries.filter((item) => item.id !== id),
      ];

      const sorted = updatedList.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      setInquiries(sorted);
      setFilteredInquiries(sorted);
      console.log("✅ Auto-saved:", backendKey, value);
    } catch (error: any) {
      if (error.response) {
        console.error("❌ Auto-save failed:", {
          status: error.response.status,
          message: error.response.data.detail || error.response.data,
        });
      } else {
        console.error("❌ Auto-save error:", error.message);
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromDate = inputFrom ? new Date(inputFrom) : null;

    const filtered = inquiries.filter((inq) => {
      const inqDate = new Date(inq.inqDate);
      return (
        (!inputInquiryNo || String(inq.id).includes(inputInquiryNo)) &&
        (!inputReport || inq.report?.toLowerCase().includes(inputReport.toLowerCase())) &&
        (!inputAvailability || inq.availability === inputAvailability) &&
        (!fromDate || inqDate >= fromDate)
      );
    });

    setFilteredInquiries(filtered);
  };

  const handleReset = () => {
    setInputInquiryNo('');
    setInputReport('');
    setInputAvailability('');
    setInputFrom('');
    setFilteredInquiries(inquiries);
  };

  const handleDeleteInquiry = async (id: number | string) => {
    console.log("🗑 Deleting inquiry:", id); // ✅ Add here to confirm click is working
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Delete failed");
      }

      // Remove deleted item from state
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      setFilteredInquiries(prev => prev.filter(inq => inq.id !== id));
      console.log("✅ Deleted:", id); // ✅ Confirm deletion
    } catch (err) {
      console.error("❌ Failed to delete inquiry", err);
      alert("Something went wrong while deleting.");
    }
  };

  const handleEdit = async (id: number | string, updatedRow: any) => {
    const requestBody = {
      ...updatedRow,
      sale_team_status: updatedRow.availability,
      backend_status: updatedRow.otRemark,
      dis_ppc: updatedRow.disPpc,
      remark_request: updatedRow.remark,
      stock_id: updatedRow.stockId,
      payment: updatedRow.payment,
      status_of_stone: updatedRow.statusOfStone,
      qc_remark: updatedRow.qcRemark,
      stone_confirmation_remark: updatedRow.stoneConfirmationRemark,
      entry_status: updatedRow.entryStatus,
      location_remark: updatedRow.locationRemark,
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to update inquiry:', text);
        throw new Error(text);
      }

      const updated = await res.json();
      const updatedRowMapped = {
        ...updated,
        inqDate: updated.inquiry_date,
        todayDate: updated.today_date,
        stockId: updated.stock_id,
        disPpc: updated.dis_ppc,
        availability: updated.sale_team_status,
        remark: updated.remark_request,
        otRemark: updated.backend_status,
        statusOfStone: updated.status_of_stone,
        qcRemark: updated.qc_remark,
        stoneConfirmationRemark: updated.stone_confirmation_remark,
        entryStatus: updated.entry_status,
        locationRemark: updated.location_remark,
      };

      const newInquiries = [
        updatedRowMapped,
        ...inquiries.filter((inq) => inq.id !== id),
      ];


      const sorted = newInquiries.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      setInquiries(sorted);
      setFilteredInquiries(sorted);
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  const handleFieldChange = async (id: number | string, key: string, value: string | boolean) => {
    try {
      const keyMap: { [key: string]: string } = {
        availability: "sale_team_status",
        remark: "remark_request",
        otRemark: "backend_status",
        stockId: "stock_id",
        disPpc: "dis_ppc",
        statusOfStone: "status_of_stone",
        qcRemark: "qc_remark",
        stoneConfirmationRemark: "stone_confirmation_remark",
        entryStatus: "entry_status",
        locationRemark: "location_remark",
      };

      const backendKey = keyMap[key] || key;

      await axios.put(`http://localhost:8000/inquiries/${id}`, {
        [backendKey]: value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh data or optimistically update UI if needed
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-[1000px]">
      <h1 className="text-3xl font-bold mb-6">Inquiries</h1>

      {/* Filter Form */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <form className="flex flex-wrap gap-4 items-end mb-6" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Inquiry No"
            className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]"
            value={inputInquiryNo}
            onChange={(e) => setInputInquiryNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Report No"
            className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]"
            value={inputReport}
            onChange={(e) => setInputReport(e.target.value)}
          />
          <select
            className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[180px]"
            value={inputAvailability}
            onChange={(e) => setInputAvailability(e.target.value)}
          >
            <option value="">Sale Team Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
            <option value="Hold">Hold</option>
            <option value="On Memo">On Memo</option>
            <option value="Confirmed - TOH">Confirmed - TOH</option>
            <option value="Hold - TOH">Hold - TOH</option>
            <option value="Release">Release</option>
            <option value="ADDED TO STOCK">ADDED TO STOCK</option>
            <option value="IN EXHIBITION">IN EXHIBITION</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            type="date"
            className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[180px]"
            value={inputFrom}
            onChange={(e) => setInputFrom(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition text-sm"
          >
            Reset
          </button>
        </form>
        {/* ✅ Conditionally render "+ New Inquiry" button */}
        {['admin', 'sales'].includes(role || '') && (
          <div className="ml-auto">
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition text-sm"
              onClick={() => router.push('/dashboard/inquiries/add')}
            >
              + New Inquiry
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <InquiryTable
        data={filteredInquiries}
        columns={columns}
        onDelete={handleDeleteInquiry}
        onEdit={handleEdit}
        defaultAvailability="Pending"
        role={role || ''}
        onCheckboxChange={handleAutoSaveDropdown} selectedRows={[]} />
    </div>
  );
}


