// src/layout/DashboardLayout.tsx

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { toast } from "react-toastify";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Changed to true for desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // New state for desktop collapse
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      // Mobile: toggle open/close
      setSidebarOpen(!sidebarOpen);
    } else {
      // Desktop: toggle collapsed state
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    toast.success("Logout successfully")
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          closeSidebar={closeSidebar}
          onLogout={handleLogout}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            toggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
          />

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <div className="animate-fadeIn">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
