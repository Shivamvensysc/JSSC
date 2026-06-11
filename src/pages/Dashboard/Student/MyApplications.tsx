import React, { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle,
  User,
  GraduationCap,
  MapPin,
  FileCheck,
  Shield,
  Calendar,
  FileSignature,
  ChevronRight,
  ChevronLeft,
  Send,
  Award,
  BookOpen,
  CreditCard,
  Receipt,
  AlertCircle,
  ExternalLink,
  Info,
  HelpCircle,
  Bell,
  Edit3,
  CheckSquare,
  Globe,
  Sliders,
  Languages,
  KeyRound,X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { usePayment } from '../../hooks/usePayment';

// API Base URL
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

// Helper function to get multipart headers for file upload
const getMultipartHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

// API Service functions
const apiService = {
  getSubjects: () => axios.get(`${API_BASE_URL}/subjects`),
  getCategories: () => axios.get(`${API_BASE_URL}/categories`),
  getCountries: () => axios.get(`${API_BASE_URL}/countries`),
  getStatesByCountry: (countryId: number) => axios.get(`${API_BASE_URL}/countries/${countryId}/states`),
  getDistrictsByState: (stateId: number) => axios.get(`${API_BASE_URL}/states/${stateId}/districts`),
  saveStep1: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-1`, data, getAuthHeaders()),
  saveStep2: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-2`, data, getAuthHeaders()),
  saveStep3: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-3`, data, getAuthHeaders()),
  saveStep4: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-4`, data, getAuthHeaders()),
  saveStep5: (data: FormData) => axios.post(`${API_BASE_URL}/auth/candidate/step-5`, data, getMultipartHeaders()),
  saveStep6: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-6`, data, getAuthHeaders()),
  getApplicationSteps: () => axios.get(`${API_BASE_URL}/application/steps/all`, getAuthHeaders()),
  submitApplication: (applicationId: string) => axios.post(`${API_BASE_URL}/application/${applicationId}/submit`, {}, getAuthHeaders()),
  submitApplicationFinal: (applicationId: string) => axios.post(`${API_BASE_URL}/application/${applicationId}/submit-final`, {}, getAuthHeaders()),
};

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  fathersName: string;
  motherName: string;
  dob: string;
  gender: string;
  age: number;
  nationality: string;
  aadharNumber: string;
  mobileNumber: string;
  identificationMark1: string;
  identificationMark2: string;
  alternateNumber: string;
  emailId: string;
  permanentAddress: {
    street: string;
    post: string;
    district: string;
    districtId?: number;
    state: string;
    stateId?: number;
    pincode: string;
    cityOrVillage: string;
  };
  correspondenceAddress: {
    street: string;
    post: string;
    district: string;
    districtId?: number;
    state: string;
    stateId?: number;
    pincode: string;
    cityOrVillage: string;
  };
  sameAsPermanent: boolean;
}

interface Education {
  tenth: {
    board: string;
    percentage: string;
    totalMarks: string;
    marksObtained: string;
    passingCertificateNo: string;
  };
  twelfth: {
    board: string;
    percentage: string;
    passingCertificateNo: string;
    totalMarks: string;
    marksObtained: string;
  };
  graduation: {
    graduationCourse: string;
    graduationCourseId?: number;
    university: string;
    percentage: string;
    specialization: string;
    specializationIds?: number[];
    passingCertificateNo: string;
    totalMarks: string;
    marksObtained: string;
  };
  postGraduation: {
    hasPostGraduation: boolean;
    university: string;
    percentage: string;
    subject: string[];
    subjectIds?: number[];
    totalMarks: string;
    marksObtained: string;
    passingCertificateNo: string;
  };
  experience: {
    hasExperience: boolean;
    durationMonths: string;
    durationYears: string;
    organization: string;
    designation: string;
    dateOfJoining: string;
    relievingDate: string;
    experienceLetterNo: string;
  };
}

interface PostPreference {
  vacancyStream: string;
  postRankings: { [key: number]: number };
}

interface LanguageSelection {
  paperOneLanguage: string;
  paperTwoLanguage: string;
  paperThreeLanguage: string;
}

interface ReservationCategory {
  mainCategory: string;
  categoryCertificateNumber: string;
  categoryCertificateAuthority: string; // Add this
   categoryCertificateIssueDate: string; // Add this 
   pwdCertificateIssueDate: string; // Add this
   sportsCertificateIssueDate: string; // Add this 
   domicileCertificateIssueDate: string; // Add this
  mainCategoryId?: number;
  subCategory: string;
  subCategoryId?: number;
  isPwd: string;
  pwdType: string;
  pwdTypeId?: number;
  pwdPercentage: string;
  pwdCertificateNumber: string;
  pwdCertificateAuthority: string; // Add this
  pwdCertificate: File | null;
  isExServiceman: string;
  exServicemanYears: string;
  exServicemanDischargeBook: File | null;
  isSportsQuota: string;
  sportsLevel: string;
  sportsAchievement: string;
  sportsCertificateNumber: string;
  sportsCertificateAuthority: string; // Add this
  sportsCertificate: File | null;
  isJharkhandDomicile: string;
  domicileCertificateNumber: string;
  domicileCertificateAuthority: string; // Add this
  domicileCertificate: File | null;
  declaration: boolean;
}

interface FeePayment {
  applicationFee: string;
  paymentMode: string;
  transactionId: string;
  paymentDate: string;
  bankName: string;
  paymentStatus: "pending" | "completed" | "failed";
}

interface Documents {
  tenthMarksheet: File | null;
  twelfthMarksheet: File | null;
  graduationMarksheet: File | null;
  postGraduationCertificate: File | null;
  diplomaCertificate: File | null;
  experienceCertificate: File | null;
  contractualServiceCertificate: File | null;
  ewsCertificate: File | null;
  aadharCard: File | null;
  signature: File | null;
  photo: File | null;
  domicileCertificate: File | null;
  castCertificate: File | null;
  sportsCertificate: File | null;
  pwdCertificate: File | null;
}

interface ApplicationStatus {
  isSubmitted: boolean;
  registrationNumber: string;
  submissionDate: string;
}

interface Post {
  postId: number;
  postUserId: number;
  catId: number;
  eduId: number;
  postTitle: string;
  postSlug: string;
  postContent: string;
  postPublish: number;
  createdAt: string;
  updatedAt: string;
}

interface Subject {
  subId: number;
  subUserId: number;
  subName: string;
  subPublish: number;
}

interface Category {
  catId: number;
  catUserId: number;
  catName: string;
  catParentId: number | null;
  catPublish: number;
  subCategories: SubCategory[];
}

interface SubCategory {
  catId: number;
  catUserId: number;
  catName: string;
  catParentId: number | null;
  catPublish: number;
}

interface Country {
  countryId: number;
  countryName: string;
  countryCode: string;
  isActive: boolean;
}

interface State {
  stateId: number;
  countryId: number;
  stateName: string;
  stateCode: string;
  isActive: boolean;
}

interface District {
  districtId: number;
  stateId: number;
  districtName: string;
  isActive: boolean;
}

interface ReviewData {
  applicationId: string;
  candidateId: string;
  status: string;
  currentStep: number;
  completedSteps: number[];
  isSubmitted: boolean;
  applicationReferenceNumber: string | null;
  submissionDate: string | null;
  candidateDetails: any;
  steps: {
    personalInfo: any;
    reservationCategory: any;
    education: any;
    postPreference: any;
    languageSelection: any;
    documents: any;
    feePayment: any;
  };
}

import { toast } from "react-toastify";

const MyApplications: React.FC = () => {
  // Add this state near other API Data States
const [postsList, setPostsList] = useState<any[]>([]);
const [eligiblePosts, setEligiblePosts] = useState<any[]>([]);


const [stepErrors, setStepErrors] = useState<{ [key: number]: { [field: string]: string } }>({});
// Add this with other API Data States
const [disabilitiesList, setDisabilitiesList] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(true);
  const [emailOtpVerified, setEmailOtpVerified] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>({
    isSubmitted: false,
    registrationNumber: "",
    submissionDate: "",
  });
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [dynamicPosts, setDynamicPosts] = useState<Post[]>([]);
  const [savingStep, setSavingStep] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loadingReview, setLoadingReview] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // API Data States
  const [subjectsList, setSubjectsList] = useState<string[]>([]);
  console.log(subjectsList)
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [statesList, setStatesList] = useState<State[]>([]);
  const [permanentDistricts, setPermanentDistricts] = useState<District[]>([]);
  const [correspondenceDistricts, setCorrespondenceDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);

  const boards = [
    "CBSE", "ICSE", "NIOS", "IB", "IGCSE", "Andhra Pradesh Board",
    "Assam Board", "Bihar Board", "Chhattisgarh Board", "Goa Board",
    "Gujarat Board", "Haryana Board", "Himachal Pradesh Board", "Jharkhand Board",
    "Karnataka Board", "Kerala Board", "Madhya Pradesh Board", "Maharashtra Board",
    "Manipur Board", "Meghalaya Board", "Mizoram Board", "Nagaland Board",
    "Odisha Board", "Punjab Board", "Rajasthan Board", "Sikkim Board",
    "Tamil Nadu Board", "Telangana Board", "Tripura Board", "UP Board",
    "Uttarakhand Board", "West Bengal Board", "Jammu & Kashmir Board",
    "Open School Board", "State Open School",
  ];

  // Add this function to fetch posts
const fetchPosts = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/posts`,
      { applicationId: applicationId },
      getAuthHeaders()
    );
    if (response.data.success) {
      setPostsList(response.data.data.posts || []);
      setEligiblePosts(response.data.data.eligiblePosts || []);
      
      // Initialize post rankings for all posts
      const initialRankings: { [key: number]: number } = {};
      response.data.data.posts.forEach((post: any) => {
        initialRankings[post.postCode] = 0;
      });
      setPostPreference(prev => ({
        ...prev,
        postRankings: initialRankings,
      }));
    }
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    toast.error(error.response?.data?.message || "Failed to load posts");
  }
};

// Call fetchPosts when entering step 3
useEffect(() => {
  if (currentStep === 3 && applicationId && postsList.length === 0) {
    fetchPosts();
  }
}, [currentStep, applicationId]);

  const graduationCourseNames = [
  "Bachelor of Science (B.Sc)",
  "Bachelor of Science Honours (B.Sc Hons.)",
  "Bachelor of Pharmacy (B.Pharm)",
  "Bachelor of Ayurvedic Medicine and Surgery (B.A.M.S)",
  "Bachelor of Fisheries Science (B.F.Sc)",
  "Bachelor of Technology in Dairy Technology (B.Tech Dairy Technology)",
  "Bachelor of Science in Dairy Science (B.Sc Dairy Science)",
  "Bachelor of Arts (B.A)",
  "Bachelor of Commerce (B.Com)",
];

  
// Validation for Step 0 - Personal Info
const validateStep0 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  // Basic Information
  if (!personalInfo.firstName.trim()) errors.firstName = "First name is required";
  if (!personalInfo.lastName.trim()) errors.lastName = "Last name is required";
  if (!personalInfo.fathersName.trim()) errors.fathersName = "Father's name is required";
  if (!personalInfo.motherName.trim()) errors.motherName = "Mother's name is required";
  if (!personalInfo.gender) errors.gender = "Gender is required";
  if (!personalInfo.nationality) errors.nationality = "Nationality is required";
  
  // Contact Details
  if (!personalInfo.mobileNumber) errors.mobileNumber = "Mobile number is required";
  if (personalInfo.mobileNumber && personalInfo.mobileNumber.length !== 10) errors.mobileNumber = "Mobile number must be 10 digits";
  if (!personalInfo.emailId) errors.emailId = "Email ID is required";
  if (personalInfo.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.emailId)) errors.emailId = "Invalid email format";
  
// Date of Birth Validation - ADD THIS SECTION
  if (!personalInfo.dob) {
    errors.dob = "Date of birth is required";
  } else {
    const birthDate = new Date(personalInfo.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 21) {
      errors.dob = `Age must be at least 21 years. Current age: ${age} years`;
    }
  }
  
  // Identification Marks
  if (!personalInfo.identificationMark1.trim()) errors.identificationMark1 = "Identification mark is required";
  
  // Permanent Address
  if (!personalInfo.permanentAddress.street.trim()) errors.permanentStreet = "Street address is required";
  if (!personalInfo.permanentAddress.cityOrVillage.trim()) errors.permanentCity = "City/Village is required";
  if (!personalInfo.permanentAddress.post.trim()) errors.permanentPost = "Post office is required";
  if (!personalInfo.permanentAddress.state) errors.permanentState = "State is required";
  if (!personalInfo.permanentAddress.district) errors.permanentDistrict = "District is required";
  if (!personalInfo.permanentAddress.pincode) errors.permanentPincode = "Pincode is required";
  if (personalInfo.permanentAddress.pincode && personalInfo.permanentAddress.pincode.length !== 6) errors.permanentPincode = "Pincode must be 6 digits";
  
  // Correspondence Address (if not same as permanent)
  if (!personalInfo.sameAsPermanent) {
    if (!personalInfo.correspondenceAddress.street.trim()) errors.correspondenceStreet = "Street address is required";
    if (!personalInfo.correspondenceAddress.cityOrVillage.trim()) errors.correspondenceCity = "City/Village is required";
    if (!personalInfo.correspondenceAddress.post.trim()) errors.correspondencePost = "Post office is required";
    if (!personalInfo.correspondenceAddress.state) errors.correspondenceState = "State is required";
    if (!personalInfo.correspondenceAddress.district) errors.correspondenceDistrict = "District is required";
    if (!personalInfo.correspondenceAddress.pincode) errors.correspondencePincode = "Pincode is required";
    if (personalInfo.correspondenceAddress.pincode && personalInfo.correspondenceAddress.pincode.length !== 6) errors.correspondencePincode = "Pincode must be 6 digits";
  }
  
  setStepErrors(prev => ({ ...prev, [0]: errors }));
  return Object.keys(errors).length === 0;
};

// Validation for Step 1 - Reservation Category
// const validateStep1 = (): boolean => {
//   const errors: { [field: string]: string } = {};
  
//   if (!reservationCategory.mainCategory) errors.mainCategory = "Please select a category";
//   if (!reservationCategory.isJharkhandDomicile) errors.isJharkhandDomicile = "Please select Jharkhand Domicile status";
  
//   if (reservationCategory.isPwd === "yes") {
//     if (!reservationCategory.pwdType) errors.pwdType = "Please select disability type";
//     if (!reservationCategory.pwdPercentage) errors.pwdPercentage = "Please enter disability percentage";
//     const pwdPercent = parseInt(reservationCategory.pwdPercentage);
//     if (pwdPercent < 40) errors.pwdPercentage = "Disability percentage must be at least 40%";
//   }
  
//   if (reservationCategory.isExServiceman === "yes") {
//     if (!reservationCategory.exServicemanYears) errors.exServicemanYears = "Please enter years of service";
//     const years = parseInt(reservationCategory.exServicemanYears);
//     if (years < 0 || years > 30) errors.exServicemanYears = "Years of service must be between 0 and 30";
//   }
  
//   if (reservationCategory.isSportsQuota === "yes") {
//     if (!reservationCategory.sportsLevel) errors.sportsLevel = "Please select sports level";
//     if (!reservationCategory.sportsAchievement.trim()) errors.sportsAchievement = "Please describe your achievements";
//   }
  
//   if (!reservationCategory.declaration) errors.declaration = "Please accept the declaration";
  
//   setStepErrors(prev => ({ ...prev, [1]: errors }));
//   return Object.keys(errors).length === 0;
// };

// Validation for Step 1 - Reservation Category
const validateStep1 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  if (!reservationCategory.mainCategoryId) errors.mainCategory = "Please select a category";
  if (!reservationCategory.isJharkhandDomicile) errors.isJharkhandDomicile = "Please select Jharkhand Domicile status";
  
  if (reservationCategory.isJharkhandDomicile === "yes" && !reservationCategory.domicileCertificateNumber.trim()) {
    errors.domicileCertificateNumber = "Domicile certificate number is required";
  }
  
  if (reservationCategory.isPwd === "yes") {
    if (!reservationCategory.pwdTypeId) errors.pwdType = "Please select disability type";
    if (!reservationCategory.pwdPercentage) errors.pwdPercentage = "Please enter disability percentage";
    const pwdPercent = parseInt(reservationCategory.pwdPercentage);
    if (pwdPercent < 40) errors.pwdPercentage = "Disability percentage must be at least 40%";
    if (!reservationCategory.pwdCertificateNumber.trim()) errors.pwdCertificateNumber = "PwD certificate number is required";
  }
  
  if (reservationCategory.isExServiceman === "yes") {
    if (!reservationCategory.exServicemanYears) errors.exServicemanYears = "Please enter years of service";
    const years = parseInt(reservationCategory.exServicemanYears);
    if (years < 0 || years > 30) errors.exServicemanYears = "Years of service must be between 0 and 30";
  }
  
  if (reservationCategory.isSportsQuota === "yes") {
    if (!reservationCategory.sportsLevel) errors.sportsLevel = "Please select sports level";
    if (!reservationCategory.sportsAchievement.trim()) errors.sportsAchievement = "Please describe your achievements";
    if (!reservationCategory.sportsCertificateNumber.trim()) errors.sportsCertificateNumber = "Sports certificate number is required";
  }
  
  if (!reservationCategory.declaration) errors.declaration = "Please accept the declaration";
  
  setStepErrors(prev => ({ ...prev, [1]: errors }));
  return Object.keys(errors).length === 0;
};

// Validation for Step 2 - Education Details
const validateStep2 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  // 10th validation
  const tenthIsValid = (education.tenth.percentage && education.tenth.percentage !== "") || 
                       (education.tenth.totalMarks && education.tenth.marksObtained);
  
  if (!education.tenth.board) errors.tenthBoard = "10th board is required";
  if (!tenthIsValid) errors.tenthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
  if (!education.tenth.passingCertificateNo) errors.tenthCertificate = "10th certificate number is required";
  
  // 12th validation
  const twelfthIsValid = (education.twelfth.percentage && education.twelfth.percentage !== "") || 
                         (education.twelfth.totalMarks && education.twelfth.marksObtained);
  
  if (!education.twelfth.board) errors.twelfthBoard = "12th board is required";
  if (!twelfthIsValid) errors.twelfthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
  
  // Graduation validation
  const gradIsValid = (education.graduation.percentage && education.graduation.percentage !== "") || 
                      (education.graduation.totalMarks && education.graduation.marksObtained);
  
  if (!education.graduation.graduationCourse) errors.graduationCourse = "Graduation course is required";
  if (!education.graduation.university) errors.graduationUniversity = "University name is required";
  if (!gradIsValid) errors.graduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
  if (!education.graduation.specialization) errors.graduationSpecialization = "Specialization/Subject is required";
  if (!education.graduation.passingCertificateNo) errors.graduationCertificate = "Certificate number is required";
  
  setStepErrors(prev => ({ ...prev, [2]: errors }));
  return Object.keys(errors).length === 0;
};

