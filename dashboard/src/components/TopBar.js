import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import api from "../api";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const TopBar = () => {
  const [indices, setIndices] = useState(null);

  const fetchIndices = () => {
    api.get("/indices")
      .then((res) => setIndices(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchIndices();
    const id = setInterval(fetchIndices, 30000);
    return () => clearInterval(id);
  }, []);

  const nifty  = indices?.nifty;
  const sensex = indices?.sensex;

  return (
    <div className="topbar-container">
      <div className="indices-container">

        {/* NIFTY 50 */}
        <div className="nifty market-card">
          <div>
            <p className="index">NIFTY 50</p>
            <p className="market-caption">India benchmark</p>
          </div>
          <div className="market-meta">
            {nifty ? (
              <>
                <p className={`index-points ${nifty.isDown ? "down" : "up"}`}>
                  {nifty.isDown
                    ? <KeyboardArrowDown fontSize="small" style={{ verticalAlign: "middle" }} />
                    : <KeyboardArrowUp   fontSize="small" style={{ verticalAlign: "middle" }} />}
                  {fmt(nifty.price)}
                </p>
                <p className={`percent ${nifty.isDown ? "down" : "up"}`}>{nifty.percent}</p>
              </>
            ) : (
              <p className="index-points" style={{ color: "var(--muted-soft)" }}>—</p>
            )}
          </div>
        </div>

        {/* SENSEX */}
        <div className="sensex market-card">
          <div>
            <p className="index">SENSEX</p>
            <p className="market-caption">Large-cap basket</p>
          </div>
          <div className="market-meta">
            {sensex ? (
              <>
                <p className={`index-points ${sensex.isDown ? "down" : "up"}`}>
                  {sensex.isDown
                    ? <KeyboardArrowDown fontSize="small" style={{ verticalAlign: "middle" }} />
                    : <KeyboardArrowUp   fontSize="small" style={{ verticalAlign: "middle" }} />}
                  {fmt(sensex.price)}
                </p>
                <p className={`percent ${sensex.isDown ? "down" : "up"}`}>{sensex.percent}</p>
              </>
            ) : (
              <p className="index-points" style={{ color: "var(--muted-soft)" }}>—</p>
            )}
          </div>
        </div>

      </div>
      <Menu />
    </div>
  );
};

export default TopBar;
