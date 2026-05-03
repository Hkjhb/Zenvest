import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-md-8 p-4">
          <h3 className="fs-5">What is included</h3>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "14px" }}
            className="text-muted"
          >
            <li>Practice account flow for entering the simulator dashboard.</li>
            <li>Virtual funds for learning buy decisions without real deposits.</li>
            <li>Watchlist, holdings, positions, orders, and summary screens.</li>
            <li>Portfolio-style analytics for understanding simulated outcomes.</li>
            <li>No broker connection, exchange execution, demat account, or payment gateway.</li>
          </ul>
        </div>
        <div className="col-md-4 p-4">
          <div className="brand-card p-4 h-100">
            <h3 className="fs-5">Important note</h3>
            <p className="text-muted">
              Zenvest is for education and demonstration only. It is not a real
              trading platform or investment advisory product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
