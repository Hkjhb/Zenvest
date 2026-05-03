import React from "react";
import { Link } from "react-router-dom";

const tools = [
  ["Watchlist", "Track stocks you want to follow before placing a practice order."],
  ["Orders", "Review simulated buy orders and learn order history basics."],
  ["Holdings", "See longer-term virtual investments in one portfolio view."],
  ["Positions", "Understand active simulated positions and daily movement."],
  ["Funds", "Practice with virtual buying power instead of real money."],
  ["Summary", "Read portfolio value, profit/loss, and allocation at a glance."],
];

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zenvest Simulator</h1>
        <p>
          A connected practice environment for learning trading screens,
          portfolio tracking, and risk awareness.
        </p>

        {tools.map(([title, description]) => (
          <div className="col-md-4 p-3 mt-4" key={title}>
            <div className="brand-card p-4 h-100">
              <h4>{title}</h4>
              <p className="text-small text-muted">{description}</p>
            </div>
          </div>
        ))}

        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 mt-4"
          style={{ width: "220px", margin: "0 auto" }}
        >
          Start simulator
        </Link>
      </div>
    </div>
  );
}

export default Universe;
