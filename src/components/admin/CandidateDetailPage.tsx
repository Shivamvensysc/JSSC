import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Briefcase,
  BookOpen,
  User,
  Globe,
  AlertCircle,
  ArrowLeft,
  Eye,
  Download,
  X
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interfaces
interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

interface Step1Data {
  gender?: string;
  fatherName?: string;
  nationality?: string;
  address?: {
    permanent: Address;
  };
}

interface StepData {
  "1"?: Step1Data;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Application {
  status: string;
  isSubmitted?: boolean;
  submissionDate?: string;
  currentStep?: number;
  applicationReferenceNumber?: string;
}

interface Document {
  id: string;
  documentType: string;
  fileName: string;
  signedUrl?: string;
  fileUrl?: string;
  mimeType?: string;
}

interface Qualification {
  level?: string;
  degree?: string;
  boardUniversity?: string;
  percentage?: number;
  yearOfPassing?: string;
}

interface Experience {
  designation: string;
  organization: string;
  dateOfJoining: string;
  relievingDate?: string;
  durationYears: number;
  durationMonths: number;
}

interface PostPreference {
  postName: string;
  postCode: string;
  isRegular: boolean;
  priority: number;
}

interface Languages {
  paperOneLanguage: string;
  paperTwoLanguage: string;
  paperThreeLanguage: string;
}

interface Payment {
  amount: string | number;
  status: string;
  bankName?: string;
  transactionId: string;
  paymentMode: string;
  createdAt: string;
}

interface Candidate {
  id: string;
  registrationNumber: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  mobileNumber: string;
  alternateNumber?: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  stepData?: StepData;
  application?: Application;
  user?: User;
  documents?: Document[];
  qualifications?: Qualification[];
  experiences?: Experience[];
  postPreferences?: PostPreference[];
  languages?: Languages;
  payments?: Payment[];
}

interface ApiResponse {
  success: boolean;
  data: Candidate;
  message?: string;
}

interface StatusConfig {
  label: string;
  color: string;
}

interface AuditLog {
  title: string;
  subtitle: string;
  time: string;
  icon: React.ComponentType<any>;
}

interface PresignedUrlResponse {
  success: boolean;
  url: string;
  message?: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminAccessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export default function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string>("");
  // Fixed: Removed unused setLoadingDocument
  const [, /* loadingDocument */ setLoadingDocument] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
  const [loadingProfilePhoto, setLoadingProfilePhoto] = useState(false);

  useEffect(() => {
    fetchCandidateDetails();
    const token = localStorage.getItem("adminAccessToken");
    if (!token) {
      toast.error("Please login to access dashboard");
      navigate("/admin/login");
    }
  }, [id, navigate]);

