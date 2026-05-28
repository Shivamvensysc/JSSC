import {
  Database,
  Truck,
  Mail,
  ShieldCheck,
  RefreshCw,
  FileText,
  Upload,
  FolderArchive,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const exportLogs = [
  {
    id: "EXP-2023-09412",
    time: "24 Oct 2023, 14:22:10",
    type: "Scrutinized Data",
    delivery: "Pen Drive (3 Sets)",
    status: "Completed",
  },
  {
    id: "EXP-2023-09411",
    time: "24 Oct 2023, 09:15:45",
    type: "Raw Data (All)",
    delivery: "Secure Email",
    status: "Completed",
  },
  {
    id: "EXP-2023-09408",
    time: "23 Oct 2023, 17:50:33",
    type: "Biometrics (ZIP)",
    delivery: "Pen Drive (3 Sets)",
    status: "Dispatched",
  },
];

export default function SystemDataExport() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  p-1 font-sans">
      
      <div className="mx-auto max-w-[1400px]">
        
        {/* HEADER */}
        <div className="rounded border border-[#d8dede] bg-white p-6 shadow-sm">
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
          <div className="flex items-start justify-between">
            
            <div>
              <h1 className="text-[34px] font-bold tracking-tight text-[#003A2B]">
                System Data Export
              </h1>

              <p className="mt-2 text-[14px] text-[#6B7280]">
                Configure secure data packages for institutional processing.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#e9f5ee] px-4 py-2">
              <ShieldCheck size={16} className="text-[#0B5F44]" />

              <span className="text-[12px] font-semibold text-[#0B5F44]">
                Secure Session Active
              </span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="mt-8 grid grid-cols-[1.2fr_0.9fr] gap-6">
            
            {/* LEFT */}
            <div className="space-y-5">
              
              {/* SELECT EXPORT TYPE */}
              <div className="rounded border border-[#d8dede] bg-[#fcfcfc] p-5">
                
                <div className="mb-5 flex items-center gap-3">
                  <Database size={20} className="text-[#003A2B]" />

                  <h2 className="text-[22px] font-semibold text-[#102A22]">
                    1. Select Export Type
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  
                  {/* CARD 1 */}
                  <div className="relative rounded border-2 border-[#0B5F44] bg-white p-6 shadow-sm">
                    
                    <div className="absolute right-4 top-4 h-5 w-5 rounded-full border-[6px] border-[#0B5F44]" />

                    <FolderArchive
                      size={36}
                      className="mb-5 text-[#003A2B]"
                    />

                    <h3 className="text-[18px] font-bold leading-7 text-[#102A22]">
                      Raw Data (All Applications)
                    </h3>

                    <p className="mt-4 text-[15px] leading-8 text-[#4B5563]">
                      Complete dataset including pending, incomplete,
                      and flagged entries.
                    </p>
                  </div>

                  {/* CARD 2 */}
                  <div className="relative rounded border border-[#d8dede] bg-white p-6">
                    
                    <div className="absolute right-4 top-4 h-5 w-5 rounded-full border-2 border-[#9CA3AF]" />

                    <FileText
                      size={36}
                      className="mb-5 text-[#003A2B]"
                    />

                    <h3 className="text-[18px] font-bold leading-7 text-[#102A22]">
                      Scrutinized Data
                    </h3>

                    <p className="mt-4 text-[15px] leading-8 text-[#4B5563]">
                      Valid/Fee-Confirmed records only. Prepared for
                      merit-list generation.
                    </p>
                  </div>
                </div>
              </div>

              {/* BIOMETRICS */}
              <div className="flex items-center justify-between rounded border border-[#d8dede] bg-white p-6 shadow-sm">
                
                <div className="flex items-start gap-5">
                  
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-[#edf4f1]">
                    <FolderArchive
                      size={34}
                      className="text-[#003A2B]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[22px] font-semibold text-[#102A22]">
                      Candidate Photographs and Signatures
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-[#6B7280]">
                      Compile high-resolution biometrics into a secure
                      ZIP package.
                    </p>
                  </div>
                </div>

                {/* TOGGLE */}
                <div className="relative h-8 w-14 rounded-full bg-[#D1D5DB]">
                  <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow" />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded border border-[#d8dede] bg-white p-5 shadow-sm">
              
              {/* HEADER */}
              <div className="mb-5 flex items-center gap-3">
                <Truck size={20} className="text-[#003A2B]" />

                <h2 className="text-[22px] font-semibold text-[#102A22]">
                  2. Delivery Method
                </h2>
              </div>

              <div className="space-y-5">
                
                {/* DELIVERY 1 */}
                <div className="rounded border border-[#d8dede] bg-[#fcfcfc] p-5">
                  
                  <div className="flex items-start justify-between">
                    
                    <div className="flex gap-4">
                      
                      <div className="mt-2 h-5 w-5 rounded-full border-[6px] border-[#0B5F44]" />

                      <div>
                        <h3 className="text-[18px] font-semibold leading-8 text-[#102A22]">
                          Package for Pen Drive delivery (3 sets)
                        </h3>

                        <p className="mt-2 text-[15px] leading-8 text-[#4B5563]">
                          Physical encrypted sets for internal board handover.
                        </p>
                      </div>
                    </div>

                    <Upload size={22} className="text-[#003A2B]" />
                  </div>
                </div>

                {/* DELIVERY 2 */}
                <div className="rounded border border-[#d8dede] bg-white p-5">
                  
                  <div className="flex items-start justify-between">
                    
                    <div className="flex gap-4">
                      
                      <div className="mt-2 h-5 w-5 rounded-full border-2 border-[#9CA3AF]" />

                      <div>
                        <h3 className="text-[18px] font-semibold leading-8 text-[#102A22]">
                          Secure Email Link
                        </h3>

                        <p className="mt-2 text-[15px] leading-8 text-[#4B5563]">
                          256-bit encrypted temporary link
                          (Expires in 2 hours).
                        </p>
                      </div>
                    </div>

                    <Mail size={22} className="text-[#003A2B]" />
                  </div>
                </div>

                {/* WARNING */}
                <div className="rounded border border-[#f4d0d0] bg-[#fff3f3] p-5">
                  <p className="text-[15px] leading-8 text-[#c62828]">
                    <span className="font-semibold">
                      Note:
                    </span>{" "}
                    Every export is logged with User ID and IP Address.
                    Unauthorized distribution is a breach of security
                    protocols.
                  </p>
                </div>

                {/* BUTTON */}
                <button className="flex h-[64px] w-full items-center justify-center gap-3 rounded bg-[#003A2B] text-[16px] font-semibold text-white shadow-lg transition-all hover:bg-[#00261d]">
                  <Upload size={20} />
                  Initialize Secure Export
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-8 rounded border border-[#d8dede] bg-white shadow-sm">
            
            {/* TABLE HEADER */}
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
              
              <h2 className="text-[22px] font-semibold text-[#102A22]">
                Recent Export History & Confirmation Logs
              </h2>

              <button className="flex items-center gap-2 text-[14px] font-medium text-[#0B5F44]">
                <RefreshCw size={15} />
                Refresh Logs
              </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#f9fafb] text-left">
                    
                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
                      Reference ID
                    </th>

                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
                      Timestamp
                    </th>

                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
                      Export Type
                    </th>

                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
                      Delivery
                    </th>

                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
                      Status
                    </th>

                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
                      Verification
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {exportLogs.map((log, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#eef1f0]"
                    >
                      
                      <td className="px-5 py-5 text-[14px] font-medium text-[#102A22]">
                        {log.id}
                      </td>

                      <td className="px-5 py-5 text-[14px] text-[#374151]">
                        {log.time}
                      </td>

                      <td className="px-5 py-5 text-[14px] text-[#374151]">
                        {log.type}
                      </td>

                      <td className="px-5 py-5 text-[14px] text-[#374151]">
                        {log.delivery}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-4 py-2 text-[12px] font-semibold ${
                            log.status === "Completed"
                              ? "bg-[#e8f5ec] text-[#0B5F44]"
                              : "bg-[#e7f0ff] text-[#2563EB]"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <button className="text-[14px] font-medium text-[#0B5F44] underline">
                          Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="border-t border-[#E5E7EB] px-5 py-4 text-center">
              <button className="text-[14px] font-medium text-[#374151] hover:text-[#003A2B]">
                View All Historic Exports (248)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}