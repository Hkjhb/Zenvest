import React, { useEffect, useState } from "react";
import api from "../api";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    api.get("/allPositions")
      .then((res) => setPositions(res.data))
      .catch(() => setPositions([]));
  }, []);

  /* ── Calculated totals ── */
  const totalPnL = positions.reduce((s, p) => s + (p.price * p.qty - p.avg * p.qty), 0);
  const pnlClass = totalPnL >= 0 ? "profit" : "loss";

  if (positions.length === 0) {
    return (
      <div className="page-shell">
        <div className="page-header">
          <h3 className="title">Positions</h3>
          <p className="page-subtitle">Active paper-trading positions updated from your latest orders.</p>
        </div>
        <div className="no-orders">
          <p>No open positions — place an order to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h3 className="title">Positions ({positions.length})</h3>
        <p className="page-subtitle">Active paper-trading positions updated from your latest orders.</p>
      </div>

      <div className="data-card order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curVal   = stock.price * stock.qty;
              const pnl      = curVal - stock.avg * stock.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass  = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>
                    <span className="order-type-tag">{stock.product}</span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{fmt(stock.avg)}</td>
                  <td>₹{fmt(stock.price)}</td>
                  <td>₹{fmt(curVal)}</td>
                  <td className={profClass}>
                    {pnl >= 0 ? "+" : ""}₹{fmt(pnl)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Total P&L tile ── */}
      <div className="row stats-row">
        <div className="col stat-tile">
          <h5 className={pnlClass}>
            {totalPnL >= 0 ? "+" : ""}₹{fmt(totalPnL)}
          </h5>
          <p>Total P&amp;L (open positions)</p>
        </div>
      </div>
    </div>
  );
};

export default Positions;
