import React, { useState, useEffect } from "react";
import api from "../api";

export default function InvoiceForm() {
  const [form, setForm] = useState({
    appointmentId: "",
    totalAmount: "",
    paymentDate: "",
    paymentStatus: "Pending"
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
      await api.post("/invoices", form);
      setMessage("Invoice created successfully ✅");
      setForm({ appointmentId: "", totalAmount: "", paymentDate: "", paymentStatus: "Pending" });
    } catch {
      setMessage("Error creating invoice ❌");
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

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
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

        .field-input,
        .field-select {
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
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder {
          color: #c4b8a2;
          font-weight: 300;
        }

        .field-input:focus,
        .field-select:focus {
          border-color: #9dc0b3;
        }

        .field-select option {
          background: #f5f2ee;
          color: #1e1a12;
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

        .status-badges {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .badge {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid #d8cfc0;
          border-radius: 2px;
          cursor: pointer;
          background: transparent;
          color: #9c8f78;
          transition: all 0.2s ease;
        }

        .badge.active-paid {
          background: #e8f3ef;
          border-color: #9dc0b3;
          color: #5a9a87;
        }

        .badge.active-unpaid {
          background: #fdf0ee;
          border-color: #e0a898;
          color: #b06050;
        }

        .badge.active-pending {
          background: #fdf8ee;
          border-color: #d8c070;
          color: #907840;
        }

        .badge:hover {
          transform: translateY(-1px);
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
        <h2 className="title">Create Invoice</h2>
        <p className="subtitle">Billing &amp; payment record</p>

        {message && (
          <div className={`message ${message.includes("Error") ? "error" : ""}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={`field ${focused === "appointmentId" ? "is-focused" : ""}`}>
            <label className="field-label">Appointment ID</label>
            <div className="input-wrap">
              <input
                className="field-input"
                name="appointmentId"
                value={form.appointmentId}
                onChange={handleChange}
                onFocus={() => setFocused("appointmentId")}
                onBlur={() => setFocused("")}
                placeholder="e.g. 301"
                required
              />
              <div className="field-line" />
            </div>
          </div>

          <div className="row">
            <div className={`field ${focused === "totalAmount" ? "is-focused" : ""}`}>
              <label className="field-label">Total Amount ($)</label>
              <div className="input-wrap">
                <input
                  className="field-input"
                  type="number"
                  step="0.01"
                  min="0"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleChange}
                  onFocus={() => setFocused("totalAmount")}
                  onBlur={() => setFocused("")}
                  placeholder="0.00"
                  required
                />
                <div className="field-line" />
              </div>
            </div>

            <div className={`field ${focused === "paymentDate" ? "is-focused" : ""}`}>
              <label className="field-label">Payment Date</label>
              <div className="input-wrap">
                <input
                  className="field-input"
                  type="date"
                  name="paymentDate"
                  value={form.paymentDate}
                  onChange={handleChange}
                  onFocus={() => setFocused("paymentDate")}
                  onBlur={() => setFocused("")}
                />
                <div className="field-line" />
              </div>
            </div>
          </div>

          <div className="field">
            <label className="field-label">Payment Status</label>
            <div className="status-badges">
              {["Paid", "Unpaid", "Pending"].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`badge ${
                    form.paymentStatus === status
                      ? `active-${status.toLowerCase()}`
                      : ""
                  }`}
                  onClick={() => setForm({ ...form, paymentStatus: status })}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn">
            Save Invoice →
          </button>
        </form>
      </div>
    </>
  );
}
