import {
  LogIn,
  Lock,
  User,
  RefreshCw,
  MoveRight,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export default function CandidateLogin() {
  const navigate = useNavigate();
  console.log("captach")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidatingCaptcha, setIsValidatingCaptcha] = useState(false);

  const fetchCaptcha = async () => {
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
      toast.error(error?.message || "Failed to load CAPTCHA");
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

  const getTokensAndRedirect = async () => {
    const session = await fetchAuthSession();

    const accessToken = session.tokens?.accessToken?.toString();
    const idToken = session.tokens?.idToken?.toString();

    if (!accessToken || !idToken) {
      throw new Error("Token not found after login");
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);

    toast.success("Candidate login successfully");
    navigate("/dashboard", { replace: true });
  };

  const handleSubmit = async () => {
    try {
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }
      
      if (!password.trim()) {
        toast.error("Password is required");
        return;
      }

      if (!captchaId) {
        toast.error("Please refresh CAPTCHA");
        return;
      }

      if (!captcha.trim()) {
        toast.error("Captcha is required");
        return;
      }

      // Validate CAPTCHA before login
      const isCaptchaValid = await validateCaptcha();
      if (!isCaptchaValid) return;

      setLoading(true);

      try {
        await signOut();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("idToken");
      } catch {}

      const result = await signIn({
        username: email,
        password,
      });

      const signInStep = result.nextStep.signInStep;

      if (signInStep === "DONE") {
        await getTokensAndRedirect();
        return;
      }

      toast.error(`Unhandled sign-in step: ${signInStep}`);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed");
      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] px-4 py-8 flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-[480px] bg-white border border-[#E1E5E3] rounded-lg px-6 pt-4 pb-6 md:px-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="text-center mb-4">
          <h2 className="text-[24px] md:text-[26px] font-bold text-[#003A2B]">
            Returning Candidate Login
          </h2>

          <p className="text-[14px] text-[#4B5563] mt-1">
            Please enter your credentials to access your dashboard.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-[14px] font-semibold text-[#374151] mb-2">
              Email
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <User size={18} />
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full py-3 border border-[#B9C2BD] rounded-lg pl-11 pr-4 text-[15px] outline-none focus:border-[#003A2B]"
              />
            </div>
          </div>

          <div>
            <label className="text-[14px] font-semibold text-[#374151] mb-2 block">
              Password
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <Lock size={18} />
              </span>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full py-3 border border-[#B9C2BD] rounded-lg pl-11 pr-4 text-[15px] outline-none focus:border-[#003A2B]"
              />
            </div>
          </div>

          <div className="border border-[#E1E5E3] bg-[#F9FAFB] rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[13px] font-semibold text-[#4B5563]">
                Security Verification
              </span>

              <button
                type="button"
                onClick={fetchCaptcha}
                disabled={captchaLoading}
                className="flex items-center gap-1 text-[11px] font-bold text-[#003A2B] disabled:opacity-60"
              >
                <RefreshCw size={12} />
                {captchaLoading ? "Loading..." : "Refresh"}
              </button>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-[170px] min-h-[55px] bg-white border border-[#D1D5DB] rounded-lg flex items-center justify-center overflow-visible px-2">
                {captchaSvg ? (
                  <div
                    className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto"
                    dangerouslySetInnerHTML={{ __html: captchaSvg }}
                  />
                ) : (
                  <span className="text-[12px] text-[#6B7280]">
                    {captchaLoading ? "Loading..." : "No CAPTCHA"}
                  </span>
                )}
              </div>

              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter CAPTCHA"
                className="flex-1 h-[48px] border border-[#B9C2BD] rounded-lg px-3 focus:border-[#003A2B] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isValidatingCaptcha}
            className="w-full py-3 bg-[#003A2B] hover:bg-[#002B20] text-white text-[16px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={18} />
            {loading ? "Signing In..." : isValidatingCaptcha ? "Validating CAPTCHA..." : "Candidate Login"}
          </button>
        </form>

        <div className="mt-4 pt-2 border-t border-[#E1E5E3] text-center">
          <p className="text-[14px] text-[#4B5563]">
            Don't have an account yet?
          </p>

          <span
            onClick={() => navigate("/apply-now")}
            className="inline-flex items-center cursor-pointer gap-2 mt-2 text-[14px] font-extrabold text-[#003A2B]"
          >
            New Candidate? Register
            <MoveRight size={16} />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[#9CA3AF]">
        <ShieldCheck size={16} />
        <span className="text-[12px] font-medium">
          Secure AES-256 Encrypted Portal
        </span>
      </div>
    </div>
  );
}