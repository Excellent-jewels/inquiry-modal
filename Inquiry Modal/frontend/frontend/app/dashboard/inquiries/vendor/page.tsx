'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { useNotification } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { getUserRole } from "@/utils/auth";
import API_BASE from "@/utils/config";

type VendorInquiry = {
    id: number;
    today_date: string;
    vendor_name: string;
    invoice_date: string;
    terms_days: number;
    payment_date: string;
    bill_no: string;
    backend_ppc: number;
    total_amount: number;
    bank_rate: number;
    total_amount_inr: number;
    diff_ppc: number;
    sales_person_name: string;
    stock_id: string;
    shape: string;
    ct: number;
    color: string;
    clarity: string;
    cut: string;
    po: string;
    sym: string;
    lab: string;
    report: string;
    dis_ppc: number;
    ppc: number;
    amt: number;
    type: string;
    remark: string;
    created_at: string;
};


const defaultVendorData: VendorInquiry = {
    id: 0,
    today_date: '',
    vendor_name: '',
    invoice_date: '',
    terms_days: 0,
    payment_date: '',
    bill_no: '',
    backend_ppc: 0,
    total_amount: 0,
    bank_rate: 0,
    total_amount_inr: 0,
    diff_ppc: 0,
    sales_person_name: '',
    stock_id: '',
    shape: '',
    ct: 0,
    color: '',
    clarity: '',
    cut: '',
    po: '',
    sym: '',
    lab: '',
    report: '',
    dis_ppc: 0,
    ppc: 0,
    amt: 0,
    type: '',
    remark: '',
    created_at: '',
};
type Notification = {
    message: string;
    type: string;
};

