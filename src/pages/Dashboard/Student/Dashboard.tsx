// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { 
// //   CheckCircle2, 
// //   RefreshCw, 
// //   Lock, 
// //   Download, 
// //   Eye, 
// //   FileText,
// //   Loader2,
// //   AlertCircle
// // } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // // API Configuration
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // // Helper function to get auth headers
// // const getAuthHeaders = () => {
// //   const token = localStorage.getItem("accessToken");
// //   return {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //       "Content-Type": "application/json",
// //     },
// //   };
// // };

// // // Type Definitions
// // interface PersonalInfo {
// //   firstName: string;
// //   lastName: string;
// //   emailId: string;
// //   mobileNumber: string;
// // }

// // interface ApplicationData {
// //   applicationReferenceNumber: string;
// //   status: string;
// //   submissionDate: string;
// //    isSubmitted?: boolean;
// //   steps: {
// //     personalInfo: PersonalInfo;
// //   };
// //   candidateDetails: {
// //     updatedAt: string;
// //   };
// // }

// // interface ApiResponse {
// //   success: boolean;
// //   data: ApplicationData;
// // }

// // // Notices mock data array (constant)
// // const notices = [
// //   {
// //     date: "Oct 20, 2025",
// //     title: "Revised Schedule for Technical Subjects Exam",
// //     category: "EXAM",
// //     categoryBg: "bg-[#F0F7FF] text-[#0066CC]",
// //   },
// //   {
// //     date: "Oct 18, 2025",
// //     title: "Extension of Application Correction Window",
// //     category: "PORTAL",
// //     categoryBg: "bg-[#E6F4EA] text-[#137333]",
// //   },
// //   {
// //     date: "Oct 15, 2025",
// //     title: "Notice regarding Selection Criteria for Para-Teachers",
// //     category: "GENERAL",
// //     categoryBg: "bg-[#F1F3F4] text-[#3C4043]",
// //   },
// // ];

// // // Helper to format date
// // const formatDate = (dateString: string) => {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString('en-IN', {
// //     day: 'numeric',
// //     month: 'short',
// //     year: 'numeric',
// //     hour: '2-digit',
// //     minute: '2-digit',
// //   });
// // };

// // const formatLastLogin = () => {
// //   const now = new Date();
// //   return now.toLocaleDateString('en-IN', {
// //     day: 'numeric',
// //     month: 'short',
// //     year: 'numeric',
// //     hour: '2-digit',
// //     minute: '2-digit',
// //   });
// // };

// // export default function CandidateDashboard() {
// //   const navigate = useNavigate();
// //   const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [lastLogin, setLastLogin] = useState<string>("");

// //   useEffect(() => {
// //     // Set last login to current date and time
// //     setLastLogin(formatLastLogin());
    
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);
        
// //         const response = await axios.get<ApiResponse>(
// //           `${API_BASE_URL}/application/steps/all`,
// //           getAuthHeaders()
// //         );
        
// //         if (response.data.success) {
// //           const data = response.data.data; 
// //           console.log("candidate dashboard response ", data)
          
// //           // Check if application is submitted or not
// //           if (data.isSubmitted === false) {
// //             // Navigate to application form if not submitted
// //             navigate('/dashboard/my-applications');
// //             return;
// //           }
          
// //           setApplicationData(data);
// //         } else {
// //           throw new Error('API returned unsuccessful response');
// //         }
// //       } catch (err: any) {
// //         console.error('Error fetching data:', err);
        
// //         // Handle 404 error - application not found, navigate to form
// //         if (err.response?.status === 404) {
// //           navigate('/dashboard/my-applications');
// //           return;
// //         }
        
// //         if (err.response?.status === 401) {
// //           setError('Authentication failed. Please login again.');
// //         } else if (err.response?.status === 403) {
// //           setError('You do not have permission to access this data.');
// //         } else {
// //           setError(err.message || 'An error occurred while fetching data');
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [navigate]);

// //   const handleViewApplication = () => {
// //     navigate('/dashboard/admit-card');
// //   };

// //   const handleEditApplication = () => {
// //     alert("Application editing is currently disabled. Please contact support if you need to make changes.");
// //   };

// //   const handleContinueApplication = () => {
// //     navigate('/dashboard/my-applications');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 size={40} className="animate-spin text-[#003A2B] mx-auto" />
// //           <p className="mt-4 text-[#5F6368] font-medium">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200 text-center max-w-md">
// //           <div className="text-red-600 text-5xl mb-4">⚠️</div>
// //           <p className="text-red-600 font-medium mb-4">{error}</p>
// //           <button 
// //             onClick={() => window.location.reload()} 
// //             className="mt-2 px-4 py-2 bg-[#003A2B] text-white rounded-lg text-sm hover:bg-[#002B20] transition-colors"
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // If no application data (should have been redirected already)
// //   if (!applicationData) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200 text-center max-w-md">
// //           <AlertCircle size={48} className="text-amber-500 mx-auto mb-4" />
// //           <h3 className="text-lg font-bold text-amber-800 mb-2">No Application Found</h3>
// //           <p className="text-amber-700 mb-4">You haven't started or submitted any application yet.</p>
// //           <button 
// //             onClick={handleContinueApplication}
// //             className="px-6 py-2 bg-[#003A2B] text-white rounded-lg hover:bg-[#002B20] transition-colors"
// //           >
// //             Start New Application
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { steps, applicationReferenceNumber, status, submissionDate } = applicationData;
// //   const fullName = `${steps.personalInfo.firstName} ${steps.personalInfo.lastName}`;

// //   return (
// //     <div className="min-h-screen px-4 py-2 md:px-8">
// //       <div className="max-w-7xl mx-auto space-y-4">
        
// //         {/* ================= TOP WELCOME HEADER ================= */}
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div>
// //             <h1 className="text-[28px] md:text-[32px] font-bold text-[#003A2B] tracking-[-0.5px]">
// //               Welcome, {fullName}
// //             </h1>
// //             <p className="text-[13px] text-[#5F6368] mt-1 font-medium">
// //               Last Login: {lastLogin}
// //             </p>
// //           </div>
          
// //           <div className="self-start sm:self-center">
// //             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4EA] text-[#137333] text-[13px] font-bold rounded-full border border-[#CEEAD6]">
// //               <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse" />
// //               {status === 'submitted' ? 'Application Submitted' : status || 'Draft'}
// //             </span>
// //           </div>
// //         </div>

// //         {/* ================= MAIN METRICS GRID ================= */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
// //           {/* APPLICATION OVERVIEW CARD */}
// //           <div className="lg:col-span-2 bg-white border border-[#E1E5E3] rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between">
// //             <div>
// //               <div className="flex justify-between items-start mb-6">
// //                 <h2 className="text-[20px] font-bold text-[#003A2B]">
// //                   Application Overview
// //                 </h2>
// //                 <span className="text-[12px] font-mono font-bold tracking-wider text-[#5F6368] bg-[#F1F3F4] px-2.5 py-1 rounded-[2px]">
// //                   REF: {applicationReferenceNumber || 'N/A'}
// //                 </span>
// //               </div>

// //               {/* TIMELINE TRACK */}
// //               <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E1E5E3]">
                
// //                 {/* STEP 1: REGISTRATION */}
// //                 <div className="relative">
// //                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
// //                     <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
// //                   </span>

// //                   <div className="flex justify-between items-start gap-4">
// //                     <div>
// //                       <h4 className="text-[15px] font-bold text-[#111827]">
// //                         Registration Complete
// //                       </h4>
// //                       <p className="text-[13px] text-[#5F6368] mt-0.5">
// //                         Completed on {submissionDate ? formatDate(submissionDate) : 'In Progress'}
// //                       </p>
// //                     </div>