// Validation for Step 3 - Post Preferences (skipped as it has its own validation)
const validateStep3 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  if (dynamicPosts.length > 0 && Object.values(postPreference.postRankings).some(p => p === 0)) {
    errors.postRankings = "Please assign priorities to all posts";
  }
  
  setStepErrors(prev => ({ ...prev, [3]: errors }));
  return Object.keys(errors).length === 0;
};

// Validation for Step 4 - Language Selection
const validateStep4 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  if (!languageSelection.paperOneLanguage) errors.paperOneLanguage = "Paper I language is required";
  if (!languageSelection.paperTwoLanguage) errors.paperTwoLanguage = "Paper II language is required";
  if (!languageSelection.paperThreeLanguage) errors.paperThreeLanguage = "Paper III subject is required";
  
  setStepErrors(prev => ({ ...prev, [4]: errors }));
  return Object.keys(errors).length === 0;
};


// Combined validation for current step
const validateCurrentStep = (): boolean => {
  switch (currentStep) {
    case 0: return validateStep0();
    case 1: return validateStep1();
    case 2: return validateStep2();
    case 3: return validateStep3();
    case 4: return validateStep4();
    default: return true;
  }
};

  const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    className = "",
  }) => {
    console.log(required)
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: string) => {
      onChange(option);
      setSearchTerm("");
      setIsOpen(false);
    };

    return (
      <div className={`relative ${className}`}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary cursor-pointer flex justify-between items-center ${disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"}`}
        >
          <span className={!value ? "text-slate-400" : "text-slate-700"}>
            {value || placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOpen && !disabled && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-slate-200">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="overflow-y-auto max-h-48">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelect(option)}
                      className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm text-slate-700"
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-slate-500 text-center">
                    No options found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      
      
      </div>
    );
  };

  
  
  const MultiSelectDropdown: React.FC<{
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  disabled?: boolean;
  error?: string;
}> = ({ options, values, onChange, placeholder, disabled = false, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Add safety check - ensure options is an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  const filteredOptions = safeOptions.filter((option) =>
    option && option.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  const toggleOption = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((item) => item !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`min-h-[42px] w-full px-3 py-2 border rounded-lg cursor-pointer bg-white flex flex-wrap gap-2 items-center ${
          disabled ? "bg-slate-100 cursor-not-allowed" : ""
        } ${error ? "border-red-500" : "border-slate-300"}`}
      >
        {values.length > 0 ? (
          values.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
              onClick={(event) => event.stopPropagation()}
            >
              {item}
              <button
                type="button"
                onClick={() => toggleOption(item)}
                className="text-primary hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
      </div>
      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
            <div className="p-2 border-b border-slate-200">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={values.includes(option)}
                      onChange={() => toggleOption(option)}
                    />
                    {option}
                  </label>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-slate-500 text-center">
                  No options found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};



  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const yearsRange = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    fathersName: "",
    motherName: "",
    dob: "",
    age: 0,
    gender: "",
    identificationMark1: "",
    identificationMark2: "",
    nationality: "Indian",
    mobileNumber: "",
    alternateNumber: "",
    emailId: "",
    aadharNumber: "",
    permanentAddress: {
      street: "",
      post: "",
      district: "",
      districtId: undefined,
      state: "",
      stateId: undefined,
      pincode: "",
      cityOrVillage: "",
    },
    correspondenceAddress: {
      street: "",
      post: "",
      district: "",
      districtId: undefined,
      state: "",
      stateId: undefined,
      pincode: "",
      cityOrVillage: "",
    },
    sameAsPermanent: false,
  });


const [declarationConfirmed, setDeclarationConfirmed] = useState(false);
  const [education, setEducation] = useState<Education>({
    tenth: {
      board: "",
      percentage: "",
      totalMarks: "",
      marksObtained: "",
      passingCertificateNo: "",
    },
    twelfth: {
      board: "",
      percentage: "",
      passingCertificateNo: "",
      totalMarks: "",
      marksObtained: "",
    },
    graduation: {
      graduationCourse: "",
      university: "",
      percentage: "",
      specialization: "",
      passingCertificateNo: "",
      totalMarks: "",
      marksObtained: "",
    },
    postGraduation: {
      hasPostGraduation: false,
      university: "",
      percentage: "",
      subject: [],
      totalMarks: "",
      marksObtained: "",
      passingCertificateNo: "",
    },
  
    experience: {
      hasExperience: false,
      durationMonths: "",
      durationYears: "",
      organization: "",
      designation: "",
      dateOfJoining: "",
      relievingDate: "",
      experienceLetterNo: "",
    },
  });

  const [postPreference, setPostPreference] = useState<PostPreference>({
    vacancyStream: "both",
    postRankings: {},
  });

  const [languageSelection, setLanguageSelection] = useState<LanguageSelection>({
    paperOneLanguage: "",
    paperTwoLanguage: "",
    paperThreeLanguage: "",
  });
  


 const [reservationCategory, setReservationCategory] = useState<ReservationCategory>({
  mainCategory: "",
  mainCategoryId: undefined,
  subCategory: "",
  subCategoryId: undefined,
  categoryCertificateNumber: "",
  categoryCertificateAuthority: "", // Add this
   pwdCertificateIssueDate: "", // Add this
   sportsCertificateIssueDate: "", // Add this
    domicileCertificateIssueDate: "", // Add this
  isPwd: "no",
  pwdType: "",
  pwdTypeId: undefined,
  categoryCertificateIssueDate: "", 
  pwdPercentage: "",
  pwdCertificateNumber: "",
  pwdCertificateAuthority: "", // Add this
  pwdCertificate: null,
  isExServiceman: "no",
  exServicemanYears: "",
  exServicemanDischargeBook: null,
  isSportsQuota: "no",
  sportsLevel: "",
  sportsAchievement: "",
  sportsCertificateNumber: "",
  sportsCertificateAuthority: "", // Add this
  sportsCertificate: null,
  isJharkhandDomicile: "yes",
  domicileCertificateNumber: "",
  domicileCertificateAuthority: "", // Add this
  domicileCertificate: null,
  declaration: false,
});


  const [feePayment, setFeePayment] = useState<FeePayment>({
    applicationFee: "100",
    paymentMode: "",
    transactionId: "",
    paymentDate: "",
    bankName: "",
    paymentStatus: "pending",
  });

  const [documents, setDocuments] = useState<Documents>({
    tenthMarksheet: null,
    twelfthMarksheet: null,
    graduationMarksheet: null,
    postGraduationCertificate: null,
    diplomaCertificate: null,
    experienceCertificate: null,
    contractualServiceCertificate: null,
    ewsCertificate: null,
    aadharCard: null,
    signature: null,
    photo: null,
    domicileCertificate: null,
    castCertificate: null,
    sportsCertificate: null,
    pwdCertificate: null,
  });

  const steps = [
    { id: 0, title: "Personal Info", icon: User },
    { id: 1, title: "Reservation & Category", icon: Shield },
    { id: 2, title: "Education Details", icon: GraduationCap },
    { id: 3, title: "Post Preferences", icon: Sliders },
    { id: 4, title: "Language Selection", icon: Languages },
    { id: 5, title: "Documents Upload", icon: FileCheck },
    { id: 6, title: "Fee Payment", icon: CreditCard },
    { id: 7, title: "Review & Submit", icon: FileSignature },
  ];

  // Input validation helper
  const validateNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (!/^\d+$/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      e.preventDefault();
    }
  };

  const validateTextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (/^\d+$/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      e.preventDefault();
    }
  };


  
// Fetch and auto-fill data from API
const fetchAndAutoFillData = async () => {
  try {
    const response = await apiService.getApplicationSteps();
    if (response.data.success && response.data.data) {
      const data = response.data.data;
      setApplicationId(data.applicationId);
      
      // Check if application is already submitted
      if (data.isSubmitted === true) {
        setIsSubmitted(true);
        setApplicationStatus({
          isSubmitted: true,
          registrationNumber: data.applicationReferenceNumber || "",
          submissionDate: data.submissionDate || new Date().toLocaleDateString(),
        });
        return;
      }
      
      // Auto-fill personal info
      if (data.steps?.personalInfo) {
        const pi = data.steps.personalInfo;
        
        let genderValue = "";
        if (pi.gender) {
          const genderLower = pi.gender.toLowerCase();
          if (genderLower === "male") genderValue = "male";
          else if (genderLower === "female") genderValue = "female";
          else if (genderLower === "other" || genderLower === "thirdgender") genderValue = "other";
          else genderValue = pi.gender;
        }
        
        let permanentStateId: number | undefined = undefined;
        let permanentStateName = pi.address?.permanent?.state || "";
        if (permanentStateName) {
          const foundState = statesList.find(s => 
            s.stateName.toLowerCase() === permanentStateName.toLowerCase()
          );
          if (foundState) {
            permanentStateId = foundState.stateId;
          }
        }
        
        let correspondenceStateId: number | undefined = undefined;
        let correspondenceStateName = pi.address?.correspondence?.state || "";
        if (correspondenceStateName && !pi.address?.correspondence?.sameAsPermanent) {
          const foundState = statesList.find(s => 
            s.stateName.toLowerCase() === correspondenceStateName.toLowerCase()
          );
          if (foundState) {
            correspondenceStateId = foundState.stateId;
          }
        }
        
        setPersonalInfo({
          ...personalInfo,
          firstName: pi.firstName || "",
          lastName: pi.lastName || "",
          fathersName: pi.fatherName || "",
          motherName: pi.motherName || "",
          dob: pi.dateOfBirth ? pi.dateOfBirth.split('T')[0] : "",
          age: pi.age || 0,
          gender: genderValue,
          nationality: pi.nationality || "Indian",
          aadharNumber: pi.identityNumber || "",
          mobileNumber: pi.mobileNumber || "",
          alternateNumber: pi.alternateNumber || "",
          emailId: pi.emailId || "",
          identificationMark1: pi.identificationMark1 || "",
          identificationMark2: pi.identificationMark2 || "",
          permanentAddress: {
            ...personalInfo.permanentAddress,
            street: pi.address?.permanent?.line1 || "",
            cityOrVillage: pi.address?.permanent?.city || "",
            post: pi.address?.permanent?.city || "",
            state: pi.address?.permanent?.state || "",
            stateId: permanentStateId,
            district: pi.address?.permanent?.city || "",
            pincode: pi.address?.permanent?.pincode || "",
          },
          correspondenceAddress: {
            ...personalInfo.correspondenceAddress,
            street: pi.address?.correspondence?.line1 || "",
            cityOrVillage: pi.address?.correspondence?.city || "",
            post: pi.address?.correspondence?.city || "",
            state: pi.address?.correspondence?.state || "",
            stateId: correspondenceStateId,
            district: pi.address?.correspondence?.city || "",
            pincode: pi.address?.correspondence?.pincode || "",
          },
          sameAsPermanent: pi.address?.correspondence?.sameAsPermanent || false,
        });
        setMobileOtpVerified(pi.mobileVerified || false);
        setEmailOtpVerified(pi.emailVerified || false);
      }
      
      // Auto-fill reservation category
      if (data.steps?.reservationCategory) {
        const rc = data.steps.reservationCategory;
        
        let mainCategoryValue = "";
        if (rc.mainCategory) {
          const foundCategory = categoriesList.find(cat => cat.catId === rc.mainCategory);
          if (foundCategory) {
            mainCategoryValue = foundCategory.catName.toLowerCase().replace(/\s+/g, '_');
          } else {
            const categoryIdMap: { [key: number]: string } = {
              54: "scheduled_tribe_(st)",
              53: "scheduled_caste_(sc)",
              52: "bc_ii",
              51: "bc_i",
              50: "ews",
              49: "unreserved",
              63: "bc_i"
            };
            mainCategoryValue = categoryIdMap[rc.mainCategory] || "";
          }
        }
        
        let subCategoryValue = "";
        if (rc.subCategory && rc.subCategory !== 0) {
          const stCategory = categoriesList.find(cat => cat.catName === "Scheduled Tribe (ST)");
          if (stCategory?.subCategories) {
            const foundSub = stCategory.subCategories.find(sub => sub.catId === rc.subCategory);
            if (foundSub) {
              subCategoryValue = foundSub.catName.toLowerCase().replace(/\s+/g, '_');
            }
          }
        }
        
        setReservationCategory({
          ...reservationCategory,
          mainCategory: mainCategoryValue,
          mainCategoryId: rc.mainCategory,
          subCategory: subCategoryValue,
          subCategoryId: rc.subCategory,
          isPwd: rc.isPwd ? "yes" : "no",
          pwdType: rc.pwdType || "",
          pwdPercentage: rc.pwdPercentage?.toString() || "",
          isExServiceman: rc.isExServiceman ? "yes" : "no",
          exServicemanYears: rc.exServicemanYears?.toString() || "",
          isSportsQuota: rc.isSportsQuota ? "yes" : "no",
          sportsLevel: rc.sportsLevel || "",
          sportsAchievement: rc.sportsAchievement || "",
          isJharkhandDomicile: rc.isJharkhandDomicile ? "yes" : "no",
          declaration: rc.declaration || false,
        });
        
        if (mainCategoryValue === "sc" || mainCategoryValue === "st" || mainCategoryValue === "scheduled_caste_(sc)" || mainCategoryValue === "scheduled_tribe_(st)") {
          setFeePayment(prev => ({ ...prev, applicationFee: "50" }));
        }
        if (rc.isPwd) {
          setFeePayment(prev => ({ ...prev, applicationFee: "0" }));
        }
      }
      
      // Auto-fill education
      if (data.steps?.education) {
        const edu = data.steps.education;
        // Convert highestQualification to lowercase for dropdown matching
        
        const qualifications = edu.qualifications || [];
        
        const tenthQual = qualifications.find((q: any) => q.level === "matriculation");
        if (tenthQual) {
          let boardValue = tenthQual.boardUniversity || "";
          if (boardValue) {
            const foundBoard = boards.find(b => b.toLowerCase() === boardValue.toLowerCase());
            if (foundBoard) boardValue = foundBoard;
          }
          
          setEducation(prev => ({
            ...prev,
            tenth: {
              ...prev.tenth,
              board: boardValue,
              rollNumber: tenthQual.rollNumber?.toString() || "",
              percentage: tenthQual.percentage?.toString() || "",
              yearOfPassing: tenthQual.yearOfPassing?.toString() || "",
              totalMarks: tenthQual.totalMarks?.toString() || "",
              marksObtained: tenthQual.marksObtained?.toString() || "",
              passingCertificateNo: tenthQual.grade || "",
            }
          }));
        }
        
        const twelfthQual = qualifications.find((q: any) => q.level === "intermediate");
        if (twelfthQual) {
          let boardValue = twelfthQual.boardUniversity || "";
          if (boardValue) {
            const foundBoard = boards.find(b => b.toLowerCase() === boardValue.toLowerCase());
            if (foundBoard) boardValue = foundBoard;
          }
          
          setEducation(prev => ({
            ...prev,
            twelfth: {
              ...prev.twelfth,
              board: boardValue,
              rollNumber: twelfthQual.rollNumber?.toString() || "",
              percentage: twelfthQual.percentage?.toString() || "",
              yearOfPassing: twelfthQual.yearOfPassing?.toString() || "",
              totalMarks: twelfthQual.totalMarks?.toString() || "",
              marksObtained: twelfthQual.marksObtained?.toString() || "",
              passingCertificateNo: twelfthQual.grade || "",
            }
          }));
        }
        
        const gradQual = qualifications.find((q: any) => q.level === "graduation");
        if (gradQual) {
          let courseValue = gradQual.degree || "";
          if (courseValue) {
            const foundCourse = graduationCourseNames.find(c => c.toLowerCase() === courseValue.toLowerCase());
            if (foundCourse) courseValue = foundCourse;
          }
          
          let specValue = gradQual.specialization || "";
          // const availableSubjects = subjectsList.length > 0 ? subjectsList : subjects;
          
          setEducation(prev => ({
            ...prev,
            graduation: {
              ...prev.graduation,
              graduationCourse: courseValue,
              university: gradQual.boardUniversity || "",
              passoutYear: gradQual.yearOfPassing?.toString() || "",
              percentage: gradQual.percentage?.toString() || "",
              specialization: specValue,
              totalMarks: gradQual.totalMarks?.toString() || "",
              marksObtained: gradQual.marksObtained?.toString() || "",
              passingCertificateNo: gradQual.grade || "",
            }
          }));
        }
        
        const pgQual = qualifications.find((q: any) => q.level === "post_graduation");
        if (pgQual) {
          let pgSubjectValue: string[] = [];
          // const availableSubjects = subjectsList.length > 0 ? subjectsList : subjects;
          if (pgQual.specialization) {
            pgSubjectValue = pgQual.specialization.split(',').map((s: string) => s.trim()).filter(Boolean);
          }
          
          setEducation(prev => ({
            ...prev,
            postGraduation: {
              ...prev.postGraduation,
              hasPostGraduation: true,
              university: pgQual.boardUniversity || "",
              passoutYear: pgQual.yearOfPassing?.toString() || "",
              percentage: pgQual.percentage?.toString() || "",
              subject: pgSubjectValue,
              totalMarks: pgQual.totalMarks?.toString() || "",
              marksObtained: pgQual.marksObtained?.toString() || "",
              passingCertificateNo: pgQual.grade || "",
            }
          }));
        }
        
        if (edu.experience?.hasExperience) {
          setEducation(prev => ({
            ...prev,
            experience: {
              ...prev.experience,
              hasExperience: true,
              durationYears: edu.experience.durationYears?.toString() || "",
              durationMonths: edu.experience.durationMonths?.toString() || "",
              organization: edu.experience.organization || "",
              designation: edu.experience.designation || "",
              dateOfJoining: edu.experience.dateOfJoining || "",
              relievingDate: edu.experience.relievingDate || "",
              experienceLetterNo: edu.experience.experienceLetterNo || "",
            }
          }));
        }
      }
      
      // Auto-fill post preferences - FIXED: Properly map post rankings
      if (data.steps?.postPreference) {
        const pp = data.steps.postPreference;
        setPostPreference({
          vacancyStream: pp.vacancyStream || "both",
          postRankings: {},
        });
        
        // Set post rankings - FIXED: Map from API response
        if (pp.postRankings && pp.postRankings.length > 0) {
          const rankings: { [key: number]: number } = {};
          pp.postRankings.forEach((ranking: any) => {
            rankings[ranking.postId] = ranking.priority;
          });
          setPostPreference(prev => ({
            ...prev,
            postRankings: rankings,
          }));
        }
      }
      
      // Auto-fill language selection
      if (data.steps?.languageSelection) {
        const ls = data.steps.languageSelection;
        
        let paperOneLang = ls.paperOneLanguage || "";
        let paperTwoLang = ls.paperTwoLanguage || "";
        let paperThreeLang = ls.paperThreeLanguage || "";
        
        if (paperOneLang && !["Hindi", "English"].includes(paperOneLang)) {
          paperOneLang = "English";
        }
        
        const validPaperTwo = [
          "Hindi Language & Literature",
          "English Language & Literature",
          "Sanskrit Language & Literature",
          "Urdu Language & Literature",
          "Bengali Language & Literature",
          "Santhali Language & Literature"
        ];
        if (paperTwoLang && !validPaperTwo.includes(paperTwoLang)) {
          paperTwoLang = "";
        }
        
        const validPaperThree = [
          "General Studies", "General Science", "Mathematics", "Physics",
          "Chemistry", "Zoology", "Botany", "Statistics", "Economics",
          "Commerce", "Geology", "Dairy Technology", "Fisheries Science",
          "Pharmacy", "Pharmaceutical Chemistry", "Ayurveda"
        ];
        if (paperThreeLang && !validPaperThree.includes(paperThreeLang)) {
          paperThreeLang = "";
        }
        
        setLanguageSelection({
          paperOneLanguage: paperOneLang,
          paperTwoLanguage: paperTwoLang,
          paperThreeLanguage: paperThreeLang,
        });
      }
      
      // NOTE: Documents cannot be auto-filled from URLs due to browser security
      // But you can show which documents are already uploaded in the review section
      // The documents state remains as is (all null for file inputs)
      
      // Set current step from API
      if (data.currentStep !== undefined && data.currentStep <= 7) {
        setCurrentStep(data.currentStep);
      }
    }
  } catch (error: any) {
    console.error("Error fetching application data:", error);
    if (error.response?.status !== 404) {
      toast.error(error.response?.data?.message || "Failed to load application data");
    }
  }
};

// Optional: Keep as fallback, but check if reviewData already exists
useEffect(() => {
  const fetchReviewData = async () => {
    // Only fetch if we don't already have review data
    if (currentStep === 7 && !reviewData && !loadingReview) {
      setLoadingReview(true);
      try {
        const response = await apiService.getApplicationSteps();
        if (response.data.success) {
          setReviewData(response.data.data);
          setApplicationId(response.data.data.applicationId);
        }
      } catch (error: any) {
        console.error("Error fetching review data:", error);
        toast.error(error.response?.data?.message || "Failed to load review data");
      } finally {
        setLoadingReview(false);
      }
    }
  };
  
  fetchReviewData();
}, [currentStep, reviewData]);

  // Fetch all API data on component mount
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        const subjectsResponse = await apiService.getSubjects();
        if (subjectsResponse.data.success) {
          const subjects = subjectsResponse.data.data.map((sub: Subject) => sub.subName);
          setSubjectsList(subjects);
        }

        const categoriesResponse = await apiService.getCategories();
        if (categoriesResponse.data.success) {
          setCategoriesList(categoriesResponse.data.data);
        }

        const countriesResponse = await apiService.getCountries();
        if (countriesResponse.data.success) {
          setCountriesList(countriesResponse.data.data);
          if (countriesResponse.data.data.length > 0) {
            const countryId = countriesResponse.data.data[0].countryId;
            const statesResponse = await apiService.getStatesByCountry(countryId);
            if (statesResponse.data.success) {
              setStatesList(statesResponse.data.data);
            }
          }
        }
        
        // Fetch and auto-fill application data after initial API data is loaded
        await fetchAndAutoFillData();
        setInitialDataLoaded(true);
      } catch (error) {
        console.error("Error fetching API data:", error);
        toast.error("Failed to load form data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // Add this after your other useEffects, before the renderStep function
useEffect(() => {
  // When on step 3 and we have reviewData with post preferences but no dynamic posts
  if (currentStep === 3 && reviewData?.steps?.postPreference?.postRankings && dynamicPosts.length === 0) {
    const savedRankings = reviewData.steps.postPreference.postRankings;
    if (savedRankings && savedRankings.length > 0) {
      // Extract posts from the rankings data
      const extractedPosts: Post[] = savedRankings.map((ranking: any) => ({
        postId: ranking.postId,
        postUserId: 0,
        catId: 0,
        eduId: 0,
        postTitle: ranking.postTitle || ranking.postName || `Post ${ranking.postId}`,
        postSlug: "",
        postContent: ranking.postContent || "",
        postPublish: 1,
        createdAt: "",
        updatedAt: ""
      }));
      setDynamicPosts(extractedPosts);
      
      // Also set the rankings
      const rankings: { [key: number]: number } = {};
      savedRankings.forEach((ranking: any) => {
        rankings[ranking.postId] = ranking.priority;
      });
      setPostPreference(prev => ({
        ...prev,
        vacancyStream: reviewData.steps.postPreference.vacancyStream || prev.vacancyStream,
        postRankings: rankings
      }));
    }
  }
}, [currentStep, reviewData, dynamicPosts.length]);

  // Fetch districts when permanent state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (personalInfo.permanentAddress.stateId) {
        try {
          const response = await apiService.getDistrictsByState(personalInfo.permanentAddress.stateId);
          if (response.data.success) {
            setPermanentDistricts(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      } else {
        setPermanentDistricts([]);
      }
    };
    fetchDistricts();
  }, [personalInfo.permanentAddress.stateId]);

  // Fetch districts when correspondence state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (personalInfo.correspondenceAddress.stateId && !personalInfo.sameAsPermanent) {
        try {
          const response = await apiService.getDistrictsByState(personalInfo.correspondenceAddress.stateId);
          if (response.data.success) {
            setCorrespondenceDistricts(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      } else {
        setCorrespondenceDistricts([]);
      }
    };
    fetchDistricts();
  }, [personalInfo.correspondenceAddress.stateId, personalInfo.sameAsPermanent]);

  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    setPersonalInfo({ ...personalInfo, dob, age });
    // Clear DOB error when user selects a date
  if (dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    if (calculatedAge >= 21) {
      setStepErrors(prev => ({ 
        ...prev, 
        [0]: { ...prev[0], dob: "" } 
      }));
    }
  } else {
    setStepErrors(prev => ({ 
      ...prev, 
      [0]: { ...prev[0], dob: "Date of birth is required" } 
    }));
  }
};

  const handlePermanentStateChange = (stateId: number, stateName: string) => {
    setPersonalInfo({
      ...personalInfo,
      permanentAddress: {
        ...personalInfo.permanentAddress,
        state: stateName,
        stateId: stateId,
        district: "",
        districtId: undefined,
      },
    });
  };

  const handlePermanentDistrictChange = (districtId: number, districtName: string) => {
    setPersonalInfo({
      ...personalInfo,
      permanentAddress: {
        ...personalInfo.permanentAddress,
        district: districtName,
        districtId: districtId,
      },
    });
  };

  const handleCorrespondenceStateChange = (stateId: number, stateName: string) => {
    setPersonalInfo({
      ...personalInfo,
      correspondenceAddress: {
        ...personalInfo.correspondenceAddress,
        state: stateName,
        stateId: stateId,
        district: "",
        districtId: undefined,
      },
    });
  };

  const handleCorrespondenceDistrictChange = (districtId: number, districtName: string) => {
    setPersonalInfo({
      ...personalInfo,
      correspondenceAddress: {
        ...personalInfo.correspondenceAddress,
        district: districtName,
        districtId: districtId,
      },
    });
  };

  // Add these with other API Data States
