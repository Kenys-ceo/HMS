import React, { useEffect, useState } from "react";
import api from "../api";

export default function Reports() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("daily");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    api.get(`/api/reports/${tab}`)
      .then((res) => setReport(res.data))
      .catch(() => setError("Failed to load report data."))
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .report-card { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 44px 52px; font-family: 'Space Mono', monospace; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; position: relative; }
        .report-card::after { content: ''; position: absolute; top: 0; left: 52px; right: 52px; height: 2px; background: linear-gradient(90deg, transparent, #00c87a, transparent); }
        .report-card.mounted { opacity: 1; transform: translateY(0); }

        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; flex-wrap: wrap; gap: 16px; }

        .title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }

        .tabs { display: flex; gap: 6px; }

        .tab-btn { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 8px 20px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: rgba(255,255,255,0.3); cursor: pointer; border-radius: 3px; transition: all 0.2s ease; }
        .tab-btn.active { background: #00c87a; color: #0a0c0f; border-color: #00c87a; }
        .tab-btn:hover:not(.active) { border-color: rgba(0,200,122,0.4); color: rgba(255,255,255,0.7); }

        .error-box { background: rgba(220,60,60,0.08); border: 1px solid rgba(220,60,60,0.25); border-left: 3px solid #dc3c3c; padding: 12px 16px; border-radius: 3px; font-size: 11px; color: #e07070; margin-bottom: 24px; }

        .loading, .empty { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.12em; text-align: center; padding: 60px 0; }

        .table-wrap { overflow-x: auto; }

        .table { width: 100%; border-collapse: collapse; }

        .table th { font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3); padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); text-align: left; white-space: nowrap; }

        .table td { font-size: 12px; color: rgba(255,255,255,0.7); padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); letter-spacing: 0.02em; }

        .table tbody tr { transition: background 0.15s ease; }
        .table tbody tr:hover { background: rgba(255,255,255,0.03); }
        .table tbody tr:last-child td { border-bottom: none; }

        .amount { color: #00c87a; font-weight: 700; }
      `}</style>

      <div className={`report-card ${mounted ? "mounted" : ""}`}>
        <div className="header">
          <h2 className="title">{tab === "daily" ? "Daily Report" : "Monthly Report"}</h2>
          <div className="tabs">
            <button className={`tab-btn ${tab === "daily" ? "active" : ""}`} onClick={() => setTab("daily")}>Daily</button>
            <button className={`tab-btn ${tab === "monthly" ? "active" : ""}`} onClick={() => setTab("monthly")}>Monthly</button>
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
                    <td className="amount">${(row.InvoiceAmount ?? row.TotalRevenue ?? 0).toFixed(2)}</td>
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
