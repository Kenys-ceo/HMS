import React, { useState, useEffect } from "react";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // FIX: route must match how the router is mounted on the server.
      // If your Express app does: app.use("/api/auth", authRouter)
      // then the full path is /api/auth/login — adjust the prefix to match your server.
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("authToken", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Space Mono', monospace;
          background: #0a0c0f;
          overflow: hidden;
        }

        /* ── Left panel – decorative ── */
        .login-panel-left {
          position: relative;
          background: #0e1117;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .panel-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,200,150,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,150,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .panel-blob {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,200,130,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
        }

        .panel-content {
          position: relative;
          z-index: 1;
          padding: 60px;
          max-width: 480px;
        }

        .panel-tag {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #00c87a;
          border: 1px solid rgba(0,200,122,0.3);
          padding: 5px 12px;
          border-radius: 2px;
          margin-bottom: 28px;
        }

        .panel-headline {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .panel-headline span {
          color: #00c87a;
        }

        .panel-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.38);
          line-height: 1.8;
          letter-spacing: 0.04em;
          margin-bottom: 48px;
        }

        .panel-stats {
          display: flex;
          gap: 32px;
        }

        .stat-item { }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* ── Right panel – form ── */
        .login-panel-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 80px;
          background: #0a0c0f;
          position: relative;
        }

        .login-panel-right::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(0,200,122,0.3) 40%, rgba(0,200,122,0.3) 60%, transparent);
        }

        .login-form-box {
          width: 100%;
          max-width: 440px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .login-form-box.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .form-eyebrow {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 12px;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .form-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em;
          margin-bottom: 44px;
        }

        .error-box {
          background: rgba(220, 60, 60, 0.08);
          border: 1px solid rgba(220, 60, 60, 0.25);
          border-left: 3px solid #dc3c3c;
          padding: 12px 16px;
          border-radius: 3px;
          margin-bottom: 28px;
          font-size: 11px;
          color: #e07070;
          letter-spacing: 0.03em;
        }

        .field {
          margin-bottom: 28px;
        }

        .field-label {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 10px;
          transition: color 0.2s ease;
        }

        .field.is-focused .field-label {
          color: #00c87a;
        }

        .input-wrap {
          position: relative;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 14px 18px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #ffffff;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          letter-spacing: 0.04em;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.18);
        }

        .field-input:focus {
          border-color: rgba(0,200,122,0.5);
          background: rgba(0,200,122,0.04);
        }

        .field-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #0f1318 inset !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        .submit-btn {
          width: 100%;
          margin-top: 12px;
          padding: 15px 24px;
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
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          background: #00e88d;
          transform: translateY(-1px);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .footer-note {
          margin-top: 32px;
          text-align: center;
          font-size: 9px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .footer-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00c87a;
          margin-right: 8px;
          vertical-align: middle;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel-left { display: none; }
          .login-panel-right { padding: 40px 24px; }
        }
      `}</style>

      <div className="login-root">
        {/* Left decorative panel */}
        <div className="login-panel-left">
          <div className="panel-bg-grid" />
          <div className="panel-blob" />
          <div className="panel-content">
            <div className="panel-tag">● System Active</div>
            <h1 className="panel-headline">
              Medi<span>Core</span><br />HMS
            </h1>
            <p className="panel-desc">
              Integrated hospital management platform for clinical staff.
              Manage patients, doctors, appointments, invoices and reports from one place.
            </p>
            <div className="panel-stats">
              <div className="stat-item">
                <div className="stat-num">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">256-bit</div>
                <div className="stat-label">Encrypted</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">HIPAA</div>
                <div className="stat-label">Compliant</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-panel-right">
          <div className={`login-form-box${mounted ? " mounted" : ""}`}>
            <p className="form-eyebrow">Staff Portal · v2.0</p>
            <h2 className="form-title">Sign in</h2>
            <p className="form-sub">Authorised personnel only. All activity is logged.</p>

            {error && <div className="error-box">⚠ {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={`field${focused === "username" ? " is-focused" : ""}`}>
                <label className="field-label" htmlFor="username">Username</label>
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
                    required
                  />
                </div>
              </div>

              <div className={`field${focused === "password" ? " is-focused" : ""}`}>
                <label className="field-label" htmlFor="password">Password</label>
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
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Authenticating..." : "Authenticate →"}
              </button>
            </form>

            <p className="footer-note">
              <span className="footer-dot" />
              Secure connection · Session expires in 8h
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
