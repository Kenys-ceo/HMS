import { useEffect, useState } from "react";
import api from "../api";

export default function Reports() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    api.get("/reports/daily").then(res => setReport(res.data)).catch(() => alert("Error fetching report"));
  }, []);

  return (
<div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Daily Report</h2>
        <div className="bg-gray-900 shadow-2xl rounded-3xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-800 to-black sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-b border-gray-700">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-b border-gray-700">Doctor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-b border-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-b border-gray-700">Diagnosis</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-b border-gray-700">Invoice Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {report.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-800 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{row.PatientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.DoctorName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.AppointmentDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{row.Diagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-400">${row.InvoiceAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {report.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">No reports available</div>
        )}
      </div>
    </div>
  );
}
