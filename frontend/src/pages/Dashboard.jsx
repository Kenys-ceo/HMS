import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = [
    { to: "/patients",     icon: "🧑‍⚕️", label: "Patients",     desc: "Register & manage" },
    { to: "/doctors",      icon: "👨‍⚕️", label: "Doctors",      desc: "Physician records" },
    { to: "/appointments", icon: "📅", label: "Appointments", desc: "Schedule & track" },
    { to: "/invoices",     icon: "💳", label: "Invoices",     desc: "Billing & payments" },
    { to: "/reports",      icon: "📊", label: "Reports",      desc: "Daily & monthly" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          min-height: 100vh;
          background: #0a0c0f;
          font-family: 'Space Mono', monospace;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .dash-root::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,200,130,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,200,150,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,150,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .dash-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 56px 64px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .dash-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 52px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .brand-cross {
          width: 36px;
          height: 36px;
          position: relative;
          flex-shrink: 0;
        }

        .ch { position: absolute; top: 50%; left: 0; right: 0; height: 10px; background: #00c87a; transform: translateY(-50%); border-radius: 2px; }
        .cv { position: absolute; left: 50%; top: 0; bottom: 0; width: 10px; background: #00c87a; transform: translateX(-50%); border-radius: 2px; }

        .brand-info {}
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .brand-sub {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 2px;
        }

        .status-pill {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #00c87a;
          border: 1px solid rgba(0,200,122,0.3);
          padding: 6px 14px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00c87a;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .dash-title {
          font-family: 'Syne', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .dash-sub {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 48px;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
        }

        .module-card {
          display: block;
          padding: 28px 22px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          background: rgba(255,255,255,0.02);
          text-decoration: none;
          color: #fff;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .module-card::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #00c87a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .module-card:hover {
          border-color: rgba(0,200,122,0.3);
          background: rgba(0,200,122,0.05);
          transform: translateY(-3px);
        }

        .module-card:hover::before {
          transform: scaleX(1);
        }

        .module-icon {
          font-size: 28px;
          margin-bottom: 14px;
          display: block;
        }

        .module-label {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          display: block;
          margin-bottom: 4px;
        }

        .module-desc {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.06em;
        }

        @media (max-width: 600px) {
          .dash-card { padding: 32px 24px; }
          .dash-title { font-size: 28px; }
          .modules-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="dash-root">
        <div className="bg-grid" />
        <div className={`dash-card ${mounted ? "mounted" : ""}`}>
          <div className="dash-header">
            <div className="brand">
              <div className="brand-cross">
                <div className="ch" />
                <div className="cv" />
              </div>
              <div className="brand-info">
                <div className="brand-name">MediCore</div>
                <div className="brand-sub">Hospital Management System</div>
              </div>
            </div>
            <div className="status-pill">
              <div className="status-dot" />
              All systems operational
            </div>
          </div>

          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-sub">Select a module to continue</p>

          <div className="modules-grid">
            {modules.map((m) => (
              <Link key={m.to} to={m.to} className="module-card">
                <span className="module-icon">{m.icon}</span>
                <span className="module-label">{m.label}</span>
                <span className="module-desc">{m.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
