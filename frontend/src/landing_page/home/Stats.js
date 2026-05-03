import React from "react";
import { Link } from "react-router-dom";
import { placeholders } from "../placeholders";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5 align-items-center">
        <div className="col-md-6 p-5 section-left">
          <h1 className="fs-2 mb-5">Built for simulator learning</h1>
          <h2 className="fs-4">Virtual portfolio first</h2>
          <p className="text-muted">
            Start with simulated funds and learn how buying, holding, and
            exiting positions changes your portfolio.
          </p>
          <h2 className="fs-4">Dashboard-style practice</h2>
          <p className="text-muted">
            Use watchlists, summaries, orders, holdings, and positions in one
            focused interface inspired by real trading workflows.
          </p>
          <h2 className="fs-4">No real trades</h2>
          <p className="text-muted">
            Zenvest is educational. It does not connect to a broker, exchange,
            demat account, or payment system.
          </p>
          <h2 className="fs-4">Learn by doing</h2>
          <p className="text-muted">
            Explore order flow and portfolio movement through practice instead
            of only reading theory.
          </p>
        </div>
        <div className="col-md-6 p-5 section-right">
          <img
            src={placeholders.ecosystem}
            alt="Zenvest simulator ecosystem illustration"
            style={{ width: "90%" }}
          />
          <div className="text-center mt-3">
            <Link to="/product" className="mx-5 brand-link">
              Explore simulator tools
            </Link>
            <Link to="/signup" className="brand-link">
              Open simulator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
