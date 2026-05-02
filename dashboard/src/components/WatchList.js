import React, { useState, useContext, useEffect, useRef } from "react";

import api from "../api";
import GeneralContext from "./GeneralContext";
import { useToast } from "./ToastContext";

import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Filler, Tooltip as ChartTooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, ChartTooltip);

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

/* ─── Simulate 7-day price history around current price ─── */
const simulatePriceHistory = (currentPrice) => {
  const points = [];
  let p = currentPrice * (0.94 + Math.random() * 0.04);
  for (let i = 0; i < 7; i++) {
    p = p * (0.988 + Math.random() * 0.024);
    points.push(parseFloat(p.toFixed(2)));
  }
  points[6] = currentPrice;
  return points;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Mon", "Today"];

/* ─── Analytics Modal ───────────────────────────────────── */
const AnalyticsModal = ({ stock, onClose }) => {
  const history = simulatePriceHistory(stock.price);
  const isUp    = !stock.isDown;
  const color   = isUp ? "#1a9e5c" : "#c93a3a";

  const chartData = {
    labels: DAYS,
    datasets: [{
      data: history,
      borderColor: color,
      backgroundColor: isUp ? "rgba(26,158,92,0.1)" : "rgba(201,58,58,0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: color,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { mode: "index" } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { grid: { color: "#f0ece6" }, ticks: { font: { size: 10 }, callback: (v) => "₹" + fmt(v) } },
    },
  };

  const low  = Math.min(...history);
  const high = Math.max(...history);
  const w52Low  = parseFloat((stock.price * 0.72).toFixed(2));
  const w52High = parseFloat((stock.price * 1.34).toFixed(2));

  return (
    <div className="analytics-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="analytics-modal">

        <div className="analytics-header">
          <div>
            <p className="analytics-stock-name">{stock.name}</p>
            <p className="analytics-sub">NSE · Equity</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="analytics-price">₹{fmt(stock.price)}</p>
            <p className={`analytics-change ${stock.isDown ? "down" : "up"}`}>{stock.percent} today</p>
          </div>
          <button className="analytics-close" onClick={onClose}>✕</button>
        </div>

        <div className="analytics-chart">
          <p className="analytics-chart-label">7-Day Price Trend (Simulated)</p>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="analytics-stats">
          <div className="analytics-stat">
            <span>Day Low</span>
            <strong>₹{fmt(low)}</strong>
          </div>
          <div className="analytics-stat">
            <span>Day High</span>
            <strong>₹{fmt(high)}</strong>
          </div>
          <div className="analytics-stat">
            <span>52W Low</span>
            <strong>₹{fmt(w52Low)}</strong>
          </div>
          <div className="analytics-stat">
            <span>52W High</span>
            <strong>₹{fmt(w52High)}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─── More Dropdown ─────────────────────────────────────── */
const MoreDropdown = ({ stock, onClose }) => {
  const { showToast } = useToast();
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleAlert = () => {
    showToast(`Price alert set for ${stock.name} at ₹${fmt(stock.price)}`, "info");
    onClose();
  };

  const handleNSE = () => {
    window.open(`https://www.nseindia.com/get-quotes/equity?symbol=${stock.name}`, "_blank");
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(stock.name);
    showToast(`Copied "${stock.name}" to clipboard`, "success");
    onClose();
  };

  return (
    <div className="more-dropdown" ref={ref}>
      <button onClick={handleAlert}>🔔 Set Price Alert</button>
      <button onClick={handleNSE}>🔗 View on NSE</button>
      <button onClick={handleCopy}>📋 Copy Symbol</button>
    </div>
  );
};

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [feedMode,  setFeedMode]  = useState("demo");
  const [loading,   setLoading]   = useState(true);

  const fetchLivePrices = () => {
    api.get("/livePrices").then((res) => {
      setWatchlist(res.data.stocks || []);
      setFeedMode(res.data.mode   || "demo");
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const labels = watchlist.map((s) => s.name);
  const data = {
    labels,
    datasets: [{
      label: "Price",
      data: watchlist.map((s) => s.price),
      backgroundColor: [
        "rgba(176,118,54,0.5)", "rgba(217,98,67,0.5)",  "rgba(29,138,80,0.5)",
        "rgba(201,58,58,0.5)",  "rgba(90,50,10,0.5)",   "rgba(176,118,54,0.3)",
      ],
      borderColor: [
        "rgba(176,118,54,1)",   "rgba(217,98,67,1)",    "rgba(29,138,80,1)",
        "rgba(201,58,58,1)",    "rgba(90,50,10,1)",     "rgba(176,118,54,0.8)",
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search e.g. INFY, TCS, RELIANCE…"
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <div className="feed-status">
        <span className={`feed-pill ${feedMode}`}>
          {feedMode === "live" ? "Live feed" : "Demo feed"}
        </span>
      </div>

      {loading ? (
        <p style={{ padding: "16px 18px", color: "var(--muted)" }}>Fetching live prices…</p>
      ) : (
        <ul className="list">
          {watchlist.map((stock, index) => (
            <WatchListItem stock={stock} key={index} />
          ))}
        </ul>
      )}

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

/* ─── Individual row ────────────────────────────────────── */
const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown
            ? <KeyboardArrowDown className="down" />
            : <KeyboardArrowUp   className="up"   />}
          <span className="price">₹{stock.price}</span>
        </div>
      </div>

      {showActions && <WatchListActions uid={stock.name} price={stock.price} stock={stock} />}
    </li>
  );
};

/* ─── Hover action buttons ──────────────────────────────── */
const WatchListActions = ({ uid, price, stock }) => {
  const generalContext = useContext(GeneralContext);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showMore,      setShowMore]      = useState(false);

  return (
    <>
      <span className="actions">
        <span>
          <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
            <button className="buy" onClick={() => generalContext.openBuyWindow(uid, price)}>
              Buy
            </button>
          </Tooltip>
          <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
            <button className="sell" onClick={() => generalContext.openSellWindow(uid, price)}>
              Sell
            </button>
          </Tooltip>
          <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
            <button className="action" onClick={() => setShowAnalytics(true)}>
              <BarChartOutlined className="icon" />
            </button>
          </Tooltip>
          <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
            <button className="action" style={{ position: "relative" }} onClick={() => setShowMore((p) => !p)}>
              <MoreHoriz className="icon" />
              {showMore && (
                <MoreDropdown stock={stock} onClose={() => setShowMore(false)} />
              )}
            </button>
          </Tooltip>
        </span>
      </span>

      {showAnalytics && (
        <AnalyticsModal stock={stock} onClose={() => setShowAnalytics(false)} />
      )}
    </>
  );
};
