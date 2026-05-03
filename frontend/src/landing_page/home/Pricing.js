import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4 section-left">
          <h1 className="mb-3 fs-2">Simple simulator access</h1>
          <p>
            Zenvest is a learning project. The simulator experience is designed
            around virtual funds, practice orders, and portfolio education.
          </p>
          <Link to="/pricing" className="brand-link">
            View simulator plan
          </Link>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6 mb-5 section-right">
          <div className="row text-center g-3">
            <div className="col-md-6">
              <div className="p-4 brand-card h-100">
                <h1 className="mb-3">Free</h1>
                <p>
                  Public landing site and
                  <br />
                  simulator onboarding
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 brand-card h-100">
                <h1 className="mb-3">Virtual</h1>
                <p>Practice trades only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
