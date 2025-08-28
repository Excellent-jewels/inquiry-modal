(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/dashboard/inquiries/add/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AddInquiryPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript) <export default as PlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/config.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
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
    remark: ''
};
function AddInquiryPage() {
    _s();
    const [inquiryData, setInquiryData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const [inquiries, setInquiries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            ...initialState
        }
    ]);
    const [generatedId, setGeneratedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const tableFields = [
        "stockId",
        "shape",
        "ct",
        "color",
        "clarity",
        "cut",
        "po",
        "sym",
        "report",
        "lab",
        "disPpc",
        "ppc",
        "amt"
    ];
    const generateInquiryId = ()=>`${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const handleChange = (e)=>{
        setInquiryData({
            ...inquiryData,
            [e.target.name]: e.target.value
        });
    };
    const handleSave = async ()=>{
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token || !userId) {
            alert("You are not logged in. Please login again.");
            router.push("/");
            return;
        }
        try {
            for (const row of inquiries){
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
                    invoice_file: ""
                };
                const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/inquiries/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
            }
            alert("Inquiry saved successfully!");
            router.push("/dashboard/inquiries");
        } catch (error) {
            console.error("Error saving inquiry:", error);
            alert("Failed to save inquiry: " + (error?.message || "Check console"));
        }
    };
    const handleClose = ()=>{
        router.push('/dashboard/inquiries');
    };
    const handleClear = ()=>{
        setInquiryData(initialState);
        setInquiries([
            {
                ...initialState
            }
        ]);
    };
    const handlePasteRow = (e, startRowIdx, startKey)=>{
        const pasted = e.clipboardData.getData("text");
        const rows = pasted.split(/\r?\n/).filter((row)=>row.trim() !== "");
        if (rows.length === 0) {
            return;
        }
        const colStartIdx = tableFields.indexOf(startKey);
        const newInquiries = [
            ...inquiries
        ];
        rows.forEach((rowStr, rowOffset)=>{
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
            for(let i = 0; i < values.length; i++){
                const colIdx = colStartIdx + i;
                if (colIdx < tableFields.length) {
                    const key = tableFields[colIdx];
                    newInquiries[targetRowIdx][key] = values[i];
                }
            }
        });
        setInquiries(newInquiries);
        e.preventDefault();
    };
    const handleAddRow = ()=>{
        setInquiries([
            ...inquiries,
            {
                ...initialState,
                inquiryId: generateInquiryId()
            }
        ]);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddInquiryPage.useEffect": ()=>{
            const fetchInquiryId = {
                "AddInquiryPage.useEffect.fetchInquiryId": async ()=>{
                    const token = localStorage.getItem("token");
                    if (!token) {
                        alert("You are not logged in. Please login again.");
                        router.push("/");
                        return;
                    }
                    try {
                        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/inquiries/new-id`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const data = await res.json();
                        setGeneratedId(data.inquiry_id);
                    } catch (error) {
                        console.error("Failed to fetch inquiry ID", error);
                    }
                }
            }["AddInquiryPage.useEffect.fetchInquiryId"];
            fetchInquiryId();
        }
    }["AddInquiryPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white shadow rounded-lg p-6 max-w-full overflow-x-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold mb-4",
                children: "Add New Inquiry"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium mb-1",
                                children: "Inquiry ID"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: generatedId || "",
                                readOnly: true,
                                className: "w-full border border-gray-300 bg-gray-100 rounded px-3 py-2 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    Object.keys(initialState).filter((key)=>!tableFields.includes(key) && key !== "type" && key !== "availability" && key !== "remark" && key !== "inquiryId").map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1 capitalize",
                                    children: key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: key === 'inqDate' || key === 'todayDate' ? 'date' : 'text',
                                    name: key,
                                    value: inquiryData[key] || "",
                                    onChange: handleChange,
                                    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm",
                                    readOnly: key === 'todayDate'
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-4 flex flex-col md:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        children: "Type"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "type",
                                        value: inquiryData.type,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        children: "Sale Team Status"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "availability",
                                        value: inquiryData.availability,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        children: "Remark / Request"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "remark",
                                        value: inquiryData.remark,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded px-3 py-2 text-sm",
                                        placeholder: "Enter remark or request"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end items-center mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleAddRow,
                    className: "flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-900 text-white rounded",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__["PlusIcon"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                    lineNumber: 277,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto mt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full border border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: tableFields.map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 border-b border-gray-300 text-sm font-semibold capitalize",
                                        children: key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')
                                    }, key, false, {
                                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: inquiries.map((row, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: tableFields.map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 border-b border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                name: key,
                                                value: row[key] || "",
                                                onChange: (e)=>{
                                                    const updated = [
                                                        ...inquiries
                                                    ];
                                                    updated[rowIdx][key] = e.target.value;
                                                    setInquiries(updated);
                                                },
                                                onPaste: (e)=>handlePasteRow(e, rowIdx, key),
                                                className: "w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 21
                                            }, this)
                                        }, key, false, {
                                            fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 19
                                        }, this))
                                }, rowIdx, false, {
                                    fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end gap-4 mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClear,
                        type: "button",
                        className: "px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded",
                        children: "Clean"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        className: "px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded",
                        children: "Save"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/inquiries/add/page.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_s(AddInquiryPage, "cFnunL/sFwPhmaCUk/byIM+hnfc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AddInquiryPage;
var _c;
__turbopack_context__.k.register(_c, "AddInquiryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function PlusIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("path", {
        fillRule: "evenodd",
        d: "M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z",
        clipRule: "evenodd"
    }));
}
const ForwardRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(PlusIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}}),
"[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript) <export default as PlusIcon>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PlusIcon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/PlusIcon.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_037868d9._.js.map