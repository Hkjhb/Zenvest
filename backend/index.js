require("dotenv").config();

const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const cors       = require("cors");
const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

const { HoldingsModel }  = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel }    = require("./model/OrdersModel");
const { UserModel }      = require("./model/UserModel");
const { generateAuthToken, getBearerToken, hashPassword, verifyPassword } = require("./utils/auth");
const { buildHoldingFields, buildPositionFields, calculatePortfolioSummary, defaultHoldings, defaultPositions } = require("./utils/portfolio");

const PORT = process.env.PORT || 3002;
const uri  = process.env.MONGO_URL;
const app  = express();

app.use(cors());
app.use(bodyParser.json());

/* ─── Supported symbols ─────────────────────────────────── */
const ALL_SYMBOLS = [
  "INFY", "ONGC", "TCS", "KPITTECH", "QUICKHEAL",
  "WIPRO", "M&M", "RELIANCE", "HDFCBANK", "BHARTIARTL",
  "HINDUNILVR", "ITC", "SBIN", "TATAPOWER",
];

const demoWatchlist = [
  { name: "INFY",       price: 1555.45, percent: "-1.60%", isDown: true  },
  { name: "ONGC",       price:  116.80, percent: "-0.09%", isDown: true  },
  { name: "TCS",        price: 3194.80, percent: "-0.25%", isDown: true  },
  { name: "KPITTECH",   price:  266.45, percent: "+3.54%", isDown: false },
  { name: "QUICKHEAL",  price:  308.55, percent: "-0.15%", isDown: true  },
  { name: "WIPRO",      price:  577.75, percent: "+0.32%", isDown: false },
  { name: "M&M",        price:  779.80, percent: "-0.01%", isDown: true  },
  { name: "RELIANCE",   price: 2112.40, percent: "+1.44%", isDown: false },
  { name: "HDFCBANK",   price: 1522.35, percent: "+0.11%", isDown: false },
  { name: "BHARTIARTL", price:  541.15, percent: "+2.99%", isDown: false },
];

/* ─── Live price cache ──────────────────────────────────── */
// { INFY: { price, percent, isDown }, ... }
let priceCache    = {};
let priceCacheTime = 0;

// { nifty: { price, change, percent, isDown }, sensex: {...} }
let indicesCache = null;

const refreshPriceCache = async () => {
  try {
    const symbols = ALL_SYMBOLS.map((s) => s + ".NS");
    const results = await Promise.allSettled(symbols.map((s) => yahooFinance.quote(s)));

    results.forEach((r, i) => {
      if (r.status === "fulfilled" && r.value) {
        const q      = r.value;
        const price  = q.regularMarketPrice;
        const change = q.regularMarketChangePercent;
        priceCache[ALL_SYMBOLS[i]] = {
          price:   parseFloat(price.toFixed(2)),
          percent: (change >= 0 ? "+" : "") + change.toFixed(2) + "%",
          isDown:  change < 0,
        };
      }
    });

    // Fetch market indices
    const [niftyRes, sensexRes] = await Promise.allSettled([
      yahooFinance.quote("^NSEI"),
      yahooFinance.quote("^BSESN"),
    ]);

    const toIdx = (r) => {
      if (r.status !== "fulfilled" || !r.value) return null;
      const q = r.value;
      const change = q.regularMarketChangePercent;
      return {
        price:   parseFloat(q.regularMarketPrice.toFixed(2)),
        change:  parseFloat(change.toFixed(2)),
        percent: (change >= 0 ? "+" : "") + change.toFixed(2) + "%",
        isDown:  change < 0,
      };
    };

    indicesCache = { nifty: toIdx(niftyRes), sensex: toIdx(sensexRes) };

    priceCacheTime = Date.now();
    console.log(`[cache] Refreshed ${Object.keys(priceCache).length} symbols + indices`);
  } catch (err) {
    console.error("[cache] Refresh failed:", err.message);
  }
};

const getCachedPrice = (name) => priceCache[name] || null;

/* ─── Auth middleware ───────────────────────────────────── */
const requireAuth = async (req, res, next) => {
  try {
    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ error: "Authentication required" });

    const user = await UserModel.findOne({ authToken: token });
    if (!user) return res.status(401).json({ error: "Invalid session" });

    req.user = user;
    next();
  } catch {
    res.status(500).json({ error: "Authentication failed" });
  }
};

/* ─── Seed new user portfolio ───────────────────────────── */
const seedUserPortfolio = async (userId) => {
  await HoldingsModel.insertMany(defaultHoldings.map((item) => ({ userId, ...item })));
  await PositionsModel.insertMany(defaultPositions.map((item) => ({ userId, ...item })));
};

