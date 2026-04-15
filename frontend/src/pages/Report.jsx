import React, { useEffect, useState } from "react";
import api from "../api";

export default function Reports() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("daily");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/reports/${tab}`)
      .then((res) => setReport(res.data))
      .catch(() => setError("Failed to load report data."))
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        .report-card {
          width: 100%;
          background: rgba(255, 252, 248, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 184, 154, 0.35);
          border-radius: 4px;
          padding: 40px;
          box-shadow:
            0 2px 4px rgba(80, 60, 30, 0.04),
            0 8px 24px rgba(80, 60, 30, 0.07),
            0 32px 64px rgba(80, 60, 30, 0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          position: relative;
        }

        .report-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 40px;
          right: 40px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9dc0b3, #c4a87a, transparent);
        }

        .report-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .title {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          color: #1e1a12;
          margin: 0;
        }

        .tabs {
          display: flex;
          gap: 4px;
        }

        .tab-btn {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 7px 16px;
          border: 1px solid #d8cfc0;
          background: transparent;
          color: #9c8f78;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background: #1e1a12;
          color: #f5f2ee;
          border-color: #1e1a12;
        }

        .tab-btn:hover:not(.active) {
          background: #f0ebe5;
          border-color: #9dc0b3;
        }

        .error-box {
          background: rgba(220, 80, 60, 0.06);
          border: 1px solid rgba(220, 80, 60, 0.2);
          border-left: 3px solid #dc503c;
          padding: 10px 14px;
          border-radius: 2px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #a83020;
          margin-bottom: 20px;
        }

        .loading {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #9c8f78;
          letter-spacing: 0.12em;
          text-align: center;
          padding: 40px 0;
        }

        .table-wrap {
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9c8f78;
          padding: 10px 14px;
          border-bottom: 1.5px solid #d8cfc0;
          text-align: left;
          white-space: nowrap;
        }

        .table td {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #3a3020;
          padding: 12px 14px;
          border-bottom: 1px solid #ede8e0;
          letter-spacing: 0.02em;
        }

        .table tbody tr {
          transition: background 0.15s ease;
        }

        .table tbody tr:hover {
          background: #f5f0ea;
        }

        .table tbody tr:last-child td {
          border-bottom: none;
        }

        .amount {
          font-weight: 500;
          color: #5a9a87;
        }

        .empty {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #c4b8a2;
          letter-spacing: 0.1em;
          text-align: center;
          padding: 40px 0;
        }
      `}</style>

      <div className={`report-card ${mounted ? "mounted" : ""}`}>
        <div className="header">
          <h2 className="title">
            {tab === "daily" ? "Daily Report" : "Monthly Report"}
          </h2>
          <div className="tabs">
            <button
              className={`tab-btn ${tab === "daily" ? "active" : ""}`}
              onClick={() => setTab("daily")}
            >
              Daily
            </button>
            <button
              className={`tab-btn ${tab === "monthly" ? "active" : ""}`}
              onClick={() => setTab("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        {error && <div className="error-box">⚠ {error}</div>}

        {loading ? (
          <div className="loading">Loading report data…</div>
        ) : report.length === 0 ? (
          <div className="empty">No records found for this period.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  {tab === "monthly" && <th>Appointments</th>}
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {report.map((row, i) => (
                  <tr key={i}>
                    <td>{row.PatientName}</td>
                    <td>{row.DoctorName}</td>
                    <td>{row.AppointmentDate || `Month ${row.Month}`}</td>
                    <td>{row.Diagnosis ?? "—"}</td>
                    {tab === "monthly" && <td>{row.TotalAppointments}</td>}
                    <td className="amount">
                      ${(row.InvoiceAmount ?? row.TotalRevenue ?? 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
