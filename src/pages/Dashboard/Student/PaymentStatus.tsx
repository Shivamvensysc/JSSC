// // src/pages/Dashboard/PaymentStatus.tsx

// import React from "react";
// import { DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";

// const PaymentStatus: React.FC = () => {
//   const payments = [
//     {
//       id: 1,
//       item: "Semester 1 Tuition Fee",
//       amount: "$2,500",
//       status: "paid",
//       date: "2024-01-10",
//     },
//     {
//       id: 2,
//       item: "Exam Fee",
//       amount: "$150",
//       status: "pending",
//       date: "2024-01-15",
//     },
//     {
//       id: 3,
//       item: "Library Fee",
//       amount: "$50",
//       status: "overdue",
//       date: "2024-01-05",
//     },
//   ];

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "paid":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "pending":
//         return <Clock className="w-5 h-5 text-yellow-500" />;
//       case "overdue":
//         return <AlertCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-100 text-green-700";
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "overdue":
//         return "bg-red-100 text-red-700";
//       default:
//         return "";
//     }
//   };

//   const totalPaid = payments
//     .filter((p) => p.status === "paid")
//     .reduce(
//       (sum, p) => sum + parseFloat(p.amount.replace("$", "").replace(",", "")),
//       0,
//     );
//   const totalPending = payments
//     .filter((p) => p.status !== "paid")
//     .reduce(
//       (sum, p) => sum + parseFloat(p.amount.replace("$", "").replace(",", "")),
//       0,
//     );

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
//           Payment Status
//         </h1>
//         <p className="text-slate-600 mt-2">Track your fee payments</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <div className="bg-green-50 rounded-xl p-6 border border-green-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-600 text-sm">Total Paid</p>
//               <p className="text-slate-800 text-2xl font-bold">
//                 ${totalPaid.toLocaleString()}
//               </p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-green-500" />
//           </div>
//         </div>
//         <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-600 text-sm">Pending Amount</p>
//               <p className="text-slate-800 text-2xl font-bold">
//                 ${totalPending.toLocaleString()}
//               </p>
//             </div>
//             <DollarSign className="w-8 h-8 text-yellow-500" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="text-left px-6 py-4 text-slate-700 font-semibold">
//                   Item
//                 </th>
//                 <th className="text-left px-6 py-4 text-slate-700 font-semibold">
//                   Amount
//                 </th>
//                 <th className="text-left px-6 py-4 text-slate-700 font-semibold">
//                   Due Date
//                 </th>
//                 <th className="text-left px-6 py-4 text-slate-700 font-semibold">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((payment) => (
//                 <tr
//                   key={payment.id}
//                   className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
//                 >
//                   <td className="px-6 py-4 text-slate-700">{payment.item}</td>
//                   <td className="px-6 py-4 text-slate-700 font-semibold">
//                     {payment.amount}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{payment.date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       {getStatusIcon(payment.status)}
//                       <span
//                         className={`capitalize px-2 py-1 rounded text-sm ${getStatusColor(payment.status)}`}
//                       >
//                         {payment.status}
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentStatus;





import React, { useState } from "react";
import { 
  Wallet, 
  CheckCircle2, 
  Clock9, 
  AlertTriangle, 
  FileDown, 
  Printer,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownLeft,
  ReceiptText,
  CreditCard as CreditCardIcon,
  Banknote,
  UserCheck,
  ShieldCheck,
  Trophy,
  HeartHandshake,
  CalendarDays,
  CircleDollarSign,
  FileCheck2,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  status: "success" | "pending" | "failed";
  reference: string;
  mode?: "online" | "offline" | "adjustment";
}

interface CategoryDetail {
  name: string;
  code: string;
  benefits: string[];
  feeMultiplier: number;
}

const PaymentStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "history">("overview");
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");

  // Current user data
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar Sharma",
    applicationId: "JTGLCCE2026001234",
    currentCategory: {
      main: "OBC (Non-Creamy Layer)",
      code: "obc",
      subCategory: "",
      hasPwD: false,
      hasExServiceman: false,
      hasSportsQuota: false,
    },
    feeStructure: {
      baseFee: 600,
      payableAmount: 600,
      paidAmount: 600,
      pendingAmount: 0,
      lastPaymentDate: "2024-01-15",
    }
  });

  // Available categories for change
  const availableCategories: CategoryDetail[] = [
    { name: "Unreserved (General)", code: "general", benefits: [], feeMultiplier: 1 },
    { name: "OBC (Non-Creamy Layer)", code: "obc", benefits: ["Age relaxation: 3 years"], feeMultiplier: 1 },
    { name: "Scheduled Caste (SC)", code: "sc", benefits: ["Age relaxation: 5 years", "Fee concession: 50%"], feeMultiplier: 0.5 },
    { name: "Scheduled Tribe (ST)", code: "st", benefits: ["Age relaxation: 5 years", "Fee concession: 50%"], feeMultiplier: 0.5 },
    { name: "EWS", code: "ews", benefits: ["Fee concession: 25%"], feeMultiplier: 0.75 },
  ];

  // Transaction history
  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      date: "2024-01-15",
      description: "Application Fee Payment",
      amount: 600,
      type: "debit",
      status: "success",
      reference: "HDFC123456789",
      mode: "online"
    },
    {
      id: "TXN002",
      date: "2024-01-10",
      description: "Initial Registration",
      amount: 0,
      type: "credit",
      status: "success",
      reference: "REG001",
      mode: "adjustment"
    }
  ]);

  // Category change requests history
  const [changeRequests] = useState([
    {
      id: 1,
      date: "2024-01-20",
      fromCategory: "General",
      toCategory: "OBC",
      status: "approved",
      feeDifference: 0,
      remark: "Certificate verified"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "success":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"><CheckCircle2 size={12} /> Paid</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700"><Clock9 size={12} /> Pending</span>;
      case "failed":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"><AlertTriangle size={12} /> Failed</span>;
      default:
        return null;
    }
  };

  const getPaymentModeIcon = (mode?: string) => {
    switch(mode) {
      case "online": return <CreditCardIcon size={14} className="text-blue-500" />;
      case "offline": return <Banknote size={14} className="text-green-500" />;
      default: return <ReceiptText size={14} className="text-gray-400" />;
    }
  };

  const calculateNewFee = (categoryCode: string) => {
    const category = availableCategories.find(c => c.code === categoryCode);
    return userData.feeStructure.baseFee * (category?.feeMultiplier || 1);
  };

  const handleCategoryChange = () => {
    const newFee = calculateNewFee(selectedCategory);
    // const difference = userData.feeStructure.payableAmount - newFee;
    
    setUserData({
      ...userData,
      currentCategory: { ...userData.currentCategory, code: selectedCategory, main: availableCategories.find(c => c.code === selectedCategory)?.name || "" },
      feeStructure: {
        ...userData.feeStructure,
        payableAmount: newFee,
        pendingAmount: Math.max(0, newFee - userData.feeStructure.paidAmount)
      }
    });
    setShowChangeModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Payment Dashboard</h1>
              <p className="text-slate-500 text-sm mt-1">Manage your fee payments and track transaction history</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
              >
                <Printer size={16} />
                Print
              </button>
              <button 
                onClick={() => {}}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
              >
                <FileDown size={16} />
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-emerald-600">✓</span>
            </div>
            <p className="text-slate-500 text-sm">Total Paid</p>
            <p className="text-2xl font-bold text-slate-800">₹{userData.feeStructure.paidAmount}</p>
            <p className="text-xs text-slate-400 mt-1">Last payment: {userData.feeStructure.lastPaymentDate}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock9 className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-slate-500 text-sm">Pending Amount</p>
            <p className="text-2xl font-bold text-slate-800">₹{userData.feeStructure.pendingAmount}</p>
            {userData.feeStructure.pendingAmount > 0 && (
              <button className="text-xs text-emerald-600 font-medium mt-2 hover:underline">Pay now →</button>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <CircleDollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-slate-500 text-sm">Base Fee</p>
            <p className="text-2xl font-bold text-slate-800">₹{userData.feeStructure.baseFee}</p>
            <p className="text-xs text-slate-400 mt-1">As per notification</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <ReceiptText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-slate-500 text-sm">Payable Amount</p>
            <p className="text-2xl font-bold text-slate-800">₹{userData.feeStructure.payableAmount}</p>
            {userData.feeStructure.payableAmount !== userData.feeStructure.baseFee && (
              <p className="text-xs text-green-600 mt-1">After category benefits</p>
            )}
          </div>
        </div>

        {/* Category Information Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-200 text-sm">Current Category</p>
                <h3 className="text-xl font-bold">{userData.currentCategory.main}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.currentCategory.hasPwD && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs"><HeartHandshake size={12} /> PwD</span>
                  )}
                  {userData.currentCategory.hasExServiceman && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs"><ShieldCheck size={12} /> Ex-Serviceman</span>
                  )}
                  {userData.currentCategory.hasSportsQuota && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs"><Trophy size={12} /> Sports Quota</span>
                  )}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowChangeModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-800 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition-all shadow-md"
            >
              <RefreshCcw size={16} />
              Request Category Change
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === "overview" 
                ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === "transactions" 
                ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === "history" 
                ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Category Change Requests
          </button>
        </div>

        {/* Tab Content: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Payment Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <CalendarDays size={18} className="text-emerald-500" />
                Payment Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="space-y-6">
                  {transactions.filter(t => t.amount > 0).map((transaction) => (
                    <div key={transaction.id} className="relative flex items-start gap-4">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ArrowDownLeft size={16} className="text-emerald-600" />
                      </div>
                      <div className="flex-1 bg-slate-50 rounded-xl p-4">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <p className="font-semibold text-slate-800">{transaction.description}</p>
                            <p className="text-xs text-slate-400 mt-1">{transaction.date}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {getPaymentModeIcon(transaction.mode)}
                              <code className="text-xs text-slate-500">{transaction.reference}</code>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-600">₹{transaction.amount}</p>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Fee Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Base Application Fee</span>
                  <span className="font-medium">₹{userData.feeStructure.baseFee}</span>
                </div>
                {userData.feeStructure.baseFee !== userData.feeStructure.payableAmount && (
                  <div className="flex justify-between py-2 text-green-600">
                    <span className="flex items-center gap-1">Category Concession <CheckCircle2 size={14} /></span>
                    <span>- ₹{userData.feeStructure.baseFee - userData.feeStructure.payableAmount}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-slate-200 font-bold">
                  <span>Total Payable</span>
                  <span className="text-emerald-600">₹{userData.feeStructure.payableAmount}</span>
                </div>
                <div className="flex justify-between py-2 text-emerald-600">
                  <span>Amount Paid</span>
                  <span>₹{userData.feeStructure.paidAmount}</span>
                </div>
                {userData.feeStructure.pendingAmount > 0 && (
                  <div className="flex justify-between py-2 text-amber-600">
                    <span>Balance Due</span>
                    <span>₹{userData.feeStructure.pendingAmount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Transactions */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Description</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Reference</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-600">{transaction.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === "debit" ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownLeft size={14} className="text-blue-500" />}
                          <span className="text-sm text-slate-700">{transaction.description}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded">{transaction.reference}</code>
                      </td>
                      <td className={`px-6 py-4 text-right font-semibold text-sm ${transaction.type === "debit" ? "text-emerald-600" : "text-blue-600"}`}>
                        {transaction.type === "debit" ? "-" : "+"}₹{transaction.amount}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(transaction.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Category Change History */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {changeRequests.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {changeRequests.map((request) => (
                  <div key={request.id} className="p-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                        <RefreshCcw size={18} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Category Change Request</p>
                        <p className="text-sm text-slate-500">From {request.fromCategory} to {request.toCategory}</p>
                        <p className="text-xs text-slate-400">{request.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {request.feeDifference !== 0 && (
                        <p className={`text-sm font-medium ${request.feeDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {request.feeDifference > 0 ? '+' : ''}₹{Math.abs(request.feeDifference)}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle2 size={12} />
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck2 size={24} className="text-slate-400" />
                </div>
                <p className="text-slate-500">No category change requests yet</p>
              </div>
            )}
          </div>
        )}

        {/* Category Change Modal */}
        {showChangeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-800">Request Category Change</h3>
                <p className="text-slate-500 text-sm mt-1">Select your eligible category</p>
              </div>
              <div className="p-6 space-y-4">
                {availableCategories.map((category) => (
                  <label key={category.code} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${selectedCategory === category.code ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                    <input
                      type="radio"
                      name="category"
                      value={category.code}
                      checked={selectedCategory === category.code}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mt-0.5 w-4 h-4 text-emerald-600"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{category.name}</p>
                      {category.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {category.benefits.map((benefit, idx) => (
                            <span key={idx} className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{benefit}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-slate-500 mt-2">Fee: ₹{userData.feeStructure.baseFee * category.feeMultiplier}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="p-6 border-t border-slate-100 flex gap-3">
                <button
                  onClick={handleCategoryChange}
                  className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
                >
                  Submit Request
                </button>
                <button
                  onClick={() => setShowChangeModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <HeartHandshake size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Need assistance with payment?</p>
              <p className="text-xs text-blue-600 mt-1">Contact our support team at <strong>support@jtsglcce.in</strong> or call <strong>1800-XXX-XXXX</strong></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentStatus;