import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media/images/kite.png"
        productName="Simulator Dashboard"
        productDesription="A clean trading workspace for tracking watchlists, funds, holdings, positions, and simulated orders in one place."
        tryDemo="/signup"
        learnMore="/support"
        googlePlay="/"
        appStore="/"
      />
      <RightSection
        imageURL="media/images/console.png"
        productName="Portfolio Analytics"
        productDesription="Review practice portfolio value, profit and loss, holdings, and order history so every simulated decision is easy to understand."
        learnMore="/pricing"
      />
      <LeftSection
        imageURL="media/images/coin.png"
        productName="Virtual Funds"
        productDesription="Use simulator funds to practice trading workflows without connecting a bank account, broker account, or real payment method."
        tryDemo="/signup"
        learnMore="/about"
        googlePlay="/"
        appStore="/"
      />
      <RightSection
        imageURL="media/images/kiteconnect.png"
        productName="Backend API"
        productDesription="The project includes a Node and MongoDB backend for users, holdings, orders, positions, and portfolio data."
        learnMore="/support"
      />
      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Learning Flow"
        productDesription="Practice order placement, understand market screens, and learn how trading actions update a virtual portfolio."
        tryDemo="/signup"
        learnMore="/support"
        googlePlay="/"
        appStore="/"
      />
      <p className="text-center mt-5 mb-5">
        Zenvest is a simulator project for education and portfolio practice. It
        does not place real market orders.
      </p>
      <Universe />
    </>
  );
}

export default ProductsPage;
