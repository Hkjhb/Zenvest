import React, { useEffect, useState } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { useTradingMode } from "./TradingModeContext";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);

const QUICK_AMOUNTS      = [5000, 10000, 25000, 50000];
const REAL_QUICK_AMOUNTS = [1000, 2500, 5000, 10000];

/* ─── Simulated Payment Modal ─────────────────────────── */
const PaymentModal = ({ onClose, onSuccess }) => {
  const [tab,        setTab]        = useState("card"); // card | upi | netbanking
  const [amount,     setAmount]     = useState("");
  const [cardNum,    setCardNum]    = useState("");
  const [expiry,     setExpiry]     = useState("");
  const [cvv,        setCvv]        = useState("");
  const [cardName,   setCardName]   = useState("");
  const [upiId,      setUpiId]      = useState("");
  const [bank,       setBank]       = useState("");
  const [phase,      setPhase]      = useState("form");  // form | processing | success
  const [quickAmt,   setQuickAmt]   = useState(null);

  const chosenAmount = quickAmt || Number(amount);

  const formatCard = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const handlePay = () => {
    if (!chosenAmount || chosenAmount <= 0) return;
    setPhase("processing");
    setTimeout(() => {
      setPhase("success");
      setTimeout(() => onSuccess(chosenAmount), 1800);
    }, 2200);
  };

  const canPay = chosenAmount > 0 && (
    (tab === "card"       && cardNum.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length === 3 && cardName.trim()) ||
    (tab === "upi"        && upiId.includes("@")) ||
    (tab === "netbanking" && bank)
  );

  if (phase === "processing") {
    return (
      <div className="pay-overlay">
        <div className="pay-modal pay-modal-center">
          <div className="pay-spinner" />
          <p className="pay-processing-title">Processing Payment</p>
          <p className="pay-processing-sub">Connecting to payment gateway…</p>
          <div className="pay-security-strip">
            <span className="pay-lock">🔒</span>
            <span>256-bit SSL encrypted · Secured by ZenPay</span>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="pay-overlay">
        <div className="pay-modal pay-modal-center">
          <div className="pay-success-icon">✓</div>
          <p className="pay-processing-title">Payment Successful!</p>
          <p className="pay-processing-sub">₹{fmt(chosenAmount)} added to your Live account</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pay-modal">

        {/* Header */}
        <div className="pay-header">
          <div>
            <p className="pay-brand">ZenPay</p>
            <p className="pay-brand-sub">Secure Payment Gateway</p>
          </div>
          <button className="pay-close" onClick={onClose}>✕</button>
        </div>

        {/* Amount picker */}
        <div className="pay-amount-section">
          <p className="pay-section-label">Deposit Amount (₹)</p>
          <div className="pay-quick-row">
            {REAL_QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                className={`pay-quick-btn ${quickAmt === a ? "selected" : ""}`}
                onClick={() => { setQuickAmt(a); setAmount(""); }}
              >
                ₹{(a / 1000).toFixed(a < 1000 ? 0 : 0)}
                {a >= 1000 ? "K" : ""}
              </button>
            ))}
          </div>
          <input
            className="pay-amount-input"
            type="number"
            placeholder="Or enter custom amount"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setQuickAmt(null); }}
          />
        </div>

        {/* Method tabs */}
        <div className="pay-tabs">
          {["card", "upi", "netbanking"].map((t) => (
            <button
              key={t}
              type="button"
              className={`pay-tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t === "card" ? "💳 Card" : t === "upi" ? "⚡ UPI" : "🏦 Net Banking"}
            </button>
          ))}
        </div>

        {/* Card form */}
        {tab === "card" && (
          <div className="pay-form">
            <div className="pay-field">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNum}
                onChange={(e) => setCardNum(formatCard(e.target.value))}
                maxLength={19}
              />
            </div>
            <div className="pay-field">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="pay-field-row">
              <div className="pay-field">
                <label>Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div className="pay-field">
                <label>CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )}

        {/* UPI form */}
        {tab === "upi" && (
          <div className="pay-form">
            <div className="pay-field">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <p className="pay-upi-note">A payment request will be sent to your UPI app</p>
          </div>
        )}

        {/* Net banking form */}
        {tab === "netbanking" && (
          <div className="pay-form">
            <div className="pay-field">
              <label>Select Bank</label>
              <select value={bank} onChange={(e) => setBank(e.target.value)} className="pay-select">
                <option value="">-- Choose your bank --</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
                <option>Punjab National Bank</option>
                <option>Bank of Baroda</option>
                <option>Yes Bank</option>
              </select>
            </div>
          </div>
        )}

        {/* Pay button */}
        <button
          className="pay-btn"
          onClick={handlePay}
          disabled={!canPay}
        >
          {chosenAmount > 0 ? `Pay ₹${fmt(chosenAmount)}` : "Pay Now"}
        </button>

        <div className="pay-security-strip">
          <span className="pay-lock">🔒</span>
          <span>Your payment is 100% secure · Simulation only</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Funds Page ─────────────────────────────────── */
const Funds = () => {
  const { showToast } = useToast();
  const { mode: tradingMode } = useTradingMode();
  const [summary,       setSummary]       = useState(null);
  const [amount,        setAmount]        = useState("");
  const [isAdding,      setIsAdding]      = useState(false);
  const [isResetting,   setIsResetting]   = useState(false);
  const [confirmReset,  setConfirmReset]  = useState(false);
  const [showPayModal,  setShowPayModal]  = useState(false);

  const fetchSummary = () => {
    api.get("/summary").then((res) => setSummary(res.data)).catch(() => {});
  };

  useEffect(() => { fetchSummary(); }, []);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (!num || num <= 0) return;
    setIsAdding(true);
    try {
      const res = await api.post("/addFunds", { amount: num });
      setSummary((prev) => prev ? { ...prev, cashBalance: res.data.cashBalance } : prev);
      showToast(`₹${fmt(num)} added to your virtual account!`, "success");
      setAmount("");
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to add funds", "error");
    } finally {
      setIsAdding(false);
    }
  };

  const handlePaymentSuccess = async (depositAmount) => {
    setShowPayModal(false);
    try {
      const res = await api.post("/addRealFunds", { amount: depositAmount });
      setSummary((prev) => prev ? { ...prev, realBalance: res.data.realBalance } : prev);
      showToast(`₹${fmt(depositAmount)} deposited to your Live account!`, "success");
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to credit funds", "error");
    }
  };

  const handleReset = async () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    setIsResetting(true);
    try {
      await api.post("/resetPortfolio");
      showToast("Portfolio reset — starting fresh with ₹50,000!", "success");
      setConfirmReset(false);
      fetchSummary();
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to reset portfolio", "error");
    } finally {
      setIsResetting(false);
    }
  };

  const totalValue = summary ? (summary.cashBalance ?? 0) + (summary.currentValue ?? 0) : 0;
  const pnlClass   = summary?.pnl >= 0 ? "profit" : "loss";
  const pnlSign    = summary?.pnl >= 0 ? "+" : "";

  return (
    <div className="page-shell">
      {showPayModal && (
        <PaymentModal
          onClose={() => setShowPayModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <div className="page-header">
        <h3 className="title">Funds</h3>
        <p className="page-subtitle">
          {tradingMode === "live"
            ? "Live mode active — using your real balance for trades."
            : "Manage your balances — virtual for practice, real for live trading."}
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="funds-hero">
        <div className="funds-stat-card">
          <p>Available cash</p>
          <h4>₹{fmt(summary?.cashBalance)}</h4>
        </div>
        <div className="funds-stat-card">
          <p>Holdings value</p>
          <h4>₹{fmt(summary?.currentValue)}</h4>
        </div>
        <div className="funds-stat-card">
          <p>Total portfolio</p>
          <h4>₹{fmt(totalValue)}</h4>
        </div>
        <div className="funds-stat-card">
          <p>Overall P&amp;L</p>
          <h4 className={pnlClass}>{pnlSign}₹{fmt(summary?.pnl)}</h4>
        </div>
      </div>

      {/* ── Real money card ── */}
      <div className="data-card real-money-card" style={{ marginBottom: 20 }}>
        <div className="real-money-header">
          <div>
            <p className="real-money-title">
              <span className="live-dot-inline" /> Live Balance
            </p>
            <p className="real-money-sub">Deposit real funds to trade in Live mode</p>
          </div>
          <div className="real-balance-chip">
            <span className="real-balance-label">Available</span>
            <span className="real-balance-value">₹{fmt(summary?.realBalance)}</span>
          </div>
        </div>
        <button
          className="btn-deposit"
          onClick={() => setShowPayModal(true)}
        >
          + Deposit Funds
        </button>
        <p className="funds-note" style={{ marginTop: 10 }}>
          Simulated payment gateway · No real money is charged
        </p>
      </div>

      {/* ── Add virtual funds ── */}
      <div className="data-card" style={{ marginBottom: 20 }}>
        <p style={{ fontWeight: 600, marginBottom: 14 }}>Add virtual funds</p>
        <form className="funds-add-form" onSubmit={handleAddFunds}>
          <label>Amount (₹)</label>
          <input
            type="number"
            min="1"
            max="100000"
            placeholder="e.g. 10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit" className="btn-funds-add" disabled={isAdding || !amount}>
            {isAdding ? "Adding…" : "Add funds"}
          </button>
        </form>

        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              className="btn-funds-add"
              style={{ fontSize: "0.8rem", padding: "6px 14px" }}
              onClick={() => setAmount(String(a))}
              type="button"
            >
              +₹{(a / 1000).toFixed(0)}K
            </button>
          ))}
        </div>
        <p className="funds-note">Maximum ₹1,00,000 per top-up · Funds are added instantly</p>
      </div>

      {/* ── Reset portfolio ── */}
      <div className="data-card">
        <p style={{ fontWeight: 600, marginBottom: 6 }}>Reset portfolio</p>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 14 }}>
          Clears all holdings, positions, and orders. Restores your cash balance to ₹50,000 with the default starter portfolio.
        </p>
        {confirmReset ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.9rem", color: "#c93a3a", fontWeight: 600 }}>
              Are you sure? This cannot be undone.
            </span>
            <button className="btn-funds-reset" onClick={handleReset} disabled={isResetting}>
              {isResetting ? "Resetting…" : "Yes, reset"}
            </button>
            <button
              className="btn-funds-add"
              style={{ fontSize: "0.85rem" }}
              onClick={() => setConfirmReset(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn-funds-reset" onClick={handleReset}>
            Reset portfolio
          </button>
        )}
      </div>
    </div>
  );
};

export default Funds;
