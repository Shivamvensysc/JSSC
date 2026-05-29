import React, { useState } from "react";
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
  KeyRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  motherName : string;
  dob: string;
  gender: string;
   age: number;
  nationality: string;
  aadharNumber: string;
  mobileNumber: string;
    identificationMark1: string;  // Added
  identificationMark2: string;  // Added
  alternateNumber: string;
  emailId: string;
  permanentAddress: {
    street: string;
    post: string;
    district: string;
    state: string;
    pincode: string;
    policeStation: string;
  };
  correspondenceAddress: {
    street: string;
    post: string;
    district: string;
    state: string;
    pincode: string;
    policeStation: string;
  };
  sameAsPermanent: boolean;
}


interface Education {
  tenth: {
   
    
    board: string;
    rollNumber: string;
    percentage: string;
    yearOfPassing: string;
    totalMarks: string;
    marksObtained: string;
    passingCertificateNo: string;
  };
  twelfth: {
    board: string;
    rollNumber: string;
    percentage: string;
    yearOfPassing: string;
    passingCertificateNo: string;
    totalMarks: string;
    marksObtained: string;
  };
  graduation: {
    graduationCourse: string;
    university: string;
    passoutYear: string;
    percentage: string;
    specialization: string;
    passingCertificateNo: string;
    totalMarks: string;
    marksObtained: string;
  };
  postGraduation: {
    hasPostGraduation: boolean;
    university: string;
    passoutYear: string;
    percentage: string;
    subject: string;
    totalMarks: string;
    marksObtained: string;
    passingCertificateNo: string;
  };
  diploma: {
    hasDiploma: boolean;
    instituteName: string;
    qualificationType: string;
    year: string;
    totalMarks: string;
    marksObtained: string;
    certificateNo: string;
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
  contractualService: {
    hasContractualService: boolean;
    durationYears: string;
    durationMonths: string;
    organization: string;
    contractId: string;
  };
}

interface PostPreference {
  vacancyStream: string;
  postRankings: { [key: number]: number }; // 0 means not selected, 1-5 for priorities
}

interface CenterSelection {
  firstPreference: string;
  secondPreference: string;
  thirdPreference: string;
}

interface LanguageSelection {
  paperOneLanguage: string;
  paperTwoLanguage: string;
  paperThreeLanguage: string;
}

interface ReservationCategory {
  mainCategory: string;
  subCategory: string;
  isPwd: string;
  pwdType: string;
  pwdPercentage: string;
  pwdCertificate: File | null;
  isExServiceman: string;
  exServicemanYears: string;
  exServicemanDischargeBook: File | null;
  isSportsQuota: string;
  sportsLevel: string;
  sportsAchievement: string;
  sportsCertificate: File | null;
  isJharkhandDomicile: string;
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

import { toast } from "react-toastify";



const MyApplications: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(
    {
      isSubmitted: false,
      registrationNumber: "",
      submissionDate: "",
    },
  );

  const boards = [
  "CBSE",
  "ICSE",
  "NIOS",
  "IB",
  "IGCSE",
  "Andhra Pradesh Board",
  "Assam Board",
  "Bihar Board",
  "Chhattisgarh Board",
  "Goa Board",
  "Gujarat Board",
  "Haryana Board",
  "Himachal Pradesh Board",
  "Jharkhand Board",
  "Karnataka Board",
  "Kerala Board",
  "Madhya Pradesh Board",
  "Maharashtra Board",
  "Manipur Board",
  "Meghalaya Board",
  "Mizoram Board",
  "Nagaland Board",
  "Odisha Board",
  "Punjab Board",
  "Rajasthan Board",
  "Sikkim Board",
  "Tamil Nadu Board",
  "Telangana Board",
  "Tripura Board",
  "UP Board",
  "Uttarakhand Board",
  "West Bengal Board",
  "Jammu & Kashmir Board",
  "Open School Board",
  "State Open School",
];

const graduationCourseNames = [
  "BSc",
  "BSc (Hons)",
  "BPharma",
  "B.A.M.S (Ayurveda)",
  "BFSc",
  "BTech Dairy Technology",
  "BSc Dairy Science",
  "BA",
  "BCom",
];

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = "",
}) => {
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
      {required && !value && !disabled && (
        <p className="text-xs text-red-500 mt-1">This field is required</p>
      )}
    </div>
  );
};


const subjects = [
  "Entomology",
  "Zoology",
  "Botany",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Statistics",
  "Geology",
  "Economics",
  "Commerce",
  "Dairy Technology",
  "Dairy Science",
  "Fisheries Science",
  "Pharmacy",
  "Pharmaceutical Chemistry",
  "Ayurveda",
  "Pharmaceutics"
];

// Generate years from 1970 to 2026
const generateYears = () => {
  const years = [];
  for (let i = 2026; i >= 1970; i--) {
    years.push(i.toString());
  }
  return years;
};

const passingYears = generateYears();

