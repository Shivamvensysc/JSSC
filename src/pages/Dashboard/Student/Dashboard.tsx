

// import { 
//   CheckCircle2, 
//   Wallet , 
//   RefreshCw, 
//   Lock, 
//   Download, 
//   Eye, 
//   FileText
// } from "lucide-react";

// export default function CandidateDashboard() {
//   // Notices mock data array
//   const notices = [
//     {
//       date: "Oct 20, 2025",
//       title: "Revised Schedule for Technical Subjects Exam",
//       category: "EXAM",
//       categoryBg: "bg-[#F0F7FF] text-[#0066CC]",
//     },
//     {
//       date: "Oct 18, 2025",
//       title: "Extension of Application Correction Window",
//       category: "PORTAL",
//       categoryBg: "bg-[#E6F4EA] text-[#137333]",
//     },
//     {
//       date: "Oct 15, 2025",
//       title: "Notice regarding Selection Criteria for Para-Teachers",
//       category: "GENERAL",
//       categoryBg: "bg-[#F1F3F4] text-[#3C4043]",
//     },
//   ];

//   return (
//     <div className="min-h-screen  px-4 py-2 md:px-8">
//       <div className="max-w-7xl mx-auto space-y-4">
        
//         {/* ================= TOP WELCOME HEADER ================= */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4  ">
//           <div>
//             <h1 className="text-[28px] md:text-[32px] font-bold text-[#003A2B] tracking-[-0.5px]">
//               Welcome, Rajesh Kumar
//             </h1>
//             <p className="text-[13px] text-[#5F6368] mt-1 font-medium">
//               Last Login: Oct 24, 2025 | 10:45 AM
//             </p>
//           </div>
          
//           <div className="self-start sm:self-center">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4EA] text-[#137333] text-[13px] font-bold rounded-full border border-[#CEEAD6]">
//               <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse" />
//               Application Submitted
//             </span>
//           </div>
//         </div>

//         {/* ================= MAIN METRICS GRID ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* APPLICATION OVERVIEW CARD */}
//           <div className="lg:col-span-2 bg-white border border-[#E1E5E3] rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between">
//             <div>
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-[20px] font-bold text-[#003A2B]">
//                   Application Overview
//                 </h2>
//                 <span className="text-[12px] font-mono font-bold tracking-wider text-[#5F6368] bg-[#F1F3F4] px-2.5 py-1 rounded-[2px]">
//                   REF: JSSC-2026-X92
//                 </span>
//               </div>

//               {/* TIMELINE TRACK */}
//               <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E1E5E3]">
                
//                 {/* STEP 1: REGISTRATION */}
//                 <div className="relative">
//                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
//                     <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
//                   </span>
//                   <div className="flex justify-between items-start gap-4">
//                     <div>
//                       <h4 className="text-[15px] font-bold text-[#111827]">Registration Complete</h4>
//                       <p className="text-[13px] text-[#5F6368] mt-0.5">Completed on August 15, 2025</p>
//                     </div>
//                     <CheckCircle2 size={20} className="text-[#137333] shrink-0" />
//                   </div>
//                 </div>

//                 {/* STEP 2: PAYMENT */}
//                 <div className="relative">
//                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
//                     <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
//                   </span>
//                   <div className="flex justify-between items-start gap-4">
//                     <div>
//                       <h4 className="text-[15px] font-bold text-[#111827]">Payment Confirmed</h4>
//                       <p className="text-[13px] font-mono text-[#5F6368] mt-0.5">
//                         Transaction ID: TXN882910022 - ₹500.00
//                       </p>
//                     </div>
//                     <Wallet  size={20} className="text-[#374151] shrink-0" />
//                   </div>
//                 </div>

//                 {/* STEP 3: Edit application */}
//                 <div className="relative">
                 
//                  <button>Edit Application </button>
//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR ACTIONS BLOCK */}
//           <div className="space-y-6 flex flex-col justify-between">
            
//             {/* ADMIT CARD POOL */}
//             <div className="bg-white border border-[#E1E5E3] rounded-lg p-5 relative shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
//               <div className="absolute right-4 top-4 text-[#9CA3AF]">
//                 <Lock size={16} />
//               </div>
//               <h3 className="text-[18px] font-bold text-[#111827]">Admit Card</h3>
//               <p className="text-[13px] text-[#5F6368] mt-1 mb-4 leading-normal">
//                 Available after verification process is finalized.
//               </p>
//               <button 
//                 disabled 
//                 className="w-full h-[42px] bg-[#9CA3AF] text-white text-[14px] font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2 opacity-80"
//               >
//                 <Download size={16} />
//                 Download Locked
//               </button>
//             </div>

//             {/* Application Review */}
//             <div className="bg-[#003A2B] border border-[#002B20] rounded-lg p-5 text-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
//               <h3 className="text-[18px] font-bold">Application Review</h3>
//               <p className="text-[13px] text-gray-300 mt-1 mb-4 leading-normal">
//                 View your Application data .
//               </p>
//               <button className="w-full h-[42px] bg-transparent border border-white hover:bg-white/10 text-white text-[14px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
//                 <Eye size={16} />
//                 View Application
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* ================= RECENT OFFICIAL NOTICES ================= */}
//         <div className="bg-white border border-[#E1E5E3] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden">
          
