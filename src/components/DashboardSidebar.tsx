// import React, { useEffect, useState } from "react";
// import {
//   LayoutDashboard,
//   FileText,
//   Award,
//   DollarSign,
//   Headphones,
//   LogOut,
//   X,
//   GraduationCap,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// interface DashboardSidebarProps {
//   sidebarOpen: boolean;
//   sidebarCollapsed: boolean;
//   closeSidebar: () => void;
//   onLogout: () => void;
// }

// interface NavItem {
//   path: string;
//   label: string;
//   icon: React.ElementType;
// }

// const navItems: NavItem[] = [
//   { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   {
//     path: "/dashboard/my-applications",
//     label: "My Applications",
//     icon: FileText,
//   },
//   // { path: "/dashboard/result", label: "Result", icon: Award },
//   // { path: "/dashboard/admit-card", label: "Admit Card", icon: CreditCard },
//   {
//     path: "/dashboard/payment-status",
//     label: "Payment Status",
//     icon: DollarSign,
//   },
//   {
//     path: "/dashboard/contact-support",
//     label: "Contact Support",
//     icon: Headphones,
//   },
// ];

// const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
//   sidebarOpen,
//   sidebarCollapsed,
//   closeSidebar,
//   onLogout,
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleNavigation = (path: string) => {
//     navigate(path);
//     if (isMobile) {
//       closeSidebar();
//     }
//   };

//   const isActive = (path: string) => {
//     if (path === "/dashboard") {
//       return location.pathname === "/dashboard";
//     }
//     return location.pathname.startsWith(path);
//   };

//   // For mobile: show overlay and sidebar
//   if (isMobile) {
//     return (
//       <>
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
//             onClick={closeSidebar}
//           />
//         )}
//         <aside
//           className={`
//             fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl
//             transition-transform duration-300 ease-in-out transform
//             ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           `}
//         >
//           {/* Sidebar Content */}
//           <div className="flex flex-col h-full">
//             <div className="flex items-center justify-between p-6 border-b border-slate-200">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
//                   <GraduationCap className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-slate-800 text-xl font-bold">
//                     Student Portal
//                   </h2>
//                   <p className="text-slate-500 text-xs">
//                     Manage your academics
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={closeSidebar}
//                 className="lg:hidden text-slate-600 hover:text-slate-800 transition-colors p-2 rounded-lg hover:bg-slate-100"
//                 aria-label="Close menu"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const active = isActive(item.path);

//                 return (
//                   <button
//                     key={item.path}
//                     onClick={() => handleNavigation(item.path)}
//                     className={`
//                       w-full flex items-center gap-3 px-4 py-3 rounded-lg
//                       transition-all duration-200 group
//                       ${
//                         active
//                           ? "bg-primary text-white shadow-md"
//                           : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                       }
//                     `}
//                   >
//                     <Icon
//                       className={`w-5 h-5 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-700"}`}
//                     />
//                     <span className="text-sm font-medium">{item.label}</span>
//                     {active && (
//                       <div className="ml-auto w-1 h-8 bg-white rounded-full"></div>
//                     )}
//                   </button>
//                 );
//               })}
//             </nav>

//             <div className="p-4 border-t border-slate-200">
//               <button
//                 onClick={onLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
//               >
//                 <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
//                 <span className="text-sm font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </aside>
//       </>
//     );
//   }

//   // For desktop: collapsed/expanded sidebar
//   return (
//     <aside
//       className={`
//         sticky top-0 h-full bg-white border-r border-slate-200 shadow-lg
//         transition-all duration-300 ease-in-out hidden lg:block
//         ${sidebarCollapsed ? "w-20" : "w-64"}
//       `}
//     >
//       <div className="flex flex-col h-full">
//         {/* Sidebar Header */}
//         <div
//           className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"} p-6 border-b border-slate-200`}
//         >
//           {!sidebarCollapsed ? (
//             <>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
//                   <GraduationCap className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-slate-800 text-xl font-bold">
//                     Student Portal
//                   </h2>
//                   <p className="text-slate-500 text-xs">
//                     Manage your academics
//                   </p>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
//               <GraduationCap className="w-6 h-6 text-white" />
//             </div>
//           )}
//         </div>

//         {/* Navigation Items */}
//         <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.path);

//             return (
//               <button
//                 key={item.path}
//                 onClick={() => handleNavigation(item.path)}
//                 className={`
//                   w-full flex items-center gap-3 px-4 py-3 rounded-lg
//                   transition-all duration-200 group
//                   ${sidebarCollapsed ? "justify-center" : ""}
//                   ${
//                     active
//                       ? "bg-primary text-white shadow-md"
//                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                   }
//                 `}
//                 title={sidebarCollapsed ? item.label : ""}
//               >
//                 <Icon
//                   className={`w-5 h-5 ${
//                     active
//                       ? "text-white"
//                       : "text-slate-500 group-hover:text-slate-700"
//                   }`}
//                 />
//                 {!sidebarCollapsed && (
//                   <>
//                     <span className="text-sm font-medium">{item.label}</span>
//                     {active && (
//                       <div className="ml-auto w-1 h-8 bg-white rounded-full"></div>
//                     )}
//                   </>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Logout Button */}
//         <div className="p-4 border-t border-slate-200">
//           <button
//             onClick={onLogout}
//             className={`
//               w-full flex items-center gap-3 px-4 py-3 rounded-lg 
//               text-red-600 hover:bg-red-50 hover:text-red-700 
//               transition-all duration-200 group
//               ${sidebarCollapsed ? "justify-center" : ""}
//             `}
//             title={sidebarCollapsed ? "Logout" : ""}
//           >
//             <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
//             {!sidebarCollapsed && (
//               <span className="text-sm font-medium">Logout</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default DashboardSidebar;


import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Headphones,
  LogOut,
  X,
  GraduationCap,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { toast } from "react-toastify";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  closeSidebar: () => void;
  onLogout?: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    path: "/dashboard/my-applications",
    label: "My Applications",
    icon: FileText,
  },
  {
    path: "/dashboard/payment-status",
    label: "Payment Status",
    icon: DollarSign,
  },
  {
    path: "/dashboard/contact-support",
    label: "Contact Support",
    icon: Headphones,
  },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebarOpen,
  sidebarCollapsed,
  closeSidebar,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      closeSidebar();
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await signOut();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("idToken");

      if (onLogout) {
        onLogout();
      }

      toast.success("Logged out successfully");
      navigate("/candidate-login", { replace: true });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error?.message || "Logout failed");
    } finally {
      setLogoutLoading(false);
    }
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  if (isMobile) {
    return (
      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={closeSidebar}
          />
        )}

        <aside
          className={`
            fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl
            transition-transform duration-300 ease-in-out transform
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h2 className="text-slate-800 text-xl font-bold">
                    Student Portal
                  </h2>
                  <p className="text-slate-500 text-xs">
                    Manage your academics
                  </p>
                </div>
              </div>

              <button
                onClick={closeSidebar}
                className="lg:hidden text-slate-600 hover:text-slate-800 transition-colors p-2 rounded-lg hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 group
                      ${
                        active
                          ? "bg-primary text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-700"
                      }`}
                    />

                    <span className="text-sm font-medium">{item.label}</span>

                    {active && (
                      <div className="ml-auto w-1 h-8 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group disabled:opacity-50"
              >
                <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="text-sm font-medium">
                  {logoutLoading ? "Logging out..." : "Logout"}
                </span>
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`
        sticky top-0 h-full bg-white border-r border-slate-200 shadow-lg
        transition-all duration-300 ease-in-out hidden lg:block
        ${sidebarCollapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex flex-col h-full">
        <div
          className={`flex items-center ${
            sidebarCollapsed ? "justify-center" : "justify-between"
          } p-6 border-b border-slate-200`}
        >
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div>
                <h2 className="text-slate-800 text-xl font-bold">
                  Student Portal
                </h2>
                <p className="text-slate-500 text-xs">
                  Manage your academics
                </p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${sidebarCollapsed ? "justify-center" : ""}
                  ${
                    active
                      ? "bg-primary text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
                title={sidebarCollapsed ? item.label : ""}
              >
                <Icon
                  className={`w-5 h-5 ${
                    active
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-700"
                  }`}
                />

                {!sidebarCollapsed && (
                  <>
                    <span className="text-sm font-medium">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-1 h-8 bg-white rounded-full" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg 
              text-red-600 hover:bg-red-50 hover:text-red-700 
              transition-all duration-200 group disabled:opacity-50
              ${sidebarCollapsed ? "justify-center" : ""}
            `}
            title={sidebarCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />

            {!sidebarCollapsed && (
              <span className="text-sm font-medium">
                {logoutLoading ? "Logging out..." : "Logout"}
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
