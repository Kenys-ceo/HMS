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
        .form-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f2ee;
          font-family: 'DM Mono', monospace;
          position: relative;
        }

        .form-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 252, 248, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 184, 154, 0.35);
          border-radius: 4px;
          padding: 40px;
          box-shadow:
            0 8px 24px rgba(80, 60, 30, 0.07),
            0 32px 64px rgba(80, 60, 30, 0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .form-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          margin-bottom: 25px;
          color: #1e1a12;
          text-align: center;
        }

        .field {
          margin-bottom: 18px;
        }

        .field label {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #9c8f78;
          display: block;
          margin-bottom: 6px;
        }

        .field input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid #d8cfc0;
          padding: 8px 0;
          background: transparent;
          outline: none;
          font-size: 13px;
        }

        .field input:focus {
          border-color: #9dc0b3;
        }

        .btn {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          background: #1e1a12;
          color: #f5f2ee;
          border: none;
          cursor: pointer;
          font-size: 11px;
          letter-spacing: 0.2em;
        }

        .btn:hover {
          background: #2c2416;
        }

        .message {
          margin-bottom: 15px;
          font-size: 12px;
          text-align: center;
          color: #7aaa99;
        }
      `}</style>

      <div className="form-root">
        <div className={`form-card ${mounted ? "mounted" : ""}`}>
          
          <h2 className="title">Add Doctor</h2>

          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>
            
            <div className="field">
              <label>Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Specialty</label>
              <input
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">
              Save Doctor →
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