// Generate months for experience duration
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
    identificationMark1: "",  // Added
  identificationMark2: "",  // Added
    nationality: "Indian",
    mobileNumber: "",
    alternateNumber: "",
    emailId: "",
    aadharNumber: "",
    permanentAddress: {
      street: "",
      post: "",
      district: "",
      state: "",
      pincode: "",
      policeStation: "",
    },
    correspondenceAddress: {
      street: "",
      post: "",
      district: "",
      state: "",
      pincode: "",
      policeStation: "",
    },
    sameAsPermanent: false,
  });

  const [education, setEducation] = useState<Education>({
    tenth: {
     
      
      board: "",
      rollNumber: "",
      percentage: "",
      yearOfPassing: "",
      totalMarks: "",
      marksObtained: "",
      passingCertificateNo: "",
    },
    twelfth: {
      board: "",
      rollNumber: "",
      percentage: "",
      yearOfPassing: "",
      passingCertificateNo: "",
      totalMarks: "",
      marksObtained: "",
    },
    graduation: {
      graduationCourse: "",
      university: "",
      passoutYear: "",
      percentage: "",
      specialization: "",
      passingCertificateNo: "",
      totalMarks: "",
      marksObtained: "",
    },
    postGraduation: {
      hasPostGraduation: false,
      university: "",
      passoutYear: "",
      percentage: "",
      subject: "",
      totalMarks: "",
      marksObtained: "",
      passingCertificateNo: "",
    },
    diploma: {
      hasDiploma: false,
      instituteName: "",
      qualificationType: "",
      year: "",
      totalMarks: "",
      marksObtained: "",
      certificateNo: "",
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
    contractualService: {
      hasContractualService: false,
      durationYears: "",
      durationMonths: "",
      organization: "SDTL Namkum",
      contractId: "",
    },
  });

  const [postPreference, setPostPreference] = useState<PostPreference>({
  vacancyStream: "both",
  postRankings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, // Changed from 1,2,3,4,5 to 0
});

  const [centerSelection, setCenterSelection] = useState<CenterSelection>({
    firstPreference: "",
    secondPreference: "",
    thirdPreference: "",
  });

  const [languageSelection, setLanguageSelection] = useState<LanguageSelection>({
    paperOneLanguage: "",
    paperTwoLanguage: "",
    paperThreeLanguage: "",
  });

  const [reservationCategory, setReservationCategory] =
    useState<ReservationCategory>({
      mainCategory: "",
      subCategory: "",
      isPwd: "no",
      pwdType: "",
      pwdPercentage: "",
      pwdCertificate: null,
      isExServiceman: "no",
      exServicemanYears: "",
      exServicemanDischargeBook: null,
      isSportsQuota: "no",
      sportsLevel: "",
      sportsAchievement: "",
      sportsCertificate: null,
      isJharkhandDomicile: "yes",
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

  const posts = [
    {
      id: 1,
      title: "Assistant Section Officer (ASO)",
      dept: "Department of Personnel, Administrative Reforms & Rajbhasha",
      pay: "4600 (Level-7)",
    },
    {
      id: 2,
      title: "Block Supply Officer",
      dept: "Department of Food, Public Distribution & Consumer Affairs",
      pay: "4200 (Level-6)",
    },
    {
      id: 3,
      title: "Labour Enforcement Officer",
      dept: "Department of Labour, Employment, Training & Skill Development",
      pay: "4200 (Level-6)",
    },
    {
      id: 4,
      title: "Statistical Assistant",
      dept: "Department of Planning and Development",
      pay: "2800 (Level-5)",
    },
    {
      id: 5,
      title: "Block Welfare Officer",
      dept: "Department of Welfare",
      pay: "4200 (Level-5)",
    },
  ];

  const centers = [
    "Center A - New Delhi",
    "Center B - Mumbai",
    "Center C - Bangalore",
    "Center D - Chennai",
    "Center E - Kolkata",
  ];

  const steps = [
    { id: 0, title: "Personal Info", icon: User },
    { id: 1, title: "Reservation & Category", icon: Shield },
    { id: 2, title: "Education Details", icon: GraduationCap },
    { id: 3, title: "Post Preferences", icon: Sliders },
    { id: 4, title: "Language Selection", icon: Languages },
    { id: 5, title: "Exam Center", icon: MapPin },
    { id: 6, title: "Documents Upload", icon: FileCheck },
    { id: 7, title: "Fee Payment", icon: CreditCard },
    { id: 8, title: "Review & Submit", icon: FileSignature },
  ];

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
  };

  const districtsByState: { [key: string]: string[] } = {
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Nalanda", "Purnia", "Darbhanga", "Bihar Sharif"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur", "Malda", "Bardhaman"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Noida", "Ghaziabad", "Meerut"],
  "Delhi": ["New Delhi", "South Delhi", "East Delhi", "West Delhi", "North Delhi", "Central Delhi"],
  "Other": ["Other District 1", "Other District 2", "Other District 3"]
};

// Add this state near other useState declarations (around line 260)
const [highestQualification, setHighestQualification] = useState("graduation");
const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

// Add this function to handle state change (around line 800)
const handleStateChange = (state: string, isPermanent: boolean = true) => {
  const districts = districtsByState[state] || ["Other District"];
  setAvailableDistricts(districts);
  
  if (isPermanent) {
    setPersonalInfo({
      ...personalInfo,
      permanentAddress: {
        ...personalInfo.permanentAddress,
        state: state,
        district: ""
      }
    });
  } else {
    setPersonalInfo({
      ...personalInfo,
      correspondenceAddress: {
        ...personalInfo.correspondenceAddress,
        state: state,
        district: ""
      }
    });
  }
};


  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    setDocuments({ ...documents, [field]: file });
  };

  // const handlePostRankingChange = (postId: number, priority: number) => {
  //   setPostPreference({
  //     ...postPreference,
  //     postRankings: { ...postPreference.postRankings, [postId]: priority },
  //   });
  // };

  const sendMobileOtp = () => {
    if (personalInfo.mobileNumber.length === 10) {
      setMobileOtpSent(true);
      alert(`OTP sent to ${personalInfo.mobileNumber}`);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const verifyMobileOtp = () => {
    setMobileOtpVerified(true);
    alert("Mobile number verified successfully!");
  };

  const sendEmailOtp = () => {
    if (personalInfo.emailId.includes("@")) {
      setEmailOtpSent(true);
      alert(`OTP sent to ${personalInfo.emailId}`);
    } else {
      alert("Please enter a valid email address");
    }
  };

  const verifyEmailOtp = () => {
    setEmailOtpVerified(true);
    alert("Email verified successfully!");
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

  const handleFinalSubmit = () => {
    const formData = {
      personalInfo,
      education,
      postPreference,
      centerSelection,
      languageSelection,
      reservationCategory,
      feePayment,
      documents,
    };
    toast.success("Application Submit successfully");
    console.log("Form Submitted:", formData);
    setApplicationStatus({
      isSubmitted: true,
      registrationNumber: "2026-JH-8842-109",
      submissionDate: new Date().toLocaleDateString(),
    });
    setIsSubmitted(true);
  };

  const handleSaveDraft = () => {
  toast.success("Application form saved successfully");
};

  const navigate = useNavigate()

  const renderStep = () => {
    if (isSubmitted) return renderRegistrationSuccess();
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
        return renderCenterSelection();
      case 6:
        return renderDocuments();
      case 7:
        return renderFeePayment();
      case 8:
        return renderApplicationReview();
      default:
        return null;
    }
  };

  const renderPersonalInfo = () => (
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
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, firstName: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          
          
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Father's Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.fathersName}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  fathersName: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Mother's Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.motherName}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  motherName: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          {/* Date of Birth with Auto Age Calculation */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Date of Birth <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={personalInfo.dob}
                onChange={handleDateOfBirthChange}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              {personalInfo.age > 0 && (
                <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">Age: {personalInfo.age} years</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Gender<span className="text-red-600">*</span>
            </label>
            <select
              value={personalInfo.gender}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, gender: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Nationality <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.nationality}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  nationality: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Aadhar Card Number (Preferred)
            </label>
            <input
              type="text"
              value={personalInfo.aadharNumber}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  aadharNumber: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
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
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                identificationMark1: e.target.value,
              })
            }
            placeholder="e.g., Mole on left cheek"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
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
                value={personalInfo.mobileNumber}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    mobileNumber: e.target.value,
                  })
                }
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
              Alternate Mobile Number
            </label>
            <input
              type="tel"
              value={personalInfo.alternateNumber}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  alternateNumber: e.target.value,
                })
              }
              placeholder="Optional"
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
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, emailId: e.target.value })
                }
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
            {emailOtpSent && !emailOtpVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
                />
                <button
                  onClick={verifyEmailOtp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                >
                  Verify
                </button>
              </div>
            )}
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
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    street: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Post Office <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.post}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    post: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          {/* <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              District <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.district}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    district: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              State <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.state}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    state: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div> */}
          <div>
  <label className="block text-slate-700 text-sm font-medium mb-2">
    State <span className="text-red-600">*</span>
  </label>
  <select
    value={personalInfo.permanentAddress.state}
    onChange={(e) => handleStateChange(e.target.value, true)}
    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
  >
    <option value="">Select State</option>
    {Object.keys(districtsByState).map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
</div>

{/* District Dropdown - Updated */}
<div>
  <label className="block text-slate-700 text-sm font-medium mb-2">
    District <span className="text-red-600">*</span>
  </label>
  <select
    value={personalInfo.permanentAddress.district}
    onChange={(e) =>
      setPersonalInfo({
        ...personalInfo,
        permanentAddress: {
          ...personalInfo.permanentAddress,
          district: e.target.value,
        },
      })
    }
    disabled={!personalInfo.permanentAddress.state}
    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
  >
    <option value="">Select District</option>
    {availableDistricts.map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))}
  </select>
</div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Pincode <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.pincode}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    pincode: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Village/City/Town <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.policeStation}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    policeStation: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
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
              // Copy permanent address to correspondence address
              setPersonalInfo({
                ...personalInfo,
                sameAsPermanent: true,
                correspondenceAddress: { ...personalInfo.permanentAddress },
              });
            } else {
              setPersonalInfo({
                ...personalInfo,
                sameAsPermanent: false,
              });
            }
          }}
          className="w-4 h-4 text-primary rounded"
        />
        <label
          htmlFor="sameAsPermanent"
          className="text-slate-700 font-medium cursor-pointer"
        >
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
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                correspondenceAddress: {
                  ...personalInfo.correspondenceAddress,
                  street: e.target.value,
                },
              })
            }
            disabled={personalInfo.sameAsPermanent}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Post Office <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.correspondenceAddress.post}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                correspondenceAddress: {
                  ...personalInfo.correspondenceAddress,
                  post: e.target.value,
                },
              })
            }
            disabled={personalInfo.sameAsPermanent}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
          />
        </div>
        {/* <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            District <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.correspondenceAddress.district}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                correspondenceAddress: {
                  ...personalInfo.correspondenceAddress,
                  district: e.target.value,
                },
              })
            }
            disabled={personalInfo.sameAsPermanent}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            State <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.correspondenceAddress.state}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                correspondenceAddress: {
                  ...personalInfo.correspondenceAddress,
                  state: e.target.value,
                },
              })
            }
            disabled={personalInfo.sameAsPermanent}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
          />
        </div> */}
        <div>
  <label className="block text-slate-700 text-sm font-medium mb-2">
    State <span className="text-red-600">*</span>
  </label>
  <select
    value={personalInfo.correspondenceAddress.state}
    onChange={(e) => handleStateChange(e.target.value, false)}
    disabled={personalInfo.sameAsPermanent}
    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
  >
    <option value="">Select State</option>
    {Object.keys(districtsByState).map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
</div>

{/* District Dropdown for Correspondence */}
<div>
  <label className="block text-slate-700 text-sm font-medium mb-2">
    District <span className="text-red-600">*</span>
  </label>
  <select
    value={personalInfo.correspondenceAddress.district}
    onChange={(e) =>
      setPersonalInfo({
        ...personalInfo,
        correspondenceAddress: {
          ...personalInfo.correspondenceAddress,
          district: e.target.value,
        },
      })
    }
    disabled={personalInfo.sameAsPermanent || !personalInfo.correspondenceAddress.state}
    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
  >
    <option value="">Select District</option>
    {availableDistricts.map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))}
  </select>