// //                     <button
// //                       onClick={() => console.log("Download Application Form")}
// //                       className="flex items-center gap-2 px-3 py-2 bg-[#003A2B] hover:bg-[#002B20] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
// //                     >
// //                       <Download size={14} />
// //                       Download Form
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* STEP 2: PAYMENT */}
// //                 <div className="relative">
// //                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
// //                     <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
// //                   </span>

// //                   <div className="flex justify-between items-start gap-4">
// //                     <div>
// //                       <h4 className="text-[15px] font-bold text-[#111827]">
// //                         Payment Confirmed
// //                       </h4>
// //                       <p className="text-[13px] font-mono text-[#5F6368] mt-0.5">
// //                         Transaction ID: TXN882910022 - ₹100.00
// //                       </p>
// //                     </div>

// //                     <button
// //                       onClick={() => console.log("Download Receipt")}
// //                       className="flex items-center gap-2 px-3 py-2 bg-[#137333] hover:bg-[#0f5c2a] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
// //                     >
// //                       <Download size={14} />
// //                       Download Receipt
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* STEP 3: Edit application - Disabled Mode */}
// //                 <div className="relative">
// //                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#9CA3AF]">
// //                     <Lock size={14} />
// //                   </span>
// //                   <div className="flex justify-between items-start gap-4">
// //                     <div>
// //                       <h4 className="text-[15px] font-bold text-[#9CA3AF]">Edit Application</h4>
// //                       <p className="text-[13px] text-[#9CA3AF] mt-0.5">
// //                         Editing is locked after submission
// //                       </p>
// //                     </div>
// //                     <button 
// //                       onClick={handleEditApplication}
// //                       disabled
// //                       className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F3F4] text-[#9CA3AF] text-[13px] font-semibold rounded-lg cursor-not-allowed opacity-60"
// //                     >
// //                       <RefreshCw size={14} />
// //                       Edit Disabled
// //                     </button>
// //                   </div>
// //                 </div>

// //               </div>
// //             </div>
// //           </div>

// //           {/* RIGHT SIDEBAR ACTIONS BLOCK */}
// //           <div className="space-y-6 flex flex-col justify-between">
            
// //             {/* ADMIT CARD POOL */}
// //             <div className="bg-white border border-[#E1E5E3] rounded-lg p-5 relative shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
// //               <div className="absolute right-4 top-4 text-[#9CA3AF]">
// //                 <Lock size={16} />
// //               </div>
// //               <h3 className="text-[18px] font-bold text-[#111827]">Admit Card</h3>
// //               <p className="text-[13px] text-[#5F6368] mt-1 mb-4 leading-normal">
// //                 Available after verification process is finalized.
// //               </p>
// //               <button 
// //                 disabled 
// //                 className="w-full h-[42px] bg-[#9CA3AF] text-white text-[14px] font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2 opacity-80"
// //               >
// //                 <Download size={16} />
// //                 Download Locked
// //               </button>
// //             </div>

// //             {/* Application Review */}
// //             <div className="bg-[#003A2B] border border-[#002B20] rounded-lg p-5 text-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
// //               <h3 className="text-[18px] font-bold">Application Review</h3>
// //               <p className="text-[13px] text-gray-300 mt-1 mb-4 leading-normal">
// //                 View your Application data.
// //               </p>
// //               <button 
// //                 onClick={handleViewApplication}
// //                 className="w-full h-[42px] bg-transparent border border-white hover:bg-white/10 text-white text-[14px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
// //               >
// //                 <Eye size={16} />
// //                 View Application
// //               </button>
// //             </div>

// //           </div>
// //         </div>

// //         {/* ================= RECENT OFFICIAL NOTICES ================= */}
// //         <div className="bg-white border border-[#E1E5E3] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden">
          
// //           {/* TABLE HEADER PANEL */}
// //           <div className="px-5 py-4 border-b border-[#E1E5E3] bg-[#FAFBFB] flex justify-between items-center">
// //             <h3 className="text-[18px] font-bold text-[#003A2B]">
// //               Recent Official Notices
// //             </h3>
// //             <span className="px-2.5 py-1 bg-[#003A2B] text-white text-[11px] font-bold rounded-lg tracking-wide uppercase">
// //               New Update
// //             </span>
// //           </div>

// //           {/* DATA RESPONSIVE TABLE LAYER */}
// //           <div className="overflow-x-auto">
// //             <table className="w-full min-w-[600px] text-left border-collapse">
// //               <thead>
// //                 <tr className="bg-[#F1F3F4] border-b border-[#E1E5E3] text-[#3C4043] font-bold text-[13px] uppercase tracking-wider">
// //                   <th className="py-3 px-5 w-[15%]">Date</th>
// //                   <th className="py-3 px-5 w-[60%]">Notification Title</th>
// //                   <th className="py-3 px-5 w-[15%] text-center">Category</th>
// //                   <th className="py-3 px-5 w-[10%] text-center">Action</th>
// //                  </tr>
// //               </thead>
// //               <tbody className="divide-y divide-[#E1E5E3]/70 text-[14px]">
// //                 {notices.map((notice, idx) => (
// //                   <tr key={idx} className="hover:bg-[#F8F9FA] transition-colors">
// //                     <td className="py-4 px-5 text-[#5F6368] font-medium">
// //                       {notice.date}
// //                     </td>
// //                     <td className="py-4 px-5 font-semibold text-[#111827] max-w-md truncate">
// //                       {notice.title}
// //                     </td>
// //                     <td className="py-4 px-5 text-center">
// //                       <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[11px] font-extrabold tracking-wide ${notice.categoryBg}`}>
// //                         {notice.category}
// //                       </span>
// //                     </td>
// //                     <td className="py-4 px-5 text-center">
// //                       <a 
// //                         href="#download-pdf" 
// //                         className="inline-flex items-center gap-1 text-[#003A2B] font-bold hover:underline text-[13px]"
// //                         onClick={(e) => {
// //                           e.preventDefault();
// //                           alert(`Downloading notice: ${notice.title}`);
// //                         }}
// //                       >
// //                         PDF
// //                         <FileText size={14} className="stroke-[2.5]" />
// //                       </a>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   CheckCircle2, 
//   RefreshCw, 
//   Lock, 
//   Download, 
//   Eye, 
//   FileText,
//   Loader2,
//   AlertCircle
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // API Configuration
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to get auth headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("accessToken");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };
// };

// // Type Definitions
// interface PersonalInfo {
//   firstName: string;
//   lastName: string;
//   emailId: string;
//   mobileNumber: string;
//   fatherName: string;
//   motherName: string;
//   dateOfBirth: string;
//   title: string;
//   gender: string;
//   nationality: string;
//   identityType: string;
//   identityNumber: string;
//   alternateNumber: string;
//   identificationMark1: string;
//   identificationMark2: string;
//   address: {
//     permanent: {
//       street: string;
//       city: string;
//       post: string;
//       state: string;
//       district: string;
//       pincode: string;
//       country: string;
//     };
//     correspondence: {
//       street: string;
//       city: string;
//       post: string;
//       state: string;
//       district: string;
//       pincode: string;
//       country: string;
//       sameAsPermanent: boolean;
//     };
//   };
// }

// interface ReservationCategory {
//   mainCategoryName: string;
//   subCategoryName: string;
//   isJharkhandDomicile: boolean;
//   categoryCertificateNumber: string;
//   domicileCertificateNumber: string;
//   isPwd: boolean;
//   isExServiceman: boolean;
//   isSportsQuota: boolean;
// }

// interface Qualification {
//   level: string;
//   degree: string;
//   boardUniversity: string;
//   yearOfPassing: number;
//   percentage: number;
//   totalMarks: number;
//   marksObtained: number;
//   rollNumber: string;
//   institutionName: string;
// }

