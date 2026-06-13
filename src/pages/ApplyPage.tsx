import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import type React from "react"
import { Eye, EyeOff, MoveRight, RefreshCw, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OTPVerificationModal from "../components/OTPVerificationModal";
import { sendOtp, verifyOtp, resendOtp } from "../auth/cognito";
import { toast } from "react-toastify";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MINIMUM_AGE_DATE = new Date("2025-08-01T00:00:00");

interface CaptchaResponse {
  success: boolean;
  message: string;
  captchaId: string;
  captchaSvg: string;
}

interface CaptchaValidateResponse {
  success: boolean;
  message: string;
}

const CandidateRegistrationStep1: FC = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [verificationType, setVerificationType] = useState<"mobile" | "email">("email");

  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState("");

  const [cognitoSubId, setCognitoSubId] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isValidatingCaptcha, setIsValidatingCaptcha] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRules = useMemo(
    () => ({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    }),
    [password]
  );

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Function to validate text input (no numbers, only letters and spaces)
  const validateTextOnly = (value: string): string => {
    return value.replace(/[^a-zA-Z\s]/g, '');
  };

  const getAgeOnCutoffDate = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const birthDate = new Date(`${dateOfBirth}T00:00:00`);

    let age = MINIMUM_AGE_DATE.getFullYear() - birthDate.getFullYear();
    const monthDiff = MINIMUM_AGE_DATE.getMonth() - birthDate.getMonth();
    const dayDiff = MINIMUM_AGE_DATE.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1;
    }

    return age;
  };

  const validateAge = (dateOfBirth: string): boolean => {
    if (!dateOfBirth) return false;
    return getAgeOnCutoffDate(dateOfBirth) >= 21;
  };

  const validatePassword = (value: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value);
  };

  const fetchCaptcha = async (): Promise<void> => {
    try {
      setCaptchaLoading(true);

      const response = await fetch(`${BASE_URL}/auth/captcha`, {
        method: "GET",
      });

      const data: CaptchaResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load CAPTCHA");
      }

      setCaptchaId(data.captchaId);
      setCaptchaSvg(data.captchaSvg);
      setCaptcha("");
    } catch (error: any) {
      console.error("CAPTCHA error:", error);
      toast.error(`${error?.message || "Failed to load CAPTCHA"}`);
    } finally {
      setCaptchaLoading(false);
    }
  };

  const validateCaptcha = async (): Promise<boolean> => {
    if (!captchaId) {
      toast.error("Please refresh CAPTCHA");
      return false;
    }

    if (!captcha.trim()) {
      toast.error("Please enter CAPTCHA");
      return false;
    }

    try {
      setIsValidatingCaptcha(true);
      
      const response = await fetch(`${BASE_URL}/auth/captcha/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          captchaId: captchaId,
          captchaText: captcha.trim(),
        }),
      });

      const data: CaptchaValidateResponse = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Invalid CAPTCHA. Please try again.");
        await fetchCaptcha(); // Refresh CAPTCHA on failure
        return false;
      }

      return true;
    } catch (error: any) {
      console.error("CAPTCHA validation error:", error);
      toast.error(error?.message || "Failed to validate CAPTCHA");
      await fetchCaptcha(); // Refresh CAPTCHA on error
      return false;
    } finally {
      setIsValidatingCaptcha(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const resetEmailVerification = (): void => {
    setIsEmailVerified(false);
    setCognitoSubId("");
    setCurrentStep(1);
    setPassword("");
    setConfirmPassword("");
  };

  // Update full date when year, month, or day changes
  const updateDob = (year: string, month: string, day: string) => {
    if (year && month && day) {
      const formattedMonth = month.padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      const fullDate = `${year}-${formattedMonth}-${formattedDay}`;
      setDob(fullDate);
    } else {
      setDob("");
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setDobYear(value);
    updateDob(value, dobMonth, dobDay);
    resetEmailVerification();
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDobMonth(value);
    updateDob(dobYear, value, dobDay);
    resetEmailVerification();
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDobDay(value);
    updateDob(dobYear, dobMonth, value);
    resetEmailVerification();
  };

  // Generate days based on selected month and year
  const getDaysInMonth = (year: string, month: string): number => {
    if (!year || !month) return 31;
    return new Date(parseInt(year), parseInt(month), 0).getDate();
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({ value: i.toString(), label: new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' }) });
    }
    return months;
  };

  const generateDayOptions = () => {
    const days = [];
    const maxDays = getDaysInMonth(dobYear, dobMonth);
    for (let i = 1; i <= maxDays; i++) {
      days.push({ value: i.toString(), label: i.toString() });
    }
    return days;
  };

  const validateStepOne = (): boolean => {
    if (!fullName.trim()) {
      toast.error("Please enter full name")
      return false;
    }

    if (!dob) {
      toast.error("Please select date of birth")
      return false;
    }

    if (!validateAge(dob)) {
      toast.error("Age must be 21 years or above as of 01.08.2025")
      return false;
    }

    if (mobileNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number")
      return false;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address")
      return false;
    }

    if (!captchaId) {
      toast.error("Please refresh CAPTCHA")
      return false;
    }

    if (!captcha.trim()) {
      toast.error("Please enter CAPTCHA");
      return false;
    }

    return true;
  };

  const validateStepTwo = (): boolean => {
    if (!isEmailVerified) {
      toast.error("Please verify email first");
      setCurrentStep(1);
      return false;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character")
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match")
      return false;
    }

    if (!cognitoSubId) {
      toast.error("Cognito Sub ID not found. Please verify email again.")
      setCurrentStep(1);
      return false;
    }

    return true;
  };

  const handleSendEmailOtp = async (): Promise<void> => {
    if (!validateStepOne()) return;

    // Validate CAPTCHA before sending OTP
    const isCaptchaValid = await validateCaptcha();
    if (!isCaptchaValid) return;

    try {
      setLoading(true);
      setVerificationType("email");

      const result = await sendOtp(email);

      if (result?.userSub) {
        setCognitoSubId(result.userSub);
      }
 
      toast.success("OTP sent successfully to email");
      setIsOtpModalOpen(true);
    } catch (error: any) {
      console.error("Send OTP error:", error);

      if (
        error?.code === "UsernameExistsException" ||
        error?.name === "UsernameExistsException"
      ) {
        try {
          await resendOtp(email);
          toast.success('User already exists. OTP resent to email.')
          setIsOtpModalOpen(true);
        } catch (resendError: any) {
          console.error("Resend OTP error:", resendError);
          toast.error(`${resendError?.message || "Failed to resend OTP"}`);
        }
      } else {
        toast.error(error?.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (type: "mobile" | "email"): Promise<void> => {
    if (type === "mobile") {
      return;
    }

    await handleSendEmailOtp();
  };

  const handleOtpVerify = async (otpValue: string): Promise<void> => {
    try {
      setLoading(true);

      await verifyOtp(email, otpValue);

      setIsEmailVerified(true);
      setIsOtpModalOpen(false);
      setCurrentStep(2);
      toast.success("Email verified successfully!")
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      toast.error(`${error?.message || "Invalid OTP"}`);
    } finally {
      setLoading(false);
    }
  };

  const registerCandidate = async (): Promise<void> => {
    const formatDateToDDMMYYYY = (dateString: string): string => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };
    
    const payload = {
      email,
      password,
      confirmPassword,
      fullName,
      dateOfBirth: formatDateToDDMMYYYY(dob),
      mobileNumber,
      captchaId,
      captchaText: captcha,
      cognitoSubId,
    };

    const response = await fetch(`${BASE_URL}/auth/candidate/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data?.success === false) {
      throw new Error(data?.message || "Registration failed");
    }
  };

  const handleRegisterClick = async (): Promise<void> => {
    if (!validateStepTwo()) return;

    try {
      setLoading(true);

      await registerCandidate();
      toast.success("Registration completed successfully!")
      navigate("/candidate-login");
    } catch (error: any) {
      console.error("Register error:", error);
      toast.error(`${error?.message || "Registration failed"}`);
      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = validateTextOnly(e.target.value);
    setFullName(value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCaptcha(e.target.value);
  };

  const RequirementItem = ({
    isValid,
    label,
  }: {
    isValid: boolean;
    label: string;
  }) => (
    <span className={`text-[12px] font-semibold ${isValid ? "text-green-700" : "text-[#4B5563]"}`}>
      {isValid ? "✓" : "○"} {label}
    </span>
  );

  // Calculate age for display
  const calculatedAge = dob ? getAgeOnCutoffDate(dob) : 0;
  const isAgeValid = calculatedAge >= 21;

  return (
    <div className="min-h-screen bg-[#F4F5F7] px-3 py-6 md:px-6">
      <div className="max-w-[770px] mx-auto">
        <div className="bg-white border border-[#BFC7C2] rounded-md overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
          <div className="px-5 md:px-8 py-4 border-b border-[#BFC7C2] bg-[#FBFBFB]">
            <h1 className="text-xl md:text-4xl leading-none font-semibold text-primary tracking-[-0.5px]">
              Candidate Registration - Step {currentStep}
            </h1>

            <p className="mt-2 text-[15px] md:text-base leading-8 text-[#374151] max-w-[760px]">
              Please provide your basic identity details. These fields will be{" "}
              <span className="font-bold text-[#111827]">locked</span> for the
              entire application process once submitted.
            </p>
          </div>

          <div className="px-5 md:px-8 py-4">
            {currentStep === 1 ? (
              <>
                <div>
                  <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                    Full Name (as per Matriculation Certificate) <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary transition-all placeholder:text-[#6B7280]"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <div>
                    <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                      Date of Birth <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {/* Year Input - Only 4 digits */}
                      <input
                        type="text"
                        placeholder="YYYY"
                        value={dobYear}
                        onChange={handleYearChange}
                        maxLength={4}
                        className="py-2.5 border border-[#B9C2BD] rounded-lg px-3 text-[15px] outline-none focus:border-primary text-center"
                      />
                      
                      {/* Month Dropdown */}
                      <select
                        value={dobMonth}
                        onChange={handleMonthChange}
                        className="py-2.5 border border-[#B9C2BD] rounded-lg px-3 text-[15px] outline-none focus:border-primary bg-white"
                      >
                        <option value="">Month</option>
                        {generateMonthOptions().map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                      
                      {/* Day Dropdown */}
                      <select
                        value={dobDay}
                        onChange={handleDayChange}
                        disabled={!dobYear || !dobMonth}
                        className="py-2.5 border border-[#B9C2BD] rounded-lg px-3 text-[15px] outline-none focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Day</option>
                        {generateDayOptions().map(day => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Age Display Outside Input Field */}
                    {dob && (
                      <div className="mt-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg w-fit ${
                          isAgeValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <Calendar size={16} />
                          <span className="text-sm font-semibold">Age as on 01.08.2025: {calculatedAge} years</span>
                        </div>
                      </div>
                    )}

                    <p className={`text-[13px] mt-2 ${dob && !validateAge(dob) ? "text-red-600" : "text-[#4B5563]"}`}>
                      Age must be 21 years or above as of 01.08.2025.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                      Mobile Number <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                      <input
                        type="text"
                        placeholder="9876543210"
                        value={mobileNumber}
                        onChange={(e) => {
                          handleMobileChange(e);
                          resetEmailVerification();
                        }}
                        className="flex-1 py-2.5 border border-[#B9C2BD] rounded-lg sm:rounded-r-none px-4 text-[15px] outline-none focus:border-primary placeholder:text-[#6B7280]"
                      />

                      <button
                        type="button"
                        disabled
                        className="py-2.5 min-w-[145px] bg-[#D7EDF8] text-[#365B73] text-[15px] font-semibold border border-[#D7EDF8] rounded-lg sm:rounded-l-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        OTP Verification
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                    Email Address <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      resetEmailVerification();
                    }}
                    className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary placeholder:text-[#6B7280]"
                  />
                </div>

                <div className="mt-4 bg-[#F4F6F5] border border-[#E1E5E3] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-[160px] min-h-[55px] bg-white border border-[#B9C2BD] rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
                        {captchaSvg ? (
                          <div dangerouslySetInnerHTML={{ __html: captchaSvg }} />
                        ) : (
                          <span className="text-sm text-[#6B7280]">
                            {captchaLoading ? "Loading..." : "No CAPTCHA"}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={fetchCaptcha}
                        disabled={captchaLoading}
                        className="flex items-center gap-1.5 text-[#003A2B] hover:underline text-[14px] font-semibold transition-all disabled:opacity-60"
                      >
                        <RefreshCw size={14} />
                        Refresh
                      </button>
                    </div>

                    <div className="flex-1 w-full">
                      <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                        Enter CAPTCHA <span className="text-red-500 ml-1">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="TYPE THE CHARACTERS ABOVE"
                        value={captcha}
                        onChange={(e) => {
                          handleCaptchaChange(e);
                          resetEmailVerification();
                        }}
                        className="w-full py-3 border border-[#B9C2BD] rounded-lg px-4 text-[14px] font-medium tracking-wider outline-none focus:border-primary placeholder:text-[#9CA3AF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleOtpVerification("email")}
                    disabled={loading || isEmailVerified || isValidatingCaptcha}
                    className="w-full py-3 bg-[#003A2B] hover:bg-[#002B20] text-white text-[18px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide shadow-md disabled:opacity-60"
                  >
                    {loading ? "Sending..." : isValidatingCaptcha ? "Validating CAPTCHA..." : isEmailVerified ? "Verified" : "Generate OTP"}
                    <MoveRight size={20} />
                  </button>

                  <p className="text-[15px] text-[#374151]">
                    Already registered?{" "}
                    <span
                      onClick={() => navigate("/candidate-login")}
                      className="font-bold text-[#003A2B] hover:underline cursor-pointer"
                    >
                      Candidate Login
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <div>
                    <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                      Password <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 pr-12 text-[15px] outline-none focus:border-primary"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827]"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                      Confirm Password <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 pr-12 text-[15px] outline-none focus:border-primary"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827]"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 bg-[#F4F6F5] border border-[#E1E5E3] rounded-lg p-4 text-[#4B5563]">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                    <p className="text-[13px] font-medium">
                      Minimum 8 characters, include:
                    </p>
                    <RequirementItem isValid={passwordRules.uppercase} label="1 uppercase letter" />
                    <RequirementItem isValid={passwordRules.number} label="1 number" />
                    <RequirementItem isValid={passwordRules.special} label="1 special character" />
                  </div>
                </div>

                {confirmPassword && password !== confirmPassword ? (
                  <p className="text-[13px] text-red-600 mt-2">
                    Password and confirm password do not match.
                  </p>
                ) : null}

                <div className="mt-5 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={handleRegisterClick}
                    disabled={loading}
                    className="w-full py-3 bg-[#003A2B] hover:bg-[#002B20] text-white text-[18px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide shadow-md disabled:opacity-60"
                  >
                    {loading ? "Please wait..." : "Register"}
                    <MoveRight size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="font-bold text-[#003A2B] hover:underline cursor-pointer"
                  >
                    Back to Step 1
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <OTPVerificationModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        type={verificationType}
        emailOrMobile={email}
        onVerify={handleOtpVerify}
      />
    </div>
  );
};

export default CandidateRegistrationStep1;