</div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Pincode <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.correspondenceAddress.pincode}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                correspondenceAddress: {
                  ...personalInfo.correspondenceAddress,
                  pincode: e.target.value,
                },
              })
            }
            disabled={personalInfo.sameAsPermanent}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Village/City/Town <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.correspondenceAddress.policeStation}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                correspondenceAddress: {
                  ...personalInfo.correspondenceAddress,
                  policeStation: e.target.value,
                },
              })
            }
            disabled={personalInfo.sameAsPermanent}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
          />
        </div>
      </div>
    </div>
    </div>
  );

  const renderReservationCategory = () => (
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
              value={reservationCategory.mainCategory}
              onChange={(e) => {
                setReservationCategory({
                  ...reservationCategory,
                  mainCategory: e.target.value,
                });
                const fee = e.target.value === "sc" || e.target.value === "st" ? "50" : "100";
                setFeePayment({ ...feePayment, applicationFee: fee });
              }}
              className="w-full h-12 border border-slate-300 rounded-lg px-4"
            >
              <option value="">Select Category</option>
              <option value="unreserved">Unreserved (UR)</option>
              <option value="bc1">BC-I</option>
              <option value="bc2">BC-II</option>
              <option value="sc">Scheduled Caste (SC)</option>
              <option value="st">Scheduled Tribe (ST)</option>
              <option value="ews">EWS</option>
            </select>
          </div>
          {reservationCategory.mainCategory === "st" && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Sub-Category (Primitive Tribe)
              </label>
              <select
                value={reservationCategory.subCategory}
                onChange={(e) =>
                  setReservationCategory({
                    ...reservationCategory,
                    subCategory: e.target.value,
                  })
                }
                className="w-full h-12 border border-slate-300 rounded-lg px-4"
              >
                <option value="">Select Sub-Category</option>
                <option value="primitive">
                  Primitive Tribe (Adim Janjati)
                </option>
                <option value="other">Other ST</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Jharkhand Domicile Claim <span className="text-red-600">*</span>
            </label>
            <select
              value={reservationCategory.isJharkhandDomicile}
              onChange={(e) =>
                setReservationCategory({
                  ...reservationCategory,
                  isJharkhandDomicile: e.target.value,
                })
              }
              className="w-full h-12 border border-slate-300 rounded-lg px-4"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">
              Mandatory for all applicants
            </p>
          </div>
        </div>
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
                      const fee = reservationCategory.mainCategory === "sc" || reservationCategory.mainCategory === "st" ? "50" : "100";
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
                    const fee = reservationCategory.mainCategory === "sc" || reservationCategory.mainCategory === "st" ? "50" : "100";
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
                  Type of Disability 
                </label>
                <select
                  value={reservationCategory.pwdType}
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      pwdType: e.target.value,
                    })
                  }
                  className="w-full h-12 border border-slate-300 rounded-lg px-4"
                >
                  <option value="">Select Type</option>
                  <option value="visual">Visual Impairment (VI)</option>
                  <option value="deaf">Deaf/Dumb (DD)</option>
                  <option value="physical">
                    Physical Challenges/Locomotive Disability (PCEP)
                  </option>
                  <option value="autism">Autism</option>
                  <option value="intellectual">Intellectual Disability</option>
                  <option value="learning">Learning Disability</option>
                  <option value="mental">Mental Disability</option>
                  <option value="multiple">
                    Multiple Disabilities (AILMD)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Disability Percentage (%) 
                </label>
                <input
                  type="number"
                  value={reservationCategory.pwdPercentage}
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      pwdPercentage: e.target.value,
                    })
                  }
                  placeholder="Should be ≥ 40% to claim benefit"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
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
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      isExServiceman: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      isExServiceman: e.target.value,
                    })
                  }
                  className="w-4 h-4 text-primary"
                />
                No
              </label>
            </div>
          </div>
          {reservationCategory.isExServiceman === "yes" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Years of Service
                </label>
                <input
                  type="text"
                  value={reservationCategory.exServicemanYears}
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      exServicemanYears: e.target.value,
                    })
                  }
                  placeholder="Enter years of service"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </>
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
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      isSportsQuota: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      isSportsQuota: e.target.value,
                    })
                  }
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
                  Sports Level *
                </label>
                <select
                  value={reservationCategory.sportsLevel}
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      sportsLevel: e.target.value,
                    })
                  }
                  className="w-full h-12 border border-slate-300 rounded-lg px-4"
                >
                  <option value="">Select Level</option>
                  <option value="international">International</option>
                  <option value="national">National</option>
                  <option value="state">State</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Achievement Details
                </label>
                <textarea
                  value={reservationCategory.sportsAchievement}
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      sportsAchievement: e.target.value,
                    })
                  }
                  rows={2}
                  placeholder="Describe your achievements..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                ></textarea>
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
            onChange={(e) =>
              setReservationCategory({
                ...reservationCategory,
                declaration: e.target.checked,
              })
            }
            className="mt-1 w-5 h-5 border-slate-300 rounded text-primary shrink-0"
          />
          <span className="text-sm font-medium text-slate-700 leading-6">
            I hereby declare that I am a local resident/permanent resident of
            the State of Jharkhand. I understand that failure to produce a valid
            Jharkhand Domicile Certificate during document verification will
            lead to the cancellation of my reservation benefits.{" "}
            <span className="text-red-500 font-bold">*</span>
          </span>
        </label>
      </div>
    </div>
  );

  // const renderEducationDetails = () => (
  //   <div className="space-y-8">
  //    <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
  //     <div className="absolute -top-4 left-5 bg-white px-3">
  //       <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
  //         <GraduationCap className="w-5 h-5 text-primary" />
  //         Highest Qualification
  //       </h3>
  //     </div>
  //     <div className="mt-1">
  //        <label className="block text-slate-700 text-sm font-medium mb-2">
  //            Select your highest educational qualification <span className="text-red-600">*</span>
  //           </label>
  //       <select
  //         value={highestQualification}
  //         onChange={(e) => setHighestQualification(e.target.value)}
  //         className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
  //       >
  //         <option value="graduation">Graduation</option>
  //         <option value="postGraduation">Post Graduation</option>
  //         <option value="diploma">Diploma</option>
  //         <option value="phd">Ph.D</option>
  //         <option value="others">Others</option>
  //       </select>
       
       
  //     </div>
  //   </div>
  //     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
        
        
  //       <div className="absolute -top-4 left-5 bg-white px-3">
  //         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
  //           <Award className="w-5 h-5 text-primary" />
  //           10th / SSC Education
  //         </h3>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Board Name <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.board}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, board: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Roll Number <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.rollNumber}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, rollNumber: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Total Marks <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.totalMarks}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, totalMarks: e.target.value },
  //               })
  //             }
  //             placeholder="e.g., 500"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Marks Obtained <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.marksObtained}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, marksObtained: e.target.value },
  //               })
  //             }
  //             placeholder="e.g., 450"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Percentage (%) /CGPA <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.percentage}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, percentage: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Passing Year <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.yearOfPassing}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, yearOfPassing: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Passing Certificate No.<span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.tenth.passingCertificateNo}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 tenth: { ...education.tenth, passingCertificateNo: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
  //       <div className="absolute -top-4 left-5 bg-white px-3">
  //         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
  //           <BookOpen className="w-5 h-5 text-primary" />
  //           12th / HSC Education
  //         </h3>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Board Name
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.board}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: { ...education.twelfth, board: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Roll Number 
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.rollNumber}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: { ...education.twelfth, rollNumber: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Total Marks 
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.totalMarks}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: { ...education.twelfth, totalMarks: e.target.value },
  //               })
  //             }
  //             placeholder="e.g., 500"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Marks Obtained 
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.marksObtained}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: { ...education.twelfth, marksObtained: e.target.value },
  //               })
  //             }
  //             placeholder="e.g., 450"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Percentage (%) 
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.percentage}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: { ...education.twelfth, percentage: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Passing Year 
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.yearOfPassing}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: {
  //                   ...education.twelfth,
  //                   yearOfPassing: e.target.value,
  //                 },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Passing Certificate No. 
  //           </label>
  //           <input
  //             type="text"
  //             value={education.twelfth.passingCertificateNo}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 twelfth: { ...education.twelfth, passingCertificateNo: e.target.value },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
  //       <div className="absolute -top-4 left-5 bg-white px-3">
  //         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
  //           <GraduationCap className="w-5 h-5 text-primary" />
  //           Graduation Education
  //         </h3>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Course Name <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.graduationCourse}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   graduationCourse: e.target.value,
  //                 },
  //               })
  //             }
  //             placeholder="e.g., B.A., B.Sc., B.Com"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             University Name <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.university}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   university: e.target.value,
  //                 },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Passout Year<span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.passoutYear}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   passoutYear: e.target.value,
  //                 },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Total Marks <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.totalMarks}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   totalMarks: e.target.value,
  //                 },
  //               })
  //             }
  //             placeholder="e.g., 3000"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Marks Obtained <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.marksObtained}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   marksObtained: e.target.value,
  //                 },
  //               })
  //             }
  //             placeholder="e.g., 2400"
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Percentage/CGPA <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.percentage}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   percentage: e.target.value,
  //                 },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Specialization/Subject <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.specialization}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   specialization: e.target.value,
  //                 },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-slate-700 text-sm font-medium mb-2">
  //             Passing Certificate No. <span className="text-red-600">*</span>
  //           </label>
  //           <input
  //             type="text"
  //             value={education.graduation.passingCertificateNo}
  //             onChange={(e) =>
  //               setEducation({
  //                 ...education,
  //                 graduation: {
  //                   ...education.graduation,
  //                   passingCertificateNo: e.target.value,
  //                 },
  //               })
  //             }
  //             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
  //       <label className="flex items-center gap-3 cursor-pointer mb-4">
  //         <input
  //           type="checkbox"
  //           checked={education.postGraduation.hasPostGraduation}
  //           onChange={(e) =>
  //             setEducation({
  //               ...education,
  //               postGraduation: {
  //                 ...education.postGraduation,
  //                 hasPostGraduation: e.target.checked,
  //               },
  //             })
  //           }
  //           className="w-4 h-4 text-primary rounded"
  //         />
  //         <span className="font-semibold text-slate-800">
  //           Post-Graduation Qualification
  //         </span>
  //       </label>
  //       {education.postGraduation.hasPostGraduation && (
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               University/College Name
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.university}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     university: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Subject
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.subject}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     subject: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Total Marks
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.totalMarks}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     totalMarks: e.target.value,
  //                   },
  //                 })
  //               }
  //               placeholder="e.g., 2000"
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Marks Obtained
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.marksObtained}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     marksObtained: e.target.value,
  //                   },
  //                 })
  //               }
  //               placeholder="e.g., 1600"
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Passout Year
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.passoutYear}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     passoutYear: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Percentage
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.percentage}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     percentage: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Passing Certificate No.
  //             </label>
  //             <input
  //               type="text"
  //               value={education.postGraduation.passingCertificateNo}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   postGraduation: {
  //                     ...education.postGraduation,
  //                     passingCertificateNo: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
  //       <label className="flex items-center gap-3 cursor-pointer mb-4">
  //         <input
  //           type="checkbox"
  //           checked={education.diploma.hasDiploma}
  //           onChange={(e) =>
  //             setEducation({
  //               ...education,
  //               diploma: { ...education.diploma, hasDiploma: e.target.checked },
  //             })
  //           }
  //           className="w-4 h-4 text-primary rounded"
  //         />
  //         <span className="font-semibold text-slate-800">
  //           Diploma / Additional Qualification
  //         </span>
  //       </label>
  //       {education.diploma.hasDiploma && (
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Institute Name
  //             </label>
  //             <input
  //               type="text"
  //               value={education.diploma.instituteName}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   diploma: {
  //                     ...education.diploma,
  //                     instituteName: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Qualification Type
  //             </label>
  //             <input
  //               type="text"
  //               value={education.diploma.qualificationType}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   diploma: {
  //                     ...education.diploma,
  //                     qualificationType: e.target.value,
  //                   },
  //                 })
  //               }
  //               placeholder="Diploma/Certificate"
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Total Marks
  //             </label>
  //             <input
  //               type="text"
  //               value={education.diploma.totalMarks}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   diploma: {
  //                     ...education.diploma,
  //                     totalMarks: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Marks Obtained
  //             </label>
  //             <input
  //               type="text"
  //               value={education.diploma.marksObtained}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   diploma: {
  //                     ...education.diploma,
  //                     marksObtained: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Year of Completion
  //             </label>
  //             <input
  //               type="text"
  //               value={education.diploma.year}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   diploma: { ...education.diploma, year: e.target.value },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Certificate No.
  //             </label>
  //             <input
  //               type="text"
  //               value={education.diploma.certificateNo}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   diploma: {
  //                     ...education.diploma,
  //                     certificateNo: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
  //       <label className="flex items-center gap-3 cursor-pointer mb-4">
  //         <input
  //           type="checkbox"
  //           checked={education.experience.hasExperience}
  //           onChange={(e) =>
  //             setEducation({
  //               ...education,
  //               experience: {
  //                 ...education.experience,
  //                 hasExperience: e.target.checked,
  //               },
  //             })
  //           }
  //           className="w-4 h-4 text-primary rounded"
  //         />
  //         <span className="font-semibold text-slate-800">
  //           Post-Qualification Experience
  //         </span>
  //       </label>
  //       {education.experience.hasExperience && (
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Organization Name
  //             </label>
  //             <input
  //               type="text"
  //               value={education.experience.organization}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   experience: {
  //                     ...education.experience,
  //                     organization: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Designation
  //             </label>
  //             <input
  //               type="text"
  //               value={education.experience.designation}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   experience: {
  //                     ...education.experience,
  //                     designation: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Date of Joining
  //             </label>
  //             <input
  //               type="date"
  //               value={education.experience.dateOfJoining}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   experience: {
  //                     ...education.experience,
  //                     dateOfJoining: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Relieving Date
  //             </label>
  //             <input
  //               type="date"
  //               value={education.experience.relievingDate}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   experience: {
  //                     ...education.experience,
  //                     relievingDate: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <div className="grid grid-cols-2 gap-2">
  //               <div>
  //                 <label className="block text-sm font-medium text-slate-700 mb-2">
  //                   Years
  //                 </label>
  //                 <input
  //                   type="text"
  //                   value={education.experience.durationYears}
  //                   onChange={(e) =>
  //                     setEducation({
  //                       ...education,
  //                       experience: {
  //                         ...education.experience,
  //                         durationYears: e.target.value,
  //                       },
  //                     })
  //                   }
  //                   placeholder="Years"
  //                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block text-sm font-medium text-slate-700 mb-2">
  //                   Months
  //                 </label>
  //                 <input
  //                   type="text"
  //                   value={education.experience.durationMonths}
  //                   onChange={(e) =>
  //                     setEducation({
  //                       ...education,
  //                       experience: {
  //                         ...education.experience,
  //                         durationMonths: e.target.value,
  //                       },
  //                     })
  //                   }
  //                   placeholder="Months"
  //                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Experience Letter No.
  //             </label>
  //             <input
  //               type="text"
  //               value={education.experience.experienceLetterNo}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   experience: {
  //                     ...education.experience,
  //                     experienceLetterNo: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
  //       <label className="flex items-center gap-3 cursor-pointer mb-4">
  //         <input
  //           type="checkbox"
  //           checked={education.contractualService.hasContractualService}
  //           onChange={(e) =>
  //             setEducation({
  //               ...education,
  //               contractualService: {
  //                 ...education.contractualService,
  //                 hasContractualService: e.target.checked,
  //               },
  //             })
  //           }
  //           className="w-4 h-4 text-primary rounded"
  //         />
  //         <span className="font-semibold text-slate-800">
  //           Contractual Service at SDTL Namkum
  //         </span>
  //       </label>
  //       {education.contractualService.hasContractualService && (
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Organization
  //             </label>
  //             <input
  //               type="text"
  //               value={education.contractualService.organization}
  //               disabled
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-2">
  //               Contract ID
  //             </label>
  //             <input
  //               type="text"
  //               value={education.contractualService.contractId}
  //               onChange={(e) =>
  //                 setEducation({
  //                   ...education,
  //                   contractualService: {
  //                     ...education.contractualService,
  //                     contractId: e.target.value,
  //                   },
  //                 })
  //               }
  //               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //             />
  //           </div>
  //           <div>
  //             <div className="grid grid-cols-2 gap-2">
  //               <div>
  //                 <label className="block text-sm font-medium text-slate-700 mb-2">
  //                   Years
  //                 </label>
  //                 <input
  //                   type="text"
  //                   value={education.contractualService.durationYears}
  //                   onChange={(e) =>
  //                     setEducation({
  //                       ...education,
  //                       contractualService: {
  //                         ...education.contractualService,
  //                         durationYears: e.target.value,
  //                       },
  //                     })
  //                   }
  //                   placeholder="Years"
  //                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block text-sm font-medium text-slate-700 mb-2">
  //                   Months
  //                 </label>
  //                 <input
  //                   type="text"
  //                   value={education.contractualService.durationMonths}
  //                   onChange={(e) =>
  //                     setEducation({
  //                       ...education,
  //                       contractualService: {
  //                         ...education.contractualService,
  //                         durationMonths: e.target.value,
  //                       },
  //                     })
  //                   }
  //                   placeholder="Months"
  //                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