// interface Education {
//   qualifications: Qualification[];
// }

// interface PostRanking {
//   postCode: string;
//   priority: number;
//   postTitle: string;
//   postName: string;
// }

// interface PostPreference {
//   postRankings: PostRanking[];
//   vacancyStream: string;
//   isRegular: boolean;
//   isBacklog: boolean;
// }

// interface LanguageSelection {
//   paperOneLanguage: string;
//   paperTwoLanguage: string;
//   paperThreeLanguage: string;
// }

// interface Documents {
//   photo: string;
//   signature: string;
// }

// interface Steps {
//   personalInfo: PersonalInfo;
//   reservationCategory: ReservationCategory;
//   education: Education;
//   postPreference: PostPreference;
//   languageSelection: LanguageSelection;
//   documents: Documents;
// }

// interface ApplicationData {
//   applicationReferenceNumber: string;
//   status: string;
//   submissionDate: string;
//   isSubmitted?: boolean;
//   steps: Steps;
//   candidateDetails: {
//     updatedAt: string;
//     registrationNumber: string;
//     mobileNumber: string;
//   };
// }

// interface ApiResponse {
//   success: boolean;
//   data: ApplicationData;
// }

// // Notices mock data array (constant)
// const notices = [
//   {
//     date: "Oct 20, 2025",
//     title: "Revised Schedule for Technical Subjects Exam",
//     category: "EXAM",
//     categoryBg: "bg-[#F0F7FF] text-[#0066CC]",
//   },
//   {
//     date: "Oct 18, 2025",
//     title: "Extension of Application Correction Window",
//     category: "PORTAL",
//     categoryBg: "bg-[#E6F4EA] text-[#137333]",
//   },
//   {
//     date: "Oct 15, 2025",
//     title: "Notice regarding Selection Criteria for Para-Teachers",
//     category: "GENERAL",
//     categoryBg: "bg-[#F1F3F4] text-[#3C4043]",
//   },
// ];

// // Helper to format date
// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// const formatLastLogin = () => {
//   const now = new Date();
//   return now.toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// // Function to generate and open print window with application data
// const openPrintWindow = (data: ApplicationData) => {
//   const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
//   if (!printWindow) {
//     alert('Please allow pop-ups to download the application form');
//     return;
//   }

//   const personalInfo = data.steps.personalInfo;
//   const reservation = data.steps.reservationCategory;
//   const education = data.steps.education;
//   const postPreference = data.steps.postPreference;
//   const language = data.steps.languageSelection;
//   const documents = data.steps.documents;
  
//   const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
//   const submissionDateFormatted = formatDate(data.submissionDate);
  
//   // Get address details
//   const permanentAddr = personalInfo.address.permanent;
//   const correspondenceAddr = personalInfo.address.correspondence;
//   const sameAddress = correspondenceAddr.sameAsPermanent;
  
//   const permanentAddressStr = `${permanentAddr.street}, ${permanentAddr.city}, ${permanentAddr.post}, District: ${permanentAddr.district}, ${permanentAddr.state}, ${permanentAddr.country} - ${permanentAddr.pincode}`;
//   const correspondenceAddressStr = sameAddress ? "Same as permanent address" : `${correspondenceAddr.street}, ${correspondenceAddr.city}, ${correspondenceAddr.post}, District: ${correspondenceAddr.district}, ${correspondenceAddr.state}, ${correspondenceAddr.country} - ${correspondenceAddr.pincode}`;
  
//   // Get education table rows
//   const educationRows = education.qualifications.map(q => `
//     <tr class="border-b border-outline-variant">
//       <td class="p-3">${q.degree || q.level || '-'}</td>
//       <td class="p-3">${q.boardUniversity || '-'}</td>
//       <td class="p-3 text-center">${q.yearOfPassing || '-'}</td>
//       <td class="p-3 text-center font-bold text-primary">${q.percentage ? q.percentage + '%' : '-'}</td>
//     </tr>
//   `).join('');
  
//   // Get post preferences list
//   const postPreferencesList = postPreference.postRankings
//     .sort((a, b) => a.priority - b.priority)
//     .map(p => `<li><span class="font-bold">${p.postTitle || p.postName}</span> (Code: ${p.postCode})</li>`)
//     .join('');
  
//   // Get exam cities (mock - from original design)
//   const examCities = ['Ranchi', 'Jamshedpur', 'Dhanbad'];
  
//   const htmlContent = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
//   <title>JTGLCCE 2026 · Application Confirmation | JSSC Official</title>
//   <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
//   <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
//   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
//   <style>
//     * {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     body {
//       background-color: #f9f9fc;
//       font-family: 'Public Sans', system-ui, -apple-system, sans-serif;
//     }
//     @media print {
//       body {
//         background: white !important;
//         padding: 0 !important;
//         margin: 0 !important;
//       }
//       .no-print {
//         display: none !important;
//       }
//       .print-container {
//         max-width: 100% !important;
//         margin: 0 !important;
//         padding: 0.75in !important;
//         box-shadow: none !important;
//         border: none !important;
//       }
//       @page {
//         size: A4;
//         margin: 1.2cm;
//       }
//       header, section, footer {
//         break-inside: avoid;
//       }
//     }
//     .watermark-bg {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%) rotate(-25deg);
//       font-size: 9rem;
//       font-weight: 800;
//       color: #bfc9c4;
//       opacity: 0.12;
//       white-space: nowrap;
//       pointer-events: none;
//       font-family: 'Public Sans', monospace;
//       letter-spacing: 8px;
//       z-index: 0;
//     }
//     .responsive-table-wrapper {
//       overflow-x: auto;
//       border-radius: 0.5rem;
//     }
//     .bg-surface-container-lowest { background-color: #ffffff; }
//     .bg-surface-container-low { background-color: #f3f3f6; }
//     .text-primary { color: #003227; }
//     .border-primary { border-color: #003227; }
//     .bg-primary { background-color: #003227; }
//     .bg-primary/10 { background-color: rgba(0, 50, 39, 0.1); }
//     .bg-primary/20 { background-color: rgba(0, 50, 39, 0.2); }
//     .text-on-primary { color: #ffffff; }
//     .text-secondary { color: #48626e; }
//     .border-outline-variant { border-color: #bfc9c4; }
//     .text-on-surface-variant { color: #404945; }
//     .text-outline { color: #707975; }
//     .bg-surface-container { background-color: #eeeef0; }
//     .rounded-xl { border-radius: 0.75rem; }
//     .rounded-lg { border-radius: 0.5rem; }
//     @media (max-width: 640px) {
//       .print-container {
//         margin: 0.75rem;
//       }
//       .font-headline-md {
//         font-size: 1.35rem;
//       }
//     }
//   </style>
// </head>
// <body class="bg-surface-container-low font-body-md text-on-background antialiased">

//   <div class="no-print max-w-[880px] mx-auto px-4 pt-4 pb-2 flex justify-end">
//     <button onclick="window.print()" class="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2 rounded-full shadow-sm transition-all flex items-center gap-2">
//       <span class="material-symbols-outlined text-[20px]">print</span>
//       Download / Print PDF
//     </button>
//   </div>

//   <main class="print-container relative bg-white max-w-[880px] mx-auto my-6 shadow-xl border border-outline-variant rounded-xl overflow-hidden print:rounded-none print:shadow-none print:my-0">
    
//     <div class="watermark-bg select-none">JTGLCCE ● 2026</div>

