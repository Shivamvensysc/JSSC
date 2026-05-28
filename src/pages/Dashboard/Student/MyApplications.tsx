import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  User,
  GraduationCap,
  MapPin,
  FileCheck,
  Shield,
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
  GripVertical,
  Bell,
  Edit3,
  CheckSquare,
  
  
  Globe,
  Sliders,
 
  
  
  
  
  
 
  
} from "lucide-react";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  fathersName: string;
  dob: string;
  gender: string;
  nationality: string;
  mobileNumber: string;
  emailId: string;
  aadharNumber: string;
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
  };
  twelfth: {
    board: string;
    rollNumber: string;
    percentage: string;
    yearOfPassing: string;
  };
  graduation: {
    university: string;
    passoutYear: string;
    percentage: string;
    specialization: string;
  };
  postGraduation: {
    hasPostGraduation: boolean;
    university: string;
    passoutYear: string;
    percentage: string;
    subject: string;
  };
  diploma: {
    hasDiploma: boolean;
    instituteName: string;
    qualificationType: string;
    year: string;
  };
  experience: {
    hasExperience: boolean;
    durationMonths: string;
    durationYears: string;
    organization: string;
    designation: string;
    dateOfJoining: string;
  };
  contractualService: {
    hasContractualService: boolean;
    durationYears: string;
    durationMonths: string;
    organization: string;
  };
}

interface PostPreference {
  vacancyStream: string;
  postRankings: { [key: number]: number };
}

