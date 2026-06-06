// import React, { useState, useEffect } from "react";
// import {
//   FileText,
//   CheckCircle,
//   User,
//   GraduationCap,
//   MapPin,
//   FileCheck,
//   Shield,
//   Calendar,
//   FileSignature,
//   ChevronRight,
//   ChevronLeft,
//   Send,
//   Award,
//   BookOpen,
//   CreditCard,
//   Receipt,
//   AlertCircle,
//   ExternalLink,
//   Info,
//   HelpCircle,
//   Bell,
//   Edit3,
//   CheckSquare,
//   Globe,
//   Sliders,
//   Languages,
//   KeyRound,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // API Base URL
// const API_BASE_URL = "https://7q7gdq1rke.execute-api.ap-south-1.amazonaws.com/api/v1";

// // Helper function to get auth headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("accessToken");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // API Service functions
// const apiService = {
//   getSubjects: () => axios.get(`${API_BASE_URL}/subjects`),
//   getCategories: () => axios.get(`${API_BASE_URL}/categories`),
//   getCountries: () => axios.get(`${API_BASE_URL}/countries`),
//   getStatesByCountry: (countryId: number) => axios.get(`${API_BASE_URL}/countries/${countryId}/states`),
//   getDistrictsByState: (stateId: number) => axios.get(`${API_BASE_URL}/states/${stateId}/districts`),
//   saveStep1: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-1`, data, getAuthHeaders()),
//   saveStep2: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-2`, data, getAuthHeaders()),
//   saveStep3: (data: any) => axios.patch(`${API_BASE_URL}/auth/candidate/step-3`, data, getAuthHeaders()),
// };

// interface SearchableDropdownProps {
//   options: string[];
//   value: string;
//   onChange: (value: string) => void;
//   placeholder: string;
//   required?: boolean;
//   disabled?: boolean;
//   className?: string;
// }

// interface PersonalInfo {
//   firstName: string;
//   lastName: string;
//   fathersName: string;
//   motherName: string;
//   dob: string;
//   gender: string;
//   age: number;
//   nationality: string;
//   aadharNumber: string;
//   mobileNumber: string;
//   identificationMark1: string;
//   identificationMark2: string;
//   alternateNumber: string;
//   emailId: string;
//   permanentAddress: {
//     street: string;
//     post: string;
//     district: string;
//     districtId?: number;
//     state: string;
//     stateId?: number;
//     pincode: string;
//     cityOrVillage: string;
//   };
//   correspondenceAddress: {
//     street: string;
//     post: string;
//     district: string;
//     districtId?: number;
//     state: string;
//     stateId?: number;
//     pincode: string;
//     cityOrVillage: string;
//   };
//   sameAsPermanent: boolean;
// }

// interface Education {
//   tenth: {
//     board: string;
//     rollNumber: string;
//     percentage: string;
//     yearOfPassing: string;
//     totalMarks: string;
//     marksObtained: string;
//     passingCertificateNo: string;
//   };
//   twelfth: {
//     board: string;
//     rollNumber: string;
//     percentage: string;
//     yearOfPassing: string;
//     passingCertificateNo: string;
//     totalMarks: string;
//     marksObtained: string;
//   };
//   graduation: {
//     graduationCourse: string;
//     university: string;
//     passoutYear: string;
//     percentage: string;
//     specialization: string;
//     passingCertificateNo: string;
//     totalMarks: string;
//     marksObtained: string;
//   };
//   postGraduation: {
//     hasPostGraduation: boolean;
//     university: string;
//     passoutYear: string;
//     percentage: string;
//     subject: string;
//     totalMarks: string;
//     marksObtained: string;
//     passingCertificateNo: string;
//   };
//   diploma: {
//     hasDiploma: boolean;
//     instituteName: string;
//     qualificationType: string;
//     year: string;
//     totalMarks: string;
//     marksObtained: string;
//     certificateNo: string;
//   };
//   experience: {
//     hasExperience: boolean;
//     durationMonths: string;
//     durationYears: string;
//     organization: string;
//     designation: string;
//     dateOfJoining: string;
//     relievingDate: string;
//     experienceLetterNo: string;
//   };
//   contractualService: {
//     hasContractualService: boolean;
//     durationYears: string;
//     durationMonths: string;
//     organization: string;
//     contractId: string;
//   };
// }

// interface PostPreference {
//   vacancyStream: string;
//   postRankings: { [key: number]: number };
// }

// interface LanguageSelection {
//   paperOneLanguage: string;
//   paperTwoLanguage: string;
//   paperThreeLanguage: string;
// }

// interface ReservationCategory {
//   mainCategory: string;
//   mainCategoryId?: number;
//   subCategory: string;
//   subCategoryId?: number;
//   isPwd: string;
//   pwdType: string;
//   pwdPercentage: string;
//   pwdCertificate: File | null;
//   isExServiceman: string;
//   exServicemanYears: string;
//   exServicemanDischargeBook: File | null;
//   isSportsQuota: string;
//   sportsLevel: string;
//   sportsAchievement: string;
//   sportsCertificate: File | null;
//   isJharkhandDomicile: string;
//   domicileCertificate: File | null;
//   declaration: boolean;
// }

// interface FeePayment {
//   applicationFee: string;
//   paymentMode: string;
//   transactionId: string;
//   paymentDate: string;
//   bankName: string;
//   paymentStatus: "pending" | "completed" | "failed";
// }

// interface Documents {
//   tenthMarksheet: File | null;
//   twelfthMarksheet: File | null;
//   graduationMarksheet: File | null;
//   postGraduationCertificate: File | null;
//   diplomaCertificate: File | null;
//   experienceCertificate: File | null;
//   contractualServiceCertificate: File | null;
//   ewsCertificate: File | null;
//   aadharCard: File | null;
//   signature: File | null;
//   photo: File | null;
//   domicileCertificate: File | null;
//   castCertificate: File | null;
//   sportsCertificate: File | null;
//   pwdCertificate: File | null;
// }

// interface ApplicationStatus {
//   isSubmitted: boolean;
//   registrationNumber: string;
//   submissionDate: string;
// }

// interface Post {
//   postId: number;
//   postUserId: number;
//   catId: number;
//   eduId: number;
//   postTitle: string;
//   postSlug: string;
//   postContent: string;
//   postPublish: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Subject {
//   subId: number;
//   subUserId: number;
//   subName: string;
//   subPublish: number;
// }

// interface Category {
//   catId: number;
//   catUserId: number;
//   catName: string;
//   catParentId: number | null;
//   catPublish: number;
//   subCategories: SubCategory[];
// }

// interface SubCategory {
//   catId: number;
//   catUserId: number;
//   catName: string;
//   catParentId: number | null;
//   catPublish: number;
// }

// interface Country {
//   countryId: number;
//   countryName: string;
//   countryCode: string;
//   isActive: boolean;
// }

// interface State {
//   stateId: number;
//   countryId: number;
//   stateName: string;
//   stateCode: string;
//   isActive: boolean;
// }

// interface District {
//   districtId: number;
//   stateId: number;
//   districtName: string;
//   isActive: boolean;
// }

// import { toast } from "react-toastify";

// const MyApplications: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [mobileOtpSent, setMobileOtpSent] = useState(false);
//   const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [emailOtpVerified, setEmailOtpVerified] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>({
//     isSubmitted: false,
//     registrationNumber: "",
//     submissionDate: "",
//   });
//   const [applicationId, setApplicationId] = useState<string | null>(null);
//   const [dynamicPosts, setDynamicPosts] = useState<Post[]>([]);
//   const [savingStep, setSavingStep] = useState(false);

//   // API Data States
//   const [subjectsList, setSubjectsList] = useState<string[]>([]);
//   const [categoriesList, setCategoriesList] = useState<Category[]>([]);
//   const [countriesList, setCountriesList] = useState<Country[]>([]);
//   const [statesList, setStatesList] = useState<State[]>([]);
//   const [permanentDistricts, setPermanentDistricts] = useState<District[]>([]);
//   const [correspondenceDistricts, setCorrespondenceDistricts] = useState<District[]>([]);
//   const [loading, setLoading] = useState(true);

//   const boards = [
//     "CBSE", "ICSE", "NIOS", "IB", "IGCSE", "Andhra Pradesh Board",
//     "Assam Board", "Bihar Board", "Chhattisgarh Board", "Goa Board",
//     "Gujarat Board", "Haryana Board", "Himachal Pradesh Board", "Jharkhand Board",
//     "Karnataka Board", "Kerala Board", "Madhya Pradesh Board", "Maharashtra Board",
//     "Manipur Board", "Meghalaya Board", "Mizoram Board", "Nagaland Board",
//     "Odisha Board", "Punjab Board", "Rajasthan Board", "Sikkim Board",
//     "Tamil Nadu Board", "Telangana Board", "Tripura Board", "UP Board",
//     "Uttarakhand Board", "West Bengal Board", "Jammu & Kashmir Board",
//     "Open School Board", "State Open School",
//   ];

//   const graduationCourseNames = [
//     "BSc", "BSc (Hons)", "BPharma", "B.A.M.S (Ayurveda)", "BFSc",
//     "BTech Dairy Technology", "BSc Dairy Science", "BA", "BCom",
//   ];

//   const subjects = [
//     "Entomology", "Zoology", "Botany", "Mathematics", "Physics", "Chemistry",
//     "Statistics", "Geology", "Economics", "Commerce", "Dairy Technology",
//     "Dairy Science", "Fisheries Science", "Pharmacy", "Pharmaceutical Chemistry",
//     "Ayurveda", "Pharmaceutics"
//   ];

//   const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
//     options,
//     value,
//     onChange,
//     placeholder,
//     required = false,
//     disabled = false,
//     className = "",
//   }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");

//     const filteredOptions = options.filter(option =>
//       option.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSelect = (option: string) => {
//       onChange(option);
//       setSearchTerm("");
//       setIsOpen(false);
//     };

//     return (
//       <div className={`relative ${className}`}>
//         <div
//           onClick={() => !disabled && setIsOpen(!isOpen)}
//           className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary cursor-pointer flex justify-between items-center ${disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"}`}
//         >
//           <span className={!value ? "text-slate-400" : "text-slate-700"}>
//             {value || placeholder}
//           </span>
//           <svg
//             className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
        
//         {isOpen && !disabled && (
//           <>
//             <div
//               className="fixed inset-0 z-10"
//               onClick={() => setIsOpen(false)}
//             />
//             <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
//               <div className="p-2 border-b border-slate-200">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               </div>
//               <div className="overflow-y-auto max-h-48">
//                 {filteredOptions.length > 0 ? (
//                   filteredOptions.map((option) => (
//                     <div
//                       key={option}
//                       onClick={() => handleSelect(option)}
//                       className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm text-slate-700"
//                     >
//                       {option}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="px-4 py-2 text-sm text-slate-500 text-center">
//                     No options found
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//         {required && !value && !disabled && (
//           <p className="text-xs text-red-500 mt-1">This field is required</p>
//         )}
//       </div>
//     );
//   };

//   const generateYears = () => {
//     const years = [];
//     for (let i = 2026; i >= 1970; i--) {
//       years.push(i.toString());
//     }
//     return years;
//   };

//   const passingYears = generateYears();
//   const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
//   const yearsRange = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

//   const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
//     firstName: "",
//     lastName: "",
//     fathersName: "",
//     motherName: "",
//     dob: "",
//     age: 0,
//     gender: "",
//     identificationMark1: "",
//     identificationMark2: "",
//     nationality: "Indian",
//     mobileNumber: "",
//     alternateNumber: "",
//     emailId: "",
//     aadharNumber: "",
//     permanentAddress: {
//       street: "",
//       post: "",
//       district: "",
//       districtId: undefined,
//       state: "",
//       stateId: undefined,
//       pincode: "",
//       cityOrVillage: "",
//     },
//     correspondenceAddress: {
//       street: "",
//       post: "",
//       district: "",
//       districtId: undefined,
//       state: "",
//       stateId: undefined,
//       pincode: "",
//       cityOrVillage: "",
//     },
//     sameAsPermanent: false,
//   });

//   const [highestQualification, setHighestQualification] = useState("graduation");

//   const [education, setEducation] = useState<Education>({
//     tenth: {
//       board: "",
//       rollNumber: "",
//       percentage: "",
//       yearOfPassing: "",
//       totalMarks: "",
//       marksObtained: "",
//       passingCertificateNo: "",
//     },
//     twelfth: {
//       board: "",
//       rollNumber: "",
//       percentage: "",
//       yearOfPassing: "",
//       passingCertificateNo: "",
//       totalMarks: "",
//       marksObtained: "",
//     },
//     graduation: {
//       graduationCourse: "",
//       university: "",
//       passoutYear: "",
//       percentage: "",
//       specialization: "",
//       passingCertificateNo: "",
//       totalMarks: "",
//       marksObtained: "",
//     },
//     postGraduation: {
//       hasPostGraduation: false,
//       university: "",
//       passoutYear: "",
//       percentage: "",
//       subject: "",
//       totalMarks: "",
//       marksObtained: "",
//       passingCertificateNo: "",
//     },
//     diploma: {
//       hasDiploma: false,
//       instituteName: "",
//       qualificationType: "",
//       year: "",
//       totalMarks: "",
//       marksObtained: "",
//       certificateNo: "",
//     },
//     experience: {
//       hasExperience: false,
//       durationMonths: "",
//       durationYears: "",
//       organization: "",
//       designation: "",
//       dateOfJoining: "",
//       relievingDate: "",
//       experienceLetterNo: "",
//     },
//     contractualService: {
//       hasContractualService: false,
//       durationYears: "",
//       durationMonths: "",
//       organization: "SDTL Namkum",
//       contractId: "",
//     },
//   });

//   const [postPreference, setPostPreference] = useState<PostPreference>({
//     vacancyStream: "both",
//     postRankings: {},
//   });

//   const [languageSelection, setLanguageSelection] = useState<LanguageSelection>({
//     paperOneLanguage: "",
//     paperTwoLanguage: "",
//     paperThreeLanguage: "",
//   });

