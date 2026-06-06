import { useEffect, useState, FC } from "react";
import type React from "react";
import { CircleAlert, MoveRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OTPVerificationModal from "../components/OTPVerificationModal";
import { sendOtp, verifyOtp, resendOtp } from "../auth/cognito";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CaptchaResponse {
  success: boolean;
  message: string;
  captchaId: string;
  captchaSvg: string;
}

const CandidateRegistrationStep1: FC = () => {
  const navigate = useNavigate();

  const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);
  const [verificationType, setVerificationType] = useState<"mobile" | "email">("email");

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [captcha, setCaptcha] = useState<string>("");
  const [captchaId, setCaptchaId] = useState<string>("");
  const [captchaSvg, setCaptchaSvg] = useState<string>("");

  const [cognitoSubId, setcognitoSubId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value);
  };

  // const splitFullName = () => {
  //   const parts = fullName.trim().split(/\s+/);
  //   const fullName = parts[0] || "";
  //   return { fullName };
  // };

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
      alert(error?.message || "Failed to load CAPTCHA");
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      alert("Please enter full name");
      return false;
    }

    if (!dob) {
      alert("Please select date of birth");
      return false;
    }

    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return false;
    }

    if (!captchaId) {
      alert("Please refresh CAPTCHA");
      return false;
    }

    if (!captcha.trim()) {
      alert("Please enter CAPTCHA");
      return false;
    }

    return true;
  };

  const handleSendEmailOtp = async (): Promise<void> => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setVerificationType("email");

      const result = await sendOtp(email);

      if (result?.userSub) {
        setcognitoSubId(result.userSub);
      }

      alert("OTP sent successfully to email");
      setIsOtpModalOpen(true);
    } catch (error: any) {
      console.error("Send OTP error:", error);

      if (error?.code === "UsernameExistsException") {
        try {
          await resendOtp(email);
          alert("User already exists. OTP resent to email.");
          setIsOtpModalOpen(true);
        } catch (resendError: any) {
          console.error("Resend OTP error:", resendError);
          alert(resendError?.message || "Failed to resend OTP");
        }
      } else {
        alert(error?.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (type: "mobile" | "email"): Promise<void> => {
    if (type === "mobile") {
      alert("Your current Cognito setup only supports email OTP.");
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

      alert("Email verified successfully!");
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      alert(error?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const registerCandidate = async (): Promise<void> => {
    // const { fullName } = splitFullName();

    const payload = {
      email,
      password,
      confirmPassword,
      fullName,
      // lastName: "Singh",
      dateOfBirth: dob,
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

    return data;
  };

  const handleRegisterClick = async (): Promise<void> => {
    if (!validateForm()) return;

    if (!isEmailVerified) {
      await handleSendEmailOtp();
      return;
    }

    if (!cognitoSubId) {
      alert("Cognito Sub ID not found. Please verify email again.");
      return;
    }

    try {
      setLoading(true);

      await registerCandidate();

      alert("Registration completed successfully!");
      navigate("/candidate-login");
    } catch (error: any) {
      console.error("Register error:", error);
      alert(error?.message || "Registration failed");

      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCaptcha(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] px-3 py-6 md:px-6">
      <div className="max-w-[770px] mx-auto">
        <div className="bg-white border border-[#BFC7C2] rounded-md overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
          <div className="px-5 md:px-8 py-4 border-b border-[#BFC7C2] bg-[#FBFBFB]">
            <h1 className="text-xl md:text-4xl leading-none font-semibold text-primary tracking-[-0.5px]">
              Candidate Registration - Step 1
            </h1>

            <p className="mt-2 text-[15px] md:text-base leading-8 text-[#374151] max-w-[760px]">
              Please provide your basic identity details. These fields will be{" "}
              <span className="font-bold text-[#111827]">locked</span> for the
              entire application process once submitted.
            </p>
          </div>

          <div className="px-5 md:px-8 py-4">
            <div>
              <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                Full Name <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary transition-all placeholder:text-[#6B7280]"
              />

              <div className="flex items-center gap-2 mt-2">
                <CircleAlert size={14} className="text-[#4B5563]" />
                <p className="text-[13px] text-[#4B5563]">
                  Cannot be changed after registration.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Date of Birth <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 pr-12 text-[15px] outline-none focus:border-primary"
                />

                <p className="text-[13px] text-[#4B5563] mt-2">
                  Age will be calculated as of 01.08.2025.
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
                    onChange={handleMobileChange}
                    className="flex-1 py-2.5 border border-[#B9C2BD] rounded-lg sm:rounded-r-none px-4 text-[15px] outline-none focus:border-primary placeholder:text-[#6B7280]"
                  />

                  <button
                    onClick={() => handleOtpVerification("mobile")}
                    disabled={loading}
                    className="py-2.5 min-w-[145px] bg-[#D7EDF8] text-[#365B73] text-[15px] font-semibold border border-[#D7EDF8] rounded-lg sm:rounded-l-none hover:bg-[#CAE7F4] transition-all disabled:opacity-60"
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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                <input
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailVerified(false);
                    setcognitoSubId("");
                  }}
                  className="flex-1 py-2.5 border border-[#B9C2BD] rounded-lg sm:rounded-r-none px-4 text-[15px] outline-none focus:border-primary placeholder:text-[#6B7280]"
                />

                <button
                  onClick={() => handleOtpVerification("email")}
                  disabled={loading || isEmailVerified}
                  className="py-2.5 min-w-[145px] bg-[#D7EDF8] text-[#365B73] text-[15px] font-semibold border border-[#D7EDF8] rounded-lg sm:rounded-l-none hover:bg-[#CAE7F4] transition-all disabled:opacity-60"
                >
                  {isEmailVerified ? "Verified" : loading ? "Sending..." : "OTP Verification"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Password <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary"
                />

                <div className="mt-2 bg-[#F4F6F5] border border-[#E1E5E3] rounded-lg p-4 text-[#4B5563]">
                  <p className="text-[13px] font-medium mb-1">
                    Minimum 8 characters, include:
                  </p>
                  <ul className="text-[13px] list-disc pl-4 space-y-1">
                    <li>1 uppercase letter</li>
                    <li>1 number</li>
                    <li>1 special character</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Confirm Password <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary"
                />
              </div>
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
                    onChange={handleCaptchaChange}
                    className="w-full py-3 border border-[#B9C2BD] rounded-lg px-4 text-[14px] font-medium tracking-wider outline-none focus:border-primary placeholder:text-[#9CA3AF]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-4">
              <button
                onClick={handleRegisterClick}
                disabled={loading}
                className="w-full py-3 bg-[#003A2B] hover:bg-[#002B20] text-white text-[18px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide shadow-md disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Register & Generate OTP"}
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