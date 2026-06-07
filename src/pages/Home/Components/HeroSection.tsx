// // HeroSection.tsx

// import {
//   ArrowRight,
//   CalendarDays,
//   FileText,
//   GraduationCap,
//   MapPin,
//   ShieldCheck,
//   Users,
// } from "lucide-react";

// const keyDates = [
//   {
//     title: "Online Registration",
//     date: "Oct 15 - Nov 30, 2025",
//   },
//   {
//     title: "Admit Card Release",
//     date: "Jan 10, 2026",
//   },
//   {
//     title: "Exam Date",
//     date: "Feb 15, 2026",
//   },
// ];

// const stats = [
//   {
//     icon: FileText,
//     value: "1,250+",
//     label: "Total Vacancies",
//   },
//   {
//     icon: Users,
//     value: "18-35",
//     label: "Age Criteria",
//   },
//   {
//     icon: GraduationCap,
//     value: "Tech. Grad",
//     label: "Qualification",
//   },
//   {
//     icon: MapPin,
//     value: "Jharkhand",
//     label: "Work Location",
//   },
// ];

// export default function HeroSection() {
//   return (
//     <section className="w-full bg-primary">
//       {/* HERO AREA */}
//       <div
//         className="
//           relative overflow-hidden
//           bg-gradient-to-r
//           from-primary
//           via-primary
//           to-primary-light
//         "
//       >
//         <div className="mx-auto flex max-w-[1600px] flex-col gap-12 px-4 py-10 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-14">
//           {/* LEFT CONTENT */}
//           <div className="max-w-[650px]">
//             {/* TOP BADGES */}
//             <div className="flex flex-wrap items-center gap-3">
//               <span
//                 className="
//                   rounded-full
//                   bg-[#C7F7E7]
//                   px-4
//                   py-[7px]
//                   text-[10px]
//                   font-bold
//                   uppercase
//                   tracking-[0.5px]
//                   text-primary
//                 "
//               >
//                 Official Examination Portal
//               </span>

//               <span
//                 className="
//                   rounded-full
//                   bg-white/15
//                   px-4
//                   py-[7px]
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.4px]
//                   text-white
//                   backdrop-blur-sm
//                 "
//               >
//                 Advt No. 05/2026
//               </span>
//             </div>

//             {/* MAIN HEADING */}
//             <h1
//               className="
//                 mt-7
//                 max-w-[620px]
//                 text-[34px]
//                 font-bold
//                 leading-[1.1]
//                 tracking-[-1px]
//                 text-white
//                 sm:text-[44px]
//                 lg:text-[56px]
//               "
//             >
//               Jharkhand Technical Graduate Level Combined Competitive
//               Examination 2026
//             </h1>

//             {/* DESCRIPTION */}
//             <p
//               className="
//                 mt-7
//                 max-w-[560px]
//                 text-[15px]
//                 font-medium
//                 leading-[30px]
//                 text-text-secondary
//                 sm:text-[16px]
//               "
//             >
//               A prestigious recruitment initiative by the Jharkhand Staff
//               Selection Commission for technical graduate positions across
//               various state departments.
//             </p>

//             {/* ACTION BUTTONS */}
//             <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
//               {/* APPLY BUTTON */}
//               <button
//                 className="
//                   flex h-[54px] w-full items-center justify-center gap-3
//                   bg-[#D4FFE7]
//                   px-7
//                   text-[15px]
//                   font-semibold
//                   text-primary
//                   transition-all duration-200
//                   hover:bg-white
//                   sm:w-fit
//                 "
//               >
//                 Apply Now
//                 <ArrowRight size={18} />
//               </button>

//               {/* PDF BUTTONS */}
//               <div className="flex flex-col gap-4 sm:flex-row">
//                 <button
//                   className="
//                     flex h-[48px] items-center justify-center gap-2
//                     border border-white/10
//                     bg-white/10
//                     px-5
//                     text-[13px]
//                     font-semibold
//                     text-white
//                     backdrop-blur-sm
//                     transition-all duration-200
//                     hover:bg-white/20
//                   "
//                 >
//                   <ShieldCheck size={15} />
//                   Regular Vacancy PDF
//                 </button>

//                 <button
//                   className="
//                     flex h-[48px] items-center justify-center gap-2
//                     border border-white/10
//                     bg-white/10
//                     px-5
//                     text-[13px]
//                     font-semibold
//                     text-white
//                     backdrop-blur-sm
//                     transition-all duration-200
//                     hover:bg-white/20
//                   "
//                 >
//                   <ShieldCheck size={15} />
//                   Backlog Vacancy PDF
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT CARD */}
//           <div
//             className="
//               w-full
//               max-w-[420px]
//               bg-white/5
//               p-5
//               backdrop-blur-sm
//               lg:mt-8
//             "
//           >
//             {/* CARD TITLE */}
//             <div className="flex items-center gap-3">
//               <CalendarDays size={22} className="text-white" />

//               <h3 className="text-[28px] font-semibold text-white">
//                 Key Dates
//               </h3>
//             </div>

//             {/* DATE LIST */}
//             <div className="mt-6 space-y-4">
//               {keyDates.map((item) => (
//                 <div
//                   key={item.title}
//                   className="
//                     flex items-center justify-between
//                     bg-white/10
//                     px-5
//                     py-5
//                   "
//                 >
//                   <span className="text-[15px] font-semibold text-white">
//                     {item.title}
//                   </span>

