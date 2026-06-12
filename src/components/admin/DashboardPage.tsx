


import { MoreHorizontal, TrendingUp, FileDown, CheckCircle, Clock, Eye, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interfaces
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Application {
  status: string;
  isSubmitted?: boolean;
  currentStep?: number;
}

interface Candidate {
  id: string;
  registrationNumber: string;
  mobileNumber: string;
  dateOfBirth: string;
  createdAt: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  user?: User;
  application?: Application;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  data: Candidate[];
  pagination: Pagination;
  message?: string;
}

interface StatCard {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  bgGradient: string;
}




// Get authentication headers for admin
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminAccessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  // Removed unused dateRange state

  // Fetch candidates data
  useEffect(() => {
    fetchCandidates();
    // Check if admin is logged in
    const token = localStorage.getItem("adminAccessToken");
    if (!token) {
      toast.error("Please login to access dashboard");
      navigate("/admin/login");
    }
  }, [navigate]);

  const fetchCandidates = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/admin/candidates?page=${page}&limit=${pagination.limit}`,
        getAuthHeaders()
      );

      if (response.data.success) {
        setCandidates(response.data.data);
        setPagination(response.data.pagination);
      } else {
        toast.error(response.data.message || "Failed to fetch candidates");
      }
    } catch (error: any) {
      console.error("Error fetching candidates:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminIdToken");
        localStorage.removeItem("adminRefreshToken");
        navigate("/admin/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch candidates");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics based on candidates data
  const totalApplications = candidates.length;
  const completedApplications = candidates.filter(c => 
    c.application?.status === "submitted" || 
    c.application?.isSubmitted === true ||
    c.application?.status === "completed"
  ).length;
  
  const verifiedApplications = candidates.filter(c => 
    c.mobileVerified === true && c.emailVerified === true
  ).length;
  
  const pendingApplications = candidates.filter(c => 
    (!c.application || c.application?.status === "draft" || c.application?.isSubmitted === false)
  ).length;

  const statCards: StatCard[] = [
    {
      title: "Total Applications",
      value: pagination.total || totalApplications,
      icon: Users,
      color: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500",
      bgGradient: "from-blue-50 to-white"
    },
    {
      title: "Completed Applications",
      value: completedApplications,
      icon: CheckCircle,
      color: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      iconColor: "text-green-500",
      bgGradient: "from-green-50 to-white"
    },
    {
      title: "Verified Applications",
      value: verifiedApplications,
      icon: TrendingUp,
      color: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      iconColor: "text-purple-500",
      bgGradient: "from-purple-50 to-white"
    },
    {
      title: "Pending Applications",
      value: pendingApplications,
      icon: Clock,
      color: "bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-500",
      bgGradient: "from-yellow-50 to-white"
    }
  ];

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  
  

 
  

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCandidates(newPage);
    }
  };

  const handleExport = async (): Promise<void> => {
    try {
      toast.info("Exporting Excel file...");
      
      // Updated API endpoint as requested
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/admin/candidates/export/xlsx`,
        {
          ...getAuthHeaders(),
          responseType: 'blob'
        }
      );
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `candidates_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("Excel file exported successfully");
    } catch (error: any) {
      console.error("Error exporting Excel:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminIdToken");
        localStorage.removeItem("adminRefreshToken");
        navigate("/admin/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to export Excel file");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Title Area */}
        <div className="flex items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[26px] font-bold text-[#111827] tracking-tight">
                Candidate Management Dashboard
              </h2>
            </div>
            <p className="text-[14px] text-[#5F6368] mt-1">
              Track and manage all candidate applications in one place
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 bg-[#003A2B] text-white px-4 py-2.5 rounded-[4px] text-[13px] font-bold hover:bg-[#002B20] transition-colors"
            >
              <FileDown size={18} /> Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* STATISTICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-white border ${card.borderColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon size={24} className={card.iconColor} />
              </div>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#5F6368] uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <h3 className="text-[32px] font-black text-[#111827] leading-none">
                {loading ? "..." : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CANDIDATES HISTORY TABLE */}
      <div className="bg-white border border-[#E1E5E3] rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#E1E5E3] bg-[#FAFBFB] flex justify-between items-center flex-wrap gap-4">
          <h4 className="text-[16px] font-bold text-[#111827]">Candidates History</h4>
          <div className="flex gap-3">
            <button 
              onClick={() => fetchCandidates(1)}
              className="text-[#003A2B] text-[13px] font-bold hover:underline"
            >
              Refresh
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003A2B]"></div>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F1F3F4] text-[#5F6368] text-[12px] font-black uppercase tracking-widest">
                  <th className="px-6 py-4">S.No</th>
                  <th className="px-6 py-4">Registration No.</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Date of Birth</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E5E3]">
                {candidates.map((candidate, idx) => {
                  
                  return (
                    <tr key={candidate.id} className="hover:bg-gray-50 text-[14px] transition-colors">
                      <td className="px-6 py-4 text-[#5F6368] font-medium">
                        {(pagination.page - 1) * pagination.limit + idx + 1}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#111827]">
                        {candidate.registrationNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#111827]">
                        {candidate.user?.firstName || "N/A"} {candidate.user?.lastName || ""}
                      </td>
                      <td className="px-6 py-4 text-[#5F6368]">
                        {candidate.user?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-[#5F6368]">
                        {candidate.mobileNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-[#5F6368]">
                        {candidate.dateOfBirth ? new Date(candidate.dateOfBirth).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-[#5F6368]">
                        {formatDate(candidate.createdAt)}
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => navigate(`/admin/candidates/${candidate.id}`)}
                          className="inline-flex items-center gap-1 text-[#003A2B] font-bold text-[12px] hover:underline uppercase"
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {candidates.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-[#5F6368]">
                      No candidates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#E1E5E3] bg-[#FAFBFB] flex justify-between items-center flex-wrap gap-4">
            <p className="text-[13px] text-[#5F6368]">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} candidates
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border border-[#B9C2BD] rounded text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded text-[13px] font-bold transition-colors ${
                      pagination.page === pageNum
                        ? "bg-[#003A2B] text-white"
                        : "border border-[#B9C2BD] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 border border-[#B9C2BD] rounded text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}