export default function VendorPage() {
    const [data, setData] = useState<VendorInquiry[]>([]);
    const [filteredData, setFilteredData] = useState<VendorInquiry[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState<VendorInquiry | null>(null);
    const [editedData, setEditedData] = useState<VendorInquiry>(defaultVendorData);
    const CSVExport = dynamic(() => import('@/components/CSVExport'), { ssr: false });
    const [selectedVendor, setSelectedVendor] = useState<string[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        vendor: '',
        sales: '',
        stockId: ''
    });

    useEffect(() => {
        const fetchRole = async () => {
            const role = await getUserRole(); // get from token, localStorage, or API
            setUserRole(role);
        };
        fetchRole();
    }, []);

    const fullColumns = [
        { key: "id", label: "ID" },
        { key: "today_date", label: "Today Date" },
        { key: "vendor_name", label: "Vendor Name" },
        { key: "invoice_date", label: "Invoice Date" },
        { key: "terms_days", label: "Terms (days)" },
        { key: "payment_date", label: "Payment Date" },
        { key: "bill_no", label: "Bill No" },
        { key: "backend_ppc", label: "Backend PPC" },
        { key: "total_amount", label: "Total Amount ($)" },
        { key: "bank_rate", label: "Bank Rate" },
        { key: "total_amount_inr", label: "Total Amount (INR)" },
        { key: "diff_ppc", label: "Diff PPC ($)" },
        { key: "sales_person_name", label: "Sales Person Name" },
        { key: "stock_id", label: "Stock ID" },
        { key: "shape", label: "Shape" },
        { key: "ct", label: "CT" },
        { key: "color", label: "Color" },
        { key: "clarity", label: "Clarity" },
        { key: "cut", label: "Cut" },
        { key: "po", label: "PO" },
        { key: "sym", label: "Sym" },
        { key: "lab", label: "Lab" },
        { key: "report", label: "Report" },
        { key: "dis_ppc", label: "DIS/PPC" },
        { key: "ppc", label: "PPC" },
        { key: "amt", label: "AMT" },
        { key: "type", label: "Type" },
        { key: "remark", label: "Remark" },
        { key: "action", label: "Action" },
    ];

    const accountColumns = [
        { key: "id", label: "ID" },
        { key: "today_date", label: "Today Date" },
        { key: "vendor_name", label: "Vendor Name" },
        { key: "invoice_date", label: "Invoice Date" },
        { key: "terms_days", label: "Terms (days)" },
        { key: "payment_date", label: "Payment Date" },
        { key: "bill_no", label: "Bill No" },
        { key: "backend_ppc", label: "Backend PPC" },
        { key: "total_amount", label: "Total Amount ($)" },
        { key: "bank_rate", label: "Bank Rate" },
        { key: "total_amount_inr", label: "Total Amount (INR)" },
        { key: "remark", label: "Remark" },
        { key: "action", label: "Action" },
    ];

    const vendorColumns =
        userRole === "admin" || userRole === "backend"
            ? fullColumns
            : userRole === "account"
                ? accountColumns.filter((col) => {
                    // Hide stock info columns if editing
                    if (editingRowId !== null && (col.key === "stock_rate" || col.key === "stock_location")) {
                        return false;
                    }
                    return true;
                })
                : [];



    const handleRowCheckbox = (id: number, checked: boolean) => {
        setSelectedRows((prev) =>
            checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
        );
    };

    const handleSelectAllRows = (checked: boolean) => {
        const allIds = filteredData.map((row) => row.id);
        setSelectedRows(checked ? allIds : []);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        const { dateFrom, dateTo, vendor, sales, stockId } = filters;
        const filtered = data.filter((item) => {
            const itemDate = new Date(item.invoice_date);
            const fromDate = dateFrom ? new Date(dateFrom) : null;
            const toDate = dateTo ? new Date(dateTo) : null;

            return (
                (!fromDate || itemDate >= fromDate) &&
                (!toDate || itemDate <= toDate) &&
                (!vendor || item.vendor_name?.toLowerCase().includes(vendor.toLowerCase())) &&
                (!sales || item.sales_person_name?.toLowerCase().includes(sales.toLowerCase())) &&
                (!stockId || item.stock_id?.toLowerCase().includes(stockId.toLowerCase()))
            );
        });
        setFilteredData(filtered);
    };

    const handleReset = () => {
        setFilters({ dateFrom: '', dateTo: '', vendor: '', sales: '', stockId: '' });
        setFilteredData(data);
    };

    // Fetch and sync vendor data
    useEffect(() => {
        const syncAndFetch = async () => {
            try {
                await axios.post(`${API_BASE}/vendor/sync`);
                const response = await axios.get(`${API_BASE}/vendor`);
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error("Error fetching vendor data:", error);
            }
        };
        syncAndFetch();
    }, []);

    const openEditModal = (row: VendorInquiry) => {
        setEditData(row);
        setEditedData(row);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setEditData(null);
    };

    useEffect(() => {
        return setEditedData(editedData);
    }, [editedData]);

    const handleSave = async () => {
        try {
            if (!editedData.id) {
                console.error("Missing vendor ID");
                return;
            }
            const response = await axios.put(`${API_BASE}/vendor/${editedData.id}`, editedData);
            const updatedVendor = response.data;
            const updated = data.map(item =>
                item.id === updatedVendor.id ? updatedVendor : item
            );

            setData(updated);
            setFilteredData(updated);
            closeEditModal();
        } catch (error) {
            console.error("Save error:", error);
        }
    };
    return (

        <div className="p-6 bg-white rounded-lg shadow-md h-[1000px]">
            <h1 className="text-3xl font-bold mb-6">Vendor Inquiry</h1>

            {/* 🔍 Filters */}
            <div className="flex flex-wrap gap-4 mb-6 items-end">
                <form className="flex flex-wrap gap-4 items-end mb-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}>
                    <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleInputChange}
                        className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]" />
                    <input type="date" name="dateTo" value={filters.dateTo} onChange={handleInputChange}
                        className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]" />
                    <input type="text" name="vendor" value={filters.vendor} onChange={handleInputChange}
                        placeholder="Vendor Name"
                        className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]" />
                    <input type="text" name="sales" value={filters.sales} onChange={handleInputChange}
                        placeholder="Sales Person"
                        className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]" />
                    <input type="text" name="stockId" value={filters.stockId} onChange={handleInputChange}
                        placeholder="Stock ID"
                        className="border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]" />
                    <button type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                        Search
                    </button>
                    <button type="button" onClick={handleReset}
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition text-sm">
                        Reset
                    </button>
                    <CSVExport
                        data={selectedRows.length > 0 ? data.filter(d => selectedRows.includes(d.id)) : data}
                        filename="vendor_inquiries.csv"
                        disabled={data.length === 0}
                    />
                </form>
            </div>

            {/* 📊 Table */}
            <div className="overflow-x-auto bg-white shadow h-[calc(80vh-180px)] max-h-screen mt-6">
                <table className="min-w-[1800px] w-full text-xs border border-gray-300">
                    <thead className=" top-0 z-100 bg-gray-200 border-b border-gray-300">
                        <tr className="text-gray-700">
                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">
                                <input type="checkbox"
                                    checked={filteredData.length > 0 && filteredData.every(row => selectedRows.includes(row.id))}
                                    onChange={(e) => handleSelectAllRows(e.target.checked)} />
                            </th>
                            {vendorColumns.map((col) => (
                                <th key={col.key}
                                    className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={vendorColumns.length + 1}
                                    className="text-center py-6 text-gray-500">No data available</td>
                            </tr>
                        ) : (
                            filteredData.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`hover:bg-gray-50
                                        ${row.remark === "Payment done!"
                                            ? "bg-green-200 hover:bg-green-300"
                                            : row.payment_date &&
                                                dayjs(row.payment_date).isBefore(dayjs(), 'day') &&
                                                row.remark !== "Payment done!"
                                                ? "bg-red-200 hover:bg-red-300"
                                                : (row.vendor_name || row.invoice_date || row.terms_days || row.payment_date || row.bill_no ||
                                                    row.backend_ppc || row.total_amount || row.bank_rate || row.total_amount_inr || row.diff_ppc)
                                                    ? "bg-yellow-200 hover:bg-yellow-300"
                                                    : ""
                                        }`}
                                >



                                    <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">
                                        <input type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={(e) => handleRowCheckbox(row.id, e.target.checked)} />
                                    </td>

                                    {vendorColumns.map((col) => (
                                        <td key={col.key}
                                            className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">
                                            {col.key === "action" ? (
                                                <div className="flex gap-2 justify-center">
                                                    <button className="text-blue-600 hover:text-blue-800"
                                                        onClick={() => openEditModal(row)}>✏️</button>
                                                </div>
                                            ) : (
                                                row[col.key as keyof VendorInquiry] ?? "-"
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Modal Component for Editing Vendor Inquiry */}
            {isEditOpen && editData && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-[80%] max-w-6xl rounded shadow-lg p-6 overflow-auto max-h-[90vh] relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={closeEditModal}>✖</button>
                        <h2 className="text-xl font-bold mb-4">Edit Vendor Inquiry</h2>

                        {/* Input fields */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block text-sm">Vendor Name</label>
                                <input className="border px-2 py-1 rounded w-full border-gray-400 text-sm" value={editedData.vendor_name || ""}
                                    onChange={(e) => setEditedData({ ...editedData, vendor_name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm">Invoice Date</label>
                                <input type="date" className="border px-2 py-1 rounded w-full text-sm border-gray-400" value={editedData.invoice_date || ""}
                                    onChange={(e) => setEditedData({ ...editedData, invoice_date: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm">Terms (days)</label>
                                <input type="number" className="border px-2 py-1 rounded w-full text-sm border-gray-400" value={editedData.terms_days || ""}
                                    onChange={(e) => setEditedData({ ...editedData, terms_days: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm">Bill No</label>
                                <input className="border px-2 py-1 rounded w-full text-sm border-gray-400" value={editedData.bill_no || ""}
                                    onChange={(e) => setEditedData({ ...editedData, bill_no: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm">Backend PPC</label>
                                <input type="number" className="border px-2 py-1 rounded w-full text-sm border-gray-400" value={editedData.backend_ppc || ""}
                                    onChange={(e) => setEditedData({ ...editedData, backend_ppc: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm">Bank Rate</label>
                                <input type="number" className="border px-2 py-1 rounded w-full text-sm border-gray-400" value={editedData.bank_rate || ""}
                                    onChange={(e) => setEditedData({ ...editedData, bank_rate: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm">Remark</label>
                                <select
                                    className="border px-2 py-1 rounded w-full text-sm border-gray-400"
                                    value={editedData.remark || ""}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, remark: e.target.value })
                                    }
                                >
                                    <option value="" disabled>Select Remark</option>
                                    <option value="-">Null</option>
                                    <option value="Payment not done!">Payment not done!</option>
                                    <option value="Payment done!">Payment done!</option>

                                </select>
                            </div>
                        </div>

                        {userRole !== "account" && (
                            <>
                                {/* Table fields */}
                                <h3 className="text-lg font-semibold mb-2">Stock Information</h3>
                                <table className="text-xs border border-gray-300 w-full mb-6">
                                    <thead className="bg-gray-200 border-b border-gray-300">
                                        <tr className="text-gray-700">
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Sales Person</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Stock ID</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Shape</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">CT</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Color</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Clarity</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Cut</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">PO</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Sym</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Lab</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Report</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">DIS/PPC</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">PPC</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">AMT</th>
                                            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.sales_person_name}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.stock_id}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.shape}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.ct}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.color}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.clarity}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.cut}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.po}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.sym}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.lab}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.report}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.dis_ppc}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.ppc}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.amt}</td>
                                            <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">{editData.type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )}

                        <div className="flex justify-end gap-3">
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeEditModal}>Cancel</button>
                            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}