import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        .dashboard-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f2ee;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        .dashboard-root::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(157, 192, 179, 0.25), transparent 70%);
        }

        .dashboard-root::after {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196, 168, 134, 0.2), transparent 70%);
        }

        .dashboard-card {
          width: 100%;
          max-width: 900px;
          background: rgba(255, 252, 248, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 184, 154, 0.35);
          border-radius: 6px;
          padding: 48px 40px;
          position: relative;
          box-shadow:
            0 2px 4px rgba(80, 60, 30, 0.04),
            0 8px 24px rgba(80, 60, 30, 0.07),
            0 32px 64px rgba(80, 60, 30, 0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 40px;
          right: 40px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9dc0b3, #c4a87a, transparent);
        }

        .dashboard-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
          justify-content: center;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          position: relative;
          flex-shrink: 0;
        }

        .cross-h {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 9px;
          background: #9dc0b3;
          transform: translateY(-50%);
          border-radius: 2px;
        }

        .cross-v {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 9px;
          background: #9dc0b3;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .brand-text { text-align: left; }

        .brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 14px;
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

        .title {
          font-family: 'DM Serif Display', serif;
          font-size: 30px;
          text-align: center;
          margin-bottom: 8px;
          color: #1e1a12;
        }

        .subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 300;
          color: #a89d88;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 36px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }

        .card-link {
          display: block;
          padding: 24px 16px;
          text-align: center;
          border: 1px solid #d8cfc0;
          border-radius: 4px;
          background: transparent;
          text-decoration: none;
          color: #1e1a12;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }

        .card-link:hover {
          background: #f0ebe5;
          transform: translateY(-3px);
          border-color: #9dc0b3;
          box-shadow: 0 8px 20px rgba(80, 60, 30, 0.08);
        }

        .icon {
          font-size: 24px;
          margin-bottom: 12px;
          display: block;
        }
      `}</style>

      <div className="dashboard-root">
        <div className={`dashboard-card ${mounted ? "mounted" : ""}`}>
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

          <h1 className="title">Dashboard</h1>
          <p className="subtitle">Select a module to continue</p>

          <div className="grid">
            <Link to="/patients" className="card-link">
              <span className="icon">🧑‍⚕️</span>
              Manage Patients
            </Link>

            <Link to="/doctors" className="card-link">
              <span className="icon">👨‍⚕️</span>
              Manage Doctors
            </Link>

            <Link to="/appointments" className="card-link">
              <span className="icon">📅</span>
              Appointments
            </Link>

            <Link to="/invoices" className="card-link">
              <span className="icon">💳</span>
              Manage Invoices
            </Link>

            <Link to="/reports" className="card-link">
              <span className="icon">📊</span>
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
