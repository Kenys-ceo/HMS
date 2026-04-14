import { useState } from "react";
import api from "../api";

export default function AppointmentForm() {
  const [form, setForm] = useState({ patientId: "", doctorId: "", date: "", time: "", status: "Scheduled", diagnosis: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments", form);
      alert("Appointment scheduled successfully");
      setForm({ patientId: "", doctorId: "", date: "", time: "", status: "Scheduled", diagnosis: "" });
    } catch {
      alert("Error scheduling appointment");
    }
  };

  return (
<div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Schedule Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Patient ID</label>
            <input name="patientId" value={form.patientId} onChange={handleChange} placeholder="Patient ID" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Doctor ID</label>
            <input name="doctorId" value={form.doctorId} onChange={handleChange} placeholder="Doctor ID" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Diagnosis</label>
            <textarea name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-gray-800 to-black text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl hover:from-gray-700 hover:to-gray-900 border border-gray-600 transition-all duration-200">Save Appointment</button>
        </form>
      </div>
    </div>
  );
}
