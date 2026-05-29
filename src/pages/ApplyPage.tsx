
import {  CircleAlert, MoveRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CandidateRegistrationStep1() {
  const navigate = useNavigate();
  const handleRegisterClick = ()=>{
    navigate("/candidate-login")
  }
  return (
    <div className="min-h-screen bg-[#F4F5F7] px-3 py-6 md:px-6">
      <div className="max-w-[770px] mx-auto">
        {/* CARD */}
        <div className="bg-white border border-[#BFC7C2] rounded-md overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
          {/* HEADER */}
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

          {/* BODY */}
          <div className="px-5 md:px-8 py-4">
            {/* FULL NAME */}
            <div>
              <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                Full Name (as per Matriculation certificate)
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary transition-all placeholder:text-[#6B7280]"
              />

              <div className="flex items-center gap-2 mt-2">
                <CircleAlert
                  size={14}
                  className="text-[#4B5563]"
                />

                <p className="text-[13px] text-[#4B5563]">
                  Cannot be changed after registration.
                </p>
              </div>
            </div>

            {/* DOB + MOBILE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* DOB */}
              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Date of Birth (DD/MM/YYYY)
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="relative">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 pr-12 text-[15px] outline-none focus:border-primary placeholder:text-[#111827]"
                  />
                </div>

                <p className="text-[13px] text-[#4B5563] mt-2">
                  Age will be calculated as of 01.08.2025.
                </p>
              </div>

              {/* MOBILE */}
              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Mobile Number (10-digit)
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                  <input
                    type="text"
                    placeholder="9876543210"
                    className="flex-1 py-2.5 border border-[#B9C2BD] rounded-lg sm:rounded-r-none px-4 text-[15px] outline-none focus:border-primary placeholder:text-[#6B7280]"
                  />

                  <button className="py-2.5 min-w-[145px] bg-[#D7EDF8] text-[#365B73] text-[15px] font-semibold border border-[#D7EDF8] rounded-lg sm:rounded-l-none hover:bg-[#CAE7F4] transition-all">
                    OTP Verification
                  </button>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="mt-8">
              <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                <input
                  type="email"
                  placeholder="example@domain.com"
                  className="flex-1 py-2.5 border border-[#B9C2BD] rounded-lg sm:rounded-r-none px-4 text-[15px] outline-none focus:border-primary placeholder:text-[#6B7280]"
                />

                <button className="py-2.5 min-w-[145px] bg-[#D7EDF8] text-[#365B73] text-[15px] font-semibold border border-[#D7EDF8] rounded-lg sm:rounded-l-none hover:bg-[#CAE7F4] transition-all">
                  OTP Verification
                </button>
              </div>
            </div>

            {/* PASSWORD SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* PASSWORD */}
              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary"
                />
                
                {/* Password Requirements Hint Box */}
                <div className="mt-2 bg-[#F4F6F5] border border-[#E1E5E3] rounded-lg p-4 text-[#4B5563]">
                  <p className="text-[13px] font-medium mb-1">Minimum 8 characters, include:</p>
                  <ul className="text-[13px] list-disc pl-4 space-y-1">
                    <li>1 uppercase letter</li>
                    <li>1 number</li>
                    <li>1 special character</li>
                  </ul>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                  Confirm Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full py-2.5 border border-[#B9C2BD] rounded-lg px-4 text-[15px] outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* CAPTCHA SECTION */}
            <div className="mt-4 bg-[#F4F6F5] border border-[#E1E5E3] rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Captcha Display Block */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-[140px] py-1 bg-white border border-[#B9C2BD] rounded-lg flex items-center justify-center font-serif text-[26px] italic font-bold tracking-[4px] text-[#4B5563] select-none shadow-inner">
                    K7P4N
                  </div>
                  <button className="flex items-center gap-1.5 text-[#003A2B] hover:underline text-[14px] font-semibold transition-all">
                    <RefreshCw size={14} />
                    Refresh
                  </button>
                </div>

                {/* Captcha Input Block */}
                <div className="flex-1 w-full">
                  <label className="block text-[15px] font-semibold text-[#111827] mb-3">
                    Enter CAPTCHA
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="TYPE THE CHARACTERS ABOVE"
                    className="w-full py-3 border border-[#B9C2BD] rounded-lg px-4 text-[14px] font-medium tracking-wider outline-none focus:border-primary uppercase placeholder:text-[#9CA3AF]"
                  />
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="mt-5 flex flex-col items-center gap-4">
              <button 
              onClick={handleRegisterClick}
                className="w-full py-3 bg-[#003A2B] hover:bg-[#002B20] text-white text-[18px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide shadow-md">
                Register & Generate OTP
                <MoveRight size={20} />
              </button>
              
              <p className="text-[15px] text-[#374151]">
                Already registered?{" "}
                <span 
                onClick={() => navigate("/candidate-login")}
                 className="font-bold text-[#003A2B] hover:underline">
                  Candidate Login
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}