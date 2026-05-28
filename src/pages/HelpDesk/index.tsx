import {
  ChevronDown,
  FileText,
  Phone,
  Mail,
  Clock3,
  MapPin,
  Download,
  ShieldCheck,
  CreditCard,
  PencilLine,
  Wrench,
  Search,
  Headphones,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    label: "Eligibility",
    icon: ShieldCheck,
    active: true,
    description: "Age, qualification & category requirements",
  },
  {
    label: "Fee Payment",
    icon: CreditCard,
    description: "Payment methods & status tracking",
  },
  {
    label: "Documents",
    icon: FileText,
    description: "Required certificates & uploads",
  },
  {
    label: "Correction",
    icon: PencilLine,
    description: "Edit & modification window",
  },
  {
    label: "Technical",
    icon: Wrench,
    description: "Portal issues & solutions",
  },
];

const annexures = [
  { name: "Annexure I - Caste Certificate Format", important: true },
  { name: "Annexure II - Residence Certificate", important: true },
  { name: "Annexure III - Disability Certificate", important: false },
  { name: "Annexure IV - EWS Income Certificate", important: true },
];

const faqs = [
  {
    question: "What are the minimum age requirements for JTGLCCE 2026?",
    answer: "Candidates must have attained the age of 21 years as of 01.01.2026. The upper age limit varies by category as per Government of Jharkhand norms (General: 35 years, OBC: 37/38 years, SC/ST: 40 years).",
    category: "Eligibility",
  },
  {
    question: "I have paid the fee but the status still shows 'Pending'. What should I do?",
    answer: "Please wait for 24-48 hours for payment reconciliation. If the status still shows pending, contact the helpdesk with your payment transaction ID and registration number.",
    category: "Fee Payment",
  },
  {
    question: "What documents are required for the initial registration?",
    answer: "You need your photograph, signature, educational certificates, category certificate (if applicable), and valid ID proof. All documents should be in PDF/JPEG format within specified size limits.",
    category: "Documents",
  },
  {
    question: "When will the correction window open for modifying application details?",
    answer: "The correction window typically opens 7-10 days after the registration deadline. You'll receive notifications via email and SMS.",
    category: "Correction",
  },
  {
    question: "Can I apply for multiple posts under JTGLCCE 2026?",
    answer: "Yes, you can apply for multiple posts, but you need to submit separate applications and fees for each post.",
    category: "Eligibility",
  },
  {
    question: "What is the fee structure for different categories?",
    answer: "General/OBC: ₹600, SC/ST: ₹300, PwD: No fee. Payment can be made through debit card, credit card, or net banking.",
    category: "Fee Payment",
  },
];