//   const renderPostPreference = () => (
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//     <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//       <div className="mb-6">
//         <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
//           Post Preference Selection
//         </h3>
//         <p className="text-sm text-slate-500 mt-1">
//           Based on your educational qualifications, we have identified the following posts for which you are eligible. Please rank them in order of priority.
//         </p>
//       </div>

//       <section className="mb-8">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="h-6 w-1 bg-primary rounded-full"></div>
//           <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
//             1. Vacancy Stream Selection
//           </h4>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
//             <div className="flex justify-between items-start">
//               <h3 className="font-bold text-slate-800">Regular Vacancy</h3>
//               <input
//                 type="radio"
//                 name="vacancy_stream"
//                 value="regular"
//                 checked={postPreference.vacancyStream === "regular"}
//                 onChange={(e) =>
//                   setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                 }
//                 className="w-4 h-4 accent-primary"
//               />
//             </div>
//             <p className="text-xs text-slate-500 mt-2">Standard recruitment cycle for fresh posts.</p>
//           </label>

//           <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
//             <div className="flex justify-between items-start">
//               <h3 className="font-bold text-slate-800">Backlog Vacancy</h3>
//               <input
//                 type="radio"
//                 name="vacancy_stream"
//                 value="backlog"
//                 checked={postPreference.vacancyStream === "backlog"}
//                 onChange={(e) =>
//                   setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                 }
//                 className="w-4 h-4 accent-primary"
//               />
//             </div>
//             <p className="text-xs text-slate-500 mt-2">Unfilled posts from previous recruitment years.</p>
//           </label>

//           <label className="border-2 border-primary bg-primary/5 rounded-lg p-4 cursor-pointer md:col-span-2 transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-primary">Both (Recommended)</h3>
//               </div>
//               <input
//                 type="radio"
//                 name="vacancy_stream"
//                 value="both"
//                 checked={postPreference.vacancyStream === "both"}
//                 onChange={(e) =>
//                   setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                 }
//                 className="w-4 h-4 accent-primary"
//               />
//             </div>
//             <p className="text-xs text-primary/80 mt-2">Apply for all available opportunities across both streams.</p>
//           </label>
//         </div>
//       </section>