//   const [reservationCategory, setReservationCategory] = useState<ReservationCategory>({
//     mainCategory: "",
//     mainCategoryId: undefined,
//     subCategory: "",
//     subCategoryId: undefined,
//     isPwd: "no",
//     pwdType: "",
//     pwdPercentage: "",
//     pwdCertificate: null,
//     isExServiceman: "no",
//     exServicemanYears: "",
//     exServicemanDischargeBook: null,
//     isSportsQuota: "no",
//     sportsLevel: "",
//     sportsAchievement: "",
//     sportsCertificate: null,
//     isJharkhandDomicile: "yes",
//     domicileCertificate: null,
//     declaration: false,
//   });

//   const [feePayment, setFeePayment] = useState<FeePayment>({
//     applicationFee: "100",
//     paymentMode: "",
//     transactionId: "",
//     paymentDate: "",
//     bankName: "",
//     paymentStatus: "pending",
//   });

//   const [documents, setDocuments] = useState<Documents>({
//     tenthMarksheet: null,
//     twelfthMarksheet: null,
//     graduationMarksheet: null,
//     postGraduationCertificate: null,
//     diplomaCertificate: null,
//     experienceCertificate: null,
//     contractualServiceCertificate: null,
//     ewsCertificate: null,
//     aadharCard: null,
//     signature: null,
//     photo: null,
//     domicileCertificate: null,
//     castCertificate: null,
//     sportsCertificate: null,
//     pwdCertificate: null,
//   });

//   const steps = [
//     { id: 0, title: "Personal Info", icon: User },
//     { id: 1, title: "Reservation & Category", icon: Shield },
//     { id: 2, title: "Education Details", icon: GraduationCap },
//     { id: 3, title: "Post Preferences", icon: Sliders },
//     { id: 4, title: "Language Selection", icon: Languages },
//     { id: 5, title: "Documents Upload", icon: FileCheck },
//     { id: 6, title: "Fee Payment", icon: CreditCard },
//     { id: 7, title: "Review & Submit", icon: FileSignature },
//   ];

//   // Input validation helper
//   const validateNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     const key = e.key;
//     if (!/^\d+$/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
//       e.preventDefault();
//     }
//   };

//   const validateTextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     const key = e.key;
//     if (/^\d+$/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
//       e.preventDefault();
//     }
//   };

//   // Fetch all API data on component mount
//   useEffect(() => {
//     const fetchApiData = async () => {
//       setLoading(true);
//       try {
//         const subjectsResponse = await apiService.getSubjects();
//         if (subjectsResponse.data.success) {
//           const subjects = subjectsResponse.data.data.map((sub: Subject) => sub.subName);
//           setSubjectsList(subjects);
//         }

//         const categoriesResponse = await apiService.getCategories();
//         if (categoriesResponse.data.success) {
//           setCategoriesList(categoriesResponse.data.data);
//         }

//         const countriesResponse = await apiService.getCountries();
//         if (countriesResponse.data.success) {
//           setCountriesList(countriesResponse.data.data);
//           if (countriesResponse.data.data.length > 0) {
//             const india = countriesResponse.data.data.find((c: Country) => c.countryId === 1);
//             if (india) {
//               const statesResponse = await apiService.getStatesByCountry(1);
//               if (statesResponse.data.success) {
//                 setStatesList(statesResponse.data.data);
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching API data:", error);
//         toast.error("Failed to load form data. Please refresh the page.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApiData();
//   }, []);

//   // Fetch districts when permanent state changes
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       if (personalInfo.permanentAddress.stateId) {
//         try {
//           const response = await apiService.getDistrictsByState(personalInfo.permanentAddress.stateId);
//           if (response.data.success) {
//             setPermanentDistricts(response.data.data);
//           }
//         } catch (error) {
//           console.error("Error fetching districts:", error);
//         }
//       } else {
//         setPermanentDistricts([]);
//       }
//     };
//     fetchDistricts();
//   }, []);

//   // Fetch districts when correspondence state changes
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       if (personalInfo.correspondenceAddress.stateId && !personalInfo.sameAsPermanent) {
//         try {
//           const response = await apiService.getDistrictsByState(personalInfo.correspondenceAddress.stateId);
//           if (response.data.success) {
//             setCorrespondenceDistricts(response.data.data);
//           }
//         } catch (error) {
//           console.error("Error fetching districts:", error);
//         }
//       } else {
//         setCorrespondenceDistricts([]);
//       }
//     };
//     fetchDistricts();
//   }, [personalInfo.correspondenceAddress.stateId, personalInfo.sameAsPermanent]);

//   const calculateAge = (dob: string): number => {
//     if (!dob) return 0;
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const dob = e.target.value;
//     const age = calculateAge(dob);
//     setPersonalInfo({ ...personalInfo, dob, age });
//   };

//   const handlePermanentStateChange = (stateId: number, stateName: string) => {
//     setPersonalInfo({
//       ...personalInfo,
//       permanentAddress: {
//         ...personalInfo.permanentAddress,
//         state: stateName,
//         stateId: stateId,
//         district: "",
//         districtId: undefined,
//       },
//     });
//   };

//   const handlePermanentDistrictChange = (districtId: number, districtName: string) => {
//     setPersonalInfo({
//       ...personalInfo,
//       permanentAddress: {
//         ...personalInfo.permanentAddress,
//         district: districtName,
//         districtId: districtId,
//       },
//     });
//   };

//   const handleCorrespondenceStateChange = (stateId: number, stateName: string) => {
//     setPersonalInfo({
//       ...personalInfo,
//       correspondenceAddress: {
//         ...personalInfo.correspondenceAddress,
//         state: stateName,
//         stateId: stateId,
//         district: "",
//         districtId: undefined,
//       },
//     });
//   };

//   const handleCorrespondenceDistrictChange = (districtId: number, districtName: string) => {
//     setPersonalInfo({
//       ...personalInfo,
//       correspondenceAddress: {
//         ...personalInfo.correspondenceAddress,
//         district: districtName,
//         districtId: districtId,
//       },
//     });
//   };

//   const handleFileUpload = (field: keyof Documents, file: File | null) => {
//     setDocuments({ ...documents, [field]: file });
//   };

//   const sendMobileOtp = () => {
//     if (personalInfo.mobileNumber.length === 10) {
//       setMobileOtpSent(true);
//       toast.info(`OTP sent to ${personalInfo.mobileNumber}`);
//     } else {
//       toast.error("Please enter a valid 10-digit mobile number");
//     }
//   };

//   const verifyMobileOtp = () => {
//     setMobileOtpVerified(true);
//     toast.success("Mobile number verified successfully!");
//   };

//   const sendEmailOtp = () => {
//     if (personalInfo.emailId.includes("@")) {
//       setEmailOtpSent(true);
//       toast.info(`OTP sent to ${personalInfo.emailId}`);
//     } else {
//       toast.error("Please enter a valid email address");
//     }
//   };

//   const verifyEmailOtp = () => {
//     setEmailOtpVerified(true);
//     toast.success("Email verified successfully!");
//   };

//   const calculateTotalFee = () => {
//     let fee = 100;
//     if (
//       reservationCategory.mainCategory === "sc" ||
//       reservationCategory.mainCategory === "st"
//     ) {
//       fee = 50;
//     }
//     if (reservationCategory.isPwd === "yes") {
//       fee = 0;
//     }
//     return fee;
//   };

//   // Save Step 1 API call
//   // const saveStep1 = async () => {
//   //   setSavingStep(true);
//   //   const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
    
//   //   const payload = {
//   //     personalInfo: {
//   //       fullName: fullName,
//   //       fathersName: personalInfo.fathersName,
//   //       motherName: personalInfo.motherName,
//   //       dob: personalInfo.dob,
//   //       age: personalInfo.age,
//   //       gender: personalInfo.gender,
//   //       nationality: personalInfo.nationality,
//   //       aadharNumber: personalInfo.aadharNumber,
//   //       identificationMark1: personalInfo.identificationMark1,
//   //       identificationMark2: personalInfo.identificationMark2,
//   //       mobileNumber: personalInfo.mobileNumber,
//   //       alternateNumber: personalInfo.alternateNumber,
//   //       emailId: personalInfo.emailId,
//   //       permanentAddress: {
//   //         street: personalInfo.permanentAddress.street,
//   //         post: personalInfo.permanentAddress.post,
//   //         state: personalInfo.permanentAddress.state,
//   //         district: personalInfo.permanentAddress.district,
//   //         pincode: personalInfo.permanentAddress.pincode,
//   //         cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
//   //       },
//   //       sameAsPermanent: personalInfo.sameAsPermanent,
//   //       correspondenceAddress: !personalInfo.sameAsPermanent ? {
//   //         street: personalInfo.correspondenceAddress.street,
//   //         post: personalInfo.correspondenceAddress.post,
//   //         state: personalInfo.correspondenceAddress.state,
//   //         district: personalInfo.correspondenceAddress.district,
//   //         pincode: personalInfo.correspondenceAddress.pincode,
//   //         cityOrVillage: personalInfo.correspondenceAddress.cityOrVillage,
//   //       } : undefined,
//   //     },
//   //   };

//   //   try {
//   //     const response = await apiService.saveStep1(payload);
//   //     if (response.data.success) {
//   //       setApplicationId(response.data.data.applicationId);
//   //       toast.success(response.data.message);
//   //       setCurrentStep(currentStep + 1);
//   //     }
//   //   } catch (error: any) {
//   //     console.error("Error saving step 1:", error);
//   //     toast.error(error.response?.data?.message || "Failed to save personal information");
//   //   } finally {
//   //     setSavingStep(false);
//   //   }
//   // };

//   const saveStep1 = async () => {
//   setSavingStep(true);

//   const fullName =
//     `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

//   const payload = {
//     personalInfo: {
//       fullName,
//       fathersName: personalInfo.fathersName,
//       motherName: personalInfo.motherName,
//       dob: personalInfo.dob,
//       age: Number(personalInfo.age),
//       gender: personalInfo.gender,
//       nationality: personalInfo.nationality,
//       aadharNumber: personalInfo.aadharNumber,
//       identificationMark1: personalInfo.identificationMark1,
//       identificationMark2: personalInfo.identificationMark2,
//       mobileNumber: personalInfo.mobileNumber,
//       alternateNumber: personalInfo.alternateNumber,
//       emailId: personalInfo.emailId,

//       permanentAddress: {
//         street: personalInfo.permanentAddress.street,
//         post: personalInfo.permanentAddress.post,
//         state: personalInfo.permanentAddress.state,
//         district: personalInfo.permanentAddress.district,
//         pincode: personalInfo.permanentAddress.pincode,
//         cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
//       },

//       sameAsPermanent: personalInfo.sameAsPermanent,

//       correspondenceAddress: personalInfo.sameAsPermanent
//         ? {
//             street: personalInfo.permanentAddress.street,
//             post: personalInfo.permanentAddress.post,
//             state: personalInfo.permanentAddress.state,
//             district: personalInfo.permanentAddress.district,
//             pincode: personalInfo.permanentAddress.pincode,
//             cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
//           }
//         : {
//             street: personalInfo.correspondenceAddress.street,
//             post: personalInfo.correspondenceAddress.post,
//             state: personalInfo.correspondenceAddress.state,
//             district: personalInfo.correspondenceAddress.district,
//             pincode: personalInfo.correspondenceAddress.pincode,
//             cityOrVillage: personalInfo.correspondenceAddress.cityOrVillage,
//           },
//     },
//   };

//   try {
//     const response = await apiService.saveStep1(payload);

//     if (response.data.success) {
//       setApplicationId(response.data.data.applicationId);
//       toast.success(response.data.message);
//       setCurrentStep(currentStep + 1);
//     }
//   } catch (error: any) {
//     console.error("Error saving step 1:", error);
//     toast.error(
//       error.response?.data?.message ||
//       "Failed to save personal information"
//     );
//   } finally {
//     setSavingStep(false);
//   }
// };

//   // Save Step 2 API call
//   const saveStep2 = async () => {
//     setSavingStep(true);
    
//     // Find category ID based on selected main category
//     const selectedCategory = categoriesList.find(
//       cat => cat.catName.toLowerCase().replace(/\s+/g, '_') === reservationCategory.mainCategory ||
//              cat.catName.toLowerCase() === reservationCategory.mainCategory
//     );
    
//     // Find subcategory ID if applicable
//     let subCategoryId = 0;
//     if (reservationCategory.subCategory && selectedCategory?.subCategories) {
//       const selectedSubCategory = selectedCategory.subCategories.find(
//         sub => sub.catName.toLowerCase().replace(/\s+/g, '_') === reservationCategory.subCategory
//       );
//       if (selectedSubCategory) {
//         subCategoryId = selectedSubCategory.catId;
//       }
//     }

//     const payload = {
//       reservationCategory: {
//         mainCategory: selectedCategory?.catId || 0,
//         subCategory: subCategoryId,
//         isPwd: reservationCategory.isPwd,
//         pwdType: reservationCategory.pwdType,
//         pwdPercentage: reservationCategory.pwdPercentage,
//         isExServiceman: reservationCategory.isExServiceman,
//         exServicemanYears: reservationCategory.exServicemanYears,
//         isSportsQuota: reservationCategory.isSportsQuota,
//         sportsLevel: reservationCategory.sportsLevel,
//         sportsAchievement: reservationCategory.sportsAchievement,
//         isJharkhandDomicile: reservationCategory.isJharkhandDomicile,
//         declaration: reservationCategory.declaration,
//       },
//     };

//     try {
//       const response = await apiService.saveStep2(payload);
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setCurrentStep(currentStep + 1);
//       }
//     } catch (error: any) {
//       console.error("Error saving step 2:", error);
//       toast.error(error.response?.data?.message || "Failed to save reservation details");
//     } finally {
//       setSavingStep(false);
//     }
//   };

//   // Save Step 3 API call
//   const saveStep3 = async () => {
//     setSavingStep(true);
    
//     const payload = {
//       highestQualification: highestQualification,
//       tenth: {
//         board: education.tenth.board,
//         rollNumber: education.tenth.rollNumber,
//         percentage: education.tenth.percentage,
//         yearOfPassing: education.tenth.yearOfPassing,
//         totalMarks: education.tenth.totalMarks,
//         marksObtained: education.tenth.marksObtained,
//         passingCertificateNo: education.tenth.passingCertificateNo,
//       },
//       twelfth: {
//         board: education.twelfth.board,
//         rollNumber: education.twelfth.rollNumber,
//         percentage: education.twelfth.percentage,
//         yearOfPassing: education.twelfth.yearOfPassing,
//         totalMarks: education.twelfth.totalMarks,
//         marksObtained: education.twelfth.marksObtained,
//         passingCertificateNo: education.twelfth.passingCertificateNo,
//       },
//       graduation: {
//         graduationCourse: education.graduation.graduationCourse,
//         university: education.graduation.university,
//         passoutYear: education.graduation.passoutYear,
//         percentage: education.graduation.percentage,
//         specialization: education.graduation.specialization,
//         totalMarks: education.graduation.totalMarks,
//         marksObtained: education.graduation.marksObtained,
//         passingCertificateNo: education.graduation.passingCertificateNo,
//       },
//       postGraduation: {
//         hasPostGraduation: education.postGraduation.hasPostGraduation,
//         university: education.postGraduation.university,
//         passoutYear: education.postGraduation.passoutYear,
//         percentage: education.postGraduation.percentage,
//         subject: education.postGraduation.subject,
//         totalMarks: education.postGraduation.totalMarks,
//         marksObtained: education.postGraduation.marksObtained,
//         passingCertificateNo: education.postGraduation.passingCertificateNo,
//       },
//       diploma: {
//         hasDiploma: education.diploma.hasDiploma,
//         instituteName: education.diploma.instituteName,
//         qualificationType: education.diploma.qualificationType,
//         year: education.diploma.year,
//         totalMarks: education.diploma.totalMarks,
//         marksObtained: education.diploma.marksObtained,
//         certificateNo: education.diploma.certificateNo,
//       },
//       experience: {
//         hasExperience: education.experience.hasExperience,
//         durationMonths: education.experience.durationMonths,
//         durationYears: education.experience.durationYears,
//         organization: education.experience.organization,
//         designation: education.experience.designation,
//         dateOfJoining: education.experience.dateOfJoining,
//         relievingDate: education.experience.relievingDate,
//         experienceLetterNo: education.experience.experienceLetterNo,
//       },
//       contractualService: {
//         hasContractualService: education.contractualService.hasContractualService,
//         durationYears: education.contractualService.durationYears,
//         durationMonths: education.contractualService.durationMonths,
//         organization: education.contractualService.organization,
//         contractId: education.contractualService.contractId,
//       },
//     };

//     try {
//       const response = await apiService.saveStep3(payload);
//       if (response.data.success) {
//         toast.success(response.data.message);
//         // Set dynamic posts from response
//         if (response.data.posts && response.data.posts.length > 0) {
//           setDynamicPosts(response.data.posts);
//           // Initialize post rankings for dynamic posts
//           const initialRankings: { [key: number]: number } = {};
//           response.data.posts.forEach((post: Post) => {
//             initialRankings[post.postId] = 0;
//           });
//           setPostPreference(prev => ({
//             ...prev,
//             postRankings: initialRankings,
//           }));
//         }
//         setCurrentStep(currentStep + 1);
//       }
//     } catch (error: any) {
//       console.error("Error saving step 3:", error);
//       toast.error(error.response?.data?.message || "Failed to save education details");
//     } finally {
//       setSavingStep(false);
//     }
//   };

//   const handleNext = () => {
//     if (currentStep === 0) {
//       saveStep1();
//     } else if (currentStep === 1) {
//       saveStep2();
//     } else if (currentStep === 2) {
//       saveStep3();
//     } else {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleFinalSubmit = () => {
//     const formData = {
//       personalInfo,
//       education,
//       postPreference,
//       languageSelection,
//       reservationCategory,
//       feePayment,
//       documents,
//     };
//     toast.success("Application Submit successfully");
//     console.log("Form Submitted:", formData);
//     setApplicationStatus({
//       isSubmitted: true,
//       registrationNumber: "2026-JH-8842-109",
//       submissionDate: new Date().toLocaleDateString(),
//     });
//     setIsSubmitted(true);
//   };

//   const handleSaveDraft = () => {
//     toast.success("Application form saved successfully");
//   };

//   const navigate = useNavigate();

//   const getCategoryOptions = () => {
//     const mainCategories = categoriesList
//       .filter(cat => cat.catParentId === null)
//       .map(cat => ({ value: cat.catName.toLowerCase().replace(/\s+/g, '_'), label: cat.catName, id: cat.catId }));
    
//     if (mainCategories.length === 0) {
//       return [
//         { value: "unreserved", label: "Unreserved (UR)", id: 0 },
//         { value: "bc1", label: "BC-I", id: 0 },
//         { value: "bc2", label: "BC-II", id: 0 },
//         { value: "sc", label: "Scheduled Caste (SC)", id: 0 },
//         { value: "st", label: "Scheduled Tribe (ST)", id: 0 },
//         { value: "ews", label: "EWS", id: 0 },
//       ];
//     }
//     return mainCategories;
//   };

//   const getStSubCategories = () => {
//     const stCategory = categoriesList.find(cat => cat.catName === "Scheduled Tribe (ST)");
//     if (stCategory && stCategory.subCategories) {
//       return stCategory.subCategories.map(sub => ({ 
//         value: sub.catName.toLowerCase().replace(/\s+/g, '_'), 
//         label: sub.catName,
//         id: sub.catId 
//       }));
//     }
//     return [
//       { value: "primitive", label: "Primitive Tribe (Adim Janjati)", id: 0 },
//       { value: "other", label: "Other ST", id: 0 },
//     ];
//   };

//   const getStateOptions = () => {
//     return statesList.map(state => ({ id: state.stateId, name: state.stateName }));
//   };

//   const getPermanentDistrictOptions = () => {
//     return permanentDistricts.map(district => ({ id: district.districtId, name: district.districtName }));
//   };

//   const getCorrespondenceDistrictOptions = () => {
//     return correspondenceDistricts.map(district => ({ id: district.districtId, name: district.districtName }));
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//             <p className="text-slate-600">Loading application form...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const renderStep = () => {
//     if (isSubmitted) return renderRegistrationSuccess();
//     switch (currentStep) {
//       case 0:
//         return renderPersonalInfo();
//       case 1:
//         return renderReservationCategory();
//       case 2:
//         return renderEducationDetails();
//       case 3:
//         return renderPostPreference();
//       case 4:
//         return renderLanguageSelection();
//       case 5:
//         return renderDocuments();
//       case 6:
//         return renderFeePayment();
//       case 7:
//         return renderApplicationReview();
//       default:
//         return null;
//     }
//   };

//   const renderPersonalInfo = () => (
//     <div className="space-y-8">
//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <User className="w-5 h-5 text-primary" />
//             Basic Information
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Full Name (as per Matriculation Certificate)<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.firstName}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
//                 setPersonalInfo({ ...personalInfo, firstName: value });
//               }}
//               onKeyDown={validateTextInput}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//           </div>
          
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Last Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.lastName}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
//                 setPersonalInfo({ ...personalInfo, lastName: value });
//               }}
//               onKeyDown={validateTextInput}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Father's Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.fathersName}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
//                 setPersonalInfo({ ...personalInfo, fathersName: value });
//               }}
//               onKeyDown={validateTextInput}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Mother's Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.motherName}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
//                 setPersonalInfo({ ...personalInfo, motherName: value });
//               }}
//               onKeyDown={validateTextInput}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Date of Birth <span className="text-red-600">*</span>
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={personalInfo.dob}
//                 onChange={handleDateOfBirthChange}
//                 className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {personalInfo.age > 0 && (
//                 <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
//                   <Calendar size={16} />
//                   <span className="text-sm font-medium">Age: {personalInfo.age} years</span>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Gender<span className="text-red-600">*</span>
//             </label>
//             <select
//               value={personalInfo.gender}
//               onChange={(e) =>
//                 setPersonalInfo({ ...personalInfo, gender: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Nationality <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={personalInfo.nationality}
//               onChange={(e) =>
//                 setPersonalInfo({ ...personalInfo, nationality: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             >
//               {countriesList.map((country) => (
//                 <option key={country.countryId} value={country.countryName}>
//                   {country.countryName}
//                 </option>
//               ))}
//               {countriesList.length === 0 && (
//                 <option value="Indian">Indian</option>
//               )}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Aadhar Card Number (Preferred)
//             </label>
//             <input
//               type="text"
//               maxLength={12}
//               value={personalInfo.aadharNumber}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setPersonalInfo({ ...personalInfo, aadharNumber: value });
//               }}
//               onKeyDown={validateNumberInput}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <FileCheck className="w-5 h-5 text-primary" />
//             Identification Details
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Identification Mark 1 <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.identificationMark1}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   identificationMark1: e.target.value,
//                 })
//               }
//               placeholder="e.g., Mole on left cheek"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//             <p className="text-xs text-slate-500 mt-1">
//               Mention any visible identification mark (mandatory)
//             </p>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Identification Mark 2 <span className="text-slate-400 text-xs ml-1">(Optional)</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.identificationMark2}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   identificationMark2: e.target.value,
//                 })
//               }
//               placeholder="e.g., Scar on right hand"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//             <p className="text-xs text-slate-500 mt-1">
//               Additional identification mark (if any)
//             </p>
//           </div>
//         </div>
//         <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//           <p className="text-xs text-blue-800 flex items-center gap-2">
//             <Info className="w-4 h-4" />
//             These identification marks will be verified during the examination and document verification process.
//           </p>
//         </div>
//       </div>

