'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/solid';


const initialState = {
  inquiryId: '',
  inqDate: '',
  todayDate: new Date().toISOString().slice(0, 10),
  Period: '',
  sales: '',
  buyer: '',
  stockId: '',
  shape: '',
  ct: '',
  color: '',
  clarity: '',
  cut: '',
  po: '',
  sym: '',
  lab: '',
  report: '',
  disPpc: '',
  ppc: '',
  amt: '',
  type: '',
  availability: 'Pending',
  remark: '',
};

type InquiryType = typeof initialState;

export default function AddInquiryPage() {
  const [inquiryData, setInquiryData] = useState(initialState);
  const [inquiries, setInquiries] = useState<InquiryType[]>([{ ...initialState }]);
  const [generatedId, setGeneratedId] = useState('');
  const router = useRouter();

  const tableFields = [
    "stockId", "shape", "ct", "color", "clarity", "cut", "po", "sym", "report", "lab", "disPpc", "ppc", "amt"
  ];

  const generateInquiryId = () =>
    `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      alert("You are not logged in. Please login again.");
      router.push("/");
      return;
    }

    try {
      for (const row of inquiries) {
        const inquiryId = row.inquiryId || generatedId;

        const body = {
          inquiry_id: inquiryId,
          inquiry_date: inquiryData.inqDate || new Date().toISOString().slice(0, 10),
          today_date: inquiryData.todayDate || new Date().toISOString().slice(0, 10),
          period: inquiryData.Period,
          sales: inquiryData.sales,
          buyer: inquiryData.buyer,
          stock_id: row.stockId,
          shape: row.shape,
          ct: row.ct,
          color: row.color,
          clarity: row.clarity,
          cut: row.cut,
          po: row.po,
          sym: row.sym,
          lab: row.lab,
          report: row.report,
          dis_ppc: row.disPpc,
          ppc: row.ppc,
          amt: row.amt,
          type: inquiryData.type,
          sale_team_status: inquiryData.availability,
          payment: "",
          remark_request: inquiryData.remark,
          location: "",
          backend_status: "",
          time: "00:00:00",
          status_of_stone: "",
          qc_remark: "",
          stone_confirmation_remark: "",
          entry_status: "",
          location_remark: "",
          created_by: parseInt(userId),
          created_at: new Date().toISOString(),
          invoice_file: "",
        };

        const response = await fetch("http://localhost:8000/inquiries/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
      }

      alert("Inquiry saved successfully!");
      router.push("/dashboard/inquiries");

    } catch (error: any) {
      console.error("Error saving inquiry:", error);
      alert("Failed to save inquiry: " + (error?.message || "Check console"));
    }
  };

  const handleClose = () => {
    router.push('/dashboard/inquiries');
  };

  const handleClear = () => {
    setInquiryData(initialState);
    setInquiries([{ ...initialState }]);
  };

  const handlePasteRow = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startRowIdx: number,
    startKey: string
  ) => {
    const pasted = e.clipboardData.getData("text");
    const rows = pasted.split(/\r?\n/).filter(row => row.trim() !== "");
    if (rows.length === 0) {
      return;
    }

    const colStartIdx = tableFields.indexOf(startKey);
    const newInquiries: InquiryType[] = [...inquiries];

    rows.forEach((rowStr, rowOffset) => {
      const values = rowStr.split(/\t|,/);
      const targetRowIdx = startRowIdx + rowOffset;

      if (!newInquiries[targetRowIdx]) {
        newInquiries[targetRowIdx] = {
          ...initialState,
          inquiryId: generateInquiryId()
        };
      }

      if (!newInquiries[targetRowIdx].inquiryId) {
        newInquiries[targetRowIdx].inquiryId = generateInquiryId();
      }

      for (let i = 0; i < values.length; i++) {
        const colIdx = colStartIdx + i;
        if (colIdx < tableFields.length) {
          const key = tableFields[colIdx] as keyof InquiryType;
          newInquiries[targetRowIdx][key] = values[i];
        }
      }
    });

    setInquiries(newInquiries);
    e.preventDefault();
  };

  const handleAddRow = () => {
    setInquiries([...inquiries, {
      ...initialState,
      inquiryId: generateInquiryId()
    }]);
  };

  useEffect(() => {
    const fetchInquiryId = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please login again.");
        router.push("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/inquiries/new-id", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setGeneratedId(data.inquiry_id);
      } catch (error) {
        console.error("Failed to fetch inquiry ID", error);
      }
    };

    fetchInquiryId();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Inquiry</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Inquiry ID</label>
          <input
            type="text"
            value={generatedId || ""}
            readOnly
            className="w-full border border-gray-300 bg-gray-100 rounded px-3 py-2 text-sm"
          />
        </div>

        {Object.keys(initialState)
          .filter(key => !tableFields.includes(key) && key !== "type" && key !== "availability" && key !== "remark" && key !== "inquiryId")
          .map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')}
              </label>
              <input
                type={key === 'inqDate' || key === 'todayDate' ? 'date' : 'text'}
                name={key}
                value={inquiryData[key as keyof typeof initialState] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                readOnly={key === 'todayDate'}
              />
            </div>
          ))}

        <div className="md:col-span-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={inquiryData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Sale Team Status</label>
            <input
              type="text"
              name="availability"
              value={inquiryData.availability}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Remark / Request</label>
            <input
              type="text"
              name="remark"
              value={inquiryData.remark}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Enter remark or request"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-4">
        <button
          type="button"
          onClick={handleAddRow}
          className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-900 text-white rounded"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              {tableFields.map((key) => (
                <th key={key} className="px-3 py-2 border-b border-gray-300 text-sm font-semibold capitalize">
                  {key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {tableFields.map((key) => (
                  <td key={key} className="px-3 py-2 border-b border-gray-200">
                    <input
                      type="text"
                      name={key}
                      value={row[key as keyof InquiryType] || ""}
                      onChange={e => {
                        const updated = [...inquiries];
                        updated[rowIdx][key as keyof InquiryType] = e.target.value;
                        setInquiries(updated);
                      }}
                      onPaste={(e) => handlePasteRow(e, rowIdx, key)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleClose}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Close
        </button>
        <button
          onClick={handleClear}
          type="button"
          className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
        >
          Clean
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