//       <section>
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//           <div className="flex items-center gap-3">
//             <div className="h-6 w-1 bg-primary rounded-full"></div>
//             <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
//               2. Ranking Eligible Posts
//             </h4>
//           </div>
//           <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
//             5 Posts Available
//           </span>
//         </div>

//         <p className="text-xs text-slate-500 mb-4 italic">Enter priority number manually (1 = highest priority)</p>

//         <div className="space-y-3">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center gap-3 shrink-0">
//                 <span className="text-sm font-bold text-slate-400 w-4">{post.id}</span>
//                 <GripVertical size={18} className="text-slate-400 cursor-grab" />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h4 className="text-sm font-bold text-slate-800 truncate">{post.title}</h4>
//                 <p className="text-xs text-slate-500 truncate mt-0.5">{post.dept}</p>
//               </div>

//               <div className="hidden md:block px-4 text-center border-x border-slate-200">
//                 <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Grade Pay</span>
//                 <span className="text-xs font-bold text-slate-600">{post.pay}</span>
//               </div>

//               <div className="shrink-0 ml-2">
//                 <input
//                   type="number"
//                   min="1"
//                   max="5"
//                   value={postPreference.postRankings[post.id]}
//                   onChange={(e) => handlePostRankingChange(post.id, parseInt(e.target.value))}
//                   className="w-12 h-12 border border-slate-300 rounded-lg text-center font-bold text-primary focus:border-primary outline-none"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>

//     <aside className="space-y-6">
//       <div className="bg-primary rounded-lg p-6 text-white shadow-lg">
//         <div className="flex items-center gap-2 mb-5">
//           <Info size={20} className="text-emerald-300" />
//           <h3 className="text-base font-bold uppercase tracking-wider">Selection Rules</h3>
//         </div>
//         <ul className="text-sm space-y-4 list-disc pl-5 opacity-90 leading-relaxed">
//           <li>Preferences once locked cannot be changed after the final submission of the form.</li>
//           <li>Ranking must be unique for each post (e.g., you cannot have two posts at Priority 1).</li>
//           <li>Allocations will be made strictly based on Merit and the Preferences provided here.</li>
//           <li>Check the physical and medical criteria for specific posts in the official brochure.</li>
//         </ul>
//       </div>

//       <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm text-center">
//         <div className="w-12 h-12 bg-emerald-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
//           <HelpCircle size={24} />
//         </div>
//         <h4 className="text-sm font-bold text-slate-800">Need Help?</h4>
//         <p className="text-xs text-slate-500 mt-2 mb-5 leading-normal">
//           Contact the recruitment helpdesk for clarification on post duties and eligibility.
//         </p>
//         <button className="w-full flex items-center justify-center gap-2 h-12 bg-transparent border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
//           <FileText size={16} />
//           Read Full Advertisement
//         </button>
//       </div>
//     </aside>
//   </div>
// );

// Replace the renderPostPreference function with this updated version:

// const renderEducationDetails = () => (
//   <div className="space-y-8">
//     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//       <div className="absolute -top-4 left-5 bg-white px-3">
//         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//           <GraduationCap className="w-5 h-5 text-primary" />
//           Highest Qualification
//         </h3>
//       </div>
//       <div className="mt-1">
//         <label className="block text-slate-700 text-sm font-medium mb-2">
//           Select your highest educational qualification <span className="text-red-600">*</span>
//         </label>
//         <select
//           value={highestQualification}
//           onChange={(e) => setHighestQualification(e.target.value)}
//           className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//         >
//           <option value="graduation">Graduation</option>
//           <option value="postGraduation">Post Graduation</option>
//           <option value="diploma">Diploma</option>
//           <option value="phd">Ph.D</option>
//           <option value="others">Others</option>
//         </select>
//       </div>
//     </div>
    
//     {/* 10th / SSC Education */}
//     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//       <div className="absolute -top-4 left-5 bg-white px-3">
//         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//           <Award className="w-5 h-5 text-primary" />
//           10th / SSC Education
//         </h3>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Board Name <span className="text-red-600">*</span>
//           </label>
//           <select
//             value={education.tenth.board}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, board: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Board</option>
//             {boards.map((board) => (
//               <option key={board} value={board}>
//                 {board}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Roll Number <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.tenth.rollNumber}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, rollNumber: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Total Marks <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.tenth.totalMarks}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, totalMarks: e.target.value },
//               })
//             }
//             placeholder="e.g., 500"
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Marks Obtained <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.tenth.marksObtained}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, marksObtained: e.target.value },
//               })
//             }
//             placeholder="e.g., 450"
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Percentage (%) / CGPA <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.tenth.percentage}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, percentage: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Passing Year <span className="text-red-600">*</span>
//           </label>
//           <select
//             value={education.tenth.yearOfPassing}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, yearOfPassing: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Year</option>
//             {passingYears.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Passing Certificate No. <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.tenth.passingCertificateNo}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 tenth: { ...education.tenth, passingCertificateNo: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//       </div>
//     </div>

//     {/* 12th / HSC Education */}
//     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//       <div className="absolute -top-4 left-5 bg-white px-3">
//         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//           <BookOpen className="w-5 h-5 text-primary" />
//           12th / HSC Education
//         </h3>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Board Name
//           </label>
//           <select
//             value={education.twelfth.board}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, board: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Board</option>
//             {boards.map((board) => (
//               <option key={board} value={board}>
//                 {board}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Roll Number
//           </label>
//           <input
//             type="text"
//             value={education.twelfth.rollNumber}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, rollNumber: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Total Marks
//           </label>
//           <input
//             type="text"
//             value={education.twelfth.totalMarks}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, totalMarks: e.target.value },
//               })
//             }
//             placeholder="e.g., 500"
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Marks Obtained
//           </label>
//           <input
//             type="text"
//             value={education.twelfth.marksObtained}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, marksObtained: e.target.value },
//               })
//             }
//             placeholder="e.g., 450"
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Percentage (%)
//           </label>
//           <input
//             type="text"
//             value={education.twelfth.percentage}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, percentage: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Passing Year
//           </label>
//           <select
//             value={education.twelfth.yearOfPassing}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, yearOfPassing: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Year</option>
//             {passingYears.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Passing Certificate No.
//           </label>
//           <input
//             type="text"
//             value={education.twelfth.passingCertificateNo}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 twelfth: { ...education.twelfth, passingCertificateNo: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//       </div>
//     </div>

//     {/* Graduation Education */}
//     <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//       <div className="absolute -top-4 left-5 bg-white px-3">
//         <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//           <GraduationCap className="w-5 h-5 text-primary" />
//           Graduation Education
//         </h3>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Course Name <span className="text-red-600">*</span>
//           </label>
//           <select
//             value={education.graduation.graduationCourse}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, graduationCourse: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Course</option>
//             {graduationCourseNames.map((course) => (
//               <option key={course} value={course}>
//                 {course}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             University Name <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.graduation.university}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, university: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Passout Year <span className="text-red-600">*</span>
//           </label>
//           <select
//             value={education.graduation.passoutYear}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, passoutYear: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Year</option>
//             {passingYears.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Total Marks <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.graduation.totalMarks}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, totalMarks: e.target.value },
//               })
//             }
//             placeholder="e.g., 3000"
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Marks Obtained <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.graduation.marksObtained}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, marksObtained: e.target.value },
//               })
//             }
//             placeholder="e.g., 2400"
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Percentage/CGPA <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.graduation.percentage}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, percentage: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Specialization/Subject <span className="text-red-600">*</span>
//           </label>
//           <select
//             value={education.graduation.specialization}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, specialization: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((subject) => (
//               <option key={subject} value={subject}>
//                 {subject}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Passing Certificate No. <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             value={education.graduation.passingCertificateNo}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 graduation: { ...education.graduation, passingCertificateNo: e.target.value },
//               })
//             }
//             className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           />
//         </div>
//       </div>
//     </div>