//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <KeyRound className="w-5 h-5 text-primary" />
//             Contact Details & Verification
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Mobile Number <span className="text-red-600">*</span>
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="tel"
//                 maxLength={10}
//                 value={personalInfo.mobileNumber}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, '');
//                   setPersonalInfo({ ...personalInfo, mobileNumber: value });
//                 }}
//                 onKeyDown={validateNumberInput}
//                 placeholder="9876543210"
//                 className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {!mobileOtpVerified ? (
//                 <button
//                   onClick={sendMobileOtp}
//                   disabled={mobileOtpSent}
//                   className="px-4 py-2 bg-primary text-white rounded-lg text-sm whitespace-nowrap disabled:opacity-50"
//                 >
//                   {mobileOtpSent ? "OTP Sent" : "Send OTP"}
//                 </button>
//               ) : (
//                 <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm flex items-center gap-1">
//                   <CheckCircle size={16} /> Verified
//                 </span>
//               )}
//             </div>
//             {mobileOtpSent && !mobileOtpVerified && (
//               <div className="flex gap-2 mt-2">
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
//                 />
//                 <button
//                   onClick={verifyMobileOtp}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
//                 >
//                   Verify
//                 </button>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Alternate Mobile Number
//             </label>
//             <input
//               type="tel"
//               maxLength={10}
//               value={personalInfo.alternateNumber}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setPersonalInfo({ ...personalInfo, alternateNumber: value });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="Optional"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Email ID <span className="text-red-600">*</span>
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 value={personalInfo.emailId}
//                 onChange={(e) =>
//                   setPersonalInfo({ ...personalInfo, emailId: e.target.value })
//                 }
//                 placeholder="example@domain.com"
//                 className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {!emailOtpVerified ? (
//                 <button
//                   onClick={sendEmailOtp}
//                   disabled={emailOtpSent}
//                   className="px-4 py-2 bg-primary text-white rounded-lg text-sm whitespace-nowrap disabled:opacity-50"
//                 >
//                   {emailOtpSent ? "OTP Sent" : "Send OTP"}
//                 </button>
//               ) : (
//                 <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm flex items-center gap-1">
//                   <CheckCircle size={16} /> Verified
//                 </span>
//               )}
//             </div>
//             {emailOtpSent && !emailOtpVerified && (
//               <div className="flex gap-2 mt-2">
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
//                 />
//                 <button
//                   onClick={verifyEmailOtp}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
//                 >
//                   Verify
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <MapPin className="w-5 h-5 text-primary" />
//             Permanent Address
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               House No./Street <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.permanentAddress.street}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   permanentAddress: {
//                     ...personalInfo.permanentAddress,
//                     street: e.target.value,
//                   },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Post Office <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.permanentAddress.post}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   permanentAddress: {
//                     ...personalInfo.permanentAddress,
//                     post: e.target.value,
//                   },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               State <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={personalInfo.permanentAddress.stateId || ""}
//               onChange={(e) => {
//                 const selectedState = statesList.find(s => s.stateId === Number(e.target.value));
//                 if (selectedState) {
//                   handlePermanentStateChange(selectedState.stateId, selectedState.stateName);
//                 }
//               }}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
//             >
//               <option value="">Select State</option>
//               {getStateOptions().map((state) => (
//                 <option key={state.id} value={state.id}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               District <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={personalInfo.permanentAddress.districtId || ""}
//               onChange={(e) => {
//                 const selectedDistrict = permanentDistricts.find(d => d.districtId === Number(e.target.value));
//                 if (selectedDistrict) {
//                   handlePermanentDistrictChange(selectedDistrict.districtId, selectedDistrict.districtName);
//                 }
//               }}
//               disabled={!personalInfo.permanentAddress.stateId}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
//             >
//               <option value="">Select District</option>
//               {getPermanentDistrictOptions().map((district) => (
//                 <option key={district.id} value={district.id}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Pincode <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               maxLength={6}
//               value={personalInfo.permanentAddress.pincode}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setPersonalInfo({
//                   ...personalInfo,
//                   permanentAddress: {
//                     ...personalInfo.permanentAddress,
//                     pincode: value,
//                   },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Village/City/Town <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.permanentAddress.cityOrVillage}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   permanentAddress: {
//                     ...personalInfo.permanentAddress,
//                     cityOrVillage: e.target.value,
//                   },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <MapPin className="w-5 h-5 text-primary" />
//             Correspondence Address
//           </h3>
//         </div>
//         <div className="flex items-center gap-3 mb-4">
//           <input
//             type="checkbox"
//             id="sameAsPermanent"
//             checked={personalInfo.sameAsPermanent}
//             onChange={(e) => {
//               const isChecked = e.target.checked;
//               if (isChecked) {
//                 setPersonalInfo({
//                   ...personalInfo,
//                   sameAsPermanent: true,
//                   correspondenceAddress: {
//                     street: personalInfo.permanentAddress.street,
//                     post: personalInfo.permanentAddress.post,
//                     district: personalInfo.permanentAddress.district,
//                     districtId: personalInfo.permanentAddress.districtId,
//                     state: personalInfo.permanentAddress.state,
//                     stateId: personalInfo.permanentAddress.stateId,
//                     pincode: personalInfo.permanentAddress.pincode,
//                     cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
//                   },
//                 });
//                 if (personalInfo.permanentAddress.stateId) {
//                   const fetchCopiedDistricts = async () => {
//                     try {
//                       const response = await apiService.getDistrictsByState(personalInfo.permanentAddress.stateId!);
//                       if (response.data.success) {
//                         setCorrespondenceDistricts(response.data.data);
//                       }
//                     } catch (error) {
//                       console.error("Error fetching districts for copied address:", error);
//                     }
//                   };
//                   fetchCopiedDistricts();
//                 }
//               } else {
//                 setPersonalInfo({
//                   ...personalInfo,
//                   sameAsPermanent: false,
//                 });
//               }
//             }}
//             className="w-4 h-4 text-primary rounded"
//           />
//           <label
//             htmlFor="sameAsPermanent"
//             className="text-slate-700 font-medium cursor-pointer"
//           >
//             Same as Permanent Address
//           </label>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               House No./Street <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.correspondenceAddress.street}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   correspondenceAddress: {
//                     ...personalInfo.correspondenceAddress,
//                     street: e.target.value,
//                   },
//                 })
//               }
//               disabled={personalInfo.sameAsPermanent}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Post Office <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.correspondenceAddress.post}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   correspondenceAddress: {
//                     ...personalInfo.correspondenceAddress,
//                     post: e.target.value,
//                   },
//                 })
//               }
//               disabled={personalInfo.sameAsPermanent}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               State <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={personalInfo.correspondenceAddress.stateId || ""}
//               onChange={(e) => {
//                 const selectedState = statesList.find(s => s.stateId === Number(e.target.value));
//                 if (selectedState) {
//                   handleCorrespondenceStateChange(selectedState.stateId, selectedState.stateName);
//                 }
//               }}
//               disabled={personalInfo.sameAsPermanent}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
//             >
//               <option value="">Select State</option>
//               {getStateOptions().map((state) => (
//                 <option key={state.id} value={state.id}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               District <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={personalInfo.correspondenceAddress.districtId || ""}
//               onChange={(e) => {
//                 const selectedDistrict = correspondenceDistricts.find(d => d.districtId === Number(e.target.value));
//                 if (selectedDistrict) {
//                   handleCorrespondenceDistrictChange(selectedDistrict.districtId, selectedDistrict.districtName);
//                 }
//               }}
//               disabled={personalInfo.sameAsPermanent || !personalInfo.correspondenceAddress.stateId}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
//             >
//               <option value="">Select District</option>
//               {getCorrespondenceDistrictOptions().map((district) => (
//                 <option key={district.id} value={district.id}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Pincode <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               maxLength={6}
//               value={personalInfo.correspondenceAddress.pincode}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setPersonalInfo({
//                   ...personalInfo,
//                   correspondenceAddress: {
//                     ...personalInfo.correspondenceAddress,
//                     pincode: value,
//                   },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               disabled={personalInfo.sameAsPermanent}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Village/City/Town <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={personalInfo.correspondenceAddress.cityOrVillage}
//               onChange={(e) =>
//                 setPersonalInfo({
//                   ...personalInfo,
//                   correspondenceAddress: {
//                     ...personalInfo.correspondenceAddress,
//                     cityOrVillage: e.target.value,
//                   },
//                 })
//               }
//               disabled={personalInfo.sameAsPermanent}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderReservationCategory = () => {
//     const categoryOptions = getCategoryOptions();
//     const stSubCategories = getStSubCategories();

//     return (
//       <div className="space-y-6">
//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//           <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
//             Category Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-800 mb-2">
//                 Reservation Category <span className="text-red-600">*</span>
//               </label>
//               <select
//                 value={reservationCategory.mainCategory}
//                 onChange={(e) => {
//                   const selected = categoryOptions.find(cat => cat.value === e.target.value);
//                   setReservationCategory({
//                     ...reservationCategory,
//                     mainCategory: e.target.value,
//                     mainCategoryId: selected?.id,
//                     subCategory: "",
//                     subCategoryId: undefined,
//                   });
//                   const fee = e.target.value === "sc" || e.target.value === "st" ? "50" : "100";
//                   setFeePayment({ ...feePayment, applicationFee: fee });
//                 }}
//                 className="w-full h-12 border border-slate-300 rounded-lg px-4"
//               >
//                 <option value="">Select Category</option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat.value} value={cat.value}>
//                     {cat.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {(reservationCategory.mainCategory === "st" || reservationCategory.mainCategory === "scheduled_tribe_(st)") && (
//               <div>
//                 <label className="block text-sm font-semibold text-slate-800 mb-2">
//                   Sub-Category (Primitive Tribe)
//                 </label>
//                 <select
//                   value={reservationCategory.subCategory}
//                   onChange={(e) => {
//                     const selected = stSubCategories.find(sub => sub.value === e.target.value);
//                     setReservationCategory({
//                       ...reservationCategory,
//                       subCategory: e.target.value,
//                       subCategoryId: selected?.id,
//                     });
//                   }}
//                   className="w-full h-12 border border-slate-300 rounded-lg px-4"
//                 >
//                   <option value="">Select Sub-Category</option>
//                   {stSubCategories.map((sub) => (
//                     <option key={sub.value} value={sub.value}>
//                       {sub.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-semibold text-slate-800 mb-2">
//                 Jharkhand Domicile Claim <span className="text-red-600">*</span>
//               </label>
//               <select
//                 value={reservationCategory.isJharkhandDomicile}
//                 onChange={(e) =>
//                   setReservationCategory({
//                     ...reservationCategory,
//                     isJharkhandDomicile: e.target.value,
//                   })
//                 }
//                 className="w-full h-12 border border-slate-300 rounded-lg px-4"
//               >
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//               <p className="text-xs text-slate-500 mt-1">
//                 Mandatory for all applicants
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//           <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
//             Physical Handicap (PwD) Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-800 mb-2">
//                 Physically Handicapped? 
//               </label>
//               <div className="flex gap-6">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="pwd"
//                     value="yes"
//                     checked={reservationCategory.isPwd === "yes"}
//                     onChange={(e) => {
//                       setReservationCategory({
//                         ...reservationCategory,
//                         isPwd: e.target.value,
//                       });
//                       if (e.target.value === "yes") {
//                         setFeePayment({ ...feePayment, applicationFee: "0" });
//                       } else {
//                         const fee = reservationCategory.mainCategory === "sc" || reservationCategory.mainCategory === "st" ? "50" : "100";
//                         setFeePayment({ ...feePayment, applicationFee: fee });
//                       }
//                     }}
//                     className="w-4 h-4 text-primary"
//                   />
//                   Yes
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="pwd"
//                     value="no"
//                     checked={reservationCategory.isPwd === "no"}
//                     onChange={(e) => {
//                       setReservationCategory({
//                         ...reservationCategory,
//                         isPwd: e.target.value,
//                       });
//                       const fee = reservationCategory.mainCategory === "sc" || reservationCategory.mainCategory === "st" ? "50" : "100";
//                       setFeePayment({ ...feePayment, applicationFee: fee });
//                     }}
//                     className="w-4 h-4 text-primary"
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             {reservationCategory.isPwd === "yes" && (
//               <>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-800 mb-2">
//                     Type of Disability 
//                   </label>
//                   <select
//                     value={reservationCategory.pwdType}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         pwdType: e.target.value,
//                       })
//                     }
//                     className="w-full h-12 border border-slate-300 rounded-lg px-4"
//                   >
//                     <option value="">Select Type</option>
//                     <option value="visual">Visual Impairment (VI)</option>
//                     <option value="deaf">Deaf/Dumb (DD)</option>
//                     <option value="physical">
//                       Physical Challenges/Locomotive Disability (PCEP)
//                     </option>
//                     <option value="autism">Autism</option>
//                     <option value="intellectual">Intellectual Disability</option>
//                     <option value="learning">Learning Disability</option>
//                     <option value="mental">Mental Disability</option>
//                     <option value="multiple">
//                       Multiple Disabilities (AILMD)
//                     </option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-800 mb-2">
//                     Disability Percentage (%) 
//                   </label>
//                   <input
//                     type="text"
//                     value={reservationCategory.pwdPercentage}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '');
//                       setReservationCategory({
//                         ...reservationCategory,
//                         pwdPercentage: value,
//                       });
//                     }}
//                     onKeyDown={validateNumberInput}
//                     maxLength={2}
//                     placeholder="Should be ≥ 40% to claim benefit"
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//           <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
//             Ex-Serviceman Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-800 mb-2">
//                 Ex-Serviceman? 
//               </label>
//               <div className="flex gap-6">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="exService"
//                     value="yes"
//                     checked={reservationCategory.isExServiceman === "yes"}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         isExServiceman: e.target.value,
//                       })
//                     }
//                     className="w-4 h-4 text-primary"
//                   />
//                   Yes
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="exService"
//                     value="no"
//                     checked={reservationCategory.isExServiceman === "no"}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         isExServiceman: e.target.value,
//                       })
//                     }
//                     className="w-4 h-4 text-primary"
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             {reservationCategory.isExServiceman === "yes" && (
//               <div>
//                 <label className="block text-sm font-semibold text-slate-800 mb-2">
//                   Years of Service
//                 </label>
//                 <input
//                   type="text"
//                   value={reservationCategory.exServicemanYears}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, '');
//                     setReservationCategory({
//                       ...reservationCategory,
//                       exServicemanYears: value,
//                     });
//                   }}
//                   onKeyDown={validateNumberInput}
//                   placeholder="Enter years of service"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//           <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200 pb-3 mb-5">
//             Sports Quota Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-800 mb-2">
//                 Claim Sports Quota? *
//               </label>
//               <div className="flex gap-6">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="sports"
//                     value="yes"
//                     checked={reservationCategory.isSportsQuota === "yes"}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         isSportsQuota: e.target.value,
//                       })
//                     }
//                     className="w-4 h-4 text-primary"
//                   />
//                   Yes
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="sports"
//                     value="no"
//                     checked={reservationCategory.isSportsQuota === "no"}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         isSportsQuota: e.target.value,
//                       })
//                     }
//                     className="w-4 h-4 text-primary"
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             {reservationCategory.isSportsQuota === "yes" && (
//               <>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-800 mb-2">
//                     Sports Level *
//                   </label>
//                   <select
//                     value={reservationCategory.sportsLevel}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         sportsLevel: e.target.value,
//                       })
//                     }
//                     className="w-full h-12 border border-slate-300 rounded-lg px-4"
//                   >
//                     <option value="">Select Level</option>
//                     <option value="international">International</option>
//                     <option value="national">National</option>
//                     <option value="state">State</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-800 mb-2">
//                     Achievement Details
//                   </label>
//                   <textarea
//                     value={reservationCategory.sportsAchievement}
//                     onChange={(e) =>
//                       setReservationCategory({
//                         ...reservationCategory,
//                         sportsAchievement: e.target.value,
//                       })
//                     }
//                     rows={2}
//                     placeholder="Describe your achievements..."
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                   ></textarea>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
//           <label className="flex items-start gap-4 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={reservationCategory.declaration}
//               onChange={(e) =>
//                 setReservationCategory({
//                   ...reservationCategory,
//                   declaration: e.target.checked,
//                 })
//               }
//               className="mt-1 w-5 h-5 border-slate-300 rounded text-primary shrink-0"
//             />
//             <span className="text-sm font-medium text-slate-700 leading-6">
//               I hereby declare that I am a local resident/permanent resident of
//               the State of Jharkhand. I understand that failure to produce a valid
//               Jharkhand Domicile Certificate during document verification will
//               lead to the cancellation of my reservation benefits.{" "}
//               <span className="text-red-500 font-bold">*</span>
//             </span>
//           </label>
//         </div>
//       </div>
//     );
//   };

//   const renderEducationDetails = () => (
//     <div className="space-y-8">
//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <GraduationCap className="w-5 h-5 text-primary" />
//             Highest Qualification
//           </h3>
//         </div>
//         <div className="mt-1">
//           <label className="block text-slate-700 text-sm font-medium mb-2">
//             Select your highest educational qualification <span className="text-red-600">*</span>
//           </label>
//           <SearchableDropdown
//             options={["graduation", "postGraduation", "diploma", "phd", "others"]}
//             value={highestQualification}
//             onChange={setHighestQualification}
//             placeholder="Select Qualification"
//             required
//             className="w-full md:w-1/2"
//           />
//         </div>
//       </div>
      
//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <Award className="w-5 h-5 text-primary" />
//             10th / SSC Education
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Board Name <span className="text-red-600">*</span>
//             </label>
//             <SearchableDropdown
//               options={boards}
//               value={education.tenth.board}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, board: value },
//                 })
//               }
//               placeholder="Select Board"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Roll Number <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.tenth.rollNumber}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, rollNumber: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Total Marks <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.tenth.totalMarks}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, totalMarks: value },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="e.g., 500"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Marks Obtained <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.tenth.marksObtained}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, marksObtained: value },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="e.g., 450"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Percentage (%) / CGPA <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.tenth.percentage}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9.]/g, '');
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, percentage: value },
//                 });
//               }}
//               placeholder="e.g., 82.5"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Passing Year <span className="text-red-600">*</span>
//             </label>
//             <SearchableDropdown
//               options={passingYears}
//               value={education.tenth.yearOfPassing}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, yearOfPassing: value },
//                 })
//               }
//               placeholder="Select Year"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Passing Certificate No. <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.tenth.passingCertificateNo}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   tenth: { ...education.tenth, passingCertificateNo: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <BookOpen className="w-5 h-5 text-primary" />
//             12th / HSC Education
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Board Name
//             </label>
//             <SearchableDropdown
//               options={boards}
//               value={education.twelfth.board}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, board: value },
//                 })
//               }
//               placeholder="Select Board"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Roll Number
//             </label>
//             <input
//               type="text"
//               value={education.twelfth.rollNumber}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, rollNumber: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Total Marks
//             </label>
//             <input
//               type="text"
//               value={education.twelfth.totalMarks}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, totalMarks: value },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="e.g., 500"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Marks Obtained
//             </label>
//             <input
//               type="text"
//               value={education.twelfth.marksObtained}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, marksObtained: value },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="e.g., 450"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Percentage (%)
//             </label>
//             <input
//               type="text"
//               value={education.twelfth.percentage}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9.]/g, '');
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, percentage: value },
//                 });
//               }}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Passing Year
//             </label>
//             <SearchableDropdown
//               options={passingYears}
//               value={education.twelfth.yearOfPassing}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, yearOfPassing: value },
//                 })
//               }
//               placeholder="Select Year"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Passing Certificate No.
//             </label>
//             <input
//               type="text"
//               value={education.twelfth.passingCertificateNo}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   twelfth: { ...education.twelfth, passingCertificateNo: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <GraduationCap className="w-5 h-5 text-primary" />
//             Graduation Education
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Course Name <span className="text-red-600">*</span>
//             </label>
//             <SearchableDropdown
//               options={graduationCourseNames}
//               value={education.graduation.graduationCourse}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, graduationCourse: value },
//                 })
//               }
//               placeholder="Select Course"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               University Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.graduation.university}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, university: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Passout Year <span className="text-red-600">*</span>
//             </label>
//             <SearchableDropdown
//               options={passingYears}
//               value={education.graduation.passoutYear}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, passoutYear: value },
//                 })
//               }
//               placeholder="Select Year"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Total Marks <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.graduation.totalMarks}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, totalMarks: value },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="e.g., 3000"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Marks Obtained <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.graduation.marksObtained}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, '');
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, marksObtained: value },
//                 });
//               }}
//               onKeyDown={validateNumberInput}
//               placeholder="e.g., 2400"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Percentage/CGPA <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.graduation.percentage}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9.]/g, '');
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, percentage: value },
//                 });
//               }}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Specialization/Subject <span className="text-red-600">*</span>
//             </label>
//             <SearchableDropdown
//               options={subjectsList.length > 0 ? subjectsList : subjects}
//               value={education.graduation.specialization}
//               onChange={(value) =>
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, specialization: value },
//                 })
//               }
//               placeholder="Select Subject"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Passing Certificate No. <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               value={education.graduation.passingCertificateNo}
//               onChange={(e) =>
//                 setEducation({
//                   ...education,
//                   graduation: { ...education.graduation, passingCertificateNo: e.target.value },
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//         <label className="flex items-center gap-3 cursor-pointer mb-4">
//           <input
//             type="checkbox"
//             checked={education.postGraduation.hasPostGraduation}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 postGraduation: { ...education.postGraduation, hasPostGraduation: e.target.checked },
//               })
//             }
//             className="w-4 h-4 text-primary rounded"
//           />
//           <span className="font-semibold text-slate-800">Post-Graduation Qualification</span>
//         </label>
//         {education.postGraduation.hasPostGraduation && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 University/College Name
//               </label>
//               <input
//                 type="text"
//                 value={education.postGraduation.university}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, university: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Subject
//               </label>
//               <SearchableDropdown
//                 options={subjectsList.length > 0 ? subjectsList : subjects}
//                 value={education.postGraduation.subject}
//                 onChange={(value) =>
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, subject: value },
//                   })
//                 }
//                 placeholder="Select Subject"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Total Marks
//               </label>
//               <input
//                 type="text"
//                 value={education.postGraduation.totalMarks}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, '');
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, totalMarks: value },
//                   });
//                 }}
//                 onKeyDown={validateNumberInput}
//                 placeholder="e.g., 2000"
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Marks Obtained
//               </label>
//               <input
//                 type="text"
//                 value={education.postGraduation.marksObtained}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, '');
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, marksObtained: value },
//                   });
//                 }}
//                 onKeyDown={validateNumberInput}
//                 placeholder="e.g., 1600"
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Passout Year
//               </label>
//               <SearchableDropdown
//                 options={passingYears}
//                 value={education.postGraduation.passoutYear}
//                 onChange={(value) =>
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, passoutYear: value },
//                   })
//                 }
//                 placeholder="Select Year"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Percentage
//               </label>
//               <input
//                 type="text"
//                 value={education.postGraduation.percentage}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/[^0-9.]/g, '');
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, percentage: value },
//                   });
//                 }}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Passing Certificate No.
//               </label>
//               <input
//                 type="text"
//                 value={education.postGraduation.passingCertificateNo}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     postGraduation: { ...education.postGraduation, passingCertificateNo: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//         <label className="flex items-center gap-3 cursor-pointer mb-4">
//           <input
//             type="checkbox"
//             checked={education.diploma.hasDiploma}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 diploma: { ...education.diploma, hasDiploma: e.target.checked },
//               })
//             }
//             className="w-4 h-4 text-primary rounded"
//           />
//           <span className="font-semibold text-slate-800">Diploma / Additional Qualification</span>
//         </label>
//         {education.diploma.hasDiploma && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Institute Name
//               </label>
//               <input
//                 type="text"
//                 value={education.diploma.instituteName}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     diploma: { ...education.diploma, instituteName: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//                 placeholder="e.g., Govt Polytechnic, Ranchi"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Qualification Type
//               </label>
//               <SearchableDropdown
//                 options={["Diploma", "Advanced Diploma", "Post Graduate Diploma", "Certificate Course", "Vocational Course", "PG Diploma"]}
//                 value={education.diploma.qualificationType}
//                 onChange={(value) =>
//                   setEducation({
//                     ...education,
//                     diploma: { ...education.diploma, qualificationType: value },
//                   })
//                 }
//                 placeholder="Select Qualification Type"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Total Marks
//               </label>
//               <input
//                 type="text"
//                 value={education.diploma.totalMarks}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, '');
//                   setEducation({
//                     ...education,
//                     diploma: { ...education.diploma, totalMarks: value },
//                   });
//                 }}
//                 onKeyDown={validateNumberInput}
//                 placeholder="e.g., 1000"
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Marks Obtained
//               </label>
//               <input
//                 type="text"
//                 value={education.diploma.marksObtained}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, '');
//                   setEducation({
//                     ...education,
//                     diploma: { ...education.diploma, marksObtained: value },
//                   });
//                 }}
//                 onKeyDown={validateNumberInput}
//                 placeholder="e.g., 850"
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Year of Completion
//               </label>
//               <SearchableDropdown
//                 options={passingYears}
//                 value={education.diploma.year}
//                 onChange={(value) =>
//                   setEducation({
//                     ...education,
//                     diploma: { ...education.diploma, year: value },
//                   })
//                 }
//                 placeholder="Select Year"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Certificate No.
//               </label>
//               <input
//                 type="text"
//                 value={education.diploma.certificateNo}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     diploma: { ...education.diploma, certificateNo: e.target.value },
//                   })
//                 }
//                 placeholder="Certificate/Diploma Number"
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//         <label className="flex items-center gap-3 cursor-pointer mb-4">
//           <input
//             type="checkbox"
//             checked={education.experience.hasExperience}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 experience: { ...education.experience, hasExperience: e.target.checked },
//               })
//             }
//             className="w-4 h-4 text-primary rounded"
//           />
//           <span className="font-semibold text-slate-800">Post-Qualification Experience</span>
//         </label>
//         {education.experience.hasExperience && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Organization Name
//               </label>
//               <input
//                 type="text"
//                 value={education.experience.organization}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     experience: { ...education.experience, organization: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Designation
//               </label>
//               <input
//                 type="text"
//                 value={education.experience.designation}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     experience: { ...education.experience, designation: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Date of Joining
//               </label>
//               <input
//                 type="date"
//                 value={education.experience.dateOfJoining}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     experience: { ...education.experience, dateOfJoining: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Relieving Date
//               </label>
//               <input
//                 type="date"
//                 value={education.experience.relievingDate}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     experience: { ...education.experience, relievingDate: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Years
//                   </label>
//                   <SearchableDropdown
//                     options={yearsRange}
//                     value={education.experience.durationYears}
//                     onChange={(value) =>
//                       setEducation({
//                         ...education,
//                         experience: { ...education.experience, durationYears: value },
//                       })
//                     }
//                     placeholder="Select Years"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Months
//                   </label>
//                   <SearchableDropdown
//                     options={months}
//                     value={education.experience.durationMonths}
//                     onChange={(value) =>
//                       setEducation({
//                         ...education,
//                         experience: { ...education.experience, durationMonths: value },
//                       })
//                     }
//                     placeholder="Select Months"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Experience Letter No.
//               </label>
//               <input
//                 type="text"
//                 value={education.experience.experienceLetterNo}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     experience: { ...education.experience, experienceLetterNo: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//         <label className="flex items-center gap-3 cursor-pointer mb-4">
//           <input
//             type="checkbox"
//             checked={education.contractualService.hasContractualService}
//             onChange={(e) =>
//               setEducation({
//                 ...education,
//                 contractualService: { ...education.contractualService, hasContractualService: e.target.checked },
//               })
//             }
//             className="w-4 h-4 text-primary rounded"
//           />
//           <span className="font-semibold text-slate-800">Contractual Service at SDTL Namkum</span>
//         </label>
//         {education.contractualService.hasContractualService && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Organization
//               </label>
//               <input
//                 type="text"
//                 value={education.contractualService.organization}
//                 disabled
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Contract ID
//               </label>
//               <input
//                 type="text"
//                 value={education.contractualService.contractId}
//                 onChange={(e) =>
//                   setEducation({
//                     ...education,
//                     contractualService: { ...education.contractualService, contractId: e.target.value },
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Years
//                   </label>
//                   <SearchableDropdown
//                     options={yearsRange}
//                     value={education.contractualService.durationYears}
//                     onChange={(value) =>
//                       setEducation({
//                         ...education,
//                         contractualService: { ...education.contractualService, durationYears: value },
//                       })
//                     }
//                     placeholder="Select Years"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Months
//                   </label>
//                   <SearchableDropdown
//                     options={months}
//                     value={education.contractualService.durationMonths}
//                     onChange={(value) =>
//                       setEducation({
//                         ...education,
//                         contractualService: { ...education.contractualService, durationMonths: value },
//                       })
//                     }
//                     placeholder="Select Months"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderPostPreference = () => {
//     const getAvailablePriorities = (currentPostId: number) => {
//       const usedPriorities = Object.entries(postPreference.postRankings)
//         .filter(([id, priority]) => Number(id) !== currentPostId && priority !== 0)
//         .map(([, priority]) => priority);
      
