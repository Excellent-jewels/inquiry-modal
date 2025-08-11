module.exports = {

"[project]/components/StatusBadge.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StatusBadge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const statusStyles = {
    "pending": "bg-yellow-100 text-yellow-800 border border-yellow-300",
    "hold": "bg-green-700 text-white",
    "not available": "bg-red-100 text-red-700 border border-red-300",
    "on memo": "bg-blue-100 text-blue-700 border border-blue-300",
    "confirmed - toh": "bg-purple-700 text-white",
    "hold - toh": "bg-orange-100 text-orange-700 border border-orange-300",
    "release": "bg-red-700 text-white",
    "added to stock": "bg-red-800 text-white",
    "in exhibition": "bg-blue-100 text-blue-700 border border-blue-300",
    "available": "bg-green-100 text-green-700 border border-green-300",
    "released": "bg-red-700 text-white",
    "sent to vendor": "bg-blue-800 text-white",
    "from other": "bg-cyan-300 text-black",
    "released, staging": "bg-red-800 text-white",
    "own hk": "bg-green-800 text-white",
    "own india": "bg-blue-700 text-white",
    "surat": "bg-slate-700 text-white",
    "mumbai": "bg-amber-800 text-white",
    "loose": "bg-blue-700 text-white",
    "in jewellery": "bg-purple-700 text-white",
    "certified": "bg-pink-200 text-black",
    "natural": "bg-green-700 text-white",
    "rcvd": "bg-green-700 text-white",
    "pending payment": "bg-red-700 text-white",
    "aprvd": "bg-blue-900 text-white",
    "half rcvd": "bg-yellow-200 text-yellow-900",
    "transfer ss sent": "bg-green-100 text-green-800 border border-green-300",
    "dispatched": "bg-blue-600 text-white",
    "null": "bg-gray-100 text-gray-400 border border-gray-200",
    "none": "bg-gray-100 text-gray-400 border border-gray-200",
    // QC Remark
    "ok": "bg-green-600 text-white",
    "blue tinge": "bg-blue-700 text-white",
    "other tinge": "bg-purple-300 text-purple-900",
    "culet broken": "bg-yellow-900 text-yellow-100",
    "other issue": "bg-red-700 text-white",
    "no bgm": "bg-yellow-200 text-yellow-900",
    // Status Of Stone
    "stone - oh": "bg-blue-200 text-blue-900",
    "cert - oh": "bg-purple-400 text-white",
    "s & c both - on": "bg-blue-100 text-blue-900",
    "mumbai hold - ready to dispatch": "bg-yellow-300 text-yellow-900",
    "tommorow": "bg-lime-400 text-black",
    "on the way": "bg-purple-200 text-purple-900",
    "hk office": "bg-green-200 text-green-900",
    // OT Remark
    "sent to vndr.": "bg-blue-700 text-white",
    "fr other": "bg-cyan-400 text-black",
    "released, sta": "bg-red-800 text-white",
    // Location
    "hongkong": "bg-blue-200 text-blue-900",
    "usa": "bg-blue-100 text-blue-900",
    "other": "bg-red-700 text-white"
};
function StatusBadge({ status, className = "" }) {
    const style = statusStyles[(status ?? "").trim().toLowerCase()] || "bg-gray-200 text-gray-700 border border-gray-300";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-block rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${style} ${className}`,
        children: status || "None"
    }, void 0, false, {
        fileName: "[project]/components/StatusBadge.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/StatusUpdateModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "StatusDropdown": (()=>StatusDropdown),
    "availabilityOptions": (()=>availabilityOptions),
    "locationOptions": (()=>locationOptions),
    "otRemarkOptions": (()=>otRemarkOptions),
    "paymentOptions": (()=>paymentOptions),
    "qcRemarkOptions": (()=>qcRemarkOptions),
    "statusOfStoneOptions": (()=>statusOfStoneOptions),
    "typeOptions": (()=>typeOptions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatusBadge.tsx [app-ssr] (ecmascript)");
;
;
const typeOptions = [
    "Loose",
    "In Jewellery",
    "Certified",
    "Natural"
];
const availabilityOptions = [
    "Pending",
    "Hold",
    "Not Available",
    "On Memo",
    "Confirmed - TOH",
    "Hold - TOH",
    "Release",
    "Added to Stock",
    "In Exhibition",
    "Dispatched"
];
const paymentOptions = [
    "RCVD",
    "Pending",
    "APRVd",
    "HALF RCVD",
    "Transfer SS Sent",
    "Null"
];
const qcRemarkOptions = [
    "OK",
    "BLUE TINGE",
    "OTHER TINGE",
    "CULET BROKEN",
    "OTHER ISSUE",
    "NO BGM",
    "Null"
];
const statusOfStoneOptions = [
    "Stone - OH",
    "Cert - OH",
    "Pending",
    "S & C BOTH - ON",
    "Mumbai Hold - Ready to Dispatch",
    "Tomorrow",
    "On the Way",
    "HK Office",
    "Null"
];
const otRemarkOptions = [
    "Available",
    "Not Available",
    "Released",
    "Sent to Vndr.",
    "Fr Other",
    "Released, Sta",
    "Own HK",
    "Own India",
    "Surat",
    "Mumbai",
    "Null"
];
const locationOptions = [
    "Surat",
    "Mumbai",
    "Hongkong",
    "USA",
    "Other",
    "Null"
];
function StatusDropdown({ options, value, onChange, open, setOpen, id, colKey }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    cursor: "pointer",
                    display: "inline-block"
                },
                onClick: ()=>setOpen(open === `${colKey}-${id}` ? null : `${colKey}-${id}`),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    status: value
                }, void 0, false, {
                    fileName: "[project]/components/StatusUpdateModal.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/StatusUpdateModal.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            open === `${colKey}-${id}` && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-10 bg-gray-50 border border-gray-300 shadow-md mt-2 left-1/2 -translate-x-1/2 min-w-[160px] text-left",
                style: {
                    minWidth: 160
                },
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 pl-2 hover:bg-gray-100 cursor-pointer flex items-center",
                        onClick: ()=>{
                            onChange(option);
                            setOpen(null);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            status: option
                        }, void 0, false, {
                            fileName: "[project]/components/StatusUpdateModal.tsx",
                            lineNumber: 117,
                            columnNumber: 15
                        }, this)
                    }, option, false, {
                        fileName: "[project]/components/StatusUpdateModal.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/StatusUpdateModal.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}}),
"[project]/hooks/useUserRole.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// hooks/useUserRole.ts
__turbopack_context__.s({
    "useUserRole": (()=>useUserRole)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useUserRole() {
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
        setLoading(false);
    }, []);
    return {
        role,
        loading
    };
}
}}),
"[project]/components/InquiryTable.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>InquiryTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatusUpdateModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUserRole$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUserRole.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatusBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/config.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function InquiryTable({ data, columns, onDelete, onEdit, onCheckboxChange, onSelectAll, defaultAvailability = "PENDING", rowCheckbox = false, selectedRows = [], onRowCheckbox, onSelectAllRows, role, showInvoiceColumn = false, pageType = "sales", showBillColumn = false }) {
    const { role: userRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUserRole$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserRole"])();
    const [openTypeMenu, setOpenTypeMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingRowId, setEditingRowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editValues, setEditValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedRowsState, setSelectedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [invoiceFiles, setInvoiceFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const editableFieldsByRole = {
        admin: columns.map((col)=>col.key),
        sales: columns.map((col)=>col.key).filter((key)=>[
                'inquiry_id',
                'inq_date',
                'today_date',
                'period',
                'sales',
                'buyer',
                'stockId',
                'shape',
                'ct',
                'color',
                'clarity',
                'cut',
                'po',
                'sym',
                'lab',
                'report',
                'disPpc',
                'ppc',
                'amt',
                'type',
                'availability',
                'payment',
                'remark'
            ].includes(key)),
        backend: [
            'location',
            'otRemark',
            'time',
            'statusOfStone',
            'qcRemark',
            'stoneConfirmationRemark',
            'entryStatus',
            'locationRemark'
        ],
        account: []
    };
    const editableFields = userRole && editableFieldsByRole[userRole] ? editableFieldsByRole[userRole] : [];
    const handleEdit = (id)=>{
        const row = data.find((d)=>d.id === id);
        if (row?.sale_team_status === "Dispatched") return; // Prevent editing
        setEditingRowId(id);
        setEditValues(row ? {
            ...row
        } : {});
    };
    const handleSave = ()=>{
        if (onEdit && editingRowId) {
            onEdit(editingRowId, {
                ...editValues,
                id: editingRowId
            });
        }
        setEditingRowId(null);
        setEditValues({});
    };
    const handleCancel = ()=>{
        setEditingRowId(null);
        setEditValues({});
    };
    const isDropdownField = (key)=>[
            "type",
            "availability",
            "payment",
            "qcRemark",
            "statusOfStone",
            "otRemark",
            "location"
        ].includes(key);
    const isAutoSaveDropdown = (key)=>userRole === "sales" && [
            "type",
            "availability",
            "payment"
        ].includes(key) || userRole === "backend" && [
            "qcRemark",
            "statusOfStone",
            "otRemark",
            "location"
        ].includes(key) || userRole === "admin" && isDropdownField(key);
    const getDropdownOptions = (key)=>{
        switch(key){
            case "type":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typeOptions"];
            case "availability":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["availabilityOptions"];
            case "payment":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["paymentOptions"];
            case "qcRemark":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["qcRemarkOptions"];
            case "statusOfStone":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["statusOfStoneOptions"];
            case "otRemark":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["otRemarkOptions"];
            case "location":
                return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationOptions"];
            default:
                return [];
        }
    };
    const isAllRowsSelected = data.length > 0 && data.every((row)=>selectedRows.includes(row.id));
    const InvoiceIcon = ({ color = "#325c85" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "32",
            height: "32",
            viewBox: "0 0 24 24",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3",
                    y: "3",
                    width: "18",
                    height: "18",
                    rx: "2",
                    fill: "none",
                    stroke: color,
                    strokeWidth: "2"
                }, void 0, false, {
                    fileName: "[project]/components/InquiryTable.tsx",
                    lineNumber: 131,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M8 12h8M8 12l4-4m-4 4l4 4",
                    stroke: color,
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/components/InquiryTable.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                    points: "16 3 21 3 21 8",
                    stroke: color,
                    strokeWidth: "2",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/components/InquiryTable.tsx",
                    lineNumber: 133,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InquiryTable.tsx",
            lineNumber: 130,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto bg-white shadow h-[calc(80vh-180px)] max-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "min-w-[1800px] w-full text-xs border border-gray-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    className: "sticky top-0 z-100 bg-gray-200 border-b border-gray-300",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "text-gray-700",
                        children: [
                            rowCheckbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: data.length > 0 && data.every((row)=>selectedRows.includes(row.id)),
                                    onChange: (e)=>onSelectAllRows && onSelectAllRows(e.target.checked)
                                }, void 0, false, {
                                    fileName: "[project]/components/InquiryTable.tsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/InquiryTable.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            showInvoiceColumn && [
                                "admin",
                                "sales",
                                "account"
                            ].includes(role) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-3 px-3 border border-gray-300 text-center align-middle",
                                children: "Invoice"
                            }, void 0, false, {
                                fileName: "[project]/components/InquiryTable.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap",
                                children: "Inquiry ID"
                            }, void 0, false, {
                                fileName: "[project]/components/InquiryTable.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "py-2 px-3 font-semibold border border-gray-300 text-center whitespace-nowrap",
                                    children: col.label
                                }, col.key, false, {
                                    fileName: "[project]/components/InquiryTable.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)),
                            onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-2 px-3 font-semibold border border-gray-300",
                                children: "Actions"
                            }, void 0, false, {
                                fileName: "[project]/components/InquiryTable.tsx",
                                lineNumber: 165,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InquiryTable.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/InquiryTable.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: [
                        data.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                colSpan: columns.length + (onDelete ? 2 : 1) + (rowCheckbox ? 1 : 0),
                                className: "text-center py-4 text-gray-400 border border-gray-200 whitespace-nowrap",
                                children: "No inquiries found."
                            }, void 0, false, {
                                fileName: "[project]/components/InquiryTable.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/InquiryTable.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this),
                        data.map((inquiry)=>{
                            const isEditing = editingRowId === inquiry.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    rowCheckbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: selectedRows.includes(inquiry.id),
                                            onChange: (e)=>onRowCheckbox && onRowCheckbox(inquiry.id, e.target.checked)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InquiryTable.tsx",
                                            lineNumber: 186,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/InquiryTable.tsx",
                                        lineNumber: 185,
                                        columnNumber: 19
                                    }, this),
                                    showInvoiceColumn && [
                                        "admin",
                                        "sales",
                                        "account"
                                    ].includes(role) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap",
                                        children: [
                                            "admin",
                                            "sales"
                                        ].includes(role) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: async (e)=>{
                                                e.preventDefault();
                                                const fileInput = e.currentTarget.elements.namedItem("invoiceFile");
                                                if (!fileInput.files?.[0]) return;
                                                const file = fileInput.files[0];
                                                const formData = new FormData();
                                                formData.append("invoice", file);
                                                formData.append("inquiry_id", inquiry.inquiry_id);
                                                await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/inquiries/upload-invoice`, {
                                                    method: "POST",
                                                    body: formData
                                                });
                                                alert("Invoice uploaded!");
                                                window.location.reload();
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    name: "invoiceFile",
                                                    accept: ".pdf,.jpg,.png",
                                                    style: {
                                                        display: "none"
                                                    },
                                                    id: `invoice-file-${inquiry.id}`,
                                                    onChange: (e)=>e.currentTarget.form?.requestSubmit()
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InquiryTable.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: `invoice-file-${inquiry.id}`,
                                                    style: {
                                                        cursor: "pointer"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InvoiceIcon, {}, void 0, false, {
                                                        fileName: "[project]/components/InquiryTable.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InquiryTable.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 25
                                                }, this),
                                                inquiry.invoice_file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/uploaded_invoices/${inquiry.invoice_file}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "block mt-1 text-blue-500 text-xs underline",
                                                    children: "View Invoice"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InquiryTable.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block mt-1 text-gray-400 text-xs",
                                                    children: "No file"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InquiryTable.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InquiryTable.tsx",
                                            lineNumber: 197,
                                            columnNumber: 23
                                        }, this) : inquiry.invoice_file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/uploaded_invoices/${inquiry.invoice_file}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "block text-blue-500 text-xs underline",
                                            children: "View Invoice"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InquiryTable.tsx",
                                            lineNumber: 242,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-gray-400 text-xs",
                                            children: "No file"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InquiryTable.tsx",
                                            lineNumber: 251,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/InquiryTable.tsx",
                                        lineNumber: 195,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap",
                                        children: pageType === "backend" ? inquiry.inquiry_id : inquiry.id
                                    }, void 0, false, {
                                        fileName: "[project]/components/InquiryTable.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    columns.map((col)=>{
                                        const isEditable = editableFields.includes(col.key) && inquiry.sale_team_status !== "dispatch";
                                        const isDropdown = isDropdownField(col.key);
                                        const isAutoSave = isAutoSaveDropdown(col.key);
                                        const dropdownOptions = getDropdownOptions(col.key);
                                        const fieldValue = inquiry[col.key] ?? "";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3 px-3 border border-gray-200 text-center align-middle whitespace-nowrap",
                                            style: {
                                                position: "relative",
                                                minHeight: 64
                                            },
                                            children: isAutoSave && inquiry.sale_team_status !== "Dispatched" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusDropdown"], {
                                                options: dropdownOptions,
                                                value: fieldValue,
                                                onChange: (val)=>onCheckboxChange && onCheckboxChange(inquiry.id, col.key, val),
                                                open: openTypeMenu,
                                                setOpen: setOpenTypeMenu,
                                                id: inquiry.id,
                                                colKey: col.key
                                            }, void 0, false, {
                                                fileName: "[project]/components/InquiryTable.tsx",
                                                lineNumber: 275,
                                                columnNumber: 25
                                            }, this) : isEditing && isEditable ? col.label === "FALSE" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: !!editValues[col.key],
                                                onChange: (e)=>setEditValues((prev)=>({
                                                            ...prev,
                                                            [col.key]: e.target.checked
                                                        })),
                                                className: "accent-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InquiryTable.tsx",
                                                lineNumber: 288,
                                                columnNumber: 27
                                            }, this) : isDropdown ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusUpdateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusDropdown"], {
                                                options: dropdownOptions,
                                                value: editValues[col.key] || "",
                                                onChange: (val)=>setEditValues((prev)=>({
                                                            ...prev,
                                                            [col.key]: val
                                                        })),
                                                open: openTypeMenu,
                                                setOpen: setOpenTypeMenu,
                                                id: inquiry.id,
                                                colKey: col.key
                                            }, void 0, false, {
                                                fileName: "[project]/components/InquiryTable.tsx",
                                                lineNumber: 297,
                                                columnNumber: 27
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: editValues[col.key] || "",
                                                onChange: (e)=>setEditValues((prev)=>({
                                                            ...prev,
                                                            [col.key]: e.target.value
                                                        })),
                                                className: "border px-2 py-1 rounded w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InquiryTable.tsx",
                                                lineNumber: 309,
                                                columnNumber: 27
                                            }, this) : col.label === "FALSE" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: !!inquiry[col.key],
                                                onChange: (e)=>onCheckboxChange && onCheckboxChange(inquiry.id, col.key, e.target.checked),
                                                className: "accent-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InquiryTable.tsx",
                                                lineNumber: 319,
                                                columnNumber: 25
                                            }, this) : isDropdown ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                status: fieldValue || "None"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InquiryTable.tsx",
                                                lineNumber: 328,
                                                columnNumber: 25
                                            }, this) : fieldValue
                                        }, col.key, false, {
                                            fileName: "[project]/components/InquiryTable.tsx",
                                            lineNumber: 269,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-3 px-3 border border-gray-200 text-center whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center gap-2",
                                            children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-green-600 font-semibold px-2",
                                                        onClick: handleSave,
                                                        children: "Save"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InquiryTable.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-gray-500 font-semibold px-2",
                                                        onClick: handleCancel,
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InquiryTable.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-blue-500",
                                                        onClick: ()=>handleEdit(inquiry.id),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InquiryTable.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InquiryTable.tsx",
                                                        lineNumber: 349,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-red-500",
                                                        onClick: ()=>onDelete && onDelete(inquiry.id),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InquiryTable.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InquiryTable.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InquiryTable.tsx",
                                            lineNumber: 337,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/InquiryTable.tsx",
                                        lineNumber: 336,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, inquiry.id, true, {
                                fileName: "[project]/components/InquiryTable.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InquiryTable.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InquiryTable.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/InquiryTable.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
function setTableData(arg0) {
    throw new Error("Function not implemented.");
}
}}),
"[project]/utils/auth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// utils/auth.ts
__turbopack_context__.s({
    "getUserRole": (()=>getUserRole)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [app-ssr] (ecmascript)");
;
function getUserRole() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    "TURBOPACK unreachable";
    const token = undefined;
}
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/app/dashboard/inquiries/InquiriesPageClient.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>InquiriesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InquiryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InquiryTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/config.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const API_URL = `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/inquiries`;
const columns = [
    {
        key: 'inqDate',
        label: 'INQ Date'
    },
    {
        key: 'todayDate',
        label: 'Today Date'
    },
    {
        key: 'period',
        label: 'Period'
    },
    {
        key: 'sales',
        label: 'SALES'
    },
    {
        key: 'buyer',
        label: 'Buyer'
    },
    {
        key: 'stockId',
        label: 'STOCK ID'
    },
    {
        key: 'shape',
        label: 'Shape'
    },
    {
        key: 'ct',
        label: 'Ct'
    },
    {
        key: 'color',
        label: 'Color'
    },
    {
        key: 'clarity',
        label: 'Clarity'
    },
    {
        key: 'cut',
        label: 'Cut'
    },
    {
        key: 'po',
        label: 'PO'
    },
    {
        key: 'sym',
        label: 'SYM'
    },
    {
        key: 'lab',
        label: 'LAB'
    },
    {
        key: 'report',
        label: 'REPORT'
    },
    {
        key: 'disPpc',
        label: 'DIS/PPC'
    },
    {
        key: 'ppc',
        label: 'PPC'
    },
    {
        key: 'amt',
        label: 'AMT'
    },
    {
        key: 'type',
        label: 'Type'
    },
    {
        key: 'availability',
        label: 'Sale Team Status'
    },
    {
        key: 'payment',
        label: 'Payment'
    },
    {
        key: 'remark',
        label: 'Remark/ Request'
    },
    {
        key: 'location',
        label: 'Location'
    },
    {
        key: 'otRemark',
        label: 'Backend Status'
    },
    {
        key: 'time',
        label: 'Time'
    },
    {
        key: 'statusOfStone',
        label: 'Status Of Stone'
    },
    {
        key: 'qcRemark',
        label: 'QC REMARK'
    },
    {
        key: 'stoneConfirmationRemark',
        label: 'Stone Confirmation Remark'
    },
    {
        key: 'entryStatus',
        label: 'ENTRY STATUS'
    },
    {
        key: 'locationRemark',
        label: 'Location Remark'
    }
];
function InquiriesPage() {
    const [inquiries, setInquiries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredInquiries, setFilteredInquiries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputInquiryNo, setInputInquiryNo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [inputReport, setInputReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [inputAvailability, setInputAvailability] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [inputFrom, setInputFrom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [generatedId, setGeneratedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const token = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : null;
    const newlyAddedId = searchParams.get('newlyAddedId');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserRole"])();
        if (!r) {
            router.push('/login');
        } else if (![
            'admin',
            'sales',
            'backend'
        ].includes(r)) {
            router.push('/dashboard/inquiries');
        } else {
            setRole(r);
            fetchInquiries();
        }
        setLoading(false);
    }, []);
    const fetchInquiries = async ()=>{
        try {
            const res = await fetch(`${API_URL}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            const transformed = data.map((item)=>({
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
                    locationRemark: item.location_remark
                }));
            const sorted = [
                ...transformed
            ].sort((a, b)=>new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            const pendingOnly = sorted.filter((inq)=>inq.availability === "Pending");
            setInquiries(pendingOnly);
            setFilteredInquiries(pendingOnly);
        } catch (err) {
            console.error('Error fetching inquiries:', err);
        }
    };
    const handleAutoSaveDropdown = async (id, key, value)=>{
        try {
            const token = localStorage.getItem("token") || "";
            const role = localStorage.getItem("role") || "";
            const userName = localStorage.getItem("userName") || "";
            const userKey = `${role}_${userName}`;
            if (!token) {
                console.error("No token found in localStorage.");
                return;
            }
            const fieldMap = {
                disPpc: "dis_ppc",
                availability: "sale_team_status",
                otRemark: "backend_status",
                remark: "remark_request",
                stockId: "stock_id",
                statusOfStone: "status_of_stone",
                qcRemark: "qc_remark",
                stoneConfirmationRemark: "stone_confirmation_remark",
                entryStatus: "entry_status",
                locationRemark: "location_remark"
            };
            const backendKey = fieldMap[key] || key;
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/inquiries/${id}`, {
                [backendKey]: value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
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
                locationRemark: updated.location_remark
            };
            const updatedList = [
                updatedItem,
                ...inquiries.filter((item)=>item.id !== id)
            ];
            const sorted = updatedList.sort((a, b)=>new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            setInquiries(sorted);
            setFilteredInquiries(sorted);
            console.log("✅ Auto-saved:", backendKey, value);
        } catch (error) {
            if (error.response) {
                console.error("❌ Auto-save failed:", {
                    status: error.response.status,
                    message: error.response.data.detail || error.response.data
                });
            } else {
                console.error("❌ Auto-save error:", error.message);
            }
        }
    };
    const handleSearch = (e)=>{
        e.preventDefault();
        const fromDate = inputFrom ? new Date(inputFrom) : null;
        const filtered = inquiries.filter((inq)=>{
            const inqDate = new Date(inq.inqDate);
            return (!inputInquiryNo || String(inq.id).includes(inputInquiryNo)) && (!inputReport || inq.report?.toLowerCase().includes(inputReport.toLowerCase())) && (!inputAvailability || inq.availability === inputAvailability) && (!fromDate || inqDate >= fromDate);
        });
        setFilteredInquiries(filtered);
    };
    const handleReset = ()=>{
        setInputInquiryNo('');
        setInputReport('');
        setInputAvailability('');
        setInputFrom('');
        setFilteredInquiries(inquiries);
    };
    const handleDeleteInquiry = async (id)=>{
        console.log("🗑 Deleting inquiry:", id); // ✅ Add here to confirm click is working
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/inquiries/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || "Delete failed");
            }
            // Remove deleted item from state
            setInquiries((prev)=>prev.filter((inq)=>inq.id !== id));
            setFilteredInquiries((prev)=>prev.filter((inq)=>inq.id !== id));
            console.log("✅ Deleted:", id); // ✅ Confirm deletion
        } catch (err) {
            console.error("❌ Failed to delete inquiry", err);
            alert("Something went wrong while deleting.");
        }
    };
    const handleEdit = async (id, updatedRow)=>{
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
            location_remark: updatedRow.locationRemark
        };
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
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
                locationRemark: updated.location_remark
            };
            const newInquiries = [
                updatedRowMapped,
                ...inquiries.filter((inq)=>inq.id !== id)
            ];
            const sorted = newInquiries.sort((a, b)=>new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            setInquiries(sorted);
            setFilteredInquiries(sorted);
        } catch (err) {
            console.error('Edit failed:', err);
        }
    };
    const handleFieldChange = async (id, key, value)=>{
        try {
            const keyMap = {
                availability: "sale_team_status",
                remark: "remark_request",
                otRemark: "backend_status",
                stockId: "stock_id",
                disPpc: "dis_ppc",
                statusOfStone: "status_of_stone",
                qcRemark: "qc_remark",
                stoneConfirmationRemark: "stone_confirmation_remark",
                entryStatus: "entry_status",
                locationRemark: "location_remark"
            };
            const backendKey = keyMap[key] || key;
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/inquiries/${id}`, {
                [backendKey]: value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        // Refresh data or optimistically update UI if needed
        } catch (err) {
            console.error("Auto-save failed:", err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-white rounded-lg shadow-md h-[1000px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6",
                children: "Inquiries"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-4 mb-6 items-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "flex flex-wrap gap-4 items-end mb-6",
                        onSubmit: handleSearch,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Inquiry No",
                                className: "border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]",
                                value: inputInquiryNo,
                                onChange: (e)=>setInputInquiryNo(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Report No",
                                className: "border border-gray-600 rounded px-2 py-1 text-sm min-w-[140px]",
                                value: inputReport,
                                onChange: (e)=>setInputReport(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "border border-gray-600 rounded px-2 py-1 text-sm min-w-[180px]",
                                value: inputAvailability,
                                onChange: (e)=>setInputAvailability(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Sale Team Status"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 383,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Available",
                                        children: "Available"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 384,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Not Available",
                                        children: "Not Available"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 385,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Hold",
                                        children: "Hold"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "On Memo",
                                        children: "On Memo"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Confirmed - TOH",
                                        children: "Confirmed - TOH"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Hold - TOH",
                                        children: "Hold - TOH"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 389,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Release",
                                        children: "Release"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 390,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ADDED TO STOCK",
                                        children: "ADDED TO STOCK"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "IN EXHIBITION",
                                        children: "IN EXHIBITION"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Pending",
                                        children: "Pending"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                        lineNumber: 393,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                className: "border border-gray-600 rounded px-2 py-1 text-sm min-w-[180px]",
                                value: inputFrom,
                                onChange: (e)=>setInputFrom(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                lineNumber: 395,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm",
                                children: "Search"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                lineNumber: 401,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleReset,
                                className: "bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition text-sm",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    [
                        'admin',
                        'sales'
                    ].includes(role || '') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition text-sm",
                            onClick: ()=>router.push('/dashboard/inquiries/add'),
                            children: "+ New Inquiry"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                            lineNumber: 415,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                        lineNumber: 414,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InquiryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                data: filteredInquiries,
                columns: columns,
                onDelete: handleDeleteInquiry,
                onEdit: handleEdit,
                defaultAvailability: "Pending",
                role: role || '',
                onCheckboxChange: handleAutoSaveDropdown,
                selectedRows: []
            }, void 0, false, {
                fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/inquiries/InquiriesPageClient.tsx",
        lineNumber: 358,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/dashboard/inquiries/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$inquiries$2f$InquiriesPageClient$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/inquiries/InquiriesPageClient.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/dashboard/inquiries/page.tsx",
            lineNumber: 7,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$inquiries$2f$InquiriesPageClient$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/dashboard/inquiries/page.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/inquiries/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e1247eff._.js.map