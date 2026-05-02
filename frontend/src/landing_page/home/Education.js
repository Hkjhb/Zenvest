import React from "react";
import { Link } from "react-router-dom";
import { placeholders } from "../placeholders";

function Education() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 section-left">
          <img
            src={placeholders.education}
            alt="Education platform illustration"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-6 section-right">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world,
            covers everything from the basics to advanced trading.
          </p>
          <Link to="/product" className="brand-link">
            Varsity →
          </Link>
          <p className="mt-5">
            TradingQ&amp;A is an active trading and investment community in India for
            all your market-related queries.
          </p>
          <Link to="/support" className="brand-link">
            TradingQ&amp;A →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;
