import { LogIn, Lock, User, RefreshCw, MoveRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CandidateLogin() {
  const navigate = useNavigate();
  const handleSubmit = ()=>{
     navigate("/dashboard")
     toast.success("Candidate login successfully")
  }
  return (
    <div className="min-h-screen bg-[#F4F5F7] px-4 py-8 flex flex-col items-center justify-center gap-6">
      {/* LOGIN CARD */}
      <div className="w-full max-w-[480px] bg-white border border-[#E1E5E3] rounded-lg px-6 pt-4 pb-6 md:px-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        
        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-[24px] md:text-[26px] font-bold text-[#003A2B] tracking-[-0.5px]">
            Returning Candidate Login
          </h2>
          <p className="text-[14px] text-[#4B5563] mt-1 leading-relaxed">
            Please enter your credentials to access your dashboard.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          {/* REGISTRATION NUMBER */}
          <div>
            <label className="block text-[14px] font-semibold text-[#374151] mb-2">
              Registration Number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <User size={18} />
              </span>
              <input
                type="text"
                placeholder="Enter your registration no."
                className="w-full py-3 border border-[#B9C2BD] rounded-lg pl-11 pr-4 text-[15px] outline-none focus:border-[#003A2B] transition-all placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[14px] font-semibold text-[#374151]">
                Password
              </label>
              <a
                href="#forgot-password"
                className="text-[13px] font-bold text-[#003A2B] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <Lock size={18} />
              </span>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full py-3 border border-[#B9C2BD] rounded-lg pl-11 pr-4 text-[15px] outline-none focus:border-[#003A2B] transition-all"
              />
            </div>
          </div>

          {/* SECURITY VERIFICATION (CAPTCHA) */}
          <div className="border border-[#E1E5E3] bg-[#F9FAFB] rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[13px] font-semibold text-[#4B5563]">
                Security Verification
              </span>
              <button
                type="button"
                className="flex items-center gap-1 text-[11px] font-bold text-[#003A2B] hover:underline uppercase tracking-wider"
              >
                <RefreshCw size={12} />
                Refresh
              </button>
            </div>

            <div className="flex gap-3">
              {/* Captcha Image Display Container */}
              <div className="w-[110px] h-[48px] bg-white border border-[#D1D5DB] rounded-lg relative flex flex-wrap items-center justify-center p-1 font-serif select-none overflow-hidden shadow-inner">
                {/* Diagonal Line Grid Mesh Background Styling */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none" 
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%)',
                    backgroundSize: '8px 8px'
                  }}
                />
                <span className="text-[15px] font-black italic tracking-[3px] text-[#2D4A3E] transform -rotate-3">C M W</span>
                <span className="text-[15px] font-black italic tracking-[5px] text-[#2D4A3E] transform rotate-3 pl-2">7 N</span>
              </div>

              {/* Captcha Input */}
              <input
                type="text"
                placeholder="Enter CAPTCHA"
                className="flex-1 h-[48px] border border-[#B9C2BD] rounded-lg px-3 text-[14px] outline-none focus:border-[#003A2B] placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
           onClick={handleSubmit}
            type="submit"
            className="w-full py-3 bg-[#003A2B] hover:bg-[#002B20] text-white text-[16px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2 tracking-wide shadow-sm mt-6"
          >
            <LogIn size={18} />
            Candidate Login
          </button>
        </form>

        {/* REGISTRATION REDIRECT FOOTER */}
        <div className="mt-4 pt-2 border-t border-[#E1E5E3] text-center">
          <p className="text-[14px] text-[#4B5563]">Don't have an account yet?</p>
          <span
            
            onClick={() => navigate("/apply-now")}
            className="inline-flex items-center cursor-pointer gap-2 mt-2 text-[14px] font-extrabold text-[#003A2B] hover:underline uppercase tracking-wide transition-all"
          >
            New Candidate? Register
            <MoveRight size={16} />
          </span>
        </div>
      </div>

      {/* SECURE PORTAL BADGE */}
      <div className="flex items-center gap-1.5 text-[#9CA3AF]">
        <ShieldCheck size={16} className="text-[#9CA3AF]" />
        <span className="text-[12px] font-medium tracking-wide">
          Secure AES-256 Encrypted Portal
        </span>
      </div>
    </div>
  );
}