

import { CircleHelp,  Mail,Calendar, Clock, Sparkles, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    id: 1,
    question: "What is the eligibility criteria for JTGLCCE 2026?",
    answer: "Candidates must have a Bachelor's degree in Engineering/Technology from a recognized university with at least 60% aggregate marks (55% for reserved categories). Age limit is 21-32 years as of 01/01/2026 with applicable relaxations.",
    category: "Eligibility",
    isPopular: true,
  },
  {
    id: 2,
    question: "How can I apply for the JTGLCCE 2026 examination?",
    answer: "Applications must be submitted online through the official JTGLCCE portal. The process involves registration, filling personal and educational details, uploading documents (photo, signature, certificates), and paying the application fee online.",
    category: "Application",
    isPopular: true,
  },
  {
    id: 3,
    question: "What is the examination pattern and marking scheme?",
    answer: "The exam consists of two stages: Stage 1 (Objective Type - 150 questions, 150 marks) and Stage 2 (Descriptive Type - 100 marks). There is a negative marking of 0.25 marks for each wrong answer in Stage 1.",
    category: "Exam Pattern",
    isPopular: false,
  },
  {
    id: 4,
    question: "What is the application fee and how can I pay?",
    answer: "General/OBC: ₹1000, SC/ST: ₹500, PwD: Nil. Payment can be made via credit card, debit card, net banking, or UPI through the secure payment gateway.",
    category: "Fee",
    isPopular: false,
  },
  {
    id: 5,
    question: "When will the admit cards be released?",
    answer: "Admit cards will be released 15 days before the Stage 1 examination. Candidates can download them from the official portal using their registration number and date of birth.",
    category: "Admit Card",
    isPopular: true,
  },
  {
    id: 6,
    question: "What documents are required for verification?",
    answer: "Required documents: 10th & 12th mark sheets, degree certificate & mark sheets, caste certificate (if applicable), domicile certificate, PwD certificate (if applicable), recent passport size photographs, and valid ID proof.",
    category: "Documents",
    isPopular: false,
  },
];

const categories = ["All", "Eligibility", "Application", "Exam Pattern", "Fee", "Admit Card", "Documents"];

export default function FAQSection() {
  const [hoveredFAQ, setHoveredFAQ] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = activeCategory === "All" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <HelpCircle size={14} className="text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">FAQ & Help Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Find quick answers to common queries about JTGLCCE 2026 eligibility, application process, exam pattern, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT SECTION - FAQ (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Frequently Asked Questions
                  </h2>
                </div>
                
                
                
              </div>

              {/* CATEGORY FILTERS */}
              <div className="px-5 sm:px-6 pt-5 pb-2 border-b border-slate-100 overflow-x-auto">
                <div className="flex flex-nowrap sm:flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                        activeCategory === category
                          ? "bg-primary text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ LIST */}
              <div className="divide-y divide-slate-100">
                {filteredFAQs.map((item) => (
                  <div
                    key={item.id}
                    className={`transition-all duration-300 ${
                      hoveredFAQ === item.id ? 'bg-slate-50' : 'bg-white'
                    }`}
                    onMouseEnter={() => setHoveredFAQ(item.id)}
                    onMouseLeave={() => setHoveredFAQ(null)}
                  >
                    <button
                      onClick={() => toggleFAQ(item.id)}
                      className="w-full text-left p-5 sm:p-6 flex justify-between items-start gap-4 group"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            <Calendar size={10} />
                            {item.category}
                          </span>
                          {item.isPopular && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                              <Sparkles size={10} />
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed pr-6">
                          {item.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {openFAQ === item.id ? (
                          <ChevronUp size={20} className="text-primary transition-transform" />
                        ) : (
                          <ChevronDown size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                        )}
                      </div>
                    </button>
                    
                    {/* ANSWER - Expandable */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <div className="bg-slate-50 rounded-xl p-4 sm:p-5">
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* EMPTY STATE */}
              {filteredFAQs.length === 0 && (
                <div className="py-12 text-center">
                  <HelpCircle size={48} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No FAQs found in this category.</p>
                  <button 
                    onClick={() => setActiveCategory("All")}
                    className="mt-3 text-primary text-sm font-semibold hover:underline"
                  >
                    View all questions
                  </button>
                </div>
              )}

              {/* HELP FOOTER */}
              <div className="bg-slate-50 px-5 sm:px-6 py-4 border-t border-slate-100">
                <p className="text-slate-600 text-xs sm:text-sm text-center">
                  Can't find your question?{" "}
                  <button className="text-primary font-semibold hover:underline">
                    Contact our support team
                  </button>
                </p>
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
                      help.jtglcce@gmail.com
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
                    +91 9311063696
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

            {/* QUICK CONTACT CARD */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Phone size={28} className="text-white" />
                </div>
                
                <h3 className="text-white text-xl font-bold mb-3">
                  Quick Support
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Having trouble finding answers? Connect with our support team for personalized assistance.
                </p>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary rounded-xl font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                  <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                  Raise a Ticket
                </button>
              </div>
              
              <div className="bg-primary-dark px-6 py-4">
                <p className="text-text-secondary text-xs text-center">
                  Average response time: 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}