/* ─── Core order execution logic ────────────────────────── */
// Shared by both /newOrder (market) and the background limit-order checker
const executeOrderLogic = async (user, name, qty, price, mode) => {
  const tradeValue = qty * price;

  if (mode === "BUY") {
    if ((user.cashBalance ?? 0) < tradeValue) {
      throw new Error(
        `Insufficient funds. Need ₹${tradeValue.toFixed(2)}, available ₹${(user.cashBalance ?? 0).toFixed(2)}`
      );
    }

    user.cashBalance = (user.cashBalance ?? 0) - tradeValue;

    const existingHolding = await HoldingsModel.findOne({ userId: user._id, name });
    if (existingHolding) {
      const nextQty = existingHolding.qty + qty;
      const nextAvg = (existingHolding.avg * existingHolding.qty + tradeValue) / nextQty;
      Object.assign(existingHolding, { qty: nextQty, avg: nextAvg, ...buildHoldingFields({ avg: nextAvg, price }) });
      await existingHolding.save();
    } else {
      await HoldingsModel.create({ userId: user._id, name, qty, avg: price, ...buildHoldingFields({ avg: price, price }) });
    }

    const existingPosition = await PositionsModel.findOne({ userId: user._id, name });
    if (existingPosition) {
      const nextQty = existingPosition.qty + qty;
      const nextAvg = (existingPosition.avg * existingPosition.qty + tradeValue) / nextQty;
      Object.assign(existingPosition, { qty: nextQty, avg: nextAvg, ...buildPositionFields({ avg: nextAvg, price }) });
      await existingPosition.save();
    } else {
      await PositionsModel.create({ userId: user._id, product: "CNC", name, qty, avg: price, ...buildPositionFields({ avg: price, price }) });
    }
  }

  if (mode === "SELL") {
    const existingHolding = await HoldingsModel.findOne({ userId: user._id, name });
    if (!existingHolding || existingHolding.qty < qty) {
      throw new Error("Not enough quantity to sell");
    }

    user.cashBalance = (user.cashBalance ?? 0) + tradeValue;

    existingHolding.qty -= qty;
    existingHolding.price = price;
    Object.assign(existingHolding, buildHoldingFields({ avg: existingHolding.avg, price }));
    if (existingHolding.qty <= 0) await existingHolding.deleteOne();
    else await existingHolding.save();

    const existingPosition = await PositionsModel.findOne({ userId: user._id, name });
    if (existingPosition) {
      existingPosition.qty -= qty;
      existingPosition.price = price;
      Object.assign(existingPosition, buildPositionFields({ avg: existingPosition.avg, price }));
      if (existingPosition.qty <= 0) await existingPosition.deleteOne();
      else await existingPosition.save();
    }
  }

  await user.save();
};

/* ─── Background: check pending limit orders ────────────── */
const checkPendingOrders = async () => {
  try {
    const pendingOrders = await OrdersModel.find({ status: "PENDING" });
    if (pendingOrders.length === 0) return;

    for (const order of pendingOrders) {
      const cached = getCachedPrice(order.name);
      if (!cached) continue;

      const currentPrice = cached.price;
      const limitPrice   = order.limitPrice;

      // BUY limit: execute when price drops TO or BELOW the limit
      // SELL limit: execute when price rises TO or ABOVE the limit
      const shouldExecute =
        (order.mode === "BUY"  && currentPrice <= limitPrice) ||
        (order.mode === "SELL" && currentPrice >= limitPrice);

      if (!shouldExecute) continue;

      const user = await UserModel.findById(order.userId);
      if (!user) { order.status = "CANCELLED"; await order.save(); continue; }

      try {
        await executeOrderLogic(user, order.name, order.qty, currentPrice, order.mode);
        order.status        = "EXECUTED";
        order.executedPrice = currentPrice;
        await order.save();
        console.log(`[limit] Executed ${order.mode} ${order.qty}x ${order.name} @ ₹${currentPrice}`);
      } catch (err) {
        console.error(`[limit] Failed to execute order ${order._id}:`, err.message);
        order.status = "CANCELLED";
        await order.save();
      }
    }
  } catch (err) {
    console.error("[limit] Checker error:", err.message);
  }
};

/* ══════════════════════════════════════════════════════════
   AUTH ROUTES
══════════════════════════════════════════════════════════ */

