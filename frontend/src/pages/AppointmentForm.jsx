import React, { useState, useEffect } from "react";
import api from "../api";

export default function AppointmentForm() {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "Scheduled",
    diagnosis: ""
  });

  const [focused, setFocused] = useState("");
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/api/appointments", form);
      setMessage("success");
      setForm({ patientId: "", doctorId: "", date: "", time: "", status: "Scheduled", diagnosis: "" });
    } catch {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  const F = ({ name, label, children }) => (
    <div className={`field ${focused === name ? "is-focused" : ""}`}>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .form-card {
          max-width: 680px;
          margin: auto;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 52px 56px;
          font-family: 'Space Mono', monospace;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          position: relative;
        }

        .form-card::after {
          content: '';
          position: absolute;
          top: 0; left: 56px; right: 56px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00c87a, transparent);
        }

        .form-card.mounted { opacity: 1; transform: translateY(0); }

        .title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 36px;
        }

        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .field { margin-bottom: 24px; }

        .field-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 10px;
          transition: color 0.2s ease;
        }

        .field.is-focused .field-label { color: #00c87a; }

        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 13px 16px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #fff;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          letter-spacing: 0.03em;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder,
        .field-textarea::placeholder { color: rgba(255,255,255,0.18); }

        .field-input:focus,
        .field-select:focus,
        .field-textarea:focus {
          border-color: rgba(0,200,122,0.5);
          background: rgba(0,200,122,0.04);
        }

        .field-textarea { resize: vertical; min-height: 90px; }

        .field-select option { background: #111318; color: #fff; }

        .msg {
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 11px;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
        }

        .msg.success { background: rgba(0,200,122,0.08); border: 1px solid rgba(0,200,122,0.25); color: #00c87a; }
        .msg.error   { background: rgba(220,60,60,0.08);  border: 1px solid rgba(220,60,60,0.25);  color: #e07070; }

        .btn {
          width: 100%;
          margin-top: 12px;
          padding: 14px 24px;
          background: #00c87a;
          color: #0a0c0f;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
        }

        .btn:hover:not(:disabled) { background: #00e88d; transform: translateY(-1px); }
        .btn:active { transform: translateY(0); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className={`form-card ${mounted ? "mounted" : ""}`}>
        <h2 className="title">Schedule Appointment</h2>
        <p className="subtitle">Book a new patient appointment</p>

        {message === "success" && <div className="msg success">✓ Appointment scheduled successfully</div>}
        {message === "error"   && <div className="msg error">✗ Error scheduling appointment — please try again</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <F name="patientId" label="Patient ID">
              <input className="field-input" name="patientId" value={form.patientId}
                onChange={handleChange} onFocus={() => setFocused("patientId")} onBlur={() => setFocused("")}
                placeholder="e.g. 101" required />
            </F>
            <F name="doctorId" label="Doctor ID">
              <input className="field-input" name="doctorId" value={form.doctorId}
                onChange={handleChange} onFocus={() => setFocused("doctorId")} onBlur={() => setFocused("")}
                placeholder="e.g. 202" required />
            </F>
          </div>

          <div className="row">
            <F name="date" label="Date">
              <input className="field-input" type="date" name="date" value={form.date}
                onChange={handleChange} onFocus={() => setFocused("date")} onBlur={() => setFocused("")} required />
            </F>
            <F name="time" label="Time">
              <input className="field-input" type="time" name="time" value={form.time}
                onChange={handleChange} onFocus={() => setFocused("time")} onBlur={() => setFocused("")} required />
            </F>
          </div>

          <F name="status" label="Status">
            <select className="field-select" name="status" value={form.status}
              onChange={handleChange} onFocus={() => setFocused("status")} onBlur={() => setFocused("")}>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </F>

          <F name="diagnosis" label="Diagnosis Notes">
            <textarea className="field-textarea" name="diagnosis" value={form.diagnosis}
              onChange={handleChange} onFocus={() => setFocused("diagnosis")} onBlur={() => setFocused("")}
              placeholder="Initial diagnosis notes..." />
          </F>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Saving..." : "Save Appointment →"}
          </button>
        </form>
      </div>
    </>
  );
}
