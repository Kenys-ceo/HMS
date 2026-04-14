import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-4xl font-bold mb-12 text-white text-center">Hospital Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link
          to="/patients"
          className="block p-8 bg-gray-900 hover:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 text-center text-white font-bold text-xl hover:scale-105"
        >
          🧑‍⚕️ Manage Patients
        </Link>

        <Link
          to="/doctors"
          className="block p-8 bg-gray-900 hover:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 text-center text-white font-bold text-xl hover:scale-105"
        >
          👨‍⚕️ Manage Doctors
        </Link>

        <Link
          to="/appointments"
          className="block p-8 bg-gray-900 hover:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 text-center text-white font-bold text-xl hover:scale-105"
        >
          📅 Manage Appointments
        </Link>

        <Link
          to="/invoices"
          className="block p-8 bg-gray-900 hover:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 text-center text-white font-bold text-xl hover:scale-105"
        >
          💳 Manage Invoices
        </Link>

        <Link
          to="/reports"
          className="block p-8 bg-gray-900 hover:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 text-center text-white font-bold text-xl hover:scale-105"
        >
          📊 View Reports
        </Link>
      </div>
    </div>
  );
}
