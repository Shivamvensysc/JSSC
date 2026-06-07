import { 
  FileCheck, 
  Download, 
  CheckCircle, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Eye, 
  ShieldCheck 
} from "lucide-react";

export default function ApplicationSummaryPortal() {
  
  // Simulated document click event handers
  const handleViewFile = (fileName: string) => {
    alert(`Opening file preview object: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto space-y-6">
        
      
        {/* PORTAL CORE HEADER CONTEXT */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-transparent pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] shadow-sm text-[#1E293B]">
                <FileCheck size={26} className="text-[#0E5A44]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
                Application Summary - JTGLCCE 2026
              </h1>
            </div>
            <p className="text-[13px] font-medium text-[#64748B] pl-1">
              Review your submitted details. This document serves as a record of your registration.
            </p>
          </div>

          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2.5 px-5 h-[46px] bg-gradient-to-r from-[#0C4E3A] to-[#156E53] hover:from-[#093A2B] hover:to-[#105540] text-white rounded-lg text-[13.5px] font-bold shadow-md transition-all shrink-0 group self-stretch sm:self-auto justify-center"
          >
            <Download size={16} className="text-[#34D399] transition-transform group-hover:translate-y-0.5" />
            <span>Download PDF Application</span>
          </button>
        </div>

        {/* SYSTEM LIVE APPLICATION STATUS BANNER BAR */}
        <div className="bg-[#EBF5F1] border-2 border-[#A3D1C2] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0E5A44] flex items-center justify-center text-white shrink-0">
              <CheckCircle size={18} className="text-[#34D399]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#1E5A44] uppercase tracking-wider">
                Application Status
              </p>
              <h2 className="text-[17px] font-black text-[#0C4E3A]">
                Submitted Successfully
              </h2>
            </div>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 border-[#C2E2D8] pt-2 sm:pt-0 w-full sm:w-auto">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
              Submission Date
            </p>
            <p className="text-[14px] font-extrabold text-[#1E293B]">
              24 Oct 2025, 02:45 PM
            </p>
          </div>
        </div>

        {/* DETAILS DATA LAYOUT SPLIT GRID SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT SUB-GRID COLUMN: PERSONAL & ADDRESS METADATA (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* CARD PANEL: PERSONAL PROFILE BLOCK */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3 flex justify-between items-center">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <User size={14} className="text-[#0E5A44]" /> Personal Details
                </span>
                <span className="text-[10.5px] font-bold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] px-2 py-0.5 rounded">
                  Locked for Editing
                </span>
              </div>
              
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Full Name</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">Rajesh Kumar Sharma</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Gender</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">Male</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Date of Birth</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">15 August 1998</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Category</label>
                    <p className="text-[14.5px] font-bold text-[#1E293B] mt-0.5">General (UR)</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Domicile</label>
                    <p className="text-[14.5px] font-semibold text-[#1E293B] mt-0.5">Jharkhand</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Nationality</label>
                    <p className="text-[14.5px] font-semibold text-[#1E293B] mt-0.5">Indian</p>
                  </div>
                </div>

                <div className="border-t border-[#F1F5F9] pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Mobile Number</label>
                    <p className="text-[13.5px] font-mono font-bold text-[#1E293B] mt-0.5">+91 98765 43210</p>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Email Address</label>
                    <p className="text-[13.5px] font-bold text-[#1E293B] mt-0.5 break-all">rajesh.sharma98@email.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD PANEL: RESIDENTIAL MAILING ADDRESSES BLOCK */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#0E5A44]" /> Address Details
                </span>
              </div>
              
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
                {/* Permanent Field Content */}
                <div className="space-y-1.5 pr-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0E5A44]">
                    Permanent Address
                  </span>
                  <p className="text-[13.5px] font-medium text-[#334155] leading-relaxed">
                    Plot No. 45, Ashok Nagar,<br />
                    Near Main Road, Ranchi,<br />
                    <span className="font-bold text-[#1E293B]">Jharkhand - 834002</span>
                  </p>
                </div>

                {/* Correspondence Content Box Row */}
                <div className="space-y-1.5 pt-4 md:pt-0 md:pl-6 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#475569]">
                      Correspondence Address
                    </span>
                    <span className="text-[9px] font-black tracking-wide bg-[#E2F0EC] text-[#0E5A44] border border-[#A1D3C3] px-1.5 py-0.5 rounded-sm uppercase">
                      Same
                    </span>
                  </div>
                  <p className="text-[13.5px] font-medium text-[#334155] leading-relaxed">
                    Plot No. 45, Ashok Nagar,<br />
                    Near Main Road, Ranchi,<br />
                    <span className="font-bold text-[#1E293B]">Jharkhand - 834002</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SUB-GRID COLUMN: EXAMS & QUALIFICATIONS PREFERENCES (5 COLS) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* CARD PANEL: JOB PREFERENCES & CITIES EXAM CENTERS LIST */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#0E5A44]" /> Post & Exam Preferences
                </span>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Interactive Order Flow Badges */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#64748B] block">
                    Post Preference Order
                  </label>
                  
                  <div className="space-y-1.5">
                    {[
                      { index: 1, val: "Block Development Officer" },
                      { index: 2, val: "Supply Inspector" },
                      { index: 3, val: "Junior Secretariat Assistant" }
                    ].map((post) => (
                      <div key={post.index} className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg">
                        <span className="w-5 h-5 rounded-full bg-[#D1E7DD] text-[#0E5A44] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {post.index}
                        </span>
                        <span className="text-[13px] font-bold text-[#334155]">{post.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Locations Bullet Feed */}
                <div className="border-t border-[#F1F5F9] pt-3 space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#64748B] block">
                    Exam City Preferences
                  </label>
                  <ul className="space-y-1 text-[13px] font-semibold text-[#475569] pl-1">
                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Priority 1: <span className="text-[#1E293B] font-bold">Ranchi</span></li>
                    <li className="flex items-center gap-2"><span className="text-gray-400">•</span> Priority 2: <span className="text-[#1E293B]">Jamshedpur</span></li>
                    <li className="flex items-center gap-2"><span className="text-gray-400">•</span> Priority 3: <span className="text-[#1E293B]">Dhanbad</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CARD PANEL: EDUCATIONAL QUALIFICATIONS MATRIX TABLE */}
            <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
                <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-[#0E5A44]" /> Educational Qualifications
                </span>
              </div>
              
              <div className="p-2 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EDF2F7]">
                      <th className="p-2.5 text-[10.5px] font-black uppercase tracking-wider text-[#64748B]">Exam</th>
                      <th className="p-2.5 text-[10.5px] font-black uppercase tracking-wider text-[#64748B]">Board/Univ</th>
                      <th className="p-2.5 text-[10.5px] font-black uppercase tracking-wider text-[#64748B] text-right">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] font-medium text-[#334155] divide-y divide-[#F8FAFC]">
                    <tr>
                      <td className="p-2.5 font-bold text-[#1E293B]">10th (Matric)</td>
                      <td className="p-2.5">JAC Ranchi</td>
                      <td className="p-2.5 text-right font-mono font-bold text-[#0E5A44]">88.5%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#1E293B]">12th (Inter)</td>
                      <td className="p-2.5">CBSE New Delhi</td>
                      <td className="p-2.5 text-right font-mono font-bold text-[#0E5A44]">82.4%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#1E293B]">Graduation</td>
                      <td className="p-2.5">Ranchi Univ</td>
                      <td className="p-2.5 text-right font-mono font-bold text-[#0E5A44]">76.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* LOWER BLOCK SECTION (Derived from image_74ed34.png)                       */}
        {/* ========================================================================= */}
        
        {/* FULL PANEL SECTION: UPLOADED DIGITAL ATTACHMENTS VERIFICATION CARD */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#FAFBFB] border-b border-[#EBEFF3] px-4 py-3">
            <span className="text-[13px] font-extrabold text-[#334155] flex items-center gap-1.5">
              <FileText size={15} className="text-[#0E5A44]" /> Uploaded Documents
            </span>
          </div>

          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* DOCUMENT CARD 1: APPLICANT HEADSHOT PASSPORT PHOTO */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-gray-200 border border-gray-300 rounded overflow-hidden relative shadow-inner">
                {/* Placeholder simulation matching Unsplash asset profile configuration */}
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" 
                  alt="Passport Frame View"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="Passport_Photo.jpg">
                  Passport_Photo.jpg
                </span>
                <button 
                  onClick={() => handleViewFile("Passport_Photo.jpg")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* DOCUMENT CARD 2: DIGITAL SIGNATURE FILE */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-white border border-gray-300 rounded p-2 flex flex-col items-center justify-center relative shadow-inner">
                {/* Signature mockup using custom SVG outline */}
                <svg className="w-full h-2/3 text-[#1E3A8A]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 25 C 20 5, 30 35, 40 15 C 50 -5, 55 38, 70 20 C 80 10, 85 30, 95 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[9px] font-semibold tracking-tighter text-gray-400 absolute bottom-1 right-1 select-none">DIGITAL_SIG</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="Signature.png">
                  Signature.png
                </span>
                <button 
                  onClick={() => handleViewFile("Signature.png")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* DOCUMENT CARD 3: GRADUATION HIGHER DEGREE ATTACHMENT */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-[#EDF2F7] rounded flex flex-col items-center justify-center p-3 text-center border border-gray-200 shadow-inner">
                <FileText size={36} className="text-[#64748B] mb-2" />
                <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">PDF Document</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="Graduation_Certificate.pdf">
                  Graduation_Certifica...
                </span>
                <button 
                  onClick={() => handleViewFile("Graduation_Certificate.pdf")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

            {/* DOCUMENT CARD 4: DOMICILE PROOF RESIDENCE IDENTIFICATION */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex flex-col justify-between group">
              <div className="aspect-[4/5] bg-[#EDF2F7] rounded flex flex-col items-center justify-center p-3 text-center border border-gray-200 shadow-inner">
                <FileText size={36} className="text-[#64748B] mb-2" />
                <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">PDF Document</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-dashed border-gray-200 pt-2">
                <span className="text-[11px] font-semibold text-[#475569] truncate" title="Domicile_Proof.pdf">
                  Domicile_Proof.pdf
                </span>
                <button 
                  onClick={() => handleViewFile("Domicile_Proof.pdf")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E5A44] hover:text-[#0a3f2f] hover:underline shrink-0"
                >
                  <Eye size={12} /> View
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* LEGAL COMPLIANCE COMPONENT FRAMEWORK: SELF DECLARATION CHARTER BOX */}
        <div className="bg-[#EDF5F9] border border-[#D0E3EE] rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#2B6CB0]">
            <ShieldCheck size={18} />
            <h3 className="text-[14px] font-black uppercase tracking-wider">
              Self-Declaration
            </h3>
          </div>
          
          <blockquote className="border-l-2 border-[#A0AEC0] pl-4 text-[13px] font-medium text-[#4A5568] leading-relaxed italic">
            "I hereby declare that all the information provided in this application is true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, my candidature/appointment is liable to be cancelled/terminated."
          </blockquote>

          <div className="border-t border-[#D9E6EF] pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-[11.5px] text-[#4A5568]">
            <div className="space-y-0.5">
              <p className="font-bold text-[#718096] uppercase tracking-wide text-[10px]">Digitally Signed By</p>
              <p className="text-[13px] font-black text-[#1A202C]">RAJESH KUMAR SHARMA</p>
            </div>
            <div className="space-y-0.5 border-l-0 md:border-l border-[#D9E6EF] md:pl-6">
              <p className="font-bold text-[#718096] uppercase tracking-wide text-[10px]">Agreement Timestamp</p>
              <p className="text-[13px] font-bold text-[#1A202C]">Oct 24, 2025 - 14:45:12 (IST)</p>
            </div>
            <div className="space-y-0.5 border-l-0 md:border-l border-[#D9E6EF] md:pl-6">
              <p className="font-bold text-[#718096] uppercase tracking-wide text-[10px]">IP Address</p>
              <p className="text-[13px] font-mono font-bold text-[#1A202C]">115.124.32.110</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}