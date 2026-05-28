// // ModernJharkhandSection.tsx

// import { CheckCircle2 } from "lucide-react";

// const features = [
//   "Competitive Pay Scale (Level 6 & Above)",
//   "Career Growth Opportunities",
//   "Contribution to Public Service",
// ];

// export default function ModernJharkhandSection() {
//   return (
//     <section className="w-full bg-[#F5F5F5] px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-10">
//       <div className="mx-auto max-w-[1600px]">
//         {/* MAIN BANNER */}
//         <div
//           className="
//             relative overflow-hidden
//             min-h-[240px]
//             w-full
//           "
//         >
//           {/* BACKGROUND IMAGE */}
//           <img
//             src="/images/jharkhand-building.jpg"
//             alt="Jharkhand Building"
//             className="
//               absolute inset-0
//               h-full w-full
//               object-cover
//             "
//           />

//           {/* DARK OVERLAY */}
//           <div
//             className="
//               absolute inset-0
//               bg-gradient-to-r
//               from-primary
//               via-primary/85
//               to-primary/20
//             "
//           />

//           {/* CONTENT */}
//           <div
//             className="
//               relative z-10
//               flex h-full
//               items-center
//               px-6 py-10
//               sm:px-8
//               md:px-10
//               lg:px-12
//             "
//           >
//             <div className="max-w-[560px]">
//               {/* TITLE */}
//               <h2
//                 className="
//                   text-[28px]
//                   font-bold
//                   leading-[1.2]
//                   tracking-[-0.5px]
//                   text-white
//                   sm:text-[36px]
//                   lg:text-[42px]
//                 "
//               >
//                 Building a Modern Jharkhand
//               </h2>

//               {/* DESCRIPTION */}
//               <p
//                 className="
//                   mt-5
//                   text-[14px]
//                   font-medium
//                   leading-[28px]
//                   text-text-secondary
//                   sm:text-[15px]
//                 "
//               >
//                 Join the technical cadre of the State Government and contribute
//                 your expertise to Jharkhand&apos;s industrial and agricultural
//                 development.
//               </p>

//               {/* FEATURES */}
//               <div className="mt-8 space-y-4">
//                 {features.map((item) => (
//                   <div key={item} className="flex items-center gap-3">
//                     <CheckCircle2
//                       size={18}
//                       className="shrink-0 text-[#9FF5D1]"
//                     />

//                     <span
//                       className="
//                         text-[14px]
//                         font-semibold
//                         text-white
//                       "
//                     >
//                       {item}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




import {  ArrowRight, Users, TrendingUp, Award } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Competitive Pay Scale",
    description: "Level 6 & Above with attractive benefits",
    icon: Award,
  },
  {
    title: "Career Growth Opportunities",
    description: "Fast-track promotions and skill development",
    icon: TrendingUp,
  },
  {
    title: "Contribution to Public Service",
    description: "Make a difference in Jharkhand's development",
    icon: Users,
  },
];




export default function ModernJharkhandSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Unsplash image URL - Modern educational/government building
  const backgroundImageUrl = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&h=600&fit=crop&q=80";
  
  // Fallback image if needed
  const fallbackImageUrl = "https://images.unsplash.com/photo-1497366811353-687d8e6ed99a?w=1600&h=600&fit=crop&q=80";

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImageUrl;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* MAIN BANNER */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
          {/* BACKGROUND IMAGE */}
          <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full overflow-hidden">
            <img
              src={imageLoaded ? backgroundImageUrl : fallbackImageUrl}
              alt="Jharkhand Government Building"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay - Multiple layers for better effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-primary/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                   backgroundRepeat: 'repeat'
                 }}></div>
          </div>

          {/* CONTENT */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-fadeIn">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">
                    Jharkhand Government Initiative
                  </span>
                </div>

                {/* TITLE */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slideUp">
                  Building a Modern
                  <span className="block text-yellow-400 mt-2">Jharkhand</span>
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-4 md:mt-6 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl animate-slideUp animation-delay-100">
                  Join the technical cadre of the State Government and contribute
                  your expertise to Jharkhand's industrial and agricultural development.
                  Be part of the transformation that shapes our state's future.
                </p>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 md:mt-8 animate-slideUp animation-delay-200">
                  {features.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon size={16} className="text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-white text-sm font-semibold mb-1">
                            {item.title}
                          </h3>
                          <p className="text-text-secondary text-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA BUTTON */}
                <div className="mt-6 md:mt-8 animate-slideUp animation-delay-300">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-primary font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <span>Learn More About Opportunities</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          
        </div>

       
       
        
        
      </div>

      {/* Add custom CSS for animations */}
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
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
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
        
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-slideUp {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}