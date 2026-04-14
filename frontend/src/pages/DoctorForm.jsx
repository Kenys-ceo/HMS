import { useState } from "react";
import api from "../api";

export default function DoctorForm() {
  const [form, setForm] = useState({ fullName: "", specialty: "", phone: "", email: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/doctors", form);
      alert("Doctor added successfully");
      setForm({ fullName: "", specialty: "", phone: "", email: "" });
    } catch {
      alert("Error adding doctor");
    }
  };

  return (
<div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Add Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Specialty</label>
            <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Specialty" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-gray-800 to-black text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl hover:from-gray-700 hover:to-gray-900 border border-gray-600 transition-all duration-200">Save Doctor</button>
        </form>
      </div>
    </div>
  );
}
