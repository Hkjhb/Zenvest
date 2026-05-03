import React from "react";
import { Link } from "react-router-dom";
import { placeholders } from "../placeholders";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <div className="hero-animate">
          <img
            src={placeholders.hero}
            alt="Illustration of the Zenvest investing platform"
            className="brand-hero-art"
          />
        </div>
        <h1 className="mt-4 hero-animate-delay-1">Practice stock trading</h1>
        <p className="fs-5 text-muted hero-animate-delay-2">
          A simulator for learning watchlists, virtual orders, holdings, and portfolio movement.
        </p>
        <div className="hero-animate-delay-3">
          <Link
            to="/signup"
            className="p-3 btn btn-primary fs-5 mb-5"
            style={{ width: "220px", margin: "0 auto" }}
          >
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
