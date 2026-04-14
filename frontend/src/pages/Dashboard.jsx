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
          padding: 40px;
          box-shadow:
            0 8px 24px rgba(80, 60, 30, 0.07),
            0 32px 64px rgba(80, 60, 30, 0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .dashboard-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          text-align: center;
          margin-bottom: 30px;
          color: #1e1a12;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .card-link {
          display: block;
          padding: 20px;
          text-align: center;
          border: 1px solid #d8cfc0;
          border-radius: 4px;
          background: transparent;
          text-decoration: none;
          color: #1e1a12;
          font-size: 14px;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .card-link:hover {
          background: #f0ebe5;
          transform: translateY(-3px);
          border-color: #9dc0b3;
        }

        .icon {
          font-size: 22px;
          margin-bottom: 8px;
          display: block;
        }
      `}</style>

      <div className="dashboard-root">
        <div className={`dashboard-card ${mounted ? "mounted" : ""}`}>
          
          <h1 className="title">Hospital Management Dashboard</h1>

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
              Manage Appointments
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