//     <div class="relative z-10 p-6 md:p-8 lg:p-10">
//       <!-- Header -->
//       <header class="flex flex-wrap justify-between items-start border-b-2 border-primary pb-6 mb-7 gap-5">
//         <div class="flex gap-4 items-center">
//           <div class="w-20 h-20 shrink-0 bg-primary-container/10 rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
//             <span class="material-symbols-outlined text-primary text-5xl">account_balance</span>
//           </div>
//           <div>
//             <h1 class="font-headline-md text-headline-md text-primary tracking-tight">Jharkhand Staff Selection Commission</h1>
//             <p class="text-label-md text-secondary uppercase tracking-wider mt-0.5">Govt. of Jharkhand, Dhurwa, Ranchi</p>
//             <div class="mt-2 inline-flex bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
//               <span class="font-label-md text-label-md font-bold text-primary">JTGLCCE 2026 · Application Form</span>
//             </div>
//           </div>
//         </div>
//         <div class="text-right border-l border-outline-variant pl-5">
//           <p class="text-caption text-on-surface-variant uppercase tracking-wide">Application Number</p>
//           <p class="font-headline-md text-headline-md font-extrabold text-on-background tracking-tight">${data.applicationReferenceNumber || 'N/A'}</p>
//           <p class="text-caption bg-surface-container-low px-2 py-0.5 rounded-full mt-1 inline-block">Status: <span class="font-bold text-primary">Submitted & Verified</span></p>
//         </div>
//       </header>

//       <!-- Profile cluster -->
//       <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
//         <div class="md:col-span-9 space-y-5">
//           <section class="break-inside-avoid">
//             <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3 tracking-wide">1. Candidate Personal Details</h2>
//             <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
//               <div><p class="text-caption text-on-surface-variant uppercase">Full Name</p><p class="font-body-md font-bold uppercase">${fullName}</p></div>
//               <div><p class="text-caption text-on-surface-variant uppercase">Father's Name</p><p class="font-body-md font-bold uppercase">${personalInfo.fatherName || '-'}</p></div>
//               <div><p class="text-caption text-on-surface-variant uppercase">Mother's Name</p><p class="font-body-md font-bold uppercase">${personalInfo.motherName || '-'}</p></div>
//               <div><p class="text-caption text-on-surface-variant uppercase">Date of Birth</p><p class="font-body-md font-bold uppercase">${personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString('en-IN') : '-'}</p></div>
//               <div class="flex gap-4"><div><p class="text-caption uppercase">Gender</p><p class="font-bold">${personalInfo.gender === 'male' ? 'Male' : personalInfo.gender === 'female' ? 'Female' : personalInfo.gender || '-'}</p></div><div><p class="text-caption uppercase">Category</p><p class="font-bold">${reservation.mainCategoryName || '-'}</p></div></div>
//               <div class="flex gap-4"><div><p class="text-caption uppercase">Marital Status</p><p class="font-bold">${personalInfo.title === 'Mr' ? 'Unmarried' : 'Other'}</p></div><div><p class="text-caption uppercase">Local Resident</p><p class="font-bold">${reservation.isJharkhandDomicile ? 'Yes' : 'No'}</p></div></div>
//             </div>
//           </section>
//           <section>
//             <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div><p class="text-caption text-on-surface-variant uppercase">Mobile Number</p><p class="font-body-md font-bold">${personalInfo.mobileNumber || '-'}</p></div>
//               <div><p class="text-caption text-on-surface-variant uppercase">Email Address</p><p class="font-body-md font-bold">${personalInfo.emailId || '-'}</p></div>
//             </div>
//           </section>
//         </div>

//         <!-- Photo & signature column -->
//         <div class="md:col-span-3 flex flex-col gap-4">
//           <div class="border-2 border-outline-variant bg-surface-container-low rounded-lg p-1 flex flex-col items-center justify-center relative aspect-[3.5/4.5] overflow-hidden">
//             ${documents.photo ? `<img class="w-full h-full object-cover" src="${documents.photo}" alt="Candidate Photo" style="object-fit: cover;">` : '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Photo not available</div>'}
//             <span class="absolute bottom-1 left-1 bg-white/80 text-[9px] font-mono px-2 py-0.5 rounded uppercase text-primary/80">Photograph (Verified)</span>
//           </div>
//           <div class="border-2 border-outline-variant bg-surface-container-low rounded-lg h-20 flex items-center justify-center relative overflow-hidden">
//             ${documents.signature ? `<img class="w-full h-full object-contain" src="${documents.signature}" alt="Signature">` : '<div class="text-gray-400 text-sm">Signature not available</div>'}
//             <span class="absolute top-0.5 right-1 bg-white/70 text-[8px] px-1 rounded-sm uppercase">Signature</span>
//           </div>
//         </div>
//       </div>

//       <!-- Address particulars -->
//       <section class="mb-7 break-inside-avoid">
//         <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3">2. Address Particulars</h2>
//         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p class="text-caption text-on-surface-variant uppercase mb-1">Permanent Address</p>
//             <p class="font-body-md leading-relaxed">${permanentAddressStr}</p>
//           </div>
//           <div>
//             <p class="text-caption text-on-surface-variant uppercase mb-1">Correspondence Address</p>
//             <p class="font-body-md leading-relaxed ${sameAddress ? 'italic text-on-surface-variant' : ''}">${correspondenceAddressStr}</p>
//           </div>
//         </div>
//       </section>

//       <!-- Educational qualifications table -->
//       <section class="mb-8 break-inside-avoid">
//         <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3">3. Educational Qualifications</h2>
//         <div class="responsive-table-wrapper border border-outline-variant rounded-lg overflow-hidden">
//           <table class="w-full border-collapse text-left">
//             <thead class="bg-surface-container-low">
//               <tr class="border-b border-outline-variant">
//                 <th class="p-3 text-label-md font-semibold">Examination</th>
//                 <th class="p-3 text-label-md font-semibold">Board / University</th>
//                 <th class="p-3 text-label-md font-semibold text-center">Year</th>
//                 <th class="p-3 text-label-md font-semibold text-center">% / CGPA</th>
//               </tr>
//             </thead>
//             <tbody class="divide-y divide-outline-variant">
//               ${educationRows || '</tr><td colspan="4" class="p-3 text-center">No education data available</td></tr>'}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       <!-- Post & exam preferences -->
//       <section class="mb-8 break-inside-avoid">
//         <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3">4. Post &amp; Examination Preferences</h2>
//         <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
//           <div>
//             <p class="text-caption text-on-surface-variant uppercase mb-2">Selected Post Preferences</p>
//             <ol class="list-decimal list-inside space-y-1 font-body-md">
//               ${postPreferencesList || '<li>No post preferences selected</li>'}
//             </ol>
//           </div>
//           <div>
//             <p class="text-caption text-on-surface-variant uppercase mb-2">Preferred Exam Cities</p>
//             <div class="flex flex-wrap gap-2">
//               ${examCities.map((city, idx) => `<span class="border border-outline-variant bg-surface-container-low rounded-full px-3 py-1 text-label-md">${idx+1}. ${city}</span>`).join('')}
//             </div>
//             <div class="mt-4">
//               <p class="text-caption text-on-surface-variant uppercase mb-2">Language Preferences</p>
//               <div class="space-y-1 text-sm">
//                 <p><span class="font-semibold">Paper I:</span> ${language.paperOneLanguage || '-'}</p>
//                 <p><span class="font-semibold">Paper II:</span> ${language.paperTwoLanguage || '-'}</p>
//                 <p><span class="font-semibold">Paper III:</span> ${language.paperThreeLanguage || '-'}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <!-- Self Declaration -->
//       <section class="mb-9 border border-outline-variant rounded-xl p-5 bg-surface-container-lowest shadow-sm break-inside-avoid">
//         <h2 class="font-label-md text-label-md text-primary uppercase mb-2">5. Self-Declaration</h2>
//         <p class="text-caption leading-relaxed text-justify mb-4 text-on-surface-variant">
//           I hereby declare that all the information provided by me in this application form is true, complete, and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, or not satisfying the eligibility criteria according to the requirements of the relevant advertisement, my candidature/appointment is liable to be cancelled/terminated. I am aware that I have submitted only one application for this examination.
//         </p>
//         <div class="flex flex-wrap justify-between items-end gap-4 mt-3">
//           <div>
//             <p class="text-caption uppercase">Date of Submission</p>
//             <p class="font-label-md font-bold">${submissionDateFormatted}</p>
//             <p class="text-caption uppercase mt-2">Registration Number</p>
//             <p class="text-caption font-mono">${data.candidateDetails?.registrationNumber || '-'}</p>
//           </div>
//           <div class="text-right flex flex-col items-end">
//             <div class="border-b border-outline w-48 text-center py-1 mb-1 font-label-md text-secondary italic">Digitally Signed</div>
//             <p class="text-caption text-on-surface-variant">Signature of Candidate (Electronic)</p>
//           </div>
//         </div>
//       </section>