//       const allPriorities = [1, 2, 3, 4, 5];
//       return allPriorities.filter(p => !usedPriorities.includes(p));
//     };

//     const handlePriorityChange = (postId: number, priority: number) => {
//       const isPriorityUsed = Object.entries(postPreference.postRankings)
//         .some(([id, p]) => Number(id) !== postId && p === priority);
      
//       if (isPriorityUsed && priority !== 0) {
//         toast.error(`Priority ${priority} is already selected for another post. Please choose a different priority.`);
//         return;
//       }
      
//       setPostPreference({
//         ...postPreference,
//         postRankings: { ...postPreference.postRankings, [postId]: priority },
//       });
//     };

//     const postsToShow = dynamicPosts.length > 0 ? dynamicPosts : [];
//     const postsAvailable = postsToShow.length;

//     return (
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//           <div className="mb-6">
//             <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
//               Post Preference Selection
//             </h3>
//             <p className="text-sm text-slate-500 mt-1">
//               Based on your educational qualifications, we have identified the following posts for which you are eligible. Please rank them in order of priority.
//             </p>
//           </div>

//           <section className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="h-6 w-1 bg-primary rounded-full"></div>
//               <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
//                 1. Vacancy Stream Selection
//               </h4>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold text-slate-800">Regular Vacancy</h3>
//                   <input
//                     type="radio"
//                     name="vacancy_stream"
//                     value="regular"
//                     checked={postPreference.vacancyStream === "regular"}
//                     onChange={(e) =>
//                       setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                     }
//                     className="w-4 h-4 accent-primary"
//                   />
//                 </div>
//                 <p className="text-xs text-slate-500 mt-2">Standard recruitment cycle for fresh posts.</p>
//               </label>

