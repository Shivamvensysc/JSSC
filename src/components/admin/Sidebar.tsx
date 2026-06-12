
import {
  LayoutDashboard,
  // Users,
  // Settings,
  LifeBuoy,
  ShieldCheck,
  Database,
  Home,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
const monitoringRoutes = [
  "/admin/live",
  "/admin/admit-card-issue",
  "/admin/new-broadcast",
  "/admin/data-export-hub",
];
export default function Sidebar({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: <LayoutDashboard size={20} />,
      label: "Monitoring",
      path: "/admin/live",
    },
    // {
    //   icon: <Users size={20} />,
    //   label: "Application Management",
    //   path: "/admin/verify",
    // },
    {
      icon: <Database size={20} />,
      label: "System Control",
      path: "/admin/applications",
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[#E1E5E3] bg-white transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      {/* Brand Logo */}
      <div className="mb-4 p-6">
        {!isCollapsed ? (
          <div>
            <h1 className="text-[20px] font-black leading-none text-[#003A2B]">
              JSSC Admin
            </h1>

            <p className="mt-1 text-[11px] font-bold uppercase tracking-tighter text-[#9CA3AF]">
              Institutional Portal
            </p>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003A2B] font-bold text-white">
            J
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4">
        {menuItems.map((item, idx) => {
          const isActive =
  item.path === "/admin/live"
    ? monitoringRoutes.includes(location.pathname)
    : location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`group flex w-full items-center gap-4 rounded-lg p-3 transition-all duration-200 ${
                isActive
                  ? "bg-[#003A2B] text-white shadow-md"
                  : "text-[#4B5563] hover:bg-[#F0F7F4] hover:text-[#003A2B]"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>

              {!isCollapsed && (
                <span className="text-[14px] font-semibold">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-2 border-t border-[#E1E5E3] p-4">
        {/* <button className="flex w-full items-center gap-4 rounded-lg p-3 text-[#4B5563] hover:bg-gray-50">
          <Settings size={20} />

          {!isCollapsed && (
            <span className="text-[14px] font-semibold">
              Settings
            </span>
          )}
        </button> */}

        <button className="flex w-full items-center gap-4 rounded-lg p-3 text-[#4B5563] hover:bg-gray-50">
          <LifeBuoy size={20} />

          {!isCollapsed && (
            <span className="text-[14px] font-semibold">
              Support
            </span>
          )}
        </button>

        <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg bg-[#003A2B] p-3 text-white shadow-lg transition-all hover:bg-[#002B20]">
          <ShieldCheck size={20} />

          {!isCollapsed && (
            <span className="text-[13px] font-bold">
              Secure Portal Access
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}