//       <!-- Footer -->
//       <footer class="mt-4 pt-5 border-t border-outline-variant flex flex-wrap justify-between items-center gap-4">
//         <div class="flex items-center gap-4">
//           <div class="w-20 h-20 bg-white border border-outline-variant rounded-md flex items-center justify-center shadow-sm overflow-hidden">
//             <svg viewBox="0 0 100 100" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect x="10" y="10" width="80" height="80" fill="#1a1c1e" />
//               <rect x="15" y="15" width="12" height="12" fill="white" />
//               <rect x="35" y="15" width="12" height="12" fill="white" />
//               <rect x="60" y="15" width="20" height="12" fill="white" />
//               <rect x="15" y="35" width="12" height="12" fill="white" />
//               <rect x="40" y="35" width="25" height="25" fill="white" />
//               <rect x="72" y="35" width="12" height="12" fill="white" />
//               <rect x="15" y="60" width="30" height="12" fill="white" />
//               <rect x="55" y="60" width="12" height="12" fill="white" />
//               <rect x="75" y="60" width="10" height="25" fill="white" />
//               <rect x="35" y="80" width="30" height="8" fill="white" />
//               <path d="M20 20 L28 20 L28 28 L20 28 Z" fill="#004b3c" />
//             </svg>
//           </div>
//           <div class="space-y-1">
//             <p class="text-caption font-bold uppercase tracking-wide">E-Verification Token</p>
//             <code class="text-[11px] bg-surface-container px-2 py-0.5 rounded border border-outline-variant font-mono">${data.applicationReferenceNumber || 'JSSC'}-SECURE-2026</code>
//             <p class="text-caption text-on-surface-variant italic">Scan QR code to verify authenticity</p>
//           </div>
//         </div>
//         <div class="text-right">
//           <p class="text-caption text-on-surface-variant">Page 01 of 01</p>
//           <p class="text-[9px] uppercase text-outline mt-1">Digitally generated document – no physical stamp required</p>
//           <p class="text-[9px] text-outline mt-0.5">© 2026 Jharkhand Staff Selection Commission (JSSC)</p>
//         </div>
//       </footer>
//     </div>
//   </main>

//   <script>
//     window.onload = () => {
//       setTimeout(() => {
//         window.print();
//       }, 500);
//     };
//   </script>
// </body>
// </html>`;

//   printWindow.document.write(htmlContent);
//   printWindow.document.close();
// };

// export default function CandidateDashboard() {
//   const navigate = useNavigate();
//   const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastLogin, setLastLogin] = useState<string>("");

//   useEffect(() => {
//     // Set last login to current date and time
//     setLastLogin(formatLastLogin());
    
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await axios.get<ApiResponse>(
//           `${API_BASE_URL}/application/steps/all`,
//           getAuthHeaders()
//         );
        
//         if (response.data.success) {
//           const data = response.data.data; 
//           console.log("candidate dashboard response ", data)
          
//           // Check if application is submitted or not
//           if (data.isSubmitted === false) {
//             // Navigate to application form if not submitted
//             navigate('/dashboard/my-applications');
//             return;
//           }
          
//           setApplicationData(data);
//         } else {
//           throw new Error('API returned unsuccessful response');
//         }
//       } catch (err: any) {
//         console.error('Error fetching data:', err);
        
//         // Handle 404 error - application not found, navigate to form
//         if (err.response?.status === 404) {
//           navigate('/dashboard/my-applications');
//           return;
//         }
        
//         if (err.response?.status === 401) {
//           setError('Authentication failed. Please login again.');
//         } else if (err.response?.status === 403) {
//           setError('You do not have permission to access this data.');
//         } else {
//           setError(err.message || 'An error occurred while fetching data');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleViewApplication = () => {
//     navigate('/dashboard/admit-card');
//   };

//   const handleEditApplication = () => {
//     alert("Application editing is currently disabled. Please contact support if you need to make changes.");
//   };

//   const handleContinueApplication = () => {
//     navigate('/dashboard/my-applications');
//   };

//   const handleDownloadForm = () => {
//     if (applicationData) {
//       openPrintWindow(applicationData);
//     } else {
//       alert('No application data available to download');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 size={40} className="animate-spin text-[#003A2B] mx-auto" />
//           <p className="mt-4 text-[#5F6368] font-medium">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200 text-center max-w-md">
//           <div className="text-red-600 text-5xl mb-4">⚠️</div>
//           <p className="text-red-600 font-medium mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-2 px-4 py-2 bg-[#003A2B] text-white rounded-lg text-sm hover:bg-[#002B20] transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // If no application data (should have been redirected already)
//   if (!applicationData) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200 text-center max-w-md">
//           <AlertCircle size={48} className="text-amber-500 mx-auto mb-4" />
//           <h3 className="text-lg font-bold text-amber-800 mb-2">No Application Found</h3>
//           <p className="text-amber-700 mb-4">You haven't started or submitted any application yet.</p>
//           <button 
//             onClick={handleContinueApplication}
//             className="px-6 py-2 bg-[#003A2B] text-white rounded-lg hover:bg-[#002B20] transition-colors"
//           >
//             Start New Application
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { steps, applicationReferenceNumber, status, submissionDate } = applicationData;
//   const fullName = `${steps.personalInfo.firstName} ${steps.personalInfo.lastName}`;

//   return (
//     <div className="min-h-screen px-4 py-2 md:px-8">
//       <div className="max-w-7xl mx-auto space-y-4">
        
//         {/* ================= TOP WELCOME HEADER ================= */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-[28px] md:text-[32px] font-bold text-[#003A2B] tracking-[-0.5px]">
//               Welcome, {fullName}
//             </h1>
//             <p className="text-[13px] text-[#5F6368] mt-1 font-medium">
//               Last Login: {lastLogin}
//             </p>
//           </div>
          
//           <div className="self-start sm:self-center">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4EA] text-[#137333] text-[13px] font-bold rounded-full border border-[#CEEAD6]">
//               <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse" />
//               {status === 'submitted' ? 'Application Submitted' : status || 'Draft'}
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
//                   REF: {applicationReferenceNumber || 'N/A'}
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
//                       <h4 className="text-[15px] font-bold text-[#111827]">
//                         Registration Complete
//                       </h4>
//                       <p className="text-[13px] text-[#5F6368] mt-0.5">
//                         Completed on {submissionDate ? formatDate(submissionDate) : 'In Progress'}
//                       </p>
//                     </div>

//                     <button
//                       onClick={handleDownloadForm}
//                       className="flex items-center gap-2 px-3 py-2 bg-[#003A2B] hover:bg-[#002B20] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
//                     >
//                       <Download size={14} />
//                       Download Form
//                     </button>
//                   </div>
//                 </div>

//                 {/* STEP 2: PAYMENT */}
//                 <div className="relative">
//                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#137333]">
//                     <CheckCircle2 size={16} className="fill-[#E6F4EA]" />
//                   </span>

//                   <div className="flex justify-between items-start gap-4">
//                     <div>
//                       <h4 className="text-[15px] font-bold text-[#111827]">
//                         Payment Confirmed
//                       </h4>
//                       <p className="text-[13px] font-mono text-[#5F6368] mt-0.5">
//                         Transaction ID: TXN882910022 - ₹100.00
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => console.log("Download Receipt")}
//                       className="flex items-center gap-2 px-3 py-2 bg-[#137333] hover:bg-[#0f5c2a] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
//                     >
//                       <Download size={14} />
//                       Download Receipt
//                     </button>
//                   </div>
//                 </div>

