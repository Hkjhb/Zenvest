import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5 section-fade">
      <div className="row text-center">
        <h1 className="mt-5">Start practicing with Zenvest</h1>
        <p>
          Use a simulator dashboard to learn watchlists, orders, holdings,
          positions, funds, and portfolio movement without real-money risk.
        </p>
        <div>
          <Link
            to="/signup"
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "240px", margin: "0 auto" }}
          >
            Start simulator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
