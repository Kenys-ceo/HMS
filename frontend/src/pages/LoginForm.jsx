import React, { useState, useEffect } from "react";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("authToken", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f2ee;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(210, 195, 175, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(180, 210, 200, 0.3) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4b89a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        .login-root::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(157, 192, 179, 0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-root::after {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196, 168, 134, 0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 252, 248, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 184, 154, 0.35);
          border-radius: 4px;
          padding: 52px 48px;
          position: relative;
          z-index: 1;
          box-shadow:
            0 2px 4px rgba(80, 60, 30, 0.04),
            0 8px 24px rgba(80, 60, 30, 0.07),
            0 32px 64px rgba(80, 60, 30, 0.08);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .login-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 48px;
          right: 48px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9dc0b3, #c4a87a, transparent);
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          position: relative;
          flex-shrink: 0;
        }

        .cross-h {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 10px;
          background: #9dc0b3;
          transform: translateY(-50%);
          border-radius: 2px;
        }

        .cross-v {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 10px;
          background: #9dc0b3;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .brand-text { flex: 1; }

        .brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 15px;
          color: #2c2416;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }

        .brand-sub {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 300;
          color: #9c8f78;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .login-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #1e1a12;
          line-height: 1.15;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .login-heading em {
          font-style: italic;
          color: #7aaa99;
        }

        .login-sub {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          color: #a89d88;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 36px;
        }

        .divider {
          width: 32px;
          height: 1px;
          background: #c4b89a;
          margin-bottom: 36px;
        }

        .error-box {
          background: rgba(220, 80, 60, 0.06);
          border: 1px solid rgba(220, 80, 60, 0.2);
          border-left: 3px solid #dc503c;
          padding: 10px 14px;
          border-radius: 2px;
          margin-bottom: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #a83020;
          letter-spacing: 0.03em;
        }

        .field { margin-bottom: 22px; }

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

        .field.is-focused .field-label { color: #7aaa99; }

        .input-wrap { position: relative; }

        .field-input {
          width: 100%;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 400;
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

        .field-input:focus { border-color: #9dc0b3; }

        .field-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #9dc0b3;
          transition: width 0.3s ease;
        }

        .field.is-focused .field-line { width: 100%; }

        .submit-btn {
          width: 100%;
          margin-top: 36px;
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
          position: relative;
          overflow: hidden;
          transition: background 0.25s ease, transform 0.15s ease;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(157, 192, 179, 0.15), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover {
          background: #2c2416;
          transform: translateY(-1px);
        }

        .submit-btn:hover::before { left: 100%; }
        .submit-btn:active { transform: translateY(0); }

        .footer-note {
          margin-top: 28px;
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 300;
          color: #c4b8a2;
          letter-spacing: 0.12em;
        }
      `}</style>

      <div className="login-root">
        <div className={`login-card${mounted ? " mounted" : ""}`}>
          <div className="brand-mark">
            <div className="brand-icon">
              <div className="cross-h" />
              <div className="cross-v" />
            </div>
            <div className="brand-text">
              <div className="brand-name">MediCore</div>
              <div className="brand-sub">Hospital Management</div>
            </div>
          </div>

          <h1 className="login-heading">
            Secure <em>access</em><br />portal
          </h1>
          <p className="login-sub">Staff Authentication</p>
          <div className="divider" />

          {error && <div className="error-box">⚠ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={`field${focused === "username" ? " is-focused" : ""}`}>
              <label htmlFor="username" className="field-label">Username</label>
              <div className="input-wrap">
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your username"
                  className="field-input"
                  autoComplete="username"
                />
                <div className="field-line" />
              </div>
            </div>

            <div className={`field${focused === "password" ? " is-focused" : ""}`}>
              <label htmlFor="password" className="field-label">Password</label>
              <div className="input-wrap">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your password"
                  className="field-input"
                  autoComplete="current-password"
                />
                <div className="field-line" />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Authenticate →
            </button>
          </form>

          <p className="footer-note">Authorised personnel only · Secure connection</p>
        </div>
      </div>
    </>
  );
}