//           {/* TABLE HEADER PANEL */}
//           <div className="px-5 py-4 border-b border-[#E1E5E3] bg-[#FAFBFB] flex justify-between items-center">
//             <h3 className="text-[18px] font-bold text-[#003A2B]">
//               Recent Official Notices
//             </h3>
//             <span className="px-2.5 py-1 bg-[#003A2B] text-white text-[11px] font-bold rounded-lg tracking-wide uppercase">
//               New Update
//             </span>
//           </div>

//           {/* DATA RESPONSIVE TABLE LAYER */}
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[600px] text-left border-collapse">
//               <thead>
//                 <tr className="bg-[#F1F3F4] border-b border-[#E1E5E3] text-[#3C4043] font-bold text-[13px] uppercase tracking-wider">
//                   <th className="py-3 px-5 w-[15%]">Date</th>
//                   <th className="py-3 px-5 w-[60%]">Notification Title</th>
//                   <th className="py-3 px-5 w-[15%] text-center">Category</th>
//                   <th className="py-3 px-5 w-[10%] text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#E1E5E3]/70 text-[14px]">
//                 {notices.map((notice, idx) => (
//                   <tr key={idx} className="hover:bg-[#F8F9FA] transition-colors">
//                     {/* Date segment */}
//                     <td className="py-4 px-5 text-[#5F6368] font-medium">
//                       {notice.date}
//                     </td>
//                     {/* Title segment */}
//                     <td className="py-4 px-5 font-semibold text-[#111827] max-w-md truncate">
//                       {notice.title}
//                     </td>
//                     {/* Category item pill */}
//                     <td className="py-4 px-5 text-center">
//                       <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[11px] font-extrabold tracking-wide ${notice.categoryBg}`}>
//                         {notice.category}
//                       </span>
//                     </td>
//                     {/* Action download triggers */}
//                     <td className="py-4 px-5 text-center">
//                       <a 
//                         href="#download-pdf" 
//                         className="inline-flex items-center gap-1 text-[#003A2B] font-bold hover:underline text-[13px]"
//                       >
//                         PDF
//                         <FileText size={14} className="stroke-[2.5]" />
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  Download, 
  Eye, 
  FileText,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Type Definitions
interface PersonalInfo {
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
}

interface ApplicationData {
  applicationReferenceNumber: string;
  status: string;
  submissionDate: string;
  steps: {
    personalInfo: PersonalInfo;
  };
  candidateDetails: {
    updatedAt: string;
  };
}

interface ApiResponse {
  success: boolean;
  data: ApplicationData;
}

