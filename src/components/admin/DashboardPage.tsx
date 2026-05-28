import { MoreHorizontal, AlertCircle, TrendingUp, Calendar,FileDown , FileSpreadsheet} from "lucide-react";

export default function DashboardPage() {
  const transactions = [
    { id: "TXN-998240", time: "Nov 24, 09:12 AM", name: "Rohan Sharma", method: "Online Card", amount: "₹650.00", status: "SUCCESS", statusColor: "bg-[#E6F4EA] text-[#137333]" },
    { id: "TXN-998239", time: "Nov 24, 08:45 AM", name: "Anita Devi", method: "Challan", amount: "₹1,200.00", status: "PENDING", statusColor: "bg-[#FEF7E0] text-[#B06000]" },
    { id: "TXN-998231", time: "Nov 24, 08:21 AM", name: "Vikram Singh", method: "UPI", amount: "₹650.00", status: "SUCCESS", statusColor: "bg-[#E6F4EA] text-[#137333]" },
    { id: "TXN-998221", time: "Nov 24, 07:56 AM", name: "Priya Kumari", method: "Online Card", amount: "₹650.00", status: "FAILED", statusColor: "bg-[#FCE8E6] text-[#C5221F]" },
  ];

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Title Area */}
        <div className="flex items-start gap-4">
         
         
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[26px] font-bold text-[#111827] tracking-tight">Fee Reconciliation Report</h2>
              <span className="bg-[#E6F4EA] text-[#137333] text-[11px] font-black px-2 py-0.5 rounded uppercase">Live</span>
            </div>
            <p className="text-[14px] text-[#5F6368] mt-1">Review and audit daily financial collections across all payment channels.</p>
          </div>
        </div>

        {/* Action Controls & User Profile */}
        <div className="flex items-center gap-4">
          {/* Date Picker Mock */}
          <div className="flex items-center gap-3 bg-white border border-[#B9C2BD] px-4 py-2.5 rounded-[4px] text-[14px] font-bold text-[#374151]">
            <Calendar size={18} />
            24-11-2023
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-[#003A2B] text-white px-4 py-2.5 rounded-[4px] text-[13px] font-bold hover:bg-[#002B20]">
              <FileDown size={18} /> Export PDF
            </button>
            <button className="flex items-center gap-2 border border-[#B9C2BD] text-[#374151] px-4 py-2.5 rounded-[4px] text-[13px] font-bold hover:bg-gray-50">
              <FileSpreadsheet size={18} /> CSV
            </button>
          </div>

         
         
        </div>
      </div>

      {/* TOP METRICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Online Payment Card */}
        <div className="bg-white border border-[#E1E5E3] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[12px] font-black text-[#5F6368] uppercase tracking-widest">Online Payments</span>
            <MoreHorizontal size={20} className="text-gray-400" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-[40px] font-black text-[#003A2B] leading-none">₹1,42,850.00</h3>
              <p className="text-[14px] text-[#5F6368] mt-3">Total via UPI, Cards, NetBanking</p>
            </div>
            <div className="bg-[#E6F4EA] text-[#137333] px-3 py-2 rounded-lg flex items-center gap-1.5 font-bold text-[13px]">
              <TrendingUp size={16} /> +12.4% vs avg
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 flex gap-12">
            <div>
              <p className="text-[20px] font-bold text-[#111827]">248 Transactions</p>
              <p className="text-[12px] text-[#5F6368]">Successful completions</p>
            </div>
          </div>
        </div>

        {/* Challan Summary Card */}
        <div className="bg-white border border-[#E1E5E3] rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <span className="text-[12px] font-black text-[#5F6368] uppercase tracking-widest block mb-6">Challan Summary</span>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[24px] font-bold text-[#111827]">112 Confirmed</p>
                  <p className="text-[14px] text-[#5F6368]">₹84,200.00</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-[#111827]">88.6% Reconciliation Rate</p>
                  <div className="w-32 h-2 bg-gray-100 rounded-full mt-2">
                    <div className="h-full bg-[#137333] rounded-full w-[88%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Audit Sidebar inside card */}
          <div className="bg-[#FCE8E6] rounded-xl p-5 w-full md:w-[200px] flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-[13px] font-bold text-[#C5221F]">Pending Audit</span>
              <AlertCircle size={18} className="text-[#C5221F]" />
            </div>
            <div className="mt-4">
              <p className="text-[28px] font-black text-[#C5221F]">14</p>
              <p className="text-[13px] font-bold text-[#C5221F]">₹12,450.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white border border-[#E1E5E3] rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#E1E5E3] bg-[#FAFBFB]">
          <h4 className="text-[16px] font-bold text-[#111827]">Transaction Logs (24 Nov 2023)</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F1F3F4] text-[#5F6368] text-[12px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Candidate Name</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E5E3]">
              {transactions.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 text-[14px]">
                  <td className="px-6 py-4 font-bold text-[#111827]">{row.id}</td>
                  <td className="px-6 py-4 text-[#5F6368]">{row.time}</td>
                  <td className="px-6 py-4 font-semibold text-[#111827]">{row.name}</td>
                  <td className="px-6 py-4 text-[#5F6368]">{row.method}</td>
                  <td className="px-6 py-4 font-bold text-[#111827]">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-black tracking-wider ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#003A2B] font-bold text-[12px] hover:underline uppercase">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}