//     {/* Post Graduation Section */}
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//       <label className="flex items-center gap-3 cursor-pointer mb-4">
//         <input
//           type="checkbox"
//           checked={education.postGraduation.hasPostGraduation}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               postGraduation: { ...education.postGraduation, hasPostGraduation: e.target.checked },
//             })
//           }
//           className="w-4 h-4 text-primary rounded"
//         />
//         <span className="font-semibold text-slate-800">Post-Graduation Qualification</span>
//       </label>
//       {education.postGraduation.hasPostGraduation && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               University/College Name
//             </label>
//             <input
//               type="text"
//               value={education.postGraduation.university}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, university: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Subject
//             </label>
//             <select
//               value={education.postGraduation.subject}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, subject: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             >
//               <option value="">Select Subject</option>
//               {subjects.map((subject) => (
//                 <option key={subject} value={subject}>
//                   {subject}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Total Marks
//             </label>
//             <input
//               type="text"
//               value={education.postGraduation.totalMarks}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, totalMarks: e.target.value },
//                 })
//               }
//               placeholder="e.g., 2000"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Marks Obtained
//             </label>
//             <input
//               type="text"
//               value={education.postGraduation.marksObtained}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, marksObtained: e.target.value },
//                 })
//               }
//               placeholder="e.g., 1600"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Passout Year
//             </label>
//             <select
//               value={education.postGraduation.passoutYear}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, passoutYear: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             >
//               <option value="">Select Year</option>
//               {passingYears.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Percentage
//             </label>
//             <input
//               type="text"
//               value={education.postGraduation.percentage}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, percentage: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Passing Certificate No.
//             </label>
//             <input
//               type="text"
//               value={education.postGraduation.passingCertificateNo}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   postGraduation: { ...education.postGraduation, passingCertificateNo: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Diploma / Additional Qualification Section - Updated with Dropdowns */}
// <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//   <label className="flex items-center gap-3 cursor-pointer mb-4">
//     <input
//       type="checkbox"
//       checked={education.diploma.hasDiploma}
//       onChange={(e) =>
//         setEducation({
//           ...education,
//           diploma: { ...education.diploma, hasDiploma: e.target.checked },
//         })
//       }
//       className="w-4 h-4 text-primary rounded"
//     />
//     <span className="font-semibold text-slate-800">
//       Diploma / Additional Qualification
//     </span>
//   </label>
//   {education.diploma.hasDiploma && (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Institute Name
//         </label>
//         <input
//           type="text"
//           value={education.diploma.instituteName}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: {
//                 ...education.diploma,
//                 instituteName: e.target.value,
//               },
//             })
//           }
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//           placeholder="e.g., Govt Polytechnic, Ranchi"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Qualification Type
//         </label>
//         <select
//           value={education.diploma.qualificationType}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: {
//                 ...education.diploma,
//                 qualificationType: e.target.value,
//               },
//             })
//           }
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//         >
//           <option value="">Select Qualification Type</option>
//           <option value="Diploma">Diploma</option>
//           <option value="Advanced Diploma">Advanced Diploma</option>
//           <option value="Post Graduate Diploma">Post Graduate Diploma</option>
//           <option value="Certificate Course">Certificate Course</option>
//           <option value="Vocational Course">Vocational Course</option>
//           <option value="PG Diploma">PG Diploma</option>
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Total Marks
//         </label>
//         <input
//           type="text"
//           value={education.diploma.totalMarks}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: {
//                 ...education.diploma,
//                 totalMarks: e.target.value,
//               },
//             })
//           }
//           placeholder="e.g., 1000"
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Marks Obtained
//         </label>
//         <input
//           type="text"
//           value={education.diploma.marksObtained}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: {
//                 ...education.diploma,
//                 marksObtained: e.target.value,
//               },
//             })
//           }
//           placeholder="e.g., 850"
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Year of Completion
//         </label>
//         <select
//           value={education.diploma.year}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: { ...education.diploma, year: e.target.value },
//             })
//           }
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//         >
//           <option value="">Select Year</option>
//           {passingYears.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Certificate No.
//         </label>
//         <input
//           type="text"
//           value={education.diploma.certificateNo}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: {
//                 ...education.diploma,
//                 certificateNo: e.target.value,
//               },
//             })
//           }
//           placeholder="Certificate/Diploma Number"
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//         />
//       </div>
//       <div className="md:col-span-2">
//         <label className="block text-sm font-medium text-slate-700 mb-2">
//           Specialization/Branch (if any)
//         </label>
//         <select
//           value={education.diploma.qualificationType}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               diploma: {
//                 ...education.diploma,
//                 qualificationType: e.target.value,
//               },
//             })
//           }
//           className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//         >
//           <option value="">Select Specialization</option>
//           <option value="Computer Science">Computer Science</option>
//           <option value="Mechanical Engineering">Mechanical Engineering</option>
//           <option value="Civil Engineering">Civil Engineering</option>
//           <option value="Electrical Engineering">Electrical Engineering</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Information Technology">Information Technology</option>
//           <option value="Pharmacy">Pharmacy</option>
//           <option value="Agriculture">Agriculture</option>
//           <option value="Business Administration">Business Administration</option>
//           <option value="Hotel Management">Hotel Management</option>
//         </select>
//       </div>
//     </div>
//   )}
// </div>

//     {/* Experience Section with Year and Month Dropdowns */}
//     <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//       <label className="flex items-center gap-3 cursor-pointer mb-4">
//         <input
//           type="checkbox"
//           checked={education.experience.hasExperience}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               experience: { ...education.experience, hasExperience: e.target.checked },
//             })
//           }
//           className="w-4 h-4 text-primary rounded"
//         />
//         <span className="font-semibold text-slate-800">Post-Qualification Experience</span>
//       </label>
//       {education.experience.hasExperience && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Organization Name
//             </label>
//             <input
//               type="text"
//               value={education.experience.organization}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   experience: { ...education.experience, organization: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Designation
//             </label>
//             <input
//               type="text"
//               value={education.experience.designation}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   experience: { ...education.experience, designation: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Date of Joining
//             </label>
//             <input
//               type="date"
//               value={education.experience.dateOfJoining}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   experience: { ...education.experience, dateOfJoining: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Relieving Date
//             </label>
//             <input
//               type="date"
//               value={education.experience.relievingDate}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   experience: { ...education.experience, relievingDate: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Years
//                 </label>
//                 <select
//                   value={education.experience.durationYears}
//                   onChange={(e) =>
//                     setEducation({
//                       ...education,
//                       experience: { ...education.experience, durationYears: e.target.value },
//                     })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                 >
//                   <option value="">Select Years</option>
//                   {yearsRange.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Months
//                 </label>
//                 <select
//                   value={education.experience.durationMonths}
//                   onChange={(e) =>
//                     setEducation({
//                       ...education,
//                       experience: { ...education.experience, durationMonths: e.target.value },
//                     })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                 >
//                   <option value="">Select Months</option>
//                   {months.map((month) => (
//                     <option key={month} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Experience Letter No.
//             </label>
//             <input
//               type="text"
//               value={education.experience.experienceLetterNo}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   experience: { ...education.experience, experienceLetterNo: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Contractual Service Section with Year and Month Dropdowns */}
//     <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//       <label className="flex items-center gap-3 cursor-pointer mb-4">
//         <input
//           type="checkbox"
//           checked={education.contractualService.hasContractualService}
//           onChange={(e) =>
//             setEducation({
//               ...education,
//               contractualService: { ...education.contractualService, hasContractualService: e.target.checked },
//             })
//           }
//           className="w-4 h-4 text-primary rounded"
//         />
//         <span className="font-semibold text-slate-800">Contractual Service at SDTL Namkum</span>
//       </label>
//       {education.contractualService.hasContractualService && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Organization
//             </label>
//             <input
//               type="text"
//               value={education.contractualService.organization}
//               disabled
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Contract ID
//             </label>
//             <input
//               type="text"
//               value={education.contractualService.contractId}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   contractualService: { ...education.contractualService, contractId: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Years
//                 </label>
//                 <select
//                   value={education.contractualService.durationYears}
//                   onChange={(e) =>
//                     setEducation({
//                       ...education,
//                       contractualService: { ...education.contractualService, durationYears: e.target.value },
//                     })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                 >
//                   <option value="">Select Years</option>
//                   {yearsRange.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Months
//                 </label>
//                 <select
//                   value={education.contractualService.durationMonths}
//                   onChange={(e) =>
//                     setEducation({
//                       ...education,
//                       contractualService: { ...education.contractualService, durationMonths: e.target.value },
//                     })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                 >
//                   <option value="">Select Months</option>
//                   {months.map((month) => (
//                     <option key={month} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

