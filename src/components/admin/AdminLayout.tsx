import { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#111827] flex font-sans antialiased">
      {/* Sidebar Layout */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Container */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "pl-[72px]" : "pl-[240px]"
        }`}
      >
        <Header 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
        
        {/* Dynamic Content Frame */}
        <main className="p-6 md:p-7 flex-1">
          {/* Replaced <DashboardPage /> with <Outlet /> to support routing */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}