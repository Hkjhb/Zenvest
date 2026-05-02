import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4 section-left">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency in
            India. Flat fees and no hidden charges.
          </p>
          <Link to="/pricing" className="brand-link">
            See pricing →
          </Link>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6 mb-5 section-right">
          <div className="row text-center g-3">
            <div className="col-md-6">
              <div className="p-4 brand-card h-100">
                <h1 className="mb-3">Rs. 0</h1>
                <p>
                  Free equity delivery and
                  <br />
                  direct mutual funds
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 brand-card h-100">
                <h1 className="mb-3">Rs. 20</h1>
                <p>Intraday and F&amp;O</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
