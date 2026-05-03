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
            alt="Stock trading simulator education illustration"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-6 section-right">
          <h1 className="mb-3 fs-2">Learn markets through simulation</h1>
          <p>
            Zenvest helps beginners understand trading screens, order placement,
            portfolio movement, and profit/loss tracking through hands-on
            practice.
          </p>
          <Link to="/product" className="brand-link">
            See simulator features
          </Link>
          <p className="mt-5">
            Use the support page as a quick guide for common simulator actions,
            from opening a practice account to reading holdings and positions.
          </p>
          <Link to="/support" className="brand-link">
            Browse help topics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;