//               <label className="border border-slate-300 bg-white rounded-lg p-4 cursor-pointer hover:border-primary transition-all">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold text-slate-800">Backlog Vacancy</h3>
//                   <input
//                     type="radio"
//                     name="vacancy_stream"
//                     value="backlog"
//                     checked={postPreference.vacancyStream === "backlog"}
//                     onChange={(e) =>
//                       setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                     }
//                     className="w-4 h-4 accent-primary"
//                   />
//                 </div>
//                 <p className="text-xs text-slate-500 mt-2">Unfilled posts from previous recruitment years.</p>
//               </label>

//               <label className="border-2 border-primary bg-primary/5 rounded-lg p-4 cursor-pointer md:col-span-2 transition-all">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-primary">Both (Recommended)</h3>
//                   </div>
//                   <input
//                     type="radio"
//                     name="vacancy_stream"
//                     value="both"
//                     checked={postPreference.vacancyStream === "both"}
//                     onChange={(e) =>
//                       setPostPreference({ ...postPreference, vacancyStream: e.target.value })
//                     }
//                     className="w-4 h-4 accent-primary"
//                   />
//                 </div>
//                 <p className="text-xs text-primary/80 mt-2">Apply for all available opportunities across both streams.</p>
//               </label>
//             </div>
//           </section>

//           <section>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-6 w-1 bg-primary rounded-full"></div>
//                 <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
//                   2. Ranking Eligible Posts
//                 </h4>
//               </div>
//               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
//                 {postsAvailable} Posts Available
//               </span>
//             </div>

//             <p className="text-xs text-slate-500 mb-4 italic">Select priority number from dropdown (1 = highest priority). Each priority number can be used only once.</p>

//             {postsAvailable === 0 ? (
//               <div className="text-center py-8 bg-slate-50 rounded-lg">
//                 <p className="text-slate-500">No posts available based on your qualifications.</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {postsToShow.map((post, index) => {
//                   const currentPriority = postPreference.postRankings[post.postId] || 0;
//                   const availablePriorities = getAvailablePriorities(post.postId);
                  
//                   return (
//                     <div
//                       key={post.postId}
//                       className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex items-center gap-3 shrink-0">
//                         <span className="text-sm font-bold text-slate-400 w-2">{index + 1}</span>
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <h4 className="text-sm font-bold text-slate-800 truncate">{post.postTitle}</h4>
//                         <p className="text-xs text-slate-500 truncate mt-0.5">{post.postContent}</p>
//                       </div>

