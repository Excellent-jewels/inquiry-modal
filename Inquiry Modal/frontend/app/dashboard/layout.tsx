'use client';
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:block">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="w-64 bg-white shadow-md z-50">
              <Sidebar />
            </div>
            <div
              className="flex-1 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            ></div>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-x-auto overflow-y-auto p-2 md:p-8">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