//                 {/* STEP 3: Edit application - Disabled Mode */}
//                 <div className="relative">
//                   <span className="absolute -left-[25px] top-0.5 bg-white rounded-full p-px text-[#9CA3AF]">
//                     <Lock size={14} />
//                   </span>
//                   <div className="flex justify-between items-start gap-4">
//                     <div>
//                       <h4 className="text-[15px] font-bold text-[#9CA3AF]">Edit Application</h4>
//                       <p className="text-[13px] text-[#9CA3AF] mt-0.5">
//                         Editing is locked after submission
//                       </p>
//                     </div>
//                     <button 
//                       onClick={handleEditApplication}
//                       disabled
//                       className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F3F4] text-[#9CA3AF] text-[13px] font-semibold rounded-lg cursor-not-allowed opacity-60"
//                     >
//                       <RefreshCw size={14} />
//                       Edit Disabled
//                     </button>
//                   </div>
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
//                 View your Application data.
//               </p>
//               <button 
//                 onClick={handleViewApplication}
//                 className="w-full h-[42px] bg-transparent border border-white hover:bg-white/10 text-white text-[14px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
//               >
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
//                     <td className="py-4 px-5 text-[#5F6368] font-medium">
//                       {notice.date}
//                     </td>
//                     <td className="py-4 px-5 font-semibold text-[#111827] max-w-md truncate">
//                       {notice.title}
//                     </td>
//                     <td className="py-4 px-5 text-center">
//                       <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[11px] font-extrabold tracking-wide ${notice.categoryBg}`}>
//                         {notice.category}
//                       </span>
//                     </td>
//                     <td className="py-4 px-5 text-center">
//                       <a 
//                         href="#download-pdf" 
//                         className="inline-flex items-center gap-1 text-[#003A2B] font-bold hover:underline text-[13px]"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           alert(`Downloading notice: ${notice.title}`);
//                         }}
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
  Loader2,
  AlertCircle
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
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  title: string;
  gender: string;
  nationality: string;
  identityType: string;
  identityNumber: string;
  alternateNumber: string;
  identificationMark1: string;
  identificationMark2: string;
  address: {
    permanent: {
      street: string;
      city: string;
      post: string;
      state: string;
      district: string;
      pincode: string;
      country: string;
    };
    correspondence: {
      street: string;
      city: string;
      post: string;
      state: string;
      district: string;
      pincode: string;
      country: string;
      sameAsPermanent: boolean;
    };
  };
}

interface ReservationCategory {
  mainCategoryName: string;
  subCategoryName: string;
  isJharkhandDomicile: boolean;
  categoryCertificateNumber: string;
  domicileCertificateNumber: string;
  isPwd: boolean;
  isExServiceman: boolean;
  isSportsQuota: boolean;
}

interface Qualification {
  level: string;
  degree: string;
  boardUniversity: string;
  yearOfPassing: number;
  percentage: number;
  totalMarks: number;
  marksObtained: number;
  rollNumber: string;
  institutionName: string;
}

interface Education {
  qualifications: Qualification[];
}

interface PostRanking {
  postCode: string;
  priority: number;
  postTitle: string;
  postName: string;
}

interface PostPreference {
  postRankings: PostRanking[];
  vacancyStream: string;
  isRegular: boolean;
  isBacklog: boolean;
}

interface LanguageSelection {
  paperOneLanguage: string;
  paperTwoLanguage: string;
  paperThreeLanguage: string;
}

interface Documents {
  photo: string;
  signature: string;
}

interface Steps {
  personalInfo: PersonalInfo;
  reservationCategory: ReservationCategory;
  education: Education;
  postPreference: PostPreference;
  languageSelection: LanguageSelection;
  documents: Documents;
}

interface ApplicationData {
  applicationReferenceNumber: string;
  status: string;
  submissionDate: string;
  isSubmitted?: boolean;
  steps: Steps;
  candidateDetails: {
    updatedAt: string;
    registrationNumber: string;
    mobileNumber: string;
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

// Function to generate HTML content for PDF
const generatePDFHtml = (data: ApplicationData): string => {
  const personalInfo = data.steps.personalInfo;
  const reservation = data.steps.reservationCategory;
  const education = data.steps.education;
  const postPreference = data.steps.postPreference;
  const language = data.steps.languageSelection;
  const documents = data.steps.documents;
  
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
  const submissionDateFormatted = formatDate(data.submissionDate);
  
  // Get address details
  const permanentAddr = personalInfo.address.permanent;
  const correspondenceAddr = personalInfo.address.correspondence;
  const sameAddress = correspondenceAddr.sameAsPermanent;
  
  const permanentAddressStr = `${permanentAddr.street}, ${permanentAddr.city}, ${permanentAddr.post}, District: ${permanentAddr.district}, ${permanentAddr.state}, ${permanentAddr.country} - ${permanentAddr.pincode}`;
  const correspondenceAddressStr = sameAddress ? "Same as permanent address" : `${correspondenceAddr.street}, ${correspondenceAddr.city}, ${correspondenceAddr.post}, District: ${correspondenceAddr.district}, ${correspondenceAddr.state}, ${correspondenceAddr.country} - ${correspondenceAddr.pincode}`;
  
  // Get education table rows
  const educationRows = education.qualifications.map(q => `
    <tr class="border-b border-outline-variant">
      <td class="p-3">${q.degree || q.level || '-'}</td>
      <td class="p-3">${q.boardUniversity || '-'}</td>
      <td class="p-3 text-center">${q.yearOfPassing || '-'}</td>
      <td class="p-3 text-center font-bold text-primary">${q.percentage ? q.percentage + '%' : '-'}</td>
    </tr>
  `).join('');
  
  // Get post preferences list
  const postPreferencesList = postPreference.postRankings
    .sort((a, b) => a.priority - b.priority)
    .map(p => `<li><span class="font-bold">${p.postTitle || p.postName}</span> (Code: ${p.postCode})</li>`)
    .join('');
  
  // Get exam cities (mock - from original design)
  const examCities = ['Ranchi', 'Jamshedpur', 'Dhanbad'];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>JTGLCCE 2026 · Application Confirmation | JSSC Official</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <style>
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      background-color: #f9f9fc;
      font-family: 'Public Sans', system-ui, -apple-system, sans-serif;
      padding: 20px;
    }
    @media print {
      body {
        background: white !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .no-print {
        display: none !important;
      }
      .print-container {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0.75in !important;
        box-shadow: none !important;
        border: none !important;
      }
      @page {
        size: A4;
        margin: 1.2cm;
      }
      header, section, footer {
        break-inside: avoid;
      }
    }
    .watermark-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-25deg);
      font-size: 9rem;
      font-weight: 800;
      color: #bfc9c4;
      opacity: 0.12;
      white-space: nowrap;
      pointer-events: none;
      font-family: 'Public Sans', monospace;
      letter-spacing: 8px;
      z-index: 0;
    }
    .responsive-table-wrapper {
      overflow-x: auto;
      border-radius: 0.5rem;
    }
    .bg-surface-container-lowest { background-color: #ffffff; }
    .bg-surface-container-low { background-color: #f3f3f6; }
    .text-primary { color: #003227; }
    .border-primary { border-color: #003227; }
    .bg-primary { background-color: #003227; }
    .bg-primary/10 { background-color: rgba(0, 50, 39, 0.1); }
    .bg-primary/20 { background-color: rgba(0, 50, 39, 0.2); }
    .text-on-primary { color: #ffffff; }
    .text-secondary { color: #48626e; }
    .border-outline-variant { border-color: #bfc9c4; }
    .text-on-surface-variant { color: #404945; }
    .text-outline { color: #707975; }
    .bg-surface-container { background-color: #eeeef0; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-lg { border-radius: 0.5rem; }
    @media (max-width: 640px) {
      .print-container {
        margin: 0.75rem;
      }
      .font-headline-md {
        font-size: 1.35rem;
      }
    }
  </style>
</head>
<body>

  <main class="print-container relative bg-white max-w-[880px] mx-auto shadow-xl border border-outline-variant rounded-xl overflow-hidden">
    
    <div class="watermark-bg select-none">JTGLCCE ● 2026</div>

    <div class="relative z-10 p-6 md:p-8 lg:p-10">
      <!-- Header -->
      <header class="flex flex-wrap justify-between items-start border-b-2 border-primary pb-6 mb-7 gap-5">
        <div class="flex gap-4 items-center">
          <div class="w-20 h-20 shrink-0 bg-primary-container/10 rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
            <span class="material-symbols-outlined text-primary text-5xl">account_balance</span>
          </div>
          <div>
            <h1 class="font-headline-md text-headline-md text-primary tracking-tight">Jharkhand Staff Selection Commission</h1>
            <p class="text-label-md text-secondary uppercase tracking-wider mt-0.5">Govt. of Jharkhand, Dhurwa, Ranchi</p>
            <div class="mt-2 inline-flex bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
              <span class="font-label-md text-label-md font-bold text-primary">JTGLCCE 2026 · Application Form</span>
            </div>
          </div>
        </div>
        <div class="text-right border-l border-outline-variant pl-5">
          <p class="text-caption text-on-surface-variant uppercase tracking-wide">Application Number</p>
          <p class="font-headline-md text-headline-md font-extrabold text-on-background tracking-tight">${data.applicationReferenceNumber || 'N/A'}</p>
          <p class="text-caption bg-surface-container-low px-2 py-0.5 rounded-full mt-1 inline-block">Status: <span class="font-bold text-primary">Submitted & Verified</span></p>
        </div>
      </header>

      <!-- Profile cluster -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div class="md:col-span-9 space-y-5">
          <section class="break-inside-avoid">
            <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3 tracking-wide">1. Candidate Personal Details</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              <div><p class="text-caption text-on-surface-variant uppercase">Full Name</p><p class="font-body-md font-bold uppercase">${fullName}</p></div>
              <div><p class="text-caption text-on-surface-variant uppercase">Father's Name</p><p class="font-body-md font-bold uppercase">${personalInfo.fatherName || '-'}</p></div>
              <div><p class="text-caption text-on-surface-variant uppercase">Mother's Name</p><p class="font-body-md font-bold uppercase">${personalInfo.motherName || '-'}</p></div>
              <div><p class="text-caption text-on-surface-variant uppercase">Date of Birth</p><p class="font-body-md font-bold uppercase">${personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString('en-IN') : '-'}</p></div>
              <div class="flex gap-4"><div><p class="text-caption uppercase">Gender</p><p class="font-bold">${personalInfo.gender === 'male' ? 'Male' : personalInfo.gender === 'female' ? 'Female' : personalInfo.gender || '-'}</p></div><div><p class="text-caption uppercase">Category</p><p class="font-bold">${reservation.mainCategoryName || '-'}</p></div></div>
              <div class="flex gap-4"><div><p class="text-caption uppercase">Marital Status</p><p class="font-bold">${personalInfo.title === 'Mr' ? 'Unmarried' : 'Other'}</p></div><div><p class="text-caption uppercase">Local Resident</p><p class="font-bold">${reservation.isJharkhandDomicile ? 'Yes' : 'No'}</p></div></div>
            </div>
          </section>
          <section>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p class="text-caption text-on-surface-variant uppercase">Mobile Number</p><p class="font-body-md font-bold">${personalInfo.mobileNumber || '-'}</p></div>
              <div><p class="text-caption text-on-surface-variant uppercase">Email Address</p><p class="font-body-md font-bold">${personalInfo.emailId || '-'}</p></div>
            </div>
          </section>
        </div>

        <!-- Photo & signature column -->
        <div class="md:col-span-3 flex flex-col gap-4">
          <div class="border-2 border-outline-variant bg-surface-container-low rounded-lg p-1 flex flex-col items-center justify-center relative aspect-[3.5/4.5] overflow-hidden">
            ${documents.photo ? `<img class="w-full h-full object-cover" src="${documents.photo}" alt="Candidate Photo" style="object-fit: cover;">` : '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Photo not available</div>'}
            <span class="absolute bottom-1 left-1 bg-white/80 text-[9px] font-mono px-2 py-0.5 rounded uppercase text-primary/80">Photograph (Verified)</span>
          </div>
          <div class="border-2 border-outline-variant bg-surface-container-low rounded-lg h-20 flex items-center justify-center relative overflow-hidden">
            ${documents.signature ? `<img class="w-full h-full object-contain" src="${documents.signature}" alt="Signature">` : '<div class="text-gray-400 text-sm">Signature not available</div>'}
            <span class="absolute top-0.5 right-1 bg-white/70 text-[8px] px-1 rounded-sm uppercase">Signature</span>
          </div>
        </div>
      </div>

      <!-- Address particulars -->
      <section class="mb-7 break-inside-avoid">
        <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3">2. Address Particulars</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-caption text-on-surface-variant uppercase mb-1">Permanent Address</p>
            <p class="font-body-md leading-relaxed">${permanentAddressStr}</p>
          </div>
          <div>
            <p class="text-caption text-on-surface-variant uppercase mb-1">Correspondence Address</p>
            <p class="font-body-md leading-relaxed ${sameAddress ? 'italic text-on-surface-variant' : ''}">${correspondenceAddressStr}</p>
          </div>
        </div>
      </section>

      <!-- Educational qualifications table -->
      <section class="mb-8 break-inside-avoid">
        <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3">3. Educational Qualifications</h2>
        <div class="responsive-table-wrapper border border-outline-variant rounded-lg overflow-hidden">
          <table class="w-full border-collapse text-left">
            <thead class="bg-surface-container-low">
              <tr class="border-b border-outline-variant">
                <th class="p-3 text-label-md font-semibold">Examination</th>
                <th class="p-3 text-label-md font-semibold">Board / University</th>
                <th class="p-3 text-label-md font-semibold text-center">Year</th>
                <th class="p-3 text-label-md font-semibold text-center">% / CGPA</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant">
              ${educationRows || '<tr><td colspan="4" class="p-3 text-center">No education data available</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Post & exam preferences -->
      <section class="mb-8 break-inside-avoid">
        <h2 class="font-label-md text-label-md border-b border-outline-variant text-primary uppercase pb-1 mb-3">4. Post &amp; Examination Preferences</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <p class="text-caption text-on-surface-variant uppercase mb-2">Preferred Exam Cities</p>
            <div class="flex flex-wrap gap-2">
              ${examCities.map((city, idx) => `<span class="border border-outline-variant bg-surface-container-low rounded-full px-3 py-1 text-label-md">${idx+1}. ${city}</span>`).join('')}
            </div>
            <div class="mt-4">
              <p class="text-caption text-on-surface-variant uppercase mb-2">Language Preferences</p>
              <div class="space-y-1 text-sm">
                <p><span class="font-semibold">Paper I:</span> ${language.paperOneLanguage || '-'}</p>
                <p><span class="font-semibold">Paper II:</span> ${language.paperTwoLanguage || '-'}</p>
                <p><span class="font-semibold">Paper III:</span> ${language.paperThreeLanguage || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Self Declaration -->
      <section class="mb-9 border border-outline-variant rounded-xl p-5 bg-surface-container-lowest shadow-sm break-inside-avoid">
        <h2 class="font-label-md text-label-md text-primary uppercase mb-2">5. Self-Declaration</h2>
        <p class="text-caption leading-relaxed text-justify mb-4 text-on-surface-variant">
          I hereby declare that all the information provided by me in this application form is true, complete, and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, or not satisfying the eligibility criteria according to the requirements of the relevant advertisement, my candidature/appointment is liable to be cancelled/terminated. I am aware that I have submitted only one application for this examination.
        </p>
        <div class="flex flex-wrap justify-between items-end gap-4 mt-3">
          <div>
            <p class="text-caption uppercase">Date of Submission</p>
            <p class="font-label-md font-bold">${submissionDateFormatted}</p>
            <p class="text-caption uppercase mt-2">Registration Number</p>
            <p class="text-caption font-mono">${data.candidateDetails?.registrationNumber || '-'}</p>
          </div>
          <div class="text-right flex flex-col items-end">
            <div class="border-b border-outline w-48 text-center py-1 mb-1 font-label-md text-secondary italic">Digitally Signed</div>
            <p class="text-caption text-on-surface-variant">Signature of Candidate (Electronic)</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-4 pt-5 border-t border-outline-variant flex flex-wrap justify-between items-center gap-4">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 bg-white border border-outline-variant rounded-md flex items-center justify-center shadow-sm overflow-hidden">
            <svg viewBox="0 0 100 100" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="80" height="80" fill="#1a1c1e" />
              <rect x="15" y="15" width="12" height="12" fill="white" />
              <rect x="35" y="15" width="12" height="12" fill="white" />
              <rect x="60" y="15" width="20" height="12" fill="white" />
              <rect x="15" y="35" width="12" height="12" fill="white" />
              <rect x="40" y="35" width="25" height="25" fill="white" />
              <rect x="72" y="35" width="12" height="12" fill="white" />
              <rect x="15" y="60" width="30" height="12" fill="white" />
              <rect x="55" y="60" width="12" height="12" fill="white" />
              <rect x="75" y="60" width="10" height="25" fill="white" />
              <rect x="35" y="80" width="30" height="8" fill="white" />
              <path d="M20 20 L28 20 L28 28 L20 28 Z" fill="#004b3c" />
            </svg>
          </div>
          <div class="space-y-1">
            <p class="text-caption font-bold uppercase tracking-wide">E-Verification Token</p>
            <code class="text-[11px] bg-surface-container px-2 py-0.5 rounded border border-outline-variant font-mono">${data.applicationReferenceNumber || 'JSSC'}-SECURE-2026</code>
            <p class="text-caption text-on-surface-variant italic">Scan QR code to verify authenticity</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-caption text-on-surface-variant">Page 01 of 01</p>
          <p class="text-[9px] uppercase text-outline mt-1">Digitally generated document – no physical stamp required</p>
          <p class="text-[9px] text-outline mt-0.5">© 2026 Jharkhand Staff Selection Commission (JSSC)</p>
        </div>
      </footer>
    </div>
  </main>
</body>
</html>`;
};

// Function to download PDF using html2pdf
const downloadPDF = async (data: ApplicationData) => {
  try {
    // Show loading indicator (optional)
    const loadingToast = document.createElement('div');
    loadingToast.className = 'fixed bottom-4 right-4 bg-[#003A2B] text-white px-4 py-2 rounded-lg shadow-lg z-50';
    loadingToast.innerHTML = 'Generating PDF...';
    document.body.appendChild(loadingToast);
    
    const htmlContent = generatePDFHtml(data);
    
    // Create a temporary iframe or div to render the HTML
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);
    
    // Dynamically load html2pdf library
    if (!(window as any).html2pdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    
    const element = tempDiv.querySelector('.print-container') || tempDiv;
    
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `JTGLCCE_Application_${data.applicationReferenceNumber || 'Form'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    await (window as any).html2pdf().set(opt).from(element).save();
    
    // Clean up
    document.body.removeChild(tempDiv);
    document.body.removeChild(loadingToast);
    
    // Success message
    const successToast = document.createElement('div');
    successToast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successToast.innerHTML = 'PDF downloaded successfully!';
    document.body.appendChild(successToast);
    setTimeout(() => successToast.remove(), 3000);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('Failed to generate PDF. Please try again or use the print option.');
  }
};

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<string>("");
  const [downloading, setDownloading] = useState(false);

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
          const data = response.data.data; 
          console.log("candidate dashboard response ", data)
          
          // Check if application is submitted or not
          if (data.isSubmitted === false) {
            // Navigate to application form if not submitted
            navigate('/dashboard/my-applications');
            return;
          }
          
          setApplicationData(data);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        
        // Handle 404 error - application not found, navigate to form
        if (err.response?.status === 404) {
          navigate('/dashboard/my-applications');
          return;
        }
        
        if (err.response?.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (err.response?.status === 403) {
          setError('You do not have permission to access this data.');
        } else {
          setError(err.message || 'An error occurred while fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleViewApplication = () => {
    navigate('/dashboard/admit-card');
  };

  const handleEditApplication = () => {
    alert("Application editing is currently disabled. Please contact support if you need to make changes.");
  };

  const handleContinueApplication = () => {
    navigate('/dashboard/my-applications');
  };

  const handleDownloadForm = async () => {
    if (applicationData) {
      setDownloading(true);
      await downloadPDF(applicationData);
      setDownloading(false);
    } else {
      alert('No application data available to download');
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200 text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-4">{error}</p>
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

  // If no application data (should have been redirected already)
  if (!applicationData) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-2 md:px-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200 text-center max-w-md">
          <AlertCircle size={48} className="text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-amber-800 mb-2">No Application Found</h3>
          <p className="text-amber-700 mb-4">You haven't started or submitted any application yet.</p>
          <button 
            onClick={handleContinueApplication}
            className="px-6 py-2 bg-[#003A2B] text-white rounded-lg hover:bg-[#002B20] transition-colors"
          >
            Start New Application
          </button>
        </div>
      </div>
    );
  }

  const { steps, applicationReferenceNumber, status, submissionDate } = applicationData;
  const fullName = `${steps.personalInfo.firstName} ${steps.personalInfo.lastName}`;

  return (
    <div className="min-h-screen px-4 py-2 md:px-8">
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
              {status === 'submitted' ? 'Application Submitted' : status || 'Draft'}
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
                  REF: {applicationReferenceNumber || 'N/A'}
                </span>
              </div>

              {/* TIMELINE TRACK */}
              <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E1E5E3]">
                
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
                        Completed on {submissionDate ? formatDate(submissionDate) : 'In Progress'}
                      </p>
                    </div>

                    <button
                      onClick={handleDownloadForm}
                      disabled={downloading}
                      className="flex items-center gap-2 px-3 py-2 bg-[#003A2B] hover:bg-[#002B20] text-white text-[13px] font-medium rounded-lg transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      {downloading ? 'Generating PDF...' : 'Download Form'}
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
                    <td className="py-4 px-5 text-[#5F6368] font-medium">
                      {notice.date}
                    </td>
                    <td className="py-4 px-5 font-semibold text-[#111827] max-w-md truncate">
                      {notice.title}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[11px] font-extrabold tracking-wide ${notice.categoryBg}`}>
                        {notice.category}
                      </span>
                    </td>
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