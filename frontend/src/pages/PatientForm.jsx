import { useState } from "react";
import api from "../api";

export default function PatientForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", dob: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/patients", form);
      alert("Patient added successfully");
      setForm({ firstName: "", lastName: "", phone: "", dob: "", address: "" });
    } catch  {
      alert("Error adding patient");
    }
  };

  return (
<div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Add Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-gray-800 to-black text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl hover:from-gray-700 hover:to-gray-900 border border-gray-600 transition-all duration-200">Save Patient</button>
        </form>
      </div>
    </div>
  );
}