interface CenterSelection {
  firstPreference: string;
  secondPreference: string;
  thirdPreference: string;
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

const MyApplications: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(
    {
      isSubmitted: false,
      registrationNumber: "",
      submissionDate: "",
    },
  );

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    fathersName: "",
    dob: "",
    gender: "",
    nationality: "Indian",
    mobileNumber: "",
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
    },
    twelfth: {
      board: "",
      rollNumber: "",
      percentage: "",
      yearOfPassing: "",
    },
    graduation: {
      university: "",
      passoutYear: "",
      percentage: "",
      specialization: "",
    },
    postGraduation: {
      hasPostGraduation: false,
      university: "",
      passoutYear: "",
      percentage: "",
      subject: "",
    },
    diploma: {
      hasDiploma: false,
      instituteName: "",
      qualificationType: "",
      year: "",
    },
    experience: {
      hasExperience: false,
      durationMonths: "",
      durationYears: "",
      organization: "",
      designation: "",
      dateOfJoining: "",
    },
    contractualService: {
      hasContractualService: false,
      durationYears: "",
      durationMonths: "",
      organization: "SDTL Namkum",
    },
  });

  const [postPreference, setPostPreference] = useState<PostPreference>({
    vacancyStream: "both",
    postRankings: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
  });

  const [centerSelection, setCenterSelection] = useState<CenterSelection>({
    firstPreference: "",
    secondPreference: "",
    thirdPreference: "",
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
    { id: 4, title: "Exam Center", icon: MapPin },
    { id: 5, title: "Documents Upload", icon: FileCheck },
    { id: 6, title: "Fee Payment", icon: CreditCard },
    { id: 7, title: "Review & Submit", icon: FileSignature },
  ];

  const handleCopyAddress = () => {
    if (personalInfo.sameAsPermanent) {
      setPersonalInfo({
        ...personalInfo,
        correspondenceAddress: { ...personalInfo.permanentAddress },
      });
    }
  };

  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    setDocuments({ ...documents, [field]: file });
  };

  const handlePostRankingChange = (postId: number, priority: number) => {
    setPostPreference({
      ...postPreference,
      postRankings: { ...postPreference.postRankings, [postId]: priority },
    });
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
      reservationCategory,
      feePayment,
      documents,
    };
    console.log("Form Submitted:", formData);
    setApplicationStatus({
      isSubmitted: true,
      registrationNumber: "2026-JH-8842-109",
      submissionDate: new Date().toLocaleDateString(),
    });
    setIsSubmitted(true);
  };

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
        return renderCenterSelection();
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
              First Name *
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
              Last Name *
            </label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, lastName: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Father's Name *
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
              Date of Birth *
            </label>
            <input
              type="date"
              value={personalInfo.dob}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, dob: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Gender *
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
              Nationality *
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
              Mobile Number *
            </label>
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Email ID *
            </label>
            <input
              type="email"
              value={personalInfo.emailId}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, emailId: e.target.value })
              }
              placeholder="example@domain.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Aadhar Card Number *
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
            <MapPin className="w-5 h-5 text-primary" />
            Permanent Address
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Village/Ward/Street *
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
              Post *
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
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              District *
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
              State *
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
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Pincode *
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
              Police Station *
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
              setPersonalInfo({
                ...personalInfo,
                sameAsPermanent: e.target.checked,
              });
              if (e.target.checked) handleCopyAddress();
            }}
            className="w-4 h-4 text-primary rounded"
          />
          <label
            htmlFor="sameAsPermanent"
            className="text-slate-700 font-medium"
          >
            Same as Permanent Address
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Village/Ward/Street *
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
              Post *
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
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              District *
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
              State *
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
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Pincode *
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
              Police Station *
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
              Reservation Category *
            </label>
            <select
              value={reservationCategory.mainCategory}
              onChange={(e) =>
                setReservationCategory({
                  ...reservationCategory,
                  mainCategory: e.target.value,
                })
              }
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
              Jharkhand Domicile Claim *
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
              Physically Handicapped? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pwd"
                  value="yes"
                  checked={reservationCategory.isPwd === "yes"}
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      isPwd: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      isPwd: e.target.value,
                    })
                  }
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
                  Type of Disability *
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
                  Disability Percentage (%) *
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
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Upload Disability Certificate
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      pwdCertificate: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  accept=".pdf,.jpg,.jpeg"
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
              Ex-Serviceman? *
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
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Upload Discharge Book
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      exServicemanDischargeBook: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  accept=".pdf"
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
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Upload Sports Certificate
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setReservationCategory({
                      ...reservationCategory,
                      sportsCertificate: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  accept=".pdf,.jpg,.jpeg"
                />
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

  const renderEducationDetails = () => (
    <div className="space-y-8">
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
              Board *
            </label>
            <input
              type="text"
              value={education.tenth.board}
              onChange={(e) =>
                setEducation({
                  ...education,
                  tenth: { ...education.tenth, board: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Roll Number *
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
              Percentage (%) *
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
              Passing Year *
            </label>
            <input
              type="text"
              value={education.tenth.yearOfPassing}
              onChange={(e) =>
                setEducation({
                  ...education,
                  tenth: { ...education.tenth, yearOfPassing: e.target.value },
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
            <BookOpen className="w-5 h-5 text-primary" />
            12th / HSC Education
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Board *
            </label>
            <input
              type="text"
              value={education.twelfth.board}
              onChange={(e) =>
                setEducation({
                  ...education,
                  twelfth: { ...education.twelfth, board: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Roll Number *
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
              Percentage (%) *
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
              Passing Year *
            </label>
            <input
              type="text"
              value={education.twelfth.yearOfPassing}
              onChange={(e) =>
                setEducation({
                  ...education,
                  twelfth: {
                    ...education.twelfth,
                    yearOfPassing: e.target.value,
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
            <GraduationCap className="w-5 h-5 text-primary" />
            Graduation Education
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              University *
            </label>
            <input
              type="text"
              value={education.graduation.university}
              onChange={(e) =>
                setEducation({
                  ...education,
                  graduation: {
                    ...education.graduation,
                    university: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Passout Year *
            </label>
            <input
              type="text"
              value={education.graduation.passoutYear}
              onChange={(e) =>
                setEducation({
                  ...education,
                  graduation: {
                    ...education.graduation,
                    passoutYear: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Percentage/CGPA *
            </label>
            <input
              type="text"
              value={education.graduation.percentage}
              onChange={(e) =>
                setEducation({
                  ...education,
                  graduation: {
                    ...education.graduation,
                    percentage: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Specialization/Subject *
            </label>
            <input
              type="text"
              value={education.graduation.specialization}
              onChange={(e) =>
                setEducation({
                  ...education,
                  graduation: {
                    ...education.graduation,
                    specialization: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={education.postGraduation.hasPostGraduation}
            onChange={(e) =>
              setEducation({
                ...education,
                postGraduation: {
                  ...education.postGraduation,
                  hasPostGraduation: e.target.checked,
                },
              })
            }
            className="w-4 h-4 text-primary rounded"
          />
          <span className="font-semibold text-slate-800">
            Post-Graduation Qualification
          </span>
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
                    postGraduation: {
                      ...education.postGraduation,
                      university: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={education.postGraduation.subject}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    postGraduation: {
                      ...education.postGraduation,
                      subject: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Passout Year
              </label>
              <input
                type="text"
                value={education.postGraduation.passoutYear}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    postGraduation: {
                      ...education.postGraduation,
                      passoutYear: e.target.value,
                    },
                  })
                }
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
                onChange={(e) =>
                  setEducation({
                    ...education,
                    postGraduation: {
                      ...education.postGraduation,
                      percentage: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

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
          <span className="font-semibold text-slate-800">
            Diploma / Additional Qualification
          </span>
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
                    diploma: {
                      ...education.diploma,
                      instituteName: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Qualification Type
              </label>
              <input
                type="text"
                value={education.diploma.qualificationType}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    diploma: {
                      ...education.diploma,
                      qualificationType: e.target.value,
                    },
                  })
                }
                placeholder="Diploma/Certificate"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year of Completion
              </label>
              <input
                type="text"
                value={education.diploma.year}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    diploma: { ...education.diploma, year: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={education.experience.hasExperience}
            onChange={(e) =>
              setEducation({
                ...education,
                experience: {
                  ...education.experience,
                  hasExperience: e.target.checked,
                },
              })
            }
            className="w-4 h-4 text-primary rounded"
          />
          <span className="font-semibold text-slate-800">
            Post-Qualification Experience
          </span>
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
                    experience: {
                      ...education.experience,
                      organization: e.target.value,
                    },
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
                    experience: {
                      ...education.experience,
                      designation: e.target.value,
                    },
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
                    experience: {
                      ...education.experience,
                      dateOfJoining: e.target.value,
                    },
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
                  <input
                    type="text"
                    value={education.experience.durationYears}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        experience: {
                          ...education.experience,
                          durationYears: e.target.value,
                        },
                      })
                    }
                    placeholder="Years"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Months
                  </label>
                  <input
                    type="text"
                    value={education.experience.durationMonths}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        experience: {
                          ...education.experience,
                          durationMonths: e.target.value,
                        },
                      })
                    }
                    placeholder="Months"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={education.contractualService.hasContractualService}
            onChange={(e) =>
              setEducation({
                ...education,
                contractualService: {
                  ...education.contractualService,
                  hasContractualService: e.target.checked,
                },
              })
            }
            className="w-4 h-4 text-primary rounded"
          />
          <span className="font-semibold text-slate-800">
            Contractual Service at SDTL Namkum
          </span>
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years
                  </label>
                  <input
                    type="text"
                    value={education.contractualService.durationYears}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        contractualService: {
                          ...education.contractualService,
                          durationYears: e.target.value,
                        },
                      })
                    }
                    placeholder="Years"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Months
                  </label>
                  <input
                    type="text"
                    value={education.contractualService.durationMonths}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        contractualService: {
                          ...education.contractualService,
                          durationMonths: e.target.value,
                        },
                      })
                    }
                    placeholder="Months"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPostPreference = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main Content - Left Side */}
    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
          Post Preference Selection
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Based on your educational qualifications, we have identified the following posts for which you are eligible. Please rank them in order of priority.
        </p>
      </div>

      {/* Vacancy Stream Selection */}
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

      {/* Ranking Eligible Posts */}
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

        <p className="text-xs text-slate-500 mb-4 italic">Enter priority number manually (1 = highest priority)</p>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-slate-400 w-4">{post.id}</span>
                <GripVertical size={18} className="text-slate-400 cursor-grab" />
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
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={postPreference.postRankings[post.id]}
                  onChange={(e) => handlePostRankingChange(post.id, parseInt(e.target.value))}
                  className="w-12 h-12 border border-slate-300 rounded-lg text-center font-bold text-primary focus:border-primary outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

    {/* Sidebar - Right Side */}
    <aside className="space-y-6">
      {/* SELECTION RULES */}
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

      {/* NEED HELP BOX */}
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
                <label
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
        label: "PwD Certificate",
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
              <span className="text-slate-500">DOB:</span>
              <span className="font-semibold">{personalInfo.dob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mobile:</span>
              <span className="font-semibold">{personalInfo.mobileNumber}</span>
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
        <a href="#" className="font-bold text-primary">
          Go to Dashboard →
        </a>
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
              <button
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Send className="w-4 h-4" /> Submit Application
              </button>
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
