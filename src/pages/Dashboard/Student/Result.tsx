import React from "react";
import {  Download } from "lucide-react";

const Result: React.FC = () => {
  const results = [
    {
      id: 1,
      semester: "Semester 1",
      subject: "Mathematics",
      grade: "A",
      score: "85%",
      status: "Published",
    },
    {
      id: 2,
      semester: "Semester 1",
      subject: "Physics",
      grade: "B+",
      score: "78%",
      status: "Published",
    },
    {
      id: 3,
      semester: "Semester 1",
      subject: "Chemistry",
      grade: "A-",
      score: "82%",
      status: "Published",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Results
        </h1>
        <p className="text-slate-600 mt-2">View your academic results</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-slate-800 text-lg font-semibold">
                Academic Year 2024
              </h2>
              <p className="text-slate-600 text-sm">Semester 1 Results</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Download Results
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-slate-700 font-semibold">
                  Subject
                </th>
                <th className="text-left px-6 py-3 text-slate-700 font-semibold">
                  Grade
                </th>
                <th className="text-left px-6 py-3 text-slate-700 font-semibold">
                  Score
                </th>
                <th className="text-left px-6 py-3 text-slate-700 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-slate-700">{result.subject}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold shadow-sm">
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-semibold">
                    {result.score}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