const [subjectsApiList, setSubjectsApiList] = useState<{ subjectId: number; subjectName: string }[]>([]);
const [degreesList, setDegreesList] = useState<{ degreeId: number; degreeName: string }[]>([]);
// Fetch all API data on component mount
useEffect(() => {
  const fetchApiData = async () => {
    setLoading(true);
    try {
      const subjectsResponse = await apiService.getSubjects();
      if (subjectsResponse.data.success) {
        const subjects = subjectsResponse.data.data.map((sub: Subject) => sub.subName);
        setSubjectsList(subjects);
        // Store the full subjects data with IDs
        setSubjectsApiList(subjectsResponse.data.data);
      }

      // Add degrees API call here
      const degreesResponse = await axios.get(`${API_BASE_URL}/degrees`, getAuthHeaders());
      if (degreesResponse.data.success) {
        setDegreesList(degreesResponse.data.data);
      }

      const categoriesResponse = await apiService.getCategories();
      if (categoriesResponse.data.success) {
        setCategoriesList(categoriesResponse.data.data);
      }

      // Add disabilities API call here
      const disabilitiesResponse = await axios.get(`${API_BASE_URL}/disabilities`, getAuthHeaders());
      if (disabilitiesResponse.data.success) {
        setDisabilitiesList(disabilitiesResponse.data.data);
      }

      const countriesResponse = await apiService.getCountries();
      if (countriesResponse.data.success) {
        setCountriesList(countriesResponse.data.data);
        if (countriesResponse.data.data.length > 0) {
          const countryId = countriesResponse.data.data[0].countryId;
          const statesResponse = await apiService.getStatesByCountry(countryId);
          if (statesResponse.data.success) {
            setStatesList(statesResponse.data.data);
          }
        }
      }
      
      // Fetch and auto-fill application data after initial API data is loaded
      await fetchAndAutoFillData();
      setInitialDataLoaded(true);
    } catch (error) {
      console.error("Error fetching API data:", error);
      toast.error("Failed to load form data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  fetchApiData();
}, []);
  
  // Add this state for file preview URLs if needed
const [filePreviewUrls, setFilePreviewUrls] = useState<{ [key: string]: string }>({});

// Add cleanup effect
useEffect(() => {
  return () => {
    // Cleanup all preview URLs when component unmounts
    Object.values(filePreviewUrls).forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
  };
}, []);

// Add this helper function
const validateFileSize = (file: File, maxSizeMB: number = 2): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    toast.error(`File size should be less than ${maxSizeMB}MB`);
    return false;
  }
  return true;
};




const validateFileType = (file: File, acceptedTypes: string[]): boolean => {
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!acceptedTypes.includes(fileExtension)) {
    toast.error(`Invalid file type. Accepted: ${acceptedTypes.join(', ')}`);
    return false;
  }
  return true;
};

const handleFileUpload = (field: keyof Documents, file: File | null) => {
  if (!file) {
    if (filePreviewUrls[field]) {
      URL.revokeObjectURL(filePreviewUrls[field]);
    }
    setDocuments({ ...documents, [field]: null });
    setFilePreviewUrls(prev => {
      const newState = { ...prev };
      delete newState[field];
      return newState;
    });
    return;
  }

  // Validate file type based on field
  let acceptedTypes: string[] = [];
  if (field === 'photo' || field === 'signature') {
    acceptedTypes = ['.jpg', '.jpeg', '.png'];
  } else {
    acceptedTypes = ['.pdf'];
  }

  if (!validateFileType(file, acceptedTypes)) {
    return;
  }

  if (!validateFileSize(file, 2)) {
    return;
  }

  // Clean up preview URL for old file
  if (filePreviewUrls[field]) {
    URL.revokeObjectURL(filePreviewUrls[field]);
  }

  // Create preview URL for image files
  if (file.type.startsWith('image/')) {
    const previewUrl = URL.createObjectURL(file);
    setFilePreviewUrls(prev => ({ ...prev, [field]: previewUrl }));
  }

  setDocuments({ ...documents, [field]: file });
};

// Add remove file function
const removeFile = (field: keyof Documents) => {
  if (filePreviewUrls[field]) {
    URL.revokeObjectURL(filePreviewUrls[field]);
  }
  setDocuments({ ...documents, [field]: null });
  setFilePreviewUrls(prev => {
    const newState = { ...prev };
    delete newState[field];
    return newState;
  });
  toast.info(`${field} removed`);
};

  const sendMobileOtp = () => {
    if (personalInfo.mobileNumber.length === 10) {
      setMobileOtpSent(true);
      toast.info(`OTP sent to ${personalInfo.mobileNumber}`);
    } else {
      toast.error("Please enter a valid 10-digit mobile number");
    }
  };

  const verifyMobileOtp = () => {
    setMobileOtpVerified(true);
    toast.success("Mobile number verified successfully!");
  };

  const sendEmailOtp = () => {
    if (personalInfo.emailId.includes("@")) {
      setEmailOtpSent(true);
      toast.info(`OTP sent to ${personalInfo.emailId}`);
    } else {
      toast.error("Please enter a valid email address");
    }
  };


  

  const calculateTotalFee = () => {
    let fee = 100;
    if (
      reservationCategory.mainCategory === "sc" ||
      reservationCategory.mainCategory === "st"
    ) {
      fee = 50;
    }
    if (reservationCategory.isPwd === "yes") {
      fee = 0;
    }
    return fee;
  };

  // Save Step 1 API call
  const saveStep1 = async () => {
    setSavingStep(true);

    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

    const payload = {
      personalInfo: {
        fullName,
        fathersName: personalInfo.fathersName,
        motherName: personalInfo.motherName,
        dob: personalInfo.dob,
        age: Number(personalInfo.age),
        gender: personalInfo.gender,
        nationality: personalInfo.nationality,
        aadharNumber: personalInfo.aadharNumber,
        identificationMark1: personalInfo.identificationMark1,
        identificationMark2: personalInfo.identificationMark2,
        mobileNumber: personalInfo.mobileNumber,
        alternateNumber: personalInfo.alternateNumber,
        emailId: personalInfo.emailId,
        permanentAddress: {
          street: personalInfo.permanentAddress.street,
          post: personalInfo.permanentAddress.post,
          state: personalInfo.permanentAddress.stateId ? String(personalInfo.permanentAddress.stateId) : "",
          district: personalInfo.permanentAddress.districtId ? String(personalInfo.permanentAddress.districtId) : "",
          pincode: personalInfo.permanentAddress.pincode,
          cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
        },
        sameAsPermanent: personalInfo.sameAsPermanent,
        correspondenceAddress: personalInfo.sameAsPermanent
          ? {
              street: personalInfo.permanentAddress.street,
              post: personalInfo.permanentAddress.post,
              // state: personalInfo.permanentAddress.stateId,
              // district: personalInfo.permanentAddress.districtId,
              state: personalInfo.correspondenceAddress.stateId ? String(personalInfo.correspondenceAddress.stateId) : "", // Send state ID as string
            district: personalInfo.correspondenceAddress.districtId ? String(personalInfo.correspondenceAddress.districtId) : "",
              pincode: personalInfo.permanentAddress.pincode,
              cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
            }
          : {
              street: personalInfo.correspondenceAddress.street,
              post: personalInfo.correspondenceAddress.post,
              state: personalInfo.correspondenceAddress.state,
              district: personalInfo.correspondenceAddress.district,
              pincode: personalInfo.correspondenceAddress.pincode,
              cityOrVillage: personalInfo.correspondenceAddress.cityOrVillage,
            },
      },
    };

    try {
      const response = await apiService.saveStep1(payload);
      if (response.data.success) {
        setApplicationId(response.data.data.applicationId);
        toast.success(response.data.message);
        setCurrentStep(currentStep + 1);
      }
    } catch (error: any) {
      console.error("Error saving step 1:", error);
      toast.error(error.response?.data?.message || "Failed to save personal information");
    } finally {
      setSavingStep(false);
    }
  };

  // Save Step 2 API call
const saveStep2 = async () => {
  setSavingStep(true);
  
  const payload = {
    reservationCategory: {
      mainCategory: reservationCategory.mainCategoryId || 0,
      subCategory: reservationCategory.subCategoryId || 0,
      categoryCertificateNumber: reservationCategory.categoryCertificateNumber,
      categoryCertificateAuthority: reservationCategory.categoryCertificateAuthority,
      isPwd: reservationCategory.isPwd === "yes",
      pwdType: reservationCategory.pwdTypeId || 0,
      pwdPercentage: reservationCategory.pwdPercentage,
      pwdCertificateNumber: reservationCategory.pwdCertificateNumber,
      pwdCertificateAuthority: reservationCategory.pwdCertificateAuthority,
      isExServiceman: reservationCategory.isExServiceman === "yes",
      exServicemanYears: reservationCategory.exServicemanYears,
      isSportsQuota: reservationCategory.isSportsQuota === "yes",
      sportsLevel: reservationCategory.sportsLevel,
      sportsAchievement: reservationCategory.sportsAchievement,
      sportsCertificateNumber: reservationCategory.sportsCertificateNumber,
      sportsCertificateAuthority: reservationCategory.sportsCertificateAuthority,
      isJharkhandDomicile: reservationCategory.isJharkhandDomicile === "yes",
      domicileCertificateNumber: reservationCategory.domicileCertificateNumber,
      domicileCertificateAuthority: reservationCategory.domicileCertificateAuthority,
      declaration: reservationCategory.declaration,
    },
  };

  try {
    const response = await apiService.saveStep2(payload);
    if (response.data.success) {
      toast.success(response.data.message);
      setCurrentStep(currentStep + 1);
    }
  } catch (error: any) {
    console.error("Error saving step 2:", error);
    toast.error(error.response?.data?.message || "Failed to save reservation details");
  } finally {
    setSavingStep(false);
  }
};

  // Save Step 3 API call
