import { 
  Search, 
  Printer, 
  Pencil, 
  CheckCircle2, 
  Clock3, 
  FileText, 
  GraduationCap, 
  Mail, 
  Phone 
} from "lucide-react";

const candidates = [
  {
    id: "REG-2024-0831",
    name: "Arjun Singh Malhotra",
    status: "ACTIVE",
    active: true,
  },
  {
    id: "REG-2024-7219",
    name: "Priya Deshmukh",
    status: "PENDING",
    active: false,
  },
  {
    id: "REG-2024-5502",
    name: "Vikram Rathore",
    status: "INCOMPLETE",
    active: false,
  },
];

const auditLogs = [
  {
    title: "Payment Verified",
    subtitle: "Payment Verified",
    time: "Tue Mar 28, 2024 5:58 PM",
  },
  {
    title: "Profile Updated",
    subtitle: "Candidate changed contact",
    time: "Tue Mar 28, 2024 3:20 PM",
  },
  {
    title: "Application Submitted",
    subtitle: "Application by Candidate",
    time: "Tue Mar 28, 2024 9:00 AM",
  },
];

export default function ApplicationManagement() {
  return (
    <div className="min-h-screen font-sans bg-[#F4F5F7]  px-4">
      <div className="mx-auto flex max-w-7xl gap-4">
        <div className="flex-1 rounded border border-[#b8c2bd] bg-[#f6f7f6] shadow-sm">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#d1d7d4] bg-[#eef1ef] px-5 py-4">
            <div>
              <p className="text-[11px] text-[#7c8883]">
                Application Management &gt; Candidate Lookup &gt;
                <span className="ml-1 font-semibold text-[#355b4f]">
                  Arjun Singh Malhotra
                </span>
              </p>
              <h1 className="mt-1 text-[32px] font-bold tracking-tight text-[#1f2d29]">
                Candidate Profile
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex h-[38px] items-center gap-2 rounded border border-[#bfc9c5] bg-white px-4 text-[13px] font-semibold text-[#33413d] shadow-sm hover:bg-gray-50 transition-colors">
                <Printer size={15} />
                Print
              </button>
              <button className="flex h-[38px] items-center gap-2 rounded bg-[#136a4b] px-4 text-[13px] font-semibold text-white shadow-sm hover:bg-[#0e5239] transition-colors">
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Profile Card Layout Grid */}
          <div className="grid grid-cols-[1fr_320px] gap-4 p-4">
            {/* LEFT CONTENT COLUMN */}
            <div className="space-y-4">
              
              {/* Profile details container card with structured 2-row grid mapping */}
              <div className="rounded border border-[#d6dcdc] bg-white p-4">
                <div className="flex gap-5">
                  {/* Avatar Frame Box */}
                  <div className="h-[140px] w-[110px] overflow-hidden rounded border border-[#d6dcdc] bg-[#eef2ef] shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop"
                      alt="candidate"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details Data Fields Grid split cleanly into 2 explicit rows */}
                  <div className="flex-1 space-y-4">
                    {/* ROW 1: Full Name & Registration ID */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Full Name
                        </p>
                        <p className="mt-1 text-[18px] font-semibold text-[#20302c]">
                          Arjun Singh Malhotra
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Registration ID
                        </p>
                        <p className="mt-1 text-[18px] font-semibold text-[#20302c] font-mono">
                          REG-2024-0831
                        </p>
                      </div>
                    </div>

                    {/* Horizontal Separation Dotted Rule Line */}
                    <div className="border-t border-[#f1f5f4]" />

                    {/* ROW 2: Date of Birth & Category */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Date of Birth
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#2c3a36]">
                          14 July 1998
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#7d8782]">
                          Category
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#2c3a36]">
                          General (UR)
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Educational Qualifications Card */}
              <div className="rounded border border-[#d6dcdc] bg-white">
                <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                  <GraduationCap size={16} className="text-[#355b4f]" />
                  <h2 className="text-[15px] font-semibold text-[#23312d]">
                    Educational Qualifications
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4">
                  <div>
                    <p className="text-[12px] font-semibold text-[#61716c]">
                      Post Graduation
                    </p>
                    <h3 className="mt-2 text-[18px] font-bold text-[#20302c]">
                      M.Sc. Computer Science
                    </h3>
                    <p className="mt-2 text-[13px] text-[#5d6c67]">
                      8.4 CGPA
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-[#61716c]">
                      Graduation
                    </p>
                    <h3 className="mt-2 text-[18px] font-bold text-[#20302c]">
                      B.Tech
                    </h3>
                    <p className="mt-2 text-[13px] text-[#5d6c67]">
                      NIT Jamshedpur
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-[#61716c]">
                      Higher Secondary
                    </p>
                    <h3 className="mt-2 text-[18px] font-bold text-[#20302c]">
                      CBSE (Class XII)
                    </h3>
                    <p className="mt-2 text-[13px] text-[#5d6c67]">
                      2016
                    </p>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents Card */}
              <div className="rounded border border-[#d6dcdc] bg-white">
                <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                  <FileText size={16} className="text-[#355b4f]" />
                  <h2 className="text-[15px] font-semibold text-[#23312d]">
                    Uploaded Documents
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="rounded border border-[#d5dcdc] bg-[#f8f9f8] p-2">
                    <img
                      src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=800&auto=format&fit=crop"
                      alt="SSC Marksheet Preview"
                      className="h-[140px] w-full rounded object-cover"
                    />
                    <p className="mt-2 text-center text-[12px] font-medium text-[#2d3d38]">
                      SSC Certificate
                    </p>
                  </div>

                  <div className="rounded border border-[#d5dcdc] bg-[#f8f9f8] p-2">
                    <img
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop"
                      alt="Degree Certificate Preview"
                      className="h-[140px] w-full rounded object-cover"
                    />
                    <p className="mt-2 text-center text-[12px] font-medium text-[#2d3d38]">
                      Degree Certificate
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#e3e7e5] px-4 py-3">
                  <button className="text-[13px] font-medium text-[#2c6e57] hover:underline">
                    + Add Extra Verification Document
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR PANEL */}
            <div className="space-y-4">
              
              {/* Payment Status Metric Box */}
              <div className="rounded border border-[#0f6a4c] bg-[#0d6c4b] p-5 text-white shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#cfe8de]">
                  Payment Status
                </p>
                <h2 className="mt-3 text-[36px] font-bold font-mono">₹1,200.00</h2>
                <p className="mt-1 text-[12px] text-[#d8eee6]">
                  Tamil Nadu State Bank
                </p>
                <div className="mt-5 flex items-center gap-2 rounded bg-[#0a5b3f] px-3 py-2">
                  <CheckCircle2 size={16} />
                  <span className="text-[13px] font-semibold">
                    Verified & Settled
                  </span>
                </div>
              </div>

              {/* Audit Trail Milestone Component */}
              <div className="rounded border border-[#d6dcdc] bg-white">
                <div className="flex items-center gap-2 border-b border-[#e3e7e5] px-4 py-3">
                  <Clock3 size={16} className="text-[#355b4f]" />
                  <h2 className="text-[15px] font-semibold text-[#23312d]">
                    Application Audit Trail
                  </h2>
                </div>

                <div className="space-y-6 p-5">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="relative pl-6">
                      {/* Vertical connector log timeline rule trace lines */}
                      {index !== auditLogs.length - 1 && (
                        <div className="absolute left-[7px] top-5 h-[58px] w-[2px] bg-[#d7ddda]" />
                      )}
                      {/* Anchor Dot */}
                      <div className="absolute left-0 top-1 h-[14px] w-[14px] rounded-full border-[3px] border-[#0f6a4c] bg-white" />
                      
                      <p className="text-[10px] text-[#7b8783]">
                        {log.time}
                      </p>
                      <h3 className="mt-1 text-[14px] font-semibold text-[#24322e]">
                        {log.title}
                      </h3>
                      <p className="text-[12px] text-[#64736e]">
                        {log.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}