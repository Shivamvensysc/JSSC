import React, { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle,
  User,
  RefreshCw,
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
  getDegreesByType: (degreeType: string) => axios.get(`${API_BASE_URL}/degrees?degreeType=${degreeType}`, getAuthHeaders()),
  getCandidateRegistration: () => axios.get(`${API_BASE_URL}/auth/candidate/registration`, getAuthHeaders()),
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
   maritalStatus: string;
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
  postGraduation: {
    hasPostGraduation: boolean;
    degreeName: string;
    degreeId?: number;
    university: string;
    percentage: string;
    subject: string[];
    subjectIds?: number[];
    totalMarks: string;
    marksObtained: string;
    passingCertificateNo: string;
    certificateFile: File | null;
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
  subSubCategoryId?: number;
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
   isLocallyResident: string;     // Add this
  localDistrictId?: number;      // Add this
  localDistrictName?: string;
}
// Replace the existing Category and SubCategory interfaces with these:

interface Category {
  value: number;
  label: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  value: number;
  label: string;
  subCategories: SubCategory[];
}

interface FeePayment {
  applicationFee: string;
  paymentMode: string;
  transactionId: string;
  paymentDate: string;
  bankName: string;
   paymentStatus: "pending" | "processing" | "completed" | "failed";
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
  // Add this with other state declarations
const [registrationData, setRegistrationData] = useState<any>(null);
console.log(registrationData)
  // Add this state near other API Data States
const [postsList, setPostsList] = useState<any[]>([]);
const [eligiblePosts, setEligiblePosts] = useState<any[]>([]);
// Add these with other state declarations
const [bachelorDegrees, setBachelorDegrees] = useState<{ degreeId: number; degreeName: string }[]>([]);
const [masterDegrees, setMasterDegrees] = useState<{ degreeId: number; degreeName: string }[]>([]);
// Add this function to fetch degrees based on type
const fetchDegreesByType = async (degreeType: string, setter: (data: any) => void) => {
  try {
    const response = await apiService.getDegreesByType(degreeType);
    if (response.data.success) {
      setter(response.data.data);
    }
  } catch (error) {
    console.error(`Error fetching ${degreeType} degrees:`, error);
    // Fallback empty array if API fails
    setter([]);
  }
};

// Update the useEffect that fetches API data
useEffect(() => {
  const fetchApiData = async () => {
    setLoading(true);
    try {
      const subjectsResponse = await apiService.getSubjects();
      if (subjectsResponse.data.success) {
        const subjects = subjectsResponse.data.data.map((sub: Subject) => sub.subName);
        setSubjectsList(subjects);
        setSubjectsApiList(subjectsResponse.data.data);
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
      
      // Fetch degrees for Bachelor and Master
      await Promise.all([
        fetchDegreesByType("Bachelor", setBachelorDegrees),
        fetchDegreesByType("Master", setMasterDegrees)
      ]);
      
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




// Add this useEffect with your other useEffects
// Fetch candidate registration data on component mount
useEffect(() => {
  const fetchRegistrationData = async () => {
    try {
      const response = await apiService.getCandidateRegistration();
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setRegistrationData(data);
        
        // Calculate age from date of birth
        let calculatedAge = 0;
        if (data.dateOfBirth) {
          const birthDate = new Date(data.dateOfBirth);
          const today = new Date();
          calculatedAge = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
          }
        }
        
        // Auto-fill personal info from registration data
        setPersonalInfo(prev => ({
          ...prev,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          mobileNumber: data.mobileNumber || "",
          emailId: data.email || "",
          dob: data.dateOfBirth || "",
          age: calculatedAge,
        }));
        
        // Set verification status
        if (data.mobileVerified === true) {
          setMobileOtpVerified(true);
          setMobileOtpSent(true);
        }
        if (data.emailVerified === true) {
          setEmailOtpVerified(true);
          setEmailOtpSent(true);
        }
      }
    } catch (error) {
      console.error("Error fetching registration data:", error);
      // Don't show error toast as this is not critical
    }
  };
  
  fetchRegistrationData();
}, []);

const [stepErrors, setStepErrors] = useState<{ [key: number]: { [field: string]: string } }>({});
// Add this with other API Data States
const [selectedPrimitiveTribeId, setSelectedPrimitiveTribeId] = useState<number | undefined>(undefined);
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
  // Call fetchPosts when currentStep is 2, 3, or 4
  if ((currentStep === 2 || currentStep === 3 || currentStep === 4) || applicationId && postsList.length === 0) {
    fetchPosts();
  }
}, [currentStep, applicationId]);

  
// Validation for Step 0 - Personal Info
const validateStep0 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  // Basic Information
  if (!personalInfo.firstName.trim()) errors.firstName = "First name is required";
  
  if (!personalInfo.fathersName.trim()) errors.fathersName = "Father's name is required";
  if (!personalInfo.motherName.trim()) errors.motherName = "Mother's name is required";
  if (!personalInfo.gender) errors.gender = "Gender is required";
  if (!personalInfo.nationality) errors.nationality = "Nationality is required";
  if (!personalInfo.maritalStatus) errors.maritalStatus = "Marital status is required";
  
  // Contact Details
  if (!personalInfo.mobileNumber) {
    errors.mobileNumber = "Mobile number is required";
  } else if (personalInfo.mobileNumber.length !== 10) {
    errors.mobileNumber = "Mobile number must be 10 digits";
  }
  
  // Aadhar Card Validation - Required and exactly 12 digits
  if (!personalInfo.aadharNumber) {
    errors.aadharNumber = "Aadhar card number is required";
  } else if (personalInfo.aadharNumber.length !== 12) {
    errors.aadharNumber = "Aadhar card number must be exactly 12 digits";
  } else if (!/^\d+$/.test(personalInfo.aadharNumber)) {
    errors.aadharNumber = "Aadhar card number must contain only digits";
  }
  
  if (!personalInfo.emailId) {
    errors.emailId = "Email ID is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.emailId)) {
    errors.emailId = "Invalid email format";
  }
  
  // Date of Birth Validation
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
  if (!personalInfo.identificationMark1.trim()) {
    errors.identificationMark1 = "Identification mark is required";
  }
  
  // Permanent Address
  if (!personalInfo.permanentAddress.street.trim()) errors.permanentStreet = "Street address is required";
  if (!personalInfo.permanentAddress.cityOrVillage.trim()) errors.permanentCity = "City/Village is required";
  if (!personalInfo.permanentAddress.post.trim()) errors.permanentPost = "Post office is required";
  if (!personalInfo.permanentAddress.state) errors.permanentState = "State is required";
  if (!personalInfo.permanentAddress.district) errors.permanentDistrict = "District is required";
  if (!personalInfo.permanentAddress.pincode) {
    errors.permanentPincode = "Pincode is required";
  } else if (personalInfo.permanentAddress.pincode.length !== 6) {
    errors.permanentPincode = "Pincode must be 6 digits";
  }
  
  // Correspondence Address (if not same as permanent)
  if (!personalInfo.sameAsPermanent) {
    if (!personalInfo.correspondenceAddress.street.trim()) errors.correspondenceStreet = "Street address is required";
    if (!personalInfo.correspondenceAddress.cityOrVillage.trim()) errors.correspondenceCity = "City/Village is required";
    if (!personalInfo.correspondenceAddress.post.trim()) errors.correspondencePost = "Post office is required";
    if (!personalInfo.correspondenceAddress.state) errors.correspondenceState = "State is required";
    if (!personalInfo.correspondenceAddress.district) errors.correspondenceDistrict = "District is required";
    if (!personalInfo.correspondenceAddress.pincode) {
      errors.correspondencePincode = "Pincode is required";
    } else if (personalInfo.correspondenceAddress.pincode.length !== 6) {
      errors.correspondencePincode = "Pincode must be 6 digits";
    }
  }
  
  setStepErrors(prev => ({ ...prev, [0]: errors }));
  return Object.keys(errors).length === 0;
};



const isFutureDate = (dateString: string): boolean => {
  if (!dateString) return false;
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate > today;
};

// Complete updated validateStep1 function
const validateStep1 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  // Validate Locally Resident
  if (!reservationCategory.isLocallyResident) {
    errors.isLocallyResident = "Please select an option";
  }
  
  // Validate local district if local resident is Yes
  if (reservationCategory.isLocallyResident === "yes" && !reservationCategory.localDistrictId) {
    errors.localDistrictName = "Please select your district of local residence";
  }
  
  // Validate Jharkhand Domicile
  if (!reservationCategory.isJharkhandDomicile) {
    errors.isJharkhandDomicile = "Please select Jharkhand Domicile status";
  }
  
  // Validate main category
  if (reservationCategory.isJharkhandDomicile === "yes" && !reservationCategory.mainCategoryId) {
    errors.mainCategory = "Please select a category";
  } else if (reservationCategory.isJharkhandDomicile === "no" && !reservationCategory.mainCategoryId) {
    if (!reservationCategory.mainCategoryId) {
      errors.mainCategory = "Please select a category";
    }
  }
  
  // Domicile Certificate Fields - Shows when Domicile is Yes
  if (reservationCategory.isJharkhandDomicile === "yes") {
    if (!reservationCategory.domicileCertificateNumber.trim()) {
      errors.domicileCertificateNumber = "Domicile certificate number is required";
    }
    if (!reservationCategory.domicileCertificateAuthority.trim()) {
      errors.domicileCertificateAuthority = "Domicile certificate issuing authority is required";
    }
    if (!reservationCategory.domicileCertificateIssueDate) {
      errors.domicileCertificateIssueDate = "Domicile certificate issue date is required";
    } else if (isFutureDate(reservationCategory.domicileCertificateIssueDate)) {
      errors.domicileCertificateIssueDate = "Issue date cannot be in the future";
    }
  }
  
  // Category Certificate Fields - Shows when a reserved category is selected (not UR/EWS)
  if (reservationCategory.mainCategoryId && 
      reservationCategory.mainCategory !== "UR (Unreserved)" && 
      reservationCategory.mainCategory !== "Unreserved" && 
      reservationCategory.mainCategory !== "Unreserved (UR)" &&
      reservationCategory.mainCategory !== "EWS") {
    if (!reservationCategory.categoryCertificateNumber.trim()) {
      errors.categoryCertificateNumber = "Category certificate number is required";
    }
    if (!reservationCategory.categoryCertificateAuthority.trim()) {
      errors.categoryCertificateAuthority = "Category certificate issuing authority is required";
    }
    if (!reservationCategory.categoryCertificateIssueDate) {
      errors.categoryCertificateIssueDate = "Category certificate issue date is required";
    } else if (isFutureDate(reservationCategory.categoryCertificateIssueDate)) {
      errors.categoryCertificateIssueDate = "Issue date cannot be in the future";
    }
  }
  
  // PwD Fields
  if (reservationCategory.isPwd === "yes") {
    if (!reservationCategory.pwdTypeId) {
      errors.pwdType = "Please select disability type";
    }
    if (!reservationCategory.pwdPercentage) {
      errors.pwdPercentage = "Please enter disability percentage";
    } else {
      const pwdPercent = parseInt(reservationCategory.pwdPercentage);
      if (isNaN(pwdPercent)) {
        errors.pwdPercentage = "Please enter a valid number";
      } else if (pwdPercent < 40) {
        errors.pwdPercentage = "Disability percentage must be at least 40%";
      } else if (pwdPercent > 100) {
        errors.pwdPercentage = "Disability percentage cannot exceed 100%";
      }
    }
    if (!reservationCategory.pwdCertificateNumber.trim()) {
      errors.pwdCertificateNumber = "PwD certificate number is required";
    }
    if (!reservationCategory.pwdCertificateAuthority.trim()) {
      errors.pwdCertificateAuthority = "PwD certificate issuing authority is required";
    }
    if (!reservationCategory.pwdCertificateIssueDate) {
      errors.pwdCertificateIssueDate = "PwD certificate issue date is required";
    } else if (isFutureDate(reservationCategory.pwdCertificateIssueDate)) {
      errors.pwdCertificateIssueDate = "Issue date cannot be in the future";
    }
  }
  
  // Ex-Serviceman Fields
  if (reservationCategory.isExServiceman === "yes") {
    if (!reservationCategory.exServicemanYears) {
      errors.exServicemanYears = "Please enter years of service";
    } else {
      const years = parseInt(reservationCategory.exServicemanYears);
      if (isNaN(years)) {
        errors.exServicemanYears = "Please enter a valid number";
      } else if (years < 0 || years > 30) {
        errors.exServicemanYears = "Years of service must be between 0 and 30";
      }
    }
  }
  
  // Sports Quota Fields
  if (reservationCategory.isSportsQuota === "yes") {
    if (!reservationCategory.sportsLevel) {
      errors.sportsLevel = "Please select sports level";
    }
    if (!reservationCategory.sportsAchievement.trim()) {
      errors.sportsAchievement = "Please describe your achievements";
    }
    if (!reservationCategory.sportsCertificateNumber.trim()) {
      errors.sportsCertificateNumber = "Sports certificate number is required";
    }
    if (!reservationCategory.sportsCertificateAuthority.trim()) {
      errors.sportsCertificateAuthority = "Sports certificate issuing authority is required";
    }
    if (!reservationCategory.sportsCertificateIssueDate) {
      errors.sportsCertificateIssueDate = "Sports certificate issue date is required";
    } else if (isFutureDate(reservationCategory.sportsCertificateIssueDate)) {
      errors.sportsCertificateIssueDate = "Issue date cannot be in the future";
    }
  }
  
  // Declaration
  if (!reservationCategory.declaration) {
    errors.declaration = "Please accept the declaration";
  }
  
  setStepErrors(prev => ({ ...prev, [1]: errors }));
  return Object.keys(errors).length === 0;
};

// Updated validateStep2 function with proper validation
const validateStep2 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  // 10th validation - Always required
  const tenthIsValid = (education.tenth.percentage && education.tenth.percentage !== "") || 
                       (education.tenth.totalMarks && education.tenth.marksObtained);
  
  if (!education.tenth.board) {
    errors.tenthBoard = "10th board is required";
  }
  if (!tenthIsValid) {
    errors.tenthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
  }
  if (!education.tenth.passingCertificateNo) {
    errors.tenthCertificate = "10th certificate number is required";
  }
  
  // Percentage validation for 10th (if entered)
  if (education.tenth.percentage && education.tenth.percentage !== "") {
    const percentage = parseFloat(education.tenth.percentage);
    if (isNaN(percentage)) {
      errors.tenthPercentage = "Please enter a valid percentage";
    } else if (percentage < 0 || percentage > 100) {
      errors.tenthPercentage = "Percentage must be between 0 and 100";
    }
  }
  
  // Total Marks and Marks Obtained validation for 10th
  if (education.tenth.totalMarks && education.tenth.totalMarks !== "") {
    const totalMarks = parseFloat(education.tenth.totalMarks);
    if (isNaN(totalMarks) || totalMarks <= 0) {
      errors.tenthTotalMarks = "Total marks must be a valid positive number";
    }
  }
  if (education.tenth.marksObtained && education.tenth.marksObtained !== "") {
    const marksObtained = parseFloat(education.tenth.marksObtained);
    if (isNaN(marksObtained) || marksObtained < 0) {
      errors.tenthMarksObtained = "Marks obtained must be a valid positive number";
    }
    if (education.tenth.totalMarks && education.tenth.totalMarks !== "") {
      const totalMarks = parseFloat(education.tenth.totalMarks);
      if (!isNaN(totalMarks) && marksObtained > totalMarks) {
        errors.tenthMarksObtained = "Marks obtained cannot exceed total marks";
      }
    }
  }
  
  // 12th validation (Optional - only validate if user has entered data)
  const twelfthIsValid = (education.twelfth.percentage && education.twelfth.percentage !== "") || 
                         (education.twelfth.totalMarks && education.twelfth.marksObtained);
  
  // Only validate 12th if user has entered some data OR if board is selected
  if (education.twelfth.board || twelfthIsValid || education.twelfth.passingCertificateNo) {
    if (!education.twelfth.board) {
      errors.twelfthBoard = "12th board is required";
    }
    if (!twelfthIsValid && (education.twelfth.totalMarks || education.twelfth.marksObtained || education.twelfth.percentage)) {
      errors.twelfthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
    }
  }
  
  // Percentage validation for 12th (if entered)
  if (education.twelfth.percentage && education.twelfth.percentage !== "") {
    const percentage = parseFloat(education.twelfth.percentage);
    if (isNaN(percentage)) {
      errors.twelfthPercentage = "Please enter a valid percentage";
    } else if (percentage < 0 || percentage > 100) {
      errors.twelfthPercentage = "Percentage must be between 0 and 100";
    }
  }
  
  // Total Marks and Marks Obtained validation for 12th
  if (education.twelfth.totalMarks && education.twelfth.totalMarks !== "") {
    const totalMarks = parseFloat(education.twelfth.totalMarks);
    if (isNaN(totalMarks) || totalMarks <= 0) {
      errors.twelfthTotalMarks = "Total marks must be a valid positive number";
    }
  }
  if (education.twelfth.marksObtained && education.twelfth.marksObtained !== "") {
    const marksObtained = parseFloat(education.twelfth.marksObtained);
    if (isNaN(marksObtained) || marksObtained < 0) {
      errors.twelfthMarksObtained = "Marks obtained must be a valid positive number";
    }
    if (education.twelfth.totalMarks && education.twelfth.totalMarks !== "") {
      const totalMarks = parseFloat(education.twelfth.totalMarks);
      if (!isNaN(totalMarks) && marksObtained > totalMarks) {
        errors.twelfthMarksObtained = "Marks obtained cannot exceed total marks";
      }
    }
  }
  
  // Graduation validation - Always required
  const gradIsValid = (education.graduation.percentage && education.graduation.percentage !== "") || 
                      (education.graduation.totalMarks && education.graduation.marksObtained);
  
  if (!education.graduation.graduationCourse) {
    errors.graduationCourse = "Graduation course is required";
  }
  if (!education.graduation.university) {
    errors.graduationUniversity = "University name is required";
  }
  if (!gradIsValid) {
    errors.graduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
  }
  if (!education.graduation.passingCertificateNo) {
    errors.graduationCertificate = "Certificate number is required";
  }
  
  // Graduation Percentage validation
  if (education.graduation.percentage && education.graduation.percentage !== "") {
    const percentage = parseFloat(education.graduation.percentage);
    if (isNaN(percentage)) {
      errors.graduationPercentage = "Please enter a valid percentage";
    } else if (percentage < 0 || percentage > 100) {
      errors.graduationPercentage = "Percentage must be between 0 and 100";
    }
  }
  
  // Graduation Total Marks validation
  if (education.graduation.totalMarks && education.graduation.totalMarks !== "") {
    const totalMarks = parseFloat(education.graduation.totalMarks);
    if (isNaN(totalMarks) || totalMarks <= 0) {
      errors.graduationTotalMarks = "Total marks must be a valid positive number";
    }
  }
  
  // Graduation Marks Obtained validation
  if (education.graduation.marksObtained && education.graduation.marksObtained !== "") {
    const marksObtained = parseFloat(education.graduation.marksObtained);
    if (isNaN(marksObtained) || marksObtained < 0) {
      errors.graduationMarksObtained = "Marks obtained must be a valid positive number";
    }
    if (education.graduation.totalMarks && education.graduation.totalMarks !== "") {
      const totalMarks = parseFloat(education.graduation.totalMarks);
      if (!isNaN(totalMarks) && marksObtained > totalMarks) {
        errors.graduationMarksObtained = "Marks obtained cannot exceed total marks";
      }
    }
  }
  
  // Post-Graduation validation - Only required if hasPostGraduation is true
  if (education.postGraduation.hasPostGraduation) {
    const pgIsValid = (education.postGraduation.percentage && education.postGraduation.percentage !== "") || 
                      (education.postGraduation.totalMarks && education.postGraduation.marksObtained);
    
    if (!education.postGraduation.degreeName && !education.postGraduation.degreeId) {
      errors.postGraduationDegree = "Post-graduation degree name is required";
    }
    if (!education.postGraduation.university) {
      errors.postGraduationUniversity = "University name is required";
    }
    if (!pgIsValid) {
      errors.postGraduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
    }
    
    // Post-Graduation Percentage validation
    if (education.postGraduation.percentage && education.postGraduation.percentage !== "") {
      const percentage = parseFloat(education.postGraduation.percentage);
      if (isNaN(percentage)) {
        errors.postGraduationPercentage = "Please enter a valid percentage";
      } else if (percentage < 0 || percentage > 100) {
        errors.postGraduationPercentage = "Percentage must be between 0 and 100";
      }
    }
    
    // Post-Graduation Total Marks validation
    if (education.postGraduation.totalMarks && education.postGraduation.totalMarks !== "") {
      const totalMarks = parseFloat(education.postGraduation.totalMarks);
      if (isNaN(totalMarks) || totalMarks <= 0) {
        errors.postGraduationTotalMarks = "Total marks must be a valid positive number";
      }
    }
    
    // Post-Graduation Marks Obtained validation
    if (education.postGraduation.marksObtained && education.postGraduation.marksObtained !== "") {
      const marksObtained = parseFloat(education.postGraduation.marksObtained);
      if (isNaN(marksObtained) || marksObtained < 0) {
        errors.postGraduationMarksObtained = "Marks obtained must be a valid positive number";
      }
      if (education.postGraduation.totalMarks && education.postGraduation.totalMarks !== "") {
        const totalMarks = parseFloat(education.postGraduation.totalMarks);
        if (!isNaN(totalMarks) && marksObtained > totalMarks) {
          errors.postGraduationMarksObtained = "Marks obtained cannot exceed total marks";
        }
      }
    }
  }
  
  setStepErrors(prev => ({ ...prev, [2]: errors }));
  return Object.keys(errors).length === 0;
};




