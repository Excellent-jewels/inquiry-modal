'use client';

import React, { useEffect, useState } from "react";
import InquiryTable from "./InquiryTable";
import { getUserRole } from "@/utils/auth";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useNotification } from "@/context/NotificationContext";
import dynamic from "next/dynamic";

type Inquiry = {
  [key: string]: any;
  id: number | string;
};

type InquiryStatusPageProps = {
  title: string;
  statuses: string[];
  showInvoiceColumn?: boolean;
};

const API_URL = "http://localhost:8000/inquiries";
const ClientCSVLink = dynamic(() => import('./ClientCSVLink').then(mod => mod.default), {
  ssr: false,
});
const columns = [
  { key: "inqDate", label: "INQ Date" },
  { key: "todayDate", label: "Today Date" },
  { key: "period", label: "Period" },
  { key: "sales", label: "Sales" },
  { key: "buyer", label: "Buyer" },
  { key: "stockId", label: "Stock ID" },
  { key: "shape", label: "Shape" },
  { key: "ct", label: "CT" },
  { key: "color", label: "Color" },
  { key: "clarity", label: "Clarity" },
  { key: "cut", label: "Cut" },
  { key: "po", label: "PO" },
  { key: "sym", label: "Sym" },
  { key: "lab", label: "Lab" },
  { key: "report", label: "REPORT" },
  { key: "disPpc", label: "DIS/PPC" },
  { key: "ppc", label: "PPC" },
  { key: "amt", label: "AMT" },
  { key: "type", label: "Type" },
  { key: "availability", label: "Sale Team Status" },
  { key: "payment", label: "Payment" },
  { key: "remark", label: "Remark" },
  { key: "location", label: "Location" },
  { key: "otRemark", label: "Backend Status" },
  { key: "time", label: "Time" },
  { key: "statusOfStone", label: "Status of Stone" },
  { key: "qcRemark", label: "QC Remark" },
  { key: "stoneConfirmationRemark", label: "Stone Confirmation Remark" },
  { key: "entryStatus", label: "Entry Status" },
  { key: "locationRemark", label: "Location Remark" },
];

export default function InquiryStatusPage({ title, statuses, showInvoiceColumn = false, }: InquiryStatusPageProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filtered, setFiltered] = useState<Inquiry[]>([]);
  const [inputInquiryNo, setInputInquiryNo] = useState("");
  const [inputReport, setInputReport] = useState("");
  const [inputAvailability, setInputAvailability] = useState("");
  const [inputFrom, setInputFrom] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const [generatedId, setGeneratedId] = useState('');
  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);

  useEffect(() => {
    const r = getUserRole();
    if (!r) {
      router.push("/login");
    } else {
      setRole(r);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

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

      const filteredByStatus = transformed.filter((inq: { availability: string; }) =>
        statuses.includes(inq.availability)
      );

      setInquiries(filteredByStatus);
      setFiltered(filteredByStatus);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    }
  };

  const handleEdit = async (id: number | string, updatedRow: Inquiry) => {
    const token = localStorage.getItem("token");
    const payload = {
      ...updatedRow,
      sale_team_status: updatedRow.availability,
      backend_status: updatedRow.otRemark,
      dis_ppc: updatedRow.disPpc,
      remark_request: updatedRow.remark,
      stock_id: updatedRow.stockId,
      status_of_stone: updatedRow.statusOfStone,
      qc_remark: updatedRow.qcRemark,
      stone_confirmation_remark: updatedRow.stoneConfirmationRemark,
      entry_status: updatedRow.entryStatus,
      location_remark: updatedRow.locationRemark,
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const updated = await res.json();

      const updatedList = inquiries.map((inq) =>
        inq.id === id
          ? {
            ...inq,
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
          }
          : inq
      );

      setInquiries(updatedList);
      setFiltered(updatedList);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleAutoSaveDropdown = async (
    id: number | string,
    key: string,
    value: string | boolean
  ) => {
    const token = localStorage.getItem("token") || "";
    const role = localStorage.getItem("role") || "";
    const userName = localStorage.getItem("userName") || "";
    const userKey = `${role}_${userName}`;

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

    try {
      const res = await axios.patch(`${API_URL}/${id}`, {
        [backendKey]: value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const updated = res.data;

      const updatedList = inquiries.map((item) =>
        item.id === id
          ? {
            ...item,
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
          }
          : item
      );

      setInquiries(updatedList);
      setFiltered(updatedList);
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const fromDate = inputFrom ? new Date(inputFrom) : null;

    const newFiltered = inquiries.filter((inq) => {
      const inqDate = new Date(inq.inqDate);
      return (
        (!inputInquiryNo || String(inq.id).toLowerCase().includes(inputInquiryNo.toLowerCase())) &&
        (!inputReport || (inq.report && inq.report.toLowerCase().includes(inputReport.toLowerCase()))) &&
        (!inputAvailability || (inq.availability && inq.availability.toLowerCase() === inputAvailability.toLowerCase())) &&
        (!fromDate || inqDate >= fromDate)
      );
    });

    setFiltered(newFiltered);
  };

  const handleReset = () => {
    setInputInquiryNo("");
    setInputReport("");
    setInputAvailability("");
    setInputFrom("");
    setFiltered(inquiries);
  };

  const handleDeleteInquiry = async (id: number | string) => {
    console.log("🗑 Deleting inquiry:", id);
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

      // ✅ Update the correct states
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      setFiltered(prev => prev.filter(inq => inq.id !== id));
      console.log("🗑 Deleting inquiry with ID:", id);
    } catch (err) {
      console.error("❌ Failed to delete inquiry", err);
      alert("Something went wrong while deleting.");
    }
  };

  const handleRowCheckbox = (id: number | string, checked: boolean) => {
    setSelectedRows(prev =>
      checked ? [...prev, id] : prev.filter(rowId => rowId !== id)
    );
  };

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filtered.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-[1000px]">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition text-sm"
          >
            Reset
          </button>
          {/* Only show download button on Dispatch page */}
          {title === "Dispatched" && (
            <ClientCSVLink
              data={filtered.filter(row => selectedRows.includes(row.id))}
              headers={columns.map(col => ({ label: col.label, key: col.key }))}
              filename="inquiries.csv"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
            >
              Download Data
            </ClientCSVLink>
          )}
        </form>
      </div>

      <InquiryTable
        data={filtered}
        columns={columns}
        role={role || ""}
        onEdit={handleEdit}
        onDelete={handleDeleteInquiry}
        onCheckboxChange={handleAutoSaveDropdown}
        defaultAvailability={statuses[0]}
        selectedRows={selectedRows}
        rowCheckbox={title === "Dispatched"}
        onRowCheckbox={handleRowCheckbox}
        onSelectAllRows={handleSelectAllRows}
        showInvoiceColumn={showInvoiceColumn}
      />
    </div>
  );
}
function setFilteredInquiries(arg0: (prev: any[]) => any[]) {
  throw new Error("Function not implemented.");
}