app.post("/auth/signup", async (req, res) => {
  try {
    const username = (req.body.username || "").trim().toLowerCase();
    const password = req.body.password || "";
    if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

    if (await UserModel.findOne({ username })) return res.status(409).json({ error: "User already exists" });

    const { salt, passwordHash } = hashPassword(password);
    const authToken = generateAuthToken();
    const newUser   = await UserModel.create({ username, passwordHash, salt, authToken });
    await seedUserPortfolio(newUser._id);

    res.status(201).json({ token: authToken, user: { id: newUser._id, username: newUser.username } });
  } catch {
    res.status(500).json({ error: "Failed to sign up" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const username = (req.body.username || "").trim().toLowerCase();
    const password = req.body.password || "";
    const user = await UserModel.findOne({ username });

    if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    user.authToken = generateAuthToken();
    await user.save();
    res.json({ token: user.authToken, user: { id: user._id, username: user.username } });
  } catch {
    res.status(500).json({ error: "Failed to log in" });
  }
});

app.get("/auth/me", requireAuth, async (req, res) => {
  if (req.user.openingBalance == null) {
    req.user.openingBalance = 50000;
    req.user.cashBalance    = req.user.cashBalance ?? 50000;
    await req.user.save();
  }
  res.json({ user: { id: req.user._id, username: req.user.username, cashBalance: req.user.cashBalance } });
});

app.post("/auth/logout", requireAuth, async (req, res) => {
  req.user.authToken = null;
  await req.user.save();
  res.json({ message: "Logged out" });
});

/* ══════════════════════════════════════════════════════════
   PORTFOLIO ROUTES
══════════════════════════════════════════════════════════ */

app.get("/allHoldings",  requireAuth, async (req, res) => res.json(await HoldingsModel.find({ userId: req.user._id })));
app.get("/allPositions", requireAuth, async (req, res) => res.json(await PositionsModel.find({ userId: req.user._id })));
app.get("/allOrders",    requireAuth, async (req, res) => res.json(await OrdersModel.find({ userId: req.user._id }).sort({ _id: -1 })));

app.get("/summary", requireAuth, async (req, res) => {
  const holdings = await HoldingsModel.find({ userId: req.user._id });
  res.json(calculatePortfolioSummary(req.user, holdings));
});

/* ── Live prices (uses cache) ─────────────────────────── */
app.get("/livePrices", requireAuth, (req, res) => {
  if (Object.keys(priceCache).length === 0) {
    return res.json({ mode: "demo", stocks: demoWatchlist });
  }
  const stocks = ALL_SYMBOLS
    .filter((name) => priceCache[name])
    .map((name)   => ({ name, ...priceCache[name] }));

  res.json({ mode: "live", stocks });
});

/* ── Market indices (NIFTY 50, SENSEX) ───────────────── */
app.get("/indices", requireAuth, (req, res) => {
  if (!indicesCache) {
    return res.json({
      demo: true,
      nifty:  { price: 22500.00, change: -0.12, percent: "-0.12%", isDown: true  },
      sensex: { price: 74000.00, change:  0.18, percent: "+0.18%", isDown: false },
    });
  }
  res.json({ demo: false, ...indicesCache });
});

/* ── Single symbol price (for order window) ───────────── */
app.get("/marketPrice/:symbol", requireAuth, (req, res) => {
  const name   = req.params.symbol.toUpperCase();
  const cached = getCachedPrice(name);
  if (!cached) return res.status(404).json({ error: `No price data for ${name}` });
  res.json({ name, ...cached });
});

/* ══════════════════════════════════════════════════════════
   ORDER ROUTES
══════════════════════════════════════════════════════════ */

app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const { name, qty, mode, orderType = "MARKET", limitPrice } = req.body;
    const numQty = Number(qty);

    /* ── Basic validation ─── */
    if (!name || !numQty || !mode)            return res.status(400).json({ error: "name, qty and mode are required" });
    if (!["BUY", "SELL"].includes(mode))      return res.status(400).json({ error: "mode must be BUY or SELL" });
    if (!["MARKET", "LIMIT"].includes(orderType)) return res.status(400).json({ error: "orderType must be MARKET or LIMIT" });
    if (numQty <= 0 || !Number.isFinite(numQty)) return res.status(400).json({ error: "Quantity must be a positive number" });

    /* ── Get live price ─── */
    const cached = getCachedPrice(name);
    if (!cached) return res.status(400).json({ error: `No live price available for ${name}. Try again in a moment.` });

    const marketPrice = cached.price;

    /* ══ MARKET ORDER ══ */
    if (orderType === "MARKET") {
      await executeOrderLogic(req.user, name, numQty, marketPrice, mode);

      const order = await OrdersModel.create({
        userId: req.user._id,
        name, qty: numQty, mode,
        orderType:     "MARKET",
        status:        "EXECUTED",
        executedPrice: marketPrice,
      });

      return res.status(201).json(order);
    }

    /* ══ LIMIT ORDER ══ */
    const numLimit = Number(limitPrice);
    if (!numLimit || numLimit <= 0 || !Number.isFinite(numLimit)) {
      return res.status(400).json({ error: "A valid limit price is required" });
    }

    if (mode === "BUY") {
      if (numLimit >= marketPrice) {
        return res.status(400).json({
          error: `Limit BUY price must be BELOW the current market price of ₹${marketPrice}. ` +
                 `You set a limit to buy at a cheaper price — enter something lower than ₹${marketPrice}.`,
        });
      }
      if (numLimit < marketPrice * 0.85) {
        return res.status(400).json({
          error: `Limit price too far from market. Maximum 15% below current price. ` +
                 `Minimum allowed: ₹${(marketPrice * 0.85).toFixed(2)}.`,
        });
      }
    }

    if (mode === "SELL") {
      // Check holdings before placing pending sell
      const holding = await HoldingsModel.findOne({ userId: req.user._id, name });
      if (!holding || holding.qty < numQty) {
        return res.status(400).json({ error: "Not enough quantity to sell" });
      }
      if (numLimit <= marketPrice) {
        return res.status(400).json({
          error: `Limit SELL price must be ABOVE the current market price of ₹${marketPrice}. ` +
                 `You set a limit to sell at a higher price — enter something above ₹${marketPrice}.`,
        });
      }
      if (numLimit > marketPrice * 1.15) {
        return res.status(400).json({
          error: `Limit price too far from market. Maximum 15% above current price. ` +
                 `Maximum allowed: ₹${(marketPrice * 1.15).toFixed(2)}.`,
        });
      }
    }

    // Store as PENDING — background checker will execute when price is hit
    const order = await OrdersModel.create({
      userId: req.user._id,
      name, qty: numQty, mode,
      orderType:  "LIMIT",
      status:     "PENDING",
      limitPrice: numLimit,
    });

    return res.status(201).json(order);

  } catch (err) {
    res.status(err.message.includes("Insufficient") || err.message.includes("quantity")
      ? 400 : 500
    ).json({ error: err.message || "Failed to place order" });
  }
});