const validateStep3 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  if (dynamicPosts.length > 0 && Object.values(postPreference.postRankings).some(p => p === 0)) {
    errors.postRankings = "Please assign priorities to all posts";
  }
  
  setStepErrors(prev => ({ ...prev, [3]: errors }));
  return Object.keys(errors).length === 0;
};

// Validation for Step 4 - Language Selection
// Validation for Step 4 - Language Selection
const validateStep4 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  const selectedPost = postsList.length > 0 ? postsList[0] : null;
  const postCode = selectedPost?.postCode?.toString() || "";
  const showPaperThree = postCode === "4" || postCode === "7";
  
  // Paper I is auto-filled (always "Hindi, English")
  if (!languageSelection.paperOneLanguage) {
    errors.paperOneLanguage = "Paper I language is required";
  }
  
  // Paper II is always required for all posts
  if (!languageSelection.paperTwoLanguage) {
    errors.paperTwoLanguage = "Paper II language is required";
  }
  
  // Paper III is required only for posts 4 and 7
  if (showPaperThree && !languageSelection.paperThreeLanguage) {
    errors.paperThreeLanguage = "Paper III subject is required";
  }
  
  setStepErrors(prev => ({ ...prev, [4]: errors }));
  return Object.keys(errors).length === 0;
};

const validateStep5 = (): boolean => {
  const errors: { [field: string]: string } = {};
  
  // Get already uploaded documents from API
  const uploadedDocsFromApi = reviewData?.steps?.documents || {};
  
  // Required documents based on user selections
  const requiredDocs = [
    { key: "photo", label: "Passport Size Photograph" },
    { key: "signature", label: "Signature Scan" },
    { key: "tenthMarksheet", label: "10th Marksheet" },
    { key: "twelfthMarksheet", label: "12th Marksheet" },
    { key: "graduationMarksheet", label: "Graduation Degree Certificate" },
    { key: "aadharCard", label: "Aadhar Card" },
  ];
  
  // Add conditional documents based on selection
  if (reservationCategory.isJharkhandDomicile === "yes") {
    requiredDocs.push({ key: "domicileCertificate", label: "Domicile Certificate" });
  }
  
  if (reservationCategory.mainCategory === "ews" || reservationCategory.mainCategory === "economically_weaker_section_(ews)") {
    requiredDocs.push({ key: "ewsCertificate", label: "EWS Certificate" });
  }
  
  // Caste Certificate - Only required for reserved categories (NOT for Unreserved/UR/EWS)
  const isReservedCategory = reservationCategory.mainCategory && 
    !["unreserved", "unreserved_(ur)", "ur", "ews", "economically_weaker_section_(ews)"].includes(reservationCategory.mainCategory);
  
  if (isReservedCategory) {
    requiredDocs.push({ key: "castCertificate", label: "Caste Certificate" });
  }
  
  if (education.postGraduation.hasPostGraduation) {
    requiredDocs.push({ key: "postGraduationCertificate", label: "Post-Graduation Certificate" });
  }
  
  if (reservationCategory.isPwd === "yes") {
    requiredDocs.push({ key: "pwdCertificate", label: "Disability Certificate" });
  }
  
  if (reservationCategory.isSportsQuota === "yes") {
    requiredDocs.push({ key: "sportsCertificate", label: "Sports Certificate" });
  }
  
  // Check each required document - consider both newly uploaded and already uploaded from API
  requiredDocs.forEach((doc) => {
    const isNewlyUploaded = documents[doc.key as keyof Documents] !== null;
    const isAlreadyUploaded = uploadedDocsFromApi[doc.key] && uploadedDocsFromApi[doc.key] !== "null" && uploadedDocsFromApi[doc.key] !== "";
    
    if (!isNewlyUploaded && !isAlreadyUploaded) {
      errors[`documents.${doc.key}`] = `${doc.label} is required`;
    }
  });
  
  setStepErrors(prev => ({ ...prev, [5]: errors }));
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
    case 5: return validateStep5();
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
     maritalStatus: "", 
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
    graduationCourseId: undefined,
    university: "",
    percentage: "",
    specialization: "",
    specializationIds: [],
    passingCertificateNo: "",
    totalMarks: "",
    marksObtained: "",
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
  postGraduation: {
    hasPostGraduation: false,
    degreeName: "",
    degreeId: undefined,
    university: "",
    percentage: "",
    subject: [],
    subjectIds: [],
    totalMarks: "",
    marksObtained: "",
    passingCertificateNo: "",
    certificateFile: null,
  },
});

  const [postPreference, setPostPreference] = useState<PostPreference>({
    vacancyStream: "both",
    postRankings: {},
  });

  const [languageSelection, setLanguageSelection] = useState<LanguageSelection>({
    paperOneLanguage: "",
    paperTwoLanguage: "",
    paperThreeLanguage: "Technical / Specialized Subject and General Knowledge",
  });
  
 const [reservationCategory, setReservationCategory] = useState<ReservationCategory>({
  isLocallyResident: "no",        // Add this
  localDistrictId: undefined,     // Add this
  localDistrictName: "", 
  mainCategory: "",
  mainCategoryId: undefined,
  subCategory: "",
  subCategoryId: undefined,
  subSubCategoryId: undefined,
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

  const [isProcessing, setIsProcessing] = useState(false);
  const FEE_AMOUNTS: Record<string, number> = {
  general: 100,
  obc: 100,
  sc_st_ph: 50,
  exserviceman: 0,
};

const getMappedFeeCategory = () => {
  if (reservationCategory.isExServiceman === "yes") return "exserviceman";
  if (reservationCategory.isPwd === "yes") return "sc_st_ph";
  
  const cat = reservationCategory.mainCategory?.toLowerCase() || "";
  const isSCST = cat === "sc" || cat === "st" || cat.includes("scheduled caste") || cat.includes("scheduled tribe");
  
  if (reservationCategory.isJharkhandDomicile === "yes" && isSCST) return "sc_st_ph";
  if (cat.includes("obc") || cat.includes("ebc") || cat.includes("bc")) return "obc";
  return "general";
};

const calculateTotalFee = () => {
  const feeCat = getMappedFeeCategory();
  return FEE_AMOUNTS[feeCat] ?? 100;
};

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

// Add this useEffect with your other useEffects, before the renderStep function
// Auto-assign priority when only one post is available
useEffect(() => {
  if (postsList.length === 1 && postsList[0]) {
    const post = postsList[0];
    const currentPriority = postPreference.postRankings[post.postCode];
    // Only auto-assign if not already assigned
    if (!currentPriority || currentPriority === 0) {
      setPostPreference(prev => ({
        ...prev,
        postRankings: { ...prev.postRankings, [post.postCode]: 1 }
      }));
    }
  }
}, [postsList, postPreference.postRankings]);

// Add this with your other useEffects
// Clear error when all priorities are assigned
useEffect(() => {
  if (postsList.length > 0) {
    const allAssigned = Object.values(postPreference.postRankings).every(p => p !== 0);
    if (allAssigned) {
      setStepErrors(prev => ({ ...prev, [3]: {} }));
    }
  }
}, [postPreference.postRankings, postsList.length]);

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
    } else {
      setStepErrors(prev => ({ 
        ...prev, 
        [0]: { ...prev[0], dob: `Age must be at least 21 years. Current age: ${calculatedAge} years` } 
      }));
    }
  } else {
    setStepErrors(prev => ({ 
      ...prev, 
      [0]: { ...prev[0], dob: "Date of birth is required" } 
    }));
  }
};

// Add state for local districts
const [localDistricts, setLocalDistricts] = useState<District[]>([]);