export default function JTGLCCEFAQ() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-r from-primary/60 to-primary-dark/80 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1400px] mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <HelpCircle size={14} className="text-yellow-400" />
              <span className="text-white text-xs font-semibold uppercase tracking-wider">FAQ & Support Center</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              How can we
              <span className="text-yellow-400 block mt-2">help you today?</span>
            </h1>
            
            {/* Description */}
            <p className="mt-6 text-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
              Search the FAQ or browse categories below to find answers for
              JTGLCCE 2026 application process.
            </p>
            
            {/* Search Box */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search size={20} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search for eligibility, fee, technical issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-5 text-base bg-white border-2 border-white/20 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-all duration-300 shadow-lg"
                />
                {searchQuery && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark transition-colors">
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - FAQ SECTION (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* TABS */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-200">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`
                        relative group py-4 px-3 transition-all duration-300
                        ${isActive 
                          ? "bg-gradient-to-r from-primary to-primary-dark text-white" 
                          : "bg-white text-slate-700 hover:bg-slate-50"
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon size={20} className={isActive ? "text-yellow-400" : "text-slate-500 group-hover:text-primary transition-colors"} />
                        <span className="text-xs font-semibold">{tab.label}</span>
                        {!isActive && (
                          <span className="text-[10px] text-slate-400 hidden md:block">{tab.description}</span>
                        )}
                      </div>
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ ACCORDION */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Headphones size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-bold">Frequently Asked Questions</h2>
                    <p className="text-text-secondary text-xs">Find answers to common queries</p>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {(searchQuery ? filteredFaqs : faqs).map((faq, index) => (
                  <div key={index} className="transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <HelpCircle size={12} className="text-primary" />
                        </div>
                        <span className="text-slate-800 font-semibold text-sm md:text-base">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4
                          ${openFaqs.includes(index) ? 'rotate-180' : ''}
                        `}
                      />
                    </button>
                    
                    <div className={`
                      transition-all duration-300 overflow-hidden
                      ${openFaqs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="px-6 pb-4 pl-14">
                        <div className="bg-slate-50 rounded-xl p-4">
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-primary font-medium">Category:</span>
                            <span className="text-xs text-slate-500">{faq.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="px-6 py-12 text-center">
                  <HelpCircle size={48} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No results found for "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-primary text-sm font-semibold hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>

            {/* CERTIFICATE ANNEXURES */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-bold">Certificate Annexures</h2>
                    <p className="text-text-secondary text-xs">Important format documents</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {annexures.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-primary transition-all duration-300 p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-slate-800 text-sm font-semibold">
                            {item.name}
                          </p>
                          {item.important && (
                            <span className="inline-flex items-center gap-1 text-xs text-primary mt-1">
                              <Sparkles size={10} />
                              Important
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group/download">
                        <Download size={14} className="group-hover/download:animate-bounce" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 text-primary text-sm font-semibold hover:text-primary-dark transition-colors flex items-center gap-1 group">
                  View all 11 Annexures
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (1/3 width) */}
          <div className="space-y-6">
            {/* HELP CARD */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="p-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Headphones size={28} className="text-white" />
                </div>
                
                <h3 className="text-white text-2xl font-bold leading-tight">
                  Need immediate help?
                </h3>
                
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                  Our dedicated helpdesk team is available to assist you with any
                  portal-related queries.
                </p>
                
                <div className="mt-6 space-y-4">
                  {/* PHONE */}
                  <div className="flex gap-4 p-3 bg-white/10 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-medium uppercase tracking-wider">
                        Helpline Numbers
                      </p>
                      <p className="text-white text-sm font-semibold">
                        +91 651-2490133 / +91 651-2490134
                      </p>
                    </div>
                  </div>
                  
                  {/* EMAIL */}
                  <div className="flex gap-4 p-3 bg-white/10 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-medium uppercase tracking-wider">
                        Support Email
                      </p>
                      <p className="text-white text-sm font-semibold break-all">
                        support.jtglcce2026@jssc.in
                      </p>
                    </div>
                  </div>
                  
                  {/* TIME */}
                  <div className="flex gap-4 p-3 bg-white/10 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Clock3 size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-medium uppercase tracking-wider">
                        Operating Hours
                      </p>
                      <p className="text-white text-sm font-semibold">
                        10:00 AM - 06:00 PM (Mon-Sat)
                      </p>
                      <p className="text-text-secondary text-xs mt-1">
                        Except Public Holidays
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* LIVE CHAT CARD */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <MessageCircle size={22} className="text-green-600" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-bold">Live Chat Support</h4>
                  <p className="text-slate-500 text-xs">Get instant answers</p>
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                Start Live Chat
              </button>
            </div>
            
            {/* OFFICE ADDRESS CARD */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-yellow-400" />
                  <h3 className="text-white font-semibold">Office Address</h3>
                </div>
              </div>
              
              <div className="p-6">
                {/* Map Placeholder */}
                <div className="h-40 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=200&fit=crop')] bg-cover bg-center opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse">
                      <MapPin size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Jharkhand Staff Selection Commission (JSSC)
                    <br />
                    F-49/50, Sector-III, Dhurwa, Ranchi-834004
                    <br />
                    Jharkhand, India
                  </p>
                  <button className="mt-4 text-primary text-sm font-semibold hover:text-primary-dark transition-colors flex items-center gap-1">
                    Get Directions
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}