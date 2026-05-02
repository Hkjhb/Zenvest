import React, { useState, useEffect } from "react";
import api from "../api";
import { VerticalGraph } from "./VerticalGraph";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    api.get("/allHoldings").then((res) => setAllHoldings(res.data));
  }, []);

  /* ── Calculated totals from real data ── */
  const totalInvestment = allHoldings.reduce((s, h) => s + h.avg   * h.qty, 0);
  const currentValue    = allHoldings.reduce((s, h) => s + h.price * h.qty, 0);
  const totalPnL        = currentValue - totalInvestment;
  const pnlPercent      = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const pnlClass        = totalPnL >= 0 ? "profit" : "loss";

  /* ── Chart data ── */
  const warmColors = [
    "rgba(176,118,54,0.7)",  "rgba(217,98,67,0.7)",  "rgba(29,138,80,0.7)",
    "rgba(176,118,54,0.45)", "rgba(90,50,10,0.6)",   "rgba(217,98,67,0.45)",
    "rgba(29,138,80,0.45)",  "rgba(176,118,54,0.55)","rgba(201,58,58,0.6)",
    "rgba(90,50,10,0.45)",   "rgba(217,98,67,0.6)",  "rgba(176,118,54,0.3)",
    "rgba(29,138,80,0.55)",  "rgba(201,58,58,0.45)",
  ];

  const chartData = {
    labels: allHoldings.map((h) => h.name),
    datasets: [{
      label: "Current value (₹)",
      data:  allHoldings.map((h) => parseFloat((h.price * h.qty).toFixed(2))),
      backgroundColor: allHoldings.map((_, i) => warmColors[i % warmColors.length]),
      borderRadius: 6,
    }],
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <h3 className="title">Holdings ({allHoldings.length})</h3>
        <p className="page-subtitle">Long-term positions currently held in your simulator account.</p>
      </div>

      {/* ── Holdings table ── */}
      <div className="data-card order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curVal   = stock.price * stock.qty;
              const pnl      = curVal - stock.avg * stock.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass  = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td style={{ fontWeight: 700 }}>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{fmt(stock.avg)}</td>
                  <td>₹{fmt(stock.price)}</td>
                  <td>₹{fmt(curVal)}</td>
                  <td className={profClass}>
                    {pnl >= 0 ? "+" : ""}₹{fmt(pnl)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Real calculated stat tiles ── */}
      <div className="row stats-row">
        <div className="col stat-tile">
          <h5>₹{fmt(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col stat-tile">
          <h5>₹{fmt(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col stat-tile">
          <h5 className={pnlClass}>
            {totalPnL >= 0 ? "+" : ""}₹{fmt(totalPnL)}
            <span> ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)</span>
          </h5>
          <p>Total P&amp;L</p>
        </div>
      </div>

      {/* ── Chart ── */}
      {allHoldings.length > 0 && (
        <div className="data-card chart-card">
          <VerticalGraph data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Holdings;