const renderEducationDetails = () => (
  <div className="space-y-8">
    <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
      <div className="absolute -top-4 left-5 bg-white px-3">
        <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Highest Qualification
        </h3>
      </div>
      <div className="mt-1">
        <label className="block text-slate-700 text-sm font-medium mb-2">
          Select your highest educational qualification <span className="text-red-600">*</span>
        </label>
        <SearchableDropdown
          options={["graduation", "postGraduation", "diploma", "phd", "others"]}
          value={highestQualification}
          onChange={setHighestQualification}
          placeholder="Select Qualification"
          required
          className="w-full md:w-1/2"
        />
      </div>
    </div>
    
    {/* 10th / SSC Education */}
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
            onChange={(value) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, board: value },
              })
            }
            placeholder="Select Board"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Roll Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.tenth.rollNumber}
            onChange={(e) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, rollNumber: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Total Marks <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.tenth.totalMarks}
            onChange={(e) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, totalMarks: e.target.value },
              })
            }
            placeholder="e.g., 500"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Marks Obtained <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.tenth.marksObtained}
            onChange={(e) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, marksObtained: e.target.value },
              })
            }
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
            onChange={(e) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, percentage: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Passing Year <span className="text-red-600">*</span>
          </label>
          <SearchableDropdown
            options={passingYears}
            value={education.tenth.yearOfPassing}
            onChange={(value) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, yearOfPassing: value },
              })
            }
            placeholder="Select Year"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Passing Certificate No. <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.tenth.passingCertificateNo}
            onChange={(e) =>
              setEducation({
                ...education,
                tenth: { ...education.tenth, passingCertificateNo: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
      </div>
    </div>

    {/* 12th / HSC Education */}
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
            onChange={(value) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, board: value },
              })
            }
            placeholder="Select Board"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Roll Number
          </label>
          <input
            type="text"
            value={education.twelfth.rollNumber}
            onChange={(e) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, rollNumber: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Total Marks
          </label>
          <input
            type="text"
            value={education.twelfth.totalMarks}
            onChange={(e) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, totalMarks: e.target.value },
              })
            }
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
            onChange={(e) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, marksObtained: e.target.value },
              })
            }
            placeholder="e.g., 450"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Percentage (%)
          </label>
          <input
            type="text"
            value={education.twelfth.percentage}
            onChange={(e) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, percentage: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Passing Year
          </label>
          <SearchableDropdown
            options={passingYears}
            value={education.twelfth.yearOfPassing}
            onChange={(value) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, yearOfPassing: value },
              })
            }
            placeholder="Select Year"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Passing Certificate No.
          </label>
          <input
            type="text"
            value={education.twelfth.passingCertificateNo}
            onChange={(e) =>
              setEducation({
                ...education,
                twelfth: { ...education.twelfth, passingCertificateNo: e.target.value },
              })
            }
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
            options={graduationCourseNames}
            value={education.graduation.graduationCourse}
            onChange={(value) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, graduationCourse: value },
              })
            }
            placeholder="Select Course"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            University Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.graduation.university}
            onChange={(e) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, university: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Passout Year <span className="text-red-600">*</span>
          </label>
          <SearchableDropdown
            options={passingYears}
            value={education.graduation.passoutYear}
            onChange={(value) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, passoutYear: value },
              })
            }
            placeholder="Select Year"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Total Marks <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.graduation.totalMarks}
            onChange={(e) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, totalMarks: e.target.value },
              })
            }
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
            onChange={(e) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, marksObtained: e.target.value },
              })
            }
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
            onChange={(e) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, percentage: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Specialization/Subject <span className="text-red-600">*</span>
          </label>
          <SearchableDropdown
            options={subjects}
            value={education.graduation.specialization}
            onChange={(value) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, specialization: value },
              })
            }
            placeholder="Select Subject"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Passing Certificate No. <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={education.graduation.passingCertificateNo}
            onChange={(e) =>
              setEducation({
                ...education,
                graduation: { ...education.graduation, passingCertificateNo: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
      </div>
    </div>

    {/* Post Graduation Section */}
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
            <SearchableDropdown
              options={subjects}
              value={education.postGraduation.subject}
              onChange={(value) =>
                setEducation({
                  ...education,
                  postGraduation: { ...education.postGraduation, subject: value },
                })
              }
              placeholder="Select Subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Total Marks
            </label>
            <input
              type="text"
              value={education.postGraduation.totalMarks}
              onChange={(e) =>
                setEducation({
                  ...education,
                  postGraduation: { ...education.postGraduation, totalMarks: e.target.value },
                })
              }
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
              onChange={(e) =>
                setEducation({
                  ...education,
                  postGraduation: { ...education.postGraduation, marksObtained: e.target.value },
                })
              }
              placeholder="e.g., 1600"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Passout Year
            </label>
            <SearchableDropdown
              options={passingYears}
              value={education.postGraduation.passoutYear}
              onChange={(value) =>
                setEducation({
                  ...education,
                  postGraduation: { ...education.postGraduation, passoutYear: value },
                })
              }
              placeholder="Select Year"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Percentage
            </label>
            <input
              type="text"
              value={education.postGraduation.percentage}
              onChange={(e) =>
                setEducation({
                  ...education,
                  postGraduation: { ...education.postGraduation, percentage: e.target.value },
                })
              }
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

    {/* Diploma Section with Searchable Dropdowns */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <label className="flex items-center gap-3 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={education.diploma.hasDiploma}
          onChange={(e) =>
            setEducation({
              ...education,
              diploma: { ...education.diploma, hasDiploma: e.target.checked },
            })
          }
          className="w-4 h-4 text-primary rounded"
        />
        <span className="font-semibold text-slate-800">Diploma / Additional Qualification</span>
      </label>
      {education.diploma.hasDiploma && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Institute Name
            </label>
            <input
              type="text"
              value={education.diploma.instituteName}
              onChange={(e) =>
                setEducation({
                  ...education,
                  diploma: { ...education.diploma, instituteName: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              placeholder="e.g., Govt Polytechnic, Ranchi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Qualification Type
            </label>
            <SearchableDropdown
              options={["Diploma", "Advanced Diploma", "Post Graduate Diploma", "Certificate Course", "Vocational Course", "PG Diploma"]}
              value={education.diploma.qualificationType}
              onChange={(value) =>
                setEducation({
                  ...education,
                  diploma: { ...education.diploma, qualificationType: value },
                })
              }
              placeholder="Select Qualification Type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Total Marks
            </label>
            <input
              type="text"
              value={education.diploma.totalMarks}
              onChange={(e) =>
                setEducation({
                  ...education,
                  diploma: { ...education.diploma, totalMarks: e.target.value },
                })
              }
              placeholder="e.g., 1000"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Marks Obtained
            </label>
            <input
              type="text"
              value={education.diploma.marksObtained}
              onChange={(e) =>
                setEducation({
                  ...education,
                  diploma: { ...education.diploma, marksObtained: e.target.value },
                })
              }
              placeholder="e.g., 850"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Year of Completion
            </label>
            <SearchableDropdown
              options={passingYears}
              value={education.diploma.year}
              onChange={(value) =>
                setEducation({
                  ...education,
                  diploma: { ...education.diploma, year: value },
                })
              }
              placeholder="Select Year"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Certificate No.
            </label>
            <input
              type="text"
              value={education.diploma.certificateNo}
              onChange={(e) =>
                setEducation({
                  ...education,
                  diploma: { ...education.diploma, certificateNo: e.target.value },
                })
              }
              placeholder="Certificate/Diploma Number"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>

    {/* Experience Section with Searchable Dropdowns for Years/Months */}
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

    {/* Contractual Service Section with Searchable Dropdowns */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <label className="flex items-center gap-3 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={education.contractualService.hasContractualService}
          onChange={(e) =>
            setEducation({
              ...education,
              contractualService: { ...education.contractualService, hasContractualService: e.target.checked },
            })
          }
          className="w-4 h-4 text-primary rounded"
        />
        <span className="font-semibold text-slate-800">Contractual Service at SDTL Namkum</span>
      </label>
      {education.contractualService.hasContractualService && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Organization
            </label>
            <input
              type="text"
              value={education.contractualService.organization}
              disabled
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Contract ID
            </label>
            <input
              type="text"
              value={education.contractualService.contractId}
              onChange={(e) =>
                setEducation({
                  ...education,
                  contractualService: { ...education.contractualService, contractId: e.target.value },
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
                  value={education.contractualService.durationYears}
                  onChange={(value) =>
                    setEducation({
                      ...education,
                      contractualService: { ...education.contractualService, durationYears: value },
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
                  value={education.contractualService.durationMonths}
                  onChange={(value) =>
                    setEducation({
                      ...education,
                      contractualService: { ...education.contractualService, durationMonths: value },
                    })
                  }
                  placeholder="Select Months"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const renderPostPreference = () => {
  // Get available priority numbers for a specific post
  const getAvailablePriorities = (currentPostId: number) => {
    const usedPriorities = Object.entries(postPreference.postRankings)
      .filter(([id, priority]) => Number(id) !== currentPostId && priority !== 0)
      .map(([, priority]) => priority);
    
    const allPriorities = [1, 2, 3, 4, 5];
    return allPriorities.filter(p => !usedPriorities.includes(p));
  };

  // Handle priority change from dropdown
  const handlePriorityChange = (postId: number, priority: number) => {
    // Check if this priority is already used by another post
    const isPriorityUsed = Object.entries(postPreference.postRankings)
      .some(([id, p]) => Number(id) !== postId && p === priority);
    
    if (isPriorityUsed && priority !== 0) {
      alert(`Priority ${priority} is already selected for another post. Please choose a different priority.`);
      return;
    }
    
    setPostPreference({
      ...postPreference,
      postRankings: { ...postPreference.postRankings, [postId]: priority },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
            Post Preference Selection
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Based on your educational qualifications, we have identified the following posts for which you are eligible. Please rank them in order of priority.
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
                2. Ranking Eligible Posts
              </h4>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
              5 Posts Available
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-4 italic">Select priority number from dropdown (1 = highest priority). Each priority number can be used only once.</p>

          <div className="space-y-3">
            {posts.map((post) => {
              const currentPriority = postPreference.postRankings[post.id];
              const availablePriorities = getAvailablePriorities(post.id);
              
              return (
                <div
                  key={post.id}
                  className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold text-slate-400 w-2">{post.id}</span>
                    
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{post.title}</h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{post.dept}</p>
                  </div>

                  <div className="hidden md:block px-4 text-center border-x border-slate-200">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Grade Pay</span>
                    <span className="text-xs font-bold text-slate-600">{post.pay}</span>
                  </div>

                  <div className="shrink-0 ml-2">
                    <select
                      value={currentPriority}
                      onChange={(e) => handlePriorityChange(post.id, parseInt(e.target.value))}
                      className="w-30 h-12 border border-slate-300 rounded-lg text-center font-bold text-primary focus:border-primary outline-none px-2"
                    >
                      <option value={0}>Select</option>
                      {availablePriorities.map((priority) => (
                        <option key={priority} value={priority}>
                          Priority {priority}
                        </option>
                      ))}
                      {currentPriority !== 0 && !availablePriorities.includes(currentPriority) && (
                        <option value={currentPriority} disabled>
                          Priority {currentPriority} (Taken)
                        </option>
                      )}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Show warning if not all posts are ranked */}
          {Object.values(postPreference.postRankings).some(p => p === 0) && (
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle size={14} />
                Please assign priorities to all posts before proceeding.
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
            <li>Ranking must be unique for each post (e.g., you cannot have two posts at Priority 1).</li>
            <li>Allocations will be made strictly based on Merit and the Preferences provided here.</li>
            <li>Check the physical and medical criteria for specific posts in the official brochure.</li>
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
      "General Studies",
      "General Science",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Zoology",
      "Botany",
      "Statistics",
      "Economics",
      "Commerce",
      "Geology",
      "Dairy Technology",
      "Fisheries Science",
      "Pharmacy",
      "Pharmaceutical Chemistry",
      "Ayurveda",
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
              onChange={(e) =>
                setLanguageSelection({
                  ...languageSelection,
                  paperOneLanguage: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">Select Language</option>
              {paperOneOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Paper-II Language/Subject <span className="text-red-600">*</span>
            </label>
            <select
              value={languageSelection.paperTwoLanguage}
              onChange={(e) =>
                setLanguageSelection({
                  ...languageSelection,
                  paperTwoLanguage: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">Select Language</option>
              {paperTwoOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            
            
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Paper-III Subject Selection <span className="text-red-600">*</span>
            </label>
            <select
              value={languageSelection.paperThreeLanguage}
              onChange={(e) =>
                setLanguageSelection({
                  ...languageSelection,
                  paperThreeLanguage: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">Select Subject</option>
              {paperThreeOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            
            
          </div>
        </div>
      </div>
    );
  };

  const renderCenterSelection = () => (
    <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
      <div className="absolute -top-4 left-5 bg-white px-3">
        <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Exam Center Preferences
        </h3>
      </div>
      <div className="space-y-6 mt-4">
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            First Preference Center *
          </label>
          <select
            value={centerSelection.firstPreference}
            onChange={(e) =>
              setCenterSelection({
                ...centerSelection,
                firstPreference: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          >
            <option value="">Select Center</option>
            {centers.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Second Preference Center *
          </label>
          <select
            value={centerSelection.secondPreference}
            onChange={(e) =>
              setCenterSelection({
                ...centerSelection,
                secondPreference: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          >
            <option value="">Select Center</option>
            {centers.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Third Preference Center *
          </label>
          <select
            value={centerSelection.thirdPreference}
            onChange={(e) =>
              setCenterSelection({
                ...centerSelection,
                thirdPreference: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          >
            <option value="">Select Center</option>
            {centers.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
        <AlertCircle className="w-4 h-4 inline mr-2" />
        Centers cannot be changed once the application is submitted.
      </p>
    </div>
  );

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
                  className={`border-2 rounded-lg p-5 flex flex-col items-center text-center cursor-pointer transition-all ${feePayment.paymentMode === "online" ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50"}`}
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
                  />
                  <CreditCard size={28} className="text-primary mb-3" />
                  <span className="text-sm font-bold text-primary">
                    Pay Online
                  </span>
                  <span className="text-xs text-slate-500">
                    Net Banking, Card, UPI
                  </span>
                </label>
                {/* <label
                  className={`border-2 rounded-lg p-5 flex flex-col items-center text-center cursor-pointer transition-all ${feePayment.paymentMode === "offline" ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50"}`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="offline"
                    checked={feePayment.paymentMode === "offline"}
                    onChange={(e) =>
                      setFeePayment({
                        ...feePayment,
                        paymentMode: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <Receipt size={28} className="text-slate-600 mb-3" />
                  <span className="text-sm font-bold text-slate-800">
                    Offline Challan
                  </span>
                  <span className="text-xs text-slate-500">
                    Generate Bank Challan
                  </span>
                </label> */}
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
                      className="w-full px-4 py-2 border rounded-lg"
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
                      className="w-full px-4 py-2 border rounded-lg"
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
                      className="w-full px-4 py-2 border rounded-lg"
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
              <button className="h-10 px-4 bg-white border border-sky-200 text-primary text-xs font-bold rounded-lg">
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
            className="h-14 px-12 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl flex items-center gap-2"
          >
            Proceed to Payment <ExternalLink size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderDocuments = () => {
    const documentFields = [
      {
        key: "photo",
        label: "Passport Size Photograph",
        required: true,
        type: "image",
        size: "20KB-50KB",
      },
      {
        key: "signature",
        label: "Signature Scan",
        required: true,
        type: "image",
        size: "10KB-20KB",
      },
      {
        key: "tenthMarksheet",
        label: "10th Marksheet",
        required: true,
        type: "pdf",
        size: "100KB-500KB",
      },
      {
        key: "twelfthMarksheet",
        label: "12th Marksheet",
        required: true,
        type: "pdf",
        size: "100KB-500KB",
      },
      {
        key: "graduationMarksheet",
        label: "Graduation Degree Certificate",
        required: true,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "postGraduationCertificate",
        label: "Post-Graduation Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "diplomaCertificate",
        label: "Diploma Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "experienceCertificate",
        label: "Experience Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "contractualServiceCertificate",
        label: "Contractual Service Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "ewsCertificate",
        label: "EWS Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "domicileCertificate",
        label: "Domicile Certificate",
        required: true,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "castCertificate",
        label: "Caste Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "pwdCertificate",
        label: "Disability Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
      {
        key: "sportsCertificate",
        label: "Sports Certificate",
        required: false,
        type: "pdf",
        size: "Max 500KB",
      },
    ];

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
            return (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-primary transition-all">
                  <input
                    type="file"
                    accept={field.type === "image" ? ".jpg,.jpeg,.png" : ".pdf"}
                    onChange={(e) =>
                      handleFileUpload(
                        field.key as keyof Documents,
                        e.target.files?.[0] || null,
                      )
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="min-h-[100px] px-4 py-3 flex flex-col items-center justify-center text-center">
                    {uploadedFile ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                        <p className="text-xs font-medium text-green-700 truncate">
                          {uploadedFile.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <FileText className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-xs text-slate-500">
                          Click to upload
                        </p>
                        <p className="text-xs text-slate-400">{field.size}</p>
                      </>
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
            legible. Uploaded documents must be in prescribed format and size.
          </p>
        </div>
      </div>
    );
  };

  const renderApplicationReview = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border-l-4 border-primary p-4 rounded-lg flex items-start gap-3">
        <AlertCircle size={18} className="text-primary shrink-0" />
        <p className="text-sm font-medium text-slate-700">
          Please review your application details carefully. Once submitted,
          certain information cannot be modified.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Full Name:</span>
              <span className="font-semibold">
                {personalInfo.firstName} {personalInfo.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Father's Name:</span>
              <span className="font-semibold">{personalInfo.fathersName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mother's Name:</span>
              <span className="font-semibold">{personalInfo.motherName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">DOB:</span>
              <span className="font-semibold">{personalInfo.dob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mobile:</span>
              <span className="font-semibold">{personalInfo.mobileNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Alternate Mobile:</span>
              <span className="font-semibold">{personalInfo.alternateNumber || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-semibold">{personalInfo.emailId}</span>
            </div>
          </div>
        </div>
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
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold">
                {reservationCategory.mainCategory}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">PwD:</span>
              <span className="font-semibold">
                {reservationCategory.isPwd === "yes" ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ex-Serviceman:</span>
              <span className="font-semibold">
                {reservationCategory.isExServiceman === "yes" ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sports Quota:</span>
              <span className="font-semibold">
                {reservationCategory.isSportsQuota === "yes" ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
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
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-slate-500">10th:</span>{" "}
            {education.tenth.board} - {education.tenth.percentage}% (
            {education.tenth.yearOfPassing})
          </div>
          <div>
            <span className="text-slate-500">12th:</span>{" "}
            {education.twelfth.board} - {education.twelfth.percentage}% (
            {education.twelfth.yearOfPassing})
          </div>
          <div>
            <span className="text-slate-500">Graduation:</span>{" "}
            {education.graduation.university} -{" "}
            {education.graduation.percentage}%
          </div>
          {education.postGraduation.hasPostGraduation && (
            <div>
              <span className="text-slate-500">Post-Graduation:</span>{" "}
              {education.postGraduation.subject} -{" "}
              {education.postGraduation.percentage}%
            </div>
          )}
        </div>
      </div>
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
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Paper-I Language:</span>
            <span className="font-semibold">
              {languageSelection.paperOneLanguage || "Not Selected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Paper-II Language:</span>
            <span className="font-semibold">
              {languageSelection.paperTwoLanguage || "Not Selected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Paper-III Subject:</span>
            <span className="font-semibold">
              {languageSelection.paperThreeLanguage || "Not Selected"}
            </span>
          </div>
        </div>
      </div>
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
          <div className="border rounded-lg p-5 text-center hover:border-primary cursor-pointer">
            <FileText className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <h3 className="font-bold">Download Application</h3>
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
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
              >
                Next <ChevronRight className="w-4 h-4" />
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
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Send className="w-4 h-4" /> Submit Application
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