//                       <div className="shrink-0 ml-2">
//                         <select
//                           value={currentPriority}
//                           onChange={(e) => handlePriorityChange(post.postId, parseInt(e.target.value))}
//                           className="w-30 h-12 border border-slate-300 rounded-lg text-center font-bold text-primary focus:border-primary outline-none px-2"
//                         >
//                           <option value={0}>Select</option>
//                           {availablePriorities.map((priority) => (
//                             <option key={priority} value={priority}>
//                               Priority {priority}
//                             </option>
//                           ))}
//                           {currentPriority !== 0 && !availablePriorities.includes(currentPriority) && (
//                             <option value={currentPriority} disabled>
//                               Priority {currentPriority} (Taken)
//                             </option>
//                           )}
//                         </select>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
            
//             {postsAvailable > 0 && Object.values(postPreference.postRankings).some(p => p === 0) && (
//               <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//                 <p className="text-xs text-amber-800 flex items-center gap-2">
//                   <AlertCircle size={14} />
//                   Please assign priorities to all posts before proceeding.
//                 </p>
//               </div>
//             )}
//           </section>
//         </div>

//         <aside className="space-y-6">
//           <div className="bg-primary rounded-lg p-6 text-white shadow-lg">
//             <div className="flex items-center gap-2 mb-5">
//               <Info size={20} className="text-emerald-300" />
//               <h3 className="text-base font-bold uppercase tracking-wider">Selection Rules</h3>
//             </div>
//             <ul className="text-sm space-y-4 list-disc pl-5 opacity-90 leading-relaxed">
//               <li>Preferences once locked cannot be changed after the final submission of the form.</li>
//               <li>Ranking must be unique for each post (e.g., you cannot have two posts at Priority 1).</li>
//               <li>Allocations will be made strictly based on Merit and the Preferences provided here.</li>
//               <li>Check the physical and medical criteria for specific posts in the official brochure.</li>
//             </ul>
//           </div>

//           <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm text-center">
//             <div className="w-12 h-12 bg-emerald-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
//               <HelpCircle size={24} />
//             </div>
//             <h4 className="text-sm font-bold text-slate-800">Need Help?</h4>
//             <p className="text-xs text-slate-500 mt-2 mb-5 leading-normal">
//               Contact the recruitment helpdesk for clarification on post duties and eligibility.
//             </p>
//             <button className="w-full flex items-center justify-center gap-2 h-12 bg-transparent border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
//               <FileText size={16} />
//               Read Full Advertisement
//             </button>
//           </div>
//         </aside>
//       </div>
//     );
//   };

//   const renderLanguageSelection = () => {
//     const paperOneOptions = ["Hindi", "English"];
//     const paperTwoOptions = [
//       "Hindi Language & Literature",
//       "English Language & Literature",
//       "Sanskrit Language & Literature",
//       "Urdu Language & Literature",
//       "Bengali Language & Literature",
//       "Santhali Language & Literature",
//     ];
//     const paperThreeOptions = [
//       "General Studies",
//       "General Science",
//       "Mathematics",
//       "Physics",
//       "Chemistry",
//       "Zoology",
//       "Botany",
//       "Statistics",
//       "Economics",
//       "Commerce",
//       "Geology",
//       "Dairy Technology",
//       "Fisheries Science",
//       "Pharmacy",
//       "Pharmaceutical Chemistry",
//       "Ayurveda",
//     ];

//     return (
//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <Languages className="w-5 h-5 text-primary" />
//             Language Selection for Examination
//           </h3>
//         </div>
//         <div className="space-y-6 mt-4">
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Paper-I Language <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={languageSelection.paperOneLanguage}
//               onChange={(e) =>
//                 setLanguageSelection({
//                   ...languageSelection,
//                   paperOneLanguage: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             >
//               <option value="">Select Language</option>
//               {paperOneOptions.map((lang) => (
//                 <option key={lang} value={lang}>
//                   {lang}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Paper-II Language/Subject <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={languageSelection.paperTwoLanguage}
//               onChange={(e) =>
//                 setLanguageSelection({
//                   ...languageSelection,
//                   paperTwoLanguage: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             >
//               <option value="">Select Language</option>
//               {paperTwoOptions.map((lang) => (
//                 <option key={lang} value={lang}>
//                   {lang}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-slate-700 text-sm font-medium mb-2">
//               Paper-III Subject Selection <span className="text-red-600">*</span>
//             </label>
//             <select
//               value={languageSelection.paperThreeLanguage}
//               onChange={(e) =>
//                 setLanguageSelection({
//                   ...languageSelection,
//                   paperThreeLanguage: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg"
//             >
//               <option value="">Select Subject</option>
//               {paperThreeOptions.map((subject) => (
//                 <option key={subject} value={subject}>
//                   {subject}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderFeePayment = () => {
//     const totalFee = calculateTotalFee();
//     let applicableFeeText = "";
//     if (reservationCategory.isPwd === "yes") {
//       applicableFeeText = "PwD Candidates (Fee: ₹0)";
//     } else if (reservationCategory.mainCategory === "sc" || reservationCategory.mainCategory === "st") {
//       applicableFeeText = "SC / ST (Fee: ₹50)";
//     } else {
//       applicableFeeText = "UR / EWS / OBC-II / EBC-I (Fee: ₹100)";
//     }

