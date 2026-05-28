// // Footer.tsx

import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import { Link } from "react-router-dom";

/* =========================
   SOCIAL SVG ICONS
========================= */

const TwitterSvg = ({ className = "w-4 h-4 text-white" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1-1.5-1.6-4.2-1.7-5.8-.1-1 1-1.4 2.5-1 3.9-3.3-.2-6.3-1.7-8.3-4.2-1.1 1.9-.5 4.3 1.3 5.5-.6 0-1.2-.2-1.7-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1.5 1.7 2.1 2.9 3.9 2.9-1.5 1.2-3.3 1.8-5.2 1.8H3c1.9 1.2 4.1 1.9 6.4 1.9 7.7 0 11.9-6.5 11.9-12.1v-.6c.8-.6 1.5-1.3 2-2.1z" />
  </svg>
);

const FacebookSvg = ({ className = "w-4 h-4 text-white" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9v-2.9h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.4H15c-1.2 0-1.6.8-1.6 1.5v1.8h2.8l-.5 2.9h-2.3v7A10 10 0 0022 12z" />
  </svg>
);

const LinkedinSvg = ({ className = "w-4 h-4 text-white" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.8 2.7 4.8 6.3V24h-4v-7.6c0-1.8 0-4.2-2.6-4.2s-3 2-3 4v7.8h-4V8z" />
  </svg>
);

const InstagramSvg = ({ className = "w-4 h-4 text-white" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
  </svg>
);

/* =========================
   FOOTER DATA
========================= */

const footerLinks = [
  {
    title: "Quick Links",
    items: [
      { name: "Apply Now", href: "/apply-now" },
      { name: "Admit Card", href: "/dashboard/admit-card" },
      { name: "Check Result", href: "/dashboard/result" },
      { name: "Payment Status", href: "/dashboard/payment-status" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Desk", href: "/help-desk" },
      { name: "Contact Support", href: "/dashboard/contact-support" },
      { name: "FAQs", href: "/faqs" },
      { name: "Feedback", href: "/feedback" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  },
];

const socialIcons = [
  {
    icon: TwitterSvg,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:bg-sky-500",
  },
  {
    icon: FacebookSvg,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:bg-blue-600",
  },
  {
    icon: LinkedinSvg,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:bg-blue-700",
  },
  {
    icon: InstagramSvg,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:bg-pink-500",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#004d40] via-[#005c4b] to-[#003b32]">
      
      {/* BACKGROUND BLUR EFFECTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-14">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND SECTION */}
          <div className="space-y-6">
            
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-xl">
                <Globe className="w-7 h-7 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  JSSC Jharkhand
                </h2>

                <p className="text-sm text-white/70 mt-1">
                  JTGLCCE 2026 Examination Portal
                </p>
              </div>
            </div>



            {/* CONTACT */}
            <div className="space-y-3 ">

              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 mt-0.5 text-yellow-300" />
                <span className="text-sm leading-6">
                  Kalinagar, Tea Garden, Namkum, Ranchi, Jharkhand 834010
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">+91 1234567890</span>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">
                  support@jssc.jharkhand.gov.in
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">
                  Mon-Fri: 10:00 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* LINK SECTIONS */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:mx-auto">
              
              <h3 className="relative inline-block text-white text-xl font-semibold mb-6">
                {section.title}
                <span className="absolute left-0 -bottom-2 w-24 h-[3px] rounded-full bg-yellow-400" />
              </h3>

              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="
                        text-[15px]
                        text-white/75
                        transition-all
                        duration-300
                        hover:text-white
                        hover:translate-x-1
                        inline-flex
                        items-center
                        gap-2
                        group
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-10 pt-4 border-t border-white/10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* SOCIAL */}
            <div className="flex items-center gap-3">
              {socialIcons.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-11
                      h-11
                      rounded-full
                      bg-white/10
                      border
                      border-white/10
                      backdrop-blur-md
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      hover:scale-110
                      hover:shadow-xl
                      ${social.color}
                    `}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                );
              })}
            </div>

            {/* COPYRIGHT */}
            <div className="text-center">
              <p className="text-sm text-white/80">
                © {currentYear} Jharkhand Staff Selection Commission.
                All rights reserved.
              </p>

              <p className="text-sm text-white/60 mt-2">
                Designed & Developed by JSSC Technical Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}