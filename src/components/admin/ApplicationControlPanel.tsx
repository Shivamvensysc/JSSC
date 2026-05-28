import {
  AlertTriangle,
  CalendarDays,
  FileDown,
  Pencil,
  ShieldCheck,
} from "lucide-react";

const logs = [
  {
    timestamp: "2023-11-01\n14:22:10",
    action: "Window Extension (+5 Days)",
    officer: "ISSC_ADM_004",
    status: "Active",
    reference: "REG_2011_EX",
  },
  {
    timestamp: "2023-10-25\n11:30:42",
    action: "Correction Window",
    officer: "ISSC_SYS_001",
    status: "Active",
    reference: "WIN_CORR_03",
  },
];

export default function ApplicationControlPanel() {
  return (
    <div className="min-h-screen  font-sans">
      <div className="mx-auto max-w-[1320px] space-y-2">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-[1.6fr_1fr] gap-4">
          
          {/* LEFT SIDE */}
          <div className="space-y-4">
            
            {/* REGISTRATION WINDOW */}
            <div className="rounded border border-[#cfd5d2] bg-white shadow-sm">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#dfe4e2] px-4 py-3">
                <h2 className="text-[18px] font-semibold text-[#1c2d28]">
                  Current Registration Window
                </h2>

                <div className="rounded-full border border-[#9dd5b8] bg-[#ebfaf1] px-3 py-1 text-[10px] font-bold tracking-wide text-[#137348]">
                  ● STATUS: OPEN
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-8 px-4 py-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#7b8782]">
                    Commission Start Date
                  </p>

                  <h3 className="mt-2 text-[42px] font-bold leading-none text-[#172823]">
                    12
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[20px] font-semibold text-[#1f2d29]">
                      OCT
                    </span>

                    <span className="text-[20px] font-semibold text-[#1f2d29]">
                      2023
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#7b8782]">
                    09:00 AM IST
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#7b8782]">
                    Final Closing Date
                  </p>

                  <h3 className="mt-2 text-[42px] font-bold leading-none text-[#172823]">
                    15
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[20px] font-semibold text-[#1f2d29]">
                      NOV
                    </span>

                    <span className="text-[20px] font-semibold text-[#1f2d29]">
                      2023
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#7b8782]">
                    11:59 PM IST
                  </p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="border-t border-[#e3e7e5] px-4 py-4">
                <p className="text-[13px] leading-6 text-[#4e5f59]">
                  Registration is currently processing at an average rate of
                  <span className="font-semibold text-[#1f2d29]">
                    {" "}
                    450 candidates/hour.
                  </span>{" "}
                  No system bottlenecks reported.
                </p>
              </div>
            </div>

            {/* EXTEND LAST DATE */}
            <div className="rounded border border-[#cfd5d2] bg-white shadow-sm">
              <div className="border-b border-[#e1e6e4] px-4 py-3">
                <h2 className="text-[18px] font-semibold text-[#1d2e29]">
                  Extend Last Date
                </h2>
              </div>

              <div className="space-y-5 p-4">
                
                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#6d7975]">
                      New Closing Date
                    </label>

                    <input
                      type="date"
                      defaultValue="2023-10-20"
                      className="h-[46px] w-full rounded border border-[#d5dbd8] px-3 text-[14px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#6d7975]">
                      New Closing Time (IST)
                    </label>

                    <input
                      type="time"
                      defaultValue="23:59"
                      className="h-[46px] w-full rounded border border-[#d5dbd8] px-3 text-[14px] outline-none"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#6d7975]">
                    Mandatory Reason For Extension
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Specify technical grounds or official directive ID..."
                    className="w-full rounded border border-[#d5dbd8] p-3 text-[14px] outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button className="h-[42px] rounded border border-[#cfd6d2] px-5 text-[13px] font-semibold text-[#42514c]">
                    Discard Changes
                  </button>

                  <button className="h-[42px] rounded bg-[#0b5f44] px-5 text-[13px] font-semibold text-white">
                    Confirm Extension
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            
            {/* EMERGENCY CONTROLS */}
            <div className="rounded border border-[#0b5f44] bg-[#0c5f44] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#1c7a59] px-4 py-3">
                <h2 className="text-[18px] font-semibold text-white">
                  Emergency Controls
                </h2>

                <ShieldCheck className="text-[#8fe0bc]" size={20} />
              </div>

              <div className="px-4 py-4">
                <p className="text-[13px] leading-6 text-[#d7eee5]">
                  Instant global override to suspend all registration
                  activities. Requires senior officer authorization.
                </p>

                <button className="mt-6 flex h-[54px] w-full items-center justify-center gap-3 rounded bg-[#e32727] text-[14px] font-bold uppercase tracking-wide text-white shadow">
                  <AlertTriangle size={18} />
                  Immediate Portal Closure
                </button>

                <div className="mt-6 flex items-start gap-2">
                  <div className="mt-[2px] h-[10px] w-[10px] rounded-full bg-[#32d67b]" />

                  <p className="text-[11px] leading-5 text-[#d7eee5]">
                    Action will be logged to State Home Department Audit
                    Archive.
                  </p>
                </div>
              </div>
            </div>

            {/* CORRECTION WINDOW */}
            <div className="rounded border border-[#cfd5d2] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#dfe4e2] px-4 py-3">
                <h2 className="text-[18px] font-semibold text-[#1c2d28]">
                  Correction Window
                </h2>

                <div className="rounded border border-[#9ec8ff] bg-[#eef5ff] px-2 py-1 text-[10px] font-bold text-[#2b6fd6]">
                  SCHEDULED
                </div>
              </div>

              <div className="p-4">
                
                {/* Current Override */}
                <div className="rounded border border-[#d8dede] bg-[#f8f9f8] p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="mt-1 rounded bg-white p-2 shadow-sm">
                        <CalendarDays
                          size={16}
                          className="text-[#335d50]"
                        />
                      </div>

                      <div>
                        <h3 className="text-[13px] font-semibold text-[#21312d]">
                          Current Overrides
                        </h3>

                        <p className="mt-1 text-[11px] text-[#60706b]">
                          Manual override by Admin Head
                        </p>
                      </div>
                    </div>

                    <button className="flex items-center gap-1 text-[12px] font-semibold text-[#2d6f57]">
                      <Pencil size={13} />
                      Edit
                    </button>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded border border-[#d8dede] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#7a8782]">
                      Start
                    </p>

                    <h4 className="mt-2 text-[18px] font-semibold text-[#20302c]">
                      20 NOV 2023
                    </h4>
                  </div>

                  <div className="rounded border border-[#d8dede] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#7a8782]">
                      End
                    </p>

                    <h4 className="mt-2 text-[18px] font-semibold text-[#20302c]">
                      25 NOV 2023
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AUDIT LOG */}
        <div className="rounded border border-[#cfd5d2] bg-white shadow-sm">
          
          <div className="flex items-center justify-between border-b border-[#e1e6e4] px-4 py-3">
            <div>
              <h2 className="text-[18px] font-semibold text-[#1d2e29]">
                Audit Log
              </h2>

              <p className="mt-1 text-[12px] text-[#6a7672]">
                Record of configuration changes and administrative overrides
              </p>
            </div>

            <button className="flex h-[38px] items-center gap-2 rounded border border-[#d2d8d5] bg-white px-4 text-[12px] font-semibold text-[#394944]">
              <FileDown size={15} />
              Export PDF Report
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              
              <thead>
                <tr className="border-b border-[#e3e7e5] bg-[#f7f8f7] text-left">
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#66736f]">
                    Timestamp
                  </th>

                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#66736f]">
                    Action Performed
                  </th>

                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#66736f]">
                    Officer ID
                  </th>

                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#66736f]">
                    System Status
                  </th>

                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#66736f]">
                    Reference
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#edf0ef]"
                  >
                    <td className="whitespace-pre-line px-4 py-4 text-[12px] text-[#3f4e49]">
                      {log.timestamp}
                    </td>

                    <td className="px-4 py-4 text-[13px] font-medium text-[#1f2f2a]">
                      {log.action}
                    </td>

                    <td className="px-4 py-4 text-[12px] font-semibold text-[#234338]">
                      {log.officer}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1f7a4f]">
                        <div className="h-[8px] w-[8px] rounded-full bg-[#20b26b]" />
                        {log.status}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-[12px] text-[#56655f]">
                      {log.reference}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}