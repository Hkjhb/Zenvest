import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5 section-fade">
      <div className="row text-center">
        <h1 className="mt-5">Open a Zenvest account</h1>
        <p>
          Modern platforms and apps, Rs. 0 investments, and flat Rs. 20 intraday
          and F&amp;O trades.
        </p>
        <div>
          <Link
            to="/signup"
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "220px", margin: "0 auto" }}
          >
            Sign up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
