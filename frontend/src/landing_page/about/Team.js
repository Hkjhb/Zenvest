import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">What Zenvest Teaches</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-md-4 p-4">
          <div className="brand-card p-4 h-100">
            <h4>Market Practice</h4>
            <p>
              Build a watchlist, follow price movement, and place simulated
              trades to understand how trading decisions feel in a live-style UI.
            </p>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <div className="brand-card p-4 h-100">
            <h4>Portfolio Tracking</h4>
            <p>
              Review holdings, positions, orders, funds, and profit/loss so the
              connection between trades and portfolio performance is clear.
            </p>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <div className="brand-card p-4 h-100">
            <h4>Risk Awareness</h4>
            <p>
              Practice before real money is involved. Zenvest is built for
              learning discipline, order flow, and basic market behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
