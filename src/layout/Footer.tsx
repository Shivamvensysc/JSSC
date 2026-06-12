import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#004d40] via-[#005c4b] to-[#003b32]">
      {/* BACKGROUND BLUR EFFECTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-8">
        {/* TITLE SECTION - Centered at top */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-xl overflow-hidden">
              <img 
                src={Logo} 
                alt="JSSC Jharkhand Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              JSSC Jharkhand
            </h2>
          </div>
          <p className="text-sm text-white/70">
            JTGLCCE 2026 Examination Portal
          </p>
        </div>

        {/* CONTACT SECTION - Single row on desktop, wrap on mobile */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
          {/* Address */}
          <div className="flex items-start gap-2 text-white/80">
            <MapPin className="w-4 h-4 mt-0.5 text-yellow-300 flex-shrink-0" />
            <span className="text-xs sm:text-sm leading-6">
              Kalinagar, Tea Garden, Namkum, Ranchi, Jharkhand 834010
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-white/80">
            <Phone className="w-4 h-4 text-yellow-300" />
            <span className="text-xs sm:text-sm">+91 1234567890</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-white/80">
            <Mail className="w-4 h-4 text-yellow-300" />
            <span className="text-xs sm:text-sm">support@jssc.jharkhand.gov.in</span>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-4 h-4 text-yellow-300" />
            <span className="text-xs sm:text-sm">Mon-Fri: 10:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}