//                   <span className="text-[14px] font-medium text-text-secondary">
//                     {item.date}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STATS SECTION */}
//       <div className="bg-[#F5F5F5] px-4 pb-8 sm:px-6 md:px-8 lg:px-10">
//         <div
//           className="
//             mx-auto
//             grid
//             max-w-[1600px]
//             grid-cols-1
//             gap-4
//             sm:grid-cols-2
//             lg:grid-cols-4
//           "
//         >
//           {stats.map((item) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.label}
//                 className="
//                   flex flex-col items-center justify-center
//                   border border-[#D9D9D9]
//                   bg-white
//                   px-6
//                   py-8
//                   text-center
//                 "
//               >
//                 <Icon size={28} className="text-primary" />

//                 <h4
//                   className="
//                     mt-4
//                     text-[38px]
//                     font-bold
//                     tracking-[-1px]
//                     text-primary
//                   "
//                 >
//                   {item.value}
//                 </h4>

//                 <p
//                   className="
//                     mt-1
//                     text-[14px]
//                     font-medium
//                     text-[#6A6A6A]
//                   "
//                 >
//                   {item.label}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }




import {
  ArrowRight,
  CalendarDays,
  FileText,
  GraduationCap,
  MapPin,
  Users,
  ChevronRight,
  Sparkles,
  Clock,
  Award,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const keyDates = [
  {
    title: "Online Registration Starts",
    date: "Oct 15, 2025",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    title: "Registration Ends",
    date: "Nov 30, 2025",
    time: "11:59 PM",
    status: "upcoming",
  },
  {
    title: "Admit Card Release",
    date: "Jan 10, 2026",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    title: "Examination Date",
    date: "Feb 15, 2026",
    time: "09:00 AM",
    status: "important",
  },
];

const stats = [
  {
    icon: FileText,
    value: "1,250+",
    label: "Total Vacancies",
    trend: "+15% from last year",
  },
  {
    icon: Users,
    value: "18-35",
    label: "Age Criteria",
    trend: "As on Aug 1, 2025",
  },
  {
    icon: GraduationCap,
    value: "B.E./B.Tech",
    label: "Qualification",
    trend: "Recognized University",
  },
  {
    icon: MapPin,
    value: "Jharkhand",
    label: "Work Location",
    trend: "State-wide Posting",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  // const [currentDateIndex, setCurrentDateIndex] = useState(0);
  console.log(scrolled)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/65 via-primary/70 to-primary-dark/80">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>

      {/* HERO AREA */}
      <div className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* LEFT CONTENT */}
            <div className="flex-1 max-w-3xl">
              {/* TOP BADGES */}
              <div className="flex flex-wrap items-center gap-3 mb-6 animate-fadeIn">
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-300 border border-yellow-400/30">
                  <Sparkles size={12} />
                  Official Examination Portal
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/20">
                  <Award size={12} />
                  Advt No. 05/2026
                </span>
              </div>

              {/* MAIN HEADING */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold text-white leading-tight tracking-tight animate-slideUp">
                Jharkhand Technical
                <span className="block text-yellow-400 mt-2">
                  Graduate Level Combined
                </span>
                <span className="block">Competitive Exam 2026</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl animate-slideUp animation-delay-100">
                A prestigious recruitment initiative by the Jharkhand Staff
                Selection Commission for technical graduate positions across
                various state departments. Join us in building a better Jharkhand.
              </p>

           
           

              {/* ACTION BUTTONS */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slideUp animation-delay-300">
                <button
                 onClick={() => navigate("/apply-now")}
                   className="group relative overflow-hidden bg-yellow-400 text-primary px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <span className="relative z-10">Apply Now</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={()=> navigate('/candidate-login')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300 group">
                    <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
                    Already Register Candidate 
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT CARD - KEY DATES */}
            <div className="lg:w-[420px] animate-slideRight">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                {/* CARD HEADER */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CalendarDays size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-primary text-xl font-bold">Key Dates</h3>
                      <p className="text-primary/80 text-xs">Mark your calendar</p>
                    </div>
                  </div>
                </div>

                {/* DATE LIST */}
                <div className="divide-y divide-white/10">
                  {keyDates.map((item) => (
                    <div
                      key={item.title}
                      className={`p-5 transition-all duration-300 hover:bg-white/5 ${
                        item.status === 'important' ? 'bg-yellow-400/10' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={12} className={item.status === 'important' ? 'text-yellow-400' : 'text-text-secondary'} />
                            <span className="text-text-secondary text-xs">{item.time}</span>
                          </div>
                          <h4 className="text-white font-semibold text-sm">
                            {item.title}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-base">
                            {item.date}
                          </div>
                          {item.status === 'important' && (
                            <span className="inline-flex items-center gap-1 text-yellow-400 text-xs font-semibold mt-1">
                              <Sparkles size={10} />
                              Important
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CARD FOOTER */}
                <div className="bg-white/5 px-6 py-3">
                  <button className="w-full text-center text-text-secondary text-xs hover:text-white transition-colors flex items-center justify-center gap-1 group">
                    View Complete Schedule
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm mt-8 rounded-t-3xl">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Why Choose JTGLCCE?
            </h2>
            <p className="text-slate-600 text-sm">Key highlights of the recruitment drive</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
                  
                  <div className="p-6 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h4 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {item.value}
                    </h4>
                    
                    <p className="text-slate-700 font-semibold text-sm mb-1">
                      {item.label}
                    </p>
                    
                    <p className="text-slate-500 text-xs">
                      {item.trend}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-slideRight {
          animation: slideRight 0.6s ease-out;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-slideUp,
          .animate-slideRight {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
