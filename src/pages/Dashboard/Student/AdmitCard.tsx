import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FileCheck,
  Download,
  CheckCircle,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Eye,
  ShieldCheck,
  Loader2,
} from "lucide-react";

// API Configuration
const API_BASE_URL = "https://7q7gdq1rke.execute-api.ap-south-1.amazonaws.com/api/v1";

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
interface Address {
  city: string;
  line1: string;
  state: string;
  country: string;
  pincode: string;
  sameAsPermanent?: boolean;
}

interface PersonalInfo {
  age: number;
  title: string;
  gender: string;
  address: {
    permanent: Address;
    correspondence: Address;
  };
  emailId: string;
  lastName: string;
  firstName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  nationality: string;
  identityType: string;
  mobileNumber: string;
  identityNumber: string;
  alternateNumber: string;
  identificationMark1: string;
  identificationMark2: string;
}

interface ReservationCategory {
  isPwd: boolean;
  pwdType: string | null;
  declaration: boolean;
  sportsLevel: string | null;
  subCategory: number;
  mainCategory: number;
  isSportsQuota: boolean;
  pwdPercentage: number | null;
  isExServiceman: boolean;
  exServicemanYears: number | null;
  sportsAchievement: string | null;
  isJharkhandDomicile: boolean;
}

interface Qualification {
  grade: string;
  level: string;
  degree: string;
  percentage: number;
  rollNumber: string;
  totalMarks: number;
  marksObtained: number;
  yearOfPassing: number;
  boardUniversity: string;
  institutionName: string;
  specialization?: string;
}

interface Education {
  experience: any;
  qualifications: Qualification[];
  contractualService: any;
  highestQualification: string;
}

interface PostRanking {
  postId: number;
  priority: number;
}

interface PostPreference {
  isBacklog: boolean;
  isRegular: boolean;
  postRankings: PostRanking[];
  vacancyStream: string;
}

interface LanguageSelection {
  paperOneLanguage: string;
  paperTwoLanguage: string;
  paperThreeLanguage: string;
}

interface Documents {
  photo: string | null;
  signature: string | null;
  aadharCard: string | null;
  ewsCertificate: string | null;
  pwdCertificate: string | null;
  tenthMarksheet: string | null;
  castCertificate: string | null;
  twelfthMarksheet: string | null;
  sportsCertificate: string | null;
  diplomaCertificate: string | null;
  declarationAccepted: boolean;
  domicileCertificate: string | null;
  graduationMarksheet: string | null;
  experienceCertificate: string | null;
  postGraduationCertificate: string | null;
  contractualServiceCertificate: string | null;
}

interface Steps {
  personalInfo: PersonalInfo;
  reservationCategory: ReservationCategory;
  education: Education;
  postPreference: PostPreference;
  languageSelection: LanguageSelection;
  centerSelection: any;
  documents: Documents;
}

interface CandidateDetails {
  id: string;
  userId: string;
  registrationNumber: string;
  dateOfBirth: string;
  mobileNumber: string;
  alternateNumber: string | null;
  mobileVerified: boolean;
  emailVerified: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  version: number;
}

interface ApplicationData {
  applicationId: string;
  candidateId: string;
  status: string;
  currentStep: number;
  completedSteps: number[];
  isSubmitted: boolean;
  applicationReferenceNumber: string;
  submissionDate: string;
  candidateDetails: CandidateDetails;
  steps: Steps;
}

interface ApiResponse {
  success: boolean;
  data: ApplicationData;
}

// Helper functions
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

const formatReadableDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getCategoryName = (mainCategory: number) => {
  const categories: Record<number, string> = {
    65: 'General (UR)',
    66: 'OBC',
    67: 'SC',
    68: 'ST',
    69: 'EWS',
  };
  return categories[mainCategory] || 'General (UR)';
};

const getPostName = (postId: number) => {
  const posts: Record<number, string> = {
    44: 'Block Development Officer',
    45: 'Supply Inspector',
    46: 'Junior Secretariat Assistant',
  };
  return posts[postId] || `Post ID ${postId}`;
};

