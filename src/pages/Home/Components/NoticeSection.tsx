import { CircleHelp, Download, Mail, PlayCircle, Calendar, Clock,  Bell, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

const notices = [
  {
    date: "12",
    month: "OCT",
    year: "2024",
    title: "Detailed Advertisement No. 05/2026 for JTGLCCE",
    description:
      "Complete guidelines regarding eligibility, reservation, and examination pattern are now available for download. Get all the essential information for your application.",
    isNew: true,
    isImportant: true,
    category: "Advertisement",
  },
  {
    date: "10",
    month: "OCT",
    year: "2024",
    title: "Revised Syllabus for Technical Assistant Posts",
    description:
      "Minor corrections in Section B (Technical Subjects) for Agriculture and Horticulture streams. Updated syllabus now available.",
    isNew: false,
    isImportant: false,
    category: "Syllabus",
  },
  {
    date: "05",
    month: "OCT",
    year: "2024",
    title: "Instruction Manual for Online Application Form",
    description:
      "Step-by-step pictorial guide for successful registration and payment process. Follow the instructions carefully to avoid errors.",
    isNew: false,
    isImportant: true,
    category: "Guide",
  },
];

export default function NoticeSection() {
  const [hoveredNotice, setHoveredNotice] = useState<number | null>(null);

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <Bell size={14} className="text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">Latest Updates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
            Important Notices & Announcements
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Stay updated with the latest notifications, syllabus changes, and important dates for JTGLCCE 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT SECTION - NOTICES (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bell size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                      Notices & Circulars
                  </h2>
                </div>
                
                <button className="text-white text-sm font-semibold hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1 group">
                  View All Announcements
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* NOTICE LIST */}
              <div className="divide-y divide-slate-100">
                {notices.map((item, index) => (
                  <div
                    key={item.title}
                    className={`relative p-5 sm:p-6 transition-all duration-300 ${
                      hoveredNotice === index ? 'bg-slate-50' : 'bg-white'
                    }`}
                    onMouseEnter={() => setHoveredNotice(index)}
                    onMouseLeave={() => setHoveredNotice(null)}
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* DATE BOX */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center text-white shadow-lg">
                          <span className="text-xs font-semibold uppercase">
                            {item.month}
                          </span>
                          <span className="text-2xl font-bold leading-tight">
                            {item.date}
                          </span>
                          <span className="text-xs opacity-80">
                            {item.year}
                          </span>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">
                        {/* CATEGORY & NEW BADGE */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            <Calendar size={10} />
                            {item.category}
                          </span>
                          {item.isNew && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                              <Sparkles size={10} />
                              New
                            </span>
                          )}
                          {item.isImportant && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                              Important
                            </span>
                          )}
                        </div>

                        {/* TITLE */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 leading-relaxed">
                          {item.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* DOWNLOAD BUTTON */}
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 group">
                          <Download size={14} className="group-hover:animate-bounce" />
                          Download PDF
                        </button>
                      </div>

                      {/* DECORATIVE ELEMENT */}
                      {item.isImportant && (
                        <div className="absolute top-4 right-4">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (1/3 width) */}
          <div className="space-y-6">
            {/* HELP DESK CARD */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-primary to-primary-dark p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <CircleHelp size={20} className="text-white" />
                  </div>
                  <h3 className="text-white text-lg font-bold">Help Desk</h3>
                </div>
              </div>
              
              <div className="p-5 space-y-5">
                {/* EMAIL */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Technical Support Email
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary break-all">
                      support.jtglcce2026@jssc.in
                    </span>
                  </div>
                </div>

                {/* HELPLINE */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Helpline Number
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span className="text-slate-700 text-sm">10:00 AM - 6:00 PM (Mon-Fri)</span>
                  </div>
                  <p className="text-xl font-bold text-primary mt-2">
                    +91 651 222-4455 / 6677
                  </p>
                </div>

                {/* NOTE */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 text-xs italic leading-relaxed">
                    “Please mention your Registration Number in all technical queries for faster resolution.”
                  </p>
                </div>
              </div>
            </div>

            {/* APPLICATION GUIDE CARD */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <PlayCircle size={28} className="text-white" />
                </div>
                
                <h3 className="text-white text-xl font-bold mb-3">
                  Application Guide
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Watch our official video tutorial on how to fill out the technical graduate examination form correctly.
                </p>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary rounded-xl font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                  <PlayCircle size={16} className="group-hover:scale-110 transition-transform" />
                  Watch Tutorial
                </button>
              </div>
              
              <div className="bg-primary-dark px-6 py-4">
                <p className="text-text-secondary text-xs text-center">
                  Step-by-step guide for successful application
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}