  const fetchCandidateDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/admin/candidates/${id}`,
        getAuthHeaders()
      );

      if (response.data.success) {
        setCandidate(response.data.data);
        // Fetch profile photo after candidate data is loaded
        fetchProfilePhoto(response.data.data.documents);
      } else {
        toast.error(response.data.message || "Failed to fetch candidate details");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      console.error("Error fetching candidate details:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("adminAccessToken");
        navigate("/admin/login");
      } else if (error.response?.status === 404) {
        toast.error("Candidate not found");
        navigate("/admin/dashboard");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch candidate details");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilePhoto = async (documents?: Document[]) => {
    if (!documents || documents.length === 0) return;
    
    // Find the photo document
    const photoDoc = documents.find(doc => doc.documentType === "photo");
    if (!photoDoc) return;

    try {
      setLoadingProfilePhoto(true);
      // If the document already has a signedUrl, use it directly
      if (photoDoc.signedUrl) {
        setProfilePhotoUrl(photoDoc.signedUrl);
      } 
      // Otherwise fetch presigned URL for the photo
      else if (photoDoc.id) {
        const url = await fetchPresignedUrl(photoDoc.id);
        if (url) {
          setProfilePhotoUrl(url);
        }
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    } finally {
      setLoadingProfilePhoto(false);
    }
  };

  const fetchPresignedUrl = async (documentId: string): Promise<string | null> => {
    try {
      const url = `${API_BASE_URL}/api/v1/documents/${documentId}/presigned-url`;
      console.log("Fetching presigned URL from:", url);
      
      const response = await axios.get<PresignedUrlResponse>(
        url,
        getAuthHeaders()
      );

      if (response.data.success && response.data.url) {
        return response.data.url;
      } else {
        console.error("Failed to get document URL:", response.data.message);
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching presigned URL:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("adminAccessToken");
        navigate("/admin/login");
      } else if (error.response?.status === 404) {
        toast.error("Document not found");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to access this document");
      }
      return null;
    }
  };

  const handleViewDocument = async (document: Document) => {
    console.log("View document clicked:", document);
    setViewingDocument(document);
    setLoadingDocument(true);
    
    // Use existing signedUrl or fetch new one
    let url: string | null = document.signedUrl || null;
    if (!url && document.id) {
      url = await fetchPresignedUrl(document.id);
    }
    
    setLoadingDocument(false);
    
    if (url) {
      setDocumentUrl(url);
    } else {
      setViewingDocument(null);
      setDocumentUrl("");
      toast.error("Unable to load document. Please try again later.");
    }
  };

  const handleDownloadDocument = async (document: Document) => {
    try {
      toast.info("Preparing document for download...");
      let url: string | null = document.signedUrl || null;
      if (!url && document.id) {
        url = await fetchPresignedUrl(document.id);
      }
      
      if (url) {
        // Fixed: Use window.document instead of just document
        const link = window.document.createElement('a');
        link.href = url;
        link.download = document.fileName || `${document.documentType}_${document.id}.pdf`;
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        toast.success("Document download started");
      } else {
        toast.error("Unable to download document");
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
    }
  };

  const closeDocumentModal = () => {
    setViewingDocument(null);
    setDocumentUrl("");
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock audit logs based on candidate data
  const getAuditLogs = (): AuditLog[] => {
    const logs: AuditLog[] = [];
    
    if (candidate?.createdAt) {
      logs.push({
        title: "Registration Created",
        subtitle: "Candidate registered successfully",
        time: formatDateTime(candidate.createdAt),
        icon: User
      });
    }
    
   
    
    
    if (candidate?.payments && candidate.payments.length > 0 && candidate.payments[0].status === "completed") {
      logs.push({
        title: "Payment Verified",
        subtitle: `Payment of ₹${candidate.payments[0].amount} verified`,
        time: formatDateTime(candidate.payments[0].createdAt),
        icon: CreditCard
      });
    }
    
    if (candidate?.mobileVerified || candidate?.emailVerified) {
      logs.push({
        title: "Payment Done",
        subtitle: "Payment Verified",
        time: formatDateTime(candidate.updatedAt),
        icon: CheckCircle2
      });
    }

     if (candidate?.application?.isSubmitted) {
      logs.push({
        title: "Application Submitted",
        subtitle: "Application submitted by candidate",
        time: formatDateTime(candidate.application.submissionDate),
        icon: FileText
      });
    }
    
    return logs;
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-[#F4F5F7] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#136a4b] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#5d6c67]">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen font-sans bg-[#F4F5F7] flex justify-center items-center p-4">
        <div className="text-center bg-white rounded border border-[#d6dcdc] p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-[#1f2d29] mb-2">Candidate Not Found</h2>
          <p className="text-[#5d6c67] mb-6">The candidate you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/admin")}
            className="px-5 py-2 bg-[#136a4b] text-white rounded font-medium hover:bg-[#0e5239] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const stepData: StepData = candidate.stepData || {};
  const application = candidate.application;
  const user = candidate.user;
  const documents = candidate.documents || [];
  const qualifications = candidate.qualifications || [];
  const experiences = candidate.experiences || [];
  const postPreferences = candidate.postPreferences || [];
  const languages = candidate.languages;
  const payments = candidate.payments || [];
  const auditLogs = getAuditLogs();

  const getStatusConfig = (status?: string): StatusConfig => {
    const configs: Record<string, StatusConfig> = {
      submitted: { label: "Submitted", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      draft: { label: "Draft", color: "bg-amber-50 text-amber-700 border-amber-200" },
      completed: { label: "Completed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      pending: { label: "Pending", color: "bg-rose-50 text-rose-700 border-rose-200" },
    };
    return configs[status || ""] || { label: status || "N/A", color: "bg-gray-50 text-gray-600 border-gray-200" };
  };

  const statusConfig = getStatusConfig(application?.status);
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Unknown";

  return (
    <div className="min-h-screen font-sans bg-[#F4F5F7] px-4 py-4">
      <div className="mx-auto flex max-w-7xl gap-4">
        <div className="flex-1 rounded border border-[#b8c2bd] bg-[#f6f7f6] shadow-sm">
          {/* Top Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#d1d7d4] bg-[#eef1ef] px-5 py-4">
            <div>
              <h1 className="mt-1 text-[32px] font-bold tracking-tight text-[#1f2d29]">
                Candidate Application Form Data
              </h1>
            </div>

            <div className="flex items-center gap-3 mt-3 sm:mt-0">
              <button 
                onClick={() => navigate("/admin")}
                className="flex h-[38px] items-center gap-2 rounded border border-[#bfc9c5] bg-white px-4 text-[13px] font-semibold text-[#33413d] shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            </div>
          </div>

          {/* Main Profile Card Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 p-4">
            {/* LEFT CONTENT COLUMN */}
            <div className="space-y-4">
              
              {/* Profile details container card */}
              <div className="rounded border border-[#d6dcdc] bg-white p-4">
                <div className="flex flex-col md:flex-row gap-5">
                  {/* Avatar Frame Box with Profile Photo */}
                  <div className="h-[140px] w-[110px] overflow-hidden rounded border border-[#d6dcdc] bg-[#eef2ef] shrink-0 mx-auto md:mx-0">
                    {loadingProfilePhoto ? (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#136a4b] border-t-transparent"></div>
                      </div>
                    ) : profilePhotoUrl ? (
                      <img 
                        src={profilePhotoUrl} 
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#136a4b] to-[#0e5239] flex items-center justify-center">
                        <User size={48} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Details Data Fields Grid */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Full Name
                        </p>
                        <p className="mt-1 text-[18px] font-semibold text-[#20302c]">
                          {fullName}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Registration ID
                        </p>
                        <p className="mt-1 text-[18px] font-semibold text-[#20302c] font-mono">
                          {candidate.registrationNumber || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#f1f5f4]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Date of Birth
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#2c3a36]">
                          {formatDate(candidate.dateOfBirth)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Gender
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#2c3a36]">
                          {stepData["1"]?.gender || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Father's Name
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#2c3a36]">
                          {stepData["1"]?.fatherName || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Nationality
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#2c3a36]">
                          {stepData["1"]?.nationality || "Indian"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="rounded border border-[#d6dcdc] bg-white">
                <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                  <Phone size={16} className="text-[#355b4f]" />
                  <h2 className="text-[15px] font-semibold text-[#23312d]">
                    Contact Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-[#7d8782] mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#7d8782]">Email Address</p>
                      <p className="text-[14px] text-[#20302c]">{user?.email || "N/A"}</p>
                      {candidate.emailVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 mt-1">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-[#7d8782] mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#7d8782]">Mobile Number</p>
                      <p className="text-[14px] text-[#20302c]">{candidate.mobileNumber || "N/A"}</p>
                      {candidate.mobileVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 mt-1">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  {candidate.alternateNumber && (
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="text-[#7d8782] mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#7d8782]">Alternate Number</p>
                        <p className="text-[14px] text-[#20302c]">{candidate.alternateNumber}</p>
                      </div>
                    </div>
                  )}
                  {stepData["1"]?.address?.permanent && (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-[#7d8782] mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#7d8782]">Address</p>
                        <p className="text-[14px] text-[#20302c]">
                          {stepData["1"].address.permanent.line1}<br />
                          {stepData["1"].address.permanent.city}, {stepData["1"].address.permanent.state}<br />
                          {stepData["1"].address.permanent.pincode}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Educational Qualifications Card */}
              {qualifications.length > 0 && (
                <div className="rounded border border-[#d6dcdc] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                    <GraduationCap size={16} className="text-[#355b4f]" />
                    <h2 className="text-[15px] font-semibold text-[#23312d]">
                      Educational Qualifications
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {qualifications.map((qual, idx) => (
                      <div key={idx} className="border-b md:border-b-0 md:border-r border-[#e3e7e5] last:border-0 pr-4">
                        <p className="text-[12px] font-semibold text-[#61716c]">
                          {qual.level || "Qualification"}
                        </p>
                        <h3 className="mt-2 text-[16px] font-bold text-[#20302c]">
                          {qual.degree || "N/A"}
                        </h3>
                        <p className="mt-1 text-[12px] text-[#5d6c67]">
                          {qual.boardUniversity}
                        </p>
                        <p className="text-[13px] text-[#5d6c67]">
                          {qual.percentage}% | {qual.yearOfPassing}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience Card */}
              {experiences.length > 0 && (
                <div className="rounded border border-[#d6dcdc] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                    <Briefcase size={16} className="text-[#355b4f]" />
                    <h2 className="text-[15px] font-semibold text-[#23312d]">
                      Work Experience
                    </h2>
                  </div>
                  <div className="space-y-4 p-4">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="border-b border-[#e3e7e5] last:border-0 pb-4 last:pb-0">
                        <h3 className="text-[15px] font-bold text-[#20302c]">{exp.designation}</h3>
                        <p className="text-[13px] text-[#5d6c67]">{exp.organization}</p>
                        <p className="text-[12px] text-[#7d8782] mt-1">
                          {formatDate(exp.dateOfJoining)} - {exp.relievingDate ? formatDate(exp.relievingDate) : "Present"}
                        </p>
                        <p className="text-[12px] text-[#7d8782]">
                          Duration: {exp.durationYears}y {exp.durationMonths}m
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Preferences Card */}
              {postPreferences.length > 0 && (
                <div className="rounded border border-[#d6dcdc] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                    <BookOpen size={16} className="text-[#355b4f]" />
                    <h2 className="text-[15px] font-semibold text-[#23312d]">
                      Post Preferences
                    </h2>
                  </div>
                  <div className="space-y-3 p-4">
                    {postPreferences.map((post, idx) => (
                      <div key={idx} className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#f8f9f8] rounded">
                        <div>
                          <p className="text-[14px] font-semibold text-[#20302c]">{post.postName}</p>
                          <p className="text-[11px] text-[#7d8782]">Post Code: {post.postCode}</p>
                        </div>
                        <div className="flex gap-2">
                          {post.isRegular && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded">Regular</span>
                          )}
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                            Priority {post.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Language Preferences Card */}
              {languages && (
                <div className="rounded border border-[#d6dcdc] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                    <Globe size={16} className="text-[#355b4f]" />
                    <h2 className="text-[15px] font-semibold text-[#23312d]">
                      Language Preferences
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase text-[#7d8782]">Paper I</p>
                      <p className="text-[14px] text-[#20302c] mt-1">{languages.paperOneLanguage}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase text-[#7d8782]">Paper II</p>
                      <p className="text-[14px] text-[#20302c] mt-1">{languages.paperTwoLanguage}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase text-[#7d8782]">Paper III</p>
                      <p className="text-[14px] text-[#20302c] mt-1">{languages.paperThreeLanguage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Uploaded Documents Card */}
              {documents.length > 0 && (
                <div className="rounded border border-[#d6dcdc] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                    <FileText size={16} className="text-[#355b4f]" />
                    <h2 className="text-[15px] font-semibold text-[#23312d]">
                      Uploaded Documents
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    {documents.filter(doc => doc.documentType !== "photo").map((doc) => (
                      <div key={doc.id} className="rounded border border-[#d5dcdc] bg-[#f8f9f8] p-3">
                        <div className="h-[100px] bg-gray-100 rounded flex items-center justify-center mb-2">
                          <FileText size={32} className="text-[#7d8782]" />
                        </div>
                        <p className="text-center text-[12px] font-medium text-[#2d3d38]">
                          {doc.documentType?.replace(/_/g, ' ').toUpperCase()}
                        </p>
                        <p className="text-center items-center text-[10px] text-[#7d8782] mt-1">{doc.fileName}</p>
                        <div className="mt-2 flex items-center text-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDocument(doc)}
                            className="flex w-full items-center justify-center gap-1 py-1.5 bg-[#136a4b] text-white rounded text-[11px] font-medium hover:bg-[#0e5239] transition-colors"
                          >
                            <Eye size={12} />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR PANEL */}
            <div className="space-y-4">
              
              {/* Payment Status Metric Box */}
              {payments.length > 0 && (
                <div className="rounded border border-[#0f6a4c] bg-[#0d6c4b] p-5 text-white shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#cfe8de]">
                    Payment Status
                  </p>
                  <h2 className="mt-3 text-[36px] font-bold font-mono">
                    ₹{typeof payments[0].amount === 'string' ? parseFloat(payments[0].amount).toLocaleString('en-IN') : payments[0].amount.toLocaleString('en-IN')}
                  </h2>
                  <p className="mt-1 text-[12px] text-[#d8eee6]">
                    {payments[0].bankName || "Bank Transaction"}
                  </p>
                  <div className="mt-5 flex items-center gap-2 rounded bg-[#0a5b3f] px-3 py-2">
                    <CheckCircle2 size={16} />
                    <span className="text-[13px] font-semibold">
                      {payments[0].status === "completed" ? "Verified & Settled" : "Pending Verification"}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] text-[#cfe8de]">
                    Transaction ID: {payments[0].transactionId}
                  </p>
                  <p className="text-[11px] text-[#cfe8de]">
                    Mode: {payments[0].paymentMode}
                  </p>
                </div>
              )}

              {/* Application Status Box */}
              <div className="rounded border border-[#d6dcdc] bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7d8782]">
                  Application Status
                </p>
                <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-semibold ${statusConfig.color}`}>
                  <CheckCircle2 size={14} />
                  {statusConfig.label}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#7d8782]">Current Step</span>
                    <span className="font-semibold text-[#20302c]">{application?.currentStep || 0}/7</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#7d8782]">Reference Number</span>
                    <span className="font-mono text-[11px] text-[#20302c]">{application?.applicationReferenceNumber || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#7d8782]">Registration Date</span>
                    <span className="text-[#20302c]">{formatDate(candidate.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Audit Trail Milestone Component */}
              {auditLogs.length > 0 && (
                <div className="rounded border border-[#d6dcdc] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                    <Clock3 size={16} className="text-[#355b4f]" />
                    <h2 className="text-[15px] font-semibold text-[#23312d]">
                      Application Audit Trail
                    </h2>
                  </div>
                  <div className="space-y-6 p-5">
                    {auditLogs.map((log, index) => (
                      <div key={index} className="relative pl-6">
                        {index !== auditLogs.length - 1 && (
                          <div className="absolute left-[7px] top-5 h-[58px] w-[2px] bg-[#d7ddda]" />
                        )}
                        <div className="absolute left-0 top-1 h-[14px] w-[14px] rounded-full border-[3px] border-[#0f6a4c] bg-white" />
                        <p className="text-[10px] text-[#7b8783]">
                          {log.time}
                        </p>
                        <h3 className="mt-1 text-[14px] font-semibold text-[#24322e]">
                          {log.title}
                        </h3>
                        <p className="text-[12px] text-[#64736e]">
                          {log.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e3e7e5] px-6 py-4">
              <div>
                <h3 className="text-[18px] font-semibold text-[#1f2d29]">
                  {viewingDocument.documentType?.replace(/_/g, ' ').toUpperCase()}
                </h3>
                <p className="text-[12px] text-[#7d8782] mt-1">{viewingDocument.fileName}</p>
              </div>
              <button
                onClick={closeDocumentModal}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={24} className="text-[#5d6c67]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              {documentUrl ? (
                viewingDocument.mimeType?.startsWith('image/') ? (
                  <img 
                    src={documentUrl} 
                    alt={viewingDocument.documentType}
                    className="max-w-full h-auto mx-auto rounded border border-[#d6dcdc]"
                  />
                ) : (
                  <iframe
                    src={documentUrl}
                    title="Document Viewer"
                    className="w-full h-[70vh] rounded border border-[#d6dcdc]"
                    frameBorder="0"
                  />
                )
              ) : (
                <div className="flex justify-center items-center h-96">
                  <div className="text-center">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <p className="text-[#5d6c67]">Failed to load document</p>
                    <button
                      onClick={() => handleViewDocument(viewingDocument)}
                      className="mt-4 px-4 py-2 bg-[#136a4b] text-white rounded text-[13px] font-medium hover:bg-[#0e5239] transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-[#e3e7e5] px-6 py-4">
              <button
                onClick={closeDocumentModal}
                className="px-4 py-2 border border-[#bfc9c5] rounded text-[13px] font-semibold text-[#33413d] hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {documentUrl && (
                <button
                  onClick={() => handleDownloadDocument(viewingDocument)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#136a4b] text-white rounded text-[13px] font-semibold hover:bg-[#0e5239] transition-colors"
                >
                  <Download size={16} /> Download
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}