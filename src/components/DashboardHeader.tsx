import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  User,
  LogOut,
  Moon,
  Sun,
  Settings,
  UserCircle,
  Shield,
  HelpCircle,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed?: boolean;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "success" | "warning" | "info" | "error";
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  toggleSidebar,

}) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Application Approved!",
      message: "Your B.Tech application has been approved.",
      time: "2 minutes ago",
      read: false,
      type: "success",
    },
    {
      id: 2,
      title: "Payment Reminder",
      message: "Your exam fee payment is due tomorrow.",
      time: "1 hour ago",
      read: false,
      type: "warning",
    },
    {
      id: 3,
      title: "New Result Published",
      message: "Semester 1 results have been published.",
      time: "5 hours ago",
      read: true,
      type: "info",
    },
    {
      id: 4,
      title: "Admit Card Available",
      message: "Your admit card for Semester exam is now available.",
      time: "1 day ago",
      read: true,
      type: "success",
    },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.success("Candidate logout successfully")
    navigate("/");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here if needed
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Left side - Menu Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Logo/Brand */}
        <div className="hidden lg:block">
          <h1 className="text-slate-800 text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Student Dashboard
          </h1>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto lg:ml-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                  <h3 className="text-slate-800 font-semibold">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                          !notification.read ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-sm ${!notification.read ? "font-semibold text-slate-800" : "text-slate-600"}`}
                              >
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 border-t border-slate-200 bg-slate-50">
                  <button className="w-full text-center text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 md:gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-slate-800 text-sm font-medium">Mihir Malaviya</p>
                <p className="text-slate-500 text-xs">Student ID: STU12345</p>
              </div>
            </div>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">Mihir Malaviya</h3>
                  <p className="text-text-secondary text-sm">
                    mihir.malaviya@example.com
                  </p>
                </div>

                {/* Profile Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      navigate("/dashboard/my-profile");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors group"
                  >
                    <UserCircle className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm flex-1 text-left">My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/dashboard/settings");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors group"
                  >
                    <Settings className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm flex-1 text-left">Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/dashboard/security");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors group"
                  >
                    <Shield className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm flex-1 text-left">Security</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/dashboard/help");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors group"
                  >
                    <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm flex-1 text-left">
                      Help & Support
                    </span>
                  </button>

                  <div className="border-t border-slate-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
                  >
                    <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                    <span className="text-sm flex-1 text-left">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
