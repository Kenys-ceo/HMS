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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/appointments", form);
      setMessage("Appointment scheduled successfully ✅");
      setForm({
        patientId: "",
        doctorId: "",
        date: "",
        time: "",
        status: "Scheduled",
        diagnosis: ""
      });
    } catch {
      setMessage("Error scheduling appointment ❌");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        .form-card {
          max-width: 500px;
          margin: auto;
          background: rgba(255, 252, 248, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 184, 154, 0.35);
          border-radius: 4px;
          padding: 48px;
          box-shadow:
            0 2px 4px rgba(80, 60, 30, 0.04),
            0 8px 24px rgba(80, 60, 30, 0.07),
            0 32px 64px rgba(80, 60, 30, 0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          position: relative;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 48px;
          right: 48px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9dc0b3, #c4a87a, transparent);
        }

        .form-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .title {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          margin-bottom: 6px;
          color: #1e1a12;
          text-align: center;
        }

        .subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 300;
          color: #a89d88;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 32px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .field {
          margin-bottom: 22px;
        }

        .field-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          color: #9c8f78;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 8px;
          transition: color 0.2s ease;
        }

        .field.is-focused .field-label {
          color: #7aaa99;
        }

        .input-wrap {
          position: relative;
        }

        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #1e1a12;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #d8cfc0;
          padding: 8px 0;
          outline: none;
          transition: border-color 0.25s ease;
          letter-spacing: 0.04em;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: #c4b8a2;
          font-weight: 300;
        }

        .field-input:focus,
        .field-select:focus,
        .field-textarea:focus {
          border-color: #9dc0b3;
        }

        .field-textarea {
          resize: vertical;
          min-height: 72px;
        }

        .field-select option {
          background: #f5f2ee;
          color: #1e1a12;
        }

        .field-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #9dc0b3;
          transition: width 0.3s ease;
        }

        .field.is-focused .field-line {
          width: 100%;
        }

        .btn {
          width: 100%;
          margin-top: 32px;
          padding: 13px 24px;
          background: #1e1a12;
          color: #f5f2ee;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.15s ease;
        }

        .btn:hover {
          background: #2c2416;
          transform: translateY(-1px);
        }

        .btn:active {
          transform: translateY(0);
        }

        .message {
          margin-bottom: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          text-align: center;
          color: #7aaa99;
          letter-spacing: 0.05em;
        }

        .message.error {
          color: #a83020;
        }
      `}</style>

      <div className={`form-card ${mounted ? "mounted" : ""}`}>
        <h2 className="title">Schedule Appointment</h2>
        <p className="subtitle">Book a new appointment</p>

        {message && (
          <div className={`message ${message.includes("Error") ? "error" : ""}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className={`field ${focused === "patientId" ? "is-focused" : ""}`}>
              <label className="field-label">Patient ID</label>
              <div className="input-wrap">
                <input
                  className="field-input"
                  name="patientId"
                  value={form.patientId}
                  onChange={handleChange}
                  onFocus={() => setFocused("patientId")}
                  onBlur={() => setFocused("")}
                  placeholder="e.g. 101"
                  required
                />
                <div className="field-line" />
              </div>
            </div>

            <div className={`field ${focused === "doctorId" ? "is-focused" : ""}`}>
              <label className="field-label">Doctor ID</label>
              <div className="input-wrap">
                <input
                  className="field-input"
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  onFocus={() => setFocused("doctorId")}
                  onBlur={() => setFocused("")}
                  placeholder="e.g. 202"
                  required
                />
                <div className="field-line" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className={`field ${focused === "date" ? "is-focused" : ""}`}>
              <label className="field-label">Date</label>
              <div className="input-wrap">
                <input
                  className="field-input"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  onFocus={() => setFocused("date")}
                  onBlur={() => setFocused("")}
                  required
                />
                <div className="field-line" />
              </div>
            </div>

            <div className={`field ${focused === "time" ? "is-focused" : ""}`}>
              <label className="field-label">Time</label>
              <div className="input-wrap">
                <input
                  className="field-input"
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  onFocus={() => setFocused("time")}
                  onBlur={() => setFocused("")}
                  required
                />
                <div className="field-line" />
              </div>
            </div>
          </div>

          <div className={`field ${focused === "status" ? "is-focused" : ""}`}>
            <label className="field-label">Status</label>
            <div className="input-wrap">
              <select
                className="field-select"
                name="status"
                value={form.status}
                onChange={handleChange}
                onFocus={() => setFocused("status")}
                onBlur={() => setFocused("")}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="field-line" />
            </div>
          </div>

          <div className={`field ${focused === "diagnosis" ? "is-focused" : ""}`}>
            <label className="field-label">Diagnosis</label>
            <div className="input-wrap">
              <textarea
                className="field-textarea"
                name="diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
                onFocus={() => setFocused("diagnosis")}
                onBlur={() => setFocused("")}
                placeholder="Initial diagnosis notes..."
              />
              <div className="field-line" />
            </div>
          </div>

          <button type="submit" className="btn">
            Save Appointment →
          </button>
        </form>
      </div>
    </>
  );
}
