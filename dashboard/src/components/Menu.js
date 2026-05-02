import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTradingMode } from "./TradingModeContext";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { mode, switchMode } = useTradingMode();
  const location = useLocation();

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";
  const initials = (user?.username || "ZU").slice(0, 2).toUpperCase();
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <div className="menu-container">
      <div className="brand-lockup">
        <img src="logo.png" style={{ width: "44px" }} alt="Zenvest logo" />
        <div className="brand-copy">
          <p className="brand-name">Zenvest</p>
          <p className="brand-subtitle">Paper Trading Desk</p>
        </div>
      </div>
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
            >
              <p className={isActive("/") ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
            >
              <p className={isActive("/orders") ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
            >
              <p className={isActive("/holdings") ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
            >
              <p className={isActive("/funds") ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
        </ul>
        <hr />

        {/* ── Trading mode toggle ── */}
        <div className="mode-toggle-section">
          <p className="mode-toggle-label">Trading Mode</p>
          <div className="mode-toggle-track">
            <button
              className={`mode-toggle-btn ${mode === "paper" ? "active-paper" : ""}`}
              onClick={() => switchMode("paper")}
              type="button"
            >
              Paper
            </button>
            <button
              className={`mode-toggle-btn ${mode === "live" ? "active-live" : ""}`}
              onClick={() => switchMode("live")}
              type="button"
            >
              <span className="live-dot" />
              Live
            </button>
          </div>
          {mode === "live" && (
            <p className="mode-live-notice">
              Using real balance · Simulated execution
            </p>
          )}
        </div>

        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{initials}</div>
          <div className="profile-copy">
            <p className="username">{user?.username || "user"}</p>
            <p className="profile-role">
              {mode === "live" ? "Live account" : "Simulator account"}
            </p>
          </div>
        </div>
        {isProfileDropdownOpen ? (
          <button type="button" className="logout-button" onClick={logout}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
