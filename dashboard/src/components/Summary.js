import React, { useEffect, useState } from "react";

import api from "../api";
import { useAuth } from "./AuthContext";

const formatCompactNumber = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    notation: "compact",
  }).format(value || 0);

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value || 0);

const Summary = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api
      .get("/summary")
      .then((res) => setSummary(res.data))
      .catch(() => setSummary(null));
  }, []);

  if (!summary) {
    return (
      <div className="page-shell">
        <div className="page-header">
          <h6>Hi, {user?.username || "User"}!</h6>
          <p className="page-subtitle">Track your simulated balance, exposure, and portfolio performance.</p>
        </div>
        <div className="summary-grid">
          <div className="summary-card summary-skeleton" />
          <div className="summary-card summary-skeleton" />
        </div>
      </div>
    );
  }

  const pnlClass = summary.pnl >= 0 ? "profit" : "loss";
  const pnlSign  = summary.pnl >= 0 ? "+" : "";

  return (
    <div className="page-shell">
      <div className="page-header">
        <h6>Hi, {user?.username || "User"}!</h6>
        <p className="page-subtitle">
          Track your simulated balance, exposure, and portfolio performance.
        </p>
      </div>

      <div className="summary-grid">
        {/* ── Equity card ── */}
        <div className="summary-card">
          <p className="sc-label">Equity</p>
          <p className="sc-main">{formatCompactNumber(summary.cashBalance)}</p>
          <p className="sc-sub">Margin available</p>
          <div className="sc-divider" />
          <div className="sc-rows">
            <div className="sc-row">
              <span>Margins used</span>
              <span className="sc-val">{formatMoney(summary.marginsUsed)}</span>
            </div>
            <div className="sc-row">
              <span>Opening balance</span>
              <span className="sc-val">{formatMoney(summary.openingBalance)}</span>
            </div>
          </div>
        </div>

        {/* ── Holdings card ── */}
        <div className="summary-card">
          <p className="sc-label">Holdings ({summary.holdingsCount})</p>
          <p className={`sc-main ${pnlClass}`}>
            {pnlSign}{formatCompactNumber(summary.pnl)}
            <span className="sc-badge">{summary.pnlPercent.toFixed(2)}%</span>
          </p>
          <p className="sc-sub">P&amp;L</p>
          <div className="sc-divider" />
          <div className="sc-rows">
            <div className="sc-row">
              <span>Current value</span>
              <span className="sc-val">{formatMoney(summary.currentValue)}</span>
            </div>
            <div className="sc-row">
              <span>Investment</span>
              <span className="sc-val">{formatMoney(summary.investment)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="insight-banner">
        <div>
          <p className="insight-label">Portfolio health</p>
          <h4>
            {summary.pnl >= 0
              ? "Your simulated book is in profit"
              : "Your simulated book is under pressure"}
          </h4>
        </div>
        <p className={`insight-stat ${pnlClass}`}>
          {pnlSign}{formatMoney(summary.pnl)}
        </p>
      </div>
    </div>
  );
};

export default Summary;
