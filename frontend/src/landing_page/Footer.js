import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#f0e8d8", borderTop: "1px solid #e6d5bb" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5 g-4">
          <div className="col-md-3">
            <div className="brand-logo mb-3 d-inline-block">Zenvest</div>
            <p>&copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.</p>
          </div>
          <div className="col-md-3">
            <p>Company</p>
            <Link to="/about" className="brand-link">About</Link>
            <br />
            <Link to="/product" className="brand-link">Products</Link>
            <br />
            <Link to="/pricing" className="brand-link">Pricing</Link>
            <br />
            <a href="/" className="brand-link">Referral programme</a>
            <br />
            <a href="/" className="brand-link">Careers</a>
            <br />
            <a href="/" className="brand-link">Zerodha.tech</a>
            <br />
            <a href="/" className="brand-link">Press &amp; media</a>
            <br />
            <a href="/" className="brand-link">Zerodha cares (CSR)</a>
          </div>
          <div className="col-md-3">
            <p>Support</p>
            <Link to="/support" className="brand-link">Contact</Link>
            <br />
            <a href="/" className="brand-link">Support portal</a>
            <br />
            <a href="/" className="brand-link">Z-Connect blog</a>
            <br />
            <a href="/" className="brand-link">List of charges</a>
            <br />
            <a href="/" className="brand-link">Downloads &amp; resources</a>
          </div>
          <div className="col-md-3">
            <p>Account</p>
            <Link to="/signup" className="brand-link">Open an account</Link>
            <br />
            <a href="/" className="brand-link">Fund transfer</a>
            <br />
            <a href="/" className="brand-link">60 day challenge</a>
          </div>
        </div>
        <div className="mt-5 text-muted brand-footer-note">
          <p>
            Zerodha Broking Ltd.: Member of NSE and BSE. SEBI Registration no.:
            INZ000031633. Depository services through Zerodha Securities Pvt. Ltd.
            under SEBI Registration no. IN-DP-100-2015.
          </p>
          <p>
            Investments in securities market are subject to market risks. Read all
            related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
