import React from "react";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const statusStyles: Record<string, string> = {
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
  "other": "bg-red-700 text-white",
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style =
    statusStyles[(status ?? "").trim().toLowerCase()] ||
    "bg-gray-200 text-gray-700 border border-gray-300";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${style} ${className}`}
    >
      {status || "None"}
    </span>
  );
}