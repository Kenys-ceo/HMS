import { useState } from "react";
import api from "../api";

export default function InvoiceForm() {
  const [form, setForm] = useState({ appointmentId: "", totalAmount: "", paymentDate: "", paymentStatus: "Pending" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/invoices", form);
      alert("Invoice created successfully");
      setForm({ appointmentId: "", totalAmount: "", paymentDate: "", paymentStatus: "Pending" });
    } catch  {
      alert("Error creating invoice");
    }
  };

  return (
<div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Create Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Appointment ID</label>
            <input name="appointmentId" value={form.appointmentId} onChange={handleChange} placeholder="Appointment ID" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Total Amount</label>
            <input name="totalAmount" value={form.totalAmount} onChange={handleChange} placeholder="Total Amount" className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Date</label>
            <input type="date" name="paymentDate" value={form.paymentDate} onChange={handleChange} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Status</label>
            <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition appearance-none">
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Pending</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-gray-800 to-black text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl hover:from-gray-700 hover:to-gray-900 border border-gray-600 transition-all duration-200">Save Invoice</button>
        </form>
      </div>
    </div>
  );
}
