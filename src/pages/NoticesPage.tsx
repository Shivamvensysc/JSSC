import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  ChevronRight,
  Clock,
  AlertCircle,

  Megaphone,
  Newspaper,
  TrendingUp,
  BookOpen,
  
  Award,

  Sparkles,
  Pin,

} from "lucide-react";



interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  category: "advertisement" | "result" | "admit-card" | "syllabus" | "corrigendum";
  isImportant: boolean;
  isNew: boolean;
  isPinned: boolean;
  downloadUrl: string;
  viewUrl: string;
}

const NoticesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");

  const categories = [
    { id: "all", label: "All Notices", icon: Newspaper, count: 48 },
    { id: "advertisement", label: "Advertisements", icon: Megaphone, count: 12 },
    { id: "result", label: "Results", icon: Award, count: 8 },
    { id: "admit-card", label: "Admit Cards", icon: FileText, count: 6 },
    { id: "syllabus", label: "Syllabus", icon: BookOpen, count: 4 },
    { id: "corrigendum", label: "Corrigendum", icon: AlertCircle, count: 18 },
  ];

  const notices: Notice[] = [
    {
      id: 1,
      title: "JTGLCCE 2026 Detailed Advertisement No. 05/2026 Released",
      description: "Commission invites online applications for various technical graduate positions across Jharkhand. Last date to apply is November 30, 2025.",
      date: "October 15, 2025",
      category: "advertisement",
      isImportant: true,
      isNew: true,
      isPinned: true,
      downloadUrl: "/notices/advertisement-05-2026.pdf",
      viewUrl: "/notices/view/1"
    },
    {
      id: 2,
      title: "Result Declaration for JTGLCCE 2024 Preliminary Exam",
      description: "Preliminary examination results have been published. Candidates can check their results using roll number.",
      date: "October 10, 2025",
      category: "result",
      isImportant: true,
      isNew: true,
      isPinned: false,
      downloadUrl: "/notices/result-2024.pdf",
      viewUrl: "/notices/view/2"
    },
    {
      id: 3,
      title: "Admit Card Release for Technical Assistant Exam",
      description: "Admit cards for the upcoming Technical Assistant examination are now available for download.",
      date: "October 5, 2025",
      category: "admit-card",
      isImportant: true,
      isNew: false,
      isPinned: false,
      downloadUrl: "/notices/admit-card-ta.pdf",
      viewUrl: "/notices/view/3"
    },
    {
      id: 4,
      title: "Revised Syllabus for Engineering Disciplines",
      description: "Important updates in the syllabus for Civil, Mechanical, and Electrical Engineering streams.",
      date: "September 28, 2025",
      category: "syllabus",
      isImportant: false,
      isNew: false,
      isPinned: false,
      downloadUrl: "/notices/revised-syllabus.pdf",
      viewUrl: "/notices/view/4"
    },
    {
      id: 5,
      title: "Corrigendum: Age Relaxation for Reserved Categories",
      description: "Correction regarding age relaxation norms for SC/ST/OBC candidates as per government directives.",
      date: "September 20, 2025",
      category: "corrigendum",
      isImportant: true,
      isNew: false,
      isPinned: false,
      downloadUrl: "/notices/corrigendum-age.pdf",
      viewUrl: "/notices/view/5"
    },
    {
      id: 6,
      title: "Extension of Application Deadline for JTGLCCE 2026",
      description: "Last date for online application submission extended till December 15, 2025.",
      date: "September 15, 2025",
      category: "advertisement",
      isImportant: true,
      isNew: false,
      isPinned: true,
      downloadUrl: "/notices/deadline-extension.pdf",
      viewUrl: "/notices/view/6"
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "advertisement": return Megaphone;
      case "result": return Award;
      case "admit-card": return FileText;
      case "syllabus": return BookOpen;
      case "corrigendum": return AlertCircle;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "advertisement": return "bg-blue-100 text-blue-700";
      case "result": return "bg-green-100 text-green-700";
      case "admit-card": return "bg-purple-100 text-purple-700";
      case "syllabus": return "bg-orange-100 text-orange-700";
      case "corrigendum": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeCategory === "all" || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedNotices = filteredNotices.filter(notice => notice.isPinned);
  const regularNotices = filteredNotices.filter(notice => !notice.isPinned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/60 to-primary-dark/80 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Bell size={14} className="text-yellow-400" />
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Stay Updated</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Notices & Announcements
            </h1>
            <p className="text-text-secondary text-base lg:text-lg">
              Get the latest updates, notifications, and important announcements from JSSC
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-primary" />
                <h3 className="font-bold text-slate-800">Categories</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span className="text-sm font-medium">{category.label}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Year Filter */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 mb-6">
              <h3 className="font-bold text-slate-800 mb-3">Filter by Year</h3>
              <div className="space-y-2">
                {["2025", "2024", "2023", "2022"].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      selectedYear === year
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  <span className="text-slate-600 text-sm">
                    Showing <span className="font-bold text-primary">{filteredNotices.length}</span> notices
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-slate-500 text-xs">Last updated: Today, 10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Pinned Notices */}
            {pinnedNotices.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Pin size={18} className="text-red-500" />
                  <h2 className="font-bold text-slate-800">Pinned Notices</h2>
                </div>
                <div className="space-y-4">
                  {pinnedNotices.map((notice) => {
                    const Icon = getCategoryIcon(notice.category);
                    const categoryColor = getCategoryColor(notice.category);
                    return (
                      <div key={notice.id} className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
                                <Icon size={12} />
                                {notice.category.charAt(0).toUpperCase() + notice.category.slice(1).replace('-', ' ')}
                              </span>
                              {notice.isImportant && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                                  <AlertCircle size={12} />
                                  Important
                                </span>
                              )}
                              {notice.isNew && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                  <Sparkles size={12} />
                                  New
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                                <Pin size={12} />
                                Pinned
                              </span>
                            </div>
                            <h3 className="text-slate-800 font-bold text-lg mb-2">{notice.title}</h3>
                            <p className="text-slate-600 text-sm mb-3">{notice.description}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {notice.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row lg:flex-col gap-2">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                              <Eye size={14} />
                              View
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                              <Download size={14} />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regular Notices */}
            {regularNotices.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper size={18} className="text-primary" />
                  <h2 className="font-bold text-slate-800">All Notices</h2>
                </div>
                <div className="space-y-4">
                  {regularNotices.map((notice) => {
                    const Icon = getCategoryIcon(notice.category);
                    const categoryColor = getCategoryColor(notice.category);
                    return (
                      <div key={notice.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
                                <Icon size={12} />
                                {notice.category.charAt(0).toUpperCase() + notice.category.slice(1).replace('-', ' ')}
                              </span>
                              {notice.isImportant && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                                  <AlertCircle size={12} />
                                  Important
                                </span>
                              )}
                              {notice.isNew && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                  <Sparkles size={12} />
                                  New
                                </span>
                              )}
                            </div>
                            <h3 className="text-slate-800 font-bold text-lg mb-2">{notice.title}</h3>
                            <p className="text-slate-600 text-sm mb-3">{notice.description}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {notice.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row lg:flex-col gap-2">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                              <Eye size={14} />
                              View
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                              <Download size={14} />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredNotices.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-800 font-bold text-lg mb-2">No notices found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredNotices.length > 0 && (
              <div className="text-center mt-8">
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                  Load More Notices
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NoticesPage;