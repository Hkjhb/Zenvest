import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Zenvest Help Center</h4>
        <a href="/">View simulator status</a>
      </div>
      <div className="row p-5 m-3">
        <div className="col-md-6 p-3">
          <h1 className="fs-3">
            Find help for using the stock trading simulator
          </h1>
          <input placeholder="Eg. how do I place a practice order?" />
          <br />
          <a href="/">Create simulator account</a>
          <a href="/">Use virtual funds</a>
          <a href="/">Track holdings</a>
          <a href="/">Read positions</a>
        </div>
        <div className="col-md-6 p-3">
          <h1 className="fs-3">Featured guides</h1>
          <ol>
            <li>
              <a href="/">How simulated orders work</a>
            </li>
            <li>
              <a href="/">Understanding portfolio P&amp;L</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
