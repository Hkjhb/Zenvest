const defaultHoldings = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
  { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%" },
  { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
  { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
  { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%" },
  { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
  { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%" },
  { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
  { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%" },
  { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%" },
  { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
];

const defaultPositions = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
];

const formatPercent = (value) => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

const buildHoldingFields = ({ avg, price }) => {
  const changePercent = avg > 0 ? ((price - avg) / avg) * 100 : 0;

  return {
    price,
    net: formatPercent(changePercent),
    day: formatPercent(changePercent),
  };
};

const buildPositionFields = ({ avg, price }) => {
  const changePercent = avg > 0 ? ((price - avg) / avg) * 100 : 0;

  return {
    price,
    net: formatPercent(changePercent),
    day: formatPercent(changePercent),
    isLoss: changePercent < 0,
  };
};

const calculatePortfolioSummary = (user, holdings) => {
  const investment = holdings.reduce((total, holding) => total + holding.avg * holding.qty, 0);
  const currentValue = holdings.reduce((total, holding) => total + holding.price * holding.qty, 0);
  const pnl = currentValue - investment;
  const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;

  return {
    username: user.username,
    openingBalance: user.openingBalance ?? 50000,
    cashBalance: user.cashBalance ?? 50000,
    realBalance: user.realBalance ?? 0,
    marginsUsed: 0,
    holdingsCount: holdings.length,
    investment,
    currentValue,
    pnl,
    pnlPercent,
  };
};

module.exports = {
  defaultHoldings,
  defaultPositions,
  buildHoldingFields,
  buildPositionFields,
  calculatePortfolioSummary,
};