// Notices mock data array (constant)
const notices = [
  {
    date: "Oct 20, 2025",
    title: "Revised Schedule for Technical Subjects Exam",
    category: "EXAM",
    categoryBg: "bg-[#F0F7FF] text-[#0066CC]",
  },
  {
    date: "Oct 18, 2025",
    title: "Extension of Application Correction Window",
    category: "PORTAL",
    categoryBg: "bg-[#E6F4EA] text-[#137333]",
  },
  {
    date: "Oct 15, 2025",
    title: "Notice regarding Selection Criteria for Para-Teachers",
    category: "GENERAL",
    categoryBg: "bg-[#F1F3F4] text-[#3C4043]",
  },
];

// Helper to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatLastLogin = () => {
  const now = new Date();
  return now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<string>("");

  useEffect(() => {
    // Set last login to current date and time
    setLastLogin(formatLastLogin());
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get<ApiResponse>(
          `${API_BASE_URL}/application/steps/all`,
          getAuthHeaders()
        );
        
        if (response.data.success) {
          setApplicationData(response.data.data);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        if (err.response?.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (err.response?.status === 403) {
          setError('You do not have permission to access this data.');
        } else if (err.response?.status === 404) {
          setError('Application data not found.');
        } else {
          setError(err.message || 'An error occurred while fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewApplication = () => {
    // Navigate to application summary page
    
    navigate('/dashboard/admit-card')
  };

  const handleEditApplication = () => {
    // This would navigate to edit page, but currently disabled
    alert("Application editing is currently disabled. Please contact support if you need to make changes.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[#003A2B] mx-auto" />
          <p className="mt-4 text-[#5F6368] font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !applicationData) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200 text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-4">{error || 'No data available'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-[#003A2B] text-white rounded-lg text-sm hover:bg-[#002B20] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { steps, applicationReferenceNumber, status, submissionDate } = applicationData;
  const fullName = `${steps.personalInfo.firstName} ${steps.personalInfo.lastName}`;

  return (
    <div className="min-h-screen  px-4 py-2 md:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* ================= TOP WELCOME HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#003A2B] tracking-[-0.5px]">
              Welcome, {fullName}
            </h1>
            <p className="text-[13px] text-[#5F6368] mt-1 font-medium">
              Last Login: {lastLogin}
            </p>
          </div>
          
          <div className="self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4EA] text-[#137333] text-[13px] font-bold rounded-full border border-[#CEEAD6]">
              <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse" />
              {status === 'submitted' ? 'Application Submitted' : status}
            </span>
          </div>
        </div>

        {/* ================= MAIN METRICS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* APPLICATION OVERVIEW CARD */}
          <div className="lg:col-span-2 bg-white border border-[#E1E5E3] rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-[20px] font-bold text-[#003A2B]">
                  Application Overview
                </h2>
                <span className="text-[12px] font-mono font-bold tracking-wider text-[#5F6368] bg-[#F1F3F4] px-2.5 py-1 rounded-[2px]">
                  REF: {applicationReferenceNumber}
                </span>
              </div>

              {/* TIMELINE TRACK */}
              <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E1E5E3]">
                
                {/* STEP 1: REGISTRATION */}
               {/* STEP 1: REGISTRATION */}
<div className="relative">
  <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
    <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
  </span>

  <div className="flex justify-between items-start gap-4">
    <div>
      <h4 className="text-[15px] font-bold text-[#111827]">
        Registration Complete
      </h4>
      <p className="text-[13px] text-[#5F6368] mt-0.5">
        Completed on {formatDate(submissionDate)}
      </p>
    </div>

    <button
      onClick={() => console.log("Download Application Form")}
      className="flex items-center gap-2 px-3 py-2 bg-[#003A2B] hover:bg-[#002B20] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
    >
      <Download size={14} />
      Download Form
    </button>
  </div>
</div>

{/* STEP 2: PAYMENT */}
<div className="relative">
  <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
    <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
  </span>

  <div className="flex justify-between items-start gap-4">
    <div>
      <h4 className="text-[15px] font-bold text-[#111827]">
        Payment Confirmed
      </h4>
      <p className="text-[13px] font-mono text-[#5F6368] mt-0.5">
        Transaction ID: TXN882910022 - ₹100.00
      </p>
    </div>

    <button
      onClick={() => console.log("Download Receipt")}
      className="flex items-center gap-2 px-3 py-2 bg-[#137333] hover:bg-[#0f5c2a] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
    >
      <Download size={14} />
      Download Receipt
    </button>
  </div>
</div>

                {/* STEP 3: Edit application - Disabled Mode */}
                <div className="relative">
                  <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#9CA3AF]">
                    <Lock size={14} />
                  </span>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-[15px] font-bold text-[#9CA3AF]">Edit Application</h4>
                      <p className="text-[13px] text-[#9CA3AF] mt-0.5">
                        Editing is locked after submission
                      </p>
                    </div>
                    <button 
                      onClick={handleEditApplication}
                      disabled
                      className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F3F4] text-[#9CA3AF] text-[13px] font-semibold rounded-lg cursor-not-allowed opacity-60"
                    >
                      <RefreshCw size={14} />
                      Edit Disabled
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR ACTIONS BLOCK */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* ADMIT CARD POOL */}
            <div className="bg-white border border-[#E1E5E3] rounded-lg p-5 relative shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
              <div className="absolute right-4 top-4 text-[#9CA3AF]">
                <Lock size={16} />
              </div>
              <h3 className="text-[18px] font-bold text-[#111827]">Admit Card</h3>
              <p className="text-[13px] text-[#5F6368] mt-1 mb-4 leading-normal">
                Available after verification process is finalized.
              </p>
              <button 
                disabled 
                className="w-full h-[42px] bg-[#9CA3AF] text-white text-[14px] font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2 opacity-80"
              >
                <Download size={16} />
                Download Locked
              </button>
            </div>

            {/* Application Review */}
            <div className="bg-[#003A2B] border border-[#002B20] rounded-lg p-5 text-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
              <h3 className="text-[18px] font-bold">Application Review</h3>
              <p className="text-[13px] text-gray-300 mt-1 mb-4 leading-normal">
                View your Application data.
              </p>
              <button 
                onClick={handleViewApplication}
                className="w-full h-[42px] bg-transparent border border-white hover:bg-white/10 text-white text-[14px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                View Application
              </button>
            </div>

          </div>
        </div>

        {/* ================= RECENT OFFICIAL NOTICES ================= */}
        <div className="bg-white border border-[#E1E5E3] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden">
          
          {/* TABLE HEADER PANEL */}
          <div className="px-5 py-4 border-b border-[#E1E5E3] bg-[#FAFBFB] flex justify-between items-center">
            <h3 className="text-[18px] font-bold text-[#003A2B]">
              Recent Official Notices
            </h3>
            <span className="px-2.5 py-1 bg-[#003A2B] text-white text-[11px] font-bold rounded-lg tracking-wide uppercase">
              New Update
            </span>
          </div>

          {/* DATA RESPONSIVE TABLE LAYER */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="bg-[#F1F3F4] border-b border-[#E1E5E3] text-[#3C4043] font-bold text-[13px] uppercase tracking-wider">
                  <th className="py-3 px-5 w-[15%]">Date</th>
                  <th className="py-3 px-5 w-[60%]">Notification Title</th>
                  <th className="py-3 px-5 w-[15%] text-center">Category</th>
                  <th className="py-3 px-5 w-[10%] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E5E3]/70 text-[14px]">
                {notices.map((notice, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F9FA] transition-colors">
                    {/* Date segment */}
                    <td className="py-4 px-5 text-[#5F6368] font-medium">
                      {notice.date}
                    </td>
                    {/* Title segment */}
                    <td className="py-4 px-5 font-semibold text-[#111827] max-w-md truncate">
                      {notice.title}
                    </td>
                    {/* Category item pill */}
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[11px] font-extrabold tracking-wide ${notice.categoryBg}`}>
                        {notice.category}
                      </span>
                    </td>
                    {/* Action download triggers */}
                    <td className="py-4 px-5 text-center">
                      <a 
                        href="#download-pdf" 
                        className="inline-flex items-center gap-1 text-[#003A2B] font-bold hover:underline text-[13px]"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading notice: ${notice.title}`);
                        }}
                      >
                        PDF
                        <FileText size={14} className="stroke-[2.5]" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}