// Add useEffect to fetch districts when local resident is selected
useEffect(() => {
  const fetchLocalDistricts = async () => {
    if (reservationCategory.isLocallyResident === "yes") {
      try {
        // Direct API call with "JH"
        const response = await axios.get(`${API_BASE_URL}/states/JH/districts`, getAuthHeaders());
        if (response.data.success) {
          setLocalDistricts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching districts for Jharkhand:", error);
      }
    } else {
      setLocalDistricts([]);
    }
  };
  fetchLocalDistricts();
}, [reservationCategory.isLocallyResident]);

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
  
  // If sameAsPermanent is true, also update correspondence address
  if (personalInfo.sameAsPermanent) {
    setPersonalInfo(prev => ({
      ...prev,
      correspondenceAddress: {
        ...prev.permanentAddress,
        street: prev.permanentAddress.street,
        post: prev.permanentAddress.post,
        district: "",
        districtId: undefined,
        state: stateName,
        stateId: stateId,
        pincode: prev.permanentAddress.pincode,
        cityOrVillage: prev.permanentAddress.cityOrVillage,
      },
    }));
    
    // Fetch districts for correspondence address if state changed
    const fetchDistrictsForCorrespondence = async () => {
      try {
        const response = await apiService.getDistrictsByState(stateId);
        if (response.data.success) {
          setCorrespondenceDistricts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching districts for correspondence:", error);
      }
    };
    fetchDistrictsForCorrespondence();
  }
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
  
  // If sameAsPermanent is true, also update correspondence address
  if (personalInfo.sameAsPermanent) {
    setPersonalInfo(prev => ({
      ...prev,
      correspondenceAddress: {
        ...prev.correspondenceAddress,
        district: districtName,
        districtId: districtId,
      },
    }));
  }
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
console.log(subjectsApiList,degreesList)
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
  if (mobileOtpVerified) {
    toast.info("Mobile number already verified");
    return;
  }
  if (personalInfo.mobileNumber.length === 10) {
    setMobileOtpSent(true);
    toast.info(`OTP sent to ${personalInfo.mobileNumber}`);
  } else {
    toast.error("Please enter a valid 10-digit mobile number");
  }
};

const sendEmailOtp = () => {
  if (emailOtpVerified) {
    toast.info("Email already verified");
    return;
  }
  if (personalInfo.emailId.includes("@")) {
    setEmailOtpSent(true);
    toast.info(`OTP sent to ${personalInfo.emailId}`);
  } else {
    toast.error("Please enter a valid email address");
  }
};

  const verifyMobileOtp = () => {
    setMobileOtpVerified(true);
    toast.success("Mobile number verified successfully!");
  };

  
  const saveStep1 = async () => {
    setSavingStep(true);
    const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

    const payload = {
      personalInfo: {
        fullName,
        fathersName: personalInfo.fathersName,
        motherName: personalInfo.motherName,
        dob: formatDateToDDMMYYYY(personalInfo.dob),
        gender: personalInfo.gender,
        nationality: personalInfo.nationality,
        maritalStatus: personalInfo.maritalStatus,
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


const saveStep2 = async () => {
  setSavingStep(true);
  
  // Date formatting function
  const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  
  const payload = {
    reservationCategory: {
      // Main category (e.g., UR, OBC, SC, ST, EWS)
      mainCategory: reservationCategory.mainCategoryId || 0,
      
      // Sub category (e.g., Primitive Tribe, Other ST)
      subCategory: reservationCategory.subCategoryId || 0,
      
      // Sub-sub category (e.g., Asur, Birhor, etc.)
      subSubCategory: reservationCategory.subSubCategoryId || 0,
      
      // Category certificate fields
      categoryCertificateNumber: reservationCategory.categoryCertificateNumber,
      categoryCertificateAuthority: reservationCategory.categoryCertificateAuthority,
      categoryCertificateIssueDate: formatDateToDDMMYYYY(reservationCategory.categoryCertificateIssueDate),
      
      // PwD fields - Convert percentage to number
      isPwd: reservationCategory.isPwd === "yes",
      pwdType: reservationCategory.pwdTypeId || 0,
      pwdPercentage: reservationCategory.pwdPercentage ? Number(reservationCategory.pwdPercentage) : 0,
      pwdCertificateNumber: reservationCategory.pwdCertificateNumber,
      pwdCertificateAuthority: reservationCategory.pwdCertificateAuthority,
      pwdCertificateIssueDate: formatDateToDDMMYYYY(reservationCategory.pwdCertificateIssueDate),
      
      // Ex-Serviceman fields - Convert years to number
      isExServiceman: reservationCategory.isExServiceman === "yes",
      exServicemanYears: reservationCategory.exServicemanYears ? Number(reservationCategory.exServicemanYears) : 0,
      
      // Sports quota fields
      isSportsQuota: reservationCategory.isSportsQuota === "yes",
      sportsLevel: reservationCategory.sportsLevel,
      sportsAchievement: reservationCategory.sportsAchievement,
      sportsCertificateNumber: reservationCategory.sportsCertificateNumber,
      sportsCertificateAuthority: reservationCategory.sportsCertificateAuthority,
      sportsCertificateIssueDate: formatDateToDDMMYYYY(reservationCategory.sportsCertificateIssueDate),
      
      // Domicile fields
      isJharkhandDomicile: reservationCategory.isJharkhandDomicile === "yes",
      domicileCertificateNumber: reservationCategory.domicileCertificateNumber,
      domicileCertificateAuthority: reservationCategory.domicileCertificateAuthority,
      domicileCertificateIssueDate: formatDateToDDMMYYYY(reservationCategory.domicileCertificateIssueDate),
      
      // Local resident fields
      isLocallyResident: reservationCategory.isLocallyResident === "yes",
      localDistrictId: reservationCategory.localDistrictId || 0,
      
      // Declaration
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
      degreeId: education.graduation.graduationCourseId || 0,
      university: education.graduation.university,
      percentage: education.graduation.percentage,
      totalMarks: education.graduation.totalMarks,
      marksObtained: education.graduation.marksObtained,
      passingCertificateNo: education.graduation.passingCertificateNo,
    },
    postGraduation: {
      hasPostGraduation: education.postGraduation.hasPostGraduation,
      degreeId: education.postGraduation.degreeId || 0,
      university: education.postGraduation.university,
      percentage: education.postGraduation.percentage,
      // subject: education.postGraduation.subjectIds?.join(',') || '',
      totalMarks: education.postGraduation.totalMarks,
      marksObtained: education.postGraduation.marksObtained,
      passingCertificateNo: education.postGraduation.passingCertificateNo,
    },
  };

  try {
    let response;
    // If post-graduation is selected and has a certificate file, use FormData
    if (education.postGraduation.hasPostGraduation && education.postGraduation.certificateFile) {
      const formData = new FormData();
      formData.append('postGraduationCertificate', education.postGraduation.certificateFile);
      formData.append('data', JSON.stringify(payload));
      response = await axios.post(`${API_BASE_URL}/auth/candidate/step-3`, formData, getMultipartHeaders());
    } else {
      response = await apiService.saveStep3(payload);
    }
    
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
// Save Step 4 API call (Language Selection)
const saveStep4 = async () => {
  setSavingStep(true);
  
  const selectedPost = postsList.length > 0 ? postsList[0] : null;
  const postCode = selectedPost?.postCode?.toString() || "";
  const isPostId4And7 = postCode === "4" || postCode === "7";
  
  // Prepare payload in the required format
  const payload = {
    subjects: {
      paperOne: "Hindi, English",
      paperTwo: languageSelection.paperTwoLanguage,
      ...(postCode === "4" && { paperThreeForPost4: languageSelection.paperThreeLanguage }),
      ...(postCode === "7" && { paperThreeForPost7: languageSelection.paperThreeLanguage }),
      isPostId4And7: isPostId4And7
    }
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




// Add this useEffect in the main component body (where other useEffects are)
useEffect(() => {
  // Auto-select language options based on post
  const selectedPost = postsList.length > 0 ? postsList[0] : null;
  const postCode = selectedPost?.postCode?.toString() || "";
  
  // Auto-select Paper One language - fixed value
  if (!languageSelection.paperOneLanguage) {
    setLanguageSelection(prev => ({ ...prev, paperOneLanguage: "Hindi, English" }));
  }
  
  // Auto-select Paper Two - default to "English Language & Literature" for all posts
  if (!languageSelection.paperTwoLanguage) {
    setLanguageSelection(prev => ({ ...prev, paperTwoLanguage: "English Language & Literature" }));
  }
  
  // Auto-select Paper Three for post 4 - default to "Technical Subject"
  if (postCode === "4" && !languageSelection.paperThreeLanguage) {
    setLanguageSelection(prev => ({ ...prev, paperThreeLanguage: "Technical Subject" }));
  }
  
  // Auto-select Paper Three for post 7 - default to "General Studies"
  if (postCode === "7" && !languageSelection.paperThreeLanguage) {
    setLanguageSelection(prev => ({ ...prev, paperThreeLanguage: "General Studies" }));
  }
}, [postsList, languageSelection.paperOneLanguage, languageSelection.paperTwoLanguage, languageSelection.paperThreeLanguage]);

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

  // Check if payment is completed
  if (feePayment.paymentStatus !== "completed") {
    toast.error("Please complete the payment before submitting the application.");
    setCurrentStep(6); // Redirect to payment step
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
  
  // Helper function to validate field on change
  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = "First name is required";
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'fathersName':
        if (!value.trim()) {
          newErrors.fathersName = "Father's name is required";
        } else {
          delete newErrors.fathersName;
        }
        break;
      case 'motherName':
        if (!value.trim()) {
          newErrors.motherName = "Mother's name is required";
        } else {
          delete newErrors.motherName;
        }
        break;
      case 'gender':
        if (!value) {
          newErrors.gender = "Gender is required";
        } else {
          delete newErrors.gender;
        }
        break;
      case 'nationality':
        if (!value) {
          newErrors.nationality = "Nationality is required";
        } else {
          delete newErrors.nationality;
        }
        break;
      case 'maritalStatus':
        if (!value) {
          newErrors.maritalStatus = "Marital status is required";
        } else {
          delete newErrors.maritalStatus;
        }
        break;
      case 'mobileNumber':
        if (!value) {
          newErrors.mobileNumber = "Mobile number is required";
        } else if (value.length !== 10) {
          newErrors.mobileNumber = "Mobile number must be 10 digits";
        } else {
          delete newErrors.mobileNumber;
        }
        break;
      case 'emailId':
        if (!value) {
          newErrors.emailId = "Email ID is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.emailId = "Invalid email format";
        } else {
          delete newErrors.emailId;
        }
        break;
      case 'identificationMark1':
        if (!value.trim()) {
          newErrors.identificationMark1 = "Identification mark is required";
        } else {
          delete newErrors.identificationMark1;
        }
        break;
      case 'permanentStreet':
        if (!value.trim()) {
          newErrors.permanentStreet = "Street address is required";
        } else {
          delete newErrors.permanentStreet;
        }
        break;
      case 'permanentCity':
        if (!value.trim()) {
          newErrors.permanentCity = "City/Village is required";
        } else {
          delete newErrors.permanentCity;
        }
        break;
      case 'permanentPost':
        if (!value.trim()) {
          newErrors.permanentPost = "Post office is required";
        } else {
          delete newErrors.permanentPost;
        }
        break;
      case 'permanentState':
        if (!value) {
          newErrors.permanentState = "State is required";
        } else {
          delete newErrors.permanentState;
        }
        break;
      case 'permanentDistrict':
        if (!value) {
          newErrors.permanentDistrict = "District is required";
        } else {
          delete newErrors.permanentDistrict;
        }
        break;
      case 'permanentPincode':
        if (!value) {
          newErrors.permanentPincode = "Pincode is required";
        } else if (value.length !== 6) {
          newErrors.permanentPincode = "Pincode must be 6 digits";
        } else {
          delete newErrors.permanentPincode;
        }
        break;
      case 'correspondenceStreet':
        if (!personalInfo.sameAsPermanent && !value.trim()) {
          newErrors.correspondenceStreet = "Street address is required";
        } else {
          delete newErrors.correspondenceStreet;
        }
        break;
      case 'correspondenceCity':
        if (!personalInfo.sameAsPermanent && !value.trim()) {
          newErrors.correspondenceCity = "City/Village is required";
        } else {
          delete newErrors.correspondenceCity;
        }
        break;
      case 'correspondencePost':
        if (!personalInfo.sameAsPermanent && !value.trim()) {
          newErrors.correspondencePost = "Post office is required";
        } else {
          delete newErrors.correspondencePost;
        }
        break;
      case 'correspondenceState':
        if (!personalInfo.sameAsPermanent && !value) {
          newErrors.correspondenceState = "State is required";
        } else {
          delete newErrors.correspondenceState;
        }
        break;
      case 'correspondenceDistrict':
        if (!personalInfo.sameAsPermanent && !value) {
          newErrors.correspondenceDistrict = "District is required";
        } else {
          delete newErrors.correspondenceDistrict;
        }
        break;
      case 'correspondencePincode':
        if (!personalInfo.sameAsPermanent && !value) {
          newErrors.correspondencePincode = "Pincode is required";
        } else if (!personalInfo.sameAsPermanent && value.length !== 6) {
          newErrors.correspondencePincode = "Pincode must be 6 digits";
        } else {
          delete newErrors.correspondencePincode;
        }
        break;
    }
    
    setStepErrors(prev => ({ ...prev, [0]: newErrors }));
  };

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
          {/* Full Name */}
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
                validateField('firstName', value);
              }}
              onKeyDown={validateTextInput}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          
          {/* Father's Name */}
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
                validateField('fathersName', value);
              }}
              onKeyDown={validateTextInput}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.fathersName ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.fathersName && <p className="text-red-500 text-xs mt-1">{errors.fathersName}</p>}
          </div>
          
          {/* Mother's Name */}
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
                validateField('motherName', value);
              }}
              onKeyDown={validateTextInput}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.motherName ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
          </div>
          
          {/* Date of Birth */}
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
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.dob ? 'border-red-500' : 'border-slate-300'}`}
              />
              {personalInfo.age > 0 && (
                <div className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
                  personalInfo.age >= 21 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <Calendar size={16} />
                  <span className="text-sm font-medium">Age: {personalInfo.age} years</span>
                </div>
              )}
            </div>
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            {personalInfo.dob && personalInfo.age > 0 && personalInfo.age < 21 && (
              <p className="text-red-500 text-xs mt-1">
                ⚠️ You must be at least 21 years old to apply. Current age: {personalInfo.age} years
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Age must be 21 years or above as of 01.08.2025.
            </p>
          </div>
          
          {/* Gender */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Gender<span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.gender}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, gender: e.target.value });
                validateField('gender', e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.gender ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Thirdgender</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          
          {/* Nationality */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Nationality <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.nationality}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, nationality: e.target.value });
                validateField('nationality', e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.nationality ? 'border-red-500' : 'border-slate-300'}`}
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
          
          {/* Marital Status */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Marital Status <span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.maritalStatus}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, maritalStatus: e.target.value });
                validateField('maritalStatus', e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.maritalStatus ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select Marital Status</option>
              <option value="unmarried">Unmarried</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
            {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
          </div>
        </div>
      </div>

      {/* Identification Details Section - Same as before with added validation */}
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
                validateField('identificationMark1', e.target.value);
              }}
              placeholder="e.g., Mole on left cheek"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.identificationMark1 ? 'border-red-500' : 'border-slate-300'}`}
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

      {/* Contact Details Section */}
      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-primary" />
            Contact Details & Verification
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Mobile Number */}
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
                  validateField('mobileNumber', value);
                  if (mobileOtpVerified) {
                    setMobileOtpVerified(false);
                    setMobileOtpSent(false);
                  }
                }}
                onKeyDown={validateNumberInput}
                placeholder="9876543210"
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.mobileNumber ? 'border-red-500' : 'border-slate-300'}`}
                disabled={mobileOtpVerified}
              />
              {!mobileOtpVerified ? (
                <button
                  onClick={sendMobileOtp}
                  disabled={mobileOtpSent}
                  className={`px-4 py-2 text-white rounded-lg text-sm whitespace-nowrap transition-all ${
                    mobileOtpSent ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
                  }`}
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

          {/* Aadhar Number */}
          {/* Aadhar Number */}
<div>
  <label className="block text-slate-700 text-sm font-medium mb-2">
    Aadhar Card Number <span className="text-red-600">*</span>
  </label>
  <input
    type="text"
    maxLength={12}
    value={personalInfo.aadharNumber}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, '');
      setPersonalInfo({ ...personalInfo, aadharNumber: value });
      // Validate on change
      if (value) {
        if (value.length !== 12) {
          setStepErrors(prev => ({
            ...prev,
            [0]: { ...prev[0], aadharNumber: "Aadhar card number must be exactly 12 digits" }
          }));
        } else {
          setStepErrors(prev => ({
            ...prev,
            [0]: { ...prev[0], aadharNumber: "" }
          }));
        }
      } else {
        setStepErrors(prev => ({
          ...prev,
          [0]: { ...prev[0], aadharNumber: "Aadhar card number is required" }
        }));
      }
    }}
    onKeyDown={validateNumberInput}
    placeholder="Enter 12 digit Aadhar number"
    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
      errors.aadharNumber ? 'border-red-500' : 'border-slate-300'
    }`}
  />
  {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
  <p className="text-xs text-slate-500 mt-1">
    Aadhar card is mandatory. Please enter valid 12-digit number.
  </p>
</div>

          {/* Email ID */}
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
                  validateField('emailId', e.target.value);
                  if (emailOtpVerified) {
                    setEmailOtpVerified(false);
                    setEmailOtpSent(false);
                  }
                }}
                placeholder="example@domain.com"
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.emailId ? 'border-red-500' : 'border-slate-300'}`}
                disabled={emailOtpVerified}
              />
              {!emailOtpVerified ? (
                <button
                  onClick={sendEmailOtp}
                  disabled={emailOtpSent}
                  className={`px-4 py-2 text-white rounded-lg text-sm whitespace-nowrap transition-all ${
                    emailOtpSent ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
                  }`}
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

      {/* Permanent Address Section */}
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
                const newStreet = e.target.value;
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, street: newStreet },
                });
                validateField('permanentStreet', newStreet);
                if (personalInfo.sameAsPermanent) {
                  setPersonalInfo(prev => ({
                    ...prev,
                    correspondenceAddress: { ...prev.correspondenceAddress, street: newStreet },
                  }));
                  validateField('correspondenceStreet', newStreet);
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.permanentStreet ? 'border-red-500' : 'border-slate-300'}`}
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
                const newCity = e.target.value;
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, cityOrVillage: newCity },
                });
                validateField('permanentCity', newCity);
                if (personalInfo.sameAsPermanent) {
                  setPersonalInfo(prev => ({
                    ...prev,
                    correspondenceAddress: { ...prev.correspondenceAddress, cityOrVillage: newCity },
                  }));
                  validateField('correspondenceCity', newCity);
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.permanentCity ? 'border-red-500' : 'border-slate-300'}`}
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
                const newPost = e.target.value;
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: { ...personalInfo.permanentAddress, post: newPost },
                });
                validateField('permanentPost', newPost);
                if (personalInfo.sameAsPermanent) {
                  setPersonalInfo(prev => ({
                    ...prev,
                    correspondenceAddress: { ...prev.correspondenceAddress, post: newPost },
                  }));
                  validateField('correspondencePost', newPost);
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg ${errors.permanentPost ? 'border-red-500' : 'border-slate-300'}`}
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
                  validateField('permanentState', selectedState.stateName);
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${errors.permanentState ? 'border-red-500' : 'border-slate-300'}`}
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
                  validateField('permanentDistrict', selectedDistrict.districtName);
                }
              }}
              disabled={!personalInfo.permanentAddress.stateId}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100 ${errors.permanentDistrict ? 'border-red-500' : 'border-slate-300'}`}
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
                validateField('permanentPincode', value);
                if (personalInfo.sameAsPermanent) {
                  setPersonalInfo(prev => ({
                    ...prev,
                    correspondenceAddress: { ...prev.correspondenceAddress, pincode: value },
                  }));
                  validateField('correspondencePincode', value);
                }
              }}
              onKeyDown={validateNumberInput}
              className={`w-full px-4 py-2 border rounded-lg ${errors.permanentPincode ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.permanentPincode && <p className="text-red-500 text-xs mt-1">{errors.permanentPincode}</p>}
          </div>
        </div>
      </div>

      {/* Correspondence Address Section */}
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
                // Clear correspondence errors when same as permanent
                validateField('correspondenceStreet', personalInfo.permanentAddress.street);
                validateField('correspondenceCity', personalInfo.permanentAddress.cityOrVillage);
                validateField('correspondencePost', personalInfo.permanentAddress.post);
                validateField('correspondenceState', personalInfo.permanentAddress.state);
                validateField('correspondenceDistrict', personalInfo.permanentAddress.district);
                validateField('correspondencePincode', personalInfo.permanentAddress.pincode);
                
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
                validateField('correspondenceStreet', e.target.value);
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
                validateField('correspondenceCity', e.target.value);
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
                validateField('correspondencePost', e.target.value);
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
                  validateField('correspondenceState', selectedState.stateName);
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
                  validateField('correspondenceDistrict', selectedDistrict.districtName);
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
                validateField('correspondencePincode', value);
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
  
  // Get main categories from API - all top-level categories
  const mainCategories = categoriesList;
  
  // Find the Scheduled Tribe (ST) category
  const stCategory = categoriesList.find((cat: any) => 
    cat.label === "Scheduled Tribe (ST)" || 
    cat.label === "Scheduled Tribe" ||
    (cat.label && cat.label.toLowerCase().includes("scheduled tribe"))
  );
  
  // Get subcategories from the ST category (Primitive Tribe and Other ST)
  const stSubCategories = stCategory?.subCategories || [];
  
  // Get Primitive Tribe category
  const primitiveTribeCategory = stSubCategories.find((sub: any) => 
    sub.label === "Primitive Tribe" || sub.label === "Primitive Tribe "
  );
  
  // Get primitive tribe subcategories (actual tribes like Asur, Birhor, etc.)
  const primitiveTribeSubCategories = primitiveTribeCategory?.subCategories || [];

  // Helper function to validate field on change
  const validateReservationField = (field: string, value: any) => {
    const newErrors = { ...stepErrors[1] || {} };
    
    switch (field) {
      case 'isLocallyResident':
        if (!value) {
          newErrors.isLocallyResident = "Please select an option";
        } else {
          delete newErrors.isLocallyResident;
        }
        break;
      case 'localDistrictId':
        if (reservationCategory.isLocallyResident === "yes" && !value) {
          newErrors.localDistrictName = "Please select your district of local residence";
        } else {
          delete newErrors.localDistrictName;
        }
        break;
      case 'isJharkhandDomicile':
        if (!value) {
          newErrors.isJharkhandDomicile = "Please select Jharkhand Domicile status";
        } else {
          delete newErrors.isJharkhandDomicile;
        }
        break;
      case 'mainCategoryId':
        if (!value && reservationCategory.isJharkhandDomicile === "yes") {
          newErrors.mainCategory = "Please select a category";
        } else if (!value && reservationCategory.isJharkhandDomicile === "no") {
          newErrors.mainCategory = "Please select a category";
        } else {
          delete newErrors.mainCategory;
        }
        break;
      case 'domicileCertificateNumber':
        if (reservationCategory.isJharkhandDomicile === "yes" && !value.trim()) {
          newErrors.domicileCertificateNumber = "Domicile certificate number is required";
        } else {
          delete newErrors.domicileCertificateNumber;
        }
        break;
      case 'domicileCertificateAuthority':
        if (reservationCategory.isJharkhandDomicile === "yes" && !value.trim()) {
          newErrors.domicileCertificateAuthority = "Domicile certificate issuing authority is required";
        } else {
          delete newErrors.domicileCertificateAuthority;
        }
        break;
      case 'domicileCertificateIssueDate':
        if (reservationCategory.isJharkhandDomicile === "yes") {
          if (!value) {
            newErrors.domicileCertificateIssueDate = "Domicile certificate issue date is required";
          } else if (isFutureDate(value)) {
            newErrors.domicileCertificateIssueDate = "Issue date cannot be in the future";
          } else {
            delete newErrors.domicileCertificateIssueDate;
          }
        } else {
          delete newErrors.domicileCertificateIssueDate;
        }
        break;
      case 'categoryCertificateNumber':
        // Category Certificate Fields - Shows when a reserved category is selected (not UR/EWS) AND domicile is Yes
if (reservationCategory.isJharkhandDomicile === "yes" && 
    reservationCategory.mainCategoryId && 
    reservationCategory.mainCategory !== "UR (Unreserved)" && 
    reservationCategory.mainCategory !== "Unreserved" && 
    reservationCategory.mainCategory !== "Unreserved (UR)" &&
    reservationCategory.mainCategory !== "EWS") {
  if (!reservationCategory.categoryCertificateNumber.trim()) {
    errors.categoryCertificateNumber = "Category certificate number is required";
  }
  if (!reservationCategory.categoryCertificateAuthority.trim()) {
    errors.categoryCertificateAuthority = "Category certificate issuing authority is required";
  }
  if (!reservationCategory.categoryCertificateIssueDate) {
    errors.categoryCertificateIssueDate = "Category certificate issue date is required";
  } else if (isFutureDate(reservationCategory.categoryCertificateIssueDate)) {
    errors.categoryCertificateIssueDate = "Issue date cannot be in the future";
  }
}
        break;
      case 'categoryCertificateAuthority':
        if (reservationCategory.mainCategoryId && 
            reservationCategory.mainCategory !== "UR (Unreserved)" && 
            reservationCategory.mainCategory !== "Unreserved" && 
            reservationCategory.mainCategory !== "Unreserved (UR)" &&
            reservationCategory.mainCategory !== "EWS" && 
            !value.trim()) {
          newErrors.categoryCertificateAuthority = "Category certificate issuing authority is required";
        } else {
          delete newErrors.categoryCertificateAuthority;
        }
        break;
      case 'categoryCertificateIssueDate':
        if (reservationCategory.mainCategoryId && 
            reservationCategory.mainCategory !== "UR (Unreserved)" && 
            reservationCategory.mainCategory !== "Unreserved" && 
            reservationCategory.mainCategory !== "Unreserved (UR)" &&
            reservationCategory.mainCategory !== "EWS") {
          if (!value) {
            newErrors.categoryCertificateIssueDate = "Category certificate issue date is required";
          } else if (isFutureDate(value)) {
            newErrors.categoryCertificateIssueDate = "Issue date cannot be in the future";
          } else {
            delete newErrors.categoryCertificateIssueDate;
          }
        } else {
          delete newErrors.categoryCertificateIssueDate;
        }
        break;
      case 'pwdTypeId':
        if (reservationCategory.isPwd === "yes" && !value) {
          newErrors.pwdType = "Please select disability type";
        } else {
          delete newErrors.pwdType;
        }
        break;
      case 'pwdPercentage':
        if (reservationCategory.isPwd === "yes") {
          if (!value) {
            newErrors.pwdPercentage = "Please enter disability percentage";
          } else {
            const percent = parseInt(value);
            if (isNaN(percent)) {
              newErrors.pwdPercentage = "Please enter a valid number";
            } else if (percent < 40) {
              newErrors.pwdPercentage = "Disability percentage must be at least 40%";
            } else if (percent > 100) {
              newErrors.pwdPercentage = "Disability percentage cannot exceed 100%";
            } else {
              delete newErrors.pwdPercentage;
            }
          }
        } else {
          delete newErrors.pwdPercentage;
        }
        break;
      case 'pwdCertificateNumber':
        if (reservationCategory.isPwd === "yes" && !value.trim()) {
          newErrors.pwdCertificateNumber = "PwD certificate number is required";
        } else {
          delete newErrors.pwdCertificateNumber;
        }
        break;
      case 'pwdCertificateAuthority':
        if (reservationCategory.isPwd === "yes" && !value.trim()) {
          newErrors.pwdCertificateAuthority = "PwD certificate issuing authority is required";
        } else {
          delete newErrors.pwdCertificateAuthority;
        }
        break;
      case 'pwdCertificateIssueDate':
        if (reservationCategory.isPwd === "yes") {
          if (!value) {
            newErrors.pwdCertificateIssueDate = "PwD certificate issue date is required";
          } else if (isFutureDate(value)) {
            newErrors.pwdCertificateIssueDate = "Issue date cannot be in the future";
          } else {
            delete newErrors.pwdCertificateIssueDate;
          }
        } else {
          delete newErrors.pwdCertificateIssueDate;
        }
        break;
      case 'exServicemanYears':
        if (reservationCategory.isExServiceman === "yes") {
          if (!value) {
            newErrors.exServicemanYears = "Please enter years of service";
          } else {
            const years = parseInt(value);
            if (isNaN(years)) {
              newErrors.exServicemanYears = "Please enter a valid number";
            } else if (years < 0 || years > 30) {
              newErrors.exServicemanYears = "Years of service must be between 0 and 30";
            } else {
              delete newErrors.exServicemanYears;
            }
          }
        } else {
          delete newErrors.exServicemanYears;
        }
        break;
      case 'sportsLevel':
        if (reservationCategory.isSportsQuota === "yes" && !value) {
          newErrors.sportsLevel = "Please select sports level";
        } else {
          delete newErrors.sportsLevel;
        }
        break;
      case 'sportsAchievement':
        if (reservationCategory.isSportsQuota === "yes" && !value.trim()) {
          newErrors.sportsAchievement = "Please describe your achievements";
        } else {
          delete newErrors.sportsAchievement;
        }
        break;
      case 'sportsCertificateNumber':
        if (reservationCategory.isSportsQuota === "yes" && !value.trim()) {
          newErrors.sportsCertificateNumber = "Sports certificate number is required";
        } else {
          delete newErrors.sportsCertificateNumber;
        }
        break;
      case 'sportsCertificateAuthority':
        if (reservationCategory.isSportsQuota === "yes" && !value.trim()) {
          newErrors.sportsCertificateAuthority = "Sports certificate issuing authority is required";
        } else {
          delete newErrors.sportsCertificateAuthority;
        }
        break;
      case 'sportsCertificateIssueDate':
        if (reservationCategory.isSportsQuota === "yes") {
          if (!value) {
            newErrors.sportsCertificateIssueDate = "Sports certificate issue date is required";
          } else if (isFutureDate(value)) {
            newErrors.sportsCertificateIssueDate = "Issue date cannot be in the future";
          } else {
            delete newErrors.sportsCertificateIssueDate;
          }
        } else {
          delete newErrors.sportsCertificateIssueDate;
        }
        break;
      case 'declaration':
        if (!value) {
          newErrors.declaration = "Please accept the declaration";
        } else {
          delete newErrors.declaration;
        }
        break;
    }
    
    setStepErrors(prev => ({ ...prev, [1]: newErrors }));
  };

  // // Handle Jharkhand Domicile change
  // const handleDomicileChange = (value: string) => {
  //   setReservationCategory({ 
  //     ...reservationCategory, 
  //     isJharkhandDomicile: value 
  //   });
  //   validateReservationField('isJharkhandDomicile', value);
    
  //   if (value === "no") {
  //     const unreservedCategory = mainCategories.find((cat: any) => 
  //       cat.label === "UR (Unreserved)" || cat.label === "Unreserved (UR)" || cat.label === "UR"
  //     );
  //     if (unreservedCategory) {
  //       setReservationCategory((prev: any) => ({
  //         ...prev,
  //         isJharkhandDomicile: value,
  //         mainCategory: unreservedCategory.label,
  //         mainCategoryId: unreservedCategory.value,
  //         subCategory: "",
  //         subCategoryId: undefined,
  //       }));
  //       setSelectedPrimitiveTribeId(undefined);
  //       validateReservationField('mainCategoryId', unreservedCategory.value);
  //       const fee = unreservedCategory.label === "Scheduled Caste (SC)" || unreservedCategory.label === "Scheduled Tribe (ST)" ? "50" : "100";
  //       setFeePayment({ ...feePayment, applicationFee: fee });
  //     }
  //   }
  // };

  // Handle Jharkhand Domicile change - Updated
