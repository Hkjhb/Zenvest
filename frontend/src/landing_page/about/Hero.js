import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          Zenvest is a stock trading simulator
          <br />
          built for learning, practice, and confident decision-making.
        </h1>
      </div>

      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-md-6 p-5">
          <p>
            Zenvest helps new traders understand how markets, orders, watchlists,
            holdings, and portfolio performance work without risking real money.
            The platform is designed as a realistic simulator, not a brokerage.
          </p>
          <p>
            Users can explore a clean dashboard, place practice buy orders,
            review positions, track funds, and learn how trading decisions affect
            a virtual portfolio.
          </p>
          <p>
            The goal is simple: make stock market practice less confusing and
            more hands-on for students, beginners, and portfolio learners.
          </p>
        </div>
        <div className="col-md-6 p-5">
          <p>
            The project includes a public landing website, a separate simulator
            dashboard, and a backend API for accounts, orders, holdings,
            positions, and portfolio data.
          </p>
          <p>
            Zenvest focuses on learning flows: discover stocks, simulate trades,
            inspect profit and loss, and understand risk before entering real
            markets.
          </p>
          <p>
            No real trades are placed through Zenvest. All balances, holdings,
            and orders are part of the simulator experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
