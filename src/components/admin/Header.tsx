import {  Menu, ChevronLeft, Search, Bell, Settings, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header({ isCollapsed, onToggle }: { isCollapsed: boolean, onToggle: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate= useNavigate();
  // Sample notifications data
  const notifications = [
    { id: 1, title: "New user registered", time: "5 minutes ago", read: false },
    { id: 2, title: "System update completed", time: "1 hour ago", read: false },
    { id: 3, title: "Monthly report ready", time: "3 hours ago", read: true },
    { id: 4, title: "Server maintenance scheduled", time: "1 day ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 const handleLogout = ()=>{
  toast.success("Logout successfully")
  navigate("/admin-login")
 }
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <header className="bg-white border-b border-[#E1E5E3] px-8 py-4 sticky top-0 z-40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Title Area */}
        <div className="flex items-start gap-4">
          <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-md text-[#003A2B] transition-colors">
            {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-[#E1E5E3] rounded-lg focus:outline-none focus:border-[#003A2B] focus:ring-1 focus:ring-[#003A2B] transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5F6368]" size={18} />
          </form>
        </div>

        {/* Action Controls & User Profile */}
        <div className="flex items-center gap-4">
          
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell size={20} className="text-[#5F6368]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-[#E1E5E3] overflow-hidden z-50">
                <div className="p-3 border-b border-[#E1E5E3] bg-gray-50">
                  <h3 className="font-semibold text-[#111827]">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-[#E1E5E3] hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm font-medium text-[#111827]">{notification.title}</p>
                        <p className="text-xs text-[#5F6368] mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-[#5F6368]">No notifications</div>
                  )}
                </div>
                <div className="p-2 border-t border-[#E1E5E3] bg-gray-50">
                  <button className="w-full text-center text-sm text-[#003A2B] hover:text-[#005240] py-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="ml-4 pl-4 border-l border-[#E1E5E3] flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-[14px] font-bold text-[#111827]">Admin User</p>
                <p className="text-[11px] font-medium text-[#5F6368]">Super Admin</p>
              </div>
              <div className="h-10 w-10 bg-[#D7EDF8] border-2 border-[#365B73] rounded-full flex items-center justify-center text-[#365B73] font-bold">
                AU
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E1E5E3] overflow-hidden z-50">
                {/* User Info */}
                <div className="p-4 border-b border-[#E1E5E3] bg-gradient-to-r from-[#D7EDF8] to-white">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-[#365B73] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      AU
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">Admin User</p>
                      <p className="text-xs text-[#5F6368]">admin@example.com</p>
                      <p className="text-xs text-[#003A2B] font-medium mt-1">Super Admin</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      console.log("View profile");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <User size={18} className="text-[#5F6368]" />
                    <span className="text-sm text-[#111827]">My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      console.log("Settings");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Settings size={18} className="text-[#5F6368]" />
                    <span className="text-sm text-[#111827]">Settings</span>
                  </button>
                  
                  <div className="border-t border-[#E1E5E3] my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={18} className="text-red-600" />
                    <span className="text-sm text-red-600">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}