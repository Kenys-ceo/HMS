import React, { useState, useEffect } from "react";
import api from "../api";

export default function DoctorForm() {
  const [form, setForm] = useState({ fullName: "", specialty: "", phone: "", email: "" });
  const [focused, setFocused] = useState("");
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/api/doctors", form);
      setMessage("success");
      setForm({ fullName: "", specialty: "", phone: "", email: "" });
    } catch {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .form-card { max-width: 620px; margin: auto; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 52px 56px; font-family: 'Space Mono', monospace; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; position: relative; }
        .form-card::after { content: ''; position: absolute; top: 0; left: 56px; right: 56px; height: 2px; background: linear-gradient(90deg, transparent, #00c87a, transparent); }
        .form-card.mounted { opacity: 1; transform: translateY(0); }
        .title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 4px; letter-spacing: -0.02em; }
        .subtitle { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 36px; }
        .field { margin-bottom: 24px; }
        .field-label { display: block; font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; transition: color 0.2s; }
        .field.is-focused .field-label { color: #00c87a; }
        .field-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 13px 16px; font-family: 'Space Mono', monospace; font-size: 13px; color: #fff; outline: none; transition: border-color 0.25s, background 0.25s; letter-spacing: 0.03em; }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }
        .field-input:focus { border-color: rgba(0,200,122,0.5); background: rgba(0,200,122,0.04); }
        .msg { padding: 12px 16px; border-radius: 4px; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 24px; }
        .msg.success { background: rgba(0,200,122,0.08); border: 1px solid rgba(0,200,122,0.25); color: #00c87a; }
        .msg.error { background: rgba(220,60,60,0.08); border: 1px solid rgba(220,60,60,0.25); color: #e07070; }
        .btn { width: 100%; margin-top: 12px; padding: 14px 24px; background: #00c87a; color: #0a0c0f; font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; border: none; border-radius: 4px; cursor: pointer; transition: background 0.2s, transform 0.15s, opacity 0.2s; }
        .btn:hover:not(:disabled) { background: #00e88d; transform: translateY(-1px); }
        .btn:active { transform: translateY(0); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className={`form-card ${mounted ? "mounted" : ""}`}>
        <h2 className="title">Add Doctor</h2>
        <p className="subtitle">New physician registration</p>

        {message === "success" && <div className="msg success">✓ Doctor added successfully</div>}
        {message === "error"   && <div className="msg error">✗ Error adding doctor — please try again</div>}

        <form onSubmit={handleSubmit}>
          {[
            { name: "fullName",  label: "Full Name",      placeholder: "Dr. Jane Smith",       type: "text"  },
            { name: "specialty", label: "Specialty",      placeholder: "e.g. Cardiology",      type: "text"  },
            { name: "phone",     label: "Phone Number",   placeholder: "+1 000 000 0000",      type: "tel"   },
            { name: "email",     label: "Email Address",  placeholder: "doctor@hospital.com",  type: "email" },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name} className={`field ${focused === name ? "is-focused" : ""}`}>
              <label className="field-label">{label}</label>
              <input
                className="field-input"
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                onFocus={() => setFocused(name)}
                onBlur={() => setFocused("")}
                placeholder={placeholder}
                required={["fullName", "specialty"].includes(name)}
              />
            </div>
          ))}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Saving..." : "Save Doctor →"}
          </button>
        </form>
      </div>
    </>
  );
}
