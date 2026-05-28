import React from "react";
import { CreditCard, Download, Calendar, MapPin } from "lucide-react";

const AdmitCard: React.FC = () => {
  const exams = [
    {
      id: 1,
      name: "Semester 1 Final Exam",
      date: "2024-03-15",
      venue: "Main Hall A",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Semester 1 Practical Exam",
      date: "2024-03-20",
      venue: "Lab 3",
      time: "02:00 PM",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Admit Cards
        </h1>
        <p className="text-slate-600 mt-2">
          Download your admit cards for upcoming exams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-800 font-semibold">{exam.name}</h3>
                  <p className="text-slate-500 text-sm">Admit Card Available</p>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm">
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{exam.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{exam.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <span className="font-semibold">Time:</span>
                <span>{exam.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmitCard;
