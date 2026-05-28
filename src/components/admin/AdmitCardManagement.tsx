import {
  Upload,
  ShieldCheck,
  Info,ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdmitCardManagement() {
  const navigate= useNavigate();
  return (
    <div className="min-h-screen p-1 font-sans">
      <div className="mx-auto max-w-[1380px]">
        
   <button
      onClick={() => navigate(-1)}
      className="group inline-flex items-center gap-2 rounded-xl border border-[#D7DCDA] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1F2937] shadow-sm transition-all duration-200 hover:border-[#003A2B] hover:bg-[#F0F7F4] hover:text-[#003A2B] hover:shadow-md"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6] transition-all group-hover:bg-[#003A2B]">
        <ArrowLeft
          size={15}
          className="text-[#374151] group-hover:text-white"
        />
      </div>

      Back
    </button>

        {/* PAGE HEADER */}
        <div className="mb-2 flex items-center justify-between">
          
          <div>
            <h1 className="text-[34px] font-bold tracking-tight text-[#003A2B]">
              Admit Card Management
            </h1>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-3 rounded-full border border-[#d9dddd] bg-white px-4 py-2 shadow-sm">
            
            <span className="text-[12px] font-medium text-[#6b7280]">
              Portal Status
            </span>

            {/* TOGGLE */}
            <div className="relative h-[20px] w-[38px] rounded-full bg-[#cf2d2d]">
              <div className="absolute right-[2px] top-[2px] h-4 w-4 rounded-full bg-white shadow" />
            </div>

            <span className="text-[12px] font-semibold text-[#cf2d2d]">
              unpublished
            </span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-[1.45fr_0.55fr] gap-4">
          
          {/* LEFT PANEL */}
          <div className="rounded border border-[#d7dcda] bg-white shadow-sm">
            
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-[#e4e8e6] px-4 py-3">
              
              {/* UPLOAD AREA */}
              <div className="flex items-start gap-3">
                
                <div className="mt-[2px] rounded bg-[#edf7f1] p-2">
                  <Upload
                    size={15}
                    className="text-[#0b5f44]"
                  />
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold text-[#1d2e29]">
                    Batch Upload Area
                  </h3>

                  <p className="mt-1 text-[11px] text-[#6c7773]">
                    Drop "Signed Admit Card PDF" files here to
                    process candidates.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button className="flex h-[44px] items-center gap-2 rounded bg-[#003A2B] px-5 text-[12px] font-semibold text-white shadow">
                <ShieldCheck size={16} />
                Secure Portal Access
              </button>
            </div>

            {/* DROPZONE */}
            <div className="p-4">
              <div className="rounded border border-[#e2e6e4] bg-[#f7f7f7] p-6">
                
                {/* CENTER AREA */}
                <div className="flex min-h-[470px] flex-col items-center justify-center rounded border border-[#dedede] bg-[#ececec]">
                  
                  {/* INNER MOCK CARD */}
                  <div className="relative flex h-[210px] w-[210px] items-center justify-center rounded border border-[#96d9cb] bg-[#a7fff02b] shadow-[0_0_40px_rgba(126,255,223,0.25)]">
                    
                    <div className="absolute inset-0 rounded bg-[radial-gradient(circle,rgba(145,255,226,0.20)_0%,rgba(255,255,255,0)_70%)]" />

                    {/* CENTER DOCUMENT */}
                    <div className="relative h-[110px] w-[80px] rounded border border-[#b8fff3] bg-[#d8fff7] shadow-[0_0_20px_rgba(158,255,233,0.5)]">
                      
                      <div className="mx-auto mt-3 h-[6px] w-[45px] rounded bg-[#b6f7ea]" />

                      <div className="mx-auto mt-2 h-[4px] w-[36px] rounded bg-[#b6f7ea]" />

                      <div className="mx-auto mt-2 h-[4px] w-[40px] rounded bg-[#b6f7ea]" />

                      <div className="mx-auto mt-5 h-[26px] w-[26px] rounded-full bg-[#b6f7ea]" />
                    </div>

                    {/* LEFT MINI */}
                    <div className="absolute left-[24px] top-[92px] h-[55px] w-[38px] rounded border border-[#c7fff5] bg-[#dffff8]" />

                    {/* RIGHT MINI */}
                    <div className="absolute right-[24px] top-[92px] h-[55px] w-[38px] rounded border border-[#c7fff5] bg-[#dffff8]" />
                  </div>

                  {/* TEXT */}
                  <div className="mt-8 text-center">
                    <p className="text-[13px] text-[#374151]">
                      Drag and drop signed PDFs or{" "}
                      <span className="cursor-pointer font-semibold text-[#003A2B] underline">
                        browse files
                      </span>{" "}
                      from local storage
                    </p>

                    <p className="mt-4 text-[11px] text-[#7b8782]">
                      Maximum 500 files per batch (Max 5MB each)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded border border-[#d7dcda] bg-white shadow-sm">
            
            {/* HEADER */}
            <div className="border-b border-[#e4e8e6] px-4 py-3">
              <h2 className="text-[12px] font-bold uppercase tracking-[1px] text-[#7a8682]">
                Publication Options
              </h2>
            </div>

            <div className="space-y-4 p-4">
              
              {/* NOTIFICATION */}
              <div className="rounded border border-[#d9dddd] bg-[#f8f9f8] p-4">
                
                <label className="flex items-start gap-3">
                  
                  <input
                    type="checkbox"
                    className="mt-[2px]"
                  />

                  <div>
                    <h3 className="text-[13px] font-semibold leading-6 text-[#1d2e29]">
                      Trigger Candidate Notification
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-[#6d7975]">
                      Automatically send SMS/Email alerts to
                      candidates once their cards are published.
                    </p>
                  </div>
                </label>
              </div>

              {/* SAFETY */}
              <div className="rounded border border-[#d3e5d7] bg-[#eef8f1] p-4">
                
                <div className="flex items-start gap-3">
                  
                  <div className="rounded-full bg-white p-1">
                    <Info
                      size={14}
                      className="text-[#2d6f57]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-[#1d2e29]">
                      Publication Safety
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-[#4f615a]">
                      System requires digital signature
                      verification before cards can be published
                      to the public portal.
                    </p>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-6 border-t border-[#e5e7eb]" />

              {/* VERIFIED RECORDS */}
              <div className="flex items-center justify-between">
                
                <span className="text-[12px] font-medium text-[#6b7280]">
                  Verified Records:
                </span>

                <span className="text-[14px] font-bold text-[#003A2B]">
                  12,402
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  
