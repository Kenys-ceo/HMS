import React, { useState, useEffect } from "react";
import api from "../api";

export default function DoctorForm() {
  const [form, setForm] = useState({
    fullName: "",
    specialty: "",
    phone: "",
    email: ""
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
      await api.post("/doctors", form);
      setMessage("Doctor added successfully ✅");
      setForm({ fullName: "", specialty: "", phone: "", email: "" });
    } catch {
      setMessage("Error adding doctor ❌");
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

        .field-input {
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
        }

        .field-input::placeholder {
          color: #c4b8a2;
          font-weight: 300;
        }

        .field-input:focus {
          border-color: #9dc0b3;
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
        <h2 className="title">Add Doctor</h2>
        <p className="subtitle">New physician registration</p>

        {message && (
          <div className={`message ${message.includes("Error") ? "error" : ""}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={`field ${focused === "fullName" ? "is-focused" : ""}`}>
            <label className="field-label">Full Name</label>
            <div className="input-wrap">
              <input
                className="field-input"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onFocus={() => setFocused("fullName")}
                onBlur={() => setFocused("")}
                placeholder="Dr. Jane Smith"
                required
              />
              <div className="field-line" />
            </div>
          </div>

          <div className={`field ${focused === "specialty" ? "is-focused" : ""}`}>
            <label className="field-label">Specialty</label>
            <div className="input-wrap">
              <input
                className="field-input"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                onFocus={() => setFocused("specialty")}
                onBlur={() => setFocused("")}
                placeholder="e.g. Cardiology"
                required
              />
              <div className="field-line" />
            </div>
          </div>

          <div className={`field ${focused === "phone" ? "is-focused" : ""}`}>
            <label className="field-label">Phone Number</label>
            <div className="input-wrap">
              <input
                className="field-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused("")}
                placeholder="+1 000 000 0000"
              />
              <div className="field-line" />
            </div>
          </div>

          <div className={`field ${focused === "email" ? "is-focused" : ""}`}>
            <label className="field-label">Email Address</label>
            <div className="input-wrap">
              <input
                className="field-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                placeholder="doctor@hospital.com"
              />
              <div className="field-line" />
            </div>
          </div>

          <button type="submit" className="btn">
            Save Doctor →
          </button>
        </form>
      </div>
    </>
  );
}
