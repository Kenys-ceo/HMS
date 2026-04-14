import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PatientForm from "./pages/PatientForm";
import DoctorForm from "./pages/DoctorForm";
import AppointmentForm from "./pages/AppointmentForm";
import InvoiceForm from "./pages/InvoiceForm";
import Reports from "./pages/Report";
import Login from "./pages/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientForm />} />
        <Route path="/doctors" element={<DoctorForm />} />
        <Route path="/appointments" element={<AppointmentForm />} />
        <Route path="/invoices" element={<InvoiceForm />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
