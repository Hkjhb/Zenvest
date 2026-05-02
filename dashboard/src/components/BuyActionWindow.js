import React, { useContext, useState, useEffect } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import { useToast } from "./ToastContext";
import { useTradingMode } from "./TradingModeContext";
import "./BuyActionWindow.css";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const BuyActionWindow = ({ uid, mode = "BUY", currentPrice = 0 }) => {
  const generalContext = useContext(GeneralContext);
  const { showToast } = useToast();
  const { mode: tradingMode } = useTradingMode();
  const isSell = mode === "SELL";
  const isLive = tradingMode === "live";

  const [orderType,  setOrderType]  = useState("MARKET");   // MARKET | LIMIT
  const [qty,        setQty]        = useState(1);
  const [limitPrice, setLimitPrice] = useState("");
  const [livePrice,  setLivePrice]  = useState(currentPrice);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [success,    setSuccess]    = useState(false);

  // Refresh live price every 10 s while window is open
  useEffect(() => {
    let cancelled = false;
    const fetchPrice = () => {
      api.get(`/marketPrice/${uid}`).then((res) => {
        if (!cancelled) setLivePrice(res.data.price);
      }).catch(() => {});
    };
    if (currentPrice === 0) fetchPrice();
    const id = setInterval(fetchPrice, 10000);
    return () => { cancelled = true; clearInterval(id); };
  }, [uid, currentPrice]);

  const effectivePrice = orderType === "MARKET" ? livePrice : Number(limitPrice) || 0;
  const tradeValue     = (Number(qty) * effectivePrice).toFixed(2);

  // Limit order hint text
  const limitHint = () => {
    if (orderType !== "LIMIT" || !livePrice) return null;
    if (!isSell) {
      return `Set a price BELOW ₹${fmt(livePrice)} — order triggers when market drops to your price.`;
    }
    return `Set a price ABOVE ₹${fmt(livePrice)} — order triggers when market rises to your price.`;
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name:      uid,
        qty:       Number(qty),
        mode,
        orderType,
        ...(orderType === "LIMIT" && { limitPrice: Number(limitPrice) }),
      };
      await api.post("/newOrder", payload);
      setSuccess(true);
      if (orderType === "LIMIT") {
        showToast(`🎯 Limit order set — ${isSell ? "sell" : "buy"} ${qty}× ${uid} @ ₹${fmt(Number(limitPrice))}`, "info");
      } else {
        showToast(`${isSell ? "Sold" : "Bought"} ${qty}× ${uid} @ ₹${fmt(livePrice)}`, "success");
      }
      setTimeout(() => generalContext.closeBuyWindow(), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="ow-container ow-success-state">
        <div className="ow-success">
          <div className="ow-success-icon">✓</div>
          <p className="ow-success-title">
            {orderType === "LIMIT" ? "Limit order placed!" : "Order executed!"}
          </p>
          <p className="ow-success-sub">
            {orderType === "LIMIT"
              ? `Will execute when ${uid} ${isSell ? "rises to" : "drops to"} ₹${fmt(Number(limitPrice))}`
              : `${isSell ? "Sold" : "Bought"} ${qty}× ${uid} @ ₹${fmt(livePrice)}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ow-container" id="buy-window">

      {/* ── Header ── */}
      <div className="ow-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className={`ow-mode-badge ${isSell ? "sell" : "buy"}`}>
            {isSell ? "SELL" : "BUY"}
          </span>
          <span className="ow-stock-name">{uid}</span>
          {isLive && (
            <span className="ow-live-badge">
              <span className="live-dot" />
              LIVE
            </span>
          )}
        </div>
        <button className="ow-close" onClick={() => generalContext.closeBuyWindow()}>✕</button>
      </div>

      {/* ── Live price strip ── */}
      <div className="ow-price-strip">
        <span className="ow-price-label">Market price</span>
        <span className="ow-price-value">
          {livePrice ? `₹${fmt(livePrice)}` : "Loading…"}
        </span>
      </div>

      {/* ── Order type toggle ── */}
      <div className="ow-body">
        <p className="ow-section-label">Order type</p>
        <div className="ow-type-toggle">
          <button
            className={`ow-type-btn ${orderType === "MARKET" ? "active" : ""}`}
            onClick={() => { setOrderType("MARKET"); setError(null); }}
          >
            <span className="ow-type-icon">⚡</span>
            Market
            <span className="ow-type-sub">Execute now at live price</span>
          </button>
          <button
            className={`ow-type-btn ${orderType === "LIMIT" ? "active" : ""}`}
            onClick={() => { setOrderType("LIMIT"); setError(null); }}
          >
            <span className="ow-type-icon">🎯</span>
            Limit
            <span className="ow-type-sub">Set your target price</span>
          </button>
        </div>

        {/* ── Inputs ── */}
        <div className="ow-inputs">
          <fieldset className="ow-field">
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </fieldset>

          <fieldset className={`ow-field ${orderType === "MARKET" ? "ow-field-locked" : ""}`}>
            <legend>{orderType === "MARKET" ? "Price (live)" : "Limit price"}</legend>
            <input
              type="number"
              step="0.05"
              value={orderType === "MARKET" ? (livePrice || "") : limitPrice}
              readOnly={orderType === "MARKET"}
              onChange={(e) => orderType === "LIMIT" && setLimitPrice(e.target.value)}
              placeholder={orderType === "LIMIT" ? `e.g. ${livePrice ? (isSell ? fmt(livePrice * 1.03) : fmt(livePrice * 0.97)) : "0.00"}` : ""}
            />
          </fieldset>
        </div>

        {/* ── Hint for limit orders ── */}
        {orderType === "LIMIT" && limitHint() && (
          <div className="ow-hint">
            <span className="ow-hint-icon">ℹ</span>
            {limitHint()}
          </div>
        )}

        {/* ── Market order note ── */}
        {orderType === "MARKET" && (
          <div className="ow-hint ow-hint-market">
            <span className="ow-hint-icon">⚡</span>
            Executes immediately at the current market price of ₹{livePrice ? fmt(livePrice) : "…"}
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="ow-error">
            <span className="ow-error-icon">⚠</span>
            {error}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="ow-footer">
        <div className="ow-estimate">
          <span className="ow-est-label">
            Est. value
            {isLive && <span className="ow-balance-source"> · Live balance</span>}
            {!isLive && <span className="ow-balance-source"> · Virtual balance</span>}
          </span>
          <span className="ow-est-value">₹{tradeValue}</span>
        </div>
        <div className="ow-actions">
          <button
            className={`ow-btn ${isSell ? "ow-btn-sell" : "ow-btn-buy"}`}
            onClick={handleSubmit}
            disabled={loading || !livePrice}
          >
            {loading
              ? "Placing…"
              : orderType === "MARKET"
                ? isSell ? "Sell at Market" : "Buy at Market"
                : isSell ? "Set Sell Limit" : "Set Buy Limit"}
          </button>
          <button className="ow-btn ow-btn-cancel" onClick={() => generalContext.closeBuyWindow()}>
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default BuyActionWindow;
