import React, { createContext, useContext, useState } from "react";

const TradingModeContext = createContext();

export const TradingModeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("zv_tradingMode") || "paper"
  );

  const switchMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem("zv_tradingMode", newMode);
  };

  return (
    <TradingModeContext.Provider value={{ mode, switchMode }}>
      {children}
    </TradingModeContext.Provider>
  );
};

export const useTradingMode = () => useContext(TradingModeContext);