const numberToWords = (num: number): string => {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  const convertToWords = (n: number): string => {
    if (n === 0) return "Zero";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convertToWords(n % 100) : "");
    if (n < 100000) return convertToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convertToWords(n % 1000) : "");
    if (n < 10000000) return convertToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convertToWords(n % 100000) : "");
    return convertToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convertToWords(n % 10000000) : "");
  };

  return convertToWords(Math.floor(num)) + " Rupees Only";
};

// PDF Generation Function
const generateApplicationPDF = async (data: ApplicationData) => {
  const { steps, applicationReferenceNumber, submissionDate, status } = data;
  const { personalInfo, education, postPreference, reservationCategory, languageSelection } = steps;
  
  const sortedPosts = [...postPreference.postRankings].sort((a, b) => a.priority - b.priority);
  const qualifications = education.qualifications.filter(q => q && q.level);
  
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const applicationHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Application Summary - ${applicationReferenceNumber}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: white;
          padding: 40px;
          line-height: 1.5;
        }
        
        .application {
          max-width: 1100px;
          margin: 0 auto;
          background: white;
        }
        
        /* Header Section */
        .header {
          padding: 30px 40px 20px;
          background: linear-gradient(135deg, #0E5A44 0%, #156E53 100%);
          border-radius: 12px 12px 0 0;
        }
        
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .title-section h1 {
          color: white;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        
        .title-section p {
          color: rgba(255,255,255,0.8);
          font-size: 13px;
        }
        
        .app-badge {
          background: rgba(255,255,255,0.2);
          padding: 12px 24px;
          border-radius: 8px;
          text-align: center;
        }
        
        .app-badge .label {
          font-size: 10px;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .app-badge .value {
          font-size: 18px;
          font-weight: 800;
          color: white;
          margin-top: 4px;
        }
        
        /* Status Banner */
        .status-banner {
          margin: 20px 40px;
          background: #EBF5F1;
          border: 2px solid #A3D1C2;
          border-radius: 12px;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .status-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .status-icon {
          width: 48px;
          height: 48px;
          background: #0E5A44;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .status-icon span {
          color: #34D399;
          font-size: 24px;
        }
        
        .status-text .label {
          font-size: 10px;
          font-weight: 700;
          color: #1E5A44;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .status-text .value {
          font-size: 18px;
          font-weight: 800;
          color: #0C4E3A;
          margin-top: 4px;
        }
        
        .status-right .label {
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          text-align: right;
        }
        
        .status-right .value {
          font-size: 14px;
          font-weight: 800;
          color: #1E293B;
          margin-top: 4px;
          text-align: right;
        }
        
        /* Section Styles */
        .section {
          margin: 24px 40px;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .section-header {
          background: #FAFBFB;
          padding: 14px 20px;
          border-bottom: 1px solid #EBEFF3;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .section-title {
          font-size: 14px;
          font-weight: 800;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .badge {
          background: #E2F0EC;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 9px;
          font-weight: 700;
          color: #0E5A44;
        }
        
        .section-content {
          padding: 20px;
        }
        
        /* Grid Layout */
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .field {
          margin-bottom: 16px;
        }
        
        .field-label {
          font-size: 10px;
          font-weight: 700;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .field-value {
          font-size: 14px;
          font-weight: 600;
          color: #1E293B;
        }
        
        /* Address Block */
        .address-block {
          margin-bottom: 20px;
        }
        
        .address-title {
          font-size: 11px;
          font-weight: 800;
          color: #0E5A44;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        
        .address-text {
          font-size: 13px;
          color: #334155;
          line-height: 1.5;
        }
        
        /* Post Items */
        .post-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        
        .post-number {
          width: 28px;
          height: 28px;
          background: #D1E7DD;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: #0E5A44;
        }
        
        .post-name {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }
        
        /* Table Styles */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .data-table th {
          background: #F8FAFC;
          padding: 12px;
          text-align: left;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748B;
          border-bottom: 2px solid #EDF2F7;
        }
        
        .data-table td {
          padding: 12px;
          font-size: 13px;
          color: #334155;
          border-bottom: 1px solid #F8FAFC;
        }
        
        .data-table tr:last-child td {
          border-bottom: none;
        }
        
        .text-right {
          text-align: right;
        }
        
        /* Declaration */
        .declaration {
          margin: 24px 40px;
          background: #EDF5F9;
          border: 1px solid #D0E3EE;
          border-radius: 12px;
          padding: 20px;
        }
        
        .declaration-title {
          font-size: 13px;
          font-weight: 800;
          color: #2B6CB0;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .declaration-text {
          font-size: 12px;
          color: #4A5568;
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 16px;
          padding-left: 16px;
          border-left: 3px solid #A0AEC0;
        }
        
        /* Footer */
        .footer {
          margin: 20px 40px 40px;
          padding-top: 16px;
          border-top: 1px solid #D9E6EF;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        .footer-item .label {
          font-size: 9px;
          font-weight: 700;
          color: #718096;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        
        .footer-item .value {
          font-size: 12px;
          font-weight: 800;
          color: #1A202C;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="application">
        <!-- Header -->
        <div class="header">
          <div class="header-top">
            <div class="title-section">
              <h1>Application Summary</h1>
              <p>JTGLCCE 2026 - Combined Competitive Examination</p>
            </div>
            <div class="app-badge">
              <div class="label">Application No.</div>
              <div class="value">${applicationReferenceNumber}</div>
            </div>
          </div>
        </div>
        
        <!-- Status Banner -->
        <div class="status-banner">
          <div class="status-left">
            <div class="status-icon">
              <span>✓</span>
            </div>
            <div class="status-text">
              <div class="label">Application Status</div>
              <div class="value">${status === 'submitted' ? 'Submitted Successfully' : status}</div>
            </div>
          </div>
          <div class="status-right">
            <div class="label">Submission Date</div>
            <div class="value">${formatDate(submissionDate)}</div>
          </div>
        </div>
        
        <!-- Personal Details Section -->
        <div class="section">
          <div class="section-header">
            <div class="section-title">
              <span>👤</span> Personal Details
            </div>
            <div class="badge">Locked for Editing</div>
          </div>
          <div class="section-content">
            <div class="grid-2">
              <div class="field">
                <div class="field-label">Full Name</div>
                <div class="field-value">${personalInfo.firstName} ${personalInfo.lastName}</div>
              </div>
              <div class="field">
                <div class="field-label">Gender</div>
                <div class="field-value">${personalInfo.gender}</div>
              </div>
              <div class="field">
                <div class="field-label">Date of Birth</div>
                <div class="field-value">${formatReadableDate(personalInfo.dateOfBirth)}</div>
              </div>
              <div class="field">
                <div class="field-label">Category</div>
                <div class="field-value">${getCategoryName(reservationCategory.mainCategory)}</div>
              </div>
              <div class="field">
                <div class="field-label">Domicile</div>
                <div class="field-value">${reservationCategory.isJharkhandDomicile ? 'Jharkhand' : 'Other State'}</div>
              </div>
              <div class="field">
                <div class="field-label">Nationality</div>
                <div class="field-value">${personalInfo.nationality}</div>
              </div>
              <div class="field">
                <div class="field-label">Mobile Number</div>
                <div class="field-value">+91 ${personalInfo.mobileNumber}</div>
              </div>
              <div class="field">
                <div class="field-label">Email Address</div>
                <div class="field-value">${personalInfo.emailId}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Address Details Section -->
        <div class="section">
          <div class="section-header">
            <div class="section-title">
              <span>📍</span> Address Details
            </div>
          </div>
          <div class="section-content">
            <div class="address-block">
              <div class="address-title">Permanent Address</div>
              <div class="address-text">
                ${personalInfo.address.permanent.line1}<br>
                ${personalInfo.address.permanent.city}, ${personalInfo.address.permanent.state}<br>
                India - ${personalInfo.address.permanent.pincode}
              </div>
            </div>
            <div class="address-block">
              <div class="address-title">Correspondence Address</div>
              ${personalInfo.address.correspondence.sameAsPermanent ? 
                '<div class="address-text">Same as Permanent Address</div>' : 
                `<div class="address-text">
                  ${personalInfo.address.correspondence.line1}<br>
                  ${personalInfo.address.correspondence.city}, ${personalInfo.address.correspondence.state}<br>
                  India - ${personalInfo.address.correspondence.pincode}
                </div>`
              }
            </div>
          </div>
        </div>
        
        <!-- Post Preferences Section -->
        <div class="section">
          <div class="section-header">
            <div class="section-title">
              <span>💼</span> Post & Exam Preferences
            </div>
          </div>
          <div class="section-content">
            <div class="field-label" style="margin-bottom: 12px;">Post Preference Order</div>
            ${sortedPosts.map(post => `
              <div class="post-item">
                <div class="post-number">${post.priority}</div>
                <div class="post-name">${getPostName(post.postId)}</div>
              </div>
            `).join('')}
            
            <div style="margin-top: 20px;">
              <div class="field-label" style="margin-bottom: 12px;">Language Preferences</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 12px; color: #64748B;">Paper I:</span>
                <span style="font-size: 12px; font-weight: 600; color: #1E293B;">${languageSelection.paperOneLanguage}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 12px; color: #64748B;">Paper II:</span>
                <span style="font-size: 12px; font-weight: 600; color: #1E293B;">${languageSelection.paperTwoLanguage}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 12px; color: #64748B;">Paper III:</span>
                <span style="font-size: 12px; font-weight: 600; color: #1E293B;">${languageSelection.paperThreeLanguage}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Educational Qualifications Section -->
        <div class="section">
          <div class="section-header">
            <div class="section-title">
              <span>🎓</span> Educational Qualifications
            </div>
            <div class="badge">Highest: ${education.highestQualification}</div>
          </div>
          <div class="section-content">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Board/University</th>
                  <th class="text-right">%</th>
                </tr>
              </thead>
              <tbody>
                ${qualifications.map(q => `
                  <tr>
                    <td>
                      ${q.level === 'matriculation' && '10th (Matric)'}
                      ${q.level === 'intermediate' && '12th (Inter)'}
                      ${q.level === 'graduation' && q.degree}
                      ${q.level === 'postGraduation' && q.degree}
                    </td>
                    <td>${q.boardUniversity}</td>
                    <td class="text-right">${q.percentage}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Declaration Section -->
        <div class="declaration">
          <div class="declaration-title">
            <span>🛡️</span> Self-Declaration
          </div>
          <div class="declaration-text">
            "I hereby declare that all the information provided in this application is true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, my candidature/appointment is liable to be cancelled/terminated."
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-item">
            <div class="label">Digitally Signed By</div>
            <div class="value">${personalInfo.firstName} ${personalInfo.lastName}</div>
          </div>
          <div class="footer-item">
            <div class="label">Agreement Timestamp</div>
            <div class="value">${formatDate(submissionDate)}</div>
          </div>
          <div class="footer-item">
            <div class="label">Generated On</div>
            <div class="value">${currentDate}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = applicationHTML;
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";
  document.body.appendChild(tempDiv);

  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(tempDiv, {
      scale: 2.5,
      logging: false,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 1100,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    let heightLeft = imgHeight - pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `Application_${applicationReferenceNumber}.pdf`;
    pdf.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error("PDF generation error:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  } finally {
    document.body.removeChild(tempDiv);
  }
};

export default function ApplicationSummaryPortal() {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
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

  const handleViewFile = (fileName: string, url: string | null) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert(`File not available: ${fileName}`);
    }
  };

  const handleDownloadPDF = async () => {
    if (!applicationData || downloading) return;
    
    setDownloading(true);
    try {
      await generateApplicationPDF(applicationData);
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E5A44] mx-auto"></div>
          <p className="mt-4 text-[#64748B] font-medium">Loading application data...</p>
        </div>
      </div>
    );
  }

  if (error || !applicationData) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200 text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-4">{error || 'No data available'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-[#0E5A44] text-white rounded-lg text-sm hover:bg-[#093A2B] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { steps, applicationReferenceNumber, submissionDate, status } = applicationData;
  const { personalInfo, education, postPreference, documents, reservationCategory, languageSelection } = steps;
  
  const sortedPosts = [...postPreference.postRankings].sort((a, b) => a.priority - b.priority);
  const qualifications = education.qualifications.filter(q => q && q.level);
  
  const highestQualMap: Record<string, string> = {
    matriculation: '10th (Matric)',
    intermediate: '12th (Inter)',
    graduation: 'Graduation',
    postGraduation: 'Post Graduation',
  };
  const highestQualDisplay = highestQualMap[education.highestQualification] || education.highestQualification;

  return (
    <div className="min-h-screen  font-sans antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto space-y-6">
        
        {/* PORTAL CORE HEADER CONTEXT */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-transparent pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] shadow-sm text-[#1E293B]">
                <FileCheck size={26} className="text-[#0E5A44]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
                Application Summary - JTGLCCE 2026
              </h1>
            </div>
            <p className="text-[13px] font-medium text-[#64748B] pl-1">
              Review your submitted details. Application No: {applicationReferenceNumber}
            </p>
          </div>

          <button 
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center gap-2.5 px-5 h-[46px] bg-gradient-to-r from-[#0C4E3A] to-[#156E53] hover:from-[#093A2B] hover:to-[#105540] text-white rounded-lg text-[13.5px] font-bold shadow-md transition-all shrink-0 group self-stretch sm:self-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download size={16} className="text-[#34D399] transition-transform group-hover:translate-y-0.5" />
                <span>Download PDF Application</span>
              </>
            )}
          </button>
        </div>

        {/* SYSTEM LIVE APPLICATION STATUS BANNER BAR */}
        <div className="bg-[#EBF5F1] border-2 border-[#A3D1C2] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0E5A44] flex items-center justify-center text-white shrink-0">
              <CheckCircle size={18} className="text-[#34D399]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#1E5A44] uppercase tracking-wider">
                Application Status
              </p>
              <h2 className="text-[17px] font-black text-[#0C4E3A]">
                {status === 'submitted' ? 'Submitted Successfully' : status}
              </h2>
            </div>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 border-[#C2E2D8] pt-2 sm:pt-0 w-full sm:w-auto">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
              Submission Date
            </p>
            <p className="text-[14px] font-extrabold text-[#1E293B]">
              {formatDate(submissionDate)}
            </p>
          </div>
        </div>

        {/* DETAILS DATA LAYOUT SPLIT GRID SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT SUB-GRID COLUMN */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* PERSONAL PROFILE BLOCK */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3 flex justify-between items-center">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <User size={14} className="text-[#0E5A44]" /> Personal Details
                </span>
                <span className="text-[10.5px] font-bold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] px-2 py-0.5 rounded">
                  Locked for Editing
                </span>
              </div>
              
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Full Name</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">
                      {personalInfo.firstName} {personalInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Gender</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5 capitalize">
                      {personalInfo.gender}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Date of Birth</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">
                      {formatReadableDate(personalInfo.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Category</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">
                      {getCategoryName(reservationCategory.mainCategory)}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Domicile</label>
                    <p className="text-[14.5px] font-semibold text-[#1E293B] mt-0.5">
                      {reservationCategory.isJharkhandDomicile ? 'Jharkhand' : 'Other State'}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Nationality</label>
                    <p className="text-[14.5px] font-semibold text-[#1E293B] mt-0.5">{personalInfo.nationality}</p>
                  </div>
                </div>

                <div className="border-t border-[#F1F5F9] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Mobile Number</label>
                    <p className="text-[13.5px] font-mono font-bold text-[#1E293B] mt-0.5">+91 {personalInfo.mobileNumber}</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Email Address</label>
                    <p className="text-[13.5px] font-bold text-[#1E293B] mt-0.5 break-all">{personalInfo.emailId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS DETAILS BLOCK */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#0E5A44]" /> Address Details
                </span>
              </div>
              
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
                <div className="space-y-1.5 pr-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0E5A44]">
                    Permanent Address
                  </span>
                  <p className="text-[13.5px] font-medium text-[#334155] leading-relaxed">
                    {personalInfo.address.permanent.line1}<br />
                    {personalInfo.address.permanent.city}, {personalInfo.address.permanent.state}<br />
                    <span className="font-bold text-[#1E293B]">India - {personalInfo.address.permanent.pincode}</span>
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 md:pt-0 md:pl-6 relative">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#475569]">
                      Correspondence Address
                    </span>
                    {personalInfo.address.correspondence.sameAsPermanent && (
                      <span className="text-[9px] font-black tracking-wide bg-[#E2F0EC] text-[#0E5A44] border border-[#A1D3C3] px-1.5 py-0.5 rounded-sm uppercase">
                        Same
                      </span>
                    )}
                  </div>
                  {personalInfo.address.correspondence.sameAsPermanent ? (
                    <p className="text-[13.5px] font-medium text-[#334155] leading-relaxed">
                      Same as Permanent Address
                    </p>
                  ) : (
                    <p className="text-[13.5px] font-medium text-[#334155] leading-relaxed">
                      {personalInfo.address.correspondence.line1}<br />
                      {personalInfo.address.correspondence.city}, {personalInfo.address.correspondence.state}<br />
                      <span className="font-bold text-[#1E293B]">India - {personalInfo.address.correspondence.pincode}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUB-GRID COLUMN */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* JOB PREFERENCES */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#0E5A44]" /> Post & Exam Preferences
                </span>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#64748B] block">
                    Post Preference Order
                  </label>
                  
                  <div className="space-y-1.5">
                    {sortedPosts.map((post) => (
                      <div key={post.postId} className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg">
                        <span className="w-5 h-5 rounded-full bg-[#D1E7DD] text-[#0E5A44] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {post.priority}
                        </span>
                        <span className="text-[13px] font-bold text-[#334155]">{getPostName(post.postId)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#EDF2F7]">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#64748B] block">
                    Language Preferences
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    <div className="flex justify-between items-center text-[12px] flex-wrap gap-2">
                      <span className="text-[#64748B]">Paper I:</span>
                      <span className="font-semibold text-[#1E293B]">{languageSelection.paperOneLanguage}</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] flex-wrap gap-2">
                      <span className="text-[#64748B]">Paper II:</span>
                      <span className="font-semibold text-[#1E293B]">{languageSelection.paperTwoLanguage}</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] flex-wrap gap-2">
                      <span className="text-[#64748B]">Paper III:</span>
                      <span className="font-semibold text-[#1E293B]">{languageSelection.paperThreeLanguage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATIONAL QUALIFICATIONS */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3 flex justify-between items-center flex-wrap gap-2">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-[#0E5A44]" /> Educational Qualifications
                </span>
                <span className="text-[9px] font-semibold bg-[#E2F0EC] text-[#0E5A44] px-2 py-0.5 rounded-full">
                  Highest: {highestQualDisplay}
                </span>
              </div>
              
              <div className="p-2 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[300px]">
                  <thead>
                    <tr className="border-b border-[#EDF2F7]">
                      <th className="p-2.5 text-[10.5px] font-black uppercase tracking-wider text-[#64748B]">Exam</th>
                      <th className="p-2.5 text-[10.5px] font-black uppercase tracking-wider text-[#64748B]">Board/Univ</th>
                      <th className="p-2.5 text-[10.5px] font-black uppercase tracking-wider text-[#64748B] text-right">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] font-medium text-[#334155] divide-y divide-[#F8FAFC]">
                    {qualifications.map((q, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-[#1E293B]">
                          {q.level === 'matriculation' && '10th (Matric)'}
                          {q.level === 'intermediate' && '12th (Inter)'}
                          {q.level === 'graduation' && q.degree}
                          {q.level === 'postGraduation' && q.degree}
                         </td>
                        <td className="p-2.5">{q.boardUniversity}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-[#0E5A44]">{q.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* UPLOADED DOCUMENTS */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
            <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
              <FileText size={15} className="text-[#0E5A44]" /> Uploaded Documents
            </span>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Photo */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-gray-200 border border-gray-300 rounded overflow-hidden relative shadow-inner">
                {documents.photo ? (
                  <img 
                    src={documents.photo} 
                    alt="Passport"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <User size={32} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="Photo">
                  Photo
                </span>
                <button 
                  onClick={() => handleViewFile("Photo", documents.photo)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                  disabled={!documents.photo}
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* Signature */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-white border border-gray-300 rounded p-2 flex flex-col items-center justify-center relative shadow-inner">
                {documents.signature ? (
                  <img 
                    src={documents.signature} 
                    alt="Signature"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <svg className="w-full h-2/3 text-[#1E3A8A]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 25 C 20 5, 30 35, 40 15 C 50 -5, 55 38, 70 20 C 80 10, 85 30, 95 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="Signature">
                  Signature
                </span>
                <button 
                  onClick={() => handleViewFile("Signature", documents.signature)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                  disabled={!documents.signature}
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* 10th Marksheet */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-[#EDF2F7] rounded flex flex-col items-center justify-center p-3 text-center border border-gray-200 shadow-inner">
                <FileText size={36} className="text-[#64748B] mb-2" />
                <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">PDF</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="10th Marksheet">
                  10th Marksheet
                </span>
                <button 
                  onClick={() => handleViewFile("10th Marksheet", documents.tenthMarksheet)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                  disabled={!documents.tenthMarksheet}
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* 12th Marksheet */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-[#EDF2F7] rounded flex flex-col items-center justify-center p-3 text-center border border-gray-200 shadow-inner">
                <FileText size={36} className="text-[#64748B] mb-2" />
                <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">PDF</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="12th Marksheet">
                  12th Marksheet
                </span>
                <button 
                  onClick={() => handleViewFile("12th Marksheet", documents.twelfthMarksheet)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                  disabled={!documents.twelfthMarksheet}
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* Graduation Marksheet */}
            {documents.graduationMarksheet && (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
                <div className="aspect-[4/5] bg-[#EDF2F7] rounded flex flex-col items-center justify-center p-3 text-center border border-gray-200 shadow-inner">
                  <FileText size={36} className="text-[#64748B] mb-2" />
                  <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">PDF</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                  <span className="text-[11px] font-semibold text-[#475569] truncate" title="Graduation Marksheet">
                    Graduation Marksheet
                  </span>
                  <button 
                    onClick={() => handleViewFile("Graduation Marksheet", documents.graduationMarksheet)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                  >
                    <Eye size={12} /> View
                  </button>
                </div>
              </div>
            )}

            {/* Domicile Certificate */}
            {documents.domicileCertificate && (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
                <div className="aspect-[4/5] bg-[#EDF2F7] rounded flex flex-col items-center justify-center p-3 text-center border border-gray-200 shadow-inner">
                  <FileText size={36} className="text-[#64748B] mb-2" />
                  <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">PDF</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                  <span className="text-[11px] font-semibold text-[#475569] truncate" title="Domicile Certificate">
                    Domicile Certificate
                  </span>
                  <button 
                    onClick={() => handleViewFile("Domicile Certificate", documents.domicileCertificate)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                  >
                    <Eye size={12} /> View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SELF DECLARATION */}
        <div className="bg-[#EDF5F9] border border-[#D0E3EE] rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#2B6CB0]">
            <ShieldCheck size={18} />
            <h3 className="text-[14px] font-black uppercase tracking-wider">
              Self-Declaration
            </h3>
          </div>
          
          <blockquote className="border-l-2 border-[#A0AEC0] pl-4 text-[13px] font-medium text-[#4A5568] leading-relaxed italic">
            "I hereby declare that all the information provided in this application is true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, my candidature/appointment is liable to be cancelled/terminated."
          </blockquote>

          <div className="border-t border-[#D9E6EF] pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-[11.5px] text-[#4A5568]">
            <div className="space-y-0.5">
              <p className="font-bold text-[#718096] uppercase tracking-wide text-[10px]">Digitally Signed By</p>
              <p className="text-[13px] font-black text-[#1A202C]">
                {personalInfo.firstName} {personalInfo.lastName}
              </p>
            </div>
            <div className="space-y-0.5 md:border-l border-[#D9E6EF] md:pl-6">
              <p className="font-bold text-[#718096] uppercase tracking-wide text-[10px]">Agreement Timestamp</p>
              <p className="text-[13px] font-bold text-[#1A202C]">{formatDate(submissionDate)}</p>
            </div>
            <div className="space-y-0.5 md:border-l border-[#D9E6EF] md:pl-6">
              <p className="font-bold text-[#718096] uppercase tracking-wide text-[10px]">Application No.</p>
              <p className="text-[13px] font-mono font-bold text-[#1A202C]">{applicationReferenceNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}