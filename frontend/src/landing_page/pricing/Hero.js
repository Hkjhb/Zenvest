import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1>Simulator Pricing</h1>
        <h3 className="text-muted mt-3 fs-5">
          Built as a learning project with virtual funds and practice trades
        </h3>
      </div>
      <div className="row p-5 mt-5 text-center">
        <div className="col-md-4 p-4">
          <img src="media/images/pricingEquity.svg" alt="Free simulator access" />
          <h1 className="fs-3">Free access</h1>
          <p className="text-muted">
            Explore the public site and open the simulator dashboard for
            learning and portfolio practice.
          </p>
        </div>
        <div className="col-md-4 p-4">
          <img src="media/images/intradayTrades.svg" alt="Virtual trading" />
          <h1 className="fs-3">Virtual trading</h1>
          <p className="text-muted">
            Orders, holdings, positions, and funds are simulated. No real money
            or live exchange orders are used.
          </p>
        </div>
        <div className="col-md-4 p-4">
          <img src="media/images/pricingEquity.svg" alt="Learning tools" />
          <h1 className="fs-3">Learning tools</h1>
          <p className="text-muted">
            Use portfolio analytics, watchlists, and order history to understand
            trading concepts through practice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
