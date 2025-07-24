'use client';
import React, { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import {
  typeOptions,
  availabilityOptions,
  paymentOptions,
  qcRemarkOptions,
  statusOfStoneOptions,
  otRemarkOptions,
  locationOptions,
  StatusDropdown,
} from "./StatusUpdateModal";
import { useUserRole } from "../hooks/useUserRole";
import StatusBadge from "./StatusBadge";
import axios from "axios";

type Inquiry = {
  [key: string]: any;
  id: number | string;
};

type InquiryTableProps = {
  data: Inquiry[];
  columns: { key: string; label: string }[];
  onDelete?: (id: number | string) => void;
  onEdit?: (id: number | string, updatedRow: Inquiry) => void;
  onCheckboxChange?: (rowId: number | string, colKey: string, value: boolean | string) => void;
  onSelectAll?: (colKey: string, checked: boolean) => void;
  defaultAvailability?: string;
  rowCheckbox?: boolean;
  selectedIds?: (number | string)[];
  selectedRows: (number | string)[];
  onRowCheckbox?: (id: number | string, checked: boolean) => void;
  onSelectAllRows?: (checked: boolean) => void;
  role: string;
  showInvoiceColumn?: boolean;
  pageType?: string;
  showBillColumn?: boolean;
};

export default function InquiryTable({
  data,
  columns,
  onDelete,
  onEdit,
  onCheckboxChange,
  onSelectAll,
  defaultAvailability = "PENDING",
  rowCheckbox = false,
  selectedRows = [],
  onRowCheckbox,
  onSelectAllRows,
  role,
  showInvoiceColumn = false,
  pageType = "sales",
  showBillColumn = false,
}: InquiryTableProps) {
  const { role: userRole } = useUserRole();
  const [openTypeMenu, setOpenTypeMenu] = useState<number | string | null>(null);
  const [editingRowId, setEditingRowId] = useState<number | string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: any }>({});
  const [selectedRowsState, setSelectedRows] = useState<(number | string)[]>([]);
  const [invoiceFiles, setInvoiceFiles] = useState<{ [key: string]: string }>({});


  const editableFieldsByRole: { [key: string]: string[] } = {
    admin: columns.map((col) => col.key),
    sales: columns.map((col) => col.key).filter((key) =>
      [
        'inquiry_id', 'inq_date', 'today_date', 'period', 'sales', 'buyer', 'stockId',
        'shape', 'ct', 'color', 'clarity', 'cut', 'po', 'sym', 'lab', 'report',
        'disPpc', 'ppc', 'amt', 'type', 'availability', 'payment', 'remark'
      ].includes(key)
    ),
    backend: [
      'location', 'otRemark', 'time', 'statusOfStone', 'qcRemark',
      'stoneConfirmationRemark', 'entryStatus', 'locationRemark'
    ],
    account: []
  };

  const editableFields = userRole && editableFieldsByRole[userRole] ? editableFieldsByRole[userRole] : [];

  const handleEdit = (id: number | string) => {
    const row = data.find((d) => d.id === id);
    if (row?.sale_team_status === "Dispatched") return; // Prevent editing
    setEditingRowId(id);
    setEditValues(row ? { ...row } : {});
  };

  const handleSave = () => {
    if (onEdit && editingRowId) {
      onEdit(editingRowId, { ...editValues, id: editingRowId });
    }
    setEditingRowId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditValues({});
  };

  const isDropdownField = (key: string) =>
    ["type", "availability", "payment", "qcRemark", "statusOfStone", "otRemark", "location"].includes(key);

  const isAutoSaveDropdown = (key: string) =>
    (userRole === "sales" && ["type", "availability", "payment"].includes(key)) ||
    (userRole === "backend" && ["qcRemark", "statusOfStone", "otRemark", "location"].includes(key)) ||
    (userRole === "admin" && isDropdownField(key));

  const getDropdownOptions = (key: string) => {
    switch (key) {
      case "type": return typeOptions;
      case "availability": return availabilityOptions;
      case "payment": return paymentOptions;
      case "qcRemark": return qcRemarkOptions;
      case "statusOfStone": return statusOfStoneOptions;
      case "otRemark": return otRemarkOptions;
      case "location": return locationOptions;
      default: return [];
    }
  };

  const isAllRowsSelected = data.length > 0 && data.every(row => selectedRows.includes(row.id));

  const InvoiceIcon = ({ color = "#325c85" }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="2" />
      <path d="M8 12h8M8 12l4-4m-4 4l4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="16 3 21 3 21 8" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );

  


  return (
    <div className="overflow-x-auto bg-white shadow h-[calc(80vh-180px)] max-h-screen">
      <table className="min-w-[1800px] w-full text-xs border border-gray-300">
        <thead className="sticky top-0 z-100 bg-gray-200 border-b border-gray-300">
          <tr className="text-gray-700">
            {rowCheckbox && (
              <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={data.length > 0 && data.every(row => selectedRows.includes(row.id))}
                  onChange={e => onSelectAllRows && onSelectAllRows(e.target.checked)}
                />
              </th>
            )}
            {showInvoiceColumn && ["admin", "sales", "account"].includes(role) && (
              <th className="py-3 px-3 border border-gray-300 text-center align-middle">
                Invoice
              </th>
            )}
            <th className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">Inquiry ID</th>
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {onDelete && <th className="py-2 px-3 font-semibold border border-gray-300">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onDelete ? 2 : 1) + (rowCheckbox ? 1 : 0)}
                className="text-center py-4 text-gray-400 border border-gray-200 whitespace-nowrap"
              >
                No inquiries found.
              </td>
            </tr>
          )}
          {data.map((inquiry) => {
            const isEditing = editingRowId === inquiry.id;
            return (
              <tr key={inquiry.id}>
                {rowCheckbox && (
                  <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(inquiry.id)}
                      onChange={e => onRowCheckbox && onRowCheckbox(inquiry.id, e.target.checked)}
                    />
                  </td>
                )}
                {/* --- Invoice column added here --- */}
                {showInvoiceColumn && ["admin", "sales", "account"].includes(role) && (
                  <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">
                    {["admin", "sales"].includes(role) ? (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const fileInput = e.currentTarget.elements.namedItem("invoiceFile") as HTMLInputElement;
                          if (!fileInput.files?.[0]) return;
                          const file = fileInput.files[0];
                          const formData = new FormData();
                          formData.append("invoice", file);
                          formData.append("inquiry_id", inquiry.inquiry_id);

                          await fetch("http://localhost:8000/inquiries/upload-invoice", {
                            method: "POST",
                            body: formData,
                          });

                          alert("Invoice uploaded!");
                          window.location.reload();
                        }}
                      >
                        <input
                          type="file"
                          name="invoiceFile"
                          accept=".pdf,.jpg,.png"
                          style={{ display: "none" }}
                          id={`invoice-file-${inquiry.id}`}
                          onChange={(e) => e.currentTarget.form?.requestSubmit()}
                        />
                        <label htmlFor={`invoice-file-${inquiry.id}`} style={{ cursor: "pointer" }}>
                          <InvoiceIcon />
                        </label>
                        {inquiry.invoice_file ? (
                          <a
                            href={`http://localhost:8000/uploaded_invoices/${inquiry.invoice_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-1 text-blue-500 text-xs underline"
                          >
                            View Invoice
                          </a>
                        ) : (
                          <span className="block mt-1 text-gray-400 text-xs">No file</span>
                        )}
                      </form>
                    ) : (
                      inquiry.invoice_file ? (
                        <a
                          href={`http://localhost:8000/uploaded_invoices/${inquiry.invoice_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-500 text-xs underline"
                        >
                          View Invoice
                        </a>
                      ) : (
                        <span className="block text-gray-400 text-xs">No file</span>
                      )
                    )}
                  </td>
                )}

                {/* --- End Invoice column --- */}
                <td className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap">
                  {pageType === "backend" ? inquiry.inquiry_id : inquiry.id}
                </td>
                {columns.map((col) => {
                  const isEditable = editableFields.includes(col.key) && inquiry.sale_team_status !== "dispatch";
                  const isDropdown = isDropdownField(col.key);
                  const isAutoSave = isAutoSaveDropdown(col.key);
                  const dropdownOptions = getDropdownOptions(col.key);
                  const fieldValue = inquiry[col.key] ?? "";

                  return (
                    <td
                      key={col.key}
                      className="py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap"
                      style={{ position: "relative", minHeight: 64 }}
                    >
                      {isAutoSave && inquiry.sale_team_status !== "Dispatched" ? (
                        <StatusDropdown
                          options={dropdownOptions}
                          value={fieldValue}
                          onChange={(val) =>
                            onCheckboxChange && onCheckboxChange(inquiry.id, col.key, val)
                          }
                          open={openTypeMenu}
                          setOpen={setOpenTypeMenu}
                          id={inquiry.id}
                          colKey={col.key}
                        />
                      ) : isEditing && isEditable ? (
                        col.label === "FALSE" ? (
                          <input
                            type="checkbox"
                            checked={!!editValues[col.key]}
                            onChange={(e) =>
                              setEditValues((prev) => ({ ...prev, [col.key]: e.target.checked }))
                            }
                            className="accent-blue-500"
                          />
                        ) : isDropdown ? (
                          <StatusDropdown
                            options={dropdownOptions}
                            value={editValues[col.key] || ""}
                            onChange={(val) =>
                              setEditValues((prev) => ({ ...prev, [col.key]: val }))
                            }
                            open={openTypeMenu}
                            setOpen={setOpenTypeMenu}
                            id={inquiry.id}
                            colKey={col.key}
                          />
                        ) : (
                          <input
                            type="text"
                            value={editValues[col.key] || ""}
                            onChange={(e) =>
                              setEditValues((prev) => ({ ...prev, [col.key]: e.target.value }))
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        )
                      ) : col.label === "FALSE" ? (
                        <input
                          type="checkbox"
                          checked={!!inquiry[col.key]}
                          onChange={e =>
                            onCheckboxChange && onCheckboxChange(inquiry.id, col.key, e.target.checked)
                          }
                          className="accent-blue-500"
                        />
                      ) : isDropdown ? (
                        <StatusBadge status={fieldValue || "None"} />
                      ) : (
                        fieldValue
                      )}
                    </td>
                  );
                })}
                {onDelete && (
                  <td className="py-3 px-3 border border-gray-200 text-center whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      {isEditing ? (
                        <>
                          <button className="text-green-600 font-semibold px-2" onClick={handleSave}>
                            Save
                          </button>
                          <button className="text-gray-500 font-semibold px-2" onClick={handleCancel}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="text-blue-500"
                            onClick={() => handleEdit(inquiry.id)}
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => onDelete && onDelete(inquiry.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function setTableData(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}

