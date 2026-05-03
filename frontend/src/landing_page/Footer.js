import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#f0e8d8", borderTop: "1px solid #e6d5bb" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5 g-4">
          <div className="col-md-3">
            <div className="brand-logo mb-3 d-inline-block">Zenvest</div>
            <p>&copy; 2026 Zenvest simulator project. All rights reserved.</p>
          </div>
          <div className="col-md-3">
            <p>Project</p>
            <Link to="/about" className="brand-link">About Zenvest</Link>
            <br />
            <Link to="/product" className="brand-link">Simulator tools</Link>
            <br />
            <Link to="/pricing" className="brand-link">Simulator plan</Link>
            <br />
            <Link to="/support" className="brand-link">Help center</Link>
          </div>
          <div className="col-md-3">
            <p>Simulator</p>
            <Link to="/signup" className="brand-link">Start simulator</Link>
            <br />
            <a href="/" className="brand-link">Watchlist practice</a>
            <br />
            <a href="/" className="brand-link">Portfolio tracking</a>
            <br />
            <a href="/" className="brand-link">Order history</a>
          </div>
          <div className="col-md-3">
            <p>Learning</p>
            <a href="/" className="brand-link">Risk basics</a>
            <br />
            <a href="/" className="brand-link">Virtual funds</a>
            <br />
            <a href="/" className="brand-link">Practice guide</a>
          </div>
        </div>
        <div className="mt-5 text-muted brand-footer-note">
          <p>
            Zenvest is an educational stock trading simulator. It is not a
            broker, exchange, demat provider, payment platform, or investment
            advisory service.
          </p>
          <p>
            All orders, balances, holdings, positions, and performance values
            shown in the simulator are virtual and for learning purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