const saveStep3 = async () => {
  setSavingStep(true);
  
  const payload = {
    tenth: {
      board: education.tenth.board,
      percentage: education.tenth.percentage,
      totalMarks: education.tenth.totalMarks,
      marksObtained: education.tenth.marksObtained,
      passingCertificateNo: education.tenth.passingCertificateNo,
    },
    twelfth: {
      board: education.twelfth.board,
      percentage: education.twelfth.percentage,
      totalMarks: education.twelfth.totalMarks,
      marksObtained: education.twelfth.marksObtained,
      passingCertificateNo: education.twelfth.passingCertificateNo,
    },
    graduation: {
      graduationCourse: education.graduation.graduationCourseId || 0,
      university: education.graduation.university,
      percentage: education.graduation.percentage,
      specialization: education.graduation.specializationIds?.join(',') || '',
      totalMarks: education.graduation.totalMarks,
      marksObtained: education.graduation.marksObtained,
      passingCertificateNo: education.graduation.passingCertificateNo,
    },
    postGraduation: {
      hasPostGraduation: education.postGraduation.hasPostGraduation,
      university: education.postGraduation.university,
      percentage: education.postGraduation.percentage,
      subject: education.postGraduation.subjectIds?.join(',') || '',
      totalMarks: education.postGraduation.totalMarks,
      marksObtained: education.postGraduation.marksObtained,
      passingCertificateNo: education.postGraduation.passingCertificateNo,
    },
    experience: {
      hasExperience: education.experience.hasExperience,
      durationMonths: education.experience.durationMonths,
      durationYears: education.experience.durationYears,
      organization: education.experience.organization,
      designation: education.experience.designation,
      dateOfJoining: education.experience.dateOfJoining,
      relievingDate: education.experience.relievingDate,
      experienceLetterNo: education.experience.experienceLetterNo,
    },
  };

  try {
    const response = await apiService.saveStep3(payload);
    if (response.data.success) {
      toast.success(response.data.message);
      if (response.data.posts && response.data.posts.length > 0) {
        setDynamicPosts(response.data.posts);
        const initialRankings: { [key: number]: number } = {};
        response.data.posts.forEach((post: Post) => {
          initialRankings[post.postId] = 0;
        });
        setPostPreference(prev => ({
          ...prev,
          postRankings: initialRankings,
        }));
      }
      setCurrentStep(currentStep + 1);
    }
  } catch (error: any) {
    console.error("Error saving step 3:", error);
    toast.error(error.response?.data?.message || "Failed to save education details");
  } finally {
    setSavingStep(false);
  }
};

  // Save Step 4 API call (Language Selection)
  const saveStep4 = async () => {
    setSavingStep(true);

    const payload = {
      languageSelection: {
        paperOneLanguage: languageSelection.paperOneLanguage,
        paperTwoLanguage: languageSelection.paperTwoLanguage,
        paperThreeLanguage: languageSelection.paperThreeLanguage,
      },
    };

    try {
      const response = await apiService.saveStep4(payload);
      if (response.data.success) {
        toast.success(response.data.message);
        setCurrentStep(currentStep + 1);
      }
    } catch (error: any) {
      console.error("Error saving step 4:", error);
      toast.error(error.response?.data?.message || "Failed to save language selection");
    } finally {
      setSavingStep(false);
    }
  };

  // Save Step 5 API call (Documents)
  const saveStep5 = async () => {
    setSavingStep(true);

    try {
      const formData = new FormData();

      const documentKeys: (keyof Documents)[] = [
        "tenthMarksheet",
        "twelfthMarksheet",
        "graduationMarksheet",
        "postGraduationCertificate",
        "diplomaCertificate",
        "experienceCertificate",
        "contractualServiceCertificate",
        "ewsCertificate",
        "aadharCard",
        "signature",
        "photo",
        "domicileCertificate",
        "castCertificate",
        "sportsCertificate",
        "pwdCertificate",
      ];

      documentKeys.forEach((key) => {
        const file = documents[key];
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await apiService.saveStep5(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error("Error saving step 5:", error);
      toast.error(error.response?.data?.message || "Failed to save documents");
    } finally {
      setSavingStep(false);
    }
  };

  // Fetch all API data on component mount
useEffect(() => {
  const fetchApiData = async () => {
    setLoading(true);
    try {
      const subjectsResponse = await apiService.getSubjects();
      if (subjectsResponse.data.success) {
        const subjects = subjectsResponse.data.data.map((sub: Subject) => sub.subName);
        setSubjectsList(subjects);
      }

      const categoriesResponse = await apiService.getCategories();
      if (categoriesResponse.data.success) {
        setCategoriesList(categoriesResponse.data.data);
      }

      // Add disabilities API call here
      const disabilitiesResponse = await axios.get(`${API_BASE_URL}/disabilities`, getAuthHeaders());
      if (disabilitiesResponse.data.success) {
        setDisabilitiesList(disabilitiesResponse.data.data);
      }

      const countriesResponse = await apiService.getCountries();
      if (countriesResponse.data.success) {
        setCountriesList(countriesResponse.data.data);
        if (countriesResponse.data.data.length > 0) {
          const countryId = countriesResponse.data.data[0].countryId;
          const statesResponse = await apiService.getStatesByCountry(countryId);
          if (statesResponse.data.success) {
            setStatesList(statesResponse.data.data);
          }
        }
      }
      
      // Fetch and auto-fill application data after initial API data is loaded
      await fetchAndAutoFillData();
      setInitialDataLoaded(true);
    } catch (error) {
      console.error("Error fetching API data:", error);
      toast.error("Failed to load form data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  fetchApiData();
}, []);

  // Save Step 6 API call (Post Preferences)
  // const saveStep6 = async () => {
  //   setSavingStep(true);

  //   const postRankingsArray = Object.entries(postPreference.postRankings)
  //     .filter(([_, priority]) => priority !== 0)
  //     .map(([postId, priority]) => ({
  //       postId: Number(postId),
  //       priority: priority,
  //     }))
  //     .sort((a, b) => a.priority - b.priority);

  //   const isRegular = postPreference.vacancyStream === "regular" || postPreference.vacancyStream === "both";
  //   const isBacklog = postPreference.vacancyStream === "backlog" || postPreference.vacancyStream === "both";

  //   const payload = {
  //     postPreferences: {
  //       vacancyStream: postPreference.vacancyStream,
  //       isRegular: isRegular,
  //       isBacklog: isBacklog,
  //       postRankings: postRankingsArray,
  //     },
  //   };

  //   try {
  //     const response = await apiService.saveStep6(payload);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       setCurrentStep(currentStep + 1);
  //     }
  //   } catch (error: any) {
  //     console.error("Error saving step 6:", error);
  //     toast.error(error.response?.data?.message || "Failed to save post preferences");
  //   } finally {
  //     setSavingStep(false);
  //   }
  // };

  // Updated saveStep6 function
const saveStep6 = async () => {
  setSavingStep(true);

  const postRankingsArray = Object.entries(postPreference.postRankings)
    .filter(([_, priority]) => priority !== 0)
    .map(([postCode, priority]) => ({
      postCode: postCode,
      priority: priority,
    }))
    .sort((a, b) => a.priority - b.priority);

  const isRegular = postPreference.vacancyStream === "regular" || postPreference.vacancyStream === "both";
  const isBacklog = postPreference.vacancyStream === "backlog" || postPreference.vacancyStream === "both";

  const payload = {
    postPreferences: {
      vacancyStream: postPreference.vacancyStream,
      isRegular: isRegular,
      isBacklog: isBacklog,
      postRankings: postRankingsArray,
    },
  };

  try {
    const response = await apiService.saveStep6(payload);
    if (response.data.success) {
      toast.success(response.data.message);
      setCurrentStep(currentStep + 1);
    }
  } catch (error: any) {
    console.error("Error saving step 6:", error);
    toast.error(error.response?.data?.message || "Failed to save post preferences");
  } finally {
    setSavingStep(false);
  }
};

  const handleNext = () => {

     if (!validateCurrentStep()) {
    toast.error("Please fill all required fields correctly");
    return;
  }

    if (currentStep === 0) {
      saveStep1();
    } else if (currentStep === 1) {
      saveStep2();
    } else if (currentStep === 2) {
      saveStep3();
    } else if (currentStep === 3) {
      saveStep6();
    } else if (currentStep === 4) {
      saveStep4();
    } else if (currentStep === 5) {
      saveStep5();
    } else if (currentStep === 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = async () => {
  if (!applicationId) {
    toast.error("Application ID not found. Please save your progress first.");
    return;
  }

  setSavingStep(true);

  try {
    const response = await apiService.submitApplicationFinal(applicationId);

    if (response.data.success) {
      toast.success("Application submitted successfully!");

      setApplicationStatus({
        isSubmitted: true,
        registrationNumber:
          response.data.data?.applicationReferenceNumber ||
          "Application Submitted",
        submissionDate: new Date().toLocaleDateString(),
      });

      setIsSubmitted(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.error(response.data.message || "Failed to submit application");
    }
  } catch (error: any) {
    console.error("Error submitting application:", error);
    toast.error(
      error.response?.data?.message || "Failed to submit application"
    );
  } finally {
    setSavingStep(false);
  }
};

  const handleSaveDraft = () => {
    toast.success("Application form saved successfully");
  };

  const navigate = useNavigate();


  const getStateOptions = () => {
    return statesList.map(state => ({ id: state.stateId, name: state.stateName }));
  };

  const getPermanentDistrictOptions = () => {
    return permanentDistricts.map(district => ({ id: district.districtId, name: district.districtName }));
  };

  const getCorrespondenceDistrictOptions = () => {
    return correspondenceDistricts.map(district => ({ id: district.districtId, name: district.districtName }));
  };

  

  if (loading || !initialDataLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Loading application form...</p>
          </div>
        </div>
      </div>
    );
  }

 
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderReservationCategory();
      case 2:
        return renderEducationDetails();
      case 3:
        return renderPostPreference();
      case 4:
        return renderLanguageSelection();
      case 5:
        return renderDocuments();
      case 6:
        return renderFeePayment();
      case 7:
        return renderApplicationReview();
      default:
        return null;
    }
  };

  const renderPersonalInfo = () => {
    const errors = stepErrors[0] || {};
    return (
    <div className="space-y-8">
      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Basic Information
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Full Name (as per Matriculation Certificate)<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, firstName: value });
                // Clear error when user types
      if (value.trim()) {
        setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], firstName: "" } }));
      }
              }}
              onKeyDown={validateTextInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, lastName: value });
                if (value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], lastName: "" } }));
                }
              }}
              onKeyDown={validateTextInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
           {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Father's Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.fathersName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, fathersName: value });
                if (value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], fathersName: "" } }));
                }
              }}
              onKeyDown={validateTextInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
              {errors.fathersName && <p className="text-red-500 text-xs mt-1">{errors.fathersName}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Mother's Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.motherName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, motherName: value });
                if (value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], motherName: "" } }));
                }
              }}
              onKeyDown={validateTextInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Date of Birth <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={personalInfo.dob}
                min="1900-01-01"
                max="2026-12-31"
                onChange={handleDateOfBirthChange}
                 className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
          errors.dob ? 'border-red-500' : 'border-slate-300'
        }`}
              />
              {personalInfo.age > 0 && (
                <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">Age: {personalInfo.age} years</span>
                </div>
              )}
            </div>
             {errors.dob && (
      <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
    )}
    {personalInfo.dob && personalInfo.age < 21 && personalInfo.age > 0 && (
      <p className="text-red-500 text-xs mt-1">
        ⚠️ You must be at least 21 years old to apply. Current age: {personalInfo.age} years
      </p>
    )}
    <p className="text-xs text-slate-500">
      Minimum age requirement: 21 years as on the last date of application
    </p>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Gender<span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.gender}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, gender: e.target.value });
                if (e.target.value) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], gender: "" } }));
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Thirdgender</option>
            </select>
             {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Nationality <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.nationality}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, nationality: e.target.value });
                if (e.target.value) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], nationality: "" } }));
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              {countriesList.map((country) => (
                <option key={country.countryId} value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
              {countriesList.length === 0 && (
                <option value="Indian">--select Country--</option>
              )}
            </select>
             {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
          </div>
        </div>
      </div>

      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            Identification Details
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Identification Mark 1 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.identificationMark1}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, identificationMark1: e.target.value });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], identificationMark1: "" } }));
                }
              }}
              placeholder="e.g., Mole on left cheek"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.identificationMark1 && <p className="text-red-500 text-xs mt-1">{errors.identificationMark1}</p>}
            <p className="text-xs text-slate-500 mt-1">
              Mention any visible identification mark (mandatory)
            </p>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Identification Mark 2 <span className="text-slate-400 text-xs ml-1">(Optional)</span>
            </label>
            <input
              type="text"
              value={personalInfo.identificationMark2}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  identificationMark2: e.target.value,
                })
              }
              placeholder="e.g., Scar on right hand"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-slate-500 mt-1">
              Additional identification mark (if any)
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 flex items-center gap-2">
            <Info className="w-4 h-4" />
            These identification marks will be verified during the examination and document verification process.
          </p>
        </div>
      </div>

      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-primary" />
            Contact Details & Verification
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                maxLength={10}
                value={personalInfo.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setPersonalInfo({ ...personalInfo, mobileNumber: value });
                  if (value.length === 10) {
                    setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], mobileNumber: "" } }));
                  }
                }}
                onKeyDown={validateNumberInput}
                placeholder="9876543210"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              {!mobileOtpVerified ? (
                <button
                  onClick={sendMobileOtp}
                  disabled={mobileOtpSent}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm whitespace-nowrap disabled:opacity-50"
                >
                  {mobileOtpSent ? "OTP Sent" : "Send OTP"}
                </button>
              ) : (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm flex items-center gap-1">
                  <CheckCircle size={16} /> Verified
                </span>
              )}
            </div>
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
            {mobileOtpSent && !mobileOtpVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
                />
                <button
                  onClick={verifyMobileOtp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                >
                  Verify
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Aadhar Card Number (Preferred)
            </label>
            <input
              type="text"
              maxLength={12}
              value={personalInfo.aadharNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPersonalInfo({ ...personalInfo, aadharNumber: value });
              }}
              onKeyDown={validateNumberInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Email ID <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={personalInfo.emailId}
                 onChange={(e) => {
                  setPersonalInfo({ ...personalInfo, emailId: e.target.value });
                  if (e.target.value && e.target.value.includes('@')) {
                    setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], emailId: "" } }));
                  }
                }}
                placeholder="example@domain.com"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              {!emailOtpVerified ? (
                <button
                  onClick={sendEmailOtp}
                  disabled={emailOtpSent}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm whitespace-nowrap disabled:opacity-50"
                >
                  {emailOtpSent ? "OTP Sent" : "Send OTP"}
                </button>
              ) : (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm flex items-center gap-1">
                  <CheckCircle size={16} /> Verified
                </span>
              )}
            </div>
             {errors.emailId && <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>}
          </div>
        </div>
      </div>

      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Permanent Address
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              House No./Street <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.street}
              onChange={(e) => {
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, street: e.target.value },
                });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], permanentStreet: "" } }));
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
            {errors.permanentStreet && <p className="text-red-500 text-xs mt-1">{errors.permanentStreet}</p>}
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Village/City/Town <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.cityOrVillage}
              onChange={(e) => {
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, cityOrVillage: e.target.value },
                });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], permanentCity: "" } }));
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
            {errors.permanentCity && <p className="text-red-500 text-xs mt-1">{errors.permanentCity}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Post Office <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.post}
              onChange={(e) => {
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, post: e.target.value },
                });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], permanentPost: "" } }));
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
            {errors.permanentPost && <p className="text-red-500 text-xs mt-1">{errors.permanentPost}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              State <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.permanentAddress.stateId || ""}
              onChange={(e) => {
                const selectedState = statesList.find(s => s.stateId === Number(e.target.value));
                if (selectedState) {
                  handlePermanentStateChange(selectedState.stateId, selectedState.stateName);
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], permanentState: "" } }));
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Select State</option>
              {getStateOptions().map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.permanentState && <p className="text-red-500 text-xs mt-1">{errors.permanentState}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              District <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.permanentAddress.districtId || ""}
              onChange={(e) => {
                const selectedDistrict = permanentDistricts.find(d => d.districtId === Number(e.target.value));
                if (selectedDistrict) {
                  handlePermanentDistrictChange(selectedDistrict.districtId, selectedDistrict.districtName);
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], permanentDistrict: "" } }));
                }
              }}
              disabled={!personalInfo.permanentAddress.stateId}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
            >
              <option value="">Select District</option>
              {getPermanentDistrictOptions().map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.permanentDistrict && <p className="text-red-500 text-xs mt-1">{errors.permanentDistrict}</p>}
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Pincode <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={personalInfo.permanentAddress.pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, pincode: value },
                });
                if (value.length === 6) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], permanentPincode: "" } }));
                }
              }}
              onKeyDown={validateNumberInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
             {errors.permanentPincode && <p className="text-red-500 text-xs mt-1">{errors.permanentPincode}</p>}
          </div>
        </div>
      </div>

            <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Correspondence Address
          </h3>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="sameAsPermanent"
            checked={personalInfo.sameAsPermanent}
            onChange={(e) => {
              const isChecked = e.target.checked;
              if (isChecked) {
                setPersonalInfo({
                  ...personalInfo,
                  sameAsPermanent: true,
                  correspondenceAddress: {
                    street: personalInfo.permanentAddress.street,
                    post: personalInfo.permanentAddress.post,
                    district: personalInfo.permanentAddress.district,
                    districtId: personalInfo.permanentAddress.districtId,
                    state: personalInfo.permanentAddress.state,
                    stateId: personalInfo.permanentAddress.stateId,
                    pincode: personalInfo.permanentAddress.pincode,
                    cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
                  },
                });
                if (personalInfo.permanentAddress.stateId) {
                  const fetchCopiedDistricts = async () => {
                    try {
                      const response = await apiService.getDistrictsByState(personalInfo.permanentAddress.stateId!);
                      if (response.data.success) {
                        setCorrespondenceDistricts(response.data.data);
                      }
                    } catch (error) {
                      console.error("Error fetching districts for copied address:", error);
                    }
                  };
                  fetchCopiedDistricts();
                }
              } else {
                setPersonalInfo({
                  ...personalInfo,
                  sameAsPermanent: false,
                });
              }
            }}
            className="w-4 h-4 text-primary rounded"
          />
          <label htmlFor="sameAsPermanent" className="text-slate-700 font-medium cursor-pointer">
            Same as Permanent Address
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              House No./Street <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.correspondenceAddress.street}
              onChange={(e) => {
                setPersonalInfo({
                  ...personalInfo,
                  correspondenceAddress: { ...personalInfo.correspondenceAddress, street: e.target.value },
                });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], correspondenceStreet: "" } }));
                }
              }}
              disabled={personalInfo.sameAsPermanent}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${!personalInfo.sameAsPermanent && errors.correspondenceStreet ? 'border-red-500' : 'border-slate-300'}`}
            />
            {!personalInfo.sameAsPermanent && errors.correspondenceStreet && <p className="text-red-500 text-xs mt-1">{errors.correspondenceStreet}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Village/City/Town <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.correspondenceAddress.cityOrVillage}
              onChange={(e) => {
                setPersonalInfo({
                  ...personalInfo,
                  correspondenceAddress: { ...personalInfo.correspondenceAddress, cityOrVillage: e.target.value },
                });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], correspondenceCity: "" } }));
                }
              }}
              disabled={personalInfo.sameAsPermanent}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${!personalInfo.sameAsPermanent && errors.correspondenceCity ? 'border-red-500' : 'border-slate-300'}`}
            />
            {!personalInfo.sameAsPermanent && errors.correspondenceCity && <p className="text-red-500 text-xs mt-1">{errors.correspondenceCity}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Post Office <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.correspondenceAddress.post}
              onChange={(e) => {
                setPersonalInfo({
                  ...personalInfo,
                  correspondenceAddress: { ...personalInfo.correspondenceAddress, post: e.target.value },
                });
                if (e.target.value.trim()) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], correspondencePost: "" } }));
                }
              }}
              disabled={personalInfo.sameAsPermanent}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${!personalInfo.sameAsPermanent && errors.correspondencePost ? 'border-red-500' : 'border-slate-300'}`}
            />
            {!personalInfo.sameAsPermanent && errors.correspondencePost && <p className="text-red-500 text-xs mt-1">{errors.correspondencePost}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              State <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.correspondenceAddress.stateId || ""}
              onChange={(e) => {
                const selectedState = statesList.find(s => s.stateId === Number(e.target.value));
                if (selectedState) {
                  handleCorrespondenceStateChange(selectedState.stateId, selectedState.stateName);
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], correspondenceState: "" } }));
                }
              }}
              disabled={personalInfo.sameAsPermanent}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${!personalInfo.sameAsPermanent && errors.correspondenceState ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select State</option>
              {getStateOptions().map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {!personalInfo.sameAsPermanent && errors.correspondenceState && <p className="text-red-500 text-xs mt-1">{errors.correspondenceState}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              District <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.correspondenceAddress.districtId || ""}
              onChange={(e) => {
                const selectedDistrict = correspondenceDistricts.find(d => d.districtId === Number(e.target.value));
                if (selectedDistrict) {
                  handleCorrespondenceDistrictChange(selectedDistrict.districtId, selectedDistrict.districtName);
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], correspondenceDistrict: "" } }));
                }
              }}
              disabled={personalInfo.sameAsPermanent || !personalInfo.correspondenceAddress.stateId}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${!personalInfo.sameAsPermanent && errors.correspondenceDistrict ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select District</option>
              {getCorrespondenceDistrictOptions().map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {!personalInfo.sameAsPermanent && errors.correspondenceDistrict && <p className="text-red-500 text-xs mt-1">{errors.correspondenceDistrict}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Pincode <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={personalInfo.correspondenceAddress.pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPersonalInfo({
                  ...personalInfo,
                  correspondenceAddress: { ...personalInfo.correspondenceAddress, pincode: value },
                });
                if (value.length === 6) {
                  setStepErrors(prev => ({ ...prev, [0]: { ...prev[0], correspondencePincode: "" } }));
                }
              }}
              onKeyDown={validateNumberInput}
              disabled={personalInfo.sameAsPermanent}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${!personalInfo.sameAsPermanent && errors.correspondencePincode ? 'border-red-500' : 'border-slate-300'}`}
            />
            {!personalInfo.sameAsPermanent && errors.correspondencePincode && <p className="text-red-500 text-xs mt-1">{errors.correspondencePincode}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};




const renderReservationCategory = () => {
  const errors = stepErrors[1] || {};
  
  // Get main categories from API (parent categories)
  const mainCategories = categoriesList.filter(cat => cat.catParentId === null);
  
  // Get ST subcategories when ST is selected
  const stCategory = categoriesList.find(cat => cat.catName === "Scheduled Tribe (ST)");
  const stSubCategories = stCategory?.subCategories || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
          Category Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Reservation Category <span className="text-red-600">*</span>
            </label>
            <select
              value={reservationCategory.mainCategoryId || ""}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const selected = mainCategories.find(cat => cat.catId === selectedId);
                if (selected) {
                  setReservationCategory({
                    ...reservationCategory,
                    mainCategory: selected.catName,
                    mainCategoryId: selected.catId,
                    subCategory: "",
                    subCategoryId: undefined,
                  });
                  const fee = selected.catName === "Scheduled Caste (SC)" || selected.catName === "Scheduled Tribe (ST)" ? "50" : "100";
                  setFeePayment({ ...feePayment, applicationFee: fee });
                  if (selectedId) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], mainCategory: "" } }));
                  }
                }
              }}
              className={`w-full h-12 border rounded-lg px-4 ${errors.mainCategory ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select Category</option>
              {mainCategories.map((cat) => (
                <option key={cat.catId} value={cat.catId}>
                  {cat.catName}
                </option>
              ))}
            </select>
            {errors.mainCategory && <p className="text-red-500 text-xs mt-1">{errors.mainCategory}</p>}
          </div>
          
          {/* ST Sub Category - Only show when ST is selected */}
          {reservationCategory.mainCategory === "Scheduled Tribe (ST)" && stSubCategories.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Sub-Category (Primitive Tribe)
              </label>
              <select
                value={reservationCategory.subCategoryId || ""}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const selected = stSubCategories.find(sub => sub.catId === selectedId);
                  if (selected) {
                    setReservationCategory({
                      ...reservationCategory,
                      subCategory: selected.catName,
                      subCategoryId: selected.catId,
                    });
                  }
                }}
                className="w-full h-12 border border-slate-300 rounded-lg px-4"
              >
                <option value="">Select Sub-Category</option>
                {stSubCategories.map((sub) => (
                  <option key={sub.catId} value={sub.catId}>
                    {sub.catName}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Jharkhand Domicile Claim <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="domicile"
                  value="yes"
                  checked={reservationCategory.isJharkhandDomicile === "yes"}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, isJharkhandDomicile: e.target.value });
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], isJharkhandDomicile: "" } }));
                  }}
                  className="w-4 h-4 text-primary"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="domicile"
                  value="no"
                  checked={reservationCategory.isJharkhandDomicile === "no"}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, isJharkhandDomicile: e.target.value });
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], isJharkhandDomicile: "" } }));
                  }}
                  className="w-4 h-4 text-primary"
                />
                No
              </label>
            </div>
            {errors.isJharkhandDomicile && <p className="text-red-500 text-xs mt-1">{errors.isJharkhandDomicile}</p>}
          </div>
        </div>
        
        {/* Category Certificate Fields - Shows when a reserved category is selected (not UR/EWS) */}
        {reservationCategory.mainCategoryId && ![1, 8].includes(reservationCategory.mainCategoryId) && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Category Certificate Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={reservationCategory.categoryCertificateNumber}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, categoryCertificateNumber: e.target.value });
                  if (e.target.value) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], categoryCertificateNumber: "" } }));
                  }
                }}
                placeholder="Enter Category Certificate Number"
                className={`w-full px-4 py-2 border rounded-lg ${errors.categoryCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.categoryCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.categoryCertificateNumber}</p>}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Issue Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={reservationCategory.categoryCertificateIssueDate}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, categoryCertificateIssueDate: e.target.value });
                  if (e.target.value) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], categoryCertificateIssueDate: "" } }));
                  }
                }}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg ${errors.categoryCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.categoryCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.categoryCertificateIssueDate}</p>}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Issuing Authority <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={reservationCategory.categoryCertificateAuthority}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, categoryCertificateAuthority: e.target.value });
                  if (e.target.value) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], categoryCertificateAuthority: "" } }));
                  }
                }}
                placeholder="Enter Certificate Issuing Authority (e.g., Tehsildar, District Magistrate)"
                className={`w-full px-4 py-2 border rounded-lg ${errors.categoryCertificateAuthority ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.categoryCertificateAuthority && <p className="text-red-500 text-xs mt-1">{errors.categoryCertificateAuthority}</p>}
            </div>
          </>
        )}
        
        {/* Domicile Certificate Fields - Shows when Domicile is Yes */}
        {reservationCategory.isJharkhandDomicile === "yes" && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Domicile Certificate Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={reservationCategory.domicileCertificateNumber}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, domicileCertificateNumber: e.target.value });
                  if (e.target.value) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], domicileCertificateNumber: "" } }));
                  }
                }}
                placeholder="Enter Domicile Certificate Number"
                className={`w-full px-4 py-2 border rounded-lg ${errors.domicileCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.domicileCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificateNumber}</p>}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Issue Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={reservationCategory.domicileCertificateIssueDate}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, domicileCertificateIssueDate: e.target.value });
                  if (e.target.value) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], domicileCertificateIssueDate: "" } }));
                  }
                }}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg ${errors.domicileCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.domicileCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificateIssueDate}</p>}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Issuing Authority <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={reservationCategory.domicileCertificateAuthority}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, domicileCertificateAuthority: e.target.value });
                  if (e.target.value) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], domicileCertificateAuthority: "" } }));
                  }
                }}
                placeholder="Enter Certificate Issuing Authority (e.g., Circle Officer, District Magistrate)"
                className={`w-full px-4 py-2 border rounded-lg ${errors.domicileCertificateAuthority ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.domicileCertificateAuthority && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificateAuthority}</p>}
            </div>
          </>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
          Physical Handicap (PwD) Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Physically Handicapped?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pwd"
                  value="yes"
                  checked={reservationCategory.isPwd === "yes"}
                  onChange={(e) => {
                    setReservationCategory({
                      ...reservationCategory,
                      isPwd: e.target.value,
                    });
                    if (e.target.value === "yes") {
                      setFeePayment({ ...feePayment, applicationFee: "0" });
                    } else {
                      const fee = reservationCategory.mainCategory === "Scheduled Caste (SC)" || reservationCategory.mainCategory === "Scheduled Tribe (ST)" ? "50" : "100";
                      setFeePayment({ ...feePayment, applicationFee: fee });
                    }
                  }}
                  className="w-4 h-4 text-primary"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pwd"
                  value="no"
                  checked={reservationCategory.isPwd === "no"}
                  onChange={(e) => {
                    setReservationCategory({
                      ...reservationCategory,
                      isPwd: e.target.value,
                    });
                    const fee = reservationCategory.mainCategory === "Scheduled Caste (SC)" || reservationCategory.mainCategory === "Scheduled Tribe (ST)" ? "50" : "100";
                    setFeePayment({ ...feePayment, applicationFee: fee });
                  }}
                  className="w-4 h-4 text-primary"
                />
                No
              </label>
            </div>
          </div>
          
          {reservationCategory.isPwd === "yes" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Type of Disability <span className="text-red-600">*</span>
                </label>
                <select
                  value={reservationCategory.pwdTypeId || ""}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selected = disabilitiesList.find(d => d.id === selectedId);
                    if (selected) {
                      setReservationCategory({ 
                        ...reservationCategory, 
                        pwdTypeId: selectedId,
                        pwdType: selected.name
                      });
                      if (selectedId) {
                        setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], pwdType: "" } }));
                      }
                    }
                  }}
                  className={`w-full h-12 border rounded-lg px-4 ${errors.pwdType ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select Type</option>
                  {disabilitiesList.map((disability) => (
                    <option key={disability.id} value={disability.id}>
                      {disability.name}
                    </option>
                  ))}
                </select>
                {errors.pwdType && <p className="text-red-500 text-xs mt-1">{errors.pwdType}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Disability Percentage (%) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.pwdPercentage}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setReservationCategory({ ...reservationCategory, pwdPercentage: value });
                    if (value && parseInt(value) >= 40) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], pwdPercentage: "" } }));
                    }
                  }}
                  onKeyDown={validateNumberInput}
                  maxLength={2}
                  placeholder="Should be ≥ 40% to claim benefit"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.pwdPercentage ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.pwdPercentage && <p className="text-red-500 text-xs mt-1">{errors.pwdPercentage}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  PwD Certificate Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.pwdCertificateNumber}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, pwdCertificateNumber: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], pwdCertificateNumber: "" } }));
                    }
                  }}
                  placeholder="Enter PwD Certificate Number"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.pwdCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.pwdCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.pwdCertificateNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Issue Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={reservationCategory.pwdCertificateIssueDate}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, pwdCertificateIssueDate: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], pwdCertificateIssueDate: "" } }));
                    }
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.pwdCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.pwdCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.pwdCertificateIssueDate}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Issuing Authority <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.pwdCertificateAuthority}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, pwdCertificateAuthority: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], pwdCertificateAuthority: "" } }));
                    }
                  }}
                  placeholder="Enter Certificate Issuing Authority (e.g., Medical Board, Civil Surgeon)"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.pwdCertificateAuthority ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.pwdCertificateAuthority && <p className="text-red-500 text-xs mt-1">{errors.pwdCertificateAuthority}</p>}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
          Ex-Serviceman Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Ex-Serviceman?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="exService"
                  value="yes"
                  checked={reservationCategory.isExServiceman === "yes"}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, isExServiceman: e.target.value });
                    if (e.target.value === "yes") {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], exServicemanYears: "" } }));
                    }
                  }}
                  className="w-4 h-4 text-primary"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="exService"
                  value="no"
                  checked={reservationCategory.isExServiceman === "no"}
                  onChange={(e) => setReservationCategory({ ...reservationCategory, isExServiceman: e.target.value })}
                  className="w-4 h-4 text-primary"
                />
                No
              </label>
            </div>
          </div>
          
          {reservationCategory.isExServiceman === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Years of Service (0-30) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                min={0}
                max={30}
                value={reservationCategory.exServicemanYears}
                onChange={(e) => {
                  const value = e.target.value === "" ? "" : String(Math.min(30, Math.max(0, Number(e.target.value))));
                  setReservationCategory({ ...reservationCategory, exServicemanYears: value });
                  if (value && parseInt(value) >= 0 && parseInt(value) <= 30) {
                    setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], exServicemanYears: "" } }));
                  }
                }}
                placeholder="0-30"
                className={`w-full px-4 py-2 border rounded-lg ${errors.exServicemanYears ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.exServicemanYears && <p className="text-red-500 text-xs mt-1">{errors.exServicemanYears}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
          Sports Quota Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Claim Sports Quota? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sports"
                  value="yes"
                  checked={reservationCategory.isSportsQuota === "yes"}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, isSportsQuota: e.target.value });
                    if (e.target.value === "yes") {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], sportsLevel: "", sportsAchievement: "" } }));
                    }
                  }}
                  className="w-4 h-4 text-primary"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sports"
                  value="no"
                  checked={reservationCategory.isSportsQuota === "no"}
                  onChange={(e) => setReservationCategory({ ...reservationCategory, isSportsQuota: e.target.value })}
                  className="w-4 h-4 text-primary"
                />
                No
              </label>
            </div>
          </div>
          
          {reservationCategory.isSportsQuota === "yes" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Sports Level <span className="text-red-600">*</span>
                </label>
                <select
                  value={reservationCategory.sportsLevel}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsLevel: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], sportsLevel: "" } }));
                    }
                  }}
                  className={`w-full h-12 border rounded-lg px-4 ${errors.sportsLevel ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select Level</option>
                  <option value="international">International</option>
                  <option value="national">National</option>
                  <option value="state">State</option>
                </select>
                {errors.sportsLevel && <p className="text-red-500 text-xs mt-1">{errors.sportsLevel}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Achievement Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={reservationCategory.sportsAchievement}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsAchievement: e.target.value });
                    if (e.target.value.trim()) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], sportsAchievement: "" } }));
                    }
                  }}
                  rows={2}
                  placeholder="Describe your achievements..."
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sportsAchievement ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.sportsAchievement && <p className="text-red-500 text-xs mt-1">{errors.sportsAchievement}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Sports Certificate Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.sportsCertificateNumber}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsCertificateNumber: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], sportsCertificateNumber: "" } }));
                    }
                  }}
                  placeholder="Enter Sports Certificate Number"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sportsCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.sportsCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.sportsCertificateNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Issue Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={reservationCategory.sportsCertificateIssueDate}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsCertificateIssueDate: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], sportsCertificateIssueDate: "" } }));
                    }
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sportsCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.sportsCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.sportsCertificateIssueDate}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Issuing Authority <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.sportsCertificateAuthority}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsCertificateAuthority: e.target.value });
                    if (e.target.value) {
                      setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], sportsCertificateAuthority: "" } }));
                    }
                  }}
                  placeholder="Enter Certificate Issuing Authority (e.g., Sports Authority, District Sports Officer)"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sportsCertificateAuthority ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.sportsCertificateAuthority && <p className="text-red-500 text-xs mt-1">{errors.sportsCertificateAuthority}</p>}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={reservationCategory.declaration}
            onChange={(e) => {
              setReservationCategory({ ...reservationCategory, declaration: e.target.checked });
              if (e.target.checked) {
                setStepErrors(prev => ({ ...prev, [1]: { ...prev[1], declaration: "" } }));
              }
            }}
            className="mt-1 w-5 h-5 border-slate-300 rounded text-primary shrink-0"
          />
          <span className="text-sm font-medium text-slate-700 leading-6">
            I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that providing false information may lead to cancellation of my application.{" "}
            <span className="text-red-500 font-bold">*</span>
          </span>
        </label>
        {errors.declaration && <p className="text-red-500 text-xs mt-2 ml-9">{errors.declaration}</p>}
      </div>
    </div>
  );
};


const renderEducationDetails = () => {
  const errors = stepErrors[2] || {};
  
  // Get degree options for dropdown
  const degreeOptions = degreesList.map(degree => degree.degreeName);
  
  return (
    <div className="space-y-8">
      {/* 10th Education */}
      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            10th / SSC Education
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Board Name <span className="text-red-600">*</span>
            </label>
            <SearchableDropdown
              options={boards}
              value={education.tenth.board}
              onChange={(value) => {
                setEducation({ ...education, tenth: { ...education.tenth, board: value } });
                if (value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], tenthBoard: "" } }));
              }}
              placeholder="Select Board"
              required
            />
            {errors.tenthBoard && <p className="text-red-500 text-xs mt-1">{errors.tenthBoard}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Total Marks <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.tenth.totalMarks}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, tenth: { ...education.tenth, totalMarks: value } });
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 500"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Marks Obtained 
            </label>
            <input
              type="text"
              value={education.tenth.marksObtained}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, tenth: { ...education.tenth, marksObtained: value } });
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 450"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage (%) / CGPA <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.tenth.percentage}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setEducation({ ...education, tenth: { ...education.tenth, percentage: value } });
                if (value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], tenthMarks: "" } }));
              }}
              placeholder="e.g., 82.5"
              className={`w-full px-4 py-2 border rounded-lg ${errors.tenthMarks ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.tenthMarks && <p className="text-red-500 text-xs mt-1">{errors.tenthMarks}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Passing Certificate No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.tenth.passingCertificateNo}
              onChange={(e) => {
                setEducation({ ...education, tenth: { ...education.tenth, passingCertificateNo: e.target.value } });
                if (e.target.value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], tenthCertificate: "" } }));
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.tenthCertificate ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.tenthCertificate && <p className="text-red-500 text-xs mt-1">{errors.tenthCertificate}</p>}
          </div>
        </div>
      </div>

      {/* 12th Education */}
      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            12th / HSC Education
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Board Name <span className="text-red-600">*</span>
            </label>
            <SearchableDropdown
              options={boards}
              value={education.twelfth.board}
              onChange={(value) => {
                setEducation({ ...education, twelfth: { ...education.twelfth, board: value } });
                if (value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], twelfthBoard: "" } }));
              }}
              placeholder="Select Board"
            />
            {errors.twelfthBoard && <p className="text-red-500 text-xs mt-1">{errors.twelfthBoard}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Total Marks
            </label>
            <input
              type="text"
              value={education.twelfth.totalMarks}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, twelfth: { ...education.twelfth, totalMarks: value } });
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 500"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Marks Obtained
            </label>
            <input
              type="text"
              value={education.twelfth.marksObtained}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, twelfth: { ...education.twelfth, marksObtained: value } });
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 450"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage (%) <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.twelfth.percentage}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setEducation({ ...education, twelfth: { ...education.twelfth, percentage: value } });
                if (value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], twelfthMarks: "" } }));
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.twelfthMarks ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.twelfthMarks && <p className="text-red-500 text-xs mt-1">{errors.twelfthMarks}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Passing Certificate No.
            </label>
            <input
              type="text"
              value={education.twelfth.passingCertificateNo}
              onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, passingCertificateNo: e.target.value } })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Graduation Education */}
      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Graduation Education
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Course Name <span className="text-red-600">*</span>
            </label>
            <SearchableDropdown
              options={degreeOptions}
              value={(() => {
                const foundDegree = degreesList.find(d => d.degreeId === education.graduation.graduationCourseId);
                return foundDegree ? foundDegree.degreeName : education.graduation.graduationCourse;
              })()}
              onChange={(value) => {
                const selectedDegree = degreesList.find(d => d.degreeName === value);
                setEducation({ 
                  ...education, 
                  graduation: { 
                    ...education.graduation, 
                    graduationCourse: value,
                    graduationCourseId: selectedDegree?.degreeId 
                  } 
                });
                if (value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], graduationCourse: "" } }));
              }}
              placeholder="Select Course"
              required
            />
            {errors.graduationCourse && <p className="text-red-500 text-xs mt-1">{errors.graduationCourse}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              University Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.graduation.university}
              onChange={(e) => {
                setEducation({ ...education, graduation: { ...education.graduation, university: e.target.value } });
                if (e.target.value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], graduationUniversity: "" } }));
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.graduationUniversity ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.graduationUniversity && <p className="text-red-500 text-xs mt-1">{errors.graduationUniversity}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Total Marks <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.graduation.totalMarks}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, graduation: { ...education.graduation, totalMarks: value } });
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 3000"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Marks Obtained <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.graduation.marksObtained}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, graduation: { ...education.graduation, marksObtained: value } });
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 2400"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage/CGPA <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.graduation.percentage}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setEducation({ ...education, graduation: { ...education.graduation, percentage: value } });
                if (value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], graduationMarks: "" } }));
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.graduationMarks ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.graduationMarks && <p className="text-red-500 text-xs mt-1">{errors.graduationMarks}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Specialization/Subject <span className="text-red-600">*</span>
            </label>
            <MultiSelectDropdown
              options={subjectsApiList.map(s => s.subjectName)}
              values={(() => {
                if (education.graduation.specializationIds && education.graduation.specializationIds.length > 0) {
                  return education.graduation.specializationIds
                    .map(id => subjectsApiList.find(s => s.subjectId === id)?.subjectName)
                    .filter(Boolean) as string[];
                }
                return education.graduation.specialization ? education.graduation.specialization.split(",").map((item) => item.trim()).filter(Boolean) : [];
              })()}
              onChange={(values) => {
                const selectedIds = values
                  .map(name => subjectsApiList.find(s => s.subjectName === name)?.subjectId)
                  .filter(id => id !== undefined) as number[];
                setEducation({ 
                  ...education, 
                  graduation: { 
                    ...education.graduation, 
                    specialization: values.join(", "),
                    specializationIds: selectedIds
                  } 
                });
                if (values.length > 0) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], graduationSpecialization: "" } }));
              }}
              placeholder="Select Subject(s)"
            />
            {errors.graduationSpecialization && <p className="text-red-500 text-xs mt-1">{errors.graduationSpecialization}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Passing Certificate No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.graduation.passingCertificateNo}
              onChange={(e) => {
                setEducation({ ...education, graduation: { ...education.graduation, passingCertificateNo: e.target.value } });
                if (e.target.value) setStepErrors(prev => ({ ...prev, [2]: { ...prev[2], graduationCertificate: "" } }));
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.graduationCertificate ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.graduationCertificate && <p className="text-red-500 text-xs mt-1">{errors.graduationCertificate}</p>}
          </div>
        </div>
      </div>

      {/* Post-Graduation Qualification */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={education.postGraduation.hasPostGraduation}
            onChange={(e) =>
              setEducation({
                ...education,
                postGraduation: { ...education.postGraduation, hasPostGraduation: e.target.checked },
              })
            }
            className="w-4 h-4 text-primary rounded"
          />
          <span className="font-semibold text-slate-800">Post-Graduation Qualification</span>
        </label>
        {education.postGraduation.hasPostGraduation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                University/College Name
              </label>
              <input
                type="text"
                value={education.postGraduation.university}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, university: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>
              <MultiSelectDropdown
                options={subjectsApiList.map(s => s.subjectName)}
                values={(() => {
                  if (education.postGraduation.subjectIds && education.postGraduation.subjectIds.length > 0) {
                    return education.postGraduation.subjectIds
                      .map(id => subjectsApiList.find(s => s.subjectId === id)?.subjectName)
                      .filter(Boolean) as string[];
                  }
                  return education.postGraduation.subject;
                })()}
                onChange={(values) => {
                  const selectedIds = values
                    .map(name => subjectsApiList.find(s => s.subjectName === name)?.subjectId)
                    .filter(id => id !== undefined) as number[];
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, subject: values, subjectIds: selectedIds },
                  });
                }}
                placeholder="Select Subject(s)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Marks
              </label>
              <input
                type="text"
                value={education.postGraduation.totalMarks}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, totalMarks: value },
                  });
                }}
                onKeyDown={validateNumberInput}
                placeholder="e.g., 2000"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Marks Obtained
              </label>
              <input
                type="text"
                value={education.postGraduation.marksObtained}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, marksObtained: value },
                  });
                }}
                onKeyDown={validateNumberInput}
                placeholder="e.g., 1600"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Percentage
              </label>
              <input
                type="text"
                value={education.postGraduation.percentage}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, percentage: value },
                  });
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Passing Certificate No.
              </label>
              <input
                type="text"
                value={education.postGraduation.passingCertificateNo}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, passingCertificateNo: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* Post-Qualification Experience */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={education.experience.hasExperience}
            onChange={(e) =>
              setEducation({
                ...education,
                experience: { ...education.experience, hasExperience: e.target.checked },
              })
            }
            className="w-4 h-4 text-primary rounded"
          />
          <span className="font-semibold text-slate-800">Post-Qualification Experience</span>
        </label>
        {education.experience.hasExperience && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={education.experience.organization}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    experience: { ...education.experience, organization: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={education.experience.designation}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    experience: { ...education.experience, designation: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date of Joining
              </label>
              <input
                type="date"
                value={education.experience.dateOfJoining}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    experience: { ...education.experience, dateOfJoining: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Relieving Date
              </label>
              <input
                type="date"
                value={education.experience.relievingDate}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    experience: { ...education.experience, relievingDate: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years
                  </label>
                  <SearchableDropdown
                    options={yearsRange}
                    value={education.experience.durationYears}
                    onChange={(value) =>
                      setEducation({
                        ...education,
                        experience: { ...education.experience, durationYears: value },
                      })
                    }
                    placeholder="Select Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Months
                  </label>
                  <SearchableDropdown
                    options={months}
                    value={education.experience.durationMonths}
                    onChange={(value) =>
                      setEducation({
                        ...education,
                        experience: { ...education.experience, durationMonths: value },
                      })
                    }
                    placeholder="Select Months"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Experience Letter No.
              </label>
              <input
                type="text"
                value={education.experience.experienceLetterNo}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    experience: { ...education.experience, experienceLetterNo: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// const renderPostPreference = () => {
//   const errors = stepErrors[3] || {};
  
//   // Helper function - OK to be here (not a Hook)
//   const getAvailablePriorities = (currentPostId: number) => {
//     const usedPriorities = Object.entries(postPreference.postRankings)
//       .filter(([id, priority]) => Number(id) !== currentPostId && priority !== 0)
//       .map(([, priority]) => priority);
    
//     const totalPosts = postsToShow.length;
//     const allPriorities = Array.from({ length: totalPosts }, (_, i) => i + 1);
//     return allPriorities.filter(p => !usedPriorities.includes(p));
//   };

//   // Event handler - OK to be here (not a Hook)
//   const handlePriorityChange = (postId: number, priority: number) => {
//     const isPriorityUsed = Object.entries(postPreference.postRankings)
//       .some(([id, p]) => Number(id) !== postId && p === priority);
    
//     if (isPriorityUsed && priority !== 0) {
//       toast.error(`Priority ${priority} is already selected for another post. Please choose a different priority.`);
//       return;
//     }
    
//     setPostPreference({
//       ...postPreference,
//       postRankings: { ...postPreference.postRankings, [postId]: priority },
//     });
    
//     // Clear error when user starts assigning priorities
//     if (priority !== 0 && Object.values(postPreference.postRankings).filter(p => p !== 0).length + 1 === postsToShow.length) {
//       setStepErrors(prev => ({ ...prev, [3]: {} }));
//     } else if (priority === 0) {
//       setStepErrors(prev => ({ ...prev, [3]: { ...prev[3], postRankings: "Please assign priorities to all posts" } }));
//     }
//   };

//   const postsToShow = dynamicPosts.length > 0 ? dynamicPosts : [];
//   const postsAvailable = postsToShow.length;
//   const allPrioritiesAssigned = postsAvailable > 0 && Object.values(postPreference.postRankings).every(p => p !== 0);

//   // Return JSX - OK (no Hooks)
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
//             Post Preference Selection
//           </h3>
//           <p className="text-sm text-slate-500 mt-1">
//             Based on your educational qualifications, we have identified the following posts for which you are eligible. Please rank them in order of priority.
//           </p>
//         </div>

//         <section className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-6 w-1 bg-primary rounded-full"></div>
//             <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
//               1. Vacancy Stream Selection
//             </h4>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
//               <div className="flex justify-between items-start">
//                 <h3 className="font-bold text-slate-800">Regular Vacancy</h3>
//                 <input
//                   type="radio"
//                   name="vacancy_stream"
//                   value="regular"
//                   checked={postPreference.vacancyStream === "regular"}
//                   onChange={(e) =>
//                     setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                   }
//                   className="w-4 h-4 accent-primary"
//                 />
//               </div>
//               <p className="text-xs text-slate-500 mt-2">Standard recruitment cycle for fresh posts.</p>
//             </label>

//             <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
//               <div className="flex justify-between items-start">
//                 <h3 className="font-bold text-slate-800">Backlog Vacancy</h3>
//                 <input
//                   type="radio"
//                   name="vacancy_stream"
//                   value="backlog"
//                   checked={postPreference.vacancyStream === "backlog"}
//                   onChange={(e) =>
//                     setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                   }
//                   className="w-4 h-4 accent-primary"
//                 />
//               </div>
//               <p className="text-xs text-slate-500 mt-2">Unfilled posts from previous recruitment years.</p>
//             </label>

//             <label className="border-2 border-primary bg-primary/5 rounded-lg p-4 cursor-pointer md:col-span-2 transition-all">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-bold text-primary">Both (Recommended)</h3>
//                 </div>
//                 <input
//                   type="radio"
//                   name="vacancy_stream"
//                   value="both"
//                   checked={postPreference.vacancyStream === "both"}
//                   onChange={(e) =>
//                     setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                   }
//                   className="w-4 h-4 accent-primary"
//                 />
//               </div>
//               <p className="text-xs text-primary/80 mt-2">Apply for all available opportunities across both streams.</p>
//             </label>
//           </div>
//         </section>

//         <section>
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//             <div className="flex items-center gap-3">
//               <div className="h-6 w-1 bg-primary rounded-full"></div>
//               <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
//                 2. Ranking Eligible Posts
//               </h4>
//             </div>
//             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
//               {postsAvailable} Posts Available
//             </span>
//           </div>

//           <p className="text-xs text-slate-500 mb-4 italic">
//             Select priority number from dropdown (1 = highest priority). Each priority number can be used only once.
//             {postsAvailable > 0 && ` You have ${postsAvailable} posts to rank from 1 to ${postsAvailable}.`}
//           </p>

//           {/* Error message for post rankings */}
//           {errors.postRankings && postsAvailable > 0 && (
//             <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
//               <p className="text-xs text-red-700 flex items-center gap-2">
//                 <AlertCircle size={14} />
//                 {errors.postRankings}
//               </p>
//             </div>
//           )}

//           {postsAvailable === 0 ? (
//             <div className="text-center py-8 bg-slate-50 rounded-lg">
//               <p className="text-slate-500">No posts available based on your qualifications.</p>
//               <p className="text-xs text-slate-400 mt-2">Please complete your education details first.</p>
//             </div>
//           ) : (
//             <div className={`space-y-3 ${errors.postRankings ? 'border-2 border-red-500 rounded-xl p-3' : ''}`}>
//               {postsToShow.map((post, index) => {
//                 const currentPriority = postPreference.postRankings[post.postId] || 0;
//                 const availablePriorities = getAvailablePriorities(post.postId);
                
//                 return (
//                   <div
//                     key={post.postId}
//                     className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex items-center gap-3 shrink-0">
//                       <span className="text-sm font-bold text-slate-400 w-6">{index + 1}.</span>
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-bold text-slate-800 truncate">{post.postTitle}</h4>
//                       <p className="text-xs text-slate-500 truncate mt-0.5">{post.postContent}</p>
//                     </div>

//                     <div className="shrink-0 ml-2">
//                       <select
//                         value={currentPriority}
//                         onChange={(e) => handlePriorityChange(post.postId, parseInt(e.target.value))}
//                         className={`w-32 h-12 border rounded-lg text-center font-bold text-primary focus:border-primary outline-none px-2 ${
//                           currentPriority === 0 ? 'border-red-300 bg-red-50' : 'border-slate-300'
//                         }`}
//                       >
//                         <option value={0}>Select Priority</option>
//                         {availablePriorities.map((priority) => (
//                           <option key={priority} value={priority}>
//                             Priority {priority}
//                           </option>
//                         ))}
//                         {currentPriority !== 0 && !availablePriorities.includes(currentPriority) && (
//                           <option value={currentPriority} disabled>
//                             Priority {currentPriority} (Already selected)
//                           </option>
//                         )}
//                       </select>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
          
//           {postsAvailable > 0 && !allPrioritiesAssigned && (
//             <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//               <p className="text-xs text-amber-800 flex items-center gap-2">
//                 <AlertCircle size={14} />
//                 Please assign priorities to all {postsAvailable} posts before proceeding. Each post must have a unique priority from 1 to {postsAvailable}.
//               </p>
//             </div>
//           )}
          
//           {postsAvailable > 0 && allPrioritiesAssigned && (
//             <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-xs text-green-800 flex items-center gap-2">
//                 <CheckCircle size={14} />
//                 All priorities have been assigned! You can proceed to the next step.
//               </p>
//             </div>
//           )}
//         </section>
//       </div>

//       <aside className="space-y-6">
//         <div className="bg-primary rounded-lg p-6 text-white shadow-lg">
//           <div className="flex items-center gap-2 mb-5">
//             <Info size={20} className="text-emerald-300" />
//             <h3 className="text-base font-bold uppercase tracking-wider">Selection Rules</h3>
//           </div>
//           <ul className="text-sm space-y-4 list-disc pl-5 opacity-90 leading-relaxed">
//             <li>Preferences once locked cannot be changed after the final submission of the form.</li>
//             <li>Ranking must be unique for each post (e.g., you cannot have two posts with same priority).</li>
//             <li>Allocations will be made strictly based on Merit and the Preferences provided here.</li>
//             <li>Check the physical and medical criteria for specific posts in the official brochure.</li>
//           </ul>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm text-center">
//           <div className="w-12 h-12 bg-emerald-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
//             <HelpCircle size={24} />
//           </div>
//           <h4 className="text-sm font-bold text-slate-800">Need Help?</h4>
//           <p className="text-xs text-slate-500 mt-2 mb-5 leading-normal">
//             Contact the recruitment helpdesk for clarification on post duties and eligibility.
//           </p>
//           <button className="w-full flex items-center justify-center gap-2 h-12 bg-transparent border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
//             <FileText size={16} />
//             Read Full Advertisement
//           </button>
//         </div>
//       </aside>
//     </div>
//   );
// };

// Updated renderPostPreference function
const renderPostPreference = () => {
  const errors = stepErrors[3] || {};
  
  // Helper function - OK to be here (not a Hook)
  const getAvailablePriorities = (currentPostCode: string) => {
    const usedPriorities = Object.entries(postPreference.postRankings)
      .filter(([code, priority]) => code !== currentPostCode && priority !== 0)
      .map(([, priority]) => priority);
    
    const totalPosts = postsToShow.length;
    const allPriorities = Array.from({ length: totalPosts }, (_, i) => i + 1);
    return allPriorities.filter(p => !usedPriorities.includes(p));
  };

  // Event handler - OK to be here (not a Hook)
  const handlePriorityChange = (postCode: string, priority: number) => {
    const isPriorityUsed = Object.entries(postPreference.postRankings)
      .some(([code, p]) => code !== postCode && p === priority);
    
    if (isPriorityUsed && priority !== 0) {
      toast.error(`Priority ${priority} is already selected for another post. Please choose a different priority.`);
      return;
    }
    
    setPostPreference({
      ...postPreference,
      postRankings: { ...postPreference.postRankings, [postCode]: priority },
    });
    
    // Clear error when user starts assigning priorities
    if (priority !== 0 && Object.values(postPreference.postRankings).filter(p => p !== 0).length + 1 === postsToShow.length) {
      setStepErrors(prev => ({ ...prev, [3]: {} }));
    } else if (priority === 0) {
      setStepErrors(prev => ({ ...prev, [3]: { ...prev[3], postRankings: "Please assign priorities to all posts" } }));
    }
  };

  // Use postsList from API
  const postsToShow = postsList.length > 0 ? postsList : [];
  const postsAvailable = postsToShow.length;
  const allPrioritiesAssigned = postsAvailable > 0 && Object.values(postPreference.postRankings).every(p => p !== 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
            Post Preference Selection
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Please rank the following posts in order of your preference. 
            {eligiblePosts.length > 0 && (
              <span className="block mt-1 text-amber-600">
                Note: You are eligible for {eligiblePosts.length} specific post(s) based on your qualifications.
              </span>
            )}
          </p>
        </div>

        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1 bg-primary rounded-full"></div>
            <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
              1. Vacancy Stream Selection
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800">Regular Vacancy</h3>
                <input
                  type="radio"
                  name="vacancy_stream"
                  value="regular"
                  checked={postPreference.vacancyStream === "regular"}
                  onChange={(e) =>
                    setPostPreference({ ...postPreference, vacancyStream: e.target.value })
                  }
                  className="w-4 h-4 accent-primary"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Standard recruitment cycle for fresh posts.</p>
            </label>

            <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800">Backlog Vacancy</h3>
                <input
                  type="radio"
                  name="vacancy_stream"
                  value="backlog"
                  checked={postPreference.vacancyStream === "backlog"}
                  onChange={(e) =>
                    setPostPreference({ ...postPreference, vacancyStream: e.target.value })
                  }
                  className="w-4 h-4 accent-primary"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Unfilled posts from previous recruitment years.</p>
            </label>

            <label className="border-2 border-primary bg-primary/5 rounded-lg p-4 cursor-pointer md:col-span-2 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-primary">Both (Recommended)</h3>
                </div>
                <input
                  type="radio"
                  name="vacancy_stream"
                  value="both"
                  checked={postPreference.vacancyStream === "both"}
                  onChange={(e) =>
                    setPostPreference({ ...postPreference, vacancyStream: e.target.value })
                  }
                  className="w-4 h-4 accent-primary"
                />
              </div>
              <p className="text-xs text-primary/80 mt-2">Apply for all available opportunities across both streams.</p>
            </label>
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-primary rounded-full"></div>
              <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
                2. Ranking Posts
              </h4>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
              {postsAvailable} Posts Available
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-4 italic">
            Select priority number from dropdown (1 = highest priority). Each priority number can be used only once.
            {postsAvailable > 0 && ` You have ${postsAvailable} posts to rank from 1 to ${postsAvailable}.`}
          </p>

          {/* Error message for post rankings */}
          {errors.postRankings && postsAvailable > 0 && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={14} />
                {errors.postRankings}
              </p>
            </div>
          )}

          {postsAvailable === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-lg">
              <p className="text-slate-500">No posts available at the moment.</p>
              <p className="text-xs text-slate-400 mt-2">Please check back later or contact support.</p>
            </div>
          ) : (
            <div className={`space-y-3 ${errors.postRankings ? 'border-2 border-red-500 rounded-xl p-3' : ''}`}>
              {postsToShow.map((post, index) => {
                const currentPriority = postPreference.postRankings[post.postCode] || 0;
                const availablePriorities = getAvailablePriorities(post.postCode);
                const isEligible = eligiblePosts.some((ep: any) => ep.postCode === post.postCode);
                
                return (
                  <div
                    key={post.postCode}
                    className={`flex items-center gap-4 bg-white border rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow ${
                      isEligible ? 'border-green-300 bg-green-50/30' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-bold text-slate-400 w-8">{index + 1}.</span>
                      {isEligible && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Eligible
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {post.postName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Post Code: {post.postCode}
                      </p>
                    </div>

                    <div className="shrink-0 ml-2">
                      <select
                        value={currentPriority}
                        onChange={(e) => handlePriorityChange(post.postCode, parseInt(e.target.value))}
                        className={`w-32 h-12 border rounded-lg text-center font-bold text-primary focus:border-primary outline-none px-2 ${
                          currentPriority === 0 ? 'border-red-300 bg-red-50' : 'border-slate-300'
                        }`}
                      >
                        <option value={0}>Select Priority</option>
                        {availablePriorities.map((priority) => (
                          <option key={priority} value={priority}>
                            Priority {priority}
                          </option>
                        ))}
                        {currentPriority !== 0 && !availablePriorities.includes(currentPriority) && (
                          <option value={currentPriority} disabled>
                            Priority {currentPriority} (Already selected)
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {postsAvailable > 0 && !allPrioritiesAssigned && (
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle size={14} />
                Please assign priorities to all {postsAvailable} posts before proceeding. Each post must have a unique priority from 1 to {postsAvailable}.
              </p>
            </div>
          )}
          
          {postsAvailable > 0 && allPrioritiesAssigned && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-800 flex items-center gap-2">
                <CheckCircle size={14} />
                All priorities have been assigned! You can proceed to the next step.
              </p>
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-6">
        <div className="bg-primary rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-5">
            <Info size={20} className="text-emerald-300" />
            <h3 className="text-base font-bold uppercase tracking-wider">Selection Rules</h3>
          </div>
          <ul className="text-sm space-y-4 list-disc pl-5 opacity-90 leading-relaxed">
            <li>Preferences once locked cannot be changed after the final submission of the form.</li>
            <li>Ranking must be unique for each post (e.g., you cannot have two posts with same priority).</li>
            <li>Allocations will be made strictly based on Merit and the Preferences provided here.</li>
            <li>Check the physical and medical criteria for specific posts in the official brochure.</li>
            <li>Eligible posts are marked with "Eligible" badge based on your qualifications.</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={24} />
          </div>
          <h4 className="text-sm font-bold text-slate-800">Need Help?</h4>
          <p className="text-xs text-slate-500 mt-2 mb-5 leading-normal">
            Contact the recruitment helpdesk for clarification on post duties and eligibility.
          </p>
          <button className="w-full flex items-center justify-center gap-2 h-12 bg-transparent border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
            <FileText size={16} />
            Read Full Advertisement
          </button>
        </div>
      </aside>
    </div>
  );
};


const renderLanguageSelection = () => {
  const errors = stepErrors[4] || {};
  const paperOneOptions = ["Hindi", "English"];
  const paperTwoOptions = [
    "Hindi Language & Literature",
    "English Language & Literature",
    "Sanskrit Language & Literature",
    "Urdu Language & Literature",
    "Bengali Language & Literature",
    "Santhali Language & Literature",
  ];
  const paperThreeOptions = [
    "General Studies", "General Science", "Mathematics", "Physics",
    "Chemistry", "Zoology", "Botany", "Statistics", "Economics",
    "Commerce", "Geology", "Dairy Technology", "Fisheries Science",
    "Pharmacy", "Pharmaceutical Chemistry", "Ayurveda",
  ];

  return (
    <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
      <div className="absolute -top-4 left-5 bg-white px-3">
        <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          Language Selection for Examination
        </h3>
      </div>
      <div className="space-y-6 mt-4">
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Paper-I Language <span className="text-red-600">*</span>
          </label>
          <select
            value={languageSelection.paperOneLanguage}
            onChange={(e) => {
              setLanguageSelection({ ...languageSelection, paperOneLanguage: e.target.value });
              if (e.target.value) setStepErrors(prev => ({ ...prev, [4]: { ...prev[4], paperOneLanguage: "" } }));
            }}
            className={`w-full px-4 py-2 border rounded-lg ${errors.paperOneLanguage ? 'border-red-500' : 'border-slate-300'}`}
          >
            <option value="">Select Language</option>
            {paperOneOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          {errors.paperOneLanguage && <p className="text-red-500 text-xs mt-1">{errors.paperOneLanguage}</p>}
        </div>
        
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Paper-II Language/Subject <span className="text-red-600">*</span>
          </label>
          <select
            value={languageSelection.paperTwoLanguage}
            onChange={(e) => {
              setLanguageSelection({ ...languageSelection, paperTwoLanguage: e.target.value });
              if (e.target.value) setStepErrors(prev => ({ ...prev, [4]: { ...prev[4], paperTwoLanguage: "" } }));
            }}
            className={`w-full px-4 py-2 border rounded-lg ${errors.paperTwoLanguage ? 'border-red-500' : 'border-slate-300'}`}
          >
            <option value="">Select Language</option>
            {paperTwoOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          {errors.paperTwoLanguage && <p className="text-red-500 text-xs mt-1">{errors.paperTwoLanguage}</p>}
        </div>
        
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Paper-III Subject Selection <span className="text-red-600">*</span>
          </label>
          <select
            value={languageSelection.paperThreeLanguage}
            onChange={(e) => {
              setLanguageSelection({ ...languageSelection, paperThreeLanguage: e.target.value });
              if (e.target.value) setStepErrors(prev => ({ ...prev, [4]: { ...prev[4], paperThreeLanguage: "" } }));
            }}
            className={`w-full px-4 py-2 border rounded-lg ${errors.paperThreeLanguage ? 'border-red-500' : 'border-slate-300'}`}
          >
            <option value="">Select Subject</option>
            {paperThreeOptions.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          {errors.paperThreeLanguage && <p className="text-red-500 text-xs mt-1">{errors.paperThreeLanguage}</p>}
        </div>
      </div>
    </div>
  );
};

 
  const renderFeePayment = () => {
  const totalFee = calculateTotalFee();
  let applicableFeeText = "";
  if (reservationCategory.isPwd === "yes") {
    applicableFeeText = "PwD Candidates (Fee: ₹0)";
  } else if (reservationCategory.mainCategory === "sc" || reservationCategory.mainCategory === "st") {
    applicableFeeText = "SC / ST (Fee: ₹50)";
  } else {
    applicableFeeText = "UR / EWS / OBC-II / EBC-I (Fee: ₹100)";
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Calculated Examination Fee
                </h3>
                <p className="text-sm text-slate-500">
                  Based on your selected category and disability status.
                </p>
              </div>
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {feePayment.paymentStatus}
              </span>
            </div>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-primary">
                ₹{totalFee}.00
              </span>
              <span className="text-sm text-slate-500 ml-2">
                (Rupees {totalFee} Only)
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg grid grid-cols-2 gap-4 p-4">
              <div>
                <span className="block text-xs font-bold text-slate-500">
                  Candidate Category
                </span>
                <span className="font-bold text-slate-800">
                  {reservationCategory.mainCategory || "Not Selected"}
                </span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-500">
                  PwD Status
                </span>
                <span className="font-bold text-slate-800">
                  {reservationCategory.isPwd === "yes" ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Applicable Fee: <strong>{applicableFeeText}</strong>
              </p>
              <div className="mt-2 text-xs text-blue-700">
                <p>Fee Structure:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>UR / EWS / OBC-II / EBC-I: ₹100</li>
                  <li>SC / ST: ₹50</li>
                  <li>PwD Candidates: ₹0</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-primary uppercase mb-5">
              Choose Payment Method
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`border-2 rounded-lg p-5 flex flex-col items-center text-center cursor-not-allowed transition-all ${feePayment.paymentMode === "online" ? "border-primary bg-primary/5" : "border-slate-300"}`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="online"
                  checked={feePayment.paymentMode === "online"}
                  onChange={(e) =>
                    setFeePayment({
                      ...feePayment,
                      paymentMode: e.target.value,
                    })
                  }
                  className="sr-only"
                  disabled
                />
                <CreditCard size={28} className="text-primary mb-3" />
                <span className="text-sm font-bold text-primary">
                  Pay Online
                </span>
                <span className="text-xs text-slate-500">
                  Net Banking, Card, UPI
                </span>
              </label>
            </div>
          </div>
          {feePayment.paymentMode && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 mb-4">
                Payment Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={feePayment.bankName}
                    onChange={(e) =>
                      setFeePayment({
                        ...feePayment,
                        bankName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg bg-slate-100"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Transaction ID *
                  </label>
                  <input
                    type="text"
                    value={feePayment.transactionId}
                    onChange={(e) =>
                      setFeePayment({
                        ...feePayment,
                        transactionId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg bg-slate-100"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Payment Date *
                  </label>
                  <input
                    type="date"
                    value={feePayment.paymentDate}
                    onChange={(e) =>
                      setFeePayment({
                        ...feePayment,
                        paymentDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg bg-slate-100"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-slate-800 mb-3">
              Supported Gateways
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["SBI", "HDFC", "ICICI", "PAYTM"].map((g, i) => (
                <div
                  key={i}
                  className="h-10 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg flex items-center justify-center"
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-emerald-300" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
                Important Instructions
              </h4>
            </div>
            <ul className="text-xs space-y-3 list-disc pl-4 text-slate-300">
              <li>
                Wait for 24 hours after registration to initiate payment.
              </li>
              <li>Do not refresh the page during transaction.</li>
              <li>Keep Transaction ID for future correspondence.</li>
            </ul>
          </div>
          <div className="bg-sky-50 rounded-2xl p-4 flex justify-between items-center">
            <div className="flex gap-3">
              <div className="p-2 bg-primary text-white rounded-lg">
                <HelpCircle size={18} />
              </div>
              <div>
                <h5 className="text-sm font-bold text-primary">
                  Payment Issues?
                </h5>
                <p className="text-xs text-primary/70">
                  Support 10 AM - 6 PM
                </p>
              </div>
            </div>
            <button className="h-10 px-4 bg-white border border-sky-200 text-primary text-xs font-bold rounded-lg opacity-50 cursor-not-allowed" disabled>
              Call Help Desk
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() =>
            setFeePayment({ ...feePayment, paymentStatus: "completed" })
          }
          className="h-14 px-12 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl flex items-center gap-2 opacity-50 cursor-not-allowed"
          disabled
        >
          Proceed to Payment <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

// const renderFeePayment = () => {
//   let applicableFeeText = "";
  
//   if (isExServicemanSelected) {
//     applicableFeeText = "Ex-Serviceman (Fee: ₹0)";
//   } else if (isPwdSelected) {
//     applicableFeeText = "PwD Candidates (Fee: ₹0)";
//   } else if (isSCST) {
//     applicableFeeText = "SC / ST (Fee: ₹50)";
//   } else {
//     applicableFeeText = "UR / EWS / OBC-II / EBC-I (Fee: ₹100)";
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//             <div className="flex justify-between">
//               <div>
//                 <h3 className="text-xl font-bold text-slate-800">
//                   Calculated Examination Fee
//                 </h3>
//                 <p className="text-sm text-slate-500">
//                   Based on your selected category and disability status.
//                 </p>
//               </div>
//               <span className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
//                 paymentHook.paymentStatus === "completed" ? "bg-green-600" : "bg-primary"
//               }`}>
//                 {paymentHook.paymentStatus === "completed" ? "PAID" : "PENDING"}
//               </span>
//             </div>
//             <div className="my-6">
//               <span className="text-4xl font-extrabold text-primary">
//                 ₹{finalFee}.00
//               </span>
//               <span className="text-sm text-slate-500 ml-2">
//                 (Rupees {finalFee} Only)
//               </span>
//             </div>
//             <div className="bg-slate-50 rounded-lg grid grid-cols-2 gap-4 p-4">
//               <div>
//                 <span className="block text-xs font-bold text-slate-500">
//                   Candidate Category
//                 </span>
//                 <span className="font-bold text-slate-800">
//                   {reservationCategory.mainCategory || "Not Selected"}
//                 </span>
//               </div>
//               <div>
//                 <span className="block text-xs font-bold text-slate-500">
//                   PwD Status
//                 </span>
//                 <span className="font-bold text-slate-800">
//                   {isPwdSelected ? "Yes" : "No"}
//                 </span>
//               </div>
//               <div>
//                 <span className="block text-xs font-bold text-slate-500">
//                   Ex-Serviceman Status
//                 </span>
//                 <span className="font-bold text-slate-800">
//                   {isExServicemanSelected ? "Yes" : "No"}
//                 </span>
//               </div>
//             </div>
//             <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//               <p className="text-sm font-medium text-blue-800">
//                 Applicable Fee: <strong>{applicableFeeText}</strong>
//               </p>
//               <div className="mt-2 text-xs text-blue-700">
//                 <p>Fee Structure:</p>
//                 <ul className="list-disc pl-5 mt-1">
//                   <li>UR / EWS / OBC-II / EBC-I: ₹100</li>
//                   <li>SC / ST: ₹50</li>
//                   <li>PwD Candidates: ₹0</li>
//                   <li>Ex-Serviceman: ₹0</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//             <h4 className="text-xs font-bold text-primary uppercase mb-5">
//               Choose Payment Method
//             </h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <label
//                 className={`border-2 rounded-lg p-5 flex flex-col items-center text-center transition-all ${
//                   paymentHook.isProcessing ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-primary"
//                 } ${
//                   feePayment.paymentMode === "online" ? "border-primary bg-primary/5" : "border-slate-300"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="payment_method"
//                   value="online"
//                   checked={feePayment.paymentMode === "online"}
//                   onChange={(e) =>
//                     setFeePayment({
//                       ...feePayment,
//                       paymentMode: e.target.value,
//                     })
//                   }
//                   className="sr-only"
//                   disabled={paymentHook.isProcessing || paymentHook.paymentStatus === "completed"}
//                 />
//                 <CreditCard size={28} className="text-primary mb-3" />
//                 <span className="text-sm font-bold text-primary">
//                   Pay Online
//                 </span>
//                 <span className="text-xs text-slate-500">
//                   Net Banking, Card, UPI
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white border border-slate-200 rounded-2xl p-5">
//             <h4 className="text-xs font-bold text-slate-800 mb-3">
//               Supported Gateways
//             </h4>
//             <div className="grid grid-cols-3 gap-2">
//               {["Razorpay", "SBI", "HDFC", "ICICI", "PAYTM", "UPI"].map((g, i) => (
//                 <div
//                   key={i}
//                   className="h-10 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg flex items-center justify-center"
//                 >
//                   {g}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-2xl p-5 text-white">
//             <div className="flex items-center gap-2 mb-4">
//               <Info size={18} className="text-emerald-300" />
//               <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
//                 Important Instructions
//               </h4>
//             </div>
//             <ul className="text-xs space-y-3 list-disc pl-4 text-slate-300">
//               <li>Payment is mandatory to complete your application.</li>
//               <li>Do not refresh the page during transaction.</li>
//               <li>Keep Transaction ID for future correspondence.</li>
//               <li>After successful payment, your application will be submitted automatically.</li>
//             </ul>
//           </div>

//           <div className="bg-sky-50 rounded-2xl p-4 flex justify-between items-center">
//             <div className="flex gap-3">
//               <div className="p-2 bg-primary text-white rounded-lg">
//                 <HelpCircle size={18} />
//               </div>
//               <div>
//                 <h5 className="text-sm font-bold text-primary">
//                   Payment Issues?
//                 </h5>
//                 <p className="text-xs text-primary/70">
//                   Support 10 AM - 6 PM
//                 </p>
//               </div>
//             </div>
//             <button className="h-10 px-4 bg-white border border-sky-200 text-primary text-xs font-bold rounded-lg">
//               Call Help Desk
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         {paymentHook.paymentStatus !== "completed" ? (
//           <button
//             onClick={paymentHook.handlePayment}
//             disabled={paymentHook.isProcessing || !feePayment.paymentMode || paymentHook.paymentStatus === "completed"}
//             className="h-14 px-12 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {paymentHook.isProcessing ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 Processing...
//               </>
//             ) : finalFee === 0 ? (
//               "Submit Application"
//             ) : (
//               <>
//                 Proceed to Payment <ExternalLink size={16} />
//               </>
//             )}
//           </button>
//         ) : (
//           <div className="flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-xl">
//             <CheckCircle size={20} />
//             <span className="font-semibold">Payment Completed! Application Submitted.</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

  
const renderDocuments = () => {
  const getDocumentFields = () => {
    const baseFields = [
      { key: "photo", label: "Passport Size Photograph", required: true, type: "image", size: "20KB-50KB", accept: ".jpg,.jpeg,.png" },
      { key: "signature", label: "Signature Scan", required: true, type: "image", size: "10KB-20KB", accept: ".jpg,.jpeg,.png" },
      { key: "tenthMarksheet", label: "10th Marksheet", required: true, type: "pdf", size: "100KB-500KB", accept: ".pdf" },
      { key: "twelfthMarksheet", label: "12th Marksheet", required: true, type: "pdf", size: "100KB-500KB", accept: ".pdf" },
      { key: "graduationMarksheet", label: "Graduation Degree Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" },
      { key: "aadharCard", label: "Aadhar Card", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" },
    ];

    if (reservationCategory.isJharkhandDomicile === "yes") {
      baseFields.push({ key: "domicileCertificate", label: "Domicile Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    if (["ews", "economically_weaker_section_(ews)"].includes(reservationCategory.mainCategory)) {
      baseFields.push({ key: "ewsCertificate", label: "EWS Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    if (reservationCategory.mainCategory && !["unreserved", "unreserved_(ur)", "ews", "economically_weaker_section_(ews)"].includes(reservationCategory.mainCategory)) {
      baseFields.push({ key: "castCertificate", label: "Caste Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    if (education.postGraduation.hasPostGraduation) {
      baseFields.push({ key: "postGraduationCertificate", label: "Post-Graduation Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
   
    
    if (education.experience.hasExperience) {
      baseFields.push({ key: "experienceCertificate", label: "Experience Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    
    
    if (reservationCategory.isPwd === "yes") {
      baseFields.push({ key: "pwdCertificate", label: "Disability Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    if (reservationCategory.isSportsQuota === "yes") {
      baseFields.push({ key: "sportsCertificate", label: "Sports Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }

    return baseFields;
  };

  const documentFields = getDocumentFields();
  
  // Get already uploaded documents from reviewData
  const uploadedDocsFromApi = reviewData?.steps?.documents || {};

  return (
    <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
      <div className="absolute -top-4 left-5 bg-white px-3">
        <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          Upload Documents
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {documentFields.map((field) => {
          const uploadedFile = documents[field.key as keyof Documents];
          const previewUrl = filePreviewUrls[field.key];
          const isImage = field.type === "image";
          const alreadyUploadedUrl = uploadedDocsFromApi[field.key];
          
          return (
            <div key={field.key} className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  accept={field.accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error(`${field.label} size should be less than 2MB`);
                        return;
                      }
                      handleFileUpload(field.key as keyof Documents, file);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                />
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-3 hover:border-primary transition-all min-h-[100px]">
                  {uploadedFile ? (
                    <div className="flex flex-col items-center justify-center text-center gap-2">
                      {isImage && previewUrl ? (
                        <div className="relative">
                          <img 
                            src={previewUrl} 
                            alt={field.label}
                            className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(field.key as keyof Documents);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <FileText className="w-8 h-8 text-green-500" />
                          <p className="text-xs font-medium text-green-700 truncate max-w-[200px]">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(field.key as keyof Documents);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  ) : alreadyUploadedUrl ? (
                    <div className="flex flex-col items-center justify-center text-center gap-2">
                      <FileCheck className="w-8 h-8 text-blue-500" />
                      <p className="text-xs font-medium text-blue-700 truncate max-w-[200px]">
                        Already uploaded
                      </p>
                      <a 
                        href={alreadyUploadedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-primary underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View current document
                      </a>
                      <p className="text-xs text-amber-600">
                        Click to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <FileText className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-xs text-slate-500">Click to upload</p>
                      <p className="text-xs text-slate-400 mt-1">{field.size}</p>
                      <p className="text-xs text-slate-400">Format: {field.accept}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-amber-50 rounded-xl">
        <p className="text-xs text-amber-800">
          <strong>Important:</strong> Ensure all documents are clear and
          legible. Maximum file size: 2MB per document.
        </p>
      </div>
    </div>
  );
};



const renderApplicationReview = () => {
  if (loadingReview) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading review data...</p>
        </div>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-600">No review data available.</p>
      </div>
    );
  }

  const { steps } = reviewData;
  const personalInfoData = steps.personalInfo;
  const reservationData = steps.reservationCategory;
  const educationData = steps.education;
  const postPreferenceData = steps.postPreference;
  const languageData = steps.languageSelection;

  // Find qualification by level
  const findQualification = (level: string) => {
    return educationData?.qualifications?.find((q: any) => q.level === level);
  };

  const tenthQual = findQualification("matriculation");
  const twelfthQual = findQualification("intermediate");
  const graduationQual = findQualification("graduation");

  // Get post titles from rankings
  const getPostTitle = (postId: number) => {
    const post = dynamicPosts.find(p => p.postId === postId);
    return post ? post.postTitle : `Post ID: ${postId}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border-l-4 border-primary p-4 rounded-lg flex items-start gap-3">
        <AlertCircle size={18} className="text-primary shrink-0" />
        <p className="text-sm font-medium text-slate-700">
          Please review your application details carefully. Once submitted,
          certain information cannot be modified.
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <User size={18} />
            <h3>Personal Details</h3>
          </div>
          <button
            onClick={() => setCurrentStep(0)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Full Name</span>
            <span className="font-semibold">
              {personalInfoData?.firstName} {personalInfoData?.lastName || ""}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Father's Name</span>
            <span className="font-semibold">{personalInfoData?.fatherName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Mother's Name</span>
            <span className="font-semibold">{personalInfoData?.motherName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Date of Birth</span>
            <span className="font-semibold">{personalInfoData?.dateOfBirth?.split('T')[0]}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Age</span>
            <span className="font-semibold">{personalInfoData?.age} years</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Gender</span>
            <span className="font-semibold capitalize">{personalInfoData?.gender}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Mobile Number</span>
            <span className="font-semibold">{personalInfoData?.mobileNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Alternate Mobile</span>
            <span className="font-semibold">{personalInfoData?.alternateNumber || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Email ID</span>
            <span className="font-semibold">{personalInfoData?.emailId}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Aadhar Number</span>
            <span className="font-semibold">{personalInfoData?.identityNumber || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Identification Mark 1</span>
            <span className="font-semibold">{personalInfoData?.identificationMark1 || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Identification Mark 2</span>
            <span className="font-semibold">{personalInfoData?.identificationMark2 || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <MapPin size={18} />
            <h3>Address Details</h3>
          </div>
          <button
            onClick={() => setCurrentStep(0)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">Permanent Address</h4>
            <p className="text-sm text-slate-600">
              {personalInfoData?.address?.permanent?.line1}<br />
              {personalInfoData?.address?.permanent?.city}, {personalInfoData?.address?.permanent?.state}<br />
              {personalInfoData?.address?.permanent?.country} - {personalInfoData?.address?.permanent?.pincode}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">Correspondence Address</h4>
            <p className="text-sm text-slate-600">
              {personalInfoData?.address?.correspondence?.sameAsPermanent ? (
                <span className="text-green-600">Same as Permanent Address</span>
              ) : (
                <>
                  {personalInfoData?.address?.correspondence?.line1}<br />
                  {personalInfoData?.address?.correspondence?.city}, {personalInfoData?.address?.correspondence?.state}<br />
                  {personalInfoData?.address?.correspondence?.country} - {personalInfoData?.address?.correspondence?.pincode}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Category & Quota Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Globe size={18} />
            <h3>Category & Quota</h3>
          </div>
          <button
            onClick={() => setCurrentStep(1)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Category</span>
            <span className="font-semibold">{reservationData?.mainCategory || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Jharkhand Domicile</span>
            <span className="font-semibold">{reservationData?.isJharkhandDomicile ? "Yes" : "No"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">PwD Status</span>
            <span className="font-semibold">{reservationData?.isPwd ? "Yes" : "No"}</span>
          </div>
          {reservationData?.isPwd && (
            <>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs">PwD Type</span>
                <span className="font-semibold">{reservationData?.pwdType || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs">PwD Percentage</span>
                <span className="font-semibold">{reservationData?.pwdPercentage || "N/A"}%</span>
              </div>
            </>
          )}
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Ex-Serviceman</span>
            <span className="font-semibold">{reservationData?.isExServiceman ? "Yes" : "No"}</span>
          </div>
          {reservationData?.isExServiceman && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Years of Service</span>
              <span className="font-semibold">{reservationData?.exServicemanYears || "N/A"}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Sports Quota</span>
            <span className="font-semibold">{reservationData?.isSportsQuota ? "Yes" : "No"}</span>
          </div>
          {reservationData?.isSportsQuota && (
            <>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs">Sports Level</span>
                <span className="font-semibold capitalize">{reservationData?.sportsLevel || "N/A"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-slate-500 text-xs">Achievement</span>
                <span className="font-semibold">{reservationData?.sportsAchievement || "N/A"}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Educational Qualifications Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <GraduationCap size={18} />
            <h3>Educational Qualifications</h3>
          </div>
          <button
            onClick={() => setCurrentStep(2)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="space-y-4">
          {tenthQual && (
            <div>
              <h4 className="font-semibold text-slate-700">10th / SSC</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-1">
                <div><span className="text-slate-500">Board:</span> {tenthQual.boardUniversity}</div>
                <div><span className="text-slate-500">Roll Number:</span> {tenthQual.rollNumber}</div>
                <div><span className="text-slate-500">Percentage:</span> {tenthQual.percentage}%</div>
                <div><span className="text-slate-500">Year:</span> {tenthQual.yearOfPassing}</div>
              </div>
            </div>
          )}
          {twelfthQual && (
            <div>
              <h4 className="font-semibold text-slate-700">12th / HSC</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-1">
                <div><span className="text-slate-500">Board:</span> {twelfthQual.boardUniversity}</div>
                <div><span className="text-slate-500">Roll Number:</span> {twelfthQual.rollNumber}</div>
                <div><span className="text-slate-500">Percentage:</span> {twelfthQual.percentage}%</div>
                <div><span className="text-slate-500">Year:</span> {twelfthQual.yearOfPassing}</div>
              </div>
            </div>
          )}
          {graduationQual && (
            <div>
              <h4 className="font-semibold text-slate-700">Graduation</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-1">
                <div><span className="text-slate-500">Course:</span> {graduationQual.degree}</div>
                <div><span className="text-slate-500">University:</span> {graduationQual.boardUniversity}</div>
                <div><span className="text-slate-500">Percentage:</span> {graduationQual.percentage}%</div>
                <div><span className="text-slate-500">Year:</span> {graduationQual.yearOfPassing}</div>
                <div><span className="text-slate-500">Specialization:</span> {graduationQual.specialization}</div>
              </div>
            </div>
          )}
          <div>
            
              
          </div>
        </div>
      </div>

      {/* Post Preferences Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Sliders size={18} />
            <h3>Post Preferences</h3>
          </div>
          <button
            onClick={() => setCurrentStep(3)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="text-slate-500 text-sm">Vacancy Stream:</span>
            <span className="font-semibold text-sm capitalize">{postPreferenceData?.vacancyStream || "N/A"}</span>
          </div>
          {postPreferenceData?.postRankings && postPreferenceData.postRankings.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Selected Posts with Priority</h4>
              <div className="space-y-2">
                {postPreferenceData.postRankings
                  .sort((a: any, b: any) => a.priority - b.priority)
                  .map((ranking: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Priority {ranking.priority}</span>
                      <span className="text-sm text-slate-700">{getPostTitle(ranking.postId)}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Language Selection Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Languages size={18} />
            <h3>Language Selection</h3>
          </div>
          <button
            onClick={() => setCurrentStep(4)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Paper-I Language</span>
            <span className="font-semibold">{languageData?.paperOneLanguage || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Paper-II Language</span>
            <span className="font-semibold">{languageData?.paperTwoLanguage || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Paper-III Subject</span>
            <span className="font-semibold">{languageData?.paperThreeLanguage || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <FileCheck size={18} />
            <h3>Uploaded Documents</h3>
          </div>
          <button
            onClick={() => setCurrentStep(5)}
            className="text-xs font-bold text-primary hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {steps?.documents?.photo && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Photo</span>
              <a href={steps.documents.photo} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.signature && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Signature</span>
              <a href={steps.documents.signature} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.tenthMarksheet && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">10th Marksheet</span>
              <a href={steps.documents.tenthMarksheet} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.twelfthMarksheet && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">12th Marksheet</span>
              <a href={steps.documents.twelfthMarksheet} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.graduationMarksheet && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Graduation Marksheet</span>
              <a href={steps.documents.graduationMarksheet} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.domicileCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Domicile Certificate</span>
              <a href={steps.documents.domicileCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.aadharCard && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Aadhar Card</span>
              <a href={steps.documents.aadharCard} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.postGraduationCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Post Graduation Certificate</span>
              <a href={steps.documents.postGraduationCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.diplomaCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Diploma Certificate</span>
              <a href={steps.documents.diplomaCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.experienceCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Experience Certificate</span>
              <a href={steps.documents.experienceCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.contractualServiceCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Contractual Service Certificate</span>
              <a href={steps.documents.contractualServiceCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.ewsCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">EWS Certificate</span>
              <a href={steps.documents.ewsCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.castCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Caste Certificate</span>
              <a href={steps.documents.castCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.pwdCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Disability Certificate</span>
              <a href={steps.documents.pwdCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
          {steps?.documents?.sportsCertificate && (
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">Sports Certificate</span>
              <a href={steps.documents.sportsCertificate} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs truncate max-w-[150px]">View Document</a>
            </div>
          )}
        </div>
        {!steps?.documents?.photo && 
         !steps?.documents?.signature && 
         !steps?.documents?.tenthMarksheet && 
         !steps?.documents?.twelfthMarksheet && 
         !steps?.documents?.graduationMarksheet && 
         !steps?.documents?.domicileCertificate && (
          <div className="text-center py-4 text-slate-500 text-sm">
            No documents uploaded yet
          </div>
        )}
      </div>

      {/* Declaration */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-primary font-bold mb-3">
          <CheckSquare size={18} />
          <h3>Declaration</h3>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-600 max-h-32 overflow-y-auto">
          <p>
            I hereby declare that all the information provided in this
            application form is true, complete, and correct to the best of my
            knowledge and belief.
          </p>
        </div>
        <label className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            checked={declarationConfirmed}
            onChange={(e) => setDeclarationConfirmed(e.target.checked)}
            className="w-4 h-4 border-slate-300 rounded text-primary"
          />
          <span className="text-sm font-medium text-slate-700">
            I confirm that I have reviewed all the information and I agree to
            the declaration stated above.{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
      </div>
    </div>
  );
};

  const renderRegistrationSuccess = () => (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="bg-primary text-white text-center py-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-400/20 rounded-full mb-4">
          <CheckCircle size={32} className="text-emerald-300" />
        </div>
        <h1 className="text-2xl font-bold">Registration Successful</h1>
        <p className="text-sm text-gray-300 mt-2">
          Your application for JTGLCCE 2026 has been successfully submitted.
        </p>
      </div>
      <div className="p-8 space-y-6">
        <div className="border rounded-lg p-4 flex justify-between bg-slate-50">
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">
              Registration Number
            </span>
            <div className="text-xl font-extrabold text-slate-800">
              {applicationStatus.registrationNumber}
            </div>
          </div>
          <div>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
              ● Active
            </span>
            <div className="text-xs text-slate-500 mt-1">
              Submitted on: {applicationStatus.submissionDate}
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Bell size={16} className="text-blue-600" />
          <div>
            <span className="font-bold text-slate-800">Confirmation Sent</span>
            <p className="text-sm text-slate-600">
              A confirmation SMS has been sent to your registered mobile number
              and email.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div 
          onClick={()=>navigate("/dashboard/admit-card")}
          className="border rounded-lg p-5 text-center hover:border-primary cursor-pointer">
            <FileText className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <h3 className="font-bold">View Application</h3>
          </div>
          <div className="border rounded-lg p-5 text-center hover:border-primary cursor-pointer">
            <Receipt className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold">Download Fee Receipt</h3>
          </div>
        </div>
      </div>
      <div className="border-t bg-slate-50 px-5 py-4 flex justify-between text-sm">
        <div className="flex items-center gap-1 text-slate-500">
          <HelpCircle size={14} /> Issue? Contact Help Desk
        </div>
        <span 
          onClick={() => navigate("/dashboard")}
          className="font-bold text-primary cursor-pointer">
          Go to Dashboard →
        </span>
      </div>
    </div>
  );

    if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        {renderRegistrationSuccess()}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Application Form</h1>
        <p className="text-slate-600">
          Fill out the application form carefully
        </p>
      </div>
      {!isSubmitted ? (
        <>
          <div className="mb-8 overflow-x-auto">
            <div className="flex justify-between min-w-[800px] relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${index <= currentStep ? "bg-primary text-white shadow-lg" : "bg-slate-200 text-slate-500"}`}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-center mt-2 hidden md:block">
                      <p
                        className={`text-xs font-medium ${index <= currentStep ? "text-primary" : "text-slate-500"}`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 transition-all ${index < currentStep ? "bg-primary" : "bg-slate-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
            {renderStep()}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={savingStep}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50"
              >
                {savingStep ? "Saving..." : "Next"} 
                {!savingStep && <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              
              

              <div className="flex gap-10">
  <button
    onClick={handleSaveDraft}
    className="flex items-center gap-2 px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-900"
  >
    <Send className="w-4 h-4" /> Save Draft
  </button>
  <button
    onClick={handleFinalSubmit}
    disabled={savingStep || !declarationConfirmed}
    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white transition-all ${
      !declarationConfirmed
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    {savingStep ? "Submitting..." : "Submit Application"}
    {!savingStep && <Send className="w-4 h-4" />}
  </button>
</div>
            )}
          </div>
        </>
      ) : (
        renderRegistrationSuccess()
      )}
    </div>
  );
};

export default MyApplications;

