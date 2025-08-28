'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Inquiry", href: "/dashboard/inquiries" },
  { label: "Not Available", href: "/dashboard/inquiries/not-available" },
  { label: "Released", href: "/dashboard/inquiries/release" },
  { label: "Hold", href: "/dashboard/inquiries/hold" },
  { label: "Confirmed", href: "/dashboard/inquiries/confirm" },
  { label: "Dispatched", href: "/dashboard/inquiries/dispatch" },
  { label: "Other Leads", href: "/dashboard/inquiries/other" },
  { label: "Vendor", href: "/dashboard/inquiries/vendor", roles: ["admin", "backend", "account"] }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { notifications, dismissNotification } = useNotification((prev) => prev);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const storedRole = localStorage.getItem("role");
    if (storedRole) setUserRole(storedRole);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "userName") setUserName(e.newValue || "User");
      if (e.key === "role") setUserRole(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const filteredNavItems = navItems.filter(item => {
  // Show only certain pages for "account" role
  if (userRole === "account") {
    return ["Dispatched", "Vendor"].includes(item.label);
  }

  // Use 'roles' if defined
  if (item.roles) {
    return item.roles.includes(userRole || "");
  }

  return true;
});


  return (
    <nav className="h-full flex flex-col py-8 px-4 space-y-2 justify-between">
      <div>
        <div className="mb-8 text-2xl font-bold text-gray-800 text-center">
          Menu
        </div>
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded transition
                ${isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-700 hover:bg-blue-100"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {notifications.length > 0 && (
        <div className="bg-white p-3 rounded shadow mb-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">🔔 Notifications</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {notifications.map((note) => (
              <div
                key={note.id}
                className="relative border-l-4 border-blue-500 pl-3 pr-6 py-2 text-sm text-gray-800 bg-blue-50 rounded"
              >
                <p>{note.message}</p>
                <p className="text-xs text-gray-500">{note.timestamp}</p>
                <button
                  onClick={() => dismissNotification(note.id)}
                  className="absolute right-1 top-1 text-gray-500 hover:text-red-600 text-xs"
                  title="Close"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Avatar Dropdown */}
      <div className="relative mt-8" ref={menuRef}>
        <button
          className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-100 transition"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl shadow">
            <img src="/logo.png" alt="User Logo" className="w-8 h-8 rounded-full object-cover" />
          </span>
          <span className="font-medium text-gray-700">{userName}</span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 bottom-14 w-64 bg-gray-600 rounded-t shadow-lg z-20">
            <div className="flex flex-col items-center py-6">
              <span className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow mb-2">
                <img src="/logo.png" alt="User Logo" className="w-16 h-16 rounded-full object-cover" />
              </span>
              <span className="text-white font-semibold text-lg">{userName}</span>
            </div>
            <div className="flex border-t bg-white">
              <Link
                href="/dashboard/profile"
                className="flex-1 flex items-center justify-center gap-2 py-3 border-r hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
                <span>Profile</span>
              </Link>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/");
                }}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