/* ── Add real funds (simulated payment) ──────────────── */
app.post("/addRealFunds", requireAuth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount <= 0 || !Number.isFinite(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    if (amount > 500000) {
      return res.status(400).json({ error: "Maximum deposit is ₹5,00,000 at a time" });
    }
    req.user.realBalance = (req.user.realBalance ?? 0) + amount;
    await req.user.save();
    res.json({ realBalance: req.user.realBalance });
  } catch {
    res.status(500).json({ error: "Failed to add funds" });
  }
});

/* ── Add virtual funds ────────────────────────────────── */
app.post("/addFunds", requireAuth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount <= 0 || !Number.isFinite(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    if (amount > 100000) {
      return res.status(400).json({ error: "Maximum top-up is ₹1,00,000 at a time" });
    }
    req.user.cashBalance = (req.user.cashBalance ?? 0) + amount;
    await req.user.save();
    res.json({ cashBalance: req.user.cashBalance });
  } catch {
    res.status(500).json({ error: "Failed to add funds" });
  }
});

/* ── Reset portfolio ──────────────────────────────────── */
app.post("/resetPortfolio", requireAuth, async (req, res) => {
  try {
    await HoldingsModel.deleteMany({ userId: req.user._id });
    await PositionsModel.deleteMany({ userId: req.user._id });
    await OrdersModel.deleteMany({ userId: req.user._id });
    req.user.cashBalance    = 50000;
    req.user.openingBalance = 50000;
    await req.user.save();
    await seedUserPortfolio(req.user._id);
    res.json({ message: "Portfolio reset successfully", cashBalance: 50000 });
  } catch {
    res.status(500).json({ error: "Failed to reset portfolio" });
  }
});

/* ── Cancel a pending limit order ─────────────────────── */
app.delete("/cancelOrder/:id", requireAuth, async (req, res) => {
  try {
    const order = await OrdersModel.findOne({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== "PENDING") return res.status(400).json({ error: "Only PENDING orders can be cancelled" });

    order.status = "CANCELLED";
    await order.save();
    res.json(order);
  } catch {
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

/* ══════════════════════════════════════════════════════════
   SERVER START
══════════════════════════════════════════════════════════ */

const startServer = async () => {
  if (!uri) { console.error("MONGO_URL missing in backend/.env"); process.exit(1); }

  try {
    await mongoose.connect(uri);
    console.log("DB started!");

    // Load live prices before accepting requests
    await refreshPriceCache();

    // Keep prices fresh every 30 s
    setInterval(refreshPriceCache, 30_000);

    // Check pending limit orders every 30 s
    setInterval(checkPendingOrders, 30_000);

    app.listen(PORT, () => console.log(`App started on port ${PORT}!`));
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
