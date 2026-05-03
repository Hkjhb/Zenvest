import React from "react";
import { placeholders } from "../placeholders";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 p-5 section-left">
          <img
            src={placeholders.simulatorAnalytics}
            alt="Zenvest simulator analytics illustration"
            className="brand-art"
          />
        </div>
        <div className="col-md-6 p-5 mt-5 section-right">
          <h1>Practice stock trading without real-money risk</h1>
          <p className="mb-5">
            Zenvest gives learners a realistic simulator dashboard for exploring
            core trading workflows:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li><p>Virtual buy orders</p></li>
                <li><p>Watchlist tracking</p></li>
                <li><p>Order history</p></li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li><p>Holdings and positions</p></li>
                <li><p>Funds overview</p></li>
                <li><p>Portfolio summary</p></li>
              </ul>
            </div>
          </div>
          <img
            src={placeholders.press}
            alt="Zenvest learning insights illustration"
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;