const handleDomicileChange = (value: string) => {
  setReservationCategory({ 
    ...reservationCategory, 
    isJharkhandDomicile: value 
  });
  validateReservationField('isJharkhandDomicile', value);
  
  if (value === "no") {
    // Find the Unreserved (UR) category
    const unreservedCategory = mainCategories.find((cat: any) => 
      cat.label === "UR (Unreserved)" || cat.label === "Unreserved (UR)" || cat.label === "Unreserved" || cat.label === "UR"
    );
    if (unreservedCategory) {
      setReservationCategory((prev: any) => ({
        ...prev,
        isJharkhandDomicile: value,
        mainCategory: unreservedCategory.label,
        mainCategoryId: unreservedCategory.value,
        subCategory: "",
        subCategoryId: undefined,
        subSubCategoryId: undefined,
      }));
      setSelectedPrimitiveTribeId(undefined);
      validateReservationField('mainCategoryId', unreservedCategory.value);
      const fee = unreservedCategory.label === "Scheduled Caste (SC)" || unreservedCategory.label === "Scheduled Tribe (ST)" ? "50" : "100";
      setFeePayment({ ...feePayment, applicationFee: fee });
    }
  } else if (value === "yes") {
    // Reset category when domicile changes to Yes
    setReservationCategory((prev: any) => ({
      ...prev,
      isJharkhandDomicile: value,
      mainCategory: "",
      mainCategoryId: undefined,
      subCategory: "",
      subCategoryId: undefined,
      subSubCategoryId: undefined,
    }));
  }
};



  // Handle category change
  const handleCategoryChange = (selectedValue: number) => {
    const selected = mainCategories.find((cat: any) => cat.value === selectedValue);
    if (selected) {
      setReservationCategory({
        ...reservationCategory,
        mainCategory: selected.label,
        mainCategoryId: selected.value,
        subCategory: "",
        subCategoryId: undefined,
      });
      setSelectedPrimitiveTribeId(undefined);
      validateReservationField('mainCategoryId', selectedValue);
      const fee = selected.label === "Scheduled Caste (SC)" || selected.label === "Scheduled Tribe (ST)" ? "50" : "100";
      setFeePayment({ ...feePayment, applicationFee: fee });
    }
  };

  // Handle ST SubCategory change (Primitive Tribe or Other ST)
  const handleStSubCategoryChange = (selectedValue: number) => {
    if (selectedValue === primitiveTribeCategory?.value) {
      setSelectedPrimitiveTribeId(selectedValue);
      setReservationCategory({
        ...reservationCategory,
        subCategory: primitiveTribeCategory.label,
        subCategoryId: primitiveTribeCategory.value,
      });
    } else {
      const otherStCategory = stSubCategories.find((sub: any) => sub.value === selectedValue);
      if (otherStCategory) {
        setSelectedPrimitiveTribeId(undefined);
        setReservationCategory({
          ...reservationCategory,
          subCategory: otherStCategory.label,
          subCategoryId: otherStCategory.value,
        });
      }
    }
  };

  // Handle actual tribe selection (from primitive tribe subcategories)
  const handleTribeSelection = (selectedValue: number) => {
    const selectedTribe = primitiveTribeSubCategories.find((sub: any) => sub.value === selectedValue);
    if (selectedTribe) {
      setReservationCategory({
        ...reservationCategory,
        subCategory: selectedTribe.label,
        subCategoryId: selectedTribe.value,
        subSubCategoryId: selectedTribe.value,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
          Category Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Locally Resident of Jharkhand - Dropdown Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Are you Local Resident of Jharkhand? <span className="text-red-600">*</span>
            </label>
            <select
              value={reservationCategory.isLocallyResident || ""}
              onChange={(e) => {
                setReservationCategory({ ...reservationCategory, isLocallyResident: e.target.value });
                validateReservationField('isLocallyResident', e.target.value);
              }}
              className={`w-full h-12 border rounded-lg px-4 ${errors.isLocallyResident ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.isLocallyResident && <p className="text-red-500 text-xs mt-1">{errors.isLocallyResident}</p>}
          </div>

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
                  onChange={(e) => handleDomicileChange(e.target.value)}
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
                  onChange={(e) => handleDomicileChange(e.target.value)}
                  className="w-4 h-4 text-primary"
                />
                No
              </label>
            </div>
            {errors.isJharkhandDomicile && <p className="text-red-500 text-xs mt-1">{errors.isJharkhandDomicile}</p>}
          </div>

          {/* <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Reservation Category <span className="text-red-600">*</span>
            </label>
            <select
              value={reservationCategory.mainCategoryId || ""}
              onChange={(e) => handleCategoryChange(Number(e.target.value))}
              className={`w-full h-12 border rounded-lg px-4 ${errors.mainCategory ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select Category</option>
              {mainCategories.map((cat: any) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.mainCategory && <p className="text-red-500 text-xs mt-1">{errors.mainCategory}</p>}
          </div> */}

          <div>
  <label className="block text-sm font-semibold text-slate-800 mb-2">
    Reservation Category <span className="text-red-600">*</span>
  </label>
  <select
    value={reservationCategory.mainCategoryId || ""}
    onChange={(e) => handleCategoryChange(Number(e.target.value))}
    disabled={reservationCategory.isJharkhandDomicile === "no"}
    className={`w-full h-12 border rounded-lg px-4 ${
      reservationCategory.isJharkhandDomicile === "no" ? "bg-slate-100 cursor-not-allowed" : "bg-white"
    } ${errors.mainCategory ? 'border-red-500' : 'border-slate-300'}`}
  >
    <option value="">Select Category</option>
    {mainCategories.map((cat: any) => (
      <option key={cat.value} value={cat.value}>
        {cat.label}
      </option>
    ))}
  </select>
  {errors.mainCategory && <p className="text-red-500 text-xs mt-1">{errors.mainCategory}</p>}
  {reservationCategory.isJharkhandDomicile === "no" && (
    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
      <Info size={12} />
      Category is automatically set to Unreserved (UR) when Domicile is No.
    </p>
  )}
</div>
          
          {/* ST Sub Category - Only show when ST is selected */}
          {reservationCategory.mainCategory === "Scheduled Tribe (ST)" && stSubCategories.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                ST Category Type <span className="text-red-600">*</span>
              </label>
              <select
                value={(() => {
                  if (reservationCategory.subCategoryId === primitiveTribeCategory?.value) {
                    return primitiveTribeCategory?.value;
                  }
                  const otherSt = stSubCategories.find((sub: any) => sub.value === reservationCategory.subCategoryId);
                  if (otherSt && otherSt.label === "Other ST") {
                    return otherSt.value;
                  }
                  return "";
                })()}
                onChange={(e) => handleStSubCategoryChange(Number(e.target.value))}
                className="w-full h-12 border border-slate-300 rounded-lg px-4 focus:ring-2 focus:ring-primary"
              >
                <option value="">Select ST Category Type</option>
                {primitiveTribeCategory && (
                  <option key={primitiveTribeCategory.value} value={primitiveTribeCategory.value}>
                    {primitiveTribeCategory.label}
                  </option>
                )}
                {stSubCategories.filter((sub: any) => sub.label === "Other ST").map((sub: any) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Third level dropdown - Show actual tribes when Primitive Tribe is selected */}
          {reservationCategory.mainCategory === "Scheduled Tribe (ST)" && 
           selectedPrimitiveTribeId === primitiveTribeCategory?.value && 
           primitiveTribeSubCategories.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Select Primitive Tribe <span className="text-red-600">*</span>
              </label>
              <select
                value={(() => {
                  const isTribeSelected = primitiveTribeSubCategories.some((sub: any) => sub.value === reservationCategory.subCategoryId);
                  return isTribeSelected ? reservationCategory.subCategoryId : "";
                })()}
                onChange={(e) => handleTribeSelection(Number(e.target.value))}
                className="w-full h-12 border border-slate-300 rounded-lg px-4 focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Tribe</option>
                {primitiveTribeSubCategories.map((sub: any) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* District of Local Residence - Dropdown Field */}
        {reservationCategory.isLocallyResident === "yes" && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Your District of Local Residence <span className="text-red-600">*</span>
            </label>
            <select
              value={reservationCategory.localDistrictId || ""}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const selectedDistrict = localDistricts.find(d => d.districtId === selectedId);
                if (selectedDistrict) {
                  setReservationCategory({
                    ...reservationCategory,
                    localDistrictId: selectedId,
                    localDistrictName: selectedDistrict.districtName,
                  });
                  validateReservationField('localDistrictId', selectedId);
                }
              }}
              className={`w-full h-12 border rounded-lg px-4 ${errors.localDistrictName ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select District</option>
              {localDistricts.map((district) => (
                <option key={district.districtId} value={district.districtId}>
                  {district.districtName}
                </option>
              ))}
            </select>
            {errors.localDistrictName && <p className="text-red-500 text-xs mt-1">{errors.localDistrictName}</p>}
          </div>
        )}
        
        {/* Category Certificate Fields */}
        {/* Category Certificate Fields - Only show for reserved categories and when domicile is Yes */}
{reservationCategory.isJharkhandDomicile === "yes" && 
 reservationCategory.mainCategoryId && 
 reservationCategory.mainCategory && 
 reservationCategory.mainCategory !== "UR (Unreserved)" && 
 reservationCategory.mainCategory !== "Unreserved" && 
 reservationCategory.mainCategory !== "Unreserved (UR)" &&
 reservationCategory.mainCategory !== "EWS" && (
  <>
    <div className="mt-4">
      <label className="block text-sm font-semibold text-slate-800 mb-2">
        Caste/Category Certificate Number <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        value={reservationCategory.categoryCertificateNumber}
        onChange={(e) => {
          setReservationCategory({ ...reservationCategory, categoryCertificateNumber: e.target.value });
          validateReservationField('categoryCertificateNumber', e.target.value);
        }}
        placeholder="Enter Category Certificate Number"
        className={`w-full px-4 py-2 border rounded-lg ${errors.categoryCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
      />
      {errors.categoryCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.categoryCertificateNumber}</p>}
    </div>
    
    <div className="mt-4">
      <label className="block text-sm font-semibold text-slate-800 mb-2">
        Caste/Category Certificate Date Of Issue <span className="text-red-600">*</span>
      </label>
      <input
        type="date"
        value={reservationCategory.categoryCertificateIssueDate}
        onChange={(e) => {
          setReservationCategory({ ...reservationCategory, categoryCertificateIssueDate: e.target.value });
          validateReservationField('categoryCertificateIssueDate', e.target.value);
        }}
        max={new Date().toISOString().split('T')[0]}
        className={`w-full px-4 py-2 border rounded-lg ${errors.categoryCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
      />
      {errors.categoryCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.categoryCertificateIssueDate}</p>}
    </div>
    
    <div className="mt-4">
      <label className="block text-sm font-semibold text-slate-800 mb-2">
        Certificate Issued Authority <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        value={reservationCategory.categoryCertificateAuthority}
        onChange={(e) => {
          setReservationCategory({ ...reservationCategory, categoryCertificateAuthority: e.target.value });
          validateReservationField('categoryCertificateAuthority', e.target.value);
        }}
        placeholder="Enter Certificate Issuing Authority (e.g., Tehsildar, District Magistrate)"
        className={`w-full px-4 py-2 border rounded-lg ${errors.categoryCertificateAuthority ? 'border-red-500' : 'border-slate-300'}`}
      />
      {errors.categoryCertificateAuthority && <p className="text-red-500 text-xs mt-1">{errors.categoryCertificateAuthority}</p>}
    </div>
  </>
)}
        
        {/* Domicile Certificate Fields */}
        {reservationCategory.isJharkhandDomicile === "yes" && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Residential / Domicile Certificate Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={reservationCategory.domicileCertificateNumber}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, domicileCertificateNumber: e.target.value });
                  validateReservationField('domicileCertificateNumber', e.target.value);
                }}
                placeholder="Enter Domicile Certificate Number"
                className={`w-full px-4 py-2 border rounded-lg ${errors.domicileCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.domicileCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificateNumber}</p>}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Certificate Date Of Issue <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={reservationCategory.domicileCertificateIssueDate}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, domicileCertificateIssueDate: e.target.value });
                  validateReservationField('domicileCertificateIssueDate', e.target.value);
                }}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg ${errors.domicileCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.domicileCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificateIssueDate}</p>}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Certificate Issued Authority <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={reservationCategory.domicileCertificateAuthority}
                onChange={(e) => {
                  setReservationCategory({ ...reservationCategory, domicileCertificateAuthority: e.target.value });
                  validateReservationField('domicileCertificateAuthority', e.target.value);
                }}
                placeholder="Enter Certificate Issuing Authority (e.g., Circle Officer, District Magistrate)"
                className={`w-full px-4 py-2 border rounded-lg ${errors.domicileCertificateAuthority ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.domicileCertificateAuthority && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificateAuthority}</p>}
            </div>
          </>
        )}
      </div>

      {/* Physical Handicap (PwD) Details */}
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
                    validateReservationField('pwdTypeId', reservationCategory.pwdTypeId);
                    validateReservationField('pwdPercentage', reservationCategory.pwdPercentage);
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
                    validateReservationField('pwdTypeId', null);
                    validateReservationField('pwdPercentage', null);
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
                    const selected = disabilitiesList.find((d: any) => d.id === selectedId);
                    if (selected) {
                      setReservationCategory({ 
                        ...reservationCategory, 
                        pwdTypeId: selectedId,
                        pwdType: selected.name
                      });
                      validateReservationField('pwdTypeId', selectedId);
                    }
                  }}
                  className={`w-full h-12 border rounded-lg px-4 ${errors.pwdType ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select Type</option>
                  {disabilitiesList.map((disability: any) => (
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
                    validateReservationField('pwdPercentage', value);
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
                    validateReservationField('pwdCertificateNumber', e.target.value);
                  }}
                  placeholder="Enter PwD Certificate Number"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.pwdCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.pwdCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.pwdCertificateNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Certificate Date Of Issue <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={reservationCategory.pwdCertificateIssueDate}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, pwdCertificateIssueDate: e.target.value });
                    validateReservationField('pwdCertificateIssueDate', e.target.value);
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.pwdCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.pwdCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.pwdCertificateIssueDate}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Certificate Issued Authority <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.pwdCertificateAuthority}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, pwdCertificateAuthority: e.target.value });
                    validateReservationField('pwdCertificateAuthority', e.target.value);
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

      {/* Ex-Serviceman Details */}
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
                    validateReservationField('exServicemanYears', reservationCategory.exServicemanYears);
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
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, isExServiceman: e.target.value });
                    validateReservationField('exServicemanYears', null);
                  }}
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
                  validateReservationField('exServicemanYears', value);
                }}
                placeholder="0-30"
                className={`w-full px-4 py-2 border rounded-lg ${errors.exServicemanYears ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.exServicemanYears && <p className="text-red-500 text-xs mt-1">{errors.exServicemanYears}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Sports Quota Details */}
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
                    validateReservationField('sportsLevel', reservationCategory.sportsLevel);
                    validateReservationField('sportsAchievement', reservationCategory.sportsAchievement);
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
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, isSportsQuota: e.target.value });
                    validateReservationField('sportsLevel', null);
                    validateReservationField('sportsAchievement', null);
                  }}
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
                    validateReservationField('sportsLevel', e.target.value);
                  }}
                  className={`w-full h-12 border rounded-lg px-4 ${errors.sportsLevel ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select Level</option>
                  <option value="international">Medal or Participation in International Level Competition organized by IOC/International Paralympic Committee or its affiliated federations.</option>
                  <option value="national">Medal or Participation in National Level Competition organized by IOA/Indian Paralympic Committee or its affiliated National Sports federations.</option>
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
                    validateReservationField('sportsAchievement', e.target.value);
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
                    validateReservationField('sportsCertificateNumber', e.target.value);
                  }}
                  placeholder="Enter Sports Certificate Number"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sportsCertificateNumber ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.sportsCertificateNumber && <p className="text-red-500 text-xs mt-1">{errors.sportsCertificateNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Certificate Date Of Issue <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={reservationCategory.sportsCertificateIssueDate}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsCertificateIssueDate: e.target.value });
                    validateReservationField('sportsCertificateIssueDate', e.target.value);
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sportsCertificateIssueDate ? 'border-red-500' : 'border-slate-300'}`}
                />
                {errors.sportsCertificateIssueDate && <p className="text-red-500 text-xs mt-1">{errors.sportsCertificateIssueDate}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Certificate Issued Authority <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={reservationCategory.sportsCertificateAuthority}
                  onChange={(e) => {
                    setReservationCategory({ ...reservationCategory, sportsCertificateAuthority: e.target.value });
                    validateReservationField('sportsCertificateAuthority', e.target.value);
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

      {/* Declaration */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={reservationCategory.declaration}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setReservationCategory({ ...reservationCategory, declaration: isChecked });
              validateReservationField('declaration', isChecked);
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
  
  // Get degree options for dropdown from API
  const bachelorDegreeOptions = bachelorDegrees.map(degree => degree.degreeName);
  const masterDegreeOptions = masterDegrees.map(degree => degree.degreeName);
  
  // Helper function to validate education field on change
  const validateEducationField = (field: string, value: any, section: string) => {
    console.log(section)
    const newErrors = { ...stepErrors[2] || {} };
    
    const validatePercentage = (percentValue: string, errorKey: string) => {
      if (percentValue && percentValue !== "") {
        const percentage = parseFloat(percentValue);
        if (isNaN(percentage)) {
          newErrors[errorKey] = "Please enter a valid percentage";
          return false;
        } else if (percentage < 0 || percentage > 100) {
          newErrors[errorKey] = "Percentage must be between 0 and 100";
          return false;
        } else {
          delete newErrors[errorKey];
          return true;
        }
      } else {
        delete newErrors[errorKey];
        return true;
      }
    };
    
    const validateTotalMarks = (marksValue: string, errorKey: string) => {
      if (marksValue && marksValue !== "") {
        const totalMarks = parseFloat(marksValue);
        if (isNaN(totalMarks) || totalMarks <= 0) {
          newErrors[errorKey] = "Total marks must be a valid positive number";
          return false;
        } else {
          delete newErrors[errorKey];
          return true;
        }
      } else {
        delete newErrors[errorKey];
        return true;
      }
    };
    
    const validateMarksObtained = (obtainedValue: string, errorKey: string, totalValue?: string, totalErrorKey?: string) => {
      console.log(totalErrorKey)
      if (obtainedValue && obtainedValue !== "") {
        const marksObtained = parseFloat(obtainedValue);
        if (isNaN(marksObtained) || marksObtained < 0) {
          newErrors[errorKey] = "Marks obtained must be a valid positive number";
          return false;
        }
        if (totalValue && totalValue !== "") {
          const totalMarks = parseFloat(totalValue);
          if (!isNaN(totalMarks) && marksObtained > totalMarks) {
            newErrors[errorKey] = "Marks obtained cannot exceed total marks";
            return false;
          }
        }
        delete newErrors[errorKey];
        return true;
      } else {
        delete newErrors[errorKey];
        return true;
      }
    };
    
    switch (field) {
      case 'tenthBoard':
        if (!value) {
          newErrors.tenthBoard = "10th board is required";
        } else {
          delete newErrors.tenthBoard;
        }
        break;
      case 'tenthPercentage':
        validatePercentage(value, 'tenthPercentage');
        // Check if either percentage or marks are provided
        if (!value && !education.tenth.totalMarks && !education.tenth.marksObtained) {
          newErrors.tenthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
        } else {
          delete newErrors.tenthMarks;
        }
        break;
      case 'tenthTotalMarks':
        validateTotalMarks(value, 'tenthTotalMarks');
        if (education.tenth.marksObtained && education.tenth.marksObtained !== "") {
          validateMarksObtained(education.tenth.marksObtained, 'tenthMarksObtained', value, 'tenthTotalMarks');
        }
        if (!value && !education.tenth.percentage && !education.tenth.marksObtained) {
          newErrors.tenthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
        } else {
          delete newErrors.tenthMarks;
        }
        break;
      case 'tenthMarksObtained':
        validateMarksObtained(value, 'tenthMarksObtained', education.tenth.totalMarks, 'tenthTotalMarks');
        if (!value && !education.tenth.percentage && !education.tenth.totalMarks) {
          newErrors.tenthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
        } else {
          delete newErrors.tenthMarks;
        }
        break;
      case 'tenthCertificate':
        if (!value) {
          newErrors.tenthCertificate = "10th certificate number is required";
        } else {
          delete newErrors.tenthCertificate;
        }
        break;
      case 'twelfthBoard':
        if (value || education.twelfth.percentage || education.twelfth.totalMarks || education.twelfth.marksObtained) {
          if (!value) {
            newErrors.twelfthBoard = "12th board is required";
          } else {
            delete newErrors.twelfthBoard;
          }
        } else {
          delete newErrors.twelfthBoard;
        }
        break;
      case 'twelfthPercentage':
        validatePercentage(value, 'twelfthPercentage');
        if (value || education.twelfth.totalMarks || education.twelfth.marksObtained) {
          if (!value && !education.twelfth.totalMarks && !education.twelfth.marksObtained) {
            newErrors.twelfthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
          } else {
            delete newErrors.twelfthMarks;
          }
        } else {
          delete newErrors.twelfthMarks;
        }
        break;
      case 'twelfthTotalMarks':
        validateTotalMarks(value, 'twelfthTotalMarks');
        if (education.twelfth.marksObtained && education.twelfth.marksObtained !== "") {
          validateMarksObtained(education.twelfth.marksObtained, 'twelfthMarksObtained', value, 'twelfthTotalMarks');
        }
        if (value || education.twelfth.percentage || education.twelfth.marksObtained) {
          if (!value && !education.twelfth.percentage && !education.twelfth.marksObtained) {
            newErrors.twelfthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
          } else {
            delete newErrors.twelfthMarks;
          }
        } else {
          delete newErrors.twelfthMarks;
        }
        break;
      case 'twelfthMarksObtained':
        validateMarksObtained(value, 'twelfthMarksObtained', education.twelfth.totalMarks, 'twelfthTotalMarks');
        if (value || education.twelfth.percentage || education.twelfth.totalMarks) {
          if (!value && !education.twelfth.percentage && !education.twelfth.totalMarks) {
            newErrors.twelfthMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
          } else {
            delete newErrors.twelfthMarks;
          }
        } else {
          delete newErrors.twelfthMarks;
        }
        break;
      case 'graduationCourse':
        if (!value) {
          newErrors.graduationCourse = "Graduation course is required";
        } else {
          delete newErrors.graduationCourse;
        }
        break;
      case 'graduationUniversity':
        if (!value) {
          newErrors.graduationUniversity = "University name is required";
        } else {
          delete newErrors.graduationUniversity;
        }
        break;
      case 'graduationPercentage':
        validatePercentage(value, 'graduationPercentage');
        if (!value && !education.graduation.totalMarks && !education.graduation.marksObtained) {
          newErrors.graduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
        } else {
          delete newErrors.graduationMarks;
        }
        break;
      case 'graduationTotalMarks':
        validateTotalMarks(value, 'graduationTotalMarks');
        if (education.graduation.marksObtained && education.graduation.marksObtained !== "") {
          validateMarksObtained(education.graduation.marksObtained, 'graduationMarksObtained', value, 'graduationTotalMarks');
        }
        if (!value && !education.graduation.percentage && !education.graduation.marksObtained) {
          newErrors.graduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
        } else {
          delete newErrors.graduationMarks;
        }
        break;
      case 'graduationMarksObtained':
        validateMarksObtained(value, 'graduationMarksObtained', education.graduation.totalMarks, 'graduationTotalMarks');
        if (!value && !education.graduation.percentage && !education.graduation.totalMarks) {
          newErrors.graduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
        } else {
          delete newErrors.graduationMarks;
        }
        break;
      case 'graduationCertificate':
        if (!value) {
          newErrors.graduationCertificate = "Certificate number is required";
        } else {
          delete newErrors.graduationCertificate;
        }
        break;
      case 'postGraduationDegree':
        if (education.postGraduation.hasPostGraduation && !value) {
          newErrors.postGraduationDegree = "Post-graduation degree name is required";
        } else {
          delete newErrors.postGraduationDegree;
        }
        break;
      case 'postGraduationUniversity':
        if (education.postGraduation.hasPostGraduation && !value) {
          newErrors.postGraduationUniversity = "University name is required";
        } else {
          delete newErrors.postGraduationUniversity;
        }
        break;
      case 'postGraduationPercentage':
        if (education.postGraduation.hasPostGraduation) {
          validatePercentage(value, 'postGraduationPercentage');
          if (!value && !education.postGraduation.totalMarks && !education.postGraduation.marksObtained) {
            newErrors.postGraduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
          } else {
            delete newErrors.postGraduationMarks;
          }
        } else {
          delete newErrors.postGraduationPercentage;
          delete newErrors.postGraduationMarks;
        }
        break;
      case 'postGraduationTotalMarks':
        if (education.postGraduation.hasPostGraduation) {
          validateTotalMarks(value, 'postGraduationTotalMarks');
          if (education.postGraduation.marksObtained && education.postGraduation.marksObtained !== "") {
            validateMarksObtained(education.postGraduation.marksObtained, 'postGraduationMarksObtained', value, 'postGraduationTotalMarks');
          }
          if (!value && !education.postGraduation.percentage && !education.postGraduation.marksObtained) {
            newErrors.postGraduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
          } else {
            delete newErrors.postGraduationMarks;
          }
        } else {
          delete newErrors.postGraduationTotalMarks;
          delete newErrors.postGraduationMarks;
        }
        break;
      case 'postGraduationMarksObtained':
        if (education.postGraduation.hasPostGraduation) {
          validateMarksObtained(value, 'postGraduationMarksObtained', education.postGraduation.totalMarks, 'postGraduationTotalMarks');
          if (!value && !education.postGraduation.percentage && !education.postGraduation.totalMarks) {
            newErrors.postGraduationMarks = "Please enter either Percentage/CGPA or Total Marks & Marks Obtained";
          } else {
            delete newErrors.postGraduationMarks;
          }
        } else {
          delete newErrors.postGraduationMarksObtained;
          delete newErrors.postGraduationMarks;
        }
        break;
    }
    
    setStepErrors(prev => ({ ...prev, [2]: newErrors }));
  };
  
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
                validateEducationField('tenthBoard', value, 'tenth');
              }}
              placeholder="Select Board"
              required
            />
            {errors.tenthBoard && <p className="text-red-500 text-xs mt-1">{errors.tenthBoard}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Total Marks
            </label>
            <input
              type="text"
              value={education.tenth.totalMarks}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({ ...education, tenth: { ...education.tenth, totalMarks: value } });
                validateEducationField('tenthTotalMarks', value, 'tenth');
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 500"
              className={`w-full px-4 py-2 border rounded-lg ${errors.tenthTotalMarks ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.tenthTotalMarks && <p className="text-red-500 text-xs mt-1">{errors.tenthTotalMarks}</p>}
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
                validateEducationField('tenthMarksObtained', value, 'tenth');
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 450"
              className={`w-full px-4 py-2 border rounded-lg ${errors.tenthMarksObtained ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.tenthMarksObtained && <p className="text-red-500 text-xs mt-1">{errors.tenthMarksObtained}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage (%) / CGPA <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.tenth.percentage}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, '');
                const decimalCount = (value.match(/\./g) || []).length;
                if (decimalCount > 1) {
                  value = value.slice(0, value.lastIndexOf('.'));
                }
                setEducation({ ...education, tenth: { ...education.tenth, percentage: value } });
                validateEducationField('tenthPercentage', value, 'tenth');
              }}
              placeholder="e.g., 82.5"
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.tenthMarks || errors.tenthPercentage ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.tenthMarks && <p className="text-red-500 text-xs mt-1">{errors.tenthMarks}</p>}
            {errors.tenthPercentage && <p className="text-red-500 text-xs mt-1">{errors.tenthPercentage}</p>}
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
                validateEducationField('tenthCertificate', e.target.value, 'tenth');
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
              Board Name 
            </label>
            <SearchableDropdown
              options={boards}
              value={education.twelfth.board}
              onChange={(value) => {
                setEducation({ ...education, twelfth: { ...education.twelfth, board: value } });
                validateEducationField('twelfthBoard', value, 'twelfth');
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
                validateEducationField('twelfthTotalMarks', value, 'twelfth');
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 500"
              className={`w-full px-4 py-2 border rounded-lg ${errors.twelfthTotalMarks ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.twelfthTotalMarks && <p className="text-red-500 text-xs mt-1">{errors.twelfthTotalMarks}</p>}
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
                validateEducationField('twelfthMarksObtained', value, 'twelfth');
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 450"
              className={`w-full px-4 py-2 border rounded-lg ${errors.twelfthMarksObtained ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.twelfthMarksObtained && <p className="text-red-500 text-xs mt-1">{errors.twelfthMarksObtained}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage (%) /CGPA
            </label>
            <input
              type="text"
              value={education.twelfth.percentage}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, '');
                const decimalCount = (value.match(/\./g) || []).length;
                if (decimalCount > 1) {
                  value = value.slice(0, value.lastIndexOf('.'));
                }
                setEducation({ ...education, twelfth: { ...education.twelfth, percentage: value } });
                validateEducationField('twelfthPercentage', value, 'twelfth');
              }}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.twelfthMarks || errors.twelfthPercentage ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.twelfthMarks && <p className="text-red-500 text-xs mt-1">{errors.twelfthMarks}</p>}
            {errors.twelfthPercentage && <p className="text-red-500 text-xs mt-1">{errors.twelfthPercentage}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Passing Certificate No.
            </label>
            <input
              type="text"
              value={education.twelfth.passingCertificateNo}
              onChange={(e) => {
                setEducation({ ...education, twelfth: { ...education.twelfth, passingCertificateNo: e.target.value } });
                validateEducationField('twelfthCertificate', e.target.value, 'twelfth');
              }}
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
              options={bachelorDegreeOptions}
              value={(() => {
                const foundDegree = bachelorDegrees.find(d => d.degreeId === education.graduation.graduationCourseId);
                return foundDegree ? foundDegree.degreeName : education.graduation.graduationCourse;
              })()}
              onChange={(value) => {
                const selectedDegree = bachelorDegrees.find(d => d.degreeName === value);
                setEducation({ 
                  ...education, 
                  graduation: { 
                    ...education.graduation, 
                    graduationCourse: value,
                    graduationCourseId: selectedDegree?.degreeId 
                  } 
                });
                validateEducationField('graduationCourse', value, 'graduation');
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
                validateEducationField('graduationUniversity', e.target.value, 'graduation');
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
                validateEducationField('graduationTotalMarks', value, 'graduation');
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 3000"
              className={`w-full px-4 py-2 border rounded-lg ${errors.graduationTotalMarks ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.graduationTotalMarks && <p className="text-red-500 text-xs mt-1">{errors.graduationTotalMarks}</p>}
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
                validateEducationField('graduationMarksObtained', value, 'graduation');
              }}
              onKeyDown={validateNumberInput}
              placeholder="e.g., 2400"
              className={`w-full px-4 py-2 border rounded-lg ${errors.graduationMarksObtained ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.graduationMarksObtained && <p className="text-red-500 text-xs mt-1">{errors.graduationMarksObtained}</p>}
          </div>
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage/CGPA <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={education.graduation.percentage}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, '');
                const decimalCount = (value.match(/\./g) || []).length;
                if (decimalCount > 1) {
                  value = value.slice(0, value.lastIndexOf('.'));
                }
                setEducation({ ...education, graduation: { ...education.graduation, percentage: value } });
                validateEducationField('graduationPercentage', value, 'graduation');
              }}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.graduationMarks || errors.graduationPercentage ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.graduationMarks && <p className="text-red-500 text-xs mt-1">{errors.graduationMarks}</p>}
            {errors.graduationPercentage && <p className="text-red-500 text-xs mt-1">{errors.graduationPercentage}</p>}
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
                validateEducationField('graduationCertificate', e.target.value, 'graduation');
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
            onChange={(e) => {
              setEducation({
                ...education,
                postGraduation: { ...education.postGraduation, hasPostGraduation: e.target.checked },
              });
              // Clear post-graduation validation errors when unchecked
              if (!e.target.checked) {
                const newErrors = { ...stepErrors[2] || {} };
                delete newErrors.postGraduationDegree;
                delete newErrors.postGraduationUniversity;
                delete newErrors.postGraduationMarks;
                delete newErrors.postGraduationPercentage;
                delete newErrors.postGraduationTotalMarks;
                delete newErrors.postGraduationMarksObtained;
                setStepErrors(prev => ({ ...prev, [2]: newErrors }));
              }
            }}
            className="w-4 h-4 text-primary rounded"
          />
          <span className="font-semibold text-slate-800">Post-Graduation Qualification</span>
        </label>
        {education.postGraduation.hasPostGraduation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Course/Degree Name <span className="text-red-600">*</span>
              </label>
              <SearchableDropdown
                options={masterDegreeOptions}
                value={(() => {
                  const foundDegree = masterDegrees.find(d => d.degreeId === education.postGraduation.degreeId);
                  return foundDegree ? foundDegree.degreeName : education.postGraduation.degreeName;
                })()}
                onChange={(value) => {
                  const selectedDegree = masterDegrees.find(d => d.degreeName === value);
                  setEducation({
                    ...education,
                    postGraduation: {
                      ...education.postGraduation,
                      degreeName: value,
                      degreeId: selectedDegree?.degreeId
                    },
                  });
                  validateEducationField('postGraduationDegree', value, 'postGraduation');
                }}
                placeholder="Select Post-Graduation Degree"
              />
              {errors.postGraduationDegree && <p className="text-red-500 text-xs mt-1">{errors.postGraduationDegree}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                University/College Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={education.postGraduation.university}
                onChange={(e) => {
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, university: e.target.value },
                  });
                  validateEducationField('postGraduationUniversity', e.target.value, 'postGraduation');
                }}
                className={`w-full px-4 py-2 border rounded-lg ${errors.postGraduationUniversity ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.postGraduationUniversity && <p className="text-red-500 text-xs mt-1">{errors.postGraduationUniversity}</p>}
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
                  validateEducationField('postGraduationTotalMarks', value, 'postGraduation');
                }}
                onKeyDown={validateNumberInput}
                placeholder="e.g., 2000"
                className={`w-full px-4 py-2 border rounded-lg ${errors.postGraduationTotalMarks ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.postGraduationTotalMarks && <p className="text-red-500 text-xs mt-1">{errors.postGraduationTotalMarks}</p>}
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
                  validateEducationField('postGraduationMarksObtained', value, 'postGraduation');
                }}
                onKeyDown={validateNumberInput}
                placeholder="e.g., 1600"
                className={`w-full px-4 py-2 border rounded-lg ${errors.postGraduationMarksObtained ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.postGraduationMarksObtained && <p className="text-red-500 text-xs mt-1">{errors.postGraduationMarksObtained}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Percentage
              </label>
              <input
                type="text"
                value={education.postGraduation.percentage}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '');
                  const decimalCount = (value.match(/\./g) || []).length;
                  if (decimalCount > 1) {
                    value = value.slice(0, value.lastIndexOf('.'));
                  }
                  setEducation({
                    ...education,
                    postGraduation: { ...education.postGraduation, percentage: value },
                  });
                  validateEducationField('postGraduationPercentage', value, 'postGraduation');
                }}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.postGraduationMarks || errors.postGraduationPercentage ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.postGraduationMarks && <p className="text-red-500 text-xs mt-1">{errors.postGraduationMarks}</p>}
              {errors.postGraduationPercentage && <p className="text-red-500 text-xs mt-1">{errors.postGraduationPercentage}</p>}
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
    </div>
  );
};

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
  
  // Auto-assign priority when only one post is available - This logic is moved to useEffect at component level
  // We'll handle auto-assignment when posts are loaded
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

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-primary rounded-full"></div>
              <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
                 Ranking Posts
              </h4>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
              {postsAvailable} Posts Available
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-4 italic">
            Select priority number from dropdown (1 = highest priority). Each priority number can be used only once.
            {postsAvailable > 0 && ` You have ${postsAvailable} posts to rank from 1 to ${postsAvailable}.`}
            {postsAvailable === 1 && (
              <span className="block mt-1 text-green-600">Priority will be automatically set to 1.</span>
            )}
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
            <div className="text-center py-12 bg-amber-50/30 rounded-2xl border border-amber-200">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
      <AlertCircle className="w-8 h-8 text-amber-600" />
    </div>
    <h3 className="text-md font-semibold text-amber-800 mb-2">No Eligible Posts Found</h3>
    <p className="text-sm text-amber-700 mb-3">
      Based on your educational qualifications, no posts are available at this moment.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={() => setCurrentStep(2)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all text-sm"
      >
        <GraduationCap size={14} />
        Review Education Details
      </button>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-all text-sm"
      >
        <RefreshCw size={14} />
        Refresh
      </button>
    </div>
    <p className="text-xs text-amber-600 mt-4">
      Please ensure all your education details are correctly filled and try again.
    </p>
  </div>
          ) : (
            <div className={`space-y-3 ${errors.postRankings ? 'border-2 border-red-500 rounded-xl p-3' : ''}`}>
              {postsToShow.map((post, index) => {
                const currentPriority = postPreference.postRankings[post.postCode] || 0;
                const availablePriorities = getAvailablePriorities(post.postCode);
                const isEligible = eligiblePosts.some((ep: any) => ep.postCode === post.postCode);
                const isAutoAssigned = postsAvailable === 1 && currentPriority === 1;
                
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
                          currentPriority === 0 ? 'border-red-300 bg-red-50' : 
                          isAutoAssigned ? 'border-green-500 bg-green-50' : 'border-slate-300'
                        }`}
                        disabled={postsAvailable === 1 && currentPriority === 1}
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
                      {isAutoAssigned && (
                        <p className="text-xs text-green-600 mt-1 text-center">Auto-assigned</p>
                      )}
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
        </div>
      </aside>
    </div>
  );
};


const renderLanguageSelection = () => {
  const errors = stepErrors[4] || {};
  
  // Get the posts from postsList
  const hasPost4 = postsList.some((post: any) => post?.postCode?.toString() === "4");
  const hasPost7 = postsList.some((post: any) => post?.postCode?.toString() === "7");
  
  // Get the first post to determine which post code to display in info box
  // const selectedPost = postsList.length > 0 ? postsList[0] : null;
  
  // Paper I - Both languages combined (read-only)
  const paperOneCombined = "Hindi, English";
  
  // Paper II - All 15 languages (always shown, user selectable)
  const paperTwoOptions = [
    "Hindi Language & Literature",
    "English Language & Literature",
    "Urdu Language & Literature",
    "Santali Language & Literature",
    "Bengali Language & Literature",
    "Mundari Language & Literature",
    "Ho Language & Literature",
    "Kharia Language & Literature",
    "Kudukh (Oraon) Language & Literature",
    "Kurmali Language & Literature",
    "Khortha Language & Literature",
    "Nagpuri Language & Literature",
    "Panchpargania Language & Literature",
    "Odia Language & Literature",
    "Sanskrit Language & Literature",
  ];
  
  // Paper III options based on post ID
  const getPaperThreeOptions = () => {
    // If post 7 is present (either alone or with post 4), show all 4 subjects
    if (hasPost7) {
      return ["Mathematics", "Statistics", "Economics", "Commerce"];
    }
    // If only post 4 is present
    if (hasPost4) {
      return ["Mathematics", "Statistics", "Economics"];
    }
    return [];
  };

  const paperThreeOptions = getPaperThreeOptions();
  
  // Determine if Paper III should be shown (if either post 4 or post 7 is present)
  const showPaperThree = hasPost4 || hasPost7;

  // Handle Paper II change
  const handlePaperTwoChange = (value: string) => {
    setLanguageSelection({ ...languageSelection, paperTwoLanguage: value });
    if (value) {
      setStepErrors(prev => ({ ...prev, [4]: { ...prev[4], paperTwoLanguage: "" } }));
    }
  };

  // Handle Paper III change
  const handlePaperThreeChange = (value: string) => {
    setLanguageSelection({ ...languageSelection, paperThreeLanguage: value });
    if (value) {
      setStepErrors(prev => ({ ...prev, [4]: { ...prev[4], paperThreeLanguage: "" } }));
    }
  };

  // If no post selected yet, show loading or message
  if (postsList.length === 0) {
    return (
      <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        <div className="absolute -top-4 left-5 bg-white px-3">
          <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            Language Selection for Examination
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-slate-500">Loading post information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
      <div className="absolute -top-4 left-5 bg-white px-3">
        <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          Language Selection for Examination
        </h3>
      </div>
      <div className="space-y-6 mt-4">
        {/* Paper I - Read-only input with both Hindi and English */}
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Paper-I Subject/Language <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={paperOneCombined}
            readOnly
            disabled
            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-700 cursor-not-allowed"
          />
          <p className="text-xs text-slate-500 mt-1">
            Paper I includes both Hindi and English languages
          </p>
        </div>
        
        {/* Paper II - User selectable dropdown with all 15 languages */}
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Paper-II Language/Subject <span className="text-red-600">*</span>
          </label>
          <select
            value={languageSelection.paperTwoLanguage}
            onChange={(e) => handlePaperTwoChange(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
              errors.paperTwoLanguage ? 'border-red-500' : 'border-slate-300'
            }`}
          >
            <option value="">Select Language</option>
            {paperTwoOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          {errors.paperTwoLanguage && <p className="text-red-500 text-xs mt-1">{errors.paperTwoLanguage}</p>}
          {languageSelection.paperTwoLanguage && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle size={12} />
              Selected: {languageSelection.paperTwoLanguage}
            </p>
          )}
        </div>
        
        {/* Paper III - Conditional dropdown based on posts */}
        {showPaperThree ? (
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Paper-III Subject Selection <span className="text-red-600">*</span>
            </label>
            <select
              value={languageSelection.paperThreeLanguage}
              onChange={(e) => handlePaperThreeChange(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                errors.paperThreeLanguage ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select Subject</option>
              {paperThreeOptions.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            {errors.paperThreeLanguage && (
              <p className="text-red-500 text-xs mt-1">{errors.paperThreeLanguage}</p>
            )}
            {languageSelection.paperThreeLanguage && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle size={12} />
                Selected: {languageSelection.paperThreeLanguage}
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Paper-III is not applicable for this post.
            </p>
          </div>
        )}
        
        {/* Info box showing current post and Paper III options if applicable */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 flex items-center gap-2">
            <Info className="w-4 h-4" />
            {hasPost4 && hasPost7 && (
              <span>Posts: Both Post 4 and Post 7 - Paper III subjects: Mathematics, Statistics, Economics, Commerce</span>
            )}
            {hasPost4 && !hasPost7 && (
              <span>Post: Block Statics Supervisor - Paper III subjects: Mathematics, Statistics, Economics</span>
            )}
            {hasPost7 && !hasPost4 && (
              <span>Post: [Post 7] - Paper III subjects: Mathematics, Statistics, Economics, Commerce</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const renderFeePayment = () => {
  const totalFee = calculateTotalFee();
  
  const getMappedFeeCategory = () => {
    const cat = reservationCategory.mainCategory?.toLowerCase() || "";
    const isSCST = cat === "sc" || cat === "st" || cat.includes("scheduled caste") || cat.includes("scheduled tribe");
    
    if (reservationCategory.isJharkhandDomicile === "yes" && isSCST) return "sc_st_ph";
    if (cat.includes("obc") || cat.includes("ebc") || cat.includes("bc")) return "obc";
    return "general";
  };

  const feeCat = getMappedFeeCategory();
  let applicableFeeText = "";
  
  if (feeCat === "sc_st_ph") {
    const cat = reservationCategory.mainCategory?.toLowerCase() || "";
    const isSCST = cat === "sc" || cat === "st" || cat.includes("scheduled caste") || cat.includes("scheduled tribe");
    if (reservationCategory.isPwd === "yes") {
      applicableFeeText = "PwD Candidates (Fee: ₹50)";
    } else if (reservationCategory.isJharkhandDomicile === "yes" && isSCST) {
      applicableFeeText = "SC / ST (Jharkhand Domicile) (Fee: ₹50)";
    } else {
      applicableFeeText = "SC/ST/PH Candidates (Fee: ₹50)";
    }
  } else {
    applicableFeeText = "UR / EWS / OBC-II / EBC-I / Other States (Fee: ₹100)";
  }

  const handlePayment = async () => {
    if (!feePayment.paymentMode) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    setFeePayment({ ...feePayment, paymentStatus: "processing" });

    try {
      const payload = {
        applicationId,
        paymentMode: "online_card",
        feeCategory: feeCat
      };

      const response = await axios.post(`${API_BASE_URL}/payment/initiate`, payload, getAuthHeaders());
      
      if (response.data.status === "success" || response.data) {
        const orderData = response.data.data || response.data;
        
        if (orderData.amount === 0 || !orderData.paymentOrderId) {
          setFeePayment({ ...feePayment, paymentStatus: "completed" });
          toast.success("Payment completed successfully!");
          setCurrentStep(7);
          setIsProcessing(false);
          return;
        }

        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: orderData.name || "JSSC Portal",
          description: orderData.description || "Application Fee",
          order_id: orderData.paymentOrderId,
          handler: async function (res: any) {
            try {
              const verifyRes = await axios.post(`${API_BASE_URL}/payment/verify`, {
                paymentOrderId: orderData.paymentOrderId,
                razorpayOrderId: orderData.paymentOrderId,
                razorpayPaymentId: res.razorpay_payment_id,
                razorpaySignature: res.razorpay_signature
              }, getAuthHeaders());
              
              if (verifyRes.data.status === "success" || verifyRes.data.paymentStatus === "completed" || verifyRes.data.data?.paymentStatus === "completed") {
                setFeePayment({ ...feePayment, paymentStatus: "completed" });
                toast.success("Payment verified successfully!");
                setCurrentStep(7);
              } else {
                toast.error("Payment verification failed");
                setFeePayment({ ...feePayment, paymentStatus: "failed" });
              }
            } catch (err) {
              toast.error("Payment verification failed");
              setFeePayment({ ...feePayment, paymentStatus: "failed" });
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: orderData.prefill || {
            name: `${personalInfo.firstName} ${personalInfo.lastName}`,
            contact: personalInfo.mobileNumber,
            email: personalInfo.emailId
          },
          theme: {
            color: "#0f766e"
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (res: any) {
          toast.error(res.error.description || "Payment failed");
          setFeePayment({ ...feePayment, paymentStatus: "failed" });
          setIsProcessing(false);
        });
        rzp.open();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to initiate payment");
      setFeePayment({ ...feePayment, paymentStatus: "failed" });
      setIsProcessing(false);
    }
  };

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
              <span className={`px-3 py-1 text-white text-xs font-bold rounded-full flex items-center justify-center ${
                feePayment.paymentStatus === 'completed' ? 'bg-green-600' : 
                feePayment.paymentStatus === 'processing' ? 'bg-amber-500' : 
                feePayment.paymentStatus === 'failed' ? 'bg-red-500' : 'bg-primary'
              }`}>
                {feePayment.paymentStatus.toUpperCase()}
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
                  {categoriesList.find((c: any) => c.catId === reservationCategory.mainCategoryId)?.catName || reservationCategory.mainCategory || "Not Selected"}
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
                  <li>UR / EWS / OBC-II / EBC-I / Other States: ₹100</li>
                  <li>SC / ST (Jharkhand Domicile): ₹50</li>
                  <li>PwD Candidates: ₹50</li>
                  <li>Ex-Servicemen: ₹0</li>
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
                className={`border-2 rounded-lg p-5 flex flex-col items-center text-center transition-all ${
                  feePayment.paymentStatus === 'completed' || feePayment.paymentStatus === 'processing' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-primary'
                } ${feePayment.paymentMode === "online" ? "border-primary bg-primary/5" : "border-slate-300"}`}
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
                  disabled={feePayment.paymentStatus === 'completed' || feePayment.paymentStatus === 'processing'}
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
        </div>
        
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-slate-800 mb-3">
              Supported Gateways
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["Razorpay", "SBI", "HDFC", "ICICI", "PAYTM", "UPI"].map((g, i) => (
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
              <li>Payment is mandatory to complete your application.</li>
              <li>Do not refresh the page during transaction.</li>
              <li>Keep Transaction ID for future correspondence.</li>
              <li>After successful payment, you will be redirected to review your application.</li>
              <li>You must manually submit your application after payment.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        {feePayment.paymentStatus === "completed" ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-xl border border-green-200">
              <CheckCircle size={20} />
              <span className="font-semibold">Payment Completed!</span>
            </div>
            <button
              onClick={() => setCurrentStep(7)}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-all font-semibold flex items-center gap-2"
            >
              Go to Review & Submit <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={isProcessing || !feePayment.paymentMode}
            className={`h-14 px-12 text-white font-semibold rounded-xl flex items-center gap-2 transition-all ${
              isProcessing || !feePayment.paymentMode ? "bg-slate-400 cursor-not-allowed" : "bg-primary hover:bg-primary/80"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : totalFee === 0 ? (
              "Proceed to Review"
            ) : (
              <>
                Proceed to Payment <ExternalLink size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

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
    if (reservationCategory.mainCategory === "ews" || reservationCategory.mainCategory === "economically_weaker_section_(ews)") {
      baseFields.push({ key: "ewsCertificate", label: "EWS Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    
    // Caste Certificate - Only show for reserved categories (NOT for Unreserved/UR)
    const isReservedCategory = reservationCategory.mainCategory && 
      !["unreserved", "unreserved_(ur)", "ur", "ews", "economically_weaker_section_(ews)"].includes(reservationCategory.mainCategory);
    
    if (isReservedCategory) {
      baseFields.push({ key: "castCertificate", label: "Caste Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
    }
    
    if (education.postGraduation.hasPostGraduation) {
      baseFields.push({ key: "postGraduationCertificate", label: "Post-Graduation Certificate", required: true, type: "pdf", size: "Max 500KB", accept: ".pdf" });
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
  const errors = stepErrors[5] || {};
  
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
          const hasError = errors[`documents.${field.key}`];
          
          // Check if document is considered uploaded (either new file or already uploaded from API)
          const isDocumentUploaded = uploadedFile !== null || (alreadyUploadedUrl && alreadyUploadedUrl !== "null" && alreadyUploadedUrl !== "");
          
          return (
            <div key={field.key} className={`border rounded-xl p-4 transition-all ${hasError && !isDocumentUploaded ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-slate-50/30'}`}>
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
                      // Clear error when file is selected
                      setStepErrors(prev => ({ 
                        ...prev, 
                        [5]: { ...prev[5], [`documents.${field.key}`]: "" } 
                      }));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                />
                
                <div className={`border-2 border-dashed rounded-xl bg-white p-3 hover:border-primary transition-all min-h-[100px] ${hasError && !isDocumentUploaded ? 'border-red-500' : 'border-slate-300'}`}>
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
                              // Clear error when file is removed
                              setStepErrors(prev => ({ 
                                ...prev, 
                                [5]: { ...prev[5], [`documents.${field.key}`]: "" } 
                              }));
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
                  ) : alreadyUploadedUrl && alreadyUploadedUrl !== "null" && alreadyUploadedUrl !== "" ? (
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
              {/* Only show error if document is NOT uploaded and validation failed */}
              {hasError && !isDocumentUploaded && <p className="text-red-500 text-xs mt-2">{hasError}</p>}
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
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs">Marital Status</span>
            <span className="font-semibold">{personalInfoData?.maritalStatus || "N/A"}</span>
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
          
  {/* Permanent Address Column */}
  <div>
    <h4 className="font-semibold text-slate-700 mb-3 border-b pb-2">Permanent Address</h4>
    <div className="space-y-3">
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Street/House No.</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.street || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">City/Village/Town</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.city || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Post Office</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.post || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">District</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.district || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">State</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.state || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Country</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.country || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Pincode</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.permanent?.pincode || "N/A"}</span>
      </div>
    </div>
  </div>

  {/* Correspondence Address Column */}
  <div>
    <h4 className="font-semibold text-slate-700 mb-3 border-b pb-2">Correspondence Address</h4>
    <div className="space-y-3">
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Street/House No.</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.street || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">City/Village/Town</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.city || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Post Office</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.post || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">District</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.district || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">State</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.state || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Country</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.country || "N/A"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs">Pincode</span>
        <span className="font-semibold text-sm">{personalInfoData?.address?.correspondence?.pincode || "N/A"}</span>
      </div>
      {personalInfoData?.address?.correspondence?.sameAsPermanent && (
        <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
          ✓ This address is same as permanent address
        </div>
      )}
    </div>
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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
    {/* Category Details */}
    <div className="flex flex-col">
      <span className="text-slate-500 text-xs">Category</span>
      <span className="font-semibold">{reservationData?.mainCategoryName || "N/A"}</span>
    </div>
    
    <div className="flex flex-col">
      <span className="text-slate-500 text-xs">Sub Category</span>
      <span className="font-semibold">{reservationData?.subCategoryName || "N/A"}</span>
    </div>
    
    <div className="flex flex-col">
      <span className="text-slate-500 text-xs">Jharkhand Domicile</span>
      <span className="font-semibold">{reservationData?.isJharkhandDomicile ? "Yes" : "No"}</span>
    </div>
    
    {/* Domicile Certificate Details */}
    {reservationData?.isJharkhandDomicile && (
      <>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Domicile Certificate Number</span>
          <span className="font-semibold">{reservationData?.domicileCertificateNumber || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Domicile Certificate Authority</span>
          <span className="font-semibold">{reservationData?.domicileCertificateAuthorityName || "N/A"}</span>
        </div>
      </>
    )}
    
    {/* Category Certificate Details (for reserved categories) */}
    {reservationData?.mainCategoryName && 
     reservationData?.mainCategoryName !== "Unreserved (UR)" && 
     reservationData?.mainCategoryName !== "Unreserved" && 
     reservationData?.mainCategoryName !== "EWS" && (
      <>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Category Certificate Number</span>
          <span className="font-semibold">{reservationData?.categoryCertificateNumber || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Category Certificate Authority</span>
          <span className="font-semibold">{reservationData?.categoryCertificateAuthorityName || "N/A"}</span>
        </div>
      </>
    )}
    
    {/* PwD Details */}
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
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">PwD Certificate Number</span>
          <span className="font-semibold">{reservationData?.pwdCertificateNumber || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">PwD Certificate Authority</span>
          <span className="font-semibold">{reservationData?.pwdCertificateAuthorityName || "N/A"}</span>
        </div>
      </>
    )}
    
    {/* Ex-Serviceman Details */}
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
    
    {/* Sports Quota Details */}
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
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Sports Achievement</span>
          <span className="font-semibold">{reservationData?.sportsAchievement || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Sports Certificate Number</span>
          <span className="font-semibold">{reservationData?.sportsCertificateNumber || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Sports Certificate Authority</span>
          <span className="font-semibold">{reservationData?.sportsCertificateAuthorityName || "N/A"}</span>
        </div>
      </>
    )}
    
    {/* Declaration Status */}
    <div className="flex flex-col col-span-1 md:col-span-2">
      <span className="text-slate-500 text-xs">Declaration Accepted</span>
      <span className="font-semibold text-green-600">{reservationData?.declaration ? "Yes" : "No"}</span>
    </div>
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



