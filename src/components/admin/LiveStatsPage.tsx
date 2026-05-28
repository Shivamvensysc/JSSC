import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- DUMMY DATA SETS ---
const categoryData = [
  { name: "UR", count: 48500 },
  { name: "SC", count: 18200 },
  { name: "ST", count: 22400 },
  { name: "EBC-I", count: 14100 },
  { name: "OBC-II", count: 16500 },
  { name: "EWS", count: 4882 },
];

const trendData = [
  { day: "Mon", registrations: 12000 },
  { day: "Tue", registrations: 14500 },
  { day: "Wed", registrations: 13200 },
  { day: "Thu", registrations: 18900 },
  { day: "Fri", registrations: 21000 },
  { day: "Sat", registrations: 24582 },
  { day: "Sun", registrations: 20400 },
];

const feeStatusData = [
  { name: "Paid Online", value: 98800, color: "#003A2B" },
  { name: "Challan Pending", value: 19687, color: "#64748B" },
  { name: "Confirmed / Failed", value: 6095, color: "#EF4444" },
];

export default function LiveStatsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-[#0F172A]">
      <p className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
        <span
          onClick={() => navigate("/admin/admit-card-issue")}
          className="cursor-pointer hover:text-[#003A2B] transition-colors"
        >
          Admit Card Issue
        </span>

        <span className="text-[#94A3B8]">{">"}</span>

        <span
          onClick={() => navigate("/admin/new-broadcast")}
          className="cursor-pointer hover:text-[#003A2B] transition-colors"
        >
          New Broadcast
        </span>

        <span className="text-[#94A3B8]">{">"}</span>

        <span
          onClick={() => navigate("/admin/data-export-hub")}
          className="cursor-pointer font-semibold text-[#0F172A] hover:text-[#003A2B] transition-colors"
        >
          Data Export Hub
        </span>
      </p>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F172A]">
            Live Registration Statistics
          </h1>
          <p className="text-[13px] text-[#5F6368] font-medium mt-0.5">
            Real-time data visualization for current recruitment cycle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-[38px] px-4 bg-[#003A2B] hover:bg-[#002B20] text-white rounded-lg text-[13px] font-bold inline-flex items-center gap-2 shadow-sm transition-all">
            <Download size={15} /> Export Report
          </button>
          <div className="h-[38px] px-3.5 bg-white border border-[#E2E8F0] rounded-lg inline-flex items-center gap-2 text-[12.5px] font-bold text-[#475569] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Live Updates
          </div>
        </div>
      </div>

      {/* 4-COLUMN TOP METRIC STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Registrations */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
              Total Registrations
            </span>
            <Users size={18} className="text-[#64748B]" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-black tracking-tight">1,24,582</div>
            <div className="text-[11.5px] font-bold text-[#10B981] flex items-center gap-1">
              <TrendingUp size={13} /> +12% from yesterday
            </div>
          </div>
        </div>

        {/* Card 2: Valid Applications */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
              Valid Applications
            </span>
            <CheckCircle2 size={18} className="text-[#003A2B]" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-black tracking-tight">1,18,903</div>
            <div className="text-[11.5px] font-bold text-[#475569]">
              95.4% Approval Rate
            </div>
          </div>
        </div>

        {/* Card 3: Invalid/Rejected */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
              Invalid / Rejected
            </span>
            <XCircle size={18} className="text-[#EF4444]" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-black tracking-tight">5,679</div>
            <div className="text-[11.5px] font-bold text-[#EF4444]">
              -4.6% Deficit rate
            </div>
          </div>
        </div>

        {/* Card 4: Pending Fee */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
              Pending Fee
            </span>
            <Clock size={18} className="text-[#F59E0B]" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-black tracking-tight">8,210</div>
            <div className="text-[11.5px] font-bold text-[#475569]">
              Payment verification active
            </div>
          </div>
        </div>
      </div>

      {/* MID SECTION GRAPHS ROW: CATEGORY AND GENDER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Category-wise Bar Chart */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm lg:col-span-2 flex flex-col justify-between min-h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black text-[#0F172A] tracking-tight">
              Category-wise Distribution
            </h3>
            <select className="h-7 px-2 text-[11.5px] font-bold bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#475569] outline-none">
              <option>Current Batch</option>
            </select>
          </div>
          <div className="w-full h-[260px] text-[11px] font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis dataKey="name" tickLine={false} stroke="#94A3B8" />
                <YAxis tickLine={false} stroke="#94A3B8" />
                <Tooltip cursor={{ fill: "#F8FAFC" }} />
                <Bar
                  dataKey="count"
                  fill="#003A2B"
                  radius={[4, 4, 0, 0]}
                  barSize={44}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Diversity Metrics Panel */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-[14px] font-black text-[#0F172A] tracking-tight mb-4">
            Gender Diversity
          </h3>
          <div className="space-y-5 flex-1 flex flex-col justify-center">
            {/* Male metric bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12.5px] font-bold">
                <span className="text-[#475569] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-blue-50 text-blue-600 inline-flex items-center justify-center font-bold text-[10px]">
                    ♂
                  </span>{" "}
                  Male
                </span>
                <span className="text-[#0F172A]">
                  78,210{" "}
                  <span className="text-[#64748B] font-normal text-[11.5px]">
                    (62.8%)
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "62.8%" }}
                />
              </div>
            </div>

            {/* Female metric bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12.5px] font-bold">
                <span className="text-[#475569] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-rose-50 text-rose-600 inline-flex items-center justify-center font-bold text-[10px]">
                    ♀
                  </span>{" "}
                  Female
                </span>
                <span className="text-[#0F172A]">
                  45,102{" "}
                  <span className="text-[#64748B] font-normal text-[11.5px]">
                    (36.2%)
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: "36.2%" }}
                />
              </div>
            </div>

            {/* Transgender metric bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12.5px] font-bold">
                <span className="text-[#475569] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-purple-50 text-purple-600 inline-flex items-center justify-center font-bold text-[10px]">
                    ⚧
                  </span>{" "}
                  Transgender
                </span>
                <span className="text-[#0F172A]">
                  1,270{" "}
                  <span className="text-[#64748B] font-normal text-[11.5px]">
                    (1.0%)
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: "1.0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER ROW: RECENT TRENDS AND PAYMENT GATEWAY STATUS CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Daily Registration Trends Area Line Graph */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm lg:col-span-2 flex flex-col justify-between min-h-[260px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black text-[#0F172A] tracking-tight">
              Daily Registration Trends
            </h3>
            <div className="flex gap-1 bg-[#F1F5F9] p-0.5 rounded-md">
              <button className="px-2.5 py-1 text-[11px] font-bold bg-white text-[#0F172A] rounded shadow-sm">
                7D
              </button>
              <button className="px-2.5 py-1 text-[11px] font-bold text-[#64748B] hover:text-[#0F172A]">
                30D
              </button>
            </div>
          </div>
          <div className="w-full h-[170px] text-[11px] font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis dataKey="day" tickLine={false} stroke="#94A3B8" />
                <YAxis tickLine={false} stroke="#94A3B8" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#003A2B"
                  strokeWidth={2}
                  fillOpacity={0.06}
                  fill="#003A2B"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Confirmation Pie Segment Graph */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-[14px] font-black text-[#0F172A] tracking-tight mb-2">
            Fee Confirmation Status
          </h3>
          <div className="flex items-center justify-between gap-4 flex-1">
            {/* Pie Circle Graphic Structure */}
            <div className="w-[120px] h-[120px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={54}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {feeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[17px] font-black text-[#0F172A] leading-none">
                  80%
                </span>
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-wider scale-90 mt-0.5">
                  Paid
                </span>
              </div>
            </div>

            {/* Side Labels Custom Legends */}
            <div className="space-y-2.5 flex-1">
              {feeStatusData.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#334155]">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="text-[10px] font-bold text-[#64748B] pl-3.5">
                    {item.value.toLocaleString()} Applications
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
