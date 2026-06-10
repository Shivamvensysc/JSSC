// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   ShieldCheck, 
//   User, 
//   Lock, 
//   RefreshCw, 
//   AlertTriangle, 
//   HelpCircle, 
//   FileLock
// } from "lucide-react";
// import { toast } from "react-toastify";

// export default function AdminLoginPage() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false); // Spinner state control
//   const [formData, setFormData] = useState({
//     staffId: "",
//     password: "",
//     captcha: ""
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); // Trigger spinner entry

//     // Simulating authentication pipeline delay (e.g., API response round-trip)
//     setTimeout(() => {
//       setIsLoading(false); // Stop spinner
//       toast.success("Login successfully");
//       navigate("/admin");
//     }, 1500); 
//   };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { toast } from "react-toastify";
import { 
  ShieldCheck, 
  User, 
  Lock, 
  RefreshCw, 
  AlertTriangle, 
  HelpCircle, 
  FileLock
} from "lucide-react";
export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffId: "",
    password: "",
    captcha: "",
  });

  const CAPTCHA_CODE = "4X7P9";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.staffId.trim()) {
      toast.error("Please enter username");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return;
    }

    if (formData.captcha.trim().toUpperCase() !== CAPTCHA_CODE) {
      toast.error("Invalid captcha");
      return;
    }

    setIsLoading(true);

    try {
      // Clear old session if exists
      try {
        await signOut();
      } catch {
        // Ignore if not signed in
      }

      const result = await signIn({
        username: formData.staffId.trim(),
        password: formData.password,
      });

      console.log("SignIn Result:", result);

      if (
        result.isSignedIn ||
        result.nextStep?.signInStep === "DONE"
      ) {
        const session = await fetchAuthSession();

        const accessToken =
          session.tokens?.accessToken?.toString() || "";

        const idToken =
          session.tokens?.idToken?.toString() || "";

        const refreshToken =
          (session as any)?.tokens?.refreshToken?.toString() || "";

        const userEmail =
          String(session.tokens?.idToken?.payload?.email || "");

        const username =
          String(
            session.tokens?.idToken?.payload?.cognito_username ||
              formData.staffId
          );

        localStorage.setItem("adminAccessToken", accessToken);
        localStorage.setItem("adminIdToken", idToken);
        localStorage.setItem("adminRefreshToken", refreshToken);
        localStorage.setItem("adminUsername", username);
        localStorage.setItem("adminEmail", userEmail);

        toast.success("Login successful");

        navigate("/admin");
        return;
      }

      if (
        result.nextStep?.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        toast.error("New password required for this account.");
        return;
      }

      toast.error("Unable to complete login.");
    } catch (error: any) {
      console.error("Login Error:", error);

      if (error?.name === "UserNotFoundException") {
        toast.error("User not found");
      } else if (error?.name === "NotAuthorizedException") {
        toast.error("Incorrect username or password");
      } else if (error?.name === "UserNotConfirmedException") {
        toast.error("User account is not confirmed");
      } else {
        toast.error(error?.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col justify-between font-sans antialiased selection:bg-[#003A2B]/10 p-4">
      
      {/* Top Spacer to push center content down evenly */}
      <div className="hidden sm:block h-6" />

      {/* MAIN CARD CONTAINER */}
      <div className="w-full max-w-[460px] mx-auto bg-white border border-[#E2E8F0] rounded-xl shadow-md p-6 sm:p-8 space-y-6 my-auto">
        
        {/* BRAND IDENTITY HEADER */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#003A2B] text-white flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck size={24} className="text-[#34D399]" />
          </div>
          <h2 className="text-[22px] font-black tracking-tight text-[#0F172A]">
            Administrative Login
          </h2>
          <p className="text-[12.5px] font-medium text-[#5F6368] leading-relaxed max-w-[340px] mx-auto">
            Access restricted to authorized JSSC Officers and Administrative Personnel.
          </p>
        </div>

        {/* INTERACTION LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* STAFF ID / USERNAME FIELD */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-[#475569] tracking-wide block">
              Staff ID / Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                disabled={isLoading}
                placeholder="e.g., JSSC-OFF-102"
                value={formData.staffId}
                onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                className="w-full h-[42px] pl-10 pr-4 bg-white border border-[#CBD5E1] rounded-lg text-[13.5px] font-medium placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003A2B] focus:border-[#003A2B] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[12px] font-bold text-[#475569] tracking-wide">
                Password <span className="text-red-500">*</span>
              </label>
              <button 
                type="button"
                disabled={isLoading}
                className="text-[11.5px] font-bold text-[#003A2B] hover:underline tracking-wide disabled:opacity-50 disabled:no-underline"
              >
                Forgot Access Key?
              </button>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                disabled={isLoading}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-[42px] pl-10 pr-4 bg-white border border-[#CBD5E1] rounded-lg text-[13.5px] font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-[#003A2B] focus:border-[#003A2B] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* SECURITY VERIFICATION CAPTCHA BLOCK */}
          <div className="space-y-1.5 bg-[#FAFBFB] p-3.5 border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#64748B]">
                Security Verification
              </span>
              <button 
                type="button"
                disabled={isLoading}
                className="text-gray-400 hover:text-[#003A2B] transition-colors p-0.5 rounded disabled:opacity-40"
                title="Refresh Captcha Code"
              >
                <RefreshCw size={13} />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div 
                className="h-[40px] px-5 bg-white border border-[#CBD5E1] rounded-md text-[18px] font-black tracking-[0.45em] text-[#334155] italic flex items-center justify-center select-none shadow-sm flex-1 font-mono opacity-90"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f1f5f9 0px, #f1f5f9 2px, transparent 2px, transparent 8px)' }}
              >
                4X7P9
              </div>
              <input
                type="text"
                required
                disabled={isLoading}
                placeholder="Enter code"
                value={formData.captcha}
                onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                className="w-[120px] h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-md text-[13.5px] font-bold text-center placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-[#003A2B] focus:border-[#003A2B] transition-all uppercase disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* SUBMIT EXECUTIVE PORTAL ACCESS BUTTON WITH DYNAMIC SPINNER */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[44px] bg-[#003A2B] hover:bg-[#002B20] text-white rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-2 disabled:bg-[#003A2B]/80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                {/* CSS Inline Spinner Graphic Object Layout */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} className="text-[#34D399]" /> 
                <span>Secure Login</span>
              </>
            )}
          </button>
        </form>

        {/* SYSTEM SECURITY COMPLIANCE WARNING CARD */}
        <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-4 flex gap-3">
          <AlertTriangle size={16} className="text-[#EF4444] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#991B1B]">
              Security Notice
            </h4>
            <p className="text-[11.5px] text-[#A51D24] font-medium leading-relaxed">
              Unauthorized access to this portal is strictly prohibited and punishable under the Information Technology Act. All activities are monitored and logged.
            </p>
          </div>
        </div>

      </div>

      {/* COMPLIANT INFRASTRUCTURE BASEFOOTER */}
      <footer className="w-full max-w-[460px] mx-auto pt-4 flex items-center justify-center gap-6 text-[12px] font-bold text-[#64748B]">
        <a href="#support" className="inline-flex items-center gap-1.5 hover:text-[#003A2B] transition-colors">
          <HelpCircle size={14} /> Support Center
        </a>
        <span className="text-gray-300 select-none">|</span>
        <a href="#policy" className="inline-flex items-center gap-1.5 hover:text-[#003A2B] transition-colors">
          <FileLock size={14} /> Access Policy
        </a>
      </footer>
    </div>
  );
}