//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-slate-800">
//                     Calculated Examination Fee
//                   </h3>
//                   <p className="text-sm text-slate-500">
//                     Based on your selected category and disability status.
//                   </p>
//                 </div>
//                 <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
//                   {feePayment.paymentStatus}
//                 </span>
//               </div>
//               <div className="my-6">
//                 <span className="text-4xl font-extrabold text-primary">
//                   ₹{totalFee}.00
//                 </span>
//                 <span className="text-sm text-slate-500 ml-2">
//                   (Rupees {totalFee} Only)
//                 </span>
//               </div>
//               <div className="bg-slate-50 rounded-lg grid grid-cols-2 gap-4 p-4">
//                 <div>
//                   <span className="block text-xs font-bold text-slate-500">
//                     Candidate Category
//                   </span>
//                   <span className="font-bold text-slate-800">
//                     {reservationCategory.mainCategory || "Not Selected"}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="block text-xs font-bold text-slate-500">
//                     PwD Status
//                   </span>
//                   <span className="font-bold text-slate-800">
//                     {reservationCategory.isPwd === "yes" ? "Yes" : "No"}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                 <p className="text-sm font-medium text-blue-800">
//                   Applicable Fee: <strong>{applicableFeeText}</strong>
//                 </p>
//                 <div className="mt-2 text-xs text-blue-700">
//                   <p>Fee Structure:</p>
//                   <ul className="list-disc pl-5 mt-1">
//                     <li>UR / EWS / OBC-II / EBC-I: ₹100</li>
//                     <li>SC / ST: ₹50</li>
//                     <li>PwD Candidates: ₹0</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//               <h4 className="text-xs font-bold text-primary uppercase mb-5">
//                 Choose Payment Method
//               </h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <label
//                   className={`border-2 rounded-lg p-5 flex flex-col items-center text-center cursor-pointer transition-all ${feePayment.paymentMode === "online" ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50"}`}
//                 >
//                   <input
//                     type="radio"
//                     name="payment_method"
//                     value="online"
//                     checked={feePayment.paymentMode === "online"}
//                     onChange={(e) =>
//                       setFeePayment({
//                         ...feePayment,
//                         paymentMode: e.target.value,
//                       })
//                     }
//                     className="sr-only"
//                   />
//                   <CreditCard size={28} className="text-primary mb-3" />
//                   <span className="text-sm font-bold text-primary">
//                     Pay Online
//                   </span>
//                   <span className="text-xs text-slate-500">
//                     Net Banking, Card, UPI
//                   </span>
//                 </label>
//               </div>
//             </div>
//             {feePayment.paymentMode && (
//               <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//                 <h4 className="text-sm font-bold text-slate-800 mb-4">
//                   Payment Information
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Bank Name *
//                     </label>
//                     <input
//                       type="text"
//                       value={feePayment.bankName}
//                       onChange={(e) =>
//                         setFeePayment({
//                           ...feePayment,
//                           bankName: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-2 border rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Transaction ID *
//                     </label>
//                     <input
//                       type="text"
//                       value={feePayment.transactionId}
//                       onChange={(e) =>
//                         setFeePayment({
//                           ...feePayment,
//                           transactionId: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-2 border rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Payment Date *
//                     </label>
//                     <input
//                       type="date"
//                       value={feePayment.paymentDate}
//                       onChange={(e) =>
//                         setFeePayment({
//                           ...feePayment,
//                           paymentDate: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-2 border rounded-lg"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="space-y-6">
//             <div className="bg-white border border-slate-200 rounded-2xl p-5">
//               <h4 className="text-xs font-bold text-slate-800 mb-3">
//                 Supported Gateways
//               </h4>
//               <div className="grid grid-cols-3 gap-2">
//                 {["SBI", "HDFC", "ICICI", "PAYTM"].map((g, i) => (
//                   <div
//                     key={i}
//                     className="h-10 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg flex items-center justify-center"
//                   >
//                     {g}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-slate-800 rounded-2xl p-5 text-white">
//               <div className="flex items-center gap-2 mb-4">
//                 <Info size={18} className="text-emerald-300" />
//                 <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
//                   Important Instructions
//                 </h4>
//               </div>
//               <ul className="text-xs space-y-3 list-disc pl-4 text-slate-300">
//                 <li>
//                   Wait for 24 hours after registration to initiate payment.
//                 </li>
//                 <li>Do not refresh the page during transaction.</li>
//                 <li>Keep Transaction ID for future correspondence.</li>
//               </ul>
//             </div>
//             <div className="bg-sky-50 rounded-2xl p-4 flex justify-between items-center">
//               <div className="flex gap-3">
//                 <div className="p-2 bg-primary text-white rounded-lg">
//                   <HelpCircle size={18} />
//                 </div>
//                 <div>
//                   <h5 className="text-sm font-bold text-primary">
//                     Payment Issues?
//                   </h5>
//                   <p className="text-xs text-primary/70">
//                     Support 10 AM - 6 PM
//                   </p>
//                 </div>
//               </div>
//               <button className="h-10 px-4 bg-white border border-sky-200 text-primary text-xs font-bold rounded-lg">
//                 Call Help Desk
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={() =>
//               setFeePayment({ ...feePayment, paymentStatus: "completed" })
//             }
//             className="h-14 px-12 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl flex items-center gap-2"
//           >
//             Proceed to Payment <ExternalLink size={16} />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderDocuments = () => {
//     const documentFields = [
//       { key: "photo", label: "Passport Size Photograph", required: true, type: "image", size: "20KB-50KB" },
//       { key: "signature", label: "Signature Scan", required: true, type: "image", size: "10KB-20KB" },
//       { key: "tenthMarksheet", label: "10th Marksheet", required: true, type: "pdf", size: "100KB-500KB" },
//       { key: "twelfthMarksheet", label: "12th Marksheet", required: true, type: "pdf", size: "100KB-500KB" },
//       { key: "graduationMarksheet", label: "Graduation Degree Certificate", required: true, type: "pdf", size: "Max 500KB" },
//       { key: "postGraduationCertificate", label: "Post-Graduation Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "diplomaCertificate", label: "Diploma Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "experienceCertificate", label: "Experience Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "contractualServiceCertificate", label: "Contractual Service Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "ewsCertificate", label: "EWS Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "domicileCertificate", label: "Domicile Certificate", required: true, type: "pdf", size: "Max 500KB" },
//       { key: "castCertificate", label: "Caste Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "pwdCertificate", label: "Disability Certificate", required: false, type: "pdf", size: "Max 500KB" },
//       { key: "sportsCertificate", label: "Sports Certificate", required: false, type: "pdf", size: "Max 500KB" },
//     ];

//     return (
//       <div className="relative border border-slate-200 rounded-2xl bg-white p-6 pt-8 shadow-sm">
//         <div className="absolute -top-4 left-5 bg-white px-3">
//           <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
//             <FileCheck className="w-5 h-5 text-primary" />
//             Upload Documents
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
//           {documentFields.map((field) => {
//             const uploadedFile = documents[field.key as keyof Documents];
//             return (
//               <div key={field.key}>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   {field.label}
//                   {field.required && <span className="text-red-500 ml-1">*</span>}
//                 </label>
//                 <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-primary transition-all">
//                   <input
//                     type="file"
//                     accept={field.type === "image" ? ".jpg,.jpeg,.png" : ".pdf"}
//                     onChange={(e) =>
//                       handleFileUpload(
//                         field.key as keyof Documents,
//                         e.target.files?.[0] || null,
//                       )
//                     }
//                     className="absolute inset-0 opacity-0 cursor-pointer z-10"
//                   />
//                   <div className="min-h-[100px] px-4 py-3 flex flex-col items-center justify-center text-center">
//                     {uploadedFile ? (
//                       <>
//                         <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
//                         <p className="text-xs font-medium text-green-700 truncate">
//                           {uploadedFile.name}
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <FileText className="w-8 h-8 text-slate-400 mb-2" />
//                         <p className="text-xs text-slate-500">
//                           Click to upload
//                         </p>
//                         <p className="text-xs text-slate-400">{field.size}</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="mt-6 p-4 bg-amber-50 rounded-xl">
//           <p className="text-xs text-amber-800">
//             <strong>Important:</strong> Ensure all documents are clear and
//             legible. Uploaded documents must be in prescribed format and size.
//           </p>
//         </div>
//       </div>
//     );
//   };

//   const renderApplicationReview = () => (
//     <div className="space-y-6">
//       <div className="bg-amber-50 border-l-4 border-primary p-4 rounded-lg flex items-start gap-3">
//         <AlertCircle size={18} className="text-primary shrink-0" />
//         <p className="text-sm font-medium text-slate-700">
//           Please review your application details carefully. Once submitted,
//           certain information cannot be modified.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white border border-slate-200 rounded-2xl p-5">
//           <div className="flex justify-between border-b pb-3 mb-4">
//             <div className="flex items-center gap-2 font-bold text-primary">
//               <User size={18} />
//               <h3>Personal Details</h3>
//             </div>
//             <button
//               onClick={() => setCurrentStep(0)}
//               className="text-xs font-bold text-primary hover:underline"
//             >
//               <Edit3 size={14} /> Edit
//             </button>
//           </div>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-slate-500">Full Name:</span>
//               <span className="font-semibold">
//                 {personalInfo.firstName} {personalInfo.lastName}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Father's Name:</span>
//               <span className="font-semibold">{personalInfo.fathersName}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Mother's Name:</span>
//               <span className="font-semibold">{personalInfo.motherName}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">DOB:</span>
//               <span className="font-semibold">{personalInfo.dob}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Mobile:</span>
//               <span className="font-semibold">{personalInfo.mobileNumber}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Alternate Mobile:</span>
//               <span className="font-semibold">{personalInfo.alternateNumber || "N/A"}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Email:</span>
//               <span className="font-semibold">{personalInfo.emailId}</span>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white border border-slate-200 rounded-2xl p-5">
//           <div className="flex justify-between border-b pb-3 mb-4">
//             <div className="flex items-center gap-2 font-bold text-primary">
//               <Globe size={18} />
//               <h3>Category & Quota</h3>
//             </div>
//             <button
//               onClick={() => setCurrentStep(1)}
//               className="text-xs font-bold text-primary hover:underline"
//             >
//               <Edit3 size={14} /> Edit
//             </button>
//           </div>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-slate-500">Category:</span>
//               <span className="font-semibold">
//                 {reservationCategory.mainCategory}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">PwD:</span>
//               <span className="font-semibold">
//                 {reservationCategory.isPwd === "yes" ? "Yes" : "No"}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Ex-Serviceman:</span>
//               <span className="font-semibold">
//                 {reservationCategory.isExServiceman === "yes" ? "Yes" : "No"}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-slate-500">Sports Quota:</span>
//               <span className="font-semibold">
//                 {reservationCategory.isSportsQuota === "yes" ? "Yes" : "No"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white border border-slate-200 rounded-2xl p-5">
//         <div className="flex justify-between border-b pb-3 mb-4">
//           <div className="flex items-center gap-2 font-bold text-primary">
//             <GraduationCap size={18} />
//             <h3>Educational Qualifications</h3>
//           </div>
//           <button
//             onClick={() => setCurrentStep(2)}
//             className="text-xs font-bold text-primary hover:underline"
//           >
//             <Edit3 size={14} /> Edit
//           </button>
//         </div>
//         <div className="space-y-3 text-sm">
//           <div>
//             <span className="text-slate-500">10th:</span>{" "}
//             {education.tenth.board} - {education.tenth.percentage}% (
//             {education.tenth.yearOfPassing})
//           </div>
//           <div>
//             <span className="text-slate-500">12th:</span>{" "}
//             {education.twelfth.board} - {education.twelfth.percentage}% (
//             {education.twelfth.yearOfPassing})
//           </div>
//           <div>
//             <span className="text-slate-500">Graduation:</span>{" "}
//             {education.graduation.university} -{" "}
//             {education.graduation.percentage}%
//           </div>
//           {education.postGraduation.hasPostGraduation && (
//             <div>
//               <span className="text-slate-500">Post-Graduation:</span>{" "}
//               {education.postGraduation.subject} -{" "}
//               {education.postGraduation.percentage}%
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="bg-white border border-slate-200 rounded-2xl p-5">
//         <div className="flex justify-between border-b pb-3 mb-4">
//           <div className="flex items-center gap-2 font-bold text-primary">
//             <Languages size={18} />
//             <h3>Language Selection</h3>
//           </div>
//           <button
//             onClick={() => setCurrentStep(4)}
//             className="text-xs font-bold text-primary hover:underline"
//           >
//             <Edit3 size={14} /> Edit
//           </button>
//         </div>
//         <div className="space-y-3 text-sm">
//           <div className="flex justify-between">
//             <span className="text-slate-500">Paper-I Language:</span>
//             <span className="font-semibold">
//               {languageSelection.paperOneLanguage || "Not Selected"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-500">Paper-II Language:</span>
//             <span className="font-semibold">
//               {languageSelection.paperTwoLanguage || "Not Selected"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-500">Paper-III Subject:</span>
//             <span className="font-semibold">
//               {languageSelection.paperThreeLanguage || "Not Selected"}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
//         <div className="flex items-center gap-2 text-primary font-bold mb-3">
//           <CheckSquare size={18} />
//           <h3>Declaration</h3>
//         </div>
//         <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-600 max-h-32 overflow-y-auto">
//           <p>
//             I hereby declare that all the information provided in this
//             application form is true, complete, and correct to the best of my
//             knowledge and belief.
//           </p>
//         </div>
//         <label className="flex items-center gap-3 mt-4">
//           <input
//             type="checkbox"
//             className="w-4 h-4 border-slate-300 rounded text-primary"
//           />
//           <span className="text-sm font-medium text-slate-700">
//             I confirm that I have reviewed all the information and I agree to
//             the declaration stated above.{" "}
//             <span className="text-red-500">*</span>
//           </span>
//         </label>
//       </div>
//     </div>
//   );

//   const renderRegistrationSuccess = () => (
//     <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden">
//       <div className="bg-primary text-white text-center py-8">
//         <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-400/20 rounded-full mb-4">
//           <CheckCircle size={32} className="text-emerald-300" />
//         </div>
//         <h1 className="text-2xl font-bold">Registration Successful</h1>
//         <p className="text-sm text-gray-300 mt-2">
//           Your application for JTGLCCE 2026 has been successfully submitted.
//         </p>
//       </div>
//       <div className="p-8 space-y-6">
//         <div className="border rounded-lg p-4 flex justify-between bg-slate-50">
//           <div>
//             <span className="text-xs font-bold uppercase text-slate-500">
//               Registration Number
//             </span>
//             <div className="text-xl font-extrabold text-slate-800">
//               {applicationStatus.registrationNumber}
//             </div>
//           </div>
//           <div>
//             <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
//               ● Active
//             </span>
//             <div className="text-xs text-slate-500 mt-1">
//               Submitted on: {applicationStatus.submissionDate}
//             </div>
//           </div>
//         </div>
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
//           <Bell size={16} className="text-blue-600" />
//           <div>
//             <span className="font-bold text-slate-800">Confirmation Sent</span>
//             <p className="text-sm text-slate-600">
//               A confirmation SMS has been sent to your registered mobile number
//               and email.
//             </p>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="border rounded-lg p-5 text-center hover:border-primary cursor-pointer">
//             <FileText className="w-10 h-10 text-green-600 mx-auto mb-2" />
//             <h3 className="font-bold">Download Application</h3>
//           </div>
//           <div className="border rounded-lg p-5 text-center hover:border-primary cursor-pointer">
//             <Receipt className="w-10 h-10 text-blue-600 mx-auto mb-2" />
//             <h3 className="font-bold">Download Fee Receipt</h3>
//           </div>
//         </div>
//       </div>
//       <div className="border-t bg-slate-50 px-5 py-4 flex justify-between text-sm">
//         <div className="flex items-center gap-1 text-slate-500">
//           <HelpCircle size={14} /> Issue? Contact Help Desk
//         </div>
//         <span 
//           onClick={() => navigate("/dashboard")}
//           className="font-bold text-primary cursor-pointer">
//           Go to Dashboard →
//         </span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-slate-800">Application Form</h1>
//         <p className="text-slate-600">
//           Fill out the application form carefully
//         </p>
//       </div>
//       {!isSubmitted ? (
//         <>
//           <div className="mb-8 overflow-x-auto">
//             <div className="flex justify-between min-w-[800px] relative">
//               {steps.map((step, index) => (
//                 <div key={step.id} className="flex-1 relative">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${index <= currentStep ? "bg-primary text-white shadow-lg" : "bg-slate-200 text-slate-500"}`}
//                     >
//                       {index < currentStep ? (
//                         <CheckCircle className="w-5 h-5" />
//                       ) : (
//                         <step.icon className="w-5 h-5" />
//                       )}
//                     </div>
//                     <div className="text-center mt-2 hidden md:block">
//                       <p
//                         className={`text-xs font-medium ${index <= currentStep ? "text-primary" : "text-slate-500"}`}
//                       >
//                         {step.title}
//                       </p>
//                     </div>
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div
//                       className={`absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 transition-all ${index < currentStep ? "bg-primary" : "bg-slate-200"}`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
//             {renderStep()}
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={() => setCurrentStep(currentStep - 1)}
//               disabled={currentStep === 0}
//               className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="w-4 h-4" /> Previous
//             </button>
//             {currentStep < steps.length - 1 ? (
//               <button
//                 onClick={handleNext}
//                 disabled={savingStep}
//                 className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50"
//               >
//                 {savingStep ? "Saving..." : "Next"} 
//                 {!savingStep && <ChevronRight className="w-4 h-4" />}
//               </button>
//             ) : (
//               <div className="flex gap-10">
//                 <button
//                   onClick={handleSaveDraft}
//                   className="flex items-center gap-2 px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-900"
//                 >
//                   <Send className="w-4 h-4" /> Save Draft
//                 </button>
//                 <button
//                   onClick={handleFinalSubmit}
//                   className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 >
//                   <Send className="w-4 h-4" /> Submit Application
//                 </button>
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         renderRegistrationSuccess()
//       )}
//     </div>
//   );
// };

// export default MyApplications;





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
  KeyRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// API Base URL
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
};

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = base64String.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
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
  postRankings: { [key: number]: number };
}

interface LanguageSelection {
  paperOneLanguage: string;
  paperTwoLanguage: string;
  paperThreeLanguage: string;
}

interface ReservationCategory {
  mainCategory: string;
  mainCategoryId?: number;
  subCategory: string;
  subCategoryId?: number;
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

import { toast } from "react-toastify";

const MyApplications: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>({
    isSubmitted: false,
    registrationNumber: "",
    submissionDate: "",
  });
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [dynamicPosts, setDynamicPosts] = useState<Post[]>([]);
  const [savingStep, setSavingStep] = useState(false);

  // API Data States
  const [subjectsList, setSubjectsList] = useState<string[]>([]);
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

  const graduationCourseNames = [
    "BSc", "BSc (Hons)", "BPharma", "B.A.M.S (Ayurveda)", "BFSc",
    "BTech Dairy Technology", "BSc Dairy Science", "BA", "BCom",
  ];

  const subjects = [
    "Entomology", "Zoology", "Botany", "Mathematics", "Physics", "Chemistry",
    "Statistics", "Geology", "Economics", "Commerce", "Dairy Technology",
    "Dairy Science", "Fisheries Science", "Pharmacy", "Pharmaceutical Chemistry",
    "Ayurveda", "Pharmaceutics"
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

  const generateYears = () => {
    const years = [];
    for (let i = 2026; i >= 1970; i--) {
      years.push(i.toString());
    }
    return years;
  };

  const passingYears = generateYears();
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

  const [highestQualification, setHighestQualification] = useState("graduation");

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

          console.log("country response ",countriesResponse.data )
          console.log("country response ",countriesResponse.data.countryId )
          console.log("country response ",countriesResponse.data.data[0].countryId )
          setCountriesList(countriesResponse.data.data);
          if (countriesResponse.data.data.length > 0) {
            const india = countriesResponse.data.data.find((c: Country) => c.countryId === c.countryId);
            const countryId=countriesResponse.data.data[0].countryId
            if (india) {
              const statesResponse = await apiService.getStatesByCountry(countryId);
              if (statesResponse.data.success) {
                setStatesList(statesResponse.data.data);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
        toast.error("Failed to load form data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

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

  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    setDocuments({ ...documents, [field]: file });
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

  const verifyEmailOtp = () => {
    setEmailOtpVerified(true);
    toast.success("Email verified successfully!");
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
          state: personalInfo.permanentAddress.state,
          district: personalInfo.permanentAddress.district,
          pincode: personalInfo.permanentAddress.pincode,
          cityOrVillage: personalInfo.permanentAddress.cityOrVillage,
        },
        sameAsPermanent: personalInfo.sameAsPermanent,
        correspondenceAddress: personalInfo.sameAsPermanent
          ? {
              street: personalInfo.permanentAddress.street,
              post: personalInfo.permanentAddress.post,
              state: personalInfo.permanentAddress.state,
              district: personalInfo.permanentAddress.district,
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
    
    const selectedCategory = categoriesList.find(
      cat => cat.catName.toLowerCase().replace(/\s+/g, '_') === reservationCategory.mainCategory ||
             cat.catName.toLowerCase() === reservationCategory.mainCategory
    );
    
    let subCategoryId = 0;
    if (reservationCategory.subCategory && selectedCategory?.subCategories) {
      const selectedSubCategory = selectedCategory.subCategories.find(
        sub => sub.catName.toLowerCase().replace(/\s+/g, '_') === reservationCategory.subCategory
      );
      if (selectedSubCategory) {
        subCategoryId = selectedSubCategory.catId;
      }
    }

    const payload = {
      reservationCategory: {
        mainCategory: selectedCategory?.catId || 0,
        subCategory: subCategoryId,
        isPwd: reservationCategory.isPwd,
        pwdType: reservationCategory.pwdType,
        pwdPercentage: reservationCategory.pwdPercentage,
        isExServiceman: reservationCategory.isExServiceman,
        exServicemanYears: reservationCategory.exServicemanYears,
        isSportsQuota: reservationCategory.isSportsQuota,
        sportsLevel: reservationCategory.sportsLevel,
        sportsAchievement: reservationCategory.sportsAchievement,
        isJharkhandDomicile: reservationCategory.isJharkhandDomicile,
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
      highestQualification: highestQualification,
      tenth: {
        board: education.tenth.board,
        rollNumber: education.tenth.rollNumber,
        percentage: education.tenth.percentage,
        yearOfPassing: education.tenth.yearOfPassing,
        totalMarks: education.tenth.totalMarks,
        marksObtained: education.tenth.marksObtained,
        passingCertificateNo: education.tenth.passingCertificateNo,
      },
      twelfth: {
        board: education.twelfth.board,
        rollNumber: education.twelfth.rollNumber,
        percentage: education.twelfth.percentage,
        yearOfPassing: education.twelfth.yearOfPassing,
        totalMarks: education.twelfth.totalMarks,
        marksObtained: education.twelfth.marksObtained,
        passingCertificateNo: education.twelfth.passingCertificateNo,
      },
      graduation: {
        graduationCourse: education.graduation.graduationCourse,
        university: education.graduation.university,
        passoutYear: education.graduation.passoutYear,
        percentage: education.graduation.percentage,
        specialization: education.graduation.specialization,
        totalMarks: education.graduation.totalMarks,
        marksObtained: education.graduation.marksObtained,
        passingCertificateNo: education.graduation.passingCertificateNo,
      },
      postGraduation: {
        hasPostGraduation: education.postGraduation.hasPostGraduation,
        university: education.postGraduation.university,
        passoutYear: education.postGraduation.passoutYear,
        percentage: education.postGraduation.percentage,
        subject: education.postGraduation.subject,
        totalMarks: education.postGraduation.totalMarks,
        marksObtained: education.postGraduation.marksObtained,
        passingCertificateNo: education.postGraduation.passingCertificateNo,
      },
      diploma: {
        hasDiploma: education.diploma.hasDiploma,
        instituteName: education.diploma.instituteName,
        qualificationType: education.diploma.qualificationType,
        year: education.diploma.year,
        totalMarks: education.diploma.totalMarks,
        marksObtained: education.diploma.marksObtained,
        certificateNo: education.diploma.certificateNo,
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
      contractualService: {
        hasContractualService: education.contractualService.hasContractualService,
        durationYears: education.contractualService.durationYears,
        durationMonths: education.contractualService.durationMonths,
        organization: education.contractualService.organization,
        contractId: education.contractualService.contractId,
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

  // Save Step 5 API call (Documents - Base64 format)
  // const saveStep5 = async () => {
  //   setSavingStep(true);

  //   try {
  //     // Convert all files to base64
  //     const documentsBase64: { [key: string]: string } = {};

  //     const documentKeys: (keyof Documents)[] = [
  //       "tenthMarksheet", "twelfthMarksheet", "graduationMarksheet",
  //       "postGraduationCertificate", "diplomaCertificate", "experienceCertificate",
  //       "contractualServiceCertificate", "ewsCertificate", "aadharCard",
  //       "signature", "photo", "domicileCertificate", "castCertificate",
  //       "sportsCertificate", "pwdCertificate"
  //     ];

  //     for (const key of documentKeys) {
  //       const file = documents[key];
  //       if (file) {
  //         const base64 = await fileToBase64(file);
  //         documentsBase64[key] = base64;
  //       } else {
  //         documentsBase64[key] = "";
  //       }
  //     }

  //     const payload = {
  //       documents: documentsBase64,
  //     };

  //     const response = await apiService.saveStep5(payload);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       setCurrentStep(currentStep + 1);
  //     }
  //   } catch (error: any) {
  //     console.error("Error saving step 5:", error);
  //     toast.error(error.response?.data?.message || "Failed to save documents");
  //   } finally {
  //     setSavingStep(false);
  //   }
  // };

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
    toast.error(
      error.response?.data?.message || "Failed to save documents"
    );
  } finally {
    setSavingStep(false);
  }
};

  // Save Step 6 API call (Post Preferences)
  const saveStep6 = async () => {
    setSavingStep(true);

    // Convert postRankings object to array format
    const postRankingsArray = Object.entries(postPreference.postRankings)
      .filter(([_, priority]) => priority !== 0)
      .map(([postId, priority]) => ({
        postId: Number(postId),
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
    if (currentStep === 0) {
      saveStep1();
    } else if (currentStep === 1) {
      saveStep2();
    } else if (currentStep === 2) {
      saveStep3();
    } else if (currentStep === 3) {
      saveStep6(); // Post Preferences step
    } else if (currentStep === 4) {
      saveStep4(); // Language Selection step
    } else if (currentStep === 5) {
      saveStep5(); // Documents step
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = () => {
    const formData = {
      personalInfo,
      education,
      postPreference,
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

  const navigate = useNavigate();

  const getCategoryOptions = () => {
    const mainCategories = categoriesList
      .filter(cat => cat.catParentId === null)
      .map(cat => ({ value: cat.catName.toLowerCase().replace(/\s+/g, '_'), label: cat.catName, id: cat.catId }));
    
    if (mainCategories.length === 0) {
      return [
        { value: "unreserved", label: "Unreserved (UR)", id: 0 },
        { value: "bc1", label: "BC-I", id: 0 },
        { value: "bc2", label: "BC-II", id: 0 },
        { value: "sc", label: "Scheduled Caste (SC)", id: 0 },
        { value: "st", label: "Scheduled Tribe (ST)", id: 0 },
        { value: "ews", label: "EWS", id: 0 },
      ];
    }
    return mainCategories;
  };

  const getStSubCategories = () => {
    const stCategory = categoriesList.find(cat => cat.catName === "Scheduled Tribe (ST)");
    if (stCategory && stCategory.subCategories) {
      return stCategory.subCategories.map(sub => ({ 
        value: sub.catName.toLowerCase().replace(/\s+/g, '_'), 
        label: sub.catName,
        id: sub.catId 
      }));
    }
    return [
      { value: "primitive", label: "Primitive Tribe (Adim Janjati)", id: 0 },
      { value: "other", label: "Other ST", id: 0 },
    ];
  };

  const getStateOptions = () => {
    return statesList.map(state => ({ id: state.stateId, name: state.stateName }));
  };

  const getPermanentDistrictOptions = () => {
    return permanentDistricts.map(district => ({ id: district.districtId, name: district.districtName }));
  };

  const getCorrespondenceDistrictOptions = () => {
    return correspondenceDistricts.map(district => ({ id: district.districtId, name: district.districtName }));
  };

  if (loading) {
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
              Full Name (as per Matriculation Certificate)<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, firstName: value });
              }}
              onKeyDown={validateTextInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
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
              }}
              onKeyDown={validateTextInput}
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
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, fathersName: value });
              }}
              onKeyDown={validateTextInput}
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
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setPersonalInfo({ ...personalInfo, motherName: value });
              }}
              onKeyDown={validateTextInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
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
            <select
              value={personalInfo.nationality}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, nationality: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              {countriesList.map((country) => (
                <option key={country.countryId} value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
              {countriesList.length === 0 && (
                <option value="Indian">Indian</option>
              )}
            </select>
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
                maxLength={10}
                value={personalInfo.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setPersonalInfo({ ...personalInfo, mobileNumber: value });
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
              maxLength={10}
              value={personalInfo.alternateNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPersonalInfo({ ...personalInfo, alternateNumber: value });
              }}
              onKeyDown={validateNumberInput}
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
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    pincode: value,
                  },
                });
              }}
              onKeyDown={validateNumberInput}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Village/City/Town <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.permanentAddress.cityOrVillage}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  permanentAddress: {
                    ...personalInfo.permanentAddress,
                    cityOrVillage: e.target.value,
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
                }
              }}
              disabled={personalInfo.sameAsPermanent}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
            >
              <option value="">Select State</option>
              {getStateOptions().map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
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
                }
              }}
              disabled={personalInfo.sameAsPermanent || !personalInfo.correspondenceAddress.stateId}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-100"
            >
              <option value="">Select District</option>
              {getCorrespondenceDistrictOptions().map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
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
              maxLength={6}
              value={personalInfo.correspondenceAddress.pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPersonalInfo({
                  ...personalInfo,
                  correspondenceAddress: {
                    ...personalInfo.correspondenceAddress,
                    pincode: value,
                  },
                });
              }}
              onKeyDown={validateNumberInput}
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
              value={personalInfo.correspondenceAddress.cityOrVillage}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  correspondenceAddress: {
                    ...personalInfo.correspondenceAddress,
                    cityOrVillage: e.target.value,
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

  const renderReservationCategory = () => {
    const categoryOptions = getCategoryOptions();
    const stSubCategories = getStSubCategories();

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
                value={reservationCategory.mainCategory}
                onChange={(e) => {
                  const selected = categoryOptions.find(cat => cat.value === e.target.value);
                  setReservationCategory({
                    ...reservationCategory,
                    mainCategory: e.target.value,
                    mainCategoryId: selected?.id,
                    subCategory: "",
                    subCategoryId: undefined,
                  });
                  const fee = e.target.value === "sc" || e.target.value === "st" ? "50" : "100";
                  setFeePayment({ ...feePayment, applicationFee: fee });
                }}
                className="w-full h-12 border border-slate-300 rounded-lg px-4"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            {(reservationCategory.mainCategory === "st" || reservationCategory.mainCategory === "scheduled_tribe_(st)") && (
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Sub-Category (Primitive Tribe)
                </label>
                <select
                  value={reservationCategory.subCategory}
                  onChange={(e) => {
                    const selected = stSubCategories.find(sub => sub.value === e.target.value);
                    setReservationCategory({
                      ...reservationCategory,
                      subCategory: e.target.value,
                      subCategoryId: selected?.id,
                    });
                  }}
                  className="w-full h-12 border border-slate-300 rounded-lg px-4"
                >
                  <option value="">Select Sub-Category</option>
                  {stSubCategories.map((sub) => (
                    <option key={sub.value} value={sub.value}>
                      {sub.label}
                    </option>
                  ))}
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
                    type="text"
                    value={reservationCategory.pwdPercentage}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setReservationCategory({
                        ...reservationCategory,
                        pwdPercentage: value,
                      });
                    }}
                    onKeyDown={validateNumberInput}
                    maxLength={2}
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
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Years of Service
                </label>
                <input
                  type="text"
                  value={reservationCategory.exServicemanYears}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setReservationCategory({
                      ...reservationCategory,
                      exServicemanYears: value,
                    });
                  }}
                  onKeyDown={validateNumberInput}
                  placeholder="Enter years of service"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
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
  };

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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({
                  ...education,
                  tenth: { ...education.tenth, totalMarks: value },
                });
              }}
              onKeyDown={validateNumberInput}
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({
                  ...education,
                  tenth: { ...education.tenth, marksObtained: value },
                });
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
                setEducation({
                  ...education,
                  tenth: { ...education.tenth, percentage: value },
                });
              }}
              placeholder="e.g., 82.5"
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({
                  ...education,
                  twelfth: { ...education.twelfth, totalMarks: value },
                });
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
                setEducation({
                  ...education,
                  twelfth: { ...education.twelfth, marksObtained: value },
                });
              }}
              onKeyDown={validateNumberInput}
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
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setEducation({
                  ...education,
                  twelfth: { ...education.twelfth, percentage: value },
                });
              }}
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setEducation({
                  ...education,
                  graduation: { ...education.graduation, totalMarks: value },
                });
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
                setEducation({
                  ...education,
                  graduation: { ...education.graduation, marksObtained: value },
                });
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
                setEducation({
                  ...education,
                  graduation: { ...education.graduation, percentage: value },
                });
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Specialization/Subject <span className="text-red-600">*</span>
            </label>
            <SearchableDropdown
              options={subjectsList.length > 0 ? subjectsList : subjects}
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
                options={subjectsList.length > 0 ? subjectsList : subjects}
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setEducation({
                    ...education,
                    diploma: { ...education.diploma, totalMarks: value },
                  });
                }}
                onKeyDown={validateNumberInput}
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setEducation({
                    ...education,
                    diploma: { ...education.diploma, marksObtained: value },
                  });
                }}
                onKeyDown={validateNumberInput}
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
    const getAvailablePriorities = (currentPostId: number) => {
      const usedPriorities = Object.entries(postPreference.postRankings)
        .filter(([id, priority]) => Number(id) !== currentPostId && priority !== 0)
        .map(([, priority]) => priority);
      
      const allPriorities = [1, 2, 3, 4, 5];
      return allPriorities.filter(p => !usedPriorities.includes(p));
    };

    const handlePriorityChange = (postId: number, priority: number) => {
      const isPriorityUsed = Object.entries(postPreference.postRankings)
        .some(([id, p]) => Number(id) !== postId && p === priority);
      
      if (isPriorityUsed && priority !== 0) {
        toast.error(`Priority ${priority} is already selected for another post. Please choose a different priority.`);
        return;
      }
      
      setPostPreference({
        ...postPreference,
        postRankings: { ...postPreference.postRankings, [postId]: priority },
      });
    };

    const postsToShow = dynamicPosts.length > 0 ? dynamicPosts : [];
    const postsAvailable = postsToShow.length;

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
                {postsAvailable} Posts Available
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4 italic">Select priority number from dropdown (1 = highest priority). Each priority number can be used only once.</p>

            {postsAvailable === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg">
                <p className="text-slate-500">No posts available based on your qualifications.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {postsToShow.map((post, index) => {
                  const currentPriority = postPreference.postRankings[post.postId] || 0;
                  const availablePriorities = getAvailablePriorities(post.postId);
                  
                  return (
                    <div
                      key={post.postId}
                      className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-bold text-slate-400 w-2">{index + 1}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">{post.postTitle}</h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{post.postContent}</p>
                      </div>

                      <div className="shrink-0 ml-2">
                        <select
                          value={currentPriority}
                          onChange={(e) => handlePriorityChange(post.postId, parseInt(e.target.value))}
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
            )}
            
            {postsAvailable > 0 && Object.values(postPreference.postRankings).some(p => p === 0) && (
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
      { key: "photo", label: "Passport Size Photograph", required: true, type: "image", size: "20KB-50KB" },
      { key: "signature", label: "Signature Scan", required: true, type: "image", size: "10KB-20KB" },
      { key: "tenthMarksheet", label: "10th Marksheet", required: true, type: "pdf", size: "100KB-500KB" },
      { key: "twelfthMarksheet", label: "12th Marksheet", required: true, type: "pdf", size: "100KB-500KB" },
      { key: "graduationMarksheet", label: "Graduation Degree Certificate", required: true, type: "pdf", size: "Max 500KB" },
      { key: "postGraduationCertificate", label: "Post-Graduation Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "diplomaCertificate", label: "Diploma Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "experienceCertificate", label: "Experience Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "contractualServiceCertificate", label: "Contractual Service Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "ewsCertificate", label: "EWS Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "domicileCertificate", label: "Domicile Certificate", required: true, type: "pdf", size: "Max 500KB" },
      { key: "castCertificate", label: "Caste Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "pwdCertificate", label: "Disability Certificate", required: false, type: "pdf", size: "Max 500KB" },
      { key: "sportsCertificate", label: "Sports Certificate", required: false, type: "pdf", size: "Max 500KB" },
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
                  {field.required && <span className="text-red-500 ml-1">*</span>}
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
