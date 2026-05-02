import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow:  (uid, price) => {},
  openSellWindow: (uid, price) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen,    setIsBuyWindowOpen]    = useState(false);
  const [selectedStockUID,   setSelectedStockUID]   = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [orderMode,          setOrderMode]          = useState("BUY");

  const handleOpenBuyWindow = (uid, price = 0) => {
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
    setOrderMode("BUY");
    setIsBuyWindowOpen(true);
  };

  const handleOpenSellWindow = (uid, price = 0) => {
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
    setOrderMode("SELL");
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
    setOrderMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow:  handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          mode={orderMode}
          currentPrice={selectedStockPrice}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
