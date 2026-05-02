import React, { useEffect, useRef, useState } from "react";
import api from "../api";
import { useToast } from "./ToastContext";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const statusStyle = {
  EXECUTED:  { background: "rgba(29,138,80,0.1)",   color: "#1d8a50" },
  PENDING:   { background: "rgba(176,118,54,0.1)",  color: "#b07636" },
  CANCELLED: { background: "rgba(201,58,58,0.1)",   color: "#c93a3a" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { showToast } = useToast();
  const prevOrdersRef = useRef(null);

  const fetchOrders = () => {
    api.get("/allOrders").then((res) => {
      const next = res.data;
      // Detect limit orders that just got executed
      if (prevOrdersRef.current) {
        const prevMap = Object.fromEntries(prevOrdersRef.current.map((o) => [o._id, o]));
        next.forEach((o) => {
          const prev = prevMap[o._id];
          if (prev && prev.status === "PENDING" && o.status === "EXECUTED") {
            showToast(
              `🎯 Limit order executed — ${o.mode} ${o.qty}× ${o.name} @ ₹${o.executedPrice?.toFixed(2)}`,
              "success"
            );
          }
        });
      }
      prevOrdersRef.current = next;
      setOrders(next);
    }).catch(() => {});
  };

  useEffect(() => {
    fetchOrders();
    const id = setInterval(fetchOrders, 15000);
    return () => clearInterval(id);
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/cancelOrder/${id}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "CANCELLED" } : o))
      );
    } catch (err) {
      alert(err.response?.data?.error || "Could not cancel order");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders page-shell">
        <div className="page-header">
          <h3 className="title">Orders</h3>
          <p className="page-subtitle">Your market and limit orders will appear here once placed.</p>
        </div>
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      </div>
    );
  }

  const pending   = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div className="page-shell">
      <div className="page-header">
        <h3 className="title">Orders ({orders.length})</h3>
        <p className="page-subtitle">
          Every buy and sell instruction for your simulator account.
          {pending > 0 && (
            <span className="orders-pending-note"> · {pending} limit order{pending > 1 ? "s" : ""} waiting to trigger.</span>
          )}
        </p>
      </div>

      <div className="data-card order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Side</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Limit price</th>
              <th>Exec. price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const sideClass = order.mode === "BUY" ? "profit" : "loss";
              const ss        = statusStyle[order.status] || statusStyle.EXECUTED;

              return (
                <tr key={order._id}>
                  <td style={{ fontWeight: 700 }}>{order.name}</td>
                  <td className={sideClass}>{order.mode}</td>
                  <td>
                    <span className="order-type-tag">
                      {order.orderType === "LIMIT" ? "🎯 Limit" : "⚡ Market"}
                    </span>
                  </td>
                  <td>{order.qty}</td>
                  <td>{order.limitPrice    ? `₹${fmt(order.limitPrice)}`    : <span style={{ color: "var(--muted-soft)" }}>—</span>}</td>
                  <td>{order.executedPrice ? `₹${fmt(order.executedPrice)}` : <span style={{ color: "var(--muted-soft)" }}>—</span>}</td>
                  <td>
                    <span className="order-status-badge" style={ss}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "PENDING" && (
                      <button
                        className="order-cancel-btn"
                        onClick={() => handleCancel(order._id)}
                        title="Cancel this limit order"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="orders-legend">
        <div className="legend-item">
          <span style={{ color: "#1d8a50", fontWeight: 700 }}>⚡ Market</span>
          <span>— Executed immediately at the live price</span>
        </div>
        <div className="legend-item">
          <span style={{ color: "#b07636", fontWeight: 700 }}>🎯 Limit</span>
          <span>— Waits until market hits your target price</span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
