import React from "react";
import { Link } from "react-router-dom";
import { placeholders } from "../placeholders";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5 align-items-center">
        <div className="col-md-6 p-5 section-left">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Zerodha with Rs. 3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, gamification, or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we do more than process
            transactions. We help you make calmer decisions.
          </p>
        </div>
        <div className="col-md-6 p-5 section-right">
          <img
            src={placeholders.ecosystem}
            alt="Zenvest product ecosystem illustration"
            style={{ width: "90%" }}
          />
          <div className="text-center mt-3">
            <Link to="/product" className="mx-5 brand-link">
              Explore our products →
            </Link>
            <Link to="/signup" className="brand-link">